import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateBuyPreview,
  clampEconomicRates,
  calculateSwapBuyQuote,
  calculateSwapSellQuote,
  resolveHoldMultiplier,
  getAntiSnipeTaxForSecond,
} from './economics';

test('calculateBuyPreview computes exact bonus and total tokens', () => {
  const quote = calculateBuyPreview(10000, 5);
  assert.equal(quote.baseTokens, 10000);
  assert.equal(quote.bonusRate, 5);
  assert.equal(quote.bonusTokens, 500);
  assert.equal(quote.totalReceived, 10500);
});

test('clampEconomicRates enforces bonus + payout <= 9% hard cap', () => {
  const res1 = clampEconomicRates(6, 5);
  assert.equal(res1.buyBonusRate, 6);
  assert.equal(res1.maxAllowedPayoutRate, 3);
  assert.equal(res1.holderPayoutRate, 3);
  assert.equal(res1.totalTaxPct, 9.5);

  const res2 = clampEconomicRates(9, 4);
  assert.equal(res2.buyBonusRate, 9);
  assert.equal(res2.holderPayoutRate, 0);
});

test('calculateSwapBuyQuote credits positive-entry bonus tokens in any pair', () => {
  const quote = calculateSwapBuyQuote(100, 0.01, 5, 'xGOLD');
  assert.equal(quote.pairSymbol, 'xGOLD');
  // 100 - 0.5% burn = 99.5 xGOLD -> 99.5 / 0.01 = 9950 base tokens
  assert.equal(quote.standardSwapOutput, 9950);
  assert.equal(quote.pipoVaultBonusTokens, Math.round(9950 * 0.05));
  assert.equal(
    quote.totalTokensReceived,
    quote.standardSwapOutput + quote.pipoVaultBonusTokens
  );
});

test('calculateSwapSellQuote refills vault and calculates payout in active pair asset', () => {
  const sell = calculateSwapSellQuote(10000, 0.01, 5, 3, 'xNVDA');
  assert.equal(sell.pairSymbol, 'xNVDA');
  assert.equal(sell.sellRefillTokensToVault, 500);
  assert.equal(sell.holderPayoutInPair, 3);
  assert.ok(sell.netPairReceived < sell.grossPairOutput);
});

test('resolveHoldMultiplier returns 1x, 1.5x, and 2x tiers accurately', () => {
  assert.equal(resolveHoldMultiplier(1).multiplier, 1.0);
  assert.equal(resolveHoldMultiplier(4).multiplier, 1.5);
  assert.equal(resolveHoldMultiplier(12).multiplier, 2.0);
});

test('getAntiSnipeTaxForSecond decays from 99% to 0% after 10 seconds', () => {
  assert.equal(getAntiSnipeTaxForSecond(0), 99);
  assert.equal(getAntiSnipeTaxForSecond(2), 50);
  assert.equal(getAntiSnipeTaxForSecond(10), 0);
});
