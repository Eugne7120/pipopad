# NEON EDITORIAL OS
## Design System & UX Architecture Specification

**Versi:** 1.0  
**Format:** Referensi implementasi untuk website, landing page, dashboard, dan dApp Web3  
**Basis visual:** Analisis empat screenshot situs Hexncoin yang diberikan pengguna pada 30 Oktober 2026  
**Nama sistem desain:** **Neon Editorial OS**  
**Klasifikasi:** Swiss Editorial Tech UI + Neo-Grotesk Typography + Soft Brutalist Composition + Bento-Grid Product UI

> Dokumen ini merekonstruksi prinsip desain dari referensi visual. Nilai piksel dan warna merupakan estimasi/pengambilan sampel screenshot, bukan ekstraksi resmi source code. Font asli, perilaku animasi, dan interaksi yang tidak terlihat belum terverifikasi. Gunakan token dalam dokumen ini sebagai spesifikasi implementasi, bukan klaim identitas teknis website asli.

---

## 01. Design Thesis

Desain harus terasa seperti produk teknologi finansial yang editorial, presisi, jelas, dan berani. Fokus utama adalah informasi, bukan dekorasi. Identitas terbentuk lewat lima mekanisme:

1. **Oversized neo-grotesk typography.** Headline besar, rapat, solid, dan mudah dipindai.
2. **Dark canvas + acid-green accent.** Hitam arang menjadi panggung untuk konten dan CTA hijau terang.
3. **Bento-grid storytelling.** Informasi kompleks dibagi menjadi panel modular dengan ukuran berbeda.
4. **Rounded geometric surfaces.** Card besar dengan rounded corners ekstrem, border tipis, dan hampir tanpa shadow.
5. **Task-first UX.** Pengunjung diarahkan dari tujuan, lalu alat, kemudian aksi. Bukan sekadar diberikan daftar fitur.

Kata kunci visual: `editorial`, `high contrast`, `neo-grotesk`, `modular`, `precise`, `dense typography`, `generous space`, `soft-brutalist`, `product-led`, `minimal interactive`.

Bukan: glassmorphism generik, cyberpunk, panel HUD, wireframe acak, neon glow yang menyilaukan, 3D coin realistis, dashboard penuh widget kecil, atau kartu identik berulang tanpa hierarki.

### 01.1 Nama gaya yang paling tepat

**Istilah utama: Swiss Editorial Tech UI.** Menggabungkan prinsip Swiss/International Typographic Style (grid terstruktur, hierarchy, sans-serif), editorial web design (headline berskala besar, whitespace), dan SaaS/fintech interface yang modular.

**Istilah pendamping: Soft Neo-Brutalism.** Berlaku pada bold typography, kontras ekstrem, warna yang tidak malu tampil, dan bentuk grafis eksplisit. Tidak sama dengan neo-brutalism klasik yang memakai border hitam tebal, offset hard shadows, dan bentuk sengaja kasar. Referensi ini lebih rapi, halus, serta premium.

**Bento Grid UI** menjelaskan cara konten dikomposisi, bukan keseluruhan gaya visual.

**OS-style Product Architecture** menggambarkan struktur informasi dan UX berupa koleksi aplikasi, tools, network, dan workflows dalam satu workspace.

---

## 02. Design DNA dan prioritas

| Aspek | Prinsip | Tingkat prioritas |
| --- | --- | --- |
| Tipografi | Display headline menjadi hero utama | Sangat tinggi |
| Grid | Layout modular, asimetris, tetap sejajar | Sangat tinggi |
| Warna | Dark foundation, white/off-white contrast, acid green | Sangat tinggi |
| Hierarki | One headline, one support message, one primary CTA | Sangat tinggi |
| Komponen | Rounded surface dan hairline border | Tinggi |
| UX | Explore by task, apps, tools, network | Sangat tinggi |
| Visual | Kartu dengan komposisi grafis solid | Sedang |
| Animasi | Terarah, tidak merusak keterbacaan | Sedang |
| Decorative 3D | Aksen terbatas pada konteks yang relevan | Rendah |

Rasio visual yang disarankan untuk halaman landing adalah sekitar 70% ruang gelap, 20% panel terang/netral, dan 10% aksen terang/warna. Ini panduan komposisi, bukan rumus kaku.

---

## 03. Color System

### 03.1 Core palette

Nilai utama berikut merujuk pada sampel warna screenshot.

| Token | HEX | Fungsi |
| --- | --- | --- |
| `--color-bg` | `#161616` | Background utama website |
| `--color-bg-deep` | `#101010` | Background card gelap dan hero kontras |
| `--color-surface` | `#1C1C1C` | Surface card dark yang terangkat secara tonal |
| `--color-surface-raised` | `#222222` | State hover atau elevated surface |
| `--color-accent` | `#39FF14` | CTA utama, panel informasi prioritas, active state |
| `--color-accent-hover` | `#55FF36` | Hover accent |
| `--color-paper` | `#FAF7F6` | Surface terang gaya editorial |
| `--color-paper-muted` | `#F1EEED` | Subcard pada panel terang |
| `--color-lavender` | `#9F8BE7` | Panel alternatif untuk keseimbangan komposisi |
| `--color-text` | `#FFFFFF` | Teks utama di dark background |
| `--color-text-ink` | `#151515` | Teks utama di light/lavender/green surface |
| `--color-text-muted` | `#A4A4A4` | Body sekunder di dark surface |
| `--color-text-subtle` | `#777777` | Metadata, dengan cek kontras khusus |
| `--color-line` | `#2D2D2D` | Divider dan stroke dark mode |
| `--color-line-light` | `#D2CECD` | Divider di panel terang |

Kontras: pada panel hijau, gunakan teks nyaris hitam. Pada panel lavender, gunakan teks hitam. Jangan gunakan teks hijau terang pada background putih.

### 03.2 Color usage rules

- Dasar halaman dark charcoal, bukan true black di semua elemen.
- Gunakan true black/near black untuk memberi variasi tonal.
- Hijau tidak boleh mengisi semua kartu. Jadikan warna orientasi dan aksi.
- Lavender berfungsi sebagai pemisah cerita, bukan warna CTA utama.
- Off-white dipakai untuk satu kontainer editorial besar yang memberi jeda dari dark canvas.
- Hindari gradient default. Kalau diperlukan, sangat halus dan terbatas pada visual dekoratif, bukan semua surface.
- Batasi satu warna aksen primer per project. Accent dari referensi ini dapat diganti melalui theme token.

### 03.3 State colors

`success: #39FF14`, `warning: #FFBE55`, `error: #FF6868`, `info: #9F8BE7`. Untuk badge status, kurangi intensitas dengan background tonal dan teks berkontras cukup.

---

## 04. Typography System

### 04.1 Pengamatan visual

Font di screenshot bersifat **neo-grotesk sans-serif**: bentuk geometris-natural, x-height besar, counter terbuka, display sangat rapat, dan huruf tebal dengan bentuk sederhana. Tidak dapat diidentifikasi secara pasti hanya dari gambar.

**Rekomendasi implementasi:** `Inter Tight` untuk display, `Inter` atau `Geist` untuk body/navigation, serta `IBM Plex Mono` atau `JetBrains Mono` untuk micro-label. Alternatif satu keluarga: `Geist` untuk semua teks dan `Geist Mono` untuk metadata.

Jangan mengklaim ini sebagai font resmi Hexncoin tanpa inspeksi CSS/font asli.

### 04.2 Type scale

| Peran | Desktop | Mobile | Weight | Tracking | Line-height |
| --- | --- | --- | --- | --- | --- |
| Hero XL | `clamp(68px, 7.8vw, 148px)` | `clamp(48px, 12vw, 76px)` | 750–850 | `-0.065em` | 0.88–0.96 |
| Hero L | `clamp(58px, 6.2vw, 112px)` | `clamp(42px, 10vw, 64px)` | 750–850 | `-0.06em` | 0.93–1.0 |
| Section H2 | `clamp(38px, 4.8vw, 72px)` | `clamp(32px, 8vw, 48px)` | 650–800 | `-0.055em` | 0.98–1.05 |
| Card H3 | `clamp(30px, 3vw, 52px)` | `clamp(26px, 6vw, 38px)` | 650–800 | `-0.05em` | 1.0–1.08 |
| Feature H4 | 23–32px | 21–26px | 600–750 | `-0.035em` | 1.08–1.2 |
| Body L | 18–20px | 16–18px | 400–500 | `-0.01em` | 1.45–1.6 |
| Body | 14–16px | 14–16px | 400–500 | `0` | 1.45–1.65 |
| Nav | 14–15px | 14–15px | 600–700 | `-0.015em` | 1.25 |
| Button | 13–15px | 13–15px | 600–700 | `-0.015em` | 1.2 |
| Eyebrow | 10–11px | 10–11px | 600–700 | `0.14em` | 1.25 |
| Micro-label | 9–11px | 10–11px | 600–700 | `0.12em` | 1.25 |

### 04.3 Rules

- Gunakan `text-wrap: balance` pada judul besar, dengan pengaturan pemenggalan manual bila diperlukan.
- Hero harus terlihat besar, tapi kalimat penting tidak boleh terpotong pada viewport kecil.
- Hindari pemenggalan per kata yang membentuk kolom panjang pada card kecil.
- Satu hero biasanya hanya memiliki satu H1.
- Kontras antara ukuran headline dan body harus besar. Jangan membuat semua teks berukuran menengah.
- H1/h2 display boleh memakai tracking negatif yang agresif. Jangan terapkan tracking negatif ini pada body atau label mikro.
- Heading tebal, body relatif ringan, metadata tipis dan terstruktur.

---

## 05. Page Grid, Spacing, dan Container

### 05.1 Global canvas

Contoh screenshot desktop berada sekitar 1900px lebar. Konten tampak memakai gutter sekitar 40–52px dan navbar horizontal sekitar 20px dari sisi viewport. Implementasi harus fluid, bukan hard-coded untuk 1900px.

```css
.page-shell {
  width: min(100% - 80px, 1800px);
  margin-inline: auto;
}

@media (max-width: 1024px) {
  .page-shell { width: calc(100% - 48px); }
}

@media (max-width: 640px) {
  .page-shell { width: calc(100% - 32px); }
}
```

### 05.2 Grid hierarchy

- **Hero split:** sekitar 55–60% untuk headline, 40–45% untuk deskripsi dan CTA.
- **Primary bento:** 70–74% panel fitur utama, 26–30% stack informasi kanan.
- **Index directory:** empat kolom desktop, dua tablet, satu mobile.
- **Feature steps:** empat item horizontal di desktop, dua kali dua di tablet, scroll-snap/stack pada mobile.
- **Content maximum:** rekomendasi 1600–1800px untuk layar ultrawide, tergantung kepadatan informasi.

### 05.3 Spacing scale

| Token | Nilai |
| --- | --- |
| `--space-1` | 4px |
| `--space-2` | 8px |
| `--space-3` | 12px |
| `--space-4` | 16px |
| `--space-5` | 20px |
| `--space-6` | 24px |
| `--space-8` | 32px |
| `--space-10` | 40px |
| `--space-12` | 48px |
| `--space-16` | 64px |
| `--space-20` | 80px |
| `--space-24` | 96px |
| `--space-32` | 128px |

Spacing makro harus terasa lapang. Screenshot menunjukkan area kosong cukup luas antara beberapa kelompok konten. Jangan memadati semua ruang.

---

## 06. Shape, Border, Shadow, Surface

### 06.1 Radius tokens

| Token | Desktop | Usage |
| --- | --- | --- |
| `--radius-sm` | 10px | Tag, mini tile |
| `--radius-md` | 16px | Tool icon, input, icon tile |
| `--radius-lg` | 24px | Small feature card |
| `--radius-xl` | 32px | Medium card |
| `--radius-2xl` | 44px | Feature card |
| `--radius-3xl` | 56px | Hero bento / editorial panel |
| `--radius-pill` | 999px | Navbar, CTA, status chip |

Pada mobile, turunkan radius hero card ke 24–32px agar tidak menghabiskan ruang berguna.

### 06.2 Borders

- Lebar umum 1px, kontras rendah (`#2D2D2D` dark, `#D2CECD` light).
- Banyak elemen dipisahkan dengan hairline divider, bukan bayangan.
- Di daftar link, divider horizontal memberi ritme dan affordance yang konsisten.
- Hindari border tebal pada semua komponen.

### 06.3 Shadows

- Surface utama hampir flat. Shadow hanya untuk floating illustrations/icons dan popover.
- Rekomendasi floating icon: `0 14px 45px rgba(0,0,0,.20)` yang lembut.
- Jangan pakai glow hijau pada card dan CTA secara serentak.

---

## 07. Navigation System

### 07.1 Desktop floating pill navbar

Screenshot menampilkan navbar horizontal berbentuk pill, fixed/sticky, berwarna dark translucent-solid, dengan border tipis. Struktur:

`[brand mark + wordmark]` di kiri, kemudian `Apps | Tools | Learn | Releases | theme button | Buy token | Open the OS` di kanan.

Spesifikasi implementasi:

- Position: sticky/fixed near top dengan `top: 12px` sampai `20px`.
- Outer horizontal margin: 16–24px.
- Height: 52–60px.
- Background: `rgba(20,20,20,0.94)`.
- Border: `1px solid #303030`.
- Border radius: 999px.
- Nav gap: 24–36px desktop.
- Brand: white compact symbol + bold wordmark.
- Action buttons: hijau terang, teks nyaris hitam, minimum touch target 44px.
- Saat scroll, nav mempertahankan kontras tanpa menutup heading yang menjadi target anchor.

### 07.2 Behavior

- Navbar dapat sticky saat scroll.
- Item aktif tampil melalui perubahan tonal atau underline yang halus, bukan glow.
- Anchor section memakai `scroll-margin-top: 100px` atau lebih sesuai tinggi navbar.
- Theme switch harus mengubah tema seluruh sistem, bukan hanya ikon.
- CTA utama membuka aplikasi atau aksi yang nyata. CTA sekunder memberi jalur penelusuran.

### 07.3 Mobile

- Navbar compact: brand, primary CTA, menu trigger.
- Menu lain masuk ke bottom-sheet/full-height drawer yang bisa ditutup.
- Jangan memaksakan tujuh item desktop ke baris mobile.
- Drawer memakai background solid dan navigasi berlabel jelas.

---

## 08. Hero Systems

Referensi mengandung **tiga varian hero** yang sama-sama sah. Gunakan salah satu sesuai halaman, bukan ketiganya sekaligus.

### 08.1 Type A: Editorial Split Hero

Terlihat pada screenshot headline "The Financial Operating System for on-chain markets".

**Layout:**

- H1 massive di kiri (sekitar 55–60% lebar).
- Label eyebrow kecil di atas.
- Right-side copy menempati kolom 35–40%, ditempatkan lebih rendah sehingga berpasangan dengan garis akhir headline.
- CTA utama accent green, CTA sekunder outlined dark.
- Area bawah langsung memperlihatkan awal bento features.

**Gunakan untuk:** produk kompleks yang membutuhkan positioning singkat dan CTA dua jalur.

### 08.2 Type B: Giant Brand/Release Hero

Terlihat pada panel "Hexncoin" kiri dan kartu hijau dengan versi "2.7.7" kanan.

**Layout:**

- Split dua kartu raksasa 60/40 atau 62/38.
- Kartu kiri dark menampilkan brand display berukuran ekstra besar, deskripsi, dan metadata chips.
- Kartu kanan hijau menampilkan satu angka atau KPI utama pada skala sangat besar dan deretan mini token/network icons.
- Bentuk rounded bottom corners memisahkan dua panel secara tegas.

**Gunakan untuk:** release highlights, product editions, chain coverage, ecosystem metrics.

Jangan gunakan angka statis tanpa konteks. Semua angka KPI harus terhubung ke data nyata atau jelas berstatus demo.

### 08.3 Type C: Kinetic Campaign Hero

Terlihat pada screenshot "On Chain Swap + Operating System".

**Layout:**

- Headline terpusat, ekstra besar, dua baris.
- Satu frasa tampil sebagai pill hijau horizontal yang menyatu dengan tipografi.
- Aksen app/token icon berada di pinggiran hero, sebagian tampak seperti floating tiles.
- Bawah hero menampilkan screenshot produk kecil, deskripsi, CTA, dan data pendukung.

**Gunakan untuk:** campaign landing, product launch, hero komunikasi satu fitur.

**Batas penting:** animasi teks/marquee tidak boleh memotong pesan penting pada keadaan diam. Jika ada marquee, sediakan teks utama yang stabil dan aksesibel. Aset dekoratif jangan menutupi copy utama.

---

## 09. Bento Grid Composition

### 09.1 Primary bento

Komposisi khas referensi:

```text
┌────────────────────────────────────────┬─────────────────┐
│                                        │  LAVENDER       │
│  OFF-WHITE FEATURE / ARCHITECTURE      │  CONTEXT CARD   │
│                                        │                 │
│  Heading + steps + visual workflow     ├─────────────────┤
│                                        │  DARK INSIGHT   │
│  Caption + CTA                         │  CARD           │
└────────────────────────────────────────┴─────────────────┘
```

Pada screenshot, card besar kiri memiliki surface editorial off-white, headline hitam besar, empat tahap, lalu inset visualization panel dengan border. Kolom kanan memiliki panel lavender dan beberapa panel gelap dengan statement pendek.

### 09.2 Pembagian konten

- **Main card:** proses, arsitektur, ilustrasi produk, satu CTA kuat.
- **Side cards:** satu ide per kartu, title tebal, supporting copy maksimal 1–3 kalimat.
- **Inset card:** kanvas ilustrasi sederhana, bukan dashboard penuh elemen dekoratif.
- **Metadata:** label huruf kapital kecil, nomor 01–04, token/network icons.

### 09.3 Card anatomy

```
[eyebrow / category]                         [status or icon]

BIG EDITORIAL
TITLE

[optional mini steps / visual / data]

[hairline divider]
[brief explanatory copy]                       [CTA pill]
```

### 09.4 Asymmetry rules

- Kartu berbeda ukuran, tetapi padding dan alignment menggunakan token yang sama.
- Jangan membuat semua card sama tinggi jika isi tidak sebanding.
- Satu halaman sebaiknya memiliki satu panel yang dominan secara visual.
- Dalam satu row, card kanan boleh stacking untuk mengimbangi card kiri yang panjang.
- Round corners besar harus tetap selaras dengan grid.

---

## 10. Feature Journey: Discover → Inspect → Act → Manage

Screenshot menunjukkan empat langkah yang membentuk model mental pengguna.

| Tahap | Goal user | Fitur/halaman | UX requirement |
| --- | --- | --- | --- |
| 01 Discover | Mencari informasi pasar dan network | Markets, token search, overview | Browse tanpa hambatan login jika data publik |
| 02 Inspect | Menguji dan memahami aset/wallet | Wallet analyzer, token detail, risk check | Tampilkan konteks, sumber, status jaringan |
| 03 Act | Melakukan transaksi on-chain | Swap, bridge, approvals, send | Wallet connect pada saat diperlukan, preview fee/risk, confirm |
| 04 Manage | Mengelola aset dan workspace | Portfolio, history, watchlist | Status, filters, persistence, export sesuai kebutuhan |

Tahapan seharusnya interaktif. Klik tiap tahap mengubah panel visual/contoh konten dan CTA yang relevan. Jika tidak dibuat interaktif, gunakan komposisi statis yang jelas dan hindari indikasi tab palsu.

### 10.1 Public-first UX

Salah satu pesan penting pada screenshot: market research dapat digunakan sebelum wallet connection. Ini prinsip UX yang patut direplikasi:

- Jangan memaksa wallet connect di landing page atau eksplorasi informasi publik.
- Minta wallet hanya sebelum aksi yang memerlukan account/signature.
- Tunjukkan chain dan account aktif dekat aksi.
- Saat wallet berbeda network, tampilkan switch network yang eksplisit.
- Signing harus selalu dikonfirmasi oleh wallet pengguna.
- Data market publik berbeda dari data wallet spesifik pengguna.

### 10.2 Workspace continuity

Dari sebuah insight menuju tindakan, pertahankan konteks token, jaringan, aset, dan pair agar user tidak perlu mengulang pencarian. Gunakan konteks navigasi dan persistence yang aman tanpa mengasumsikan satu wallet kompatibel semua chain.

---

## 11. Product Directory / Footer Index

Referensi menampilkan empat kolom navigasi di atas dark canvas dengan judul besar namun cukup tenang:

- **Explore:** About, Applications, Tools, Learn.
- **Workflows:** Market research, Wallet analysis, On-chain trading, Bridging.
- **Networks:** Solana tools, Ethereum tools, Base tools, Token approvals.
- **Project:** Releases, Token/Buy, Security, Privacy, Release notes.

Gaya visual:

- Batas kolom menggunakan vertical divider tipis.
- Heading setiap kolom warna abu muda dan font lebih ringan daripada heading hero.
- Nomor kecil dengan slash `/ 01` hingga `/ 04` sebagai navigasi editorial.
- Deskripsi mini di bawah heading.
- Link tiap baris memiliki divider horizontal dan arrow northeast kecil.
- Counter badge angka opsional di ujung kanan.

**UX:** seluruh baris harus clickable/focusable, bukan hanya icon arrow. Hover mengubah warna/posisi panah 2–4px dan membuat background subtle jika dibutuhkan. Link navigasi menggunakan tag anchor asli.

---

## 12. Component Specifications

### 12.1 Buttons

**Primary:** solid acid green, black text, pill geometry, no gradient. 44–48px tinggi, padding horizontal 22–28px, font 13–15px semi-bold. Hover darkens/raises minimally; active scales down to 0.985; visible focus ring 2px.

**Secondary:** transparent/dark background, border 1px dark grey, white text, pill. Hover background `#242424`.

**On-light primary:** tetap hijau/gelap sesuai kontras, jangan berubah jadi lavender tanpa alasan.

**Icon only:** lingkaran 44–48px, border tipis, tooltip dan accessible label wajib.

### 12.2 Chips and badges

- Metadata pill 24–32px tinggi.
- Background dark, thin border, number atau icon kecil dengan teks kecil.
- Boleh ada jumlah app, network count, workflows, release version.
- Jika badge hanya dekoratif dan nilainya tidak penting, hapus.

### 12.3 Tool/network icon

- Gunakan ikon resmi network/provider jika ada izin dan tersedia aset resmi.
- Rounded-square tile 28–42px pada daftar, 80–150px pada floating hero.
- Visual besar boleh memakai 2.5D soft depth; jangan semua icon berubah menjadi 3D.
- Logo pihak ketiga harus akurat, tidak dipalsukan, dan mengikuti trademark guidance.

### 12.4 Feature cards

- Padding 28–48px desktop, 20–28px mobile.
- Title bold 30–52px desktop.
- Body 13–16px.
- Radius 32–56px tergantung skala.
- Optional overlay icon pada pojok kanan, opacity rendah jika sebagai background visualization.
- Seluruh konten harus terbaca tanpa hover.

### 12.5 Tab/step navigator

- Empat equal-width panels pada area off-white.
- Base state `#F1EEED`, active state berkontras sedikit lebih kuat, bukan full neon kecuali memang dipakai sebagai fokus.
- Nomor langkah mono label kecil di kiri atas.
- Judul ringkas dan keterangan 1 baris.
- Keyboard navigation dan active indicators jelas.

### 12.6 Link rows

- Height 56–64px desktop, 52px mobile.
- Divider bottom 1px.
- Left aligned label, optional count, right arrow icon.
- Hover: label terang, arrow translate (2px, -2px).

### 12.7 Inset workflow canvas

- Background off-white sedikit lebih gelap.
- Border 1px warna abu muda.
- Radius 24px.
- Illustration center, tidak memerlukan rendering kompleks jika satu SVG telah menjelaskan mekanisme.
- Workflow diagram boleh berisi sistem koneksi, icon, mini card, garis orbit sangat tipis, dan animasi kecil.

### 12.8 Modals, forms, connected wallet

Walau tidak tampak langsung dalam screenshot, turunkan prinsip desain berikut:

- Modal dark/off-white solid, max width 480–720px, radius 24–32px.
- Field 44–52px dengan label persistent, bukan placeholder saja.
- Gunakan wallet transaction preview sebelum confirm.
- Informasi amount, network, slippage/fee, receiving asset, dan risk harus terbaca.
- Error ditampilkan dekat sumber masalah, tidak hanya sebagai toast.
- State async: idle, loading, success, error, disconnected, wrong-network.

---

## 13. Motion & Interaction System

Perilaku gerak tidak dapat dipastikan dari screenshot statis. Aturan berikut adalah usulan implementasi yang selaras dengan bahasa visualnya.

| Interaction | Timing | Easing | Transform |
| --- | --- | --- | --- |
| Hover button | 140–180ms | ease-out | slight color shift, scale 0.99–1.00 |
| Hover link arrow | 160–200ms | ease-out | translate 2–4px |
| Card hover | 180–240ms | cubic-bezier(.2,.8,.2,1) | y -2px max |
| Section entrance | 350–500ms | ease-out | fade + translateY 12–20px |
| Step switch | 220–320ms | ease-in-out | content fade/slide |
| Floating icon | 5–9s loop | ease-in-out | y 4–10px, gentle rotate max 3° |
| Marquee text | 12–24s loop | linear | only noncritical decorative copy |
| Navbar behavior | 180–260ms | ease-out | tonal/background change |

Rules:

- Motion harus menjelaskan hierarchy atau feedback, bukan hanya mempercantik.
- Hindari parallax berat pada setiap section.
- Hindari perpetual motion pada seluruh cards.
- Support `prefers-reduced-motion: reduce`.
- Prioritaskan CSS transform dan opacity agar smooth.
- Pada device mobile low-end, tampilkan versi statis icon floating.

---

## 14. Iconography and Visual Art Direction

### 14.1 Icon family

- UI utility: Lucide atau Phosphor icons, stroke konsisten 1.75–2px.
- Feature illustration: custom SVG berisi bentuk solid tebal, bukan sekadar memperbesar icon outline.
- Network logos: assets asli dan warna brand jika mendukung identifikasi.
- Abstract illustrations: orbit ringan, card stack, rounded blocks, concentric rings, UI component fragments.

### 14.2 Style strategy

- Hero boleh menggunakan 2.5D icon yang tampak tebal, seperti app tile dengan highlight soft.
- Sebagian besar konten tetap 2D/editorial.
- Jangan gunakan coin 3D realistis atau holographic glow.
- Semua ilustrasi harus memberi konteks terhadap fitur.

### 14.3 Card background artwork

Untuk kartu statistik, boleh tempatkan ilustrasi SVG besar di sisi kanan dalam kartu, dengan opacity 8–18%. Jangan menggeser title ke bawah hanya untuk menampung ikon kecil. Variasi ini sesuai identitas editorial yang mengutamakan informasi.

---

## 15. Responsive Design

### 15.1 Breakpoints

| Range | Layout |
| --- | --- |
| `>= 1440px` | Full editorial hero, 12-column conceptual grid, 70/30 bento |
| `1024–1439px` | Hero split ringkas, bento 65/35, navbar lebih padat |
| `768–1023px` | Hero split dengan type scale turun, bento stack atau 2 columns |
| `480–767px` | Single-column hero, cards stacked, navigation collapsed |
| `< 480px` | Compact mobile, headline dibatasi, min 16px gutter |

### 15.2 Mobile adaptation

- Hero h1 harus wrap alami dan tidak overflow.
- Frasa berwarna hijau pada hero harus menjadi inline highlight yang mengikuti lebar viewport, bukan pill fixed width.
- Teks dan visual floating tidak saling tumpang tindih.
- Main bento dan sidebar diubah menjadi stack: konten utama dahulu, context cards berikutnya.
- Four-step rail boleh pakai horizontal scroll-snap dengan visual affordance dan keyboard support.
- Button CTA utama full-width hanya pada mobile jika membantu tapability.
- Ikon provider kecil tetap punya label tekstual.
- Jangan gunakan hover sebagai satu-satunya metode membuka detail.

### 15.3 Density

Untuk dApp/dashboard dengan data rapat, gunakan varian density lebih compact dibanding landing. Jangan menerapkan headline 100px atau radius 56px ke setiap card transaksi.

---

## 16. Information Architecture & UX

### 16.1 Top-level sitemap

```text
Website
├── Home
│   ├── Hero + primary actions
│   ├── Product value / connected workspace
│   ├── Discover / Inspect / Act / Manage
│   ├── Workflow illustration
│   ├── Ecosystem / network context
│   └── Four-column directory
├── Apps
│   ├── App categories
│   ├── Search / filters
│   └── App detail
├── Tools
│   ├── Markets & analytics
│   ├── Wallet research
│   ├── Trading / swap
│   └── Bridge / approvals
├── Workflows
│   ├── Discover
│   ├── Inspect
│   ├── Act
│   └── Manage
├── Networks
│   └── Network-specific tools and status
├── Learn / Docs
├── Releases
└── App workspace
    ├── Account/network state
    ├── Current task
    ├── Transaction preview
    └── Activity / history
```

### 16.2 Entry points

Tiga pintu masuk utama harus terlihat:

1. **Explore by task** untuk orang yang tahu ingin melakukan apa, tetapi belum tahu nama tool.
2. **Browse apps** untuk pengguna yang sudah memahami ekosistem.
3. **Explore networks** untuk pengguna yang memulai dari chain tertentu.

Jangan mencampur semua alat dalam satu dropdown panjang tanpa pengelompokan.

### 16.3 Task-first user flows

**Flow 1, Research to action:** Open home → Discover token → Inspect token/wallet → Select network/asset → Connect wallet if needed → Preview action → Confirm in wallet → Show status/result.

**Flow 2, App discovery:** Open Apps → Filter by goal / network → View feature details → Launch app → Context is preserved.

**Flow 3, Returning account:** Open workspace → Restore safe preferences / recent context → Review network/account → Continue task.

### 16.4 UX principles

- Public data accessible without unnecessary auth.
- Every page answers: where am I, what can I do, what happens next.
- CTA label harus spesifik: `Explore markets`, `Inspect wallet`, `Open swap`, bukan semuanya `Get started`.
- Chain/account always visible on wallet-related actions.
- Error recovery, loading, empty state, and transaction status are first-class UX.
- Context persistence must not store wallet secrets.

---

## 17. Accessibility

- Teks normal dan UI interactive harus memenuhi WCAG AA (umumnya kontras 4.5:1), big text 3:1.
- Komponen fokus memakai outline berkontras tinggi dan terlihat.
- Semua buttons minimum hit area sekitar 44×44px.
- Label icon-only wajib tersedia untuk screen reader.
- Header/navbar memiliki landmark semantic.
- Content order pada mobile tetap masuk akal ketika grid ditumpuk.
- Hindari CSS `overflow:hidden` global yang memotong headline atau form.
- Animasi tidak menyembunyikan informasi utama dan menghormati reduced motion.
- Test keyboard-only dan screen reader pada menu, tabs, dialogs, wallet flows.

---

## 18. Technical Implementation Guidelines

Stack yang cocok bila membangun ulang dari nol:

- React / Next.js, TypeScript.
- Tailwind CSS atau CSS variables + CSS modules.
- Framer Motion/Motion untuk transisi bermakna.
- SVG sebagai format utama ilustrasi 2D dan workflow.
- Sumber tipografi yang legal/self-hosted atau layanan font dengan lisensi yang sesuai.
- Ikon: Lucide atau Phosphor untuk utilitas, aset asli untuk brand/network.
- Optional Three.js/R3F hanya untuk satu visual 3D yang memang berinteraksi, bukan seluruh halaman.

### 18.1 Core CSS tokens

```css
:root {
  --color-bg: #161616;
  --color-bg-deep: #101010;
  --color-surface: #1c1c1c;
  --color-surface-raised: #222222;
  --color-accent: #39ff14;
  --color-accent-hover: #55ff36;
  --color-paper: #faf7f6;
  --color-paper-muted: #f1eeed;
  --color-lavender: #9f8be7;
  --color-text: #ffffff;
  --color-text-ink: #151515;
  --color-text-muted: #a4a4a4;
  --color-line: #2d2d2d;
  --color-line-light: #d2cecd;

  --font-display: 'Inter Tight', 'Geist', Arial, sans-serif;
  --font-body: 'Inter', 'Geist', Arial, sans-serif;
  --font-mono: 'IBM Plex Mono', 'JetBrains Mono', monospace;

  --page-gutter: clamp(16px, 2.5vw, 52px);
  --content-max: 1800px;
  --radius-sm: 10px;
  --radius-md: 16px;
  --radius-lg: 24px;
  --radius-xl: 32px;
  --radius-2xl: 44px;
  --radius-3xl: 56px;
  --radius-pill: 999px;
  --ease-editorial: cubic-bezier(.2, .8, .2, 1);
}

body {
  margin: 0;
  background: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-body);
  -webkit-font-smoothing: antialiased;
}

.display-xl {
  font-family: var(--font-display);
  font-size: clamp(52px, 7.8vw, 148px);
  font-weight: 800;
  letter-spacing: -0.065em;
  line-height: .92;
  text-wrap: balance;
}

.primary-button {
  min-height: 46px;
  padding: 0 25px;
  border: 0;
  border-radius: var(--radius-pill);
  background: var(--color-accent);
  color: var(--color-text-ink);
  font: 700 14px/1 var(--font-body);
  cursor: pointer;
  transition: background 160ms ease-out, transform 160ms ease-out;
}

.primary-button:hover { background: var(--color-accent-hover); }
.primary-button:active { transform: scale(.985); }
.primary-button:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }

.bento-grid {
  display: grid;
  grid-template-columns: minmax(0, 2.6fr) minmax(290px, 1fr);
  gap: 22px;
}

.editorial-card {
  min-width: 0;
  border-radius: var(--radius-3xl);
  padding: clamp(24px, 2.5vw, 48px);
  overflow: clip;
}

@media (max-width: 900px) {
  .bento-grid { grid-template-columns: 1fr; }
  .editorial-card { border-radius: 32px; }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### 18.2 Suggested component tree

```text
src/
├── components/
│   ├── layout/
│   │   ├── SiteNav.tsx
│   │   ├── PageShell.tsx
│   │   ├── FooterDirectory.tsx
│   │   └── MobileNav.tsx
│   ├── editorial/
│   │   ├── HeroSplit.tsx
│   │   ├── HeroRelease.tsx
│   │   ├── HeroKinetic.tsx
│   │   ├── BentoGrid.tsx
│   │   ├── EditorialCard.tsx
│   │   ├── NumberHighlight.tsx
│   │   └── EyebrowLabel.tsx
│   ├── workflow/
│   │   ├── WorkflowSteps.tsx
│   │   ├── WorkflowPreview.tsx
│   │   └── NetworkIconRow.tsx
│   ├── primitives/
│   │   ├── Button.tsx
│   │   ├── IconButton.tsx
│   │   ├── Badge.tsx
│   │   ├── LinkRow.tsx
│   │   ├── Surface.tsx
│   │   ├── Dialog.tsx
│   │   └── Input.tsx
│   └── motion/
│       ├── Reveal.tsx
│       └── FloatingAsset.tsx
├── styles/
│   ├── tokens.css
│   └── globals.css
└── app/
    ├── page.tsx
    ├── apps/
    ├── tools/
    ├── workflows/
    └── workspace/
```

### 18.3 Layering and performance

- Navbar berada di atas content tetapi tidak menghalangi interactive controls.
- Decorative layers `pointer-events: none`.
- Lazy-load large product visuals below fold.
- Hindari lebih dari satu heavy canvas/WebGL scene pada viewport.
- Gunakan image sizes responsif, optimized formats, loading skeleton sederhana.
- Tidak memakai animation library untuk efek yang cukup diselesaikan lewat CSS.

---

## 19. Identifikasi Detail dari Empat Screenshot

### Screenshot A: Giant wordmark + release card + four-column directory

- Top floating pill navigation dengan dua green buttons.
- Section kiri dark gigantic product name, deskripsi, dan tiga metric chips.
- Section kanan full neon-green dengan nomor versi sangat besar.
- Bawahnya jarak kosong besar untuk transisi ke site directory.
- Directory empat kolom, masing-masing punya header, subhead, divider, link row.

**Pelajaran:** tipografi sendiri menjadi aset visual. Data kecil dikomposisi sebagai metadata, bukan dashboard penuh chart.

### Screenshot B: Product overview + bento

- Hero H1 empat baris dengan white bold display.
- Right-aligned description, primary/secondary CTA.
- Card off-white dominan mengisi sekitar 70% baris.
- Kartu lavender kanan menampilkan pesan pendek dengan headline tebal.
- Surface card memakai radius besar dan hampir tak terlihat shadow.

**Pelajaran:** gabungkan halaman editorial dan product UI tanpa kehilangan struktur.

### Screenshot C: Workflow step + centered illustration

- Main panel terang berisi empat step cards: Discover, Inspect, Act, Manage.
- Inset canvas besar dengan mini card bertumpuk, orbit halus, icon row.
- Caption dan CTA pada footer panel.
- Sisi kanan terdiri dari dua kartu dark, masing-masing menyampaikan satu prinsip UX.

**Pelajaran:** alur kerja menjadi narasi utama, bukan hanya katalog fitur.

### Screenshot D: Kinetic on-chain hero

- Typography super besar dan terpusat.
- Pill hijau sebagai bagian dari teks utama.
- Decorative token/app icons tersebar dalam bentuk floating rounded square.
- Screenshot produk sebagai secondary proof di bawah headline.
- Copy singkat dan CTA berada dekat preview produk.

**Pelajaran:** motion dan icon dapat memberi identitas tanpa mengubah fondasi editorial.

---

## 20. Kritik UX dan Perbaikan Saat Diadaptasi

| Temuan | Risiko | Aturan perbaikan |
| --- | --- | --- |
| Headline sangat besar | Bisa overflow atau membuat line break janggal | Batasi max-width dan pakai fluid typography |
| Pill headline yang tampak terpotong | Makna pesan terganggu saat animasi diam | Pastikan copy penuh terlihat pada state statis dan reduced-motion |
| Floating icon cukup besar | Menyaingi perhatian headline | Terapkan batas jumlah icon dan safe zones |
| Side card sempit dengan heading panjang | Text wrap menjadi 5–6 baris yang tidak nyaman | Kurangi size atau ubah wording sesuai card width |
| Nav sticky di atas section saat scrolling | Header section berpotensi tertutup | Pakai scroll-margin dan top padding |
| Metadata kecil dengan muted colors | Sulit dibaca pada layar tertentu | Terapkan kontras dan minimum font size |
| CTA "Buy token" dekat product exploration | Dapat mengalihkan tujuan pengguna baru | Bedakan fungsi platform dari tindakan terkait token |
| Banyak network | User bisa kehilangan network context | Network indicator dan switching feedback yang jelas |

Ini bukan audit fungsional situs asli. Temuan di atas berasal dari visual statis dan merupakan risiko saat implementasi.

---

## 21. Rules for AI Coding Agent

**DO**

1. Mulai dari layout dan hierarki, baru visual dekoratif.
2. Pakai token warna, radius, type scale, dan spacing yang konsisten.
3. Bangun komponen reusable, bukan desain halaman yang terpisah tanpa shared system.
4. Gunakan editorial typography sebagai identitas utama.
5. Pertahankan kontras black/off-white/green dengan komposisi bento asimetris.
6. Tampilkan user journey secara jelas dengan label tugas dan CTA spesifik.
7. Pastikan semua versi responsif, termasuk layar 375px dan 768px.
8. Implementasikan hover, focus, loading, empty, error, dan reduced-motion states.
9. Gunakan ilustrasi SVG/2D sebagai default dan 2.5D terbatas jika membantu.
10. Jaga kegunaan UI dApp meski membawa tampilan landing yang ekspresif.

**DO NOT**

1. Jangan menyalin branding, logo, atau konten Hexncoin secara literal ke project lain.
2. Jangan memakai font oversized untuk label transaksi atau tabel data.
3. Jangan membungkus setiap section di card gelap identik.
4. Jangan memakai glow, grid lines futuristik, random particles, dan wireframe.
5. Jangan membuat CTA terlihat clickable jika tidak berfungsi.
6. Jangan mengutamakan animasi di atas aksesibilitas.
7. Jangan menyembunyikan fungsi inti di belakang hover.
8. Jangan memakai satu giant visual 3D untuk memaksa semua layout menyesuaikan.
9. Jangan menganggap data dummy atau status wallet demo sebagai data nyata.
10. Jangan menghilangkan konteks chain/account pada aksi sensitif.

---

## 22. Acceptance Criteria

Sebuah implementasi memenuhi sistem desain ini jika:

- [ ] Hero jelas dalam 3–5 detik pertama: produk, manfaat, CTA.
- [ ] Headline neo-grotesk besar, rapat, dan tidak overflow di mobile.
- [ ] Navbar pill responsif dengan semua affordance keyboard/mobile.
- [ ] Aksen hijau dipakai hemat tetapi selalu jelas untuk aksi utama.
- [ ] Ada setidaknya satu komposisi bento dengan perbedaan ukuran kartu yang bermakna.
- [ ] Card off-white/lavender/dark mengikuti token dan tidak terasa acak.
- [ ] User bisa memahami jalur Discover → Inspect → Act → Manage.
- [ ] Data publik tidak secara tidak perlu mewajibkan wallet connect.
- [ ] Setiap card memprioritaskan satu informasi.
- [ ] State aktif, hover, focus, loading, empty, dan error ditangani.
- [ ] 320–375px, 768px, 1024px, 1440px, dan 1900px diperiksa.
- [ ] `prefers-reduced-motion` didukung.
- [ ] Visual icons/logos yang dipakai benar dan berizin.
- [ ] Semua links dan CTA menuju tujuan yang valid.
- [ ] Tidak ada scroll horizontal yang tidak dimaksudkan.
- [ ] Project mempertahankan brand sendiri, meski menggunakan sistem visual referensi.

---

## 23. One-Paragraph Design Prompt

> Build a premium, responsive Web3 financial operating system interface using the **Neon Editorial OS** design system. Combine oversized neo-grotesk typography, an organized Swiss editorial grid, deep charcoal surfaces, acid-green action accents, large warm off-white panels, occasional soft lavender bento cards, thin dividers, generous whitespace, extreme rounded card corners, and clean pill navigation. Use asymmetric product-led bento composition and clear task-first navigation. Motion must be subtle and purposeful. Prioritize accessibility, mobile responsiveness, transaction context, and functional interactions. Avoid generic cyberpunk, glowing tech lines, excessive gradients, glassmorphism, repetitive tiny dashboard cards, and ornamental 3D. Follow `DESIGN.md` tokens, layout ratios, responsive behavior, and component rules precisely.

---

**End of NEON EDITORIAL OS Design System v1.0**
