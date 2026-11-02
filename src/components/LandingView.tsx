import React, { useState } from 'react';
import { calculateBuyPreview } from '../utils/economics';
import {
  PairBadgeIconSVG,
  PipoBoosterSVG,
  PipoCourierSVG,
  PipoLogoSVG,
  PipoShieldSVG,
  PipoVaultSVG,
  RobinhoodLogoSVG,
  XBrandLogoSVG,
} from './svg/PipoMascots';
import { AppWorkspaceTab } from './Navbar';
import { ArrowUpRight, Check, Copy } from 'lucide-react';

interface LandingViewProps {
  onOpenApp: (
    tab: AppWorkspaceTab,
    options?: {
      filterSort?: string;
      profileSubTab?: 'portfolio' | 'creator' | 'inspector';
      triggerBurn?: boolean;
      openNativePipo?: boolean;
    }
  ) => void;
}

export const LandingView: React.FC<LandingViewProps> = ({ onOpenApp }) => {
  // Interactive Pipo Buy Preview Simulator State
  const [baseSwapInput, setBaseSwapInput] = useState<number>(10000);
  const [bonusRate, setBonusRate] = useState<number>(5);
  const [activeWorkflowStep, setActiveWorkflowStep] = useState<number>(0);
  const [copiedCa, setCopiedCa] = useState(false);

  const previewQuote = calculateBuyPreview(baseSwapInput, bonusRate);

  const handleCopyContract = () => {
    navigator.clipboard?.writeText('0xPIPO8899ROBINHOODCHAIN0001A');
    setCopiedCa(true);
    setTimeout(() => setCopiedCa(false), 2000);
  };

  const workflowSteps = [
    {
      num: '01',
      title: 'Buy & Boost',
      subtitle: 'Receive +2% to +9% extra tokens directly from the Pipo Vault.',
      badge: 'INSTANT POSITIVE ENTRY',
      detailTitle: 'Every buy prints extra tokens on top of AMM output.',
      detailCopy:
        'When you swap USDG, ETH, or Tokenized Assets (xGOLD, xNVDA), the Pipo Treasury Vault automatically appends +2% to +9% bonus tokens to your wallet in the same transaction block.',
      metrics: [
        { label: 'VAULT RESERVE SOURCE', val: '7%–9% Locked Genesis' },
        { label: 'BUYER SLIPPAGE OFFSET', val: 'Instant Positive Entry' },
        { label: 'CLAIMING GAS', val: '0 ETH (Credited Inline)' },
      ],
    },
    {
      num: '02',
      title: 'Vault Refill',
      subtitle: 'Sell tax (2%–9%) returns tokens to Pipo Vault for perpetual bonuses.',
      badge: 'SELF-REFILLING TREASURY',
      detailTitle: 'Paper-hand exits replenish the bonus vault for new buyers.',
      detailCopy:
        'Sellers pay a symmetric 2%–9% refill fee that routes directly back into the Locked Treasury Vault. High turnover extends the runway of buyer bonuses indefinitely.',
      metrics: [
        { label: 'REFILL MECHANISM', val: '100% Automated On-Sell' },
        { label: 'TREASURY CUSTODY', val: 'Immutable Smart Contract' },
        { label: 'OWNER WITHDRAWAL', val: 'Disabled Forever' },
      ],
    },
    {
      num: '03',
      title: 'Hold & Earn',
      subtitle: 'Automated ETH, USDG, or RWA drops with 1x, 1.5x, to 2x time boost.',
      badge: 'AUTO-PAYOUT ENGINE',
      detailTitle: 'Holders get paid in the pair currency without staking.',
      detailCopy:
        'A dedicated slice of swap volume accumulates in the Payout Pot and air-drops ETH, USDG, or xGOLD directly to holder wallets weighted by hold duration up to 2x.',
      metrics: [
        { label: '0–3 DAYS HOLD', val: '1.0x Base Weight' },
        { label: '3–7 DAYS HOLD', val: '1.5x Boosted Weight' },
        { label: '7+ DAYS DIAMOND', val: '2.0x Maximum Share' },
      ],
    },
    {
      num: '04',
      title: '$PIPO Burn',
      subtitle: 'Platform fee (0.2%–0.7%) automatically buys & burns $PIPO.',
      badge: 'DEFLATIONARY OS CORE',
      detailTitle: 'Every launchpad trade fuels the $PIPO buy-and-burn engine + radar shield.',
      detailCopy:
        'Block-zero launches activate a 10-second 99% decaying bot tax while routing 0.5% protocol fees across all pairs to market-buy and permanently burn $PIPO.',
      metrics: [
        { label: 'PROTOCOL BURN FEE', val: '0.5% Per Swap' },
        { label: 'BLOCK-0 BOT TAX', val: '99% -> 0% in 10s' },
        { label: 'TOTAL HARD CAP', val: '<= 10% Immutable' },
      ],
    },
  ];

  const currentStep = workflowSteps[activeWorkflowStep];

  return (
    <div className="pb-16">
      {/* =====================================================================
          SECTION A — KINETIC & SPLIT EDITORIAL HERO
      ===================================================================== */}
      <section className="page-shell pt-8 sm:pt-14 pb-12">
        {/* Kinetic Editorial Header */}
        <div className="relative py-6 sm:py-10">
          {/* Safe-Zone Floating Tiles with Official SVG Logos on Desktop */}
          <div
            aria-hidden="true"
            className="hidden xl:flex flex-col items-center justify-center w-22 h-22 rounded-[24px] bg-[#081C19] border border-[#0F3933] absolute -top-2 right-10 rotate-6 p-2.5"
          >
            <PairBadgeIconSVG symbol="USDG" className="w-10 h-10 mb-1" />
            <span className="font-mono-label text-[9px] font-bold text-[#F5FEFD]">
              USDG
            </span>
          </div>

          <div
            aria-hidden="true"
            className="hidden xl:flex flex-col items-center justify-center w-22 h-22 rounded-[24px] bg-[#081C19] border border-[#0F3933] absolute bottom-2 right-4 -rotate-6 p-2.5"
          >
            <PairBadgeIconSVG symbol="ETH" className="w-10 h-10 mb-1" />
            <span className="font-mono-label text-[9px] font-bold text-[#F5FEFD]">
              ETH
            </span>
          </div>

          <div
            aria-hidden="true"
            className="hidden xl:flex flex-col items-center justify-center w-22 h-22 rounded-[24px] bg-[#04060C] border border-[#0F3933] absolute top-14 right-40 -rotate-3 p-2.5"
          >
            <PairBadgeIconSVG symbol="xNVDA" className="w-10 h-10 mb-1" />
            <span className="font-mono-label text-[9px] font-bold text-[#97FCE4]">
              xNVDA
            </span>
          </div>

          <div
            aria-hidden="true"
            className="hidden 2xl:flex flex-col items-center justify-center w-20 h-20 rounded-[22px] bg-[#04060C] border border-[#97FCE4]/40 absolute bottom-4 right-44 rotate-3 p-2"
          >
            <PipoLogoSVG className="w-11 h-11" />
          </div>

          {/* Eyebrow Mono Aquamarine */}
          <div className="inline-flex items-center gap-2 mb-5">
            <span className="eyebrow-mono text-[#97FCE4]">
              • LIVE ON ROBINHOOD CHAIN — POSITIVE-ENTRY LAUNCHPAD
            </span>
          </div>

          {/* Oversized Neo-Grotesk Headline */}
          <h1 className="display-hero-xl text-[44px] sm:text-[68px] md:text-[88px] lg:text-[108px] text-[#F5FEFD] max-w-6xl">
            Nobody starts from{' '}
            <span className="inline-flex items-center px-4 sm:px-7 py-0.5 sm:py-1 rounded-full bg-[#97FCE4] text-[#04060C] align-baseline">
              zero +
            </span>{' '}
            Pipo pays you first.
          </h1>
        </div>

        {/* Split Two-Card Giant Hero (60 / 40 Ratio) */}
        <div
          id="section-simulator"
          className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch scroll-mt-24"
        >
          {/* Left Card (60% -> 7 cols on 12-col grid): Dark Ebony #04060C with Firefly #0F3933 border */}
          <div className="lg:col-span-7 rounded-[28px] lg:rounded-[44px] bg-[#081C19] border border-[#0F3933] p-7 sm:p-11 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <span className="eyebrow-mono text-[#89B0A9]">
                  FINANCIAL OPERATING SYSTEM · V2.8 ROBINHOOD L2
                </span>
                <span className="font-mono-label text-xs text-[#97FCE4]">
                  NON-CUSTODIAL VAULT
                </span>
              </div>

              <h2 className="font-display font-extrabold text-[54px] sm:text-[76px] xl:text-[96px] tracking-[-0.065em] leading-[0.9] text-[#F5FEFD] mb-6">
                Pipo Pad
              </h2>

              <p className="text-base sm:text-lg text-[#89B0A9] leading-relaxed max-w-2xl">
                Every token purchase on Pipo Pad credits an instant{' '}
                <strong className="text-[#F5FEFD] font-semibold">
                  +2% to +9% Bonus Token
                </strong>{' '}
                allocation straight from the Locked Treasury Vault—while every holder
                automatically receives{' '}
                <strong className="text-[#F5FEFD] font-semibold">
                  ETH, USDG, or Tokenized Asset
                </strong>{' '}
                payouts directly to their wallet with zero staking or claiming.
              </p>
            </div>

            <div className="mt-10 pt-8 border-t border-[#0F3933] flex flex-col gap-7">
              {/* 3 Metadata Chips */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="px-4 py-2 rounded-full bg-[#04060C] border border-[#0F3933] text-xs font-mono-label text-[#F5FEFD]">
                  <strong className="text-[#97FCE4]">1B</strong> Fixed Supply
                </div>
                <div className="px-4 py-2 rounded-full bg-[#04060C] border border-[#0F3933] text-xs font-mono-label text-[#F5FEFD]">
                  <strong className="text-[#97FCE4]">7%+</strong> Locked Vault
                </div>
                <div className="px-4 py-2 rounded-full bg-[#0F3933] border border-[#97FCE4]/30 text-xs font-mono-label text-[#F5FEFD]">
                  <strong className="text-[#97FCE4]">Auto</strong> ETH/USDG Drops
                </div>
              </div>

              {/* 2 Primary / Secondary CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3.5">
                <button
                  type="button"
                  onClick={() => onOpenApp('explore')}
                  className="h-12 px-7 rounded-full bg-[#97FCE4] hover:bg-[#76F7D9] text-[#04060C] font-bold text-sm tracking-tight transition-colors cursor-pointer"
                >
                  Enter Pipo App -&gt;
                </button>
                <button
                  type="button"
                  onClick={() => onOpenApp('create')}
                  className="h-12 px-7 rounded-full bg-[#04060C] hover:bg-[#0F3933] text-[#F5FEFD] border border-[#0F3933] font-bold text-sm tracking-tight transition-colors cursor-pointer"
                >
                  Create Token
                </button>
              </div>
            </div>
          </div>

          {/* Right Card (40% -> 5 cols): Solid Aquamarine #97FCE4 Interactive Pipo Buy Preview Simulator */}
          <div className="lg:col-span-5 rounded-[28px] lg:rounded-[44px] bg-[#97FCE4] text-[#04060C] p-7 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 pb-4 mb-6 border-b border-[#04060C]/20">
                <span className="eyebrow-mono text-[#04060C] font-bold">
                  INTERACTIVE PIPO BUY PREVIEW SIMULATOR
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#04060C] text-[#97FCE4] font-mono-label text-[10px] font-bold">
                  LIVE MATH
                </span>
              </div>

              {/* Controls: Base Swap Output & Bonus Rate Slider */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <label
                    htmlFor="landing-base-swap-input"
                    className="block eyebrow-mono text-[#04060C] mb-2"
                  >
                    BASE SWAP OUTPUT
                  </label>
                  <div className="relative">
                    <input
                      id="landing-base-swap-input"
                      type="number"
                      min={100}
                      max={100000000}
                      step={500}
                      value={baseSwapInput}
                      onChange={(e) =>
                        setBaseSwapInput(Math.max(0, Number(e.target.value)))
                      }
                      className="w-full h-11 px-3.5 pr-16 rounded-2xl bg-[#04060C] text-[#F5FEFD] font-mono-label font-bold text-sm focus:outline-2 focus:outline-[#04060C]"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 font-mono-label text-[10px] text-[#89B0A9]">
                      TOKENS
                    </span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label
                      htmlFor="landing-bonus-rate-slider"
                      className="eyebrow-mono text-[#04060C]"
                    >
                      BONUS TOKENS RATE
                    </label>
                    <span className="font-mono-label text-xs font-extrabold text-[#04060C]">
                      +{bonusRate}%
                    </span>
                  </div>
                  <div className="h-11 flex flex-col justify-center">
                    <input
                      id="landing-bonus-rate-slider"
                      type="range"
                      min={2}
                      max={9}
                      step={1}
                      value={bonusRate}
                      onChange={(e) => setBonusRate(Number(e.target.value))}
                      className="w-full pipo-slider-dark"
                    />
                    <div className="flex justify-between font-mono-label text-[10px] text-[#04060C] font-bold mt-1">
                      <span>2% MIN</span>
                      <span>5% STD</span>
                      <span>9% MAX</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Giant Total Received Number */}
              <div className="my-4">
                <div className="eyebrow-mono text-[#04060C] mb-1">
                  TOTAL RECEIVED IN WALLET
                </div>
                <div
                  data-testid="landing-total-received"
                  className="font-display font-extrabold text-[56px] sm:text-[72px] tracking-[-0.06em] leading-[0.9] text-[#04060C] font-mono-label"
                >
                  {previewQuote.totalReceived.toLocaleString()}
                </div>
              </div>

              {/* Breakdown Rows */}
              <div className="space-y-2 py-4 border-y border-[#04060C]/20 font-mono-label text-xs font-bold text-[#04060C]">
                <div className="flex items-center justify-between">
                  <span>Base tokens:</span>
                  <span>{previewQuote.baseTokens.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Pipo Bonus (+{previewQuote.bonusRate}%):</span>
                  <span>+{previewQuote.bonusTokens.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Stamp + PipoBoosterSVG */}
            <div className="mt-5">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono-label text-[11px] font-bold text-[#04060C]">
                  CREDITED FROM LOCKED VAULT
                </span>
                <span className="inline-block px-3.5 py-1 rounded-full bg-[#04060C] text-[#97FCE4] font-mono-label text-xs font-extrabold -rotate-2">
                  +{previewQuote.bonusTokens.toLocaleString()} EXTRA TOKENS
                </span>
              </div>
              <PipoBoosterSVG
                className="w-full h-36"
                extraCount={`+${previewQuote.bonusTokens.toLocaleString()} EXTRA`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION B — ASYMMETRIC BENTO GRID 70/30 (FOAM #F5FEFD + FIREFLY #0F3933 + EBONY #04060C)
      ===================================================================== */}
      <section
        id="section-architecture"
        className="page-shell py-10 scroll-mt-24"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Left Main Panel (70% -> 8 cols): Foam #F5FEFD with Ebony #04060C Ink Text */}
          <div className="lg:col-span-8 rounded-[28px] lg:rounded-[56px] bg-[#F5FEFD] text-[#04060C] border border-[#C2E8E2] p-6 sm:p-11 flex flex-col justify-between">
            <div>
              {/* Top Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                <span className="eyebrow-mono text-[#04060C]">
                  / ECONOMIC ARCHITECTURE
                </span>
                <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E6F7F5] border border-[#C2E8E2] font-mono-label text-xs font-bold text-[#04060C]">
                  <span
                    className="w-2 h-2 rounded-full bg-[#0F3933]"
                    aria-hidden="true"
                  />
                  Vault Active
                </span>
              </div>

              <h2 className="display-section-h2 text-[36px] sm:text-[54px] lg:text-[64px] text-[#04060C] mb-8 max-w-3xl">
                Profit in on buy. Payout out on hold.
              </h2>

              {/* 4-Step Interactive Rail (#E6F7F5 cards) */}
              <div
                id="section-workflow"
                role="tablist"
                aria-label="Economic Architecture Steps"
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 mb-6 scroll-mt-24"
              >
                {workflowSteps.map((step, idx) => {
                  const isSelected = activeWorkflowStep === idx;
                  return (
                    <button
                      key={step.num}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      onClick={() => setActiveWorkflowStep(idx)}
                      className={`text-left p-4 rounded-[22px] border cursor-pointer ${
                        isSelected
                          ? 'bg-[#04060C] text-[#F5FEFD] border-[#04060C]'
                          : 'bg-[#E6F7F5] text-[#04060C] border-[#C2E8E2] hover:border-[#0F3933]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`font-mono-label text-xs font-bold ${
                            isSelected ? 'text-[#97FCE4]' : 'text-[#04060C]'
                          }`}
                        >
                          {step.num}
                        </span>
                        <span
                          className={`text-[10px] font-mono-label px-2 py-0.5 rounded-full font-bold ${
                            isSelected
                              ? 'bg-[#97FCE4] text-[#04060C]'
                              : 'bg-[#F5FEFD] text-[#04060C] border border-[#C2E8E2]'
                          }`}
                        >
                          {isSelected ? 'ACTIVE' : 'STEP'}
                        </span>
                      </div>
                      <div
                        className={`font-display font-extrabold text-lg tracking-tight mb-1 ${
                          isSelected ? 'text-[#F5FEFD]' : 'text-[#04060C]'
                        }`}
                      >
                        {step.title}
                      </div>
                      <p
                        className={`text-xs leading-snug ${
                          isSelected ? 'text-[#F5FEFD]/90' : 'text-[#04060C]/80'
                        }`}
                      >
                        {step.subtitle}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Inset Workflow Canvas */}
              <div className="rounded-[24px] bg-[#E6F7F5] border border-[#C2E8E2] p-5 sm:p-7">
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-center">
                  <div className="xl:col-span-6">
                    <span className="inline-block px-3 py-1 rounded-full bg-[#97FCE4] border border-[#0F3933]/20 text-[#04060C] font-mono-label text-[10px] font-extrabold mb-3">
                      {currentStep.num} · {currentStep.badge}
                    </span>
                    <h3 className="display-card-h3 text-2xl sm:text-3xl text-[#04060C] mb-3">
                      {currentStep.detailTitle}
                    </h3>
                    <p className="text-sm text-[#04060C]/80 leading-relaxed mb-5">
                      {currentStep.detailCopy}
                    </p>
                    <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#C2E8E2]">
                      {currentStep.metrics.map((m) => (
                        <div key={m.label}>
                          <div className="font-mono-label text-[9px] text-[#04060C]/60 uppercase">
                            {m.label}
                          </div>
                          <div className="font-mono-label text-xs font-bold text-[#04060C] mt-0.5">
                            {m.val}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="xl:col-span-6">
                    {activeWorkflowStep === 0 && (
                      <PipoBoosterSVG
                        className="w-full h-44"
                        extraCount="+2% TO +9% BONUS"
                      />
                    )}
                    {activeWorkflowStep === 1 && (
                      <PipoVaultSVG className="w-full h-44" />
                    )}
                    {activeWorkflowStep === 2 && (
                      <PipoCourierSVG className="w-full h-44" />
                    )}
                    {activeWorkflowStep === 3 && (
                      <PipoShieldSVG className="w-full h-44" />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer of Foam Panel */}
            <div className="mt-7 pt-5 border-t border-[#C2E8E2] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-xs sm:text-sm font-medium text-[#04060C]/80 max-w-xl">
                Move from market simulation to an inspected token vault and execute
                positive-entry swaps across USDG, ETH, and Tokenized Assets.
              </p>
              <button
                type="button"
                onClick={() => onOpenApp('explore')}
                className="h-11 px-6 rounded-full bg-[#04060C] hover:bg-[#0F3933] text-[#97FCE4] font-bold text-xs sm:text-sm whitespace-nowrap cursor-pointer shrink-0"
              >
                Explore Live Tokens ↗
              </button>
            </div>
          </div>

          {/* Right Stack (30% -> 4 cols): 3 Stacked Cards */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            {/* Card 1: Hyperliquid Firefly #0F3933 with Foam #F5FEFD & Aquamarine #97FCE4 */}
            <div className="rounded-[28px] lg:rounded-[44px] bg-[#0F3933] border border-[#97FCE4]/30 text-[#F5FEFD] p-7 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="eyebrow-mono text-[#97FCE4] font-bold">
                    HOLDER PAYOUTS
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#04060C] text-[#97FCE4] font-mono-label text-[10px] font-bold">
                    AUTO-DROP
                  </span>
                </div>
                <h3 className="display-card-h3 text-[28px] sm:text-[34px] text-[#F5FEFD] mb-3">
                  Paid in ETH or USDG. Zero claiming.
                </h3>
                <p className="text-xs sm:text-sm text-[#F5FEFD]/85 leading-relaxed">
                  Holders never lock tokens in vulnerable staking contracts. The
                  protocol streams ETH, USDG, or RWA pair payouts straight to your
                  wallet based on hold duration:
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-[#97FCE4]/20 grid grid-cols-3 gap-2 font-mono-label text-xs font-bold text-[#F5FEFD]">
                <div className="p-2.5 rounded-2xl bg-[#04060C]/50 text-center">
                  <div className="text-[10px] text-[#89B0A9]">0-3d</div>
                  <div className="text-sm font-extrabold">1x</div>
                </div>
                <div className="p-2.5 rounded-2xl bg-[#04060C]/75 text-center">
                  <div className="text-[10px] text-[#89B0A9]">3-7d</div>
                  <div className="text-sm font-extrabold">1.5x</div>
                </div>
                <div className="p-2.5 rounded-2xl bg-[#97FCE4] text-[#04060C] text-center">
                  <div className="text-[10px]">7d+</div>
                  <div className="text-sm font-extrabold">2x</div>
                </div>
              </div>
            </div>

            {/* Card 2: Dark #081C19 Public First UX */}
            <div className="rounded-[28px] lg:rounded-[44px] bg-[#081C19] border border-[#0F3933] text-[#F5FEFD] p-7 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="eyebrow-mono text-[#89B0A9]">
                    PUBLIC FIRST UX
                  </span>
                  <span className="font-mono-label text-[11px] text-[#97FCE4]">
                    NO LOGIN WALL
                  </span>
                </div>
                <h3 className="display-card-h3 text-[26px] sm:text-[32px] text-[#F5FEFD] mb-2.5">
                  Read &amp; simulate before you connect.
                </h3>
                <p className="text-xs sm:text-sm text-[#89B0A9] leading-relaxed">
                  All vault health telemetry, payout pots, bonus calculators, and the
                  Robinhood Chain Wallet Inspector are 100% open to browse before
                  connecting a wallet.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#0F3933] flex items-center justify-between">
                <span className="font-mono-label text-[11px] text-[#5E857E]">
                  PUBLIC TELEMETRY READY
                </span>
                <button
                  type="button"
                  onClick={() =>
                    onOpenApp('profile', { profileSubTab: 'inspector' })
                  }
                  className="text-xs font-bold text-[#97FCE4] hover:underline cursor-pointer"
                >
                  Inspect Wallets ↗
                </button>
              </div>
            </div>

            {/* Card 3: Dark #081C19 Anti-Snipe Shield */}
            <div className="rounded-[28px] lg:rounded-[44px] bg-[#081C19] border border-[#0F3933] text-[#F5FEFD] p-7 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="eyebrow-mono text-[#89B0A9]">
                    ANTI-SNIPE SHIELD
                  </span>
                  <span className="font-mono-label text-[11px] text-[#97FCE4]">
                    BLOCK-0 GUARD
                  </span>
                </div>
                <h3 className="display-card-h3 text-[26px] sm:text-[32px] text-[#F5FEFD] mb-2.5">
                  99% decaying bot tax on block zero.
                </h3>
                <p className="text-xs sm:text-sm text-[#89B0A9] leading-relaxed">
                  First 10 seconds enforce an automatic decaying snipe tax (99% -&gt;
                  50% -&gt; 25% ... -&gt; 0%). Any MEV bot tax captured is injected
                  straight into the Pipo Bonus Vault.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#0F3933] flex items-center justify-between font-mono-label text-[11px]">
                <span className="text-[#97FCE4]">99% -&gt; 50% -&gt; 25% -&gt; 0%</span>
                <span className="text-[#89B0A9]">10s WINDOW</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION C — 4-COLUMN EDITORIAL DIRECTORY (/ 01 TO / 04)
      ===================================================================== */}
      <section
        id="section-directory"
        className="page-shell py-14 scroll-mt-24"
      >
        <div className="border-t border-[#0F3933] pt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
          {[
            {
              index: '/ 01',
              heading: 'Explore',
              sub: 'Public market discovery',
              links: [
                {
                  label: 'Discover Tokens',
                  badge: '6 LIVE',
                  onClick: () => onOpenApp('explore'),
                },
                {
                  label: 'Trending 24H',
                  badge: 'HOT',
                  onClick: () =>
                    onOpenApp('explore', { filterSort: 'Trending' }),
                },
                {
                  label: 'Top Bonus Rates',
                  badge: '+9%',
                  onClick: () =>
                    onOpenApp('explore', { filterSort: 'Highest Bonus %' }),
                },
                {
                  label: 'Top Payout Pools',
                  badge: 'USDG/ETH',
                  onClick: () =>
                    onOpenApp('explore', { filterSort: 'Top ETH/USDG Payouts' }),
                },
              ],
            },
            {
              index: '/ 02',
              heading: 'Workflows',
              sub: 'Task-first launchpad actions',
              links: [
                {
                  label: 'Create Token',
                  badge: 'BUILDER',
                  onClick: () => onOpenApp('create'),
                },
                {
                  label: 'Simulate Buy Bonus',
                  badge: 'MATH',
                  onClick: () => {
                    document
                      .getElementById('section-simulator')
                      ?.scrollIntoView({ behavior: 'smooth' });
                  },
                },
                {
                  label: 'Inspect Wallet Rewards',
                  badge: 'PUBLIC',
                  onClick: () =>
                    onOpenApp('profile', { profileSubTab: 'inspector' }),
                },
                {
                  label: 'Trigger $PIPO Burn',
                  badge: '0.5%',
                  onClick: () =>
                    onOpenApp('explore', { triggerBurn: true }),
                },
              ],
            },
            {
              index: '/ 03',
              heading: 'Mechanics',
              sub: 'Immutable vault primitives',
              links: [
                {
                  label: 'Locked 7% Treasury',
                  badge: 'VAULT',
                  onClick: () => {
                    setActiveWorkflowStep(1);
                    document
                      .getElementById('section-architecture')
                      ?.scrollIntoView({ behavior: 'smooth' });
                  },
                },
                {
                  label: 'Hold Multiplier 2x',
                  badge: '7D+',
                  onClick: () =>
                    onOpenApp('profile', { profileSubTab: 'portfolio' }),
                },
                {
                  label: '10s Anti-Snipe Shield',
                  badge: '99% TAX',
                  onClick: () => {
                    setActiveWorkflowStep(3);
                    document
                      .getElementById('section-architecture')
                      ?.scrollIntoView({ behavior: 'smooth' });
                  },
                },
                {
                  label: 'Immutable 10% Cap',
                  badge: 'RULE',
                  onClick: () => onOpenApp('create'),
                },
              ],
            },
            {
              index: '/ 04',
              heading: 'Ecosystem',
              sub: 'Robinhood Chain infrastructure',
              links: [
                {
                  label: 'Buy $PIPO',
                  badge: 'NATIVE',
                  onClick: () =>
                    onOpenApp('detail', { openNativePipo: true }),
                },
                {
                  label: 'Robinhood Chain Status',
                  badge: 'ONLINE',
                  onClick: () => onOpenApp('activity'),
                },
                {
                  label: 'Smart Contract Rules',
                  badge: 'VERIFIED',
                  onClick: () =>
                    onOpenApp('detail', { openNativePipo: true }),
                },
                {
                  label: 'Auto-Burn Vault',
                  badge: 'DEFLATION',
                  onClick: () => onOpenApp('activity'),
                },
              ],
            },
          ].map((col, colIdx) => (
            <div
              key={col.index}
              className={`${
                colIdx > 0 ? 'lg:border-l lg:border-[#0F3933] lg:pl-7' : ''
              } ${colIdx < 3 ? 'lg:pr-7' : ''}`}
            >
              <div className="flex items-baseline gap-3 mb-1">
                <span className="font-mono-label text-xs text-[#5E857E]">
                  {col.index}
                </span>
                <h3 className="font-display font-bold text-3xl text-[#89B0A9] tracking-tight">
                  {col.heading}
                </h3>
              </div>
              <p className="text-xs text-[#5E857E] mb-6 pl-9">{col.sub}</p>

              <div className="border-t border-[#0F3933]">
                {col.links.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={item.onClick}
                    className="w-full h-14 border-b border-[#0F3933] flex items-center justify-between text-left group hover:bg-[#0F3933]/50 px-2 transition-colors cursor-pointer"
                  >
                    <span className="text-sm font-semibold text-[#F5FEFD] group-hover:text-[#97FCE4] transition-colors">
                      {item.label}
                    </span>
                    <div className="flex items-center gap-2.5">
                      <span className="px-2 py-0.5 rounded-full bg-[#081C19] border border-[#0F3933] font-mono-label text-[10px] text-[#89B0A9]">
                        {item.badge}
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-[#89B0A9] group-hover:text-[#97FCE4] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================================
          SECTION D — NATIVE TOKEN CALLOUT & GIANT WORDMARK FOOTER
      ===================================================================== */}
      <footer className="page-shell pt-10">
        <div className="border-t border-[#0F3933] pt-12 pb-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          {/* Left Callout: Contract & Trade $PIPO now. */}
          <div className="lg:col-span-6">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="eyebrow-mono text-[#89B0A9]">
                BUY $PIPO · CONTRACT ADDRESS
              </span>
              <span className="font-mono-label text-xs text-[#97FCE4]">
                0xPIPO...8899ROBIN
              </span>
              <button
                type="button"
                onClick={handleCopyContract}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#081C19] hover:bg-[#0F3933] border border-[#0F3933] font-mono-label text-[11px] text-[#F5FEFD] transition-colors cursor-pointer"
              >
                {copiedCa ? (
                  <>
                    <Check className="w-3 h-3 text-[#97FCE4]" />
                    <span className="text-[#97FCE4]">Copied CA</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 text-[#89B0A9]" />
                    <span>Copy CA</span>
                  </>
                )}
              </button>
            </div>

            <button
              type="button"
              onClick={() => onOpenApp('detail', { openNativePipo: true })}
              className="group text-left flex items-center gap-4 cursor-pointer"
            >
              <span className="w-11 h-11 rounded-full bg-[#F5FEFD] text-[#04060C] flex items-center justify-center group-hover:bg-[#97FCE4] transition-colors shrink-0">
                <ArrowUpRight className="w-6 h-6" />
              </span>
              <span className="display-section-h2 text-[42px] sm:text-[60px] text-[#F5FEFD] group-hover:text-[#97FCE4] transition-colors">
                Trade $PIPO now.
              </span>
            </button>
          </div>

          {/* Right Link Cards: X (@PipoPad) & Robinhood Chain Explorer */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 border-t border-[#0F3933]">
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              className="p-6 border-b sm:border-b-0 sm:border-r border-[#0F3933] hover:bg-[#0F3933]/50 transition-colors flex flex-col justify-between h-36 group"
            >
              <div className="flex justify-end">
                <ArrowUpRight className="w-4 h-4 text-[#89B0A9] group-hover:text-[#97FCE4] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#04060C] border border-[#0F3933] flex items-center justify-center text-[#F5FEFD]">
                  <XBrandLogoSVG className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#F5FEFD]">X (Twitter)</div>
                  <div className="font-mono-label text-xs text-[#89B0A9] mt-0.5">
                    @PipoPad
                  </div>
                </div>
              </div>
            </a>

            <button
              type="button"
              onClick={() => onOpenApp('activity')}
              className="p-6 hover:bg-[#0F3933]/50 transition-colors flex flex-col justify-between h-36 text-left group cursor-pointer"
            >
              <div className="flex justify-end w-full">
                <ArrowUpRight className="w-4 h-4 text-[#89B0A9] group-hover:text-[#97FCE4] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#04060C] border border-[#0F3933] flex items-center justify-center">
                  <RobinhoodLogoSVG className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#F5FEFD]">
                    Robinhood Chain Explorer
                  </div>
                  <div className="font-mono-label text-xs text-[#89B0A9] mt-0.5">
                    explorer.robinhood.chain/pipo
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Full-Width Giant Wordmark PIPOPAD */}
        <div className="border-t border-[#0F3933] pt-6 pb-4 overflow-hidden">
          <div
            aria-label="PIPOPAD"
            className="font-display font-extrabold text-[17.5vw] leading-[0.82] tracking-[-0.065em] text-[#F5FEFD] select-none text-center"
          >
            PIPOPAD
          </div>
          <div className="mt-6 pt-4 border-t border-[#0F3933] flex flex-wrap items-center justify-between gap-4 text-xs font-mono-label text-[#5E857E]">
            <span>© 2026 Pipo Pad ($PIPO). Non-custodial Positive-Entry Launchpad.</span>
            <span>ROBINHOOD CHAIN · HYPERLIQUID EDITION V1.0</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
