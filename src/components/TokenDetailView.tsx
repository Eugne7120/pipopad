import React, { useMemo, useState } from 'react';
import { PipoToken } from '../types/pipo';
import { PAIR_ASSETS } from '../data/initialData';
import {
  calculateSwapBuyQuote,
  calculateSwapSellQuote,
} from '../utils/economics';
import {
  PairBadgeIconSVG,
  PipoVaultSVG,
  TokenAvatarWithOfficialLogo,
} from './svg/PipoMascots';
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Copy,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';

interface TokenDetailViewProps {
  token: PipoToken;
  userTokenBalance: number;
  userPairBalance: number;
  onBack: () => void;
  onExecuteSwap: (params: {
    mode: 'buy' | 'sell';
    token: PipoToken;
    pairAmount: number;
    tokenAmount: number;
    bonusTokens: number;
    vaultRefillTokens: number;
    holderPayoutInPair: number;
  }) => void;
}

type TimeframeOption = '15M' | '1H' | '24H' | '7D';
type BottomTabOption =
  | 'Recent Trades'
  | 'Top Holders'
  | 'Payout Drops History'
  | 'Immutable Contract Rules';

export const TokenDetailView: React.FC<TokenDetailViewProps> = ({
  token,
  userTokenBalance,
  userPairBalance,
  onBack,
  onExecuteSwap,
}) => {
  const [timeframe, setTimeframe] = useState<TimeframeOption>('24H');
  const [bottomTab, setBottomTab] = useState<BottomTabOption>('Recent Trades');
  const [swapMode, setSwapMode] = useState<'buy' | 'sell'>('buy');
  const [inputAmount, setInputAmount] = useState<string>(
    token.pairSymbol === 'ETH' || token.pairSymbol === 'xGOLD' ? '0.5' : '250'
  );
  const [copiedCa, setCopiedCa] = useState(false);
  const [oracleModalOpen, setOracleModalOpen] = useState(false);

  const pairInfo = PAIR_ASSETS[token.pairSymbol];
  const numericAmount = Math.max(0, Number(inputAmount) || 0);

  const buyQuote = useMemo(
    () =>
      calculateSwapBuyQuote(
        numericAmount,
        token.priceInPair,
        token.buyBonusRate,
        token.pairSymbol
      ),
    [numericAmount, token.priceInPair, token.buyBonusRate, token.pairSymbol]
  );

  const sellQuote = useMemo(
    () =>
      calculateSwapSellQuote(
        numericAmount,
        token.priceInPair,
        token.buyBonusRate,
        token.holderPayoutRate,
        token.pairSymbol
      ),
    [
      numericAmount,
      token.priceInPair,
      token.buyBonusRate,
      token.holderPayoutRate,
      token.pairSymbol,
    ]
  );

  const series = token.priceHistory[timeframe] || token.priceHistory['24H'];
  const chartPoints = useMemo(() => {
    const min = Math.min(...series);
    const max = Math.max(...series);
    const range = max - min || 0.0001;
    return series
      .map((val, i) => {
        const x = (i / Math.max(1, series.length - 1)) * 680 + 20;
        const y = 180 - ((val - min) / range) * 140;
        return `${x},${y}`;
      })
      .join(' ');
  }, [series]);

  const handleQuickFraction = (fraction: number) => {
    if (swapMode === 'buy') {
      const target = Number((userPairBalance * fraction).toFixed(4));
      setInputAmount(String(target > 0 ? target : 100));
    } else {
      const target = Math.floor((userTokenBalance || 50000) * fraction);
      setInputAmount(String(target > 0 ? target : 10000));
    }
  };

  const handleExecute = (e: React.FormEvent) => {
    e.preventDefault();
    if (numericAmount <= 0) return;

    if (swapMode === 'buy') {
      onExecuteSwap({
        mode: 'buy',
        token,
        pairAmount: numericAmount,
        tokenAmount: buyQuote.totalTokensReceived,
        bonusTokens: buyQuote.pipoVaultBonusTokens,
        vaultRefillTokens: 0,
        holderPayoutInPair: Number(
          (numericAmount * (token.holderPayoutRate / 100)).toFixed(5)
        ),
      });
    } else {
      onExecuteSwap({
        mode: 'sell',
        token,
        pairAmount: sellQuote.netPairReceived,
        tokenAmount: numericAmount,
        bonusTokens: 0,
        vaultRefillTokens: sellQuote.sellRefillTokensToVault,
        holderPayoutInPair: sellQuote.holderPayoutInPair,
      });
    }
  };

  return (
    <div className="space-y-5">
      {/* Back Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 h-10 px-5 rounded-full bg-[#081C19] hover:bg-[#0F3933] border border-[#0F3933] text-xs font-bold text-[#F5FEFD] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#97FCE4]" />
          <span>Back to Explore</span>
        </button>

        <div className="flex items-center gap-2 font-mono-label text-xs text-[#89B0A9]">
          <span>ROBINHOOD CHAIN</span>
          <span>·</span>
          <span className="text-[#97FCE4] font-bold">
            NON-CUSTODIAL VAULT VERIFIED
          </span>
        </div>
      </div>

      {/* Main 8 / 4 Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* LEFT COLUMN (8 cols) */}
        <div className="lg:col-span-8 space-y-5">
          {/* 1. Token Identity & Overview Card */}
          <div className="rounded-[28px] lg:rounded-[32px] bg-[#081C19] border border-[#0F3933] p-6 sm:p-7">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#0F3933]">
              <div className="flex items-center gap-4">
                <TokenAvatarWithOfficialLogo
                  ticker={token.ticker}
                  pairSymbol={token.pairSymbol}
                  avatarBg={token.avatarBg}
                  avatarLabel={token.avatarLabel}
                  logoUrl={token.logoUrl}
                  size="xl"
                />
                <div>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-[#F5FEFD]">
                      {token.name}
                    </h1>
                    <span className="font-mono-label text-sm font-bold text-[#97FCE4]">
                      {token.ticker}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard?.writeText(token.contractAddress);
                        setCopiedCa(true);
                        setTimeout(() => setCopiedCa(false), 1800);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#04060C] border border-[#0F3933] font-mono-label text-[11px] text-[#89B0A9] hover:text-[#F5FEFD] cursor-pointer"
                    >
                      <span>{token.contractAddress}</span>
                      {copiedCa ? (
                        <Check className="w-3 h-3 text-[#97FCE4]" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm text-[#89B0A9] mt-1.5 max-w-2xl leading-relaxed">
                    {token.description}
                  </p>
                </div>
              </div>

              <div className="text-left sm:text-right font-mono-label shrink-0">
                <div className="text-2xl font-extrabold text-[#F5FEFD]">
                  ${token.priceUsd.toFixed(4)}
                </div>
                <div className="text-xs text-[#89B0A9]">
                  {token.priceInPair} {token.pairSymbol} ·{' '}
                  <span
                    className={
                      token.change24h >= 0
                        ? 'text-[#97FCE4] font-bold'
                        : 'text-[#FF6868] font-bold'
                    }
                  >
                    {token.change24h >= 0 ? '+' : ''}
                    {token.change24h.toFixed(1)}% (24H)
                  </span>
                </div>
              </div>
            </div>

            {/* Distinct Reward & Security Pills */}
            <div className="pt-4 flex flex-wrap items-center gap-2.5">
              <span className="px-3.5 py-1.5 rounded-full bg-[#97FCE4] text-[#04060C] font-mono-label text-xs font-extrabold">
                +{token.buyBonusRate}% Buy Bonus
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-[#04060C] border border-[#0F3933] text-[#F5FEFD] font-mono-label text-xs font-semibold">
                {token.buyBonusRate}% Sell Refill -&gt; Vault
              </span>
              {token.holderPayoutRate > 0 && (
                <span className="px-3.5 py-1.5 rounded-full bg-[#0F3933] border border-[#97FCE4]/30 text-[#97FCE4] font-mono-label text-xs font-extrabold">
                  {token.holderPayoutRate}% Payout in {token.pairSymbol}
                </span>
              )}
              {token.antiSnipeEnabled && (
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#04060C] border border-[#0F3933] text-[#97FCE4] font-mono-label text-xs font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>10s Anti-Snipe Shield</span>
                </span>
              )}
            </div>
          </div>

          {/* 2. Price & Market Metrics Chart Card */}
          <div className="rounded-[28px] lg:rounded-[32px] bg-[#081C19] border border-[#0F3933] p-6 sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div>
                <span className="eyebrow-mono text-[#89B0A9]">
                  MARKET TELEMETRY · {token.ticker}/{token.pairSymbol}
                </span>
                <div className="font-display font-extrabold text-lg sm:text-xl text-[#F5FEFD] mt-1">
                  MCap: ${(token.marketCapUsd / 1_000_000).toFixed(2)}M · 24H
                  Vol: ${(token.volume24hUsd / 1_000_000).toFixed(2)}M ·
                  Holders: {token.holdersCount.toLocaleString()}
                </div>
              </div>

              <div
                role="group"
                aria-label="Chart Timeframe"
                className="flex items-center gap-1 bg-[#04060C] p-1 rounded-full border border-[#0F3933]"
              >
                {(['15M', '1H', '24H', '7D'] as TimeframeOption[]).map((tf) => (
                  <button
                    key={tf}
                    type="button"
                    onClick={() => setTimeframe(tf)}
                    className={`px-3.5 py-1 rounded-full font-mono-label text-xs font-bold transition-colors cursor-pointer ${
                      timeframe === tf
                        ? 'bg-[#97FCE4] text-[#04060C]'
                        : 'text-[#89B0A9] hover:text-[#F5FEFD]'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>

            <div className="w-full h-52 rounded-[20px] bg-[#04060C] border border-[#0F3933] p-3">
              <svg
                viewBox="0 0 720 200"
                className="w-full h-full"
                role="img"
                aria-label={`${token.ticker} price chart for ${timeframe}`}
              >
                <line
                  x1="20"
                  y1="40"
                  x2="700"
                  y2="40"
                  stroke="#0F3933"
                  strokeDasharray="4 4"
                />
                <line
                  x1="20"
                  y1="110"
                  x2="700"
                  y2="110"
                  stroke="#0F3933"
                  strokeDasharray="4 4"
                />
                <line
                  x1="20"
                  y1="180"
                  x2="700"
                  y2="180"
                  stroke="#0F3933"
                />
                <polyline
                  fill="none"
                  stroke="#97FCE4"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={chartPoints}
                />
              </svg>
            </div>
          </div>

          {/* 3. Vault Health & Holder Reward Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Pipo Bonus Vault */}
            <div className="rounded-[28px] bg-[#04060C] border border-[#0F3933] p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="eyebrow-mono text-[#97FCE4]">
                    PIPO BONUS VAULT
                  </span>
                  <span className="font-mono-label text-xs font-bold text-[#F5FEFD]">
                    {token.vaultLockedPercent}% LOCKED
                  </span>
                </div>
                <div className="font-display font-extrabold text-2xl sm:text-3xl text-[#F5FEFD] font-mono-label mb-1">
                  {token.vaultTokensRemaining.toLocaleString()} {token.ticker}
                </div>
                <p className="text-xs text-[#89B0A9] mb-4">
                  Self-refilling treasury reserve. Every sell returns{' '}
                  {token.buyBonusRate}% back into this vault.
                </p>

                <div className="space-y-2 py-3 border-y border-[#0F3933] text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#89B0A9]">
                      Credited to Buyers (+{token.buyBonusRate}%):
                    </span>
                    <span className="font-mono-label text-[#97FCE4] font-bold">
                      {token.totalBonusCredited.toLocaleString()} {token.ticker}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#89B0A9]">
                      Refilled by Sellers ({token.buyBonusRate}%):
                    </span>
                    <span className="font-mono-label text-[#F5FEFD] font-bold">
                      +{token.totalVaultRefilled.toLocaleString()}{' '}
                      {token.ticker}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <PipoVaultSVG className="w-full h-28" />
              </div>
            </div>

            {/* Holder Payout Engine (Firefly #0F3933 with #F5FEFD & #97FCE4) */}
            <div className="rounded-[28px] bg-[#0F3933] border border-[#97FCE4]/25 text-[#F5FEFD] p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="eyebrow-mono text-[#97FCE4] font-bold">
                    HOLDER PAYOUT ENGINE
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#04060C] text-[#97FCE4] font-mono-label text-[10px] font-bold">
                    NEXT DROP: 04m 18s
                  </span>
                </div>

                <div className="font-display font-extrabold text-2xl sm:text-3xl text-[#F5FEFD] font-mono-label mb-1">
                  {token.nextPayoutPotInPair.toLocaleString()}{' '}
                  {token.pairSymbol}
                </div>
                <p className="text-xs text-[#F5FEFD]/85 mb-4 leading-relaxed">
                  Current Payout Pot accumulating from {token.holderPayoutRate}%
                  swap fees. Automatically streamed in{' '}
                  <strong className="font-extrabold text-[#97FCE4]">
                    {token.pairSymbol}
                  </strong>{' '}
                  with zero claiming.
                </p>
              </div>

              {/* Hold Multiplier Tiers Table */}
              <div className="rounded-2xl bg-[#04060C] text-[#F5FEFD] p-4 space-y-2 text-xs">
                <div className="font-mono-label text-[10px] text-[#89B0A9] uppercase">
                  HOLD DURATION MULTIPLIER TIERS
                </div>
                <div className="flex justify-between py-1 border-b border-[#0F3933]">
                  <span className="text-[#89B0A9]">Tier 1 (0 to 3 Days)</span>
                  <span className="font-mono-label text-[#F5FEFD] font-bold">
                    1.0x Base Share
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#0F3933]">
                  <span className="text-[#89B0A9]">Tier 2 (3 to 7 Days)</span>
                  <span className="font-mono-label text-[#F5FEFD] font-bold">
                    1.5x Boost Share
                  </span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-[#89B0A9]">Tier 3 (7+ Days)</span>
                  <span className="font-mono-label text-[#97FCE4] font-bold">
                    2.0x Max Share
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Transaction Activity & Contract Details Tabs */}
          <div className="rounded-[28px] lg:rounded-[32px] bg-[#081C19] border border-[#0F3933] p-6">
            <div
              role="tablist"
              aria-label="Token Telemetry Details"
              className="flex flex-wrap items-center gap-2 pb-4 mb-4 border-b border-[#0F3933]"
            >
              {(
                [
                  'Recent Trades',
                  'Top Holders',
                  'Payout Drops History',
                  'Immutable Contract Rules',
                ] as BottomTabOption[]
              ).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={bottomTab === tab}
                  onClick={() => setBottomTab(tab)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                    bottomTab === tab
                      ? 'bg-[#97FCE4] text-[#04060C]'
                      : 'bg-[#04060C] text-[#89B0A9] hover:text-[#F5FEFD] border border-[#0F3933]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {bottomTab === 'Recent Trades' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono-label text-xs">
                  <thead>
                    <tr className="text-[#89B0A9] border-b border-[#0F3933]">
                      <th className="py-2.5">TYPE</th>
                      <th className="py-2.5">WALLET</th>
                      <th className="py-2.5">PAIR AMOUNT</th>
                      <th className="py-2.5">PIPO VAULT EFFECT</th>
                      <th className="py-2.5 text-right">TIME</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#0F3933]">
                    <tr>
                      <td className="py-3 text-[#97FCE4] font-bold">
                        BUY (+BONUS)
                      </td>
                      <td className="py-3 text-[#F5FEFD]">0x71C...9A2B</td>
                      <td className="py-3 text-[#F5FEFD]">
                        120 {token.pairSymbol}
                      </td>
                      <td className="py-3 text-[#97FCE4] font-bold">
                        +{token.buyBonusRate}% Extra {token.ticker} Credited
                      </td>
                      <td className="py-3 text-right text-[#89B0A9]">14s ago</td>
                    </tr>
                    <tr>
                      <td className="py-3 text-[#FFBE55] font-bold">
                        SELL (REFILL)
                      </td>
                      <td className="py-3 text-[#F5FEFD]">0x38F...11C4</td>
                      <td className="py-3 text-[#F5FEFD]">
                        45 {token.pairSymbol}
                      </td>
                      <td className="py-3 text-[#F5FEFD]">
                        +{token.buyBonusRate}% Returned to Locked Vault
                      </td>
                      <td className="py-3 text-right text-[#89B0A9]">1m ago</td>
                    </tr>
                    <tr>
                      <td className="py-3 text-[#97FCE4] font-bold">
                        AUTO-PAYOUT
                      </td>
                      <td className="py-3 text-[#F5FEFD]">
                        All {token.holdersCount.toLocaleString()} Holders
                      </td>
                      <td className="py-3 text-[#97FCE4] font-bold">
                        {token.nextPayoutPotInPair} {token.pairSymbol}
                      </td>
                      <td className="py-3 text-[#89B0A9]">
                        Weighted by 1x / 1.5x / 2x Hold Tier
                      </td>
                      <td className="py-3 text-right text-[#89B0A9]">4m ago</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {bottomTab === 'Top Holders' && (
              <div className="space-y-2.5 font-mono-label text-xs">
                {[
                  {
                    rank: '#1',
                    addr: '0xPIPO...VAULT (Locked Bonus Treasury)',
                    pct: `${token.vaultLockedPercent}%`,
                    mult: 'IMMUTABLE VAULT',
                  },
                  {
                    rank: '#2',
                    addr: '0x99A4...E108',
                    pct: '2.40%',
                    mult: '2x Max Boost (7d+)',
                  },
                  {
                    rank: '#3',
                    addr: '0x71C...9A2B (You)',
                    pct: '1.15%',
                    mult: '2x Max Boost (7d+)',
                  },
                  {
                    rank: '#4',
                    addr: '0x42F0...77C1',
                    pct: '0.88%',
                    mult: '1.5x (3-7d)',
                  },
                ].map((h) => (
                  <div
                    key={h.rank}
                    className="p-3.5 rounded-2xl bg-[#04060C] border border-[#0F3933] flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[#89B0A9]">{h.rank}</span>
                      <span className="text-[#F5FEFD] font-bold">{h.addr}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#97FCE4] text-[#04060C] text-[10px] font-extrabold">
                        {h.mult}
                      </span>
                      <span className="text-[#F5FEFD] font-bold">{h.pct}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {bottomTab === 'Payout Drops History' && (
              <div className="space-y-2.5 font-mono-label text-xs">
                {[
                  {
                    batch: 'Batch #412',
                    amount: `${(token.nextPayoutPotInPair * 0.9).toFixed(3)} ${
                      token.pairSymbol
                    }`,
                    recipients: `${token.holdersCount.toLocaleString()} Wallets`,
                    time: '18m ago',
                  },
                  {
                    batch: 'Batch #411',
                    amount: `${(token.nextPayoutPotInPair * 1.15).toFixed(3)} ${
                      token.pairSymbol
                    }`,
                    recipients: `${(token.holdersCount - 14).toLocaleString()} Wallets`,
                    time: '1h ago',
                  },
                ].map((b) => (
                  <div
                    key={b.batch}
                    className="p-3.5 rounded-2xl bg-[#04060C] border border-[#0F3933] flex items-center justify-between"
                  >
                    <div>
                      <span className="text-[#97FCE4] font-bold">
                        {b.batch}
                      </span>{' '}
                      · Distributed to {b.recipients}
                    </div>
                    <div className="text-[#97FCE4] font-bold">
                      {b.amount} ({b.time})
                    </div>
                  </div>
                ))}
              </div>
            )}

            {bottomTab === 'Immutable Contract Rules' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-4 rounded-2xl bg-[#04060C] border border-[#0F3933]">
                  <div className="font-mono-label text-[#89B0A9] text-[10px]">
                    HARD TRANSACTION CAP
                  </div>
                  <div className="text-[#F5FEFD] font-bold mt-1">
                    {token.buyBonusRate + token.holderPayoutRate + 0.5}% Total
                    (&lt;= 10% Immutable Cap)
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-[#04060C] border border-[#0F3933]">
                  <div className="font-mono-label text-[#89B0A9] text-[10px]">
                    PAYOUT ROUTING MODE
                  </div>
                  <div className="text-[#97FCE4] font-bold mt-1">
                    {token.payoutDestination}
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-[#04060C] border border-[#0F3933]">
                  <div className="font-mono-label text-[#89B0A9] text-[10px]">
                    ACTIVE SETTLEMENT PAIR
                  </div>
                  <div className="text-[#F5FEFD] font-bold mt-1">
                    {token.ticker}/{token.pairSymbol} ({token.pairCategory})
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-[#04060C] border border-[#0F3933]">
                  <div className="font-mono-label text-[#89B0A9] text-[10px]">
                    ANTI-SNIPE BLOCK-0 DECAY
                  </div>
                  <div className="text-[#F5FEFD] font-bold mt-1">
                    {token.antiSnipeEnabled
                      ? 'Enabled (99% -> 0% over 10s)'
                      : 'Standard Launch'}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN (4 cols): Sticky Buy & Sell Terminal + Foam Quote Receipt */}
        <div className="lg:col-span-4 lg:sticky lg:top-20 space-y-4">
          <form
            onSubmit={handleExecute}
            className="rounded-[28px] lg:rounded-[32px] bg-[#081C19] border border-[#0F3933] p-6 space-y-5"
          >
            {/* Active Pair Visual Indicator & Price Oracle Link */}
            <div className="p-3.5 rounded-2xl bg-[#04060C] border border-[#0F3933] flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <PairBadgeIconSVG
                  symbol={token.pairSymbol}
                  className="w-4 h-4"
                />
                <span
                  data-testid="swap-active-pair-indicator"
                  className="font-mono-label text-xs font-bold text-[#F5FEFD]"
                >
                  Active Pair: {token.ticker}/{token.pairSymbol}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setOracleModalOpen((v) => !v)}
                className="inline-flex items-center gap-1 font-mono-label text-[10px] font-bold text-[#97FCE4] hover:underline cursor-pointer"
              >
                <span>Oracle Feed</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>

            {oracleModalOpen && (
              <div className="p-3.5 rounded-2xl bg-[#04060C] border border-[#97FCE4]/50 font-mono-label text-[11px] space-y-1">
                <div className="flex justify-between text-[#F5FEFD] font-bold">
                  <span>{pairInfo.oracleFeedName}</span>
                  <span className="text-[#97FCE4]">LIVE</span>
                </div>
                <div className="text-[#89B0A9]">
                  1 {token.pairSymbol} = $
                  {pairInfo.oraclePriceUsd.toLocaleString()} USD
                </div>
                <div className="text-[#89B0A9]">
                  Contract: {pairInfo.oracleAddress}
                </div>
              </div>
            )}

            {/* Buy / Sell Mode Selector Pills */}
            <div
              role="tablist"
              aria-label="Swap Direction"
              className="grid grid-cols-2 gap-1.5 p-1 rounded-full bg-[#04060C] border border-[#0F3933]"
            >
              <button
                type="button"
                role="tab"
                aria-selected={swapMode === 'buy'}
                onClick={() => setSwapMode('buy')}
                className={`py-2.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                  swapMode === 'buy'
                    ? 'bg-[#97FCE4] text-[#04060C]'
                    : 'text-[#89B0A9] hover:text-[#F5FEFD]'
                }`}
              >
                Buy (Get Bonus)
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={swapMode === 'sell'}
                onClick={() => setSwapMode('sell')}
                className={`py-2.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                  swapMode === 'sell'
                    ? 'bg-[#FFBE55] text-[#04060C]'
                    : 'text-[#89B0A9] hover:text-[#F5FEFD]'
                }`}
              >
                Sell (Refill Vault)
              </button>
            </div>

            {/* Amount Input & 25% / 50% / MAX Quick Pills */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="swap-amount-input"
                  className="font-mono-label text-[11px] uppercase text-[#89B0A9]"
                >
                  {swapMode === 'buy'
                    ? `PAY WITH ${token.pairSymbol}`
                    : `SELL ${token.ticker} AMOUNT`}
                </label>
                <span className="font-mono-label text-[11px] text-[#89B0A9]">
                  Bal:{' '}
                  {swapMode === 'buy'
                    ? `${userPairBalance.toLocaleString()} ${token.pairSymbol}`
                    : `${userTokenBalance.toLocaleString()} ${token.ticker}`}
                </span>
              </div>

              <div className="relative">
                <input
                  id="swap-amount-input"
                  type="number"
                  step="any"
                  min="0"
                  value={inputAmount}
                  onChange={(e) => setInputAmount(e.target.value)}
                  className="w-full h-12 px-4 pr-20 rounded-2xl bg-[#04060C] border border-[#0F3933] font-mono-label text-base font-extrabold text-[#F5FEFD] focus:outline-none focus:border-[#97FCE4]"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 font-mono-label text-xs font-bold text-[#97FCE4]">
                  {swapMode === 'buy' ? token.pairSymbol : token.ticker}
                </span>
              </div>

              <div className="flex items-center justify-end gap-2 mt-2">
                {[
                  { label: '25%', val: 0.25 },
                  { label: '50%', val: 0.5 },
                  { label: 'MAX', val: 1.0 },
                ].map((btn) => (
                  <button
                    key={btn.label}
                    type="button"
                    onClick={() => handleQuickFraction(btn.val)}
                    className="px-3 py-1 rounded-full bg-[#04060C] hover:bg-[#0F3933] border border-[#0F3933] font-mono-label text-[10px] font-bold text-[#89B0A9] hover:text-[#F5FEFD] cursor-pointer"
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Foam (#F5FEFD) Pipo Live Quote Receipt Box */}
            <div className="rounded-2xl bg-[#F5FEFD] text-[#04060C] border border-[#C2E8E2] p-4 space-y-2.5 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#C2E8E2] font-mono-label">
                <span className="text-[10px] text-[#04060C]/70 uppercase font-bold">
                  PIPO LIVE QUOTE RECEIPT
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#04060C] text-[#97FCE4] text-[9px] font-bold">
                  {swapMode === 'buy' ? 'POSITIVE-ENTRY' : 'VAULT REFILL'}
                </span>
              </div>

              {swapMode === 'buy' ? (
                <>
                  <div className="flex justify-between">
                    <span className="text-[#04060C]/75 font-medium">
                      Standard Swap Output:
                    </span>
                    <span className="font-mono-label text-[#04060C] font-bold">
                      {buyQuote.standardSwapOutput.toLocaleString()}{' '}
                      {token.ticker}
                    </span>
                  </div>
                  <div className="px-3 py-2 rounded-xl bg-[#97FCE4] text-[#04060C] flex justify-between font-bold">
                    <span>Pipo Vault Bonus (+{token.buyBonusRate}%):</span>
                    <span
                      data-testid="swap-bonus-tokens"
                      className="font-mono-label font-extrabold"
                    >
                      +{buyQuote.pipoVaultBonusTokens.toLocaleString()}{' '}
                      {token.ticker}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#04060C]/75 font-medium">
                      Holder Payout Pool (+{token.holderPayoutRate}%):
                    </span>
                    <span className="font-mono-label text-[#04060C] font-bold">
                      Paid in {token.pairSymbol}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2.5 border-t border-[#C2E8E2] text-sm">
                    <span className="text-[#04060C] font-extrabold">
                      Total Tokens Received:
                    </span>
                    <span
                      data-testid="swap-total-received"
                      className="font-mono-label text-[#04060C] font-extrabold"
                    >
                      {buyQuote.totalTokensReceived.toLocaleString()}{' '}
                      {token.ticker}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between">
                    <span className="text-[#04060C]/75 font-medium">
                      Gross Swap Value:
                    </span>
                    <span className="font-mono-label text-[#04060C] font-bold">
                      {sellQuote.grossPairOutput} {token.pairSymbol}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#04060C]/80 font-semibold">
                      Refill to Pipo Vault ({token.buyBonusRate}%):
                    </span>
                    <span className="font-mono-label text-[#04060C] font-bold">
                      {sellQuote.sellRefillTokensToVault.toLocaleString()}{' '}
                      {token.ticker}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#04060C]/80 font-semibold">
                      Sent to Holders ({token.holderPayoutRate}%):
                    </span>
                    <span className="font-mono-label text-[#04060C] font-bold">
                      {sellQuote.holderPayoutInPair} {token.pairSymbol}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2.5 border-t border-[#C2E8E2] text-sm">
                    <span className="text-[#04060C] font-extrabold">
                      Net {token.pairSymbol} Received:
                    </span>
                    <span className="font-mono-label text-[#04060C] font-extrabold">
                      {sellQuote.netPairReceived} {token.pairSymbol}
                    </span>
                  </div>
                </>
              )}
            </div>

            <button
              type="submit"
              className="w-full h-12 rounded-full bg-[#97FCE4] hover:bg-[#76F7D9] text-[#04060C] font-display font-extrabold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>
                {swapMode === 'buy'
                  ? `Buy ${token.ticker} & Claim +${token.buyBonusRate}% Bonus`
                  : `Sell ${token.ticker} & Refill Pipo Vault`}
              </span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
