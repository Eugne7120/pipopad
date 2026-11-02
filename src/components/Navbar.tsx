import React, { useState } from 'react';
import { PipoToken } from '../types/pipo';
import {
  MiniPriceSparklineSVG,
  PipoLogoSVG,
  RobinhoodLogoSVG,
  TokenAvatarWithOfficialLogo,
} from './svg/PipoMascots';
import { ArrowUpRight, Flame, Menu, Wallet, X } from 'lucide-react';

export type AppViewMode = 'landing' | 'app';
export type AppWorkspaceTab =
  | 'explore'
  | 'create'
  | 'portfolio'
  | 'rewards'
  | 'activity'
  | 'burn'
  | 'how-it-works'
  | 'profile'
  | 'detail';

interface NavbarProps {
  view: AppViewMode;
  activeTab: AppWorkspaceTab;
  walletConnected: boolean;
  walletAddress: string;
  usdgBalance: number;
  ethBalance: number;
  globalSearchQuery?: string;
  onGlobalSearchChange?: (q: string) => void;
  onSwitchView: (newView: AppViewMode, tab?: AppWorkspaceTab) => void;
  onSelectTab: (tab: AppWorkspaceTab) => void;
  onToggleWallet: () => void;
  onBuyPipoClick: () => void;
}

const APP_NAV_TABS: { id: AppWorkspaceTab; label: string }[] = [
  { id: 'explore', label: 'Explore' },
  { id: 'create', label: 'Create Token' },
  { id: 'portfolio', label: 'Portfolio & Rewards' },
  { id: 'activity', label: 'Activity' },
  { id: 'how-it-works', label: 'How It Works' },
];

/**
 * Auto-Scrolling Trending 24H Pill Bar (Aligned with Neon Editorial OS Pill Geometry)
 */
export const TrendingTicker: React.FC<{
  tokens: PipoToken[];
  onSelectToken: (token: PipoToken) => void;
}> = ({ tokens, onSelectToken }) => {
  const trendingList = tokens.slice(0, 6);
  const marqueeItems = [...trendingList, ...trendingList];

  return (
    <section
      aria-label="Trending 24H Tokens"
      data-testid="trending-24h-marquee"
      className="rounded-full bg-[#04060C] border border-[#0F3933] px-4 py-2.5 flex items-center gap-3 overflow-hidden select-none"
    >
      {/* Left Pill Badge */}
      <div className="inline-flex items-center gap-1.5 font-mono-label text-[11px] font-extrabold text-[#97FCE4] shrink-0 pr-3 border-r border-[#0F3933] z-10 bg-[#04060C]">
        <Flame className="w-3.5 h-3.5 fill-[#97FCE4]" />
        <span>TRENDING 24H</span>
      </div>

      {/* Seamless Auto-Scrolling Marquee Track */}
      <div className="flex-1 overflow-hidden relative">
        <div className="animate-pipo-marquee items-center gap-2.5 pr-2.5">
          {marqueeItems.map((tok, idx) => {
            const rank = (idx % trendingList.length) + 1;
            const isPositive = tok.change24h >= 0;
            const sparkData = tok.priceHistory['24H'] || [];
            return (
              <button
                key={`${tok.id}-ticker-${idx}`}
                type="button"
                onClick={() => onSelectToken(tok)}
                className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#081C19] hover:bg-[#0F3933] border border-[#0F3933] hover:border-[#97FCE4]/60 transition-colors cursor-pointer shrink-0 group"
              >
                <span className="font-mono-label text-[11px] font-bold text-[#89B0A9]">
                  #{rank}
                </span>

                <TokenAvatarWithOfficialLogo
                  ticker={tok.ticker}
                  pairSymbol={tok.pairSymbol}
                  avatarBg={tok.avatarBg}
                  avatarLabel={tok.avatarLabel}
                  logoUrl={tok.logoUrl}
                  size="sm"
                />

                <span className="font-display font-extrabold text-xs text-[#F5FEFD] group-hover:text-[#97FCE4] transition-colors">
                  {tok.ticker}
                </span>

                <span
                  className={`font-mono-label text-xs font-bold ${
                    isPositive ? 'text-[#97FCE4]' : 'text-[#FF6868]'
                  }`}
                >
                  {isPositive ? '+' : ''}
                  {tok.change24h.toFixed(1)}%
                </span>

                <span className="px-2.5 py-0.5 rounded-full bg-[#97FCE4] text-[#04060C] font-mono-label text-[10px] font-extrabold">
                  +{tok.buyBonusRate}% Bonus
                </span>

                <MiniPriceSparklineSVG
                  data={sparkData}
                  isPositive={isPositive}
                  className="w-12 h-5 hidden sm:block"
                />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/**
 * Unified Floating Pill Navbar across BOTH Marketing Page and Pipo OS
 */
export const Navbar: React.FC<NavbarProps> = ({
  view,
  activeTab,
  walletConnected,
  walletAddress,
  usdgBalance,
  ethBalance,
  onSwitchView,
  onSelectTab,
  onToggleWallet,
  onBuyPipoClick,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const normalizedActiveTab: AppWorkspaceTab =
    activeTab === 'profile' || activeTab === 'rewards'
      ? 'portfolio'
      : activeTab === 'detail' || activeTab === 'burn'
      ? 'explore'
      : activeTab;

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (view !== 'landing') {
      onSwitchView('landing');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-4 z-50 page-shell">
      <nav
        aria-label="Primary Navigation"
        className="h-14 px-4 sm:px-6 rounded-full bg-[#04060C]/95 border border-[#0F3933] flex items-center justify-between gap-4 backdrop-blur-md"
      >
        {/* Left: Brand Lockup (Click to return to Marketing Page) + Robinhood Chain Badge */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => onSwitchView('landing')}
            className="flex items-center gap-2.5 text-left group cursor-pointer rounded-full"
          >
            <PipoLogoSVG className="w-8 h-8 transition-transform duration-150 group-hover:scale-105" />
            <span className="font-display font-extrabold text-lg tracking-tight text-[#F5FEFD] whitespace-nowrap">
              Pipo Pad
            </span>
          </button>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#0F3933] border border-[#97FCE4]/25 font-mono-label text-[10px] uppercase tracking-wider text-[#F5FEFD] whitespace-nowrap">
            <RobinhoodLogoSVG className="w-3 h-3" />
            <span>Robinhood Chain</span>
          </span>
        </div>

        {/* Center: Contextual Links (Landing Scroll Links vs Minimalist Pipo OS Pill Tabs) */}
        <div className="hidden lg:flex items-center gap-1">
          {view === 'landing' ? (
            <div className="flex items-center gap-6 px-3">
              <button
                type="button"
                onClick={() => scrollToSection('section-simulator')}
                className="text-sm font-semibold text-[#89B0A9] hover:text-[#F5FEFD] transition-colors whitespace-nowrap cursor-pointer"
              >
                Simulator
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('section-architecture')}
                className="text-sm font-semibold text-[#89B0A9] hover:text-[#F5FEFD] transition-colors whitespace-nowrap cursor-pointer"
              >
                Architecture
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('section-workflow')}
                className="text-sm font-semibold text-[#89B0A9] hover:text-[#F5FEFD] transition-colors whitespace-nowrap cursor-pointer"
              >
                Workflow
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('section-directory')}
                className="text-sm font-semibold text-[#89B0A9] hover:text-[#F5FEFD] transition-colors whitespace-nowrap cursor-pointer"
              >
                Directory
              </button>
            </div>
          ) : (
            <div
              role="tablist"
              aria-label="Workspace Sections"
              className="flex items-center gap-0.5 bg-[#04060C] p-1 rounded-full border border-[#0F3933]"
            >
              {APP_NAV_TABS.map((tab) => {
                const isActive = normalizedActiveTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => onSelectTab(tab.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'bg-[#97FCE4] text-[#04060C]'
                        : 'text-[#89B0A9] hover:text-[#F5FEFD]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Right: Buy $PIPO + Primary Action / Wallet Pill */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onBuyPipoClick}
            className="hidden sm:inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full bg-[#0F3933] hover:bg-[#144B43] border border-[#97FCE4]/30 text-xs font-bold text-[#F5FEFD] transition-colors whitespace-nowrap cursor-pointer"
          >
            <span>Buy $PIPO</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#97FCE4]" />
          </button>

          {view === 'landing' ? (
            <button
              type="button"
              onClick={() => onSwitchView('app', 'explore')}
              className="h-9 px-4 sm:px-5 rounded-full bg-[#97FCE4] hover:bg-[#76F7D9] text-[#04060C] text-xs sm:text-sm font-bold tracking-tight transition-colors whitespace-nowrap cursor-pointer"
            >
              Open Pipo OS -&gt;
            </button>
          ) : (
            <button
              type="button"
              onClick={onToggleWallet}
              className="h-9 px-4 rounded-full bg-[#97FCE4] hover:bg-[#76F7D9] text-[#04060C] text-xs font-bold tracking-tight transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer"
            >
              <Wallet className="w-3.5 h-3.5 stroke-[2.5]" />
              {walletConnected ? (
                <span className="font-mono-label text-xs font-extrabold">
                  {walletAddress} · {(usdgBalance / 1000).toFixed(1)}K USDG
                </span>
              ) : (
                <span>Connect Wallet</span>
              )}
            </button>
          )}

          {/* Mobile Drawer Trigger */}
          <button
            type="button"
            aria-label={
              mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'
            }
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="lg:hidden w-10 h-10 rounded-full bg-[#0F3933] border border-[#97FCE4]/30 flex items-center justify-center text-[#F5FEFD] cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X className="w-4 h-4" />
            ) : (
              <Menu className="w-4 h-4" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 p-4 rounded-[28px] bg-[#04060C] border border-[#0F3933] flex flex-col gap-2">
          <div className="flex items-center justify-between pb-2 mb-1 border-b border-[#0F3933]">
            <span className="eyebrow-mono text-[#89B0A9]">NAVIGATION</span>
            <span className="font-mono-label text-xs text-[#97FCE4]">
              Robinhood Chain Active
            </span>
          </div>
          {view === 'landing' ? (
            <>
              <button
                type="button"
                onClick={() => scrollToSection('section-simulator')}
                className="py-2.5 px-3 text-left text-sm font-bold text-[#F5FEFD] hover:bg-[#0F3933] rounded-xl"
              >
                Simulator
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('section-architecture')}
                className="py-2.5 px-3 text-left text-sm font-bold text-[#F5FEFD] hover:bg-[#0F3933] rounded-xl"
              >
                Architecture
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('section-workflow')}
                className="py-2.5 px-3 text-left text-sm font-bold text-[#F5FEFD] hover:bg-[#0F3933] rounded-xl"
              >
                Workflow
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('section-directory')}
                className="py-2.5 px-3 text-left text-sm font-bold text-[#F5FEFD] hover:bg-[#0F3933] rounded-xl"
              >
                Directory
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onSwitchView('app', 'explore');
                }}
                className="mt-1 py-3 px-4 rounded-full bg-[#97FCE4] text-[#04060C] text-center text-sm font-bold"
              >
                Open Pipo OS -&gt;
              </button>
            </>
          ) : (
            <>
              {APP_NAV_TABS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onSelectTab(t.id);
                  }}
                  className={`py-2.5 px-4 text-left text-sm font-bold rounded-xl ${
                    normalizedActiveTab === t.id
                      ? 'bg-[#97FCE4] text-[#04060C]'
                      : 'text-[#F5FEFD] hover:bg-[#0F3933]'
                  }`}
                >
                  {t.label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onSwitchView('landing');
                }}
                className="py-2.5 px-4 text-left text-sm font-bold text-[#89B0A9] hover:bg-[#0F3933] rounded-xl"
              >
                &lt;- Back to Marketing Page
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
};
