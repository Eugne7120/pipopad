import React, { useMemo, useState } from 'react';
import {
  ActivityEvent,
  PairAssetSymbol,
  PipoToken,
  PortfolioHolding,
} from './types/pipo';
import {
  INITIAL_ACTIVITY,
  INITIAL_PORTFOLIO,
  INITIAL_TOKENS,
} from './data/initialData';
import {
  AppViewMode,
  AppWorkspaceTab,
  Navbar,
  TrendingTicker,
} from './components/Navbar';
import { LandingView } from './components/LandingView';
import { ExploreView, SortFilterOption } from './components/ExploreView';
import { CreateTokenView } from './components/CreateTokenView';
import { TokenDetailView } from './components/TokenDetailView';
import { ActivityView } from './components/ActivityView';
import { ProfileSubTab, ProfileView } from './components/ProfileView';
import {
  PipoBoosterSVG,
  PipoCourierSVG,
  PipoLogoSVG,
  PipoShieldSVG,
  PipoVaultSVG,
} from './components/svg/PipoMascots';
import { calculateBuyPreview } from './utils/economics';
import { ArrowUpRight, CheckCircle2, Flame, ShieldCheck, X } from 'lucide-react';

export default function App() {
  // Default to the Marketing / Landing Page ('landing'), and switch to PipoPad OS ('app') when clicking "Open Pipo OS ->" or via ?autostart=1
  const initialView: AppViewMode = useMemo(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('autostart') === '1' || params.get('view') === 'app') {
        return 'app';
      }
    }
    return 'landing';
  }, []);

  const [view, setView] = useState<AppViewMode>(initialView);
  const [activeTab, setActiveTab] = useState<AppWorkspaceTab>('explore');
  const [tokens, setTokens] = useState<PipoToken[]>(INITIAL_TOKENS);
  const [selectedTokenId, setSelectedTokenId] = useState<string>('pipo-native');
  const [holdings, setHoldings] =
    useState<PortfolioHolding[]>(INITIAL_PORTFOLIO);
  const [activityEvents, setActivityEvents] =
    useState<ActivityEvent[]>(INITIAL_ACTIVITY);
  const [pipoBurnedTotal, setPipoBurnedTotal] = useState<number>(4820500);
  const [globalSearchQuery, setGlobalSearchQuery] = useState<string>('');

  // Navigation context options
  const [exploreSortPreset, setExploreSortPreset] =
    useState<SortFilterOption>('Trending');
  const [profileSubTabPreset, setProfileSubTabPreset] =
    useState<ProfileSubTab>('portfolio');

  // How It Works Simulator State
  const [simBaseInput, setSimBaseInput] = useState<number>(10000);
  const [simBonusRate, setSimBonusRate] = useState<number>(6);
  const simPreview = useMemo(
    () => calculateBuyPreview(simBaseInput, simBonusRate),
    [simBaseInput, simBonusRate]
  );

  // Robinhood Chain Wallet State
  const [walletConnected, setWalletConnected] = useState<boolean>(true);
  const [pairBalances, setPairBalances] = useState<
    Record<PairAssetSymbol, number>
  >({
    USDG: 14500,
    ETH: 4.85,
    $PUMP: 25000,
    $SOL: 42,
    $MEME: 120000,
    xNVDA: 28.5,
    xGOLD: 3.4,
    xTSLA: 16.0,
    wBTC: 0.24,
    'SOL-W': 35.0,
  });

  // Toast Notification State
  const [toast, setToast] = useState<{
    title: string;
    detail: string;
  } | null>(null);

  const showToast = (title: string, detail: string) => {
    setToast({ title, detail });
    setTimeout(() => {
      setToast((prev) => (prev?.title === title ? null : prev));
    }, 4500);
  };

  const selectedToken = useMemo(
    () => tokens.find((t) => t.id === selectedTokenId) || tokens[0],
    [tokens, selectedTokenId]
  );

  const handleTriggerBurnRound = () => {
    const burnedNow = 42500 + Math.floor(Math.random() * 12000);
    setPipoBurnedTotal((prev) => prev + burnedNow);
    const burnEvent: ActivityEvent = {
      id: `burn-${Date.now()}`,
      type: 'PIPO_BURN',
      tokenTicker: '$PIPO',
      tokenId: 'pipo-native',
      pairSymbol: 'USDG',
      wallet: 'Pipo Burn Engine',
      pairAmount: 2100,
      burnAmountPipo: burnedNow,
      timestamp: 'Just now',
      txHash: `0x${Math.floor(1000 + Math.random() * 9000)}...burn`,
    };
    setActivityEvents((prev) => [burnEvent, ...prev]);
    showToast(
      '$PIPO Auto-Burn Executed',
      `Protocol fee vault market-bought and permanently burned ${burnedNow.toLocaleString()} $PIPO on Robinhood Chain.`
    );
  };

  const handleOpenAppFromLanding = (
    tab: AppWorkspaceTab,
    options?: {
      filterSort?: string;
      profileSubTab?: 'portfolio' | 'creator' | 'inspector';
      triggerBurn?: boolean;
      openNativePipo?: boolean;
    }
  ) => {
    if (options?.filterSort) {
      setExploreSortPreset(options.filterSort as SortFilterOption);
    }
    if (options?.profileSubTab) {
      setProfileSubTabPreset(options.profileSubTab);
    }
    if (options?.openNativePipo) {
      setSelectedTokenId('pipo-native');
    }
    setView('app');
    setActiveTab(tab === 'profile' ? 'portfolio' : tab);
    window.scrollTo(0, 0);

    if (options?.triggerBurn) {
      handleTriggerBurnRound();
    }
  };

  const handleCreateToken = (newToken: PipoToken) => {
    setTokens((prev) => [newToken, ...prev]);
    setHoldings((prev) => [
      {
        tokenId: newToken.id,
        tokenName: newToken.name,
        tokenTicker: newToken.ticker,
        pairSymbol: newToken.pairSymbol,
        balanceTokens: 500000,
        bonusTokensEarnedOnEntry: Math.round(
          500000 * (newToken.buyBonusRate / 100)
        ),
        holdDays: 1,
        multiplier: 1.0,
        multiplierLabel: '1x (0-3d)',
        payoutsReceivedInPair: 0,
        estimatedNextPayoutInPair: Number(
          (newToken.nextPayoutPotInPair * 0.05).toFixed(4)
        ),
      },
      ...prev,
    ]);

    const launchEvent: ActivityEvent = {
      id: `launch-${Date.now()}`,
      type: 'NEW_LAUNCH',
      tokenTicker: newToken.ticker,
      tokenId: newToken.id,
      pairSymbol: newToken.pairSymbol,
      wallet: '0x71C...9A2B',
      pairAmount: 1000,
      bonusTokens: newToken.vaultTokensRemaining,
      timestamp: 'Just now',
      txHash: `0x${Math.floor(1000 + Math.random() * 9000)}...init`,
    };
    setActivityEvents((prev) => [launchEvent, ...prev]);
    setSelectedTokenId(newToken.id);
    setActiveTab('detail');
    window.scrollTo(0, 0);
    showToast(
      `${newToken.name} (${newToken.ticker}) Launched!`,
      `Paired with ${newToken.pairSymbol} (+${newToken.buyBonusRate}% Buy Bonus & ${newToken.holderPayoutRate}% Holder Payouts).`
    );
  };

  const handleExecuteSwap = (params: {
    mode: 'buy' | 'sell';
    token: PipoToken;
    pairAmount: number;
    tokenAmount: number;
    bonusTokens: number;
    vaultRefillTokens: number;
    holderPayoutInPair: number;
  }) => {
    const {
      mode,
      token,
      pairAmount,
      tokenAmount,
      bonusTokens,
      vaultRefillTokens,
      holderPayoutInPair,
    } = params;

    // 1. Update Token Vault Telemetry
    setTokens((prev) =>
      prev.map((t) => {
        if (t.id !== token.id) return t;
        if (mode === 'buy') {
          return {
            ...t,
            vaultTokensRemaining: Math.max(
              0,
              t.vaultTokensRemaining - bonusTokens
            ),
            totalBonusCredited: t.totalBonusCredited + bonusTokens,
            nextPayoutPotInPair: Number(
              (t.nextPayoutPotInPair + holderPayoutInPair).toFixed(4)
            ),
            volume24hUsd: t.volume24hUsd + Math.round(pairAmount * 10),
          };
        } else {
          return {
            ...t,
            vaultTokensRemaining: t.vaultTokensRemaining + vaultRefillTokens,
            totalVaultRefilled: t.totalVaultRefilled + vaultRefillTokens,
            nextPayoutPotInPair: Number(
              (t.nextPayoutPotInPair + holderPayoutInPair).toFixed(4)
            ),
          };
        }
      })
    );

    // 2. Update User Pair Balance
    setPairBalances((prev) => {
      const current = prev[token.pairSymbol] ?? 1000;
      return {
        ...prev,
        [token.pairSymbol]:
          mode === 'buy'
            ? Math.max(0, Number((current - pairAmount).toFixed(4)))
            : Number((current + pairAmount).toFixed(4)),
      };
    });

    // 3. Update User Portfolio Holdings
    setHoldings((prev) => {
      const existing = prev.find((h) => h.tokenId === token.id);
      if (existing) {
        return prev.map((h) =>
          h.tokenId === token.id
            ? {
                ...h,
                balanceTokens:
                  mode === 'buy'
                    ? h.balanceTokens + tokenAmount
                    : Math.max(0, h.balanceTokens - tokenAmount),
                bonusTokensEarnedOnEntry:
                  h.bonusTokensEarnedOnEntry + bonusTokens,
                payoutsReceivedInPair: Number(
                  (h.payoutsReceivedInPair + holderPayoutInPair * 0.25).toFixed(
                    4
                  )
                ),
              }
            : h
        );
      }
      return [
        {
          tokenId: token.id,
          tokenName: token.name,
          tokenTicker: token.ticker,
          pairSymbol: token.pairSymbol,
          balanceTokens: tokenAmount,
          bonusTokensEarnedOnEntry: bonusTokens,
          holdDays: 1,
          multiplier: 1.0,
          multiplierLabel: '1x (0-3d)',
          payoutsReceivedInPair: 0,
          estimatedNextPayoutInPair: Number(
            (holderPayoutInPair * 0.2).toFixed(4)
          ),
        },
        ...prev,
      ];
    });

    // 4. Prepend Activity Event
    const newEvent: ActivityEvent = {
      id: `tx-${Date.now()}`,
      type: mode === 'buy' ? 'BUY_BONUS' : 'SELL_REFILL',
      tokenTicker: token.ticker,
      tokenId: token.id,
      pairSymbol: token.pairSymbol,
      wallet: '0x71C...9A2B (You)',
      pairAmount,
      baseTokens: mode === 'buy' ? tokenAmount - bonusTokens : undefined,
      bonusTokens: mode === 'buy' ? bonusTokens : undefined,
      vaultRefillTokens: mode === 'sell' ? vaultRefillTokens : undefined,
      payoutAmountInPair: holderPayoutInPair,
      timestamp: 'Just now',
      txHash: `0x${Math.floor(1000 + Math.random() * 9000)}...swap`,
    };
    setActivityEvents((prev) => [newEvent, ...prev]);

    if (mode === 'buy') {
      showToast(
        `Positive-Entry Buy Confirmed!`,
        `Received ${tokenAmount.toLocaleString()} ${
          token.ticker
        } (including +${bonusTokens.toLocaleString()} EXTRA bonus tokens from Pipo Vault).`
      );
    } else {
      showToast(
        `Sell & Vault Refill Executed!`,
        `Returned +${vaultRefillTokens.toLocaleString()} ${
          token.ticker
        } to Pipo Vault and routed ${holderPayoutInPair} ${
          token.pairSymbol
        } to holders.`
      );
    }
  };

  const handleSimulateLiveBlock = () => {
    const sampleToken =
      tokens[Math.floor(Math.random() * tokens.length)] || tokens[0];
    const simulatedBonus = 4800 + Math.floor(Math.random() * 9000);
    const simulatedBase = Math.round(
      simulatedBonus / (sampleToken.buyBonusRate / 100)
    );

    const blockEvent: ActivityEvent = {
      id: `blk-${Date.now()}`,
      type: 'BUY_BONUS',
      tokenTicker: sampleToken.ticker,
      tokenId: sampleToken.id,
      pairSymbol: sampleToken.pairSymbol,
      wallet: `0x${Math.floor(100 + Math.random() * 899)}...${Math.floor(
        10 + Math.random() * 89
      )}F`,
      pairAmount: Number((Math.random() * 15 + 1.2).toFixed(2)),
      baseTokens: simulatedBase,
      bonusTokens: simulatedBonus,
      timestamp: 'Block #19,482,110',
      txHash: `0x${Math.floor(1000 + Math.random() * 9000)}...live`,
    };

    setActivityEvents((prev) => [blockEvent, ...prev]);
    showToast(
      `Robinhood Chain Block Confirmed`,
      `New swap on ${sampleToken.ticker}/${
        sampleToken.pairSymbol
      } credited +${simulatedBonus.toLocaleString()} bonus tokens.`
    );
  };

  const handleSwitchPayoutsToHoldersForever = (tokenId: string) => {
    setTokens((prev) =>
      prev.map((t) =>
        t.id === tokenId
          ? { ...t, payoutDestination: 'Direct to Holders Forever' }
          : t
      )
    );
    showToast(
      'Payout Route Permanently Locked to Holders',
      '100% of future swap payout fees will now stream directly to token holders forever.'
    );
  };

  const currentHoldingForSelected = useMemo(
    () =>
      holdings.find((h) => h.tokenId === selectedToken.id)?.balanceTokens ?? 0,
    [holdings, selectedToken.id]
  );

  const burnEvents = useMemo(
    () => activityEvents.filter((ev) => ev.type === 'PIPO_BURN'),
    [activityEvents]
  );

  return (
    <div className="min-h-screen bg-[#04060C] text-[#F5FEFD]">
      {/* Unified Floating Pill Navbar across Marketing Page & Pipo OS */}
      <Navbar
        view={view}
        activeTab={activeTab}
        walletConnected={walletConnected}
        walletAddress="0x71C...9A2B"
        usdgBalance={pairBalances.USDG}
        ethBalance={pairBalances.ETH}
        globalSearchQuery={globalSearchQuery}
        onGlobalSearchChange={setGlobalSearchQuery}
        onSwitchView={(newView, tab) => {
          setView(newView);
          if (tab) setActiveTab(tab);
          window.scrollTo(0, 0);
        }}
        onSelectTab={(tab) => {
          if (tab === 'portfolio') {
            setProfileSubTabPreset('portfolio');
          } else if (tab === 'rewards') {
            setProfileSubTabPreset('rewards');
          }
          setActiveTab(tab);
          window.scrollTo(0, 0);
        }}
        onToggleWallet={() => {
          setWalletConnected((prev) => {
            const next = !prev;
            showToast(
              next
                ? 'Robinhood Chain Wallet Connected'
                : 'Wallet Session Disconnected',
              next
                ? 'Connected 0x71C...9A2B on Robinhood L2 (14,500 USDG · 4.85 ETH).'
                : 'Switched to public read-only browsing mode.'
            );
            return next;
          });
        }}
        onBuyPipoClick={() => {
          setSelectedTokenId('pipo-native');
          setView('app');
          setActiveTab('detail');
          window.scrollTo(0, 0);
        }}
      />

      {/* Main Content Area */}
      {view === 'landing' ? (
        <main>
          <LandingView onOpenApp={handleOpenAppFromLanding} />
        </main>
      ) : (
        <div className="page-shell pt-6 pb-20 space-y-6">
          {/* Auto-Scrolling 24H Trending Ticker Pill Bar */}
          <TrendingTicker
            tokens={tokens}
            onSelectToken={(tok) => {
              setSelectedTokenId(tok.id);
              setActiveTab('detail');
              window.scrollTo(0, 0);
            }}
          />

          {/* Main Workspace Content Container */}
          <main>
            {activeTab === 'explore' && (
              <ExploreView
                tokens={tokens}
                pipoBurnedTotal={pipoBurnedTotal}
                globalSearchQuery={globalSearchQuery}
                onGlobalSearchChange={setGlobalSearchQuery}
                initialSortFilter={exploreSortPreset}
                onSelectToken={(token) => {
                  setSelectedTokenId(token.id);
                  setActiveTab('detail');
                  window.scrollTo(0, 0);
                }}
                onTriggerBurnRound={handleTriggerBurnRound}
                onNavigateCreate={() => {
                  setActiveTab('create');
                  window.scrollTo(0, 0);
                }}
                onNavigateBurn={() => {
                  setActiveTab('burn');
                  window.scrollTo(0, 0);
                }}
              />
            )}

            {activeTab === 'create' && (
              <CreateTokenView onCreateToken={handleCreateToken} />
            )}

            {activeTab === 'activity' && (
              <ActivityView
                events={activityEvents}
                tokens={tokens}
                onSimulateBlock={handleSimulateLiveBlock}
                onSelectTokenById={(tokenId) => {
                  setSelectedTokenId(tokenId);
                  setActiveTab('detail');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}

            {(activeTab === 'portfolio' ||
              activeTab === 'rewards' ||
              activeTab === 'profile') && (
              <ProfileView
                initialSubTab={
                  activeTab === 'rewards' ? 'rewards' : profileSubTabPreset
                }
                holdings={holdings}
                tokens={tokens}
                onTradeTokenById={(tokenId) => {
                  setSelectedTokenId(tokenId);
                  setActiveTab('detail');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onSwitchPayoutsToHoldersForever={
                  handleSwitchPayoutsToHoldersForever
                }
              />
            )}

            {activeTab === 'burn' && (
              <div className="space-y-6">
                <div className="rounded-[28px] bg-[#04060C] border border-[#0F3933] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-2 max-w-2xl">
                    <span className="eyebrow-mono text-[#97FCE4]">
                      • DEFLATIONARY PROTOCOL CORE
                    </span>
                    <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-[#F5FEFD]">
                      $PIPO Buyback &amp; Burn Engine
                    </h1>
                    <p className="text-xs sm:text-sm text-[#89B0A9] leading-relaxed">
                      Every token swap across all PipoPad vaults routes a 0.5%
                      protocol settlement fee to market-buy and permanently
                      destroy native $PIPO on Robinhood Chain.
                    </p>
                  </div>

                  <div className="flex flex-col sm:items-end gap-3 shrink-0">
                    <div className="text-left sm:text-right">
                      <span className="eyebrow-mono text-[#89B0A9] block">
                        CUMULATIVE $PIPO BURNED
                      </span>
                      <span
                        data-testid="burn-page-total"
                        className="font-display font-extrabold text-3xl text-[#97FCE4] font-mono-label"
                      >
                        {pipoBurnedTotal.toLocaleString()} $PIPO
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleTriggerBurnRound}
                      className="h-11 px-6 rounded-full bg-[#97FCE4] hover:bg-[#76F7D9] text-[#04060C] text-xs font-bold inline-flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <Flame className="w-4 h-4 fill-[#04060C]" />
                      <span>Execute Protocol Burn Round</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="rounded-[24px] bg-[#081C19] border border-[#0F3933] p-5">
                    <span className="eyebrow-mono text-[#89B0A9]">
                      PROTOCOL BURN FEE
                    </span>
                    <div className="font-display font-extrabold text-2xl text-[#F5FEFD] mt-1.5">
                      0.50% Per Swap
                    </div>
                    <p className="text-xs text-[#89B0A9] mt-1">
                      Collected across USDG, ETH, RWA, and Custom Pair vaults
                    </p>
                  </div>
                  <div className="rounded-[24px] bg-[#081C19] border border-[#0F3933] p-5">
                    <span className="eyebrow-mono text-[#89B0A9]">
                      ACTIVE FEE SOURCES
                    </span>
                    <div className="font-display font-extrabold text-2xl text-[#97FCE4] mt-1.5">
                      {tokens.length} Active Vaults
                    </div>
                    <p className="text-xs text-[#89B0A9] mt-1">
                      100% of launches contribute to $PIPO deflation
                    </p>
                  </div>
                  <div className="rounded-[24px] bg-[#081C19] border border-[#0F3933] p-5">
                    <span className="eyebrow-mono text-[#89B0A9]">
                      NATIVE $PIPO VAULT
                    </span>
                    <div className="mt-1.5 flex items-center justify-between">
                      <span className="font-display font-extrabold text-2xl text-[#97FCE4]">
                        +6% Bonus
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedTokenId('pipo-native');
                          setActiveTab('detail');
                        }}
                        className="text-xs font-bold text-[#97FCE4] hover:underline inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span>Trade $PIPO</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-xs text-[#89B0A9] mt-1">
                      Native token also pays 3% USDG rewards to holders
                    </p>
                  </div>
                </div>

                <div className="rounded-[28px] bg-[#081C19] border border-[#0F3933] p-6 space-y-4">
                  <div className="eyebrow-mono text-[#F5FEFD] font-bold">
                    RECENT ON-CHAIN BURN TRANSACTIONS
                  </div>
                  <div className="space-y-2.5 font-mono-label text-xs">
                    {burnEvents.map((ev) => (
                      <div
                        key={ev.id}
                        className="p-3.5 rounded-2xl bg-[#04060C] border border-[#0F3933] flex flex-wrap items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-3">
                          <PipoLogoSVG className="w-6 h-6" />
                          <div>
                            <span className="text-[#FF6868] font-bold">
                              BURNED {ev.burnAmountPipo?.toLocaleString()} $PIPO
                            </span>
                            <span className="text-[#89B0A9] ml-2">
                              via {ev.pairAmount.toLocaleString()}{' '}
                              {ev.pairSymbol} Buyback
                            </span>
                          </div>
                        </div>
                        <div className="text-[#89B0A9]">
                          {ev.txHash} · {ev.timestamp}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'how-it-works' && (
              <div className="space-y-6">
                <div className="rounded-[28px] lg:rounded-[36px] bg-[#F5FEFD] text-[#04060C] border border-[#C2E8E2] p-6 sm:p-9">
                  <span className="eyebrow-mono text-[#04060C] font-bold">
                    / PROTOCOL ARCHITECTURE
                  </span>
                  <h1 className="font-display font-extrabold text-2xl sm:text-4xl text-[#04060C] mt-1">
                    How PipoPad Works
                  </h1>
                  <p className="text-xs sm:text-sm text-[#04060C]/80 mt-1 max-w-2xl">
                    PipoPad replaces extractive token launches with a
                    self-sustaining Positive-Entry Vault architecture on
                    Robinhood Chain.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
                    <div className="p-5 rounded-[24px] bg-[#E6F7F5] border border-[#C2E8E2] space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-0.5 rounded-full bg-[#97FCE4] text-[#04060C] font-mono-label text-xs font-extrabold">
                          01 / BUYER ENTRY BOOST
                        </span>
                        <span className="font-mono-label text-xs font-bold text-[#04060C]">
                          +2% to +9% Extra
                        </span>
                      </div>
                      <h3 className="font-display font-extrabold text-lg text-[#04060C]">
                        Instant Bonus Tokens on Every Buy
                      </h3>
                      <p className="text-xs text-[#04060C]/80 leading-relaxed">
                        Every token reserves 7% to 9% of its genesis supply in an
                        immutable Locked Treasury Vault. When you buy, the vault
                        immediately credits +2% to +9% bonus tokens to your
                        wallet in the same block.
                      </p>
                      <PipoBoosterSVG
                        className="w-full h-32"
                        extraCount={`+${simPreview.bonusTokens.toLocaleString()} EXTRA`}
                      />
                    </div>

                    <div className="p-5 rounded-[24px] bg-[#E6F7F5] border border-[#C2E8E2] space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-0.5 rounded-full bg-[#97FCE4] text-[#04060C] font-mono-label text-xs font-extrabold">
                          02 / SELF-REFILLING VAULT
                        </span>
                        <span className="font-mono-label text-xs font-bold text-[#04060C]">
                          Perpetual Runway
                        </span>
                      </div>
                      <h3 className="font-display font-extrabold text-lg text-[#04060C]">
                        Sellers Replenish the Bonus Treasury
                      </h3>
                      <p className="text-xs text-[#04060C]/80 leading-relaxed">
                        When a holder sells, a symmetric 2% to 9% token fee is
                        captured and returned directly into the Locked Treasury
                        Vault, refilling the reserve for future buyers.
                      </p>
                      <PipoVaultSVG className="w-full h-32" />
                    </div>

                    <div className="p-5 rounded-[24px] bg-[#E6F7F5] border border-[#C2E8E2] space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-0.5 rounded-full bg-[#0F3933] text-[#F5FEFD] font-mono-label text-xs font-extrabold">
                          03 / AUTO-PAYOUT ENGINE
                        </span>
                        <span className="font-mono-label text-xs font-bold text-[#04060C]">
                          1x · 1.5x · 2x Tiers
                        </span>
                      </div>
                      <h3 className="font-display font-extrabold text-lg text-[#04060C]">
                        Holders Receive Automatic Pair Rewards
                      </h3>
                      <p className="text-xs text-[#04060C]/80 leading-relaxed">
                        Holders earn automatic payouts in the token's active
                        pair currency (USDG, ETH, xNVDA, xGOLD) weighted by hold
                        duration up to 2.0x after 7 days without manual
                        claiming.
                      </p>
                      <PipoCourierSVG className="w-full h-32" />
                    </div>

                    <div className="p-5 rounded-[24px] bg-[#E6F7F5] border border-[#C2E8E2] space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-0.5 rounded-full bg-[#04060C] text-[#97FCE4] font-mono-label text-xs font-extrabold">
                          04 / ANTI-SNIPE SHIELD
                        </span>
                        <span className="font-mono-label text-xs font-bold text-[#04060C]">
                          Block-0 Protection
                        </span>
                      </div>
                      <h3 className="font-display font-extrabold text-lg text-[#04060C]">
                        10-Second Decaying Bot Tax (99% -&gt; 0%)
                      </h3>
                      <p className="text-xs text-[#04060C]/80 leading-relaxed">
                        During the first 10 seconds of launch, automated sniper
                        bots face a 99% decaying tax that routes captured tokens
                        straight into the Pipo Bonus Vault.
                      </p>
                      <PipoShieldSVG className="w-full h-32" />
                    </div>
                  </div>
                </div>

                {/* Interactive Simulator Card */}
                <div className="rounded-[28px] bg-[#081C19] border border-[#0F3933] p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-7 space-y-4">
                    <div className="inline-flex items-center gap-2 text-xs font-bold text-[#97FCE4]">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Interactive Positive-Entry Simulator</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 rounded-2xl bg-[#04060C] border border-[#0F3933]">
                        <label
                          htmlFor="how-sim-amount"
                          className="block text-xs text-[#89B0A9] mb-1.5"
                        >
                          Base Swap Output (Tokens)
                        </label>
                        <input
                          id="how-sim-amount"
                          type="number"
                          min={100}
                          value={simBaseInput}
                          onChange={(e) =>
                            setSimBaseInput(Math.max(0, Number(e.target.value)))
                          }
                          className="w-full h-10 px-3 rounded-xl bg-[#081C19] border border-[#0F3933] font-mono-label text-sm text-[#F5FEFD]"
                        />
                      </div>
                      <div className="p-4 rounded-2xl bg-[#04060C] border border-[#0F3933]">
                        <div className="flex justify-between text-xs mb-2">
                          <label
                            htmlFor="how-sim-rate"
                            className="text-[#89B0A9]"
                          >
                            Vault Bonus Rate
                          </label>
                          <span className="font-mono-label font-extrabold text-[#97FCE4]">
                            +{simBonusRate}%
                          </span>
                        </div>
                        <input
                          id="how-sim-rate"
                          type="range"
                          min={2}
                          max={9}
                          value={simBonusRate}
                          onChange={(e) =>
                            setSimBonusRate(Number(e.target.value))
                          }
                          className="w-full pipo-slider-green"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-5 p-5 rounded-2xl bg-[#97FCE4] text-[#04060C] space-y-2 text-xs font-bold">
                    <div className="flex justify-between">
                      <span>Base Swap Output:</span>
                      <span className="font-mono-label">
                        {simPreview.baseTokens.toLocaleString()} Tokens
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Vault Bonus (+{simBonusRate}%):</span>
                      <span className="font-mono-label font-extrabold">
                        +{simPreview.bonusTokens.toLocaleString()} Extra Tokens
                      </span>
                    </div>
                    <div className="pt-2 border-t border-[#04060C]/20 flex justify-between text-sm font-extrabold">
                      <span>Total Credited:</span>
                      <span className="font-mono-label">
                        {simPreview.totalReceived.toLocaleString()} Tokens
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'detail' && (
              <TokenDetailView
                token={selectedToken}
                userTokenBalance={currentHoldingForSelected}
                userPairBalance={
                  pairBalances[selectedToken.pairSymbol] ?? 1000
                }
                onBack={() => setActiveTab('explore')}
                onExecuteSwap={handleExecuteSwap}
              />
            )}
          </main>
        </div>
      )}

      {/* Interactive Toast Notification */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 max-w-md rounded-[24px] bg-[#04060C] border border-[#97FCE4] p-4 shadow-2xl flex items-start gap-3"
        >
          <CheckCircle2 className="w-5 h-5 text-[#97FCE4] shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="font-display font-bold text-sm text-[#F5FEFD]">
              {toast.title}
            </div>
            <p className="text-xs text-[#89B0A9] mt-0.5 leading-relaxed">
              {toast.detail}
            </p>
          </div>
          <button
            type="button"
            aria-label="Dismiss notification"
            onClick={() => setToast(null)}
            className="text-[#89B0A9] hover:text-[#F5FEFD] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
