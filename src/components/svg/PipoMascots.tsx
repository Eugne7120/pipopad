import React from 'react';
import { PairAssetSymbol } from '../../types/pipo';

/**
 * Official Robinhood Feather Brandmark SVG (Simple Icons official path)
 */
export const RobinhoodLogoSVG: React.FC<{ className?: string }> = ({
  className = 'w-4 h-4',
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M2.84 24h.53c.096 0 .192-.048.224-.128C7.591 13.696 11.94 8.656 14.67 5.638c.112-.128.064-.225-.096-.225h-4.88a.55.55 0 0 0-.45.225L5.746 9.972c-.514.642-.642 1.236-.642 2.086v4.43c-1.14 3.194-1.862 5.361-2.392 7.32-.032.125.016.192.129.192M20.447.646c-.754-.802-4.157-.834-5.73-.224a3 3 0 0 0-.786.465 41 41 0 0 0-3.323 3.178c-.112.113-.064.225.097.225h5.409c.497 0 .786.289.786.786v6.1c0 .16.128.208.225.064l3.258-4.254c.53-.69.69-.898.835-1.861.192-1.413.08-3.58-.77-4.479m-6.982 16.18 2.231-3.676a.7.7 0 0 0 .064-.29V6.73c0-.16-.112-.225-.224-.097-3.355 3.74-5.971 7.672-8.395 12.407-.06.12.016.225.16.177l5.009-1.54c.565-.174.882-.402 1.155-.852"
      fill="#97FCE4"
    />
  </svg>
);

/**
 * Official X (Twitter) Brandmark SVG (Simple Icons official path)
 */
export const XBrandLogoSVG: React.FC<{ className?: string }> = ({
  className = 'w-4 h-4',
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
      fill="currentColor"
    />
  </svg>
);

/**
 * Compact Tactical Courier Owl Head SVG for Navbar & Tiles
 */
export const PipoLogoSVG: React.FC<{ className?: string }> = ({
  className = 'w-7 h-7',
}) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M10 14L22 20H42L54 14L50 32C50 45.2548 41.9411 54 32 54C22.0589 54 14 45.2548 14 32L10 14Z"
      fill="#04060C"
      stroke="#F5FEFD"
      strokeWidth="3"
      strokeLinejoin="round"
    />
    <rect
      x="16"
      y="24"
      width="32"
      height="13"
      rx="6.5"
      fill="#97FCE4"
      stroke="#04060C"
      strokeWidth="2.5"
    />
    <circle cx="24" cy="30.5" r="2.5" fill="#04060C" />
    <circle cx="40" cy="30.5" r="2.5" fill="#04060C" />
    <rect x="29" y="29.5" width="6" height="2" rx="1" fill="#04060C" />
    <path d="M28 39H36L32 46L28 39Z" fill="#F5FEFD" />
  </svg>
);

/**
 * Official Multi-Pair & Stock Asset Brand Logos:
 * - USDG: Official Global Dollar Network (globaldollar.com) vector logo
 * - ETH: Official Ethereum Foundation crystal logo (cryptocurrency-icons)
 * - xNVDA: Official NVIDIA eye spiral logo (Simple Icons)
 * - xTSLA: Official Tesla "T" shield logo (Simple Icons)
 * - xGOLD: Official PAX Gold (PAXG) tokenized gold bullion logo (cryptocurrency-icons)
 * - $SOL / SOL-W: Official Solana 3-bar chevron logo (Simple Icons)
 * - wBTC: Official Wrapped Bitcoin (WBTC) logo (cryptocurrency-icons)
 * - $PUMP: Official Pump.fun diagonal green/white capsule logo
 * - $MEME: Official Dogecoin (DOGE) emblem (cryptocurrency-icons)
 */
export const PairBadgeIconSVG: React.FC<{
  symbol: PairAssetSymbol;
  className?: string;
}> = ({ symbol, className = 'w-4 h-4' }) => {
  switch (symbol) {
    case 'USDG':
      return (
        <svg
          viewBox="0 0 543 543"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-label="Global Dollar USDG Official Logo"
        >
          <circle cx="271.5" cy="271.5" r="271.5" fill="#0F3933" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M541.77 291.659c-10.486 140.147-127.517 250.595-270.346 250.595-149.73 0-271.11-121.38-271.11-271.11 0-149.73 121.38-271.11 271.11-271.11 142.595 0 259.478 110.087 270.294 249.908H412.1c28.295-62.544 30.007-119.369-.936-145.333-45.696-38.343-145.302 5.134-222.478 97.108-77.176 91.975-102.696 197.618-57 235.961 45.695 38.343 145.302-5.134 222.478-97.108 13.452-16.031 25.334-32.478 35.544-48.911H541.77Z"
            fill="#97FCE4"
          />
          <path
            d="M291.787 291.659h108.414l-41.865 54.833-66.549-26.719v-28.114Z"
            fill="#F5FEFD"
          />
        </svg>
      );

    case 'ETH':
      return (
        <svg
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-label="Ethereum Official Logo"
        >
          <g fill="none" fillRule="evenodd">
            <circle cx="16" cy="16" r="16" fill="#627EEA" />
            <g fill="#FFF" fillRule="nonzero">
              <path fillOpacity=".602" d="M16.498 4v8.87l7.497 3.35z" />
              <path d="M16.498 4L9 16.22l7.498-3.35z" />
              <path fillOpacity=".602" d="M16.498 21.968v6.027L24 17.616z" />
              <path d="M16.498 27.995v-6.028L9 17.616z" />
              <path
                fillOpacity=".2"
                d="M16.498 20.573l7.497-4.353-7.497-3.348z"
              />
              <path fillOpacity=".602" d="M9 16.22l7.498 4.353v-7.701z" />
            </g>
          </g>
        </svg>
      );

    case 'xNVDA':
      return (
        <svg
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-label="NVIDIA Official Brand Logo"
        >
          <circle cx="16" cy="16" r="16" fill="#04060C" />
          <g transform="translate(4, 4)">
            <path
              fill="#76B900"
              d="M8.948 8.798v-1.43a6.7 6.7 0 0 1 .424-.018c3.922-.124 6.493 3.374 6.493 3.374s-2.774 3.851-5.75 3.851c-.398 0-.787-.062-1.158-.185v-4.346c1.528.185 1.837.857 2.747 2.385l2.04-1.714s-1.492-1.952-4-1.952a6.016 6.016 0 0 0-.796.035m0-4.735v2.138l.424-.027c5.45-.185 9.01 4.47 9.01 4.47s-4.08 4.964-8.33 4.964c-.37 0-.733-.035-1.095-.097v1.325c.3.035.61.062.91.062 3.957 0 6.82-2.023 9.593-4.408.459.371 2.34 1.263 2.73 1.652-2.633 2.208-8.772 3.984-12.253 3.984-.335 0-.653-.018-.971-.053v1.864H24V4.063zm0 10.326v1.131c-3.657-.654-4.673-4.46-4.673-4.46s1.758-1.944 4.673-2.262v1.237H8.94c-1.528-.186-2.73 1.245-2.73 1.245s.68 2.412 2.739 3.11M2.456 10.9s2.164-3.197 6.5-3.533V6.201C4.153 6.59 0 10.653 0 10.653s2.35 6.802 8.948 7.42v-1.237c-4.84-.6-6.492-5.936-6.492-5.936z"
            />
          </g>
        </svg>
      );

    case 'xTSLA':
      return (
        <svg
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-label="Tesla Official Brand Logo"
        >
          <circle cx="16" cy="16" r="16" fill="#E82127" />
          <g transform="translate(5.5, 5.5) scale(0.875)">
            <path
              fill="#FFFFFF"
              d="M12 5.362l2.475-3.026s4.245.09 8.471 2.054c-1.082 1.636-3.231 2.438-3.231 2.438-.146-1.439-1.154-1.79-4.354-1.79L12 24 8.619 5.034c-3.18 0-4.188.354-4.335 1.792 0 0-2.146-.795-3.229-2.43C5.28 2.431 9.525 2.34 9.525 2.34L12 5.362l-.004.002H12v-.002zm0-3.899c3.415-.03 7.326.528 11.328 2.28.535-.968.672-1.395.672-1.395C19.625.612 15.528.015 12 0 8.472.015 4.375.61 0 2.349c0 0 .195.525.672 1.396C4.674 1.989 8.585 1.435 12 1.46v.003z"
            />
          </g>
        </svg>
      );

    case 'xGOLD':
      return (
        <svg
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-label="PAX Gold xGOLD Official Logo"
        >
          <g fill="none">
            <circle fill="#E4CE4D" cx="16" cy="16" r="16" />
            <path
              d="M18.603 6.912c1.738 1.227 3.548 1.364 5.863 1.79 2.106.391 2.553 2.542 1.591 5.28a9.384 9.384 0 00-.18-.292l.18.292-.017.045.017-.045c1.467 2.492 1.456 5.191-1.719 6.572-5.653 2.46-5.99 7.305-11.333 4.697A6.71 6.71 0 0111 23.74l-.208-.237-.193-.033c-3.586-.635-5.94-2.579-3.762-7.539 1.927-4.383.206-8.696 6.116-8.504h.002c1.628-1.527 3.505-2.024 5.647-.515zm-5.507 4.432c-2.478 1.779-3.294 5.092-1.644 7.665a5.493 5.493 0 007.62 1.655c2.558-1.66 2.908-4.88 1.644-7.667-1.295-2.857-4.85-3.642-7.62-1.653z"
              fill="#04060C"
            />
          </g>
        </svg>
      );

    case '$SOL':
    case 'SOL-W':
      return (
        <svg
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-label="Solana Official Logo"
        >
          <circle cx="16" cy="16" r="16" fill="#04060C" />
          <g transform="translate(5, 5) scale(0.916)">
            <path
              fill="#14F195"
              d="m23.8764 18.0313-3.962 4.1393a.9201.9201 0 0 1-.306.2106.9407.9407 0 0 1-.367.0742H.4599a.4689.4689 0 0 1-.2522-.0733.4513.4513 0 0 1-.1696-.1962.4375.4375 0 0 1-.0314-.2545.4438.4438 0 0 1 .117-.2298l3.9649-4.1393a.92.92 0 0 1 .3052-.2102.9407.9407 0 0 1 .3658-.0746H23.54a.4692.4692 0 0 1 .2523.0734.4531.4531 0 0 1 .1697.196.438.438 0 0 1 .0313.2547.4442.4442 0 0 1-.1169.2297z"
            />
            <path
              fill="#00C2FF"
              d="m19.9144 9.6958a.9202.9202 0 0 0-.306-.2106.941.941 0 0 0-.367-.0742H.4599a.4687.4687 0 0 0-.2522.0734.4513.4513 0 0 0-.1696.1961.4376.4376 0 0 0-.0314.2546.444.444 0 0 0 .117.2297l3.9649 4.1394a.9204.9204 0 0 0 .3052.2102c.1154.049.24.0744.3658.0746H23.54a.469.469 0 0 0 .2523-.0734.453.453 0 0 0 .1697-.1961.4382.4382 0 0 0 .0313-.2546.4444.4444 0 0 0-.1169-.2297z"
            />
            <path
              fill="#9945FF"
              d="M.46 6.7225h18.7815a.9411.9411 0 0 0 .367-.0742.9202.9202 0 0 0 .306-.2106l3.962-4.1394a.4442.4442 0 0 0 .117-.2297.4378.4378 0 0 0-.0314-.2546.453.453 0 0 0-.1697-.196.469.469 0 0 0-.2523-.0734H4.7596a.941.941 0 0 0-.3658.0745.9203.9203 0 0 0-.3052.2102L.1246 5.9687a.4438.4438 0 0 0-.1169.2295.4375.4375 0 0 0 .0312.2544.4512.4512 0 0 0 .1692.196.4689.4689 0 0 0 .2518.0739z"
            />
          </g>
        </svg>
      );

    case 'wBTC':
      return (
        <svg
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-label="Wrapped Bitcoin wBTC Official Logo"
        >
          <g fill="none">
            <circle fill="#201A2D" cx="16" cy="16" r="16" />
            <g fill="#F7931A">
              <path d="M22.818 9.586l-.6.6a8.494 8.494 0 010 11.464l.6.6a9.352 9.352 0 000-12.678v.014zM10.2 9.638a8.494 8.494 0 0111.464 0l.6-.6a9.352 9.352 0 00-12.678 0l.614.6zm-.562 12.018a8.494 8.494 0 010-11.458l-.6-.6a9.352 9.352 0 000 12.678l.6-.62zm12.018.554a8.494 8.494 0 01-11.464 0l-.6.6a9.352 9.352 0 0012.678 0l-.614-.6z" />
            </g>
            <path
              fill="#FFFFFF"
              d="M19.732 13.924c-.12-1.252-1.2-1.672-2.566-1.8V10.4h-1.056v1.692h-.844V10.4H14.2v1.736h-2.142v1.13s.78-.014.768 0a.546.546 0 01.6.464v4.752a.37.37 0 01-.128.258.366.366 0 01-.272.092c.014.012-.768 0-.768 0l-.2 1.262h2.122v1.764h1.056V20.12h.844v1.73h1.058v-1.744c1.784-.108 3.028-.548 3.184-2.218.126-1.344-.506-1.944-1.516-2.186.614-.302.994-.862.908-1.778zm-1.48 3.756c0 1.312-2.248 1.162-2.964 1.162v-2.328c.716.002 2.964-.204 2.964 1.166zm-.49-3.28c0 1.2-1.876 1.054-2.472 1.054v-2.116c.596 0 2.472-.188 2.472 1.062z"
            />
          </g>
        </svg>
      );

    case '$PUMP':
      return (
        <svg
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-label="Pump.fun Official Capsule Logo"
        >
          <circle cx="256" cy="256" r="256" fill="#04060C" />
          <g transform="rotate(-45 256 256)">
            <rect
              x="146"
              y="76"
              width="220"
              height="360"
              rx="110"
              fill="#0F3933"
            />
            <path
              d="M158 256H354V186C354 131.876 310.124 88 256 88C201.876 88 158 131.876 158 186V256Z"
              fill="#F5FEFD"
            />
            <path
              d="M158 256H354V326C354 380.124 310.124 424 256 424C201.876 424 158 380.124 158 326V256Z"
              fill="#97FCE4"
            />
          </g>
        </svg>
      );

    case '$MEME':
      return (
        <svg
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-label="Dogecoin Official Logo"
        >
          <g fill="none" fillRule="evenodd">
            <circle cx="16" cy="16" r="16" fill="#C3A634" />
            <path
              fill="#FFF"
              d="M13.248 14.61h4.314v2.286h-4.314v4.818h2.721c1.077 0 1.958-.145 2.644-.437.686-.291 1.224-.694 1.615-1.21a4.4 4.4 0 00.796-1.815 11.4 11.4 0 00.21-2.252 11.4 11.4 0 00-.21-2.252 4.396 4.396 0 00-.796-1.815c-.391-.516-.93-.919-1.615-1.21-.686-.292-1.567-.437-2.644-.437h-2.721v4.325zm-2.766 2.286H9v-2.285h1.482V8h6.549c1.21 0 2.257.21 3.142.627.885.419 1.607.99 2.168 1.715.56.724.977 1.572 1.25 2.543.273.971.409 2.01.409 3.115a11.47 11.47 0 01-.41 3.115c-.272.97-.689 1.819-1.25 2.543-.56.725-1.282 1.296-2.167 1.715-.885.418-1.933.627-3.142.627h-6.549v-7.104z"
            />
          </g>
        </svg>
      );
  }
};

/**
 * Renders the Token Avatar with its Official Brand / Pair SVG Logo
 */
export const TokenAvatarWithOfficialLogo: React.FC<{
  ticker: string;
  pairSymbol: PairAssetSymbol;
  avatarBg: string;
  avatarLabel: string;
  logoUrl?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}> = ({ ticker, pairSymbol, avatarBg, logoUrl, size = 'md' }) => {
  const boxClass =
    size === 'xl'
      ? 'w-20 h-20 rounded-[22px]'
      : size === 'lg'
      ? 'w-14 h-14 rounded-2xl'
      : size === 'sm'
      ? 'w-9 h-9 rounded-xl'
      : 'w-11 h-11 rounded-2xl';
  const subBadgeClass =
    size === 'xl'
      ? 'w-7 h-7 -bottom-1 -right-1'
      : size === 'lg'
      ? 'w-5 h-5 -bottom-1 -right-1'
      : size === 'sm'
      ? 'w-4 h-4 -bottom-0.5 -right-0.5'
      : 'w-5 h-5 -bottom-1 -right-1';

  return (
    <div className={`relative ${boxClass} shrink-0`}>
      <div
        style={{ backgroundColor: logoUrl ? '#04060C' : avatarBg }}
        className="w-full h-full rounded-[inherit] flex items-center justify-center border border-[#0F3933] overflow-hidden"
      >
        {logoUrl ? (
          <img
            src={logoUrl}
            alt={`${ticker} logo`}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        ) : ticker === '$PIPO' || ticker === '$OWL' ? (
          <div className="w-full h-full p-2 flex items-center justify-center">
            <PipoLogoSVG className="w-full h-full" />
          </div>
        ) : ticker === '$RHOOD' ? (
          <div className="w-full h-full bg-[#04060C] flex items-center justify-center p-2">
            <RobinhoodLogoSVG className="w-full h-full" />
          </div>
        ) : (
          <div className="w-full h-full p-1.5 flex items-center justify-center">
            <PairBadgeIconSVG symbol={pairSymbol} className="w-full h-full" />
          </div>
        )}
      </div>
      {/* Corner Official Pair Asset Mini-Logo */}
      <div
        className={`absolute ${subBadgeClass} rounded-full bg-[#04060C] p-0.5 border border-[#0F3933] flex items-center justify-center`}
      >
        <PairBadgeIconSVG symbol={pairSymbol} className="w-full h-full" />
      </div>
    </div>
  );
};

/**
 * Minimal real-data SVG Sparkline for Trending Ticker, Featured Showcase, and Image-First Token Cards
 */
export const MiniPriceSparklineSVG: React.FC<{
  data: number[];
  isPositive?: boolean;
  className?: string;
}> = ({ data, isPositive = true, className = 'w-16 h-7' }) => {
  if (!data || data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 0.0001;
  const width = 88;
  const height = 28;
  const points = data
    .map((v, idx) => {
      const x = (idx / (data.length - 1)) * (width - 6) + 3;
      const y = height - 4 - ((v - min) / range) * (height - 8);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <polyline
        fill="none"
        stroke={isPositive ? '#97FCE4' : '#FF6868'}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
};

/**
 * 1. PipoBoosterSVG: Pipo mencetak struk tiket bertuliskan +EXTRA TOKENS
 */
export const PipoBoosterSVG: React.FC<{
  className?: string;
  extraCount?: string;
}> = ({ className = 'w-full h-44', extraCount = '+500 EXTRA' }) => (
  <svg
    viewBox="0 0 360 170"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Pipo Tactical Courier Owl printing +EXTRA TOKENS receipt"
  >
    <rect
      x="8"
      y="14"
      width="344"
      height="142"
      rx="24"
      fill="#04060C"
      stroke="#0F3933"
      strokeWidth="2"
    />
    <line x1="175" y1="14" x2="175" y2="156" stroke="#0F3933" strokeWidth="1.5" />
    <line x1="8" y1="85" x2="175" y2="85" stroke="#0F3933" strokeWidth="1.5" />

    <g transform="translate(30, 24)">
      <rect
        x="4"
        y="44"
        width="26"
        height="54"
        rx="8"
        fill="#0F3933"
        stroke="#97FCE4"
        strokeWidth="2"
      />
      <circle cx="17" cy="70" r="6" fill="#97FCE4" />
      <rect
        x="24"
        y="36"
        width="68"
        height="74"
        rx="26"
        fill="#F5FEFD"
        stroke="#04060C"
        strokeWidth="3"
      />
      <rect x="42" y="72" width="32" height="24" rx="6" fill="#04060C" />
      <path d="M53 84H63M58 79V89" stroke="#97FCE4" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M24 30L38 40H78L92 30L86 52H30L24 30Z" fill="#F5FEFD" />
      <rect
        x="30"
        y="40"
        width="56"
        height="22"
        rx="11"
        fill="#97FCE4"
        stroke="#04060C"
        strokeWidth="3"
      />
      <circle cx="45" cy="51" r="4" fill="#04060C" />
      <circle cx="71" cy="51" r="4" fill="#04060C" />
      <path d="M53 64H63L58 71L53 64Z" fill="#04060C" />
    </g>

    <g transform="translate(192, 26)">
      <rect x="0" y="6" width="144" height="14" rx="7" fill="#0F3933" />
      <path
        d="M12 13H132V106L122 99L112 106L102 99L92 106L82 99L72 106L62 99L52 106L42 99L32 106L22 99L12 106V13Z"
        fill="#F5FEFD"
      />
      <text
        x="24"
        y="36"
        fill="#04060C"
        fontFamily="JetBrains Mono, monospace"
        fontSize="9"
        fontWeight="700"
        letterSpacing="1"
      >
        PIPO VAULT RECEIPT
      </text>
      <line x1="22" y1="44" x2="122" y2="44" stroke="#0F3933" strokeWidth="1.5" strokeDasharray="3 3" />
      <rect x="22" y="54" width="100" height="28" rx="8" fill="#97FCE4" stroke="#04060C" strokeWidth="2" />
      <text
        x="72"
        y="72"
        textAnchor="middle"
        fill="#04060C"
        fontFamily="JetBrains Mono, monospace"
        fontSize="11"
        fontWeight="700"
      >
        {extraCount}
      </text>
      <text
        x="72"
        y="94"
        textAnchor="middle"
        fill="#04060C"
        fontFamily="Inter, sans-serif"
        fontSize="8.5"
        fontWeight="700"
      >
        +EXTRA TOKENS CREDITED
      </text>
    </g>
  </svg>
);

/**
 * 2. PipoVaultSVG: Pipo menjaga brankas kunci Locked Treasury yang menyedot fee dari penjual (sellers)
 */
export const PipoVaultSVG: React.FC<{ className?: string }> = ({
  className = 'w-full h-48',
}) => (
  <svg
    viewBox="0 0 420 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Pipo guarding the self-refilling Locked Treasury Vault"
  >
    <rect x="10" y="12" width="400" height="156" rx="24" fill="#04060C" stroke="#0F3933" strokeWidth="2" />
    <g transform="translate(26, 48)">
      <rect x="0" y="0" width="104" height="36" rx="10" fill="#0F3933" stroke="#97FCE4" strokeWidth="1.5" />
      <text x="12" y="16" fill="#F5FEFD" fontFamily="JetBrains Mono, monospace" fontSize="8" fontWeight="600">
        SELLER FEE INFLOW
      </text>
      <text x="12" y="28" fill="#97FCE4" fontFamily="JetBrains Mono, monospace" fontSize="11" fontWeight="700">
        2% - 9% REFILL
      </text>
      <path d="M110 18H146" stroke="#97FCE4" strokeWidth="2.5" strokeDasharray="4 4" />
      <path d="M140 12L148 18L140 24" stroke="#97FCE4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

      <rect x="0" y="50" width="104" height="36" rx="10" fill="#0F3933" stroke="#F5FEFD" strokeWidth="1.5" />
      <text x="12" y="66" fill="#97FCE4" fontFamily="JetBrains Mono, monospace" fontSize="8" fontWeight="600">
        IMMUTABLE LOCK
      </text>
      <text x="12" y="78" fill="#F5FEFD" fontFamily="JetBrains Mono, monospace" fontSize="10" fontWeight="700">
        7%+ GENESIS SUPPLY
      </text>
    </g>

    <g transform="translate(182, 26)">
      <rect
        x="0"
        y="0"
        width="128"
        height="128"
        rx="28"
        fill="#F5FEFD"
        stroke="#04060C"
        strokeWidth="3"
      />
      <rect x="14" y="14" width="100" height="100" rx="20" fill="#04060C" />
      <circle cx="64" cy="64" r="30" fill="#0F3933" stroke="#97FCE4" strokeWidth="3" />
      <circle cx="64" cy="64" r="10" fill="#97FCE4" />
      <line x1="64" y1="34" x2="64" y2="94" stroke="#97FCE4" strokeWidth="3" />
      <line x1="34" y1="64" x2="94" y2="64" stroke="#97FCE4" strokeWidth="3" />
    </g>

    <g transform="translate(324, 46)">
      <rect x="6" y="18" width="60" height="72" rx="22" fill="#97FCE4" />
      <rect x="14" y="28" width="44" height="16" rx="8" fill="#04060C" />
      <circle cx="26" cy="36" r="3" fill="#97FCE4" />
      <circle cx="46" cy="36" r="3" fill="#97FCE4" />
      <path d="M32 48H40L36 55L32 48Z" fill="#04060C" />
      <rect x="18" y="62" width="36" height="16" rx="5" fill="#04060C" />
      <text x="36" y="73" textAnchor="middle" fill="#97FCE4" fontFamily="JetBrains Mono, monospace" fontSize="8" fontWeight="700">
        GUARDED
      </text>
    </g>
  </svg>
);

/**
 * 3. PipoCourierSVG: Pipo membawa koin ETH, USDG, dan xNVDA dengan logo resmi & lencana multiplier 1x, 1.5x, 2x
 */
export const PipoCourierSVG: React.FC<{ className?: string }> = ({
  className = 'w-full h-48',
}) => (
  <svg
    viewBox="0 0 420 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Pipo Courier delivering official ETH, USDG, and NVIDIA RWA payouts with 1x, 1.5x, and 2x hold multipliers"
  >
    <rect x="10" y="12" width="400" height="156" rx="24" fill="#04060C" stroke="#0F3933" strokeWidth="2" />

    {/* Courier Pipo Owl in Center-Left */}
    <g transform="translate(26, 30)">
      <rect x="10" y="20" width="76" height="96" rx="28" fill="#0F3933" stroke="#97FCE4" strokeWidth="1.5" />
      <rect x="20" y="34" width="56" height="20" rx="10" fill="#04060C" />
      <circle cx="35" cy="44" r="4" fill="#97FCE4" />
      <circle cx="61" cy="44" r="4" fill="#97FCE4" />
      <path d="M44 58H52L48 66L44 58Z" fill="#F5FEFD" />
      <rect x="22" y="74" width="52" height="28" rx="8" fill="#F5FEFD" stroke="#04060C" strokeWidth="2" />
      <text x="48" y="92" textAnchor="middle" fill="#04060C" fontFamily="JetBrains Mono, monospace" fontSize="9" fontWeight="700">
        AUTO-DROP
      </text>
    </g>

    {/* Official Coins: USDG, ETH, xNVDA */}
    <g transform="translate(128, 28)">
      {/* Official USDG Global Dollar Coin */}
      <g transform="translate(8, 8) scale(0.095)">
        <circle cx="271.5" cy="271.5" r="271.5" fill="#0F3933" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M541.77 291.659c-10.486 140.147-127.517 250.595-270.346 250.595-149.73 0-271.11-121.38-271.11-271.11 0-149.73 121.38-271.11 271.11-271.11 142.595 0 259.478 110.087 270.294 249.908H412.1c28.295-62.544 30.007-119.369-.936-145.333-45.696-38.343-145.302 5.134-222.478 97.108-77.176 91.975-102.696 197.618-57 235.961 45.695 38.343 145.302-5.134 222.478-97.108 13.452-16.031 25.334-32.478 35.544-48.911H541.77Z"
          fill="#97FCE4"
        />
        <path
          d="M291.787 291.659h108.414l-41.865 54.833-66.549-26.719v-28.114Z"
          fill="#F5FEFD"
        />
      </g>

      {/* Official Ethereum Coin */}
      <g transform="translate(70, 8) scale(1.62)">
        <circle cx="16" cy="16" r="16" fill="#627EEA" />
        <g fill="#FFF" fillRule="nonzero">
          <path fillOpacity=".602" d="M16.498 4v8.87l7.497 3.35z" />
          <path d="M16.498 4L9 16.22l7.498-3.35z" />
          <path fillOpacity=".602" d="M16.498 21.968v6.027L24 17.616z" />
          <path d="M16.498 27.995v-6.028L9 17.616z" />
          <path fillOpacity=".2" d="M16.498 20.573l7.497-4.353-7.497-3.348z" />
          <path fillOpacity=".602" d="M9 16.22l7.498 4.353v-7.701z" />
        </g>
      </g>

      {/* Official NVIDIA RWA Coin */}
      <g transform="translate(132, 8) scale(1.62)">
        <circle cx="16" cy="16" r="16" fill="#0F3933" />
        <g transform="translate(4, 4)">
          <path
            fill="#76B900"
            d="M8.948 8.798v-1.43a6.7 6.7 0 0 1 .424-.018c3.922-.124 6.493 3.374 6.493 3.374s-2.774 3.851-5.75 3.851c-.398 0-.787-.062-1.158-.185v-4.346c1.528.185 1.837.857 2.747 2.385l2.04-1.714s-1.492-1.952-4-1.952a6.016 6.016 0 0 0-.796.035m0-4.735v2.138l.424-.027c5.45-.185 9.01 4.47 9.01 4.47s-4.08 4.964-8.33 4.964c-.37 0-.733-.035-1.095-.097v1.325c.3.035.61.062.91.062 3.957 0 6.82-2.023 9.593-4.408.459.371 2.34 1.263 2.73 1.652-2.633 2.208-8.772 3.984-12.253 3.984-.335 0-.653-.018-.971-.053v1.864H24V4.063zm0 10.326v1.131c-3.657-.654-4.673-4.46-4.673-4.46s1.758-1.944 4.673-2.262v1.237H8.94c-1.528-.186-2.73 1.245-2.73 1.245s.68 2.412 2.739 3.11M2.456 10.9s2.164-3.197 6.5-3.533V6.201C4.153 6.59 0 10.653 0 10.653s2.35 6.802 8.948 7.42v-1.237c-4.84-.6-6.492-5.936-6.492-5.936z"
          />
        </g>
      </g>

      {/* Hold Duration Multiplier Pills */}
      <rect x="8" y="82" width="74" height="32" rx="16" fill="#04060C" stroke="#0F3933" strokeWidth="1.5" />
      <text x="45" y="102" textAnchor="middle" fill="#F5FEFD" fontFamily="JetBrains Mono, monospace" fontSize="11" fontWeight="700">
        1x (0-3d)
      </text>

      <rect x="90" y="82" width="82" height="32" rx="16" fill="#0F3933" stroke="#97FCE4" strokeWidth="1.5" />
      <text x="131" y="102" textAnchor="middle" fill="#F5FEFD" fontFamily="JetBrains Mono, monospace" fontSize="11" fontWeight="700">
        1.5x (3-7d)
      </text>

      <rect x="180" y="82" width="90" height="32" rx="16" fill="#97FCE4" />
      <text x="225" y="102" textAnchor="middle" fill="#04060C" fontFamily="JetBrains Mono, monospace" fontSize="11" fontWeight="700">
        2x (7d+ MAX)
      </text>

      <text x="195" y="34" fill="#F5FEFD" fontFamily="JetBrains Mono, monospace" fontSize="9.5" fontWeight="700">
        USDG · ETH · RWA
      </text>
      <text x="195" y="48" fill="#97FCE4" fontFamily="JetBrains Mono, monospace" fontSize="8.5" fontWeight="600">
        ZERO CLAIMING
      </text>
    </g>
  </svg>
);

/**
 * 4. PipoShieldSVG: Pipo mengaktifkan radar anti-bot 10 detik pertama (99% Snipe Tax decay)
 */
export const PipoShieldSVG: React.FC<{ className?: string }> = ({
  className = 'w-full h-48',
}) => (
  <svg
    viewBox="0 0 420 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Pipo activating 10-second Anti-Snipe Shield with 99% decaying bot tax"
  >
    <rect x="10" y="12" width="400" height="156" rx="24" fill="#04060C" stroke="#0F3933" strokeWidth="2" />

    <g transform="translate(95, 90)">
      <circle cx="0" cy="0" r="56" stroke="#97FCE4" strokeWidth="1.5" strokeDasharray="4 4" />
      <circle cx="0" cy="0" r="38" stroke="#97FCE4" strokeWidth="1.5" />
      <circle cx="0" cy="0" r="18" fill="#97FCE4" />
      <text x="0" y="4" textAnchor="middle" fill="#04060C" fontFamily="JetBrains Mono, monospace" fontSize="10" fontWeight="800">
        99%
      </text>
      <line x1="0" y1="0" x2="42" y2="-36" stroke="#97FCE4" strokeWidth="3" strokeLinecap="round" />
      <circle cx="34" cy="-28" r="5" fill="#FF6868" />
    </g>

    <g transform="translate(185, 34)">
      <text x="0" y="12" fill="#97FCE4" fontFamily="JetBrains Mono, monospace" fontSize="10" fontWeight="700">
        10s BOT TAX DECAY -&gt; VAULT
      </text>
      {[
        { label: '0s', h: 72, pct: '99%', color: '#97FCE4' },
        { label: '2s', h: 52, pct: '50%', color: '#97FCE4' },
        { label: '4s', h: 34, pct: '25%', color: '#0F3933' },
        { label: '7s', h: 20, pct: '10%', color: '#0F3933' },
        { label: '10s', h: 8, pct: '0%', color: '#F5FEFD' },
      ].map((bar, idx) => (
        <g key={bar.label} transform={`translate(${idx * 42}, 26)`}>
          <rect
            x="0"
            y={76 - bar.h}
            width="28"
            height={bar.h}
            rx="6"
            fill={bar.color}
          />
          <text
            x="14"
            y={70 - bar.h}
            textAnchor="middle"
            fill="#F5FEFD"
            fontFamily="JetBrains Mono, monospace"
            fontSize="8.5"
            fontWeight="700"
          >
            {bar.pct}
          </text>
          <text
            x="14"
            y="92"
            textAnchor="middle"
            fill="#89B0A9"
            fontFamily="JetBrains Mono, monospace"
            fontSize="8.5"
            fontWeight="600"
          >
            {bar.label}
          </text>
        </g>
      ))}
    </g>
  </svg>
);
