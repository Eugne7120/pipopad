import React, { useEffect, useState } from 'react';
import {
  InspectedWalletProfile,
  PipoToken,
  PortfolioHolding,
} from '../types/pipo';
import { PAIR_ASSETS, PRESET_INSPECTED_WALLETS } from '../data/initialData';
import {
  PairBadgeIconSVG,
  TokenAvatarWithOfficialLogo,
} from './svg/PipoMascots';
import {
  ArrowUpRight,
  CheckCircle2,
  Gift,
  Lock,
  Search,
  Sparkles,
} from 'lucide-react';

export type ProfileSubTab = 'portfolio' | 'rewards' | 'creator' | 'inspector';

interface ProfileViewProps {
  initialSubTab?: ProfileSubTab;
  holdings: PortfolioHolding[];
  tokens: PipoToken[];
  onTradeTokenById: (tokenId: string) => void;
  onSwitchPayoutsToHoldersForever: (tokenId: string) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  initialSubTab = 'portfolio',
  holdings,
  tokens,
  onTradeTokenById,
  onSwitchPayoutsToHoldersForever,
}) => {
  const [subTab, setSubTab] = useState<ProfileSubTab>(initialSubTab);
  const [inspectorQuery, setInspectorQuery] = useState('');
  const [selectedWallet, setSelectedWallet] = useState<InspectedWalletProfile>(
    PRESET_INSPECTED_WALLETS[0]
  );

  useEffect(() => {
    setSubTab(initialSubTab);
  }, [initialSubTab]);

  // Portfolio KPI Aggregations
  const totalPortfolioUsd = holdings.reduce((acc, h) => {
    const t = tokens.find((tok) => tok.id === h.tokenId);
    return acc + h.balanceTokens * (t?.priceUsd ?? 0.01);
  }, 0);

  const totalBonusEarnedOnEntry = holdings.reduce(
    (acc, h) => acc + h.bonusTokensEarnedOnEntry,
    0
  );

  const totalPayoutsUsd = holdings.reduce((acc, h) => {
    const pairInfo = PAIR_ASSETS[h.pairSymbol];
    return acc + h.payoutsReceivedInPair * (pairInfo?.oraclePriceUsd ?? 1);
  }, 0);

  const totalPendingPayoutsUsd = holdings.reduce((acc, h) => {
    const pairInfo = PAIR_ASSETS[h.pairSymbol];
    return acc + h.estimatedNextPayoutInPair * (pairInfo?.oraclePriceUsd ?? 1);
  }, 0);

  const creatorTokens = tokens.filter((t) => t.isCreatorOwned);

  const handleInspectAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = inspectorQuery.trim();
    if (!q) return;

    const matched = PRESET_INSPECTED_WALLETS.find(
      (w) =>
        w.address.toLowerCase().includes(q.toLowerCase()) ||
        w.label.toLowerCase().includes(q.toLowerCase())
    );

    if (matched) {
      setSelectedWallet(matched);
    } else {
      setSelectedWallet({
        address: q,
        label: 'Custom Inspected Wallet',
        tag: 'ROBINHOOD L2 HOLDER',
        totalValueUsd: 18450,
        totalBonusTokensEarned: 142000,
        totalPayoutsUsdEquivalent: 1290,
        averageHoldDays: 5,
        activeMultiplier: '1.5x (3-7d)',
        recentPayouts: [
          {
            tokenTicker: '$PIPO',
            pairSymbol: 'USDG',
            amountInPair: 320,
            usdValue: 320,
            multiplier: '1.5x',
            timestamp: '14m ago',
          },
          {
            tokenTicker: '$RHOOD',
            pairSymbol: 'xNVDA',
            amountInPair: 2.1,
            usdValue: 299.88,
            multiplier: '1.5x',
            timestamp: '2h ago',
          },
        ],
        bonusEntries: [
          {
            tokenTicker: '$PIPO',
            baseTokens: 1400000,
            bonusTokens: 84000,
            bonusRate: 6,
            timestamp: '5d ago',
          },
        ],
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Sub-Navigation Header */}
      <div className="rounded-[28px] bg-[#081C19] border border-[#0F3933] p-6 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="eyebrow-mono text-[#97FCE4]">
            • ACCOUNT WORKSPACE · 0x71C...9A2B
          </span>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-[#F5FEFD] mt-1">
            {subTab === 'rewards'
              ? 'Holder Rewards & Payouts'
              : subTab === 'creator'
              ? 'Creator Vault Dashboard'
              : subTab === 'inspector'
              ? 'Public Wallet Inspector'
              : 'Portfolio & Holdings'}
          </h1>
        </div>

        <div
          role="tablist"
          aria-label="Account Sections"
          className="flex flex-wrap items-center gap-1.5 bg-[#04060C] p-1.5 rounded-full border border-[#0F3933]"
        >
          {(
            [
              { id: 'portfolio', label: 'My Portfolio & Payouts' },
              { id: 'rewards', label: 'Rewards Center' },
              { id: 'creator', label: 'Creator Dashboard' },
              { id: 'inspector', label: 'Wallet Inspector' },
            ] as { id: ProfileSubTab; label: string }[]
          ).map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={subTab === t.id}
              onClick={() => setSubTab(t.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                subTab === t.id
                  ? 'bg-[#97FCE4] text-[#04060C]'
                  : 'text-[#89B0A9] hover:text-[#F5FEFD]'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* =====================================================================
          SUB-TAB 1: MY PORTFOLIO & PAYOUTS
      ===================================================================== */}
      {subTab === 'portfolio' && (
        <div className="space-y-5">
          {/* 3 Summary KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-[24px] bg-[#081C19] border border-[#0F3933] p-5">
              <span className="eyebrow-mono text-[#89B0A9]">
                TOTAL PORTFOLIO VALUE
              </span>
              <div className="font-display font-extrabold text-2xl sm:text-3xl text-[#F5FEFD] font-mono-label mt-1.5">
                $
                {totalPortfolioUsd.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
              </div>
              <div className="text-xs text-[#89B0A9] mt-1">
                Across {holdings.length} active Robinhood Chain vaults
              </div>
            </div>

            <div className="rounded-[24px] bg-[#97FCE4] text-[#04060C] p-5">
              <span className="eyebrow-mono text-[#04060C] font-bold">
                BONUS TOKENS EARNED ON BUY
              </span>
              <div className="font-display font-extrabold text-2xl sm:text-3xl text-[#04060C] font-mono-label mt-1.5">
                +{totalBonusEarnedOnEntry.toLocaleString()}
              </div>
              <div className="text-xs text-[#04060C]/80 font-medium mt-1">
                Credited immediately at purchase from Pipo Vaults
              </div>
            </div>

            <div className="rounded-[24px] bg-[#0F3933] border border-[#97FCE4]/25 text-[#F5FEFD] p-5">
              <span className="eyebrow-mono text-[#97FCE4] font-bold">
                CUMULATIVE PAYOUTS RECEIVED
              </span>
              <div className="font-display font-extrabold text-2xl sm:text-3xl text-[#F5FEFD] font-mono-label mt-1.5">
                $
                {totalPayoutsUsd.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
              </div>
              <div className="text-xs text-[#F5FEFD]/80 font-medium mt-1">
                Auto-distributed in USDG, ETH, xNVDA, and xGOLD
              </div>
            </div>
          </div>

          {/* Holdings Table */}
          <div className="rounded-[28px] bg-[#081C19] border border-[#0F3933] overflow-hidden">
            <div className="p-5 border-b border-[#0F3933] flex items-center justify-between">
              <span className="eyebrow-mono text-[#F5FEFD] font-bold">
                ACTIVE VAULT POSITIONS &amp; HOLD MULTIPLIERS
              </span>
              <span className="font-mono-label text-xs text-[#97FCE4] font-bold">
                AUTO-PAYOUTS STREAMING
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-[#04060C] font-mono-label text-[11px] uppercase text-[#89B0A9] border-b border-[#0F3933]">
                    <th className="py-3.5 px-5">TOKEN VAULT</th>
                    <th className="py-3.5 px-4">BALANCE</th>
                    <th className="py-3.5 px-4">ENTRY BONUS CREDITED</th>
                    <th className="py-3.5 px-4">HOLD DURATION TIER</th>
                    <th className="py-3.5 px-4">PAYOUTS RECEIVED</th>
                    <th className="py-3.5 px-4">EST. NEXT DROP</th>
                    <th className="py-3.5 px-5 text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#0F3933]">
                  {holdings.map((h) => {
                    const tok = tokens.find((t) => t.id === h.tokenId);
                    return (
                      <tr
                        key={h.tokenId}
                        className="hover:bg-[#0F3933] transition-colors"
                      >
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-3">
                            {tok && (
                              <TokenAvatarWithOfficialLogo
                                ticker={tok.ticker}
                                pairSymbol={tok.pairSymbol}
                                avatarBg={tok.avatarBg}
                                avatarLabel={tok.avatarLabel}
                                logoUrl={tok.logoUrl}
                                size="sm"
                              />
                            )}
                            <div>
                              <div className="font-bold text-[#F5FEFD]">
                                {h.tokenName}
                              </div>
                              <div className="font-mono-label text-[11px] text-[#97FCE4]">
                                {h.tokenTicker}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 font-mono-label text-[#F5FEFD] font-bold">
                          {h.balanceTokens.toLocaleString()} {h.tokenTicker}
                        </td>
                        <td className="py-4 px-4 font-mono-label text-[#97FCE4] font-bold">
                          +{h.bonusTokensEarnedOnEntry.toLocaleString()}{' '}
                          {h.tokenTicker}
                        </td>
                        <td className="py-4 px-4 font-mono-label">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-[10px] font-extrabold ${
                              h.multiplier === 2
                                ? 'bg-[#97FCE4] text-[#04060C]'
                                : h.multiplier === 1.5
                                ? 'bg-[#0F3933] border border-[#97FCE4]/30 text-[#97FCE4]'
                                : 'bg-[#04060C] text-[#89B0A9] border border-[#0F3933]'
                            }`}
                          >
                            {h.multiplierLabel} · {h.holdDays}d
                          </span>
                        </td>
                        <td className="py-4 px-4 font-mono-label text-[#F5FEFD] font-bold">
                          {h.payoutsReceivedInPair} {h.pairSymbol}
                        </td>
                        <td className="py-4 px-4 font-mono-label text-[#97FCE4] font-bold">
                          +{h.estimatedNextPayoutInPair} {h.pairSymbol}
                        </td>
                        <td className="py-4 px-5 text-right">
                          <button
                            type="button"
                            onClick={() => onTradeTokenById(h.tokenId)}
                            className="h-8 px-4 rounded-full bg-[#97FCE4] hover:bg-[#76F7D9] text-[#04060C] font-bold text-xs inline-flex items-center gap-1 cursor-pointer"
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
        </div>
      )}

      {/* =====================================================================
          SUB-TAB 2: REWARDS CENTER
      ===================================================================== */}
      {subTab === 'rewards' && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-[24px] bg-[#0F3933] border border-[#97FCE4]/25 text-[#F5FEFD] p-5">
              <div className="flex items-center justify-between">
                <span className="eyebrow-mono text-[#97FCE4] font-bold">
                  PENDING NEXT BATCH DROP
                </span>
                <Gift className="w-4 h-4 text-[#97FCE4]" />
              </div>
              <div className="font-display font-extrabold text-2xl sm:text-3xl text-[#F5FEFD] font-mono-label mt-2">
                $
                {totalPendingPayoutsUsd.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}
              </div>
              <p className="text-xs text-[#F5FEFD]/80 font-medium mt-1">
                Automatically pushed to your wallet on the next epoch without
                gas claims.
              </p>
            </div>

            <div className="rounded-[24px] bg-[#081C19] border border-[#0F3933] p-5">
              <span className="eyebrow-mono text-[#97FCE4]">
                HISTORICAL PAYOUTS DELIVERED
              </span>
              <div className="font-display font-extrabold text-2xl sm:text-3xl text-[#97FCE4] font-mono-label mt-2">
                $
                {totalPayoutsUsd.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
              </div>
              <p className="text-xs text-[#89B0A9] mt-1">
                Verified on-chain distributions across USDG, ETH, and RWA pairs.
              </p>
            </div>

            <div className="rounded-[24px] bg-[#081C19] border border-[#0F3933] p-5">
              <span className="eyebrow-mono text-[#89B0A9]">
                HIGHEST ACTIVE MULTIPLIER
              </span>
              <div className="font-display font-extrabold text-2xl sm:text-3xl text-[#F5FEFD] font-mono-label mt-2">
                2.0x Boost
              </div>
              <p className="text-xs text-[#89B0A9] mt-1">
                7+ days diamond hold tier active on $PIPO and $VLT positions.
              </p>
            </div>
          </div>

          <div className="rounded-[28px] bg-[#081C19] border border-[#0F3933] p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#0F3933]">
              <div>
                <h2 className="font-display font-extrabold text-lg text-[#F5FEFD]">
                  Per-Vault Reward Streams
                </h2>
                <p className="text-xs text-[#89B0A9]">
                  PipoPad streams holder rewards automatically in each token's
                  settlement pair asset.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#0F3933] border border-[#97FCE4]/30 text-[#97FCE4] font-mono-label text-xs font-extrabold">
                Zero Claiming Required
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {holdings.map((h) => (
                <div
                  key={h.tokenId}
                  className="p-4 rounded-2xl bg-[#04060C] border border-[#0F3933] flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <PairBadgeIconSVG
                        symbol={h.pairSymbol}
                        className="w-5 h-5"
                      />
                      <div>
                        <div className="text-sm font-bold text-[#F5FEFD]">
                          {h.tokenName} ({h.tokenTicker})
                        </div>
                        <div className="font-mono-label text-[11px] text-[#89B0A9]">
                          Reward Asset: {h.pairSymbol} · Tier:{' '}
                          {h.multiplierLabel}
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => onTradeTokenById(h.tokenId)}
                      className="text-xs font-bold text-[#97FCE4] hover:underline cursor-pointer"
                    >
                      View Vault -&gt;
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#0F3933] font-mono-label text-xs">
                    <div>
                      <span className="text-[10px] text-[#89B0A9] block">
                        HISTORICAL RECEIVED
                      </span>
                      <span className="text-[#F5FEFD] font-bold">
                        {h.payoutsReceivedInPair} {h.pairSymbol}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#89B0A9] block">
                        ESTIMATED NEXT DROP
                      </span>
                      <span className="text-[#97FCE4] font-bold">
                        +{h.estimatedNextPayoutInPair} {h.pairSymbol}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          SUB-TAB 3: CREATOR DASHBOARD
      ===================================================================== */}
      {subTab === 'creator' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {creatorTokens.map((tok) => {
              const isPermanentHolders =
                tok.payoutDestination === 'Direct to Holders Forever';
              return (
                <div
                  key={tok.id}
                  className="rounded-[28px] bg-[#081C19] border border-[#0F3933] p-6 flex flex-col justify-between space-y-5"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div>
                        <span className="eyebrow-mono text-[#97FCE4]">
                          LAUNCHED VAULT · {tok.contractAddress}
                        </span>
                        <h3 className="font-display font-extrabold text-xl text-[#F5FEFD] mt-0.5">
                          {tok.name} ({tok.ticker})
                        </h3>
                      </div>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#04060C] border border-[#0F3933] font-mono-label text-xs text-[#F5FEFD] font-bold">
                        <PairBadgeIconSVG
                          symbol={tok.pairSymbol}
                          className="w-3.5 h-3.5"
                        />
                        <span>{tok.pairSymbol} Pair</span>
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 font-mono-label text-xs mb-4">
                      <div className="p-3.5 rounded-2xl bg-[#04060C] border border-[#0F3933]">
                        <div className="text-[10px] text-[#89B0A9]">
                          LOCKED TREASURY VAULT
                        </div>
                        <div className="text-base font-extrabold text-[#97FCE4] mt-1">
                          {(tok.vaultTokensRemaining / 1_000_000).toFixed(1)}M{' '}
                          {tok.ticker} ({tok.vaultLockedPercent}%)
                        </div>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-[#04060C] border border-[#0F3933]">
                        <div className="text-[10px] text-[#89B0A9]">
                          CREATOR REVENUE COLLECTED
                        </div>
                        <div className="text-base font-extrabold text-[#F5FEFD] mt-1">
                          {tok.creatorRevenueCollectedInPair} {tok.pairSymbol}
                        </div>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-[#04060C] border border-[#0F3933] flex items-center justify-between text-xs">
                      <span className="text-[#89B0A9]">
                        Current Payout Route:
                      </span>
                      <span
                        data-testid={`creator-route-${tok.id}`}
                        className="font-mono-label text-[#F5FEFD] font-bold"
                      >
                        {tok.payoutDestination}
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#0F3933] flex flex-wrap items-center justify-between gap-3">
                    {isPermanentHolders ? (
                      <div className="inline-flex items-center gap-2 text-xs font-mono-label text-[#97FCE4] font-bold">
                        <Lock className="w-4 h-4" />
                        <span>
                          Permanently Routed 100% to Holders Forever
                        </span>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => onSwitchPayoutsToHoldersForever(tok.id)}
                        className="h-10 px-5 rounded-full bg-[#97FCE4] hover:bg-[#76F7D9] text-[#04060C] font-bold text-xs flex items-center gap-2 cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5 fill-[#04060C]" />
                        <span>Switch Payouts to Holders Forever</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => onTradeTokenById(tok.id)}
                      className="text-xs font-bold text-[#F5FEFD] hover:text-[#97FCE4] cursor-pointer"
                    >
                      Open Vault -&gt;
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =====================================================================
          SUB-TAB 4: WALLET INSPECTOR (PUBLIC-FIRST UX)
      ===================================================================== */}
      {subTab === 'inspector' && (
        <div className="space-y-5">
          {/* Search & 3 Whale Preset Pills */}
          <div className="rounded-[28px] bg-[#081C19] border border-[#0F3933] p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="eyebrow-mono text-[#97FCE4]">
                PUBLIC-FIRST ROBINHOOD CHAIN WALLET INSPECTOR
              </span>
              <span className="font-mono-label text-xs text-[#89B0A9]">
                NO WALLET CONNECTION REQUIRED
              </span>
            </div>

            <form
              onSubmit={handleInspectAddressSubmit}
              className="flex flex-col sm:flex-row gap-3"
            >
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#89B0A9] absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  aria-label="Inspect any public Robinhood Chain wallet address"
                  placeholder="Paste any Robinhood Chain address (0x...) to inspect bonus tokens & payouts..."
                  value={inspectorQuery}
                  onChange={(e) => setInspectorQuery(e.target.value)}
                  className="w-full h-11 pl-11 pr-4 rounded-full bg-[#04060C] border border-[#0F3933] font-mono-label text-xs text-[#F5FEFD] focus:outline-none focus:border-[#97FCE4]"
                />
              </div>
              <button
                type="submit"
                className="h-11 px-6 rounded-full bg-[#97FCE4] hover:bg-[#76F7D9] text-[#04060C] font-bold text-xs cursor-pointer"
              >
                Inspect Address
              </button>
            </form>

            {/* 3 Clickable Whale / Top Holder Presets */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="font-mono-label text-[11px] text-[#89B0A9]">
                PRESET WHALE WALLETS:
              </span>
              {PRESET_INSPECTED_WALLETS.map((w) => {
                const active = selectedWallet.address === w.address;
                return (
                  <button
                    key={w.address}
                    type="button"
                    onClick={() => setSelectedWallet(w)}
                    className={`px-3.5 py-1.5 rounded-full font-mono-label text-xs font-bold border transition-colors cursor-pointer ${
                      active
                        ? 'bg-[#97FCE4] text-[#04060C] border-[#97FCE4]'
                        : 'bg-[#04060C] text-[#F5FEFD] border-[#0F3933] hover:border-[#89B0A9]'
                    }`}
                  >
                    {w.label} ({w.address.slice(0, 10)}...)
                  </button>
                );
              })}
            </div>
          </div>

          {/* Inspected Wallet Telemetry Readout */}
          <div className="rounded-[28px] bg-[#081C19] border border-[#0F3933] p-6 sm:p-7 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-[#0F3933]">
              <div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#97FCE4]" />
                  <span className="eyebrow-mono text-[#97FCE4]">
                    INSPECTED ADDRESS · {selectedWallet.tag}
                  </span>
                </div>
                <h3
                  data-testid="inspected-wallet-title"
                  className="font-display font-extrabold text-xl sm:text-2xl text-[#F5FEFD] mt-1"
                >
                  {selectedWallet.label} ({selectedWallet.address})
                </h3>
              </div>

              <span className="px-4 py-1.5 rounded-full bg-[#97FCE4] text-[#04060C] font-mono-label text-xs font-extrabold">
                Active Tier: {selectedWallet.activeMultiplier}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono-label">
              <div className="p-4 rounded-2xl bg-[#04060C] border border-[#0F3933]">
                <div className="text-[10px] text-[#89B0A9] uppercase">
                  INSPECTED PORTFOLIO VALUE
                </div>
                <div className="text-2xl font-extrabold text-[#F5FEFD] mt-1">
                  ${selectedWallet.totalValueUsd.toLocaleString()}
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-[#04060C] border border-[#0F3933]">
                <div className="text-[10px] text-[#97FCE4] uppercase">
                  CUMULATIVE BONUS TOKENS CREDITED
                </div>
                <div className="text-2xl font-extrabold text-[#97FCE4] mt-1">
                  +{selectedWallet.totalBonusTokensEarned.toLocaleString()}
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-[#04060C] border border-[#0F3933]">
                <div className="text-[10px] text-[#89B0A9] uppercase">
                  CUMULATIVE AUTO-PAYOUTS RECEIVED
                </div>
                <div className="text-2xl font-extrabold text-[#F5FEFD] mt-1">
                  ${selectedWallet.totalPayoutsUsdEquivalent.toLocaleString()}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Recent Auto-Payouts */}
              <div className="p-5 rounded-2xl bg-[#04060C] border border-[#0F3933]">
                <div className="eyebrow-mono text-[#97FCE4] mb-3">
                  RECENT ETH / USDG / RWA PAYOUT DROPS
                </div>
                <div className="space-y-2.5 font-mono-label text-xs">
                  {selectedWallet.recentPayouts.map((p, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-[#081C19] border border-[#0F3933] flex items-center justify-between"
                    >
                      <div className="text-[#F5FEFD]">
                        <span className="font-bold">{p.tokenTicker}</span> ·{' '}
                        <span className="text-[#89B0A9]">
                          {p.multiplier} Hold Boost
                        </span>
                      </div>
                      <div className="font-bold text-[#97FCE4]">
                        +{p.amountInPair} {p.pairSymbol} (${p.usdValue})
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bonus Token Entry History */}
              <div className="p-5 rounded-2xl bg-[#04060C] border border-[#0F3933]">
                <div className="eyebrow-mono text-[#97FCE4] mb-3">
                  POSITIVE-ENTRY BONUS RECEIPTS
                </div>
                <div className="space-y-2.5 font-mono-label text-xs">
                  {selectedWallet.bonusEntries.map((b, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-[#081C19] border border-[#0F3933] flex items-center justify-between"
                    >
                      <div className="text-[#F5FEFD]">
                        <span className="font-bold">{b.tokenTicker}</span> (+
                        {b.bonusRate}% Rate)
                      </div>
                      <div className="px-2.5 py-0.5 rounded-full bg-[#97FCE4] text-[#04060C] font-extrabold">
                        +{b.bonusTokens.toLocaleString()} EXTRA
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
