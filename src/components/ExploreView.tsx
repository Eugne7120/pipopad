import React, { useEffect, useMemo, useState } from 'react';
import { PipoToken } from '../types/pipo';
import { calculateSwapBuyQuote } from '../utils/economics';
import {
  MiniPriceSparklineSVG,
  PairBadgeIconSVG,
  TokenAvatarWithOfficialLogo,
} from './svg/PipoMascots';
import {
  ArrowRight,
  ArrowUpRight,
  Flame,
  LayoutGrid,
  List,
  Plus,
  Search,
  X,
} from 'lucide-react';

export type PairFilterOption =
  | 'All Pairs'
  | 'USDG/ETH'
  | 'Tokenized Assets'
  | 'Custom Pairs';

export type SortFilterOption =
  | 'Trending'
  | 'New Launches'
  | 'Highest Bonus'
  | 'Highest Bonus %'
  | 'Top Holder Payouts'
  | 'Top ETH/USDG Payouts'
  | 'Market Cap';

interface ExploreViewProps {
  tokens: PipoToken[];
  pipoBurnedTotal: number;
  globalSearchQuery?: string;
  onGlobalSearchChange?: (q: string) => void;
  initialSortFilter?: SortFilterOption;
  onSelectToken: (token: PipoToken) => void;
  onTriggerBurnRound: () => void;
  onNavigateCreate: () => void;
  onNavigateBurn?: () => void;
}

const SORT_OPTIONS: { id: SortFilterOption; label: string }[] = [
  { id: 'Trending', label: 'Trending' },
  { id: 'New Launches', label: 'New Launches' },
  { id: 'Highest Bonus', label: 'Highest Bonus' },
  { id: 'Top Holder Payouts', label: 'Top Holder Payouts' },
  { id: 'Market Cap', label: 'Market Cap' },
];

const PAIR_FILTER_OPTIONS: PairFilterOption[] = [
  'All Pairs',
  'USDG/ETH',
  'Tokenized Assets',
  'Custom Pairs',
];

export const ExploreView: React.FC<ExploreViewProps> = ({
  tokens,
  pipoBurnedTotal,
  globalSearchQuery = '',
  onGlobalSearchChange,
  initialSortFilter = 'Trending',
  onSelectToken,
  onTriggerBurnRound,
  onNavigateCreate,
}) => {
  const normalizeSort = (s: SortFilterOption): SortFilterOption => {
    if (s === 'Highest Bonus %') return 'Highest Bonus';
    if (s === 'Top ETH/USDG Payouts') return 'Top Holder Payouts';
    return s;
  };

  const [pairFilter, setPairFilter] = useState<PairFilterOption>('All Pairs');
  const [sortFilter, setSortFilter] = useState<SortFilterOption>(
    normalizeSort(initialSortFilter)
  );
  const [viewLayout, setViewLayout] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    setSortFilter(normalizeSort(initialSortFilter));
  }, [initialSortFilter]);

  // Hero Interactive Bonus Preview State
  const [heroTokenId, setHeroTokenId] = useState<string>(
    tokens[0]?.id || 'pipo-native'
  );
  const [heroSpendAmount, setHeroSpendAmount] = useState<number>(250);

  const heroToken = useMemo(
    () => tokens.find((t) => t.id === heroTokenId) || tokens[0],
    [tokens, heroTokenId]
  );

  const heroQuote = useMemo(() => {
    if (!heroToken) {
      return {
        standardSwapOutput: 0,
        pipoVaultBonusTokens: 0,
        totalTokensReceived: 0,
      };
    }
    return calculateSwapBuyQuote(
      heroSpendAmount,
      heroToken.priceInPair,
      heroToken.buyBonusRate,
      heroToken.pairSymbol
    );
  }, [heroToken, heroSpendAmount]);

  // Featured Launches Showcase State (Top 5 tokens)
  const featuredList = useMemo(() => tokens.slice(0, 5), [tokens]);
  const [featuredActiveId, setFeaturedActiveId] = useState<string>(
    featuredList[0]?.id || 'pipo-native'
  );

  const featuredToken = useMemo(
    () =>
      featuredList.find((t) => t.id === featuredActiveId) ||
      featuredList[0] ||
      tokens[0],
    [featuredList, featuredActiveId, tokens]
  );

  // Filtered & Sorted Discover Tokens
  const filteredTokens = useMemo(() => {
    const q = globalSearchQuery.trim().toLowerCase();
    const list = tokens.filter((t) => {
      const matchesSearch =
        !q ||
        t.name.toLowerCase().includes(q) ||
        t.ticker.toLowerCase().includes(q) ||
        t.contractAddress.toLowerCase().includes(q) ||
        t.pairSymbol.toLowerCase().includes(q);

      if (!matchesSearch) return false;

      if (pairFilter === 'USDG/ETH') {
        return t.pairSymbol === 'USDG' || t.pairSymbol === 'ETH';
      }
      if (pairFilter === 'Tokenized Assets') {
        return t.pairCategory === 'Tokenized Assets';
      }
      if (pairFilter === 'Custom Pairs') {
        return (
          t.pairCategory === 'Custom Tokens' || t.pairCategory === 'Cross-Chain'
        );
      }
      return true;
    });

    return [...list].sort((a, b) => {
      if (
        sortFilter === 'Highest Bonus' ||
        sortFilter === 'Highest Bonus %'
      ) {
        return b.buyBonusRate - a.buyBonusRate;
      }
      if (
        sortFilter === 'Top Holder Payouts' ||
        sortFilter === 'Top ETH/USDG Payouts'
      ) {
        return b.holderPayoutRate - a.holderPayoutRate;
      }
      if (sortFilter === 'Market Cap') {
        return b.marketCapUsd - a.marketCapUsd;
      }
      if (sortFilter === 'New Launches') {
        return b.createdAt.localeCompare(a.createdAt);
      }
      return b.change24h - a.change24h;
    });
  }, [tokens, globalSearchQuery, pairFilter, sortFilter]);

  // Explicit Protocol Statistics Calculations
  const totalBonusCreditedAll = useMemo(
    () => tokens.reduce((acc, t) => acc + t.totalBonusCredited, 0),
    [tokens]
  );

  const payoutsByAssetSummary = useMemo(() => {
    let usdg = 0;
    let eth = 0;
    let rwaUnits = 0;
    for (const t of tokens) {
      if (t.pairSymbol === 'USDG') {
        usdg += t.totalPayoutsDistributedInPair;
      } else if (t.pairSymbol === 'ETH') {
        eth += t.totalPayoutsDistributedInPair;
      } else if (t.pairCategory === 'Tokenized Assets') {
        rwaUnits += t.totalPayoutsDistributedInPair;
      }
    }
    return { usdg, eth, rwaUnits };
  }, [tokens]);

  return (
    <div className="space-y-6">
      {/* =====================================================================
          1. SPLIT TWO-CARD EDITORIAL HERO (DARK #081C19 + FOAM #F5FEFD)
      ===================================================================== */}
      <section
        aria-label="PipoPad Hero and Live Bonus Calculator"
        className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch"
      >
        {/* Left Card (7 cols): Minimalist Dark #081C19 Value Proposition */}
        <div className="lg:col-span-7 rounded-[28px] lg:rounded-[36px] bg-[#081C19] border border-[#0F3933] p-7 sm:p-9 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
              <span className="eyebrow-mono text-[#97FCE4]">
                • ROBINHOOD CHAIN LAUNCHPAD
              </span>
              <span className="font-mono-label text-[11px] text-[#89B0A9]">
                POSITIVE-ENTRY VAULTS
              </span>
            </div>

            <h1 className="display-hero-xl text-[36px] sm:text-[52px] xl:text-[60px] text-[#F5FEFD] max-w-2xl">
              Buy with a bonus.{' '}
              <span className="inline-flex items-center px-4 py-0.5 rounded-full bg-[#97FCE4] text-[#04060C] align-baseline">
                Hold for payouts.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-[#89B0A9] mt-5 max-w-xl leading-relaxed">
              Every token purchase credits{' '}
              <strong className="text-[#F5FEFD] font-semibold">
                +2% to +9% extra bonus tokens
              </strong>{' '}
              immediately from the Locked Treasury Vault—while holders earn
              automatic{' '}
              <strong className="text-[#F5FEFD] font-semibold">
                USDG, ETH, or RWA
              </strong>{' '}
              payouts directly to their wallet.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-[#0F3933] space-y-5">
            {/* 3 Minimalist Step Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div className="px-4 py-3 rounded-2xl bg-[#04060C] border border-[#0F3933]">
                <span className="font-mono-label text-[10px] text-[#97FCE4] font-bold block">
                  STEP 01
                </span>
                <span className="text-xs font-bold text-[#F5FEFD] mt-0.5 block">
                  Pick a Vault Pair
                </span>
              </div>
              <div className="px-4 py-3 rounded-2xl bg-[#04060C] border border-[#0F3933]">
                <span className="font-mono-label text-[10px] text-[#97FCE4] font-bold block">
                  STEP 02
                </span>
                <span className="text-xs font-bold text-[#F5FEFD] mt-0.5 block">
                  Get +2% to +9% Bonus
                </span>
              </div>
              <div className="px-4 py-3 rounded-2xl bg-[#04060C] border border-[#0F3933]">
                <span className="font-mono-label text-[10px] text-[#97FCE4] font-bold block">
                  STEP 03
                </span>
                <span className="text-xs font-bold text-[#F5FEFD] mt-0.5 block">
                  Receive Auto Payouts
                </span>
              </div>
            </div>

            {/* Primary & Secondary Pill CTAs */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  document
                    .getElementById('discover-tokens-section')
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="h-11 px-6 rounded-full bg-[#97FCE4] hover:bg-[#76F7D9] text-[#04060C] text-xs sm:text-sm font-bold inline-flex items-center gap-2 transition-colors cursor-pointer"
              >
                <span>Explore Launches</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <button
                type="button"
                onClick={onNavigateCreate}
                className="h-11 px-6 rounded-full bg-[#04060C] hover:bg-[#0F3933] border border-[#0F3933] text-[#F5FEFD] text-xs sm:text-sm font-bold inline-flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4 text-[#97FCE4]" />
                <span>Create Token</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Card (5 cols): Foam (#F5FEFD) Live Buy Bonus Calculator */}
        {heroToken && (
          <div className="lg:col-span-5 rounded-[28px] lg:rounded-[36px] bg-[#F5FEFD] text-[#04060C] border border-[#C2E8E2] p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#C2E8E2]">
                <span className="eyebrow-mono text-[#04060C] font-bold">
                  LIVE BUY BONUS CALCULATOR
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#04060C] text-[#97FCE4] font-mono-label text-[10px] font-bold">
                  INSTANT QUOTE
                </span>
              </div>

              {/* Token Selector Pills */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono-label text-[10px] uppercase font-bold text-[#04060C]/70">
                    1. Choose Token Vault
                  </span>
                  <span className="font-mono-label text-[10px] font-bold text-[#04060C]">
                    Pair: {heroToken.ticker}/{heroToken.pairSymbol}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {tokens.slice(0, 5).map((tok) => {
                    const active = tok.id === heroToken.id;
                    return (
                      <button
                        key={tok.id}
                        type="button"
                        onClick={() => {
                          setHeroTokenId(tok.id);
                          setHeroSpendAmount(
                            tok.pairSymbol === 'ETH' ||
                              tok.pairSymbol === 'xGOLD'
                              ? 1
                              : 250
                          );
                        }}
                        className={`px-3 py-1.5 rounded-full font-mono-label text-xs font-bold flex items-center gap-1.5 border transition-colors cursor-pointer ${
                          active
                            ? 'bg-[#04060C] border-[#04060C] text-[#F5FEFD]'
                            : 'bg-[#E6F7F5] border-[#C2E8E2] text-[#04060C] hover:border-[#0F3933]'
                        }`}
                      >
                        <PairBadgeIconSVG
                          symbol={tok.pairSymbol}
                          className="w-3.5 h-3.5"
                        />
                        <span>{tok.ticker}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Spend Amount Input */}
              <div className="p-3.5 rounded-2xl bg-[#E6F7F5] border border-[#C2E8E2] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <label
                    htmlFor="hero-preview-amount"
                    className="font-mono-label text-[10px] uppercase font-bold text-[#04060C]/70"
                  >
                    2. You Pay ({heroToken.pairSymbol})
                  </label>
                  <div className="flex items-center gap-1">
                    {(heroToken.pairSymbol === 'ETH' ||
                    heroToken.pairSymbol === 'xGOLD'
                      ? [0.5, 1, 2.5]
                      : [100, 250, 1000]
                    ).map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setHeroSpendAmount(amt)}
                        className={`px-2.5 py-0.5 rounded-full font-mono-label text-[10px] font-bold transition-colors cursor-pointer ${
                          heroSpendAmount === amt
                            ? 'bg-[#04060C] text-[#97FCE4]'
                            : 'bg-[#F5FEFD] text-[#04060C] border border-[#C2E8E2]'
                        }`}
                      >
                        {amt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <input
                    id="hero-preview-amount"
                    type="number"
                    min="0.01"
                    step="any"
                    value={heroSpendAmount}
                    onChange={(e) =>
                      setHeroSpendAmount(Math.max(0, Number(e.target.value)))
                    }
                    className="w-full bg-transparent font-display font-extrabold text-2xl text-[#04060C] focus:outline-none"
                  />
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5FEFD] border border-[#C2E8E2] font-mono-label text-xs font-bold text-[#04060C] shrink-0">
                    <PairBadgeIconSVG
                      symbol={heroToken.pairSymbol}
                      className="w-3.5 h-3.5"
                    />
                    <span>{heroToken.pairSymbol}</span>
                  </span>
                </div>
              </div>

              {/* Minimalist Receipt Breakdown */}
              <div className="space-y-2 text-xs pt-1">
                <div className="flex items-center justify-between text-[#04060C]/80 font-medium">
                  <span>Standard Swap Output</span>
                  <span className="font-mono-label font-bold text-[#04060C]">
                    {heroQuote.standardSwapOutput.toLocaleString()}{' '}
                    {heroToken.ticker}
                  </span>
                </div>

                <div className="px-3.5 py-2.5 rounded-2xl bg-[#97FCE4] text-[#04060C] flex items-center justify-between font-bold">
                  <span>Free Vault Bonus (+{heroToken.buyBonusRate}%)</span>
                  <span className="font-mono-label font-extrabold">
                    +{heroQuote.pipoVaultBonusTokens.toLocaleString()}{' '}
                    {heroToken.ticker}
                  </span>
                </div>

                {heroToken.holderPayoutRate > 0 && (
                  <div className="px-3.5 py-2 rounded-2xl bg-[#0F3933] text-[#F5FEFD] flex items-center justify-between font-bold">
                    <span>Auto Holder Rewards</span>
                    <span className="font-mono-label font-extrabold text-[#97FCE4]">
                      {heroToken.holderPayoutRate}% Paid in{' '}
                      {heroToken.pairSymbol}
                    </span>
                  </div>
                )}

                <div className="pt-2.5 border-t border-[#C2E8E2] flex items-baseline justify-between">
                  <span className="font-mono-label text-[11px] uppercase font-bold text-[#04060C]/75">
                    Total You Receive
                  </span>
                  <span className="font-display font-extrabold text-2xl text-[#04060C] font-mono-label">
                    {heroQuote.totalTokensReceived.toLocaleString()}{' '}
                    {heroToken.ticker}
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onSelectToken(heroToken)}
              className="mt-5 w-full h-11 rounded-full bg-[#04060C] hover:bg-[#0F3933] text-[#F5FEFD] text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <span>Open {heroToken.ticker} Vault &amp; Swap</span>
              <ArrowUpRight className="w-4 h-4 text-[#97FCE4]" />
            </button>
          </div>
        )}
      </section>

      {/* =====================================================================
          2. COMPACT 4-CARD BENTO METRICS STRIP
      ===================================================================== */}
      <section
        aria-label="Protocol Statistics"
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5"
      >
        <div className="rounded-[24px] bg-[#081C19] border border-[#0F3933] p-5 flex flex-col justify-between">
          <span className="eyebrow-mono text-[#89B0A9]">
            TOTAL BONUS CREDITED
          </span>
          <div className="mt-2 flex items-baseline justify-between gap-2">
            <span className="font-display font-extrabold text-2xl sm:text-3xl text-[#97FCE4] font-mono-label">
              +{(totalBonusCreditedAll / 1_000_000).toFixed(2)}M
            </span>
            <span className="font-mono-label text-[11px] text-[#89B0A9]">
              Extra Tokens
            </span>
          </div>
        </div>

        <div className="rounded-[24px] bg-[#081C19] border border-[#0F3933] p-5 flex flex-col justify-between">
          <span className="eyebrow-mono text-[#89B0A9]">
            TOTAL HOLDER PAYOUTS
          </span>
          <div className="mt-2 flex flex-wrap items-baseline justify-between gap-2">
            <span className="font-display font-extrabold text-lg sm:text-xl text-[#F5FEFD] font-mono-label">
              {(payoutsByAssetSummary.usdg / 1000).toFixed(1)}K USDG ·{' '}
              {payoutsByAssetSummary.eth.toFixed(1)} ETH
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#0F3933] border border-[#97FCE4]/30 text-[#97FCE4] font-mono-label text-[10px] font-extrabold shrink-0">
              +{payoutsByAssetSummary.rwaUnits.toFixed(1)} RWA
            </span>
          </div>
        </div>

        <div className="rounded-[24px] bg-[#081C19] border border-[#0F3933] p-5 flex flex-col justify-between">
          <span className="eyebrow-mono text-[#89B0A9]">ACTIVE VAULTS</span>
          <div className="mt-2 flex items-baseline justify-between gap-2">
            <span className="font-display font-extrabold text-2xl sm:text-3xl text-[#F5FEFD] font-mono-label">
              {tokens.length}
            </span>
            <span className="font-mono-label text-[11px] text-[#97FCE4]">
              Self-Refilling
            </span>
          </div>
        </div>

        <div className="rounded-[24px] bg-[#081C19] border border-[#0F3933] p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between gap-2">
            <span className="eyebrow-mono text-[#89B0A9]">$PIPO BURNED</span>
            <button
              type="button"
              onClick={onTriggerBurnRound}
              className="px-2.5 py-0.5 rounded-full bg-[#97FCE4] hover:bg-[#76F7D9] text-[#04060C] font-mono-label text-[10px] font-extrabold inline-flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Flame className="w-3 h-3 fill-[#04060C]" />
              <span>Trigger Burn</span>
            </button>
          </div>
          <div className="mt-2 flex items-baseline justify-between gap-2">
            <span
              data-testid="pipo-burned-counter"
              className="font-display font-extrabold text-2xl sm:text-3xl text-[#F5FEFD] font-mono-label"
            >
              {pipoBurnedTotal.toLocaleString()}
            </span>
            <span className="font-mono-label text-[11px] text-[#89B0A9]">
              0.5% Fee Burn
            </span>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. FEATURED LAUNCH SPOTLIGHT (2-COLUMN EDITORIAL BENTO)
      ===================================================================== */}
      {featuredToken && (
        <section aria-label="Featured Launches" className="space-y-4 pt-2">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <span className="eyebrow-mono text-[#97FCE4]">
                / CURATED SPOTLIGHT
              </span>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#F5FEFD] tracking-tight mt-1">
                Featured Launches
              </h2>
            </div>
            <span className="font-mono-label text-xs text-[#89B0A9]">
              Select a token on the right to preview its vault
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            {/* Left: Large Active Token Showcase (7 cols) */}
            <div
              data-testid="featured-showcase-card"
              className="lg:col-span-7 rounded-[28px] lg:rounded-[32px] bg-[#081C19] border border-[#0F3933] overflow-hidden flex flex-col justify-between"
            >
              {/* Top Media Artwork Header */}
              <div className="bg-[#04060C] border-b border-[#0F3933] p-6 sm:p-7">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <TokenAvatarWithOfficialLogo
                      ticker={featuredToken.ticker}
                      pairSymbol={featuredToken.pairSymbol}
                      avatarBg={featuredToken.avatarBg}
                      avatarLabel={featuredToken.avatarLabel}
                      logoUrl={featuredToken.logoUrl}
                      size="xl"
                    />
                    <div>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-[#89B0A9] font-mono-label">
                        <span className="inline-flex items-center gap-1.5 text-[#F5FEFD] font-bold">
                          <PairBadgeIconSVG
                            symbol={featuredToken.pairSymbol}
                            className="w-3.5 h-3.5"
                          />
                          <span>{featuredToken.pairSymbol} Pair</span>
                        </span>
                        <span>·</span>
                        <span>{featuredToken.pairCategory}</span>
                        <span>·</span>
                        <span>{featuredToken.contractAddress}</span>
                      </div>
                      <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[#F5FEFD] mt-1.5">
                        {featuredToken.name}{' '}
                        <span className="font-mono-label text-lg text-[#97FCE4]">
                          {featuredToken.ticker}
                        </span>
                      </h3>
                    </div>
                  </div>

                  {/* Sparkline & 24h Price Change */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0">
                    <div className="text-left sm:text-right font-mono-label">
                      <div className="text-xl font-extrabold text-[#F5FEFD]">
                        ${featuredToken.priceUsd.toFixed(4)}
                      </div>
                      <div
                        className={`text-xs font-bold ${
                          featuredToken.change24h >= 0
                            ? 'text-[#97FCE4]'
                            : 'text-[#FF6868]'
                        }`}
                      >
                        {featuredToken.change24h >= 0 ? '+' : ''}
                        {featuredToken.change24h.toFixed(1)}% (24h)
                      </div>
                    </div>
                    <MiniPriceSparklineSVG
                      data={featuredToken.priceHistory['24H']}
                      isPositive={featuredToken.change24h >= 0}
                      className="w-24 h-8"
                    />
                  </div>
                </div>
              </div>

              {/* Showcase Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
                <p className="text-sm text-[#89B0A9] leading-relaxed">
                  {featuredToken.description}
                </p>

                {/* Two Solid Editorial Reward Cards (#97FCE4 & #0F3933) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="p-4 rounded-2xl bg-[#97FCE4] text-[#04060C] flex items-center justify-between">
                    <div>
                      <div className="font-mono-label text-[10px] uppercase font-bold opacity-80">
                        INSTANT BUY BONUS
                      </div>
                      <div className="font-display font-extrabold text-xl mt-0.5">
                        +{featuredToken.buyBonusRate}% Extra Tokens
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-[#04060C] text-[#97FCE4] font-mono-label text-[10px] font-extrabold">
                      ON BUY
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#0F3933] border border-[#97FCE4]/25 text-[#F5FEFD] flex items-center justify-between">
                    <div>
                      <div className="font-mono-label text-[10px] uppercase font-bold text-[#97FCE4]">
                        AUTO HOLDER PAYOUT
                      </div>
                      <div className="font-display font-extrabold text-xl mt-0.5">
                        {featuredToken.holderPayoutRate > 0
                          ? `${featuredToken.holderPayoutRate}% in ${featuredToken.pairSymbol}`
                          : 'Max Entry Bonus Vault'}
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-[#04060C] text-[#F5FEFD] font-mono-label text-[10px] font-extrabold">
                      {featuredToken.pairSymbol}
                    </span>
                  </div>
                </div>

                {/* Bottom Metrics & Trade Token CTA */}
                <div className="pt-4 border-t border-[#0F3933] flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-6 text-xs">
                    <div>
                      <span className="text-[#89B0A9] block">Market Cap</span>
                      <span className="font-mono-label font-bold text-[#F5FEFD] text-sm">
                        ${(featuredToken.marketCapUsd / 1_000_000).toFixed(2)}M
                      </span>
                    </div>
                    <div>
                      <span className="text-[#89B0A9] block">
                        Vault Reserve ({featuredToken.vaultLockedPercent}%)
                      </span>
                      <span className="font-mono-label font-bold text-[#97FCE4] text-sm">
                        {(
                          featuredToken.vaultTokensRemaining / 1_000_000
                        ).toFixed(1)}
                        M {featuredToken.ticker}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#89B0A9] block">
                        Next Payout Pot
                      </span>
                      <span className="font-mono-label font-bold text-[#F5FEFD] text-sm">
                        {featuredToken.nextPayoutPotInPair.toLocaleString()}{' '}
                        {featuredToken.pairSymbol}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectToken(featuredToken)}
                    className="h-10 px-5 rounded-full bg-[#97FCE4] hover:bg-[#76F7D9] text-[#04060C] text-xs font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Trade {featuredToken.ticker}</span>
                    <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Minimalist Selectable Token List (5 cols) */}
            <div className="lg:col-span-5 rounded-[28px] lg:rounded-[32px] bg-[#04060C] border border-[#0F3933] p-4 sm:p-5 flex flex-col justify-between space-y-2">
              <div className="px-2 py-1 flex items-center justify-between font-mono-label text-[10px] uppercase text-[#89B0A9]">
                <span>TOP 5 ACTIVE VAULTS</span>
                <span>MCAP · BONUS</span>
              </div>

              <div className="space-y-2 flex-1 flex flex-col justify-center">
                {featuredList.map((tok) => {
                  const isSelected = tok.id === featuredToken.id;
                  const isPos = tok.change24h >= 0;
                  return (
                    <button
                      key={tok.id}
                      type="button"
                      onClick={() => setFeaturedActiveId(tok.id)}
                      className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between gap-3 transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-[#081C19] border-[#97FCE4]'
                          : 'bg-[#04060C] border-[#0F3933] hover:bg-[#081C19]'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <TokenAvatarWithOfficialLogo
                          ticker={tok.ticker}
                          pairSymbol={tok.pairSymbol}
                          avatarBg={tok.avatarBg}
                          avatarLabel={tok.avatarLabel}
                          logoUrl={tok.logoUrl}
                          size="sm"
                        />
                        <div className="min-w-0">
                          <div className="text-sm font-bold text-[#F5FEFD] truncate">
                            {tok.name}
                          </div>
                          <div className="flex items-center gap-1.5 font-mono-label text-[11px] text-[#89B0A9]">
                            <span className="text-[#F5FEFD] font-semibold">
                              {tok.ticker}
                            </span>
                            <span>·</span>
                            <span>{tok.pairSymbol}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5 shrink-0 font-mono-label">
                        <div className="text-right">
                          <div className="text-xs font-bold text-[#F5FEFD]">
                            ${(tok.marketCapUsd / 1_000_000).toFixed(2)}M
                          </div>
                          <div
                            className={`text-[11px] font-bold ${
                              isPos ? 'text-[#97FCE4]' : 'text-[#FF6868]'
                            }`}
                          >
                            {isPos ? '+' : ''}
                            {tok.change24h.toFixed(1)}%
                          </div>
                        </div>

                        <span className="px-2.5 py-1 rounded-full bg-[#97FCE4] text-[#04060C] text-[11px] font-extrabold">
                          +{tok.buyBonusRate}%
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =====================================================================
          4. MINIMALIST DISCOVER TOKENS MARKETPLACE
      ===================================================================== */}
      <section
        id="discover-tokens-section"
        aria-label="Discover Tokens"
        className="space-y-5 pt-4 scroll-mt-24"
      >
        {/* Discover Header + Search Input */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="eyebrow-mono text-[#89B0A9]">
              / MARKET DIRECTORY
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#F5FEFD] tracking-tight mt-1">
              Discover Tokens
            </h2>
          </div>

          {/* Minimalist Search Input + Grid/List Switcher */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-[#89B0A9] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                aria-label="Search tokens by name, ticker, or pair"
                placeholder="Search token, ticker, or pair..."
                value={globalSearchQuery}
                onChange={(e) => onGlobalSearchChange?.(e.target.value)}
                className="w-full h-10 pl-10 pr-8 rounded-full bg-[#081C19] border border-[#0F3933] focus:border-[#97FCE4] text-xs text-[#F5FEFD] placeholder-[#5E857E] focus:outline-none transition-colors"
              />
              {globalSearchQuery && (
                <button
                  type="button"
                  aria-label="Clear search query"
                  onClick={() => onGlobalSearchChange?.('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#89B0A9] hover:text-[#F5FEFD] cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div
              role="group"
              aria-label="Layout view mode"
              className="inline-flex items-center p-1 rounded-full bg-[#081C19] border border-[#0F3933]"
            >
              <button
                type="button"
                aria-label="Grid view"
                onClick={() => setViewLayout('grid')}
                className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                  viewLayout === 'grid'
                    ? 'bg-[#97FCE4] text-[#04060C]'
                    : 'text-[#89B0A9] hover:text-[#F5FEFD]'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                aria-label="List view"
                onClick={() => setViewLayout('list')}
                className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                  viewLayout === 'list'
                    ? 'bg-[#97FCE4] text-[#04060C]'
                    : 'text-[#89B0A9] hover:text-[#F5FEFD]'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Clean Pill Filter & Sort Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-[#0F3933]">
          {/* Sort Pill Tabs */}
          <div
            role="group"
            aria-label="Sort Launchpad Tokens"
            className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1"
          >
            {SORT_OPTIONS.map((opt) => {
              const active = normalizeSort(sortFilter) === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSortFilter(opt.id)}
                  className={`h-9 px-4 rounded-full text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#97FCE4] text-[#04060C]'
                      : 'bg-[#081C19] text-[#89B0A9] hover:text-[#F5FEFD] border border-[#0F3933]'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>

          {/* Pair Category Filter Pills */}
          <div
            role="group"
            aria-label="Filter by Pair Asset Category"
            className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1"
          >
            {PAIR_FILTER_OPTIONS.map((pf) => {
              const active = pairFilter === pf;
              return (
                <button
                  key={pf}
                  type="button"
                  onClick={() => setPairFilter(pf)}
                  className={`h-9 px-4 rounded-full text-xs font-bold whitespace-nowrap border transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#F5FEFD] text-[#04060C] border-[#F5FEFD]'
                      : 'bg-[#081C19] text-[#89B0A9] border-[#0F3933] hover:text-[#F5FEFD]'
                  }`}
                >
                  {pf}
                </button>
              );
            })}
          </div>
        </div>

        {/* Empty State */}
        {filteredTokens.length === 0 ? (
          <div className="rounded-[28px] bg-[#081C19] border border-[#0F3933] p-12 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#04060C] border border-[#0F3933] flex items-center justify-center mx-auto text-[#89B0A9]">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-[#F5FEFD]">
                No matching token launches found
              </h3>
              <p className="text-xs sm:text-sm text-[#89B0A9] mt-1 max-w-md mx-auto">
                Clear your search or launch a new Positive-Entry vault on
                Robinhood Chain.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3">
              {globalSearchQuery && (
                <button
                  type="button"
                  onClick={() => onGlobalSearchChange?.('')}
                  className="h-10 px-5 rounded-full bg-[#04060C] border border-[#0F3933] text-xs font-bold text-[#F5FEFD] cursor-pointer"
                >
                  Reset Search
                </button>
              )}
              <button
                type="button"
                onClick={onNavigateCreate}
                className="h-10 px-5 rounded-full bg-[#97FCE4] text-[#04060C] text-xs font-bold cursor-pointer"
              >
                Create Token
              </button>
            </div>
          </div>
        ) : viewLayout === 'grid' ? (
          /* =====================================================================
             3-COLUMN MINIMALIST EDITORIAL TOKEN CARDS
          ===================================================================== */
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredTokens.map((token) => {
              const isPositive = token.change24h >= 0;

              return (
                <article
                  key={token.id}
                  onClick={() => onSelectToken(token)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelectToken(token);
                    }
                  }}
                  aria-label={`Inspect and trade ${token.name} (${token.ticker})`}
                  className="rounded-[28px] bg-[#081C19] hover:bg-[#0F3933] border border-[#0F3933] hover:border-[#97FCE4]/60 p-5 flex flex-col justify-between transition-colors cursor-pointer group"
                >
                  <div>
                    {/* 1. TOP MEDIA CONTAINER (Inset #04060C Header) */}
                    <div className="h-36 rounded-[20px] bg-[#04060C] border border-[#0F3933] p-4 flex flex-col justify-between">
                      {/* Top Row: Quiet Pair Metadata + 24h Change */}
                      <div className="flex items-center justify-between gap-2 font-mono-label text-xs">
                        <span className="inline-flex items-center gap-1.5 text-[#F5FEFD] font-bold">
                          <PairBadgeIconSVG
                            symbol={token.pairSymbol}
                            className="w-3.5 h-3.5"
                          />
                          <span>{token.pairSymbol} Pair</span>
                        </span>

                        <span
                          className={`font-bold ${
                            isPositive ? 'text-[#97FCE4]' : 'text-[#FF6868]'
                          }`}
                        >
                          {isPositive ? '+' : ''}
                          {token.change24h.toFixed(1)}% (24h)
                        </span>
                      </div>

                      {/* Bottom Row: Token Avatar + Mini Price Sparkline */}
                      <div className="flex items-end justify-between gap-3">
                        <TokenAvatarWithOfficialLogo
                          ticker={token.ticker}
                          pairSymbol={token.pairSymbol}
                          avatarBg={token.avatarBg}
                          avatarLabel={token.avatarLabel}
                          logoUrl={token.logoUrl}
                          size="lg"
                        />

                        <div className="flex flex-col items-end gap-1">
                          <MiniPriceSparklineSVG
                            data={token.priceHistory['24H']}
                            isPositive={isPositive}
                            className="w-20 h-6"
                          />
                          <span className="font-mono-label text-xs font-bold text-[#F5FEFD]">
                            ${token.priceUsd.toFixed(4)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* 2. TOKEN TITLE & DESCRIPTION */}
                    <div className="mt-4">
                      <div className="flex items-baseline justify-between gap-2">
                        <h3 className="font-display font-extrabold text-xl text-[#F5FEFD] group-hover:text-[#97FCE4] transition-colors truncate">
                          {token.name}
                        </h3>
                        <span className="font-mono-label text-xs font-bold text-[#89B0A9] shrink-0">
                          {token.ticker}
                        </span>
                      </div>
                      <p className="text-xs text-[#89B0A9] line-clamp-2 leading-relaxed mt-1">
                        {token.description}
                      </p>
                    </div>

                    {/* 3. TWO CLEAR REWARD BOXES (BUY BONUS #97FCE4 + HOLDER PAYOUT #0F3933) */}
                    <div className="mt-4 grid grid-cols-2 gap-2.5">
                      <div className="p-3 rounded-2xl bg-[#97FCE4] text-[#04060C]">
                        <span className="font-mono-label text-[9px] uppercase font-bold block opacity-80">
                          BUY BONUS
                        </span>
                        <span className="font-display font-extrabold text-base block mt-0.5">
                          +{token.buyBonusRate}% Extra
                        </span>
                      </div>

                      {token.holderPayoutRate > 0 ? (
                        <div className="p-3 rounded-2xl bg-[#0F3933] border border-[#97FCE4]/25 text-[#F5FEFD]">
                          <span className="font-mono-label text-[9px] uppercase font-bold block text-[#97FCE4]">
                            HOLDER PAYOUT
                          </span>
                          <span className="font-display font-extrabold text-base block mt-0.5">
                            {token.holderPayoutRate}% in {token.pairSymbol}
                          </span>
                        </div>
                      ) : (
                        <div className="p-3 rounded-2xl bg-[#04060C] border border-[#0F3933] text-[#F5FEFD]">
                          <span className="font-mono-label text-[9px] uppercase text-[#89B0A9] block">
                            VAULT FOCUS
                          </span>
                          <span className="font-display font-bold text-sm block mt-0.5">
                            Max Entry Boost
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 4. FOOTER METRICS & ROUNDED-FULL CTA */}
                  <div className="mt-4 pt-3.5 border-t border-[#0F3933] flex items-center justify-between gap-2 text-xs">
                    <div className="font-mono-label">
                      <span className="text-[#89B0A9]">MCap </span>
                      <span className="text-[#F5FEFD] font-bold">
                        ${(token.marketCapUsd / 1_000_000).toFixed(2)}M
                      </span>
                      <span className="text-[#5E857E] mx-1.5">·</span>
                      <span className="text-[#97FCE4] font-bold">
                        {(token.vaultTokensRemaining / 1_000_000).toFixed(0)}M
                        Vault
                      </span>
                    </div>

                    <span className="inline-flex items-center gap-1 font-bold text-[#F5FEFD] group-hover:text-[#97FCE4] transition-colors">
                      <span>Trade</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          /* =====================================================================
             CLEAN TABLE LIST VIEW
          ===================================================================== */
          <div className="rounded-[28px] bg-[#081C19] border border-[#0F3933] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-[#04060C] font-mono-label text-[11px] uppercase text-[#89B0A9] border-b border-[#0F3933]">
                    <th className="py-3.5 px-5">TOKEN VAULT</th>
                    <th className="py-3.5 px-4">PAIR</th>
                    <th className="py-3.5 px-4">PRICE / 24H</th>
                    <th className="py-3.5 px-4">BUY BONUS</th>
                    <th className="py-3.5 px-4">HOLDER PAYOUT</th>
                    <th className="py-3.5 px-4">MARKET CAP</th>
                    <th className="py-3.5 px-5 text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#0F3933]">
                  {filteredTokens.map((token) => {
                    const isPos = token.change24h >= 0;
                    return (
                      <tr
                        key={token.id}
                        onClick={() => onSelectToken(token)}
                        className="hover:bg-[#0F3933] transition-colors cursor-pointer"
                      >
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-3">
                            <TokenAvatarWithOfficialLogo
                              ticker={token.ticker}
                              pairSymbol={token.pairSymbol}
                              avatarBg={token.avatarBg}
                              avatarLabel={token.avatarLabel}
                              logoUrl={token.logoUrl}
                              size="sm"
                            />
                            <div>
                              <div className="font-bold text-[#F5FEFD] text-sm">
                                {token.name}
                              </div>
                              <div className="font-mono-label text-[11px] text-[#89B0A9]">
                                {token.ticker}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 font-mono-label">
                          <span className="inline-flex items-center gap-1.5 text-[#F5FEFD] font-semibold">
                            <PairBadgeIconSVG
                              symbol={token.pairSymbol}
                              className="w-3.5 h-3.5"
                            />
                            <span>{token.pairSymbol}</span>
                          </span>
                        </td>
                        <td className="py-4 px-4 font-mono-label">
                          <div className="text-[#F5FEFD] font-bold">
                            ${token.priceUsd.toFixed(4)}
                          </div>
                          <div
                            className={
                              isPos ? 'text-[#97FCE4]' : 'text-[#FF6868]'
                            }
                          >
                            {isPos ? '+' : ''}
                            {token.change24h.toFixed(1)}%
                          </div>
                        </td>
                        <td className="py-4 px-4 font-mono-label">
                          <span className="px-2.5 py-1 rounded-full bg-[#97FCE4] text-[#04060C] font-extrabold text-[11px]">
                            +{token.buyBonusRate}% Bonus
                          </span>
                        </td>
                        <td className="py-4 px-4 font-mono-label">
                          {token.holderPayoutRate > 0 ? (
                            <span className="px-2.5 py-1 rounded-full bg-[#0F3933] border border-[#97FCE4]/30 text-[#97FCE4] font-extrabold text-[11px]">
                              {token.holderPayoutRate}% in {token.pairSymbol}
                            </span>
                          ) : (
                            <span className="text-[#89B0A9]">—</span>
                          )}
                        </td>
                        <td className="py-4 px-4 font-mono-label font-bold text-[#F5FEFD]">
                          ${(token.marketCapUsd / 1_000_000).toFixed(2)}M
                        </td>
                        <td className="py-4 px-5 text-right">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectToken(token);
                            }}
                            className="h-8 px-4 rounded-full bg-[#97FCE4] text-[#04060C] font-bold text-xs inline-flex items-center gap-1 cursor-pointer"
                          >
                            <span>Trade</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
