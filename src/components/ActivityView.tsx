import React, { useState } from 'react';
import { ActivityEvent, PipoToken } from '../types/pipo';
import { PairBadgeIconSVG } from './svg/PipoMascots';
import { ArrowUpRight, Radio, Zap } from 'lucide-react';

interface ActivityViewProps {
  events: ActivityEvent[];
  tokens: PipoToken[];
  onSimulateBlock: () => void;
  onSelectTokenById: (tokenId: string) => void;
}

type ActivityFilterTab =
  | 'All Events'
  | 'Buys (+Bonus)'
  | 'Sells (Vault Refill)'
  | 'Payout Drops'
  | 'New Launches';

export const ActivityView: React.FC<ActivityViewProps> = ({
  events,
  onSimulateBlock,
  onSelectTokenById,
}) => {
  const [filterTab, setFilterTab] = useState<ActivityFilterTab>('All Events');

  const filteredEvents = events.filter((ev) => {
    if (filterTab === 'Buys (+Bonus)') return ev.type === 'BUY_BONUS';
    if (filterTab === 'Sells (Vault Refill)') return ev.type === 'SELL_REFILL';
    if (filterTab === 'Payout Drops') return ev.type === 'PAYOUT_DROP';
    if (filterTab === 'New Launches') return ev.type === 'NEW_LAUNCH';
    return true;
  });

  return (
    <div className="space-y-5">
      {/* Header & Simulate Live Block Control */}
      <div className="rounded-[28px] bg-[#081C19] border border-[#0F3933] p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-[#97FCE4]" />
            <span className="eyebrow-mono text-[#97FCE4]">
              ROBINHOOD CHAIN REAL-TIME ON-CHAIN FEED
            </span>
          </div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-[#F5FEFD] mt-1">
            Live Vault &amp; Payout Activity
          </h1>
          <p className="text-xs sm:text-sm text-[#89B0A9] mt-0.5">
            Track buyer bonus distributions, vault refills from sells, and
            automated holder payout drops across all vaults.
          </p>
        </div>

        <button
          type="button"
          onClick={onSimulateBlock}
          className="h-11 px-5 rounded-full bg-[#97FCE4] hover:bg-[#76F7D9] text-[#04060C] font-bold text-xs flex items-center gap-2 transition-colors whitespace-nowrap cursor-pointer shrink-0"
        >
          <Zap className="w-4 h-4 fill-[#04060C]" />
          <span>Simulate Live Block</span>
        </button>
      </div>

      {/* Filter Pill Tabs */}
      <div
        role="tablist"
        aria-label="Filter On-Chain Events"
        className="flex flex-wrap items-center gap-2"
      >
        {(
          [
            'All Events',
            'Buys (+Bonus)',
            'Sells (Vault Refill)',
            'Payout Drops',
            'New Launches',
          ] as ActivityFilterTab[]
        ).map((tab) => (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={filterTab === tab}
            onClick={() => setFilterTab(tab)}
            className={`h-9 px-4 rounded-full text-xs font-bold border transition-colors cursor-pointer ${
              filterTab === tab
                ? 'bg-[#97FCE4] text-[#04060C] border-[#97FCE4]'
                : 'bg-[#081C19] text-[#89B0A9] border-[#0F3933] hover:text-[#F5FEFD]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Activity Table */}
      <div className="rounded-[28px] bg-[#081C19] border border-[#0F3933] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#04060C] font-mono-label text-[11px] uppercase text-[#89B0A9] border-b border-[#0F3933]">
                <th className="py-3.5 px-5">EVENT TYPE</th>
                <th className="py-3.5 px-4">TOKEN / PAIR</th>
                <th className="py-3.5 px-4">ACTOR / WALLET</th>
                <th className="py-3.5 px-4">SWAP / POT SIZE</th>
                <th className="py-3.5 px-4">PIPO ECONOMIC EFFECT</th>
                <th className="py-3.5 px-5 text-right">TX / TIME</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#0F3933]">
              {filteredEvents.map((ev) => (
                <tr
                  key={ev.id}
                  onClick={() => onSelectTokenById(ev.tokenId)}
                  className="hover:bg-[#0F3933] transition-colors cursor-pointer"
                >
                  <td className="py-4 px-5 font-mono-label">
                    {ev.type === 'BUY_BONUS' && (
                      <span className="px-3 py-1 rounded-full bg-[#97FCE4] text-[#04060C] font-extrabold text-[10px]">
                        BUY (+BONUS)
                      </span>
                    )}
                    {ev.type === 'SELL_REFILL' && (
                      <span className="px-3 py-1 rounded-full bg-[#FFBE55] text-[#04060C] font-extrabold text-[10px]">
                        SELL (VAULT REFILL)
                      </span>
                    )}
                    {ev.type === 'PAYOUT_DROP' && (
                      <span className="px-3 py-1 rounded-full bg-[#0F3933] border border-[#97FCE4]/30 text-[#97FCE4] font-extrabold text-[10px]">
                        PAYOUT DROP
                      </span>
                    )}
                    {ev.type === 'NEW_LAUNCH' && (
                      <span className="px-3 py-1 rounded-full bg-[#04060C] border border-[#0F3933] text-[#F5FEFD] font-bold text-[10px]">
                        NEW LAUNCH
                      </span>
                    )}
                    {ev.type === 'PIPO_BURN' && (
                      <span className="px-3 py-1 rounded-full bg-[#FF6868] text-[#04060C] font-extrabold text-[10px]">
                        $PIPO AUTO-BURN
                      </span>
                    )}
                  </td>

                  <td className="py-4 px-4 font-mono-label">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#F5FEFD]">
                        {ev.tokenTicker}
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#04060C] border border-[#0F3933] text-[10px] text-[#89B0A9]">
                        <PairBadgeIconSVG
                          symbol={ev.pairSymbol}
                          className="w-3 h-3"
                        />
                        <span>{ev.pairSymbol}</span>
                      </span>
                    </div>
                  </td>

                  <td className="py-4 px-4 font-mono-label text-[#F5FEFD]">
                    {ev.wallet}
                  </td>

                  <td className="py-4 px-4 font-mono-label text-[#F5FEFD] font-bold">
                    {ev.pairAmount.toLocaleString()} {ev.pairSymbol}
                  </td>

                  <td className="py-4 px-4">
                    {ev.type === 'BUY_BONUS' && (
                      <div>
                        <span className="text-[#89B0A9]">
                          Base: {ev.baseTokens?.toLocaleString()} ·{' '}
                        </span>
                        <span className="font-mono-label text-[#97FCE4] font-bold">
                          +{ev.bonusTokens?.toLocaleString()} Extra Bonus Tokens
                        </span>
                      </div>
                    )}
                    {ev.type === 'SELL_REFILL' && (
                      <div>
                        <span className="font-mono-label text-[#97FCE4] font-bold">
                          +{ev.vaultRefillTokens?.toLocaleString()}{' '}
                          {ev.tokenTicker} Refilled to Vault
                        </span>
                        <span className="text-[#89B0A9]">
                          {' '}
                          · +{ev.payoutAmountInPair} {ev.pairSymbol} to Pot
                        </span>
                      </div>
                    )}
                    {ev.type === 'PAYOUT_DROP' && (
                      <span className="text-[#97FCE4] font-bold">
                        Sent {ev.payoutAmountInPair} {ev.pairSymbol} directly to
                        holder wallets
                      </span>
                    )}
                    {ev.type === 'NEW_LAUNCH' && (
                      <span className="text-[#F5FEFD] font-medium">
                        Locked {ev.bonusTokens?.toLocaleString()}{' '}
                        {ev.tokenTicker} in Genesis Bonus Vault
                      </span>
                    )}
                    {ev.type === 'PIPO_BURN' && (
                      <span className="text-[#FF6868] font-bold">
                        Burned {ev.burnAmountPipo?.toLocaleString()} $PIPO
                        permanently
                      </span>
                    )}
                  </td>

                  <td className="py-4 px-5 text-right font-mono-label text-[#89B0A9]">
                    <span className="inline-flex items-center gap-1">
                      <span>{ev.timestamp}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#97FCE4]" />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
