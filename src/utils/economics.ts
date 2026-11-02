import { HoldDurationTier, PairAssetSymbol } from '../types/pipo';

export interface BuyPreviewQuote {
  baseTokens: number;
  bonusRate: number;
  bonusTokens: number;
  totalReceived: number;
  platformBurnFeePct: number;
}

export interface SwapBuyQuote {
  pairAmountIn: number;
  pairSymbol: PairAssetSymbol;
  standardSwapOutput: number;
  pipoVaultBonusTokens: number;
  bonusRatePct: number;
  totalTokensReceived: number;
  platformBurnFeeInPair: number;
  instantEntryEdgePct: number;
}

export interface SwapSellQuote {
  tokenAmountIn: number;
  pairSymbol: PairAssetSymbol;
  grossPairOutput: number;
  sellRefillTokensToVault: number;
  sellRefillFeePct: number;
  holderPayoutInPair: number;
  holderPayoutFeePct: number;
  platformBurnFeeInPair: number;
  netPairReceived: number;
}

/**
 * Calculates the landing page / token builder buy preview simulator output.
 */
export function calculateBuyPreview(
  baseSwapOutput: number,
  bonusRatePct: number
): BuyPreviewQuote {
  const safeBase = Math.max(0, Number.isFinite(baseSwapOutput) ? baseSwapOutput : 0);
  const clampedRate = Math.min(9, Math.max(2, Math.round(bonusRatePct)));
  const bonusTokens = Math.round(safeBase * (clampedRate / 100));
  return {
    baseTokens: safeBase,
    bonusRate: clampedRate,
    bonusTokens,
    totalReceived: safeBase + bonusTokens,
    platformBurnFeePct: 0.5,
  };
}

/**
 * Enforces the immutable 10% total transaction cap:
 * buyBonusRate (2-9%) + holderPayoutRate (0-7%) <= 9% (plus 0.5% Pipo Burn = 9.5% <= 10% cap).
 */
export function clampEconomicRates(
  buyBonusRate: number,
  holderPayoutRate: number
): {
  buyBonusRate: number;
  holderPayoutRate: number;
  maxAllowedPayoutRate: number;
  totalTaxPct: number;
} {
  const clampedBonus = Math.min(9, Math.max(2, Math.round(buyBonusRate)));
  const maxAllowedPayoutRate = Math.max(0, 9 - clampedBonus);
  const clampedPayout = Math.min(
    maxAllowedPayoutRate,
    Math.max(0, Math.round(holderPayoutRate))
  );
  return {
    buyBonusRate: clampedBonus,
    holderPayoutRate: clampedPayout,
    maxAllowedPayoutRate,
    totalTaxPct: Number((clampedBonus + clampedPayout + 0.5).toFixed(1)),
  };
}

/**
 * Calculates a real-time Buy quote on the Token Detail Swap terminal.
 */
export function calculateSwapBuyQuote(
  pairAmountIn: number,
  priceInPair: number,
  buyBonusRatePct: number,
  pairSymbol: PairAssetSymbol
): SwapBuyQuote {
  const validIn = Math.max(0, Number.isFinite(pairAmountIn) ? pairAmountIn : 0);
  const safePrice = priceInPair > 0 ? priceInPair : 0.0001;
  const platformBurnFeeInPair = validIn * 0.005;
  const effectivePairIn = validIn - platformBurnFeeInPair;
  const standardSwapOutput = Math.round(effectivePairIn / safePrice);
  const pipoVaultBonusTokens = Math.round(
    standardSwapOutput * (buyBonusRatePct / 100)
  );
  const totalTokensReceived = standardSwapOutput + pipoVaultBonusTokens;

  return {
    pairAmountIn: validIn,
    pairSymbol,
    standardSwapOutput,
    pipoVaultBonusTokens,
    bonusRatePct: buyBonusRatePct,
    totalTokensReceived,
    platformBurnFeeInPair: Number(platformBurnFeeInPair.toFixed(6)),
    instantEntryEdgePct: buyBonusRatePct,
  };
}

/**
 * Calculates a real-time Sell quote on the Token Detail Swap terminal.
 * Sells refill the Pipo Bonus Vault and route Holder Payouts in the active Pair Asset.
 */
export function calculateSwapSellQuote(
  tokenAmountIn: number,
  priceInPair: number,
  sellRefillRatePct: number,
  holderPayoutRatePct: number,
  pairSymbol: PairAssetSymbol
): SwapSellQuote {
  const validTokens = Math.max(0, Number.isFinite(tokenAmountIn) ? tokenAmountIn : 0);
  const safePrice = priceInPair > 0 ? priceInPair : 0.0001;
  const sellRefillTokensToVault = Math.round(
    validTokens * (sellRefillRatePct / 100)
  );
  const grossPairOutput = validTokens * safePrice;
  const holderPayoutInPair = grossPairOutput * (holderPayoutRatePct / 100);
  const platformBurnFeeInPair = grossPairOutput * 0.005;
  const sellRefillInPairValue = grossPairOutput * (sellRefillRatePct / 100);

  const netPairReceived = Math.max(
    0,
    grossPairOutput -
      sellRefillInPairValue -
      holderPayoutInPair -
      platformBurnFeeInPair
  );

  return {
    tokenAmountIn: validTokens,
    pairSymbol,
    grossPairOutput: Number(grossPairOutput.toFixed(6)),
    sellRefillTokensToVault,
    sellRefillFeePct: sellRefillRatePct,
    holderPayoutInPair: Number(holderPayoutInPair.toFixed(6)),
    holderPayoutFeePct: holderPayoutRatePct,
    platformBurnFeeInPair: Number(platformBurnFeeInPair.toFixed(6)),
    netPairReceived: Number(netPairReceived.toFixed(6)),
  };
}

/**
 * Resolves the Hold Duration Multiplier from days held:
 * 0-3 days: 1x, 3-7 days: 1.5x, 7+ days: 2x Max Boost
 */
export function resolveHoldMultiplier(holdDays: number): {
  multiplier: number;
  label: HoldDurationTier;
} {
  if (holdDays >= 7) {
    return { multiplier: 2.0, label: '2x Max Boost (7d+)' };
  }
  if (holdDays >= 3) {
    return { multiplier: 1.5, label: '1.5x (3-7d)' };
  }
  return { multiplier: 1.0, label: '1x (0-3d)' };
}

/**
 * Returns the 10-second Anti-Snipe Shield tax decay schedule (block 0 to second 10).
 */
export function getAntiSnipeTaxForSecond(secondAfterLaunch: number): number {
  if (secondAfterLaunch <= 0) return 99;
  if (secondAfterLaunch === 1) return 80;
  if (secondAfterLaunch === 2) return 50;
  if (secondAfterLaunch === 3) return 35;
  if (secondAfterLaunch === 4) return 25;
  if (secondAfterLaunch <= 6) return 15;
  if (secondAfterLaunch <= 9) return 8;
  return 0;
}
