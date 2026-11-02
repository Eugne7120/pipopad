# PipoPad UI/UX Design System & Architecture

## 1. Design Direction
PipoPad combines a structured Web3 token marketplace architecture (persistent left sidebar, compact topbar, horizontal trending ticker, two-column hero with live bonus preview, compact statistics strip, interactive featured showcase, and 3-column image-first token cards) with PipoPad's Positive-Entry protocol identity on Robinhood Chain.

## 2. Color Tokens
| Token | Hex | Role |
| --- | --- | --- |
| `--color-bg` | `#090A0D` | Primary application background and media containers |
| `--color-surface` | `#151619` | Secondary card and sidebar/ticker surfaces |
| `--color-surface-raised` | `#1B1C1F` | Elevated interactive and active selection surfaces |
| `--color-text` | `#F5F6F7` | Primary UI text and headings |
| `--color-text-muted` | `#969BA3` | Supporting copy, descriptions, and labels |
| `--color-accent` | `#38FF16` | Primary lime green for CTAs, buy bonuses, and positive metrics |
| `--color-lavender` | `#A894E5` | Secondary lavender for holder payouts and reward streams |
| `--color-line` | `#292B30` | Subtle 1px structural borders and dividers |

## 3. Typography
- **Primary UI Font (`--font-display`, `--font-body`)**: `Inter` for headings, navigation, buttons, token names, and key metrics.
- **Technical Monospace (`--font-mono`)**: `JetBrains Mono` reserved strictly for contract addresses, token symbols, metric eyebrows, timestamps, and tabular numbers.

## 4. Component Architecture
- **Global Shell (`src/components/Navbar.tsx`)**:
  - `Sidebar`: Persistent 252px desktop sidebar (`Explore`, `Create Token`, `Portfolio`, `Rewards`, `Activity`, `PIPO Burn`, `How It Works`) with subtle active states and Robinhood Chain network telemetry.
  - `Topbar`: Compact 64px header with global token search, Robinhood Chain status indicator, wallet connection control, and primary `Create Token` button.
  - `TrendingTicker`: 72px horizontal auto-scrolling ticker showing official token artwork, ticker, 24h change, buy bonus badge, and real-data SVG sparklines (`MiniPriceSparklineSVG`).
- **Explore Marketplace (`src/components/ExploreView.tsx`)**:
  - `HeroSection` + `BonusPreview`: Two-column opening communicating `"Buy with a bonus. Hold for payouts."` paired with a live interactive Buy Bonus & Holder Payout calculator powered by `calculateSwapBuyQuote`.
  - `ProtocolStats`: Compact 4-column horizontal strip displaying `Total Bonus Credited`, explicit per-asset `Total Holder Payouts` (`USDG`, `ETH`, `RWA`), `Active Vaults`, and `PIPO Burned`.
  - `FeaturedLaunches`: Two-column interactive showcase pairing a large active token showcase card (`FeaturedTokenCard`) with a 5-row selectable launch list (`FeaturedTokenSelector`).
  - `Discover Tokens`: Segmented sort controls (`Trending`, `New Launches`, `Highest Bonus`, `Top Holder Payouts`, `Market Cap`), pair category chips (`All Pairs`, `USDG/ETH`, `Tokenized Assets`, `Custom Pairs`), Grid/List view toggle, and 3-column image-first token cards (`TokenCard`).

## 5. Responsive Breakpoints
- `1920px / 1440px` (Desktop): Persistent 252px left sidebar, 2-column Hero & Featured Launches, 3-column Discover grid.
- `1024px / 768px` (Tablet): Collapsible navigation drawer, 2-column Discover grid.
- `375px` (Mobile): Accessible slide-down navigation drawer, stacked Hero and Featured Launches, 1-column Discover grid, horizontal scroll-snap filter bars with zero page overflow.
