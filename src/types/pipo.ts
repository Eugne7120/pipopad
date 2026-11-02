export type PairCategory =
  | 'Stable / Native'
  | 'Custom Tokens'
  | 'Tokenized Assets'
  | 'Cross-Chain';

export type PairAssetSymbol =
  | 'USDG'
  | 'ETH'
  | '$PUMP'
  | '$SOL'
  | '$MEME'
  | 'xNVDA'
  | 'xGOLD'
  | 'xTSLA'
  | 'wBTC'
  | 'SOL-W';

export interface PairAssetInfo {
  symbol: PairAssetSymbol;
  name: string;
  category: PairCategory;
  oraclePriceUsd: number;
  oracleFeedName: string;
  oracleAddress: string;
  badgeColor: string;
  unitDecimals: number;
}

export type PayoutDestination =
  | 'Direct to Holders Forever'
  | 'Creator First (Switchable to Holders Later)';

export interface PipoToken {
  id: string;
  name: string;
  ticker: string;
  contractAddress: string;
  description: string;
  logoUrl?: string;
  avatarBg: string;
  avatarLabel: string;
  pairSymbol: PairAssetSymbol;
  pairCategory: PairCategory;
  priceInPair: number;
  priceUsd: number;
  change24h: number;
  marketCapUsd: number;
  volume24hUsd: number;
  buyBonusRate: number; // 2% to 9%
  holderPayoutRate: number; // 0% to 7% (buyBonusRate + holderPayoutRate <= 9%)
  platformBurnFee: number; // 0.5%
  vaultLockedPercent: number; // e.g., 8.4% of 1B supply
  vaultTokensRemaining: number; // out of 1,000,000,000
  totalBonusCredited: number;
  totalVaultRefilled: number;
  nextPayoutPotInPair: number;
  totalPayoutsDistributedInPair: number;
  payoutDestination: PayoutDestination;
  creatorRevenueCollectedInPair: number;
  antiSnipeEnabled: boolean;
  holdersCount: number;
  createdAt: string;
  isCreatorOwned?: boolean;
  socials?: {
    x?: string;
    telegram?: string;
    website?: string;
  };
  priceHistory: {
    '15M': number[];
    '1H': number[];
    '24H': number[];
    '7D': number[];
  };
}

export type ActivityEventType =
  | 'BUY_BONUS'
  | 'SELL_REFILL'
  | 'PAYOUT_DROP'
  | 'NEW_LAUNCH'
  | 'PIPO_BURN';

export interface ActivityEvent {
  id: string;
  type: ActivityEventType;
  tokenTicker: string;
  tokenId: string;
  pairSymbol: PairAssetSymbol;
  wallet: string;
  pairAmount: number;
  baseTokens?: number;
  bonusTokens?: number;
  vaultRefillTokens?: number;
  payoutAmountInPair?: number;
  burnAmountPipo?: number;
  timestamp: string;
  txHash: string;
}

export type HoldDurationTier = '1x (0-3d)' | '1.5x (3-7d)' | '2x Max Boost (7d+)';

export interface PortfolioHolding {
  tokenId: string;
  tokenName: string;
  tokenTicker: string;
  pairSymbol: PairAssetSymbol;
  balanceTokens: number;
  bonusTokensEarnedOnEntry: number;
  holdDays: number;
  multiplier: number;
  multiplierLabel: HoldDurationTier;
  payoutsReceivedInPair: number;
  estimatedNextPayoutInPair: number;
}

export interface InspectedWalletProfile {
  address: string;
  label: string;
  tag: string;
  totalValueUsd: number;
  totalBonusTokensEarned: number;
  totalPayoutsUsdEquivalent: number;
  averageHoldDays: number;
  activeMultiplier: HoldDurationTier;
  recentPayouts: {
    tokenTicker: string;
    pairSymbol: PairAssetSymbol;
    amountInPair: number;
    usdValue: number;
    multiplier: string;
    timestamp: string;
  }[];
  bonusEntries: {
    tokenTicker: string;
    baseTokens: number;
    bonusTokens: number;
    bonusRate: number;
    timestamp: string;
  }[];
}
