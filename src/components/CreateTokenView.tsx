import React, { useRef, useState } from 'react';
import {
  PairAssetSymbol,
  PairCategory,
  PayoutDestination,
  PipoToken,
} from '../types/pipo';
import { PAIR_ASSETS } from '../data/initialData';
import { calculateBuyPreview, clampEconomicRates } from '../utils/economics';
import {
  PairBadgeIconSVG,
  PipoBoosterSVG,
  TokenAvatarWithOfficialLogo,
} from './svg/PipoMascots';
import {
  CheckCircle2,
  ImagePlus,
  ShieldAlert,
  Sparkles,
  Trash2,
  Upload,
} from 'lucide-react';

interface CreateTokenViewProps {
  onCreateToken: (newToken: PipoToken) => void;
}

const PAIR_CATEGORIES: {
  category: PairCategory;
  symbols: PairAssetSymbol[];
}[] = [
  { category: 'Stable / Native', symbols: ['USDG', 'ETH'] },
  { category: 'Custom Tokens', symbols: ['$PUMP', '$SOL', '$MEME'] },
  {
    category: 'Tokenized Assets',
    symbols: ['xNVDA', 'xGOLD', 'xTSLA'],
  },
  { category: 'Cross-Chain', symbols: ['wBTC', 'SOL-W'] },
];

export const CreateTokenView: React.FC<CreateTokenViewProps> = ({
  onCreateToken,
}) => {
  const [name, setName] = useState('');
  const [ticker, setTicker] = useState('');
  const [description, setDescription] = useState('');
  const [logoUrl, setLogoUrl] = useState<string>('');
  const [logoFileName, setLogoFileName] = useState<string>('');
  const [isDraggingLogo, setIsDraggingLogo] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [xHandle, setXHandle] = useState('');
  const [telegramLink, setTelegramLink] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');

  // Multi-Pair Selection State
  const [pairSymbol, setPairSymbol] = useState<PairAssetSymbol>('USDG');

  // Economic Rules State (Bonus + Payout <= 9%)
  const [buyBonusRate, setBuyBonusRate] = useState<number>(5);
  const [holderPayoutRate, setHolderPayoutRate] = useState<number>(3);
  const [payoutDestination, setPayoutDestination] =
    useState<PayoutDestination>('Direct to Holders Forever');
  const [antiSnipeEnabled, setAntiSnipeEnabled] = useState<boolean>(true);
  const [formError, setFormError] = useState<string | null>(null);

  const clamped = clampEconomicRates(buyBonusRate, holderPayoutRate);
  const activePairInfo = PAIR_ASSETS[pairSymbol];
  const sampleBuyPreview = calculateBuyPreview(10000, clamped.buyBonusRate);

  const handleBonusSliderChange = (newBonus: number) => {
    const next = clampEconomicRates(newBonus, holderPayoutRate);
    setBuyBonusRate(next.buyBonusRate);
    setHolderPayoutRate(next.holderPayoutRate);
  };

  const handlePayoutSliderChange = (newPayout: number) => {
    const next = clampEconomicRates(buyBonusRate, newPayout);
    setHolderPayoutRate(next.holderPayoutRate);
  };

  const processLogoFile = (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setFormError('Please upload a valid image file (PNG, JPG, SVG, WEBP, GIF).');
      return;
    }
    setFormError(null);
    setLogoFileName(file.name);
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (typeof ev.target?.result === 'string') {
        setLogoUrl(ev.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleLogoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    processLogoFile(file);
  };

  const handleLogoDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingLogo(false);
    const file = e.dataTransfer.files?.[0];
    processLogoFile(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !ticker.trim()) {
      setFormError('Please provide both a Token Name and a Ticker Symbol.');
      return;
    }
    setFormError(null);

    const formattedTicker = ticker.trim().startsWith('$')
      ? ticker.trim().toUpperCase()
      : `$${ticker.trim().toUpperCase()}`;

    const initialPriceInPair =
      activePairInfo.oraclePriceUsd > 100
        ? 0.000005
        : activePairInfo.oraclePriceUsd > 10
        ? 0.00005
        : 0.005;

    const newToken: PipoToken = {
      id: `token-${Date.now()}`,
      name: name.trim(),
      ticker: formattedTicker,
      contractAddress: `0x${formattedTicker
        .replace('$', '')
        .slice(0, 4)}...${Math.floor(1000 + Math.random() * 9000)}ROBIN`,
      description:
        description.trim() ||
        `Positive-entry token vault paired with ${pairSymbol} on Robinhood Chain. Buyers get +${clamped.buyBonusRate}% extra tokens immediately.`,
      avatarBg: '#97FCE4',
      avatarLabel: formattedTicker.replace('$', '').slice(0, 4),
      logoUrl: logoUrl.trim() || undefined,
      pairSymbol,
      pairCategory: activePairInfo.category,
      priceInPair: initialPriceInPair,
      priceUsd: Number(
        (initialPriceInPair * activePairInfo.oraclePriceUsd).toFixed(6)
      ),
      change24h: 12.5,
      marketCapUsd: 420000,
      volume24hUsd: 85000,
      buyBonusRate: clamped.buyBonusRate,
      holderPayoutRate: clamped.holderPayoutRate,
      platformBurnFee: 0.5,
      vaultLockedPercent: 8.5,
      vaultTokensRemaining: 85000000,
      totalBonusCredited: 125000,
      totalVaultRefilled: 95000,
      nextPayoutPotInPair:
        activePairInfo.oraclePriceUsd > 500 ? 0.45 : 1250,
      totalPayoutsDistributedInPair:
        activePairInfo.oraclePriceUsd > 500 ? 1.2 : 4800,
      payoutDestination,
      creatorRevenueCollectedInPair:
        payoutDestination === 'Creator First (Switchable to Holders Later)'
          ? 2.4
          : 0,
      antiSnipeEnabled,
      holdersCount: 142,
      createdAt: '2026-10-30',
      isCreatorOwned: true,
      socials: {
        x: xHandle || '@PipoPadLaunch',
        telegram: telegramLink || undefined,
        website: websiteUrl || undefined,
      },
      priceHistory: {
        '15M': [0.004, 0.0042, 0.0044, 0.0046, 0.0048, 0.0049, 0.005],
        '1H': [0.0038, 0.004, 0.0043, 0.0045, 0.0047, 0.0049, 0.005],
        '24H': [0.0035, 0.0039, 0.0042, 0.0045, 0.0047, 0.0049, 0.005],
        '7D': [0.0025, 0.003, 0.0035, 0.004, 0.0044, 0.0048, 0.005],
      },
    };

    onCreateToken(newToken);
  };

  const displayTicker = ticker.trim()
    ? ticker.trim().startsWith('$')
      ? ticker.trim().toUpperCase()
      : `$${ticker.trim().toUpperCase()}`
    : '$YOURTOKEN';

  const step1Done = Boolean(name.trim() && ticker.trim());

  return (
    <div className="space-y-6">
      {/* Visible Step-by-Step Creation Header */}
      <div className="rounded-[28px] bg-[#081C19] border border-[#0F3933] p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="eyebrow-mono text-[#97FCE4]">
            • ONE-PAGE VAULT DEPLOYER
          </span>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-[#F5FEFD] mt-1">
            Create Token Launch
          </h1>
          <p className="text-xs sm:text-sm text-[#89B0A9] mt-0.5">
            Deploy a Positive-Entry vault on Robinhood Chain with instant buyer
            bonuses and automatic holder payouts.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 font-mono-label text-xs shrink-0">
          <span
            className={`px-3.5 py-1.5 rounded-full font-bold ${
              step1Done
                ? 'bg-[#97FCE4] text-[#04060C]'
                : 'bg-[#04060C] border border-[#0F3933] text-[#F5FEFD]'
            }`}
          >
            01 Identity
          </span>
          <span className="text-[#89B0A9]">-&gt;</span>
          <span className="px-3.5 py-1.5 rounded-full bg-[#97FCE4] text-[#04060C] font-bold">
            02 Pair ({pairSymbol})
          </span>
          <span className="text-[#89B0A9]">-&gt;</span>
          <span className="px-3.5 py-1.5 rounded-full bg-[#0F3933] border border-[#97FCE4]/30 text-[#97FCE4] font-bold">
            03 Rules ({clamped.totalTaxPct}%)
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* LEFT COLUMN: Step-by-Step Configuration Form (7 cols) */}
        <form
          onSubmit={handleSubmit}
          className="lg:col-span-7 rounded-[28px] lg:rounded-[32px] bg-[#081C19] border border-[#0F3933] p-6 sm:p-8 space-y-7"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#0F3933]">
            <div>
              <span className="eyebrow-mono text-[#97FCE4]">
                LAUNCHPAD BUILDER
              </span>
              <h2 className="font-display font-extrabold text-xl text-[#F5FEFD] mt-0.5">
                Configure Positive-Entry Token
              </h2>
            </div>
            <span className="px-3.5 py-1 rounded-full bg-[#04060C] border border-[#0F3933] font-mono-label text-xs text-[#89B0A9]">
              1,000,000,000 Fixed Supply
            </span>
          </div>

          {formError && (
            <div
              role="alert"
              className="p-4 rounded-2xl bg-[#FF6868]/15 border border-[#FF6868] text-xs font-bold text-[#FF6868]"
            >
              {formError}
            </div>
          )}

          {/* STEP 1: Token Identity & Logo Upload */}
          <div className="space-y-4">
            <div className="eyebrow-mono text-[#89B0A9]">
              01 / TOKEN IDENTITY &amp; ARTWORK
            </div>

            {/* Upload Token Logo Control */}
            <div>
              <label
                htmlFor="token-logo-upload"
                className="block text-xs font-bold text-[#F5FEFD] mb-2"
              >
                Upload Token Logo
              </label>

              <input
                ref={fileInputRef}
                id="token-logo-upload"
                type="file"
                accept="image/png,image/jpeg,image/webp,image/svg+xml,image/gif"
                onChange={handleLogoFileChange}
                className="sr-only"
              />

              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDraggingLogo(true);
                }}
                onDragLeave={() => setIsDraggingLogo(false)}
                onDrop={handleLogoDrop}
                className={`p-4 rounded-2xl bg-[#04060C] border transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isDraggingLogo
                    ? 'border-[#97FCE4] bg-[#0F3933]'
                    : 'border-[#0F3933]'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <TokenAvatarWithOfficialLogo
                    ticker={displayTicker}
                    pairSymbol={pairSymbol}
                    avatarBg="#97FCE4"
                    avatarLabel={displayTicker.replace('$', '').slice(0, 4)}
                    logoUrl={logoUrl || undefined}
                    size="lg"
                  />
                  <div>
                    <div className="text-xs font-bold text-[#F5FEFD] flex items-center gap-1.5">
                      <ImagePlus className="w-3.5 h-3.5 text-[#97FCE4]" />
                      <span>
                        {logoFileName
                          ? `Uploaded: ${logoFileName}`
                          : logoUrl
                          ? 'Custom Logo Active'
                          : 'Upload Custom Token Logo'}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#89B0A9] mt-0.5">
                      Drag &amp; drop or choose image (PNG, JPG, SVG, WEBP ·
                      512x512px)
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    data-testid="upload-logo-btn"
                    onClick={() => fileInputRef.current?.click()}
                    className="h-9 px-4 rounded-full bg-[#97FCE4] hover:bg-[#76F7D9] text-[#04060C] text-xs font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>{logoUrl ? 'Change Logo' : 'Upload Logo'}</span>
                  </button>

                  {logoUrl && (
                    <button
                      type="button"
                      aria-label="Remove uploaded logo"
                      onClick={() => {
                        setLogoUrl('');
                        setLogoFileName('');
                        if (fileInputRef.current) {
                          fileInputRef.current.value = '';
                        }
                      }}
                      className="p-2 rounded-full bg-[#081C19] hover:bg-[#0F3933] border border-[#0F3933] text-[#FF6868] transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="token-name-input"
                  className="block text-xs font-bold text-[#F5FEFD] mb-1.5"
                >
                  Token Name *
                </label>
                <input
                  id="token-name-input"
                  type="text"
                  required
                  placeholder="e.g. Gold Standard Owl"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-11 px-4 rounded-2xl bg-[#04060C] border border-[#0F3933] text-sm text-[#F5FEFD] placeholder-[#5E857E] focus:outline-none focus:border-[#97FCE4]"
                />
              </div>

              <div>
                <label
                  htmlFor="token-ticker-input"
                  className="block text-xs font-bold text-[#F5FEFD] mb-1.5"
                >
                  Ticker Symbol *
                </label>
                <input
                  id="token-ticker-input"
                  type="text"
                  required
                  maxLength={10}
                  placeholder="e.g. GOWL"
                  value={ticker}
                  onChange={(e) => setTicker(e.target.value)}
                  className="w-full h-11 px-4 rounded-2xl bg-[#04060C] border border-[#0F3933] font-mono-label text-sm text-[#F5FEFD] placeholder-[#5E857E] focus:outline-none focus:border-[#97FCE4]"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <label
                  htmlFor="token-desc-input"
                  className="font-bold text-[#F5FEFD]"
                >
                  Thesis &amp; Vault Description
                </label>
                <span className="font-mono-label text-[#89B0A9]">
                  {description.length}/280
                </span>
              </div>
              <textarea
                id="token-desc-input"
                rows={2}
                maxLength={280}
                placeholder="Explain why buyers hold and what pair asset payouts they receive..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3.5 rounded-2xl bg-[#04060C] border border-[#0F3933] text-sm text-[#F5FEFD] placeholder-[#5E857E] focus:outline-none focus:border-[#97FCE4]"
              />
            </div>

            {/* Optional Social Links */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label
                  htmlFor="social-x-input"
                  className="block text-[11px] font-mono-label text-[#89B0A9] mb-1"
                >
                  X (Optional)
                </label>
                <input
                  id="social-x-input"
                  type="text"
                  placeholder="@handle"
                  value={xHandle}
                  onChange={(e) => setXHandle(e.target.value)}
                  className="w-full h-10 px-3 rounded-2xl bg-[#04060C] border border-[#0F3933] text-xs text-[#F5FEFD]"
                />
              </div>
              <div>
                <label
                  htmlFor="social-tg-input"
                  className="block text-[11px] font-mono-label text-[#89B0A9] mb-1"
                >
                  Telegram (Optional)
                </label>
                <input
                  id="social-tg-input"
                  type="text"
                  placeholder="t.me/group"
                  value={telegramLink}
                  onChange={(e) => setTelegramLink(e.target.value)}
                  className="w-full h-10 px-3 rounded-2xl bg-[#04060C] border border-[#0F3933] text-xs text-[#F5FEFD]"
                />
              </div>
              <div>
                <label
                  htmlFor="social-web-input"
                  className="block text-[11px] font-mono-label text-[#89B0A9] mb-1"
                >
                  Website (Optional)
                </label>
                <input
                  id="social-web-input"
                  type="text"
                  placeholder="https://..."
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  className="w-full h-10 px-3 rounded-2xl bg-[#04060C] border border-[#0F3933] text-xs text-[#F5FEFD]"
                />
              </div>
            </div>
          </div>

          {/* STEP 2: Multi-Pair Asset Selector (4 Categories) */}
          <div className="space-y-4 pt-5 border-t border-[#0F3933]">
            <div className="flex items-center justify-between">
              <span className="eyebrow-mono text-[#97FCE4]">
                02 / MULTI-PAIR ASSET SELECTOR (4 CATEGORIES)
              </span>
              <span className="font-mono-label text-xs text-[#89B0A9]">
                Oracle: ${activePairInfo.oraclePriceUsd.toLocaleString()}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {PAIR_CATEGORIES.map((group) => (
                <div
                  key={group.category}
                  className="p-3.5 rounded-2xl bg-[#04060C] border border-[#0F3933]"
                >
                  <div className="font-mono-label text-[10px] text-[#89B0A9] uppercase mb-2.5">
                    {group.category}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.symbols.map((sym) => {
                      const selected = pairSymbol === sym;
                      const info = PAIR_ASSETS[sym];
                      return (
                        <button
                          key={sym}
                          type="button"
                          onClick={() => setPairSymbol(sym)}
                          className={`px-3 py-1.5 rounded-full font-mono-label text-xs font-bold flex items-center gap-1.5 border transition-colors cursor-pointer ${
                            selected
                              ? 'bg-[#97FCE4] text-[#04060C] border-[#97FCE4]'
                              : 'bg-[#081C19] text-[#F5FEFD] border-[#0F3933] hover:border-[#89B0A9]'
                          }`}
                        >
                          <PairBadgeIconSVG
                            symbol={sym}
                            className="w-3.5 h-3.5"
                          />
                          <span>{sym}</span>
                          {info.category === 'Tokenized Assets' && (
                            <span className="text-[9px] opacity-75">RWA</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* STEP 3: Immutable Economic Rules */}
          <div className="space-y-5 pt-5 border-t border-[#0F3933]">
            <div className="flex items-center justify-between">
              <span className="eyebrow-mono text-[#89B0A9]">
                03 / IMMUTABLE ECONOMIC RULES (HARD CAP &lt;= 10%)
              </span>
              <span className="px-3 py-1 rounded-full bg-[#97FCE4] text-[#04060C] font-mono-label text-xs font-extrabold">
                Total Load: {clamped.totalTaxPct}% / 10% Max
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Buy Bonus Rate Slider */}
              <div className="p-4 rounded-2xl bg-[#04060C] border border-[#0F3933]">
                <div className="flex items-center justify-between mb-2">
                  <label
                    htmlFor="builder-bonus-slider"
                    className="text-xs font-bold text-[#F5FEFD]"
                  >
                    Buy Bonus &amp; Vault Refill Rate
                  </label>
                  <span className="font-mono-label text-sm font-extrabold text-[#97FCE4]">
                    +{clamped.buyBonusRate}%
                  </span>
                </div>
                <input
                  id="builder-bonus-slider"
                  type="range"
                  min={2}
                  max={9}
                  step={1}
                  value={clamped.buyBonusRate}
                  onChange={(e) =>
                    handleBonusSliderChange(Number(e.target.value))
                  }
                  className="w-full pipo-slider-green"
                />
                <p className="text-[11px] text-[#89B0A9] mt-2">
                  Buyers get +{clamped.buyBonusRate}% extra tokens on entry;
                  sellers refill {clamped.buyBonusRate}% back into Pipo Vault.
                </p>
              </div>

              {/* Holder Payout Rate Slider */}
              <div className="p-4 rounded-2xl bg-[#04060C] border border-[#0F3933]">
                <div className="flex items-center justify-between mb-2">
                  <label
                    htmlFor="builder-payout-slider"
                    className="text-xs font-bold text-[#F5FEFD]"
                  >
                    Holder Payout Rate ({pairSymbol})
                  </label>
                  <span className="font-mono-label text-sm font-extrabold text-[#F5FEFD]">
                    {clamped.holderPayoutRate}%
                  </span>
                </div>
                <input
                  id="builder-payout-slider"
                  type="range"
                  min={0}
                  max={7}
                  step={1}
                  value={clamped.holderPayoutRate}
                  onChange={(e) =>
                    handlePayoutSliderChange(Number(e.target.value))
                  }
                  className="w-full pipo-slider-green"
                />
                <p className="text-[11px] text-[#89B0A9] mt-2">
                  Auto-capped at {clamped.maxAllowedPayoutRate}% so Bonus (
                  {clamped.buyBonusRate}%) + Payout ({clamped.holderPayoutRate}
                  %) &lt;= 9%.
                </p>
              </div>
            </div>

            {/* Payout Destination */}
            <div>
              <span className="block text-xs font-bold text-[#F5FEFD] mb-2">
                Payout Destination Routing
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(
                  [
                    'Direct to Holders Forever',
                    'Creator First (Switchable to Holders Later)',
                  ] as PayoutDestination[]
                ).map((dest) => {
                  const active = payoutDestination === dest;
                  return (
                    <button
                      key={dest}
                      type="button"
                      onClick={() => setPayoutDestination(dest)}
                      className={`p-3.5 rounded-2xl border text-left transition-colors cursor-pointer ${
                        active
                          ? 'bg-[#0F3933] border-[#97FCE4] text-[#F5FEFD]'
                          : 'bg-[#04060C] border-[#0F3933] text-[#89B0A9]'
                      }`}
                    >
                      <div className="text-xs font-bold text-[#F5FEFD]">
                        {dest}
                      </div>
                      <div className="text-[11px] text-[#89B0A9] mt-0.5">
                        {dest === 'Direct to Holders Forever'
                          ? `100% of ${pairSymbol} payouts stream directly to holders from block 0.`
                          : `Creator collects initial ${pairSymbol} fee; 1-click irreversible flip to holders in Rewards.`}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 10-Second Anti-Snipe Toggle */}
            <div className="p-4 rounded-2xl bg-[#04060C] border border-[#0F3933] flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <ShieldAlert className="w-5 h-5 text-[#97FCE4] shrink-0" />
                <div>
                  <div className="text-xs font-bold text-[#F5FEFD]">
                    10-Second Anti-Snipe Protection (99% Decaying Bot Tax)
                  </div>
                  <div className="text-[11px] text-[#89B0A9]">
                    Taxes block-0 sniper bots at 99% -&gt; 0% over 10 seconds
                    and routes captured tokens into the Pipo Bonus Vault.
                  </div>
                </div>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={antiSnipeEnabled}
                onClick={() => setAntiSnipeEnabled((v) => !v)}
                className={`w-12 h-7 rounded-full p-1 transition-colors cursor-pointer shrink-0 ${
                  antiSnipeEnabled ? 'bg-[#97FCE4]' : 'bg-[#0F3933]'
                }`}
              >
                <span
                  className={`block w-5 h-5 rounded-full bg-[#04060C] transition-transform ${
                    antiSnipeEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-12 rounded-full bg-[#97FCE4] hover:bg-[#76F7D9] text-[#04060C] font-display font-extrabold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 fill-[#04060C]" />
            <span>Create Token on Robinhood Chain</span>
          </button>
        </form>

        {/* RIGHT COLUMN: Sticky Live Preview Card & Foam Receipt (5 cols) */}
        <div className="lg:col-span-5 lg:sticky lg:top-20 space-y-5">
          {/* Live Image-First Token Card Preview */}
          <div className="rounded-[28px] bg-[#081C19] border border-[#0F3933] p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="eyebrow-mono text-[#97FCE4]">
                LIVE TOKEN CARD PREVIEW
              </span>
              <span className="font-mono-label text-xs text-[#89B0A9]">
                {activePairInfo.category}
              </span>
            </div>

            {/* Image-First Media Container */}
            <div className="h-36 rounded-[20px] bg-[#04060C] border border-[#0F3933] p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span
                  data-testid="preview-pair-badge"
                  className="inline-flex items-center gap-1.5 font-mono-label text-xs font-bold text-[#F5FEFD]"
                >
                  <PairBadgeIconSVG
                    symbol={pairSymbol}
                    className="w-3.5 h-3.5"
                  />
                  <span>{pairSymbol} Pair</span>
                </span>
                <span className="font-mono-label text-[11px] font-bold text-[#97FCE4]">
                  GENESIS READY
                </span>
              </div>

              <div className="flex items-end justify-between">
                <TokenAvatarWithOfficialLogo
                  ticker={displayTicker}
                  pairSymbol={pairSymbol}
                  avatarBg="#97FCE4"
                  avatarLabel={displayTicker.replace('$', '').slice(0, 4)}
                  logoUrl={logoUrl || undefined}
                  size="xl"
                />
                <span className="font-mono-label text-xs text-[#89B0A9]">
                  1,000,000,000 {displayTicker}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-extrabold text-xl text-[#F5FEFD]">
                    {name.trim() || 'Untitled Pipo Vault'}
                  </h3>
                  <span className="font-mono-label text-xs font-bold text-[#89B0A9]">
                    {displayTicker}
                  </span>
                </div>
                <p className="text-xs text-[#89B0A9] mt-1 leading-relaxed">
                  {description.trim() ||
                    `Every buyer of ${displayTicker} receives +${clamped.buyBonusRate}% bonus tokens from the Locked Treasury Vault while holders earn automated ${pairSymbol} payouts.`}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-3 rounded-2xl bg-[#97FCE4] text-[#04060C]">
                  <div className="font-mono-label text-[9px] uppercase font-bold opacity-80">
                    BUY BONUS
                  </div>
                  <div className="font-display font-extrabold text-base mt-0.5">
                    +{clamped.buyBonusRate}% Extra
                  </div>
                </div>
                <div className="p-3 rounded-2xl bg-[#0F3933] border border-[#97FCE4]/25 text-[#F5FEFD]">
                  <div className="font-mono-label text-[9px] uppercase font-bold text-[#97FCE4]">
                    HOLDER PAYOUT
                  </div>
                  <div className="font-display font-extrabold text-base mt-0.5">
                    {clamped.holderPayoutRate}% in {pairSymbol}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Foam (#F5FEFD) Live Pipo Buy Preview Receipt */}
          <div className="rounded-[28px] bg-[#F5FEFD] text-[#04060C] border border-[#C2E8E2] p-6">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#C2E8E2]">
              <span className="eyebrow-mono text-[#04060C] font-bold">
                PIPO BUY PREVIEW RECEIPT
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#04060C] text-[#97FCE4] font-mono-label text-[10px] font-bold">
                PAIR: {displayTicker}/{pairSymbol}
              </span>
            </div>

            <div className="space-y-2 text-xs mb-4">
              <div className="flex justify-between">
                <span className="text-[#04060C]/75 font-medium">
                  Sample Base Swap:
                </span>
                <span className="font-mono-label font-bold text-[#04060C]">
                  {sampleBuyPreview.baseTokens.toLocaleString()} {displayTicker}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#04060C]/75 font-medium">
                  Pipo Vault Bonus (+{clamped.buyBonusRate}%):
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#97FCE4] text-[#04060C] font-mono-label font-extrabold">
                  +{sampleBuyPreview.bonusTokens.toLocaleString()}{' '}
                  {displayTicker}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#04060C]/75 font-medium">
                  Holder Auto-Payout Currency:
                </span>
                <span className="font-mono-label font-bold text-[#04060C]">
                  {clamped.holderPayoutRate}% Paid in {pairSymbol}
                </span>
              </div>
              <div className="flex justify-between pt-2.5 border-t border-[#C2E8E2] text-sm">
                <span className="font-extrabold text-[#04060C]">
                  Buyer Total Received:
                </span>
                <span className="font-mono-label font-extrabold text-[#04060C]">
                  {sampleBuyPreview.totalReceived.toLocaleString()}{' '}
                  {displayTicker}
                </span>
              </div>
            </div>

            <PipoBoosterSVG
              className="w-full h-32"
              extraCount={`+${sampleBuyPreview.bonusTokens.toLocaleString()} ${displayTicker}`}
            />

            <div className="mt-3 flex items-center gap-2 text-[11px] font-mono-label text-[#04060C]/80 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-[#04060C] shrink-0" />
              <span>
                Oracle verified via {activePairInfo.oracleFeedName} ($
                {activePairInfo.oraclePriceUsd.toLocaleString()})
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
