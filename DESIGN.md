---
name: ARCHITECT.OS
description: >
  A futuristic, terminal-inspired dark dashboard that frames a personal portfolio
  of deep-learning, data-science, and web-engineering projects as a "neural
  operations console." Glass-morphism surfaces float over a near-black indigo
  background lit by cyan and magenta nebulae. The mood is calm, technical, and
  cinematic — somewhere between a sci-fi HUD, a Material 3 expressive theme,
  and an editorial product showcase.

theme: dark-only
color_scheme: dark
density: comfortable
language: en
text_direction: ltr

color_palette:
  # ── Backgrounds & surfaces ──
  background:                "#0d0b21"   # deep indigo-black, page canvas
  surface:                   "#0d0b21"
  surface_dim:               "#0d0b21"
  surface_bright:            "#2b284a"
  surface_container_lowest:  "#000000"
  surface_container_low:     "#121029"
  surface_container:         "#191631"
  surface_container_high:    "#1e1c39"
  surface_container_highest: "#252242"
  surface_variant:           "#252242"
  inverse_surface:           "#fcf8ff"

  # ── Foreground / text ──
  on_background:             "#e7e2ff"   # primary body text (cool lavender white)
  on_surface:                "#e7e2ff"
  on_surface_variant:        "#aca8c5"   # secondary / supporting text
  outline:                   "#76728e"
  outline_variant:           "#48455e"
  inverse_on_surface:        "#55526c"

  # ── Brand: Primary (cyan) ──
  primary:                   "#c1fffe"   # icy cyan tint, used as surface tint & highlights
  primary_dim:               "#00e6e6"
  primary_container:         "#00ffff"
  primary_fixed:             "#00f5f5"   # the signature cyan
  primary_fixed_dim:         "#00e6e6"
  on_primary:                "#006767"
  on_primary_container:      "#005d5d"
  on_primary_fixed:          "#004343"
  on_primary_fixed_variant:  "#006262"
  inverse_primary:           "#006a6a"
  surface_tint:              "#c1fffe"

  # ── Brand: Secondary (fuchsia) ──
  secondary:                 "#ff51fa"   # the signature magenta
  secondary_dim:             "#ff51fa"
  secondary_fixed:           "#ffbdf3"
  secondary_fixed_dim:       "#ffa6f3"
  on_secondary:              "#400040"
  on_secondary_container:    "#fff5f9"
  on_secondary_fixed:        "#620061"
  on_secondary_fixed_variant: "#920091"

  # ── Brand: Tertiary (violet) ──
  tertiary:                  "#a68cff"   # used in headline gradients
  tertiary_dim:              "#7e51ff"
  tertiary_container:        "#7c4dff"
  tertiary_fixed:            "#b8a3ff"
  tertiary_fixed_dim:        "#ab93ff"
  on_tertiary:               "#25006b"
  on_tertiary_container:     "#ffffff"
  on_tertiary_fixed:         "#1c0055"
  on_tertiary_fixed_variant: "#4000ad"

  # ── Status: Error ──
  error:                     "#ff6e84"
  error_dim:                 "#d73357"
  error_container:           "#a70138"
  on_error:                  "#490013"
  on_error_container:        "#ffb2b9"

  # ── Functional alpha tints (used directly throughout the UI) ──
  primary_tint_05:           "rgba(0, 245, 245, 0.05)"
  primary_tint_08:           "rgba(0, 245, 245, 0.08)"
  primary_tint_12:           "rgba(0, 245, 245, 0.12)"
  primary_tint_20:           "rgba(0, 245, 245, 0.20)"
  primary_tint_30:           "rgba(0, 245, 245, 0.30)"
  primary_tint_40:           "rgba(0, 245, 245, 0.40)"
  secondary_tint_05:         "rgba(255, 81, 250, 0.05)"
  secondary_tint_08:         "rgba(255, 81, 250, 0.08)"
  secondary_tint_12:         "rgba(255, 81, 250, 0.12)"
  secondary_tint_20:         "rgba(255, 81, 250, 0.20)"
  secondary_tint_30:         "rgba(255, 81, 250, 0.30)"
  glass_fill_panel:          "rgba(37, 34, 66, 0.50)"
  glass_fill_panel_soft:     "rgba(37, 34, 66, 0.45)"
  glass_fill_chip:           "rgba(37, 34, 66, 0.55)"
  glass_border:              "rgba(72, 69, 94, 0.20)"
  glass_border_soft:         "rgba(72, 69, 94, 0.18)"
  glass_border_strong:       "rgba(72, 69, 94, 0.30)"
  navbar_scrolled_fill:      "rgba(13, 11, 33, 0.85)"
  hairline_white_05:         "rgba(255, 255, 255, 0.05)"

gradients:
  # Headline gradient — cyan → violet → magenta, the brand's "signature"
  signature_text:
    direction: 135deg
    stops:
      - { color: "#00f5f5", position: 0% }
      - { color: "#a68cff", position: 50% }
      - { color: "#ff51fa", position: 100% }
  # Solid cyan CTA gradient (subtle)
  cta_cyan:
    direction: 135deg
    stops:
      - { color: "#00f5f5", position: 0% }
      - { color: "#00e6e6", position: 100% }
  # Card-icon plate (deep indigo well that the icon glyph floats inside)
  card_plate:
    direction: 135deg
    stops:
      - { color: "rgba(30, 28, 57, 0.90)",  position: 0% }
      - { color: "rgba(18, 16, 41, 0.95)",  position: 100% }
  # Hero / detail vignette — fades the artwork into the background at the edges
  hero_vignette:
    type: radial
    description: >
      Three stacked radial gradients — a cool cyan glow at center,
      a warm magenta wash, and a near-black falloff that grounds the canvas.
    layers:
      - "radial-gradient(ellipse at 50% 40%, rgba(0,245,245,0.08) 0%, transparent 50%)"
      - "radial-gradient(ellipse at 50% 50%, rgba(255,81,250,0.04) 0%, transparent 45%)"
      - "radial-gradient(ellipse at 50% 50%, rgba(13,11,33,0) 30%, rgba(13,11,33,0.7) 70%, rgba(13,11,33,0.95) 100%)"
  # Page-level ambient nebula painted on <body>
  body_ambient:
    type: radial
    layers:
      - "radial-gradient(circle at 20% 30%, rgba(0,245,245,0.08) 0%, transparent 40%)"
      - "radial-gradient(circle at 80% 70%, rgba(255,81,250,0.08) 0%, transparent 40%)"

typography:
  font_families:
    headline:
      stack: ["Plus Jakarta Sans", "sans-serif"]
      weights: [200, 300, 400, 500, 600, 700, 800]
      source: "Google Fonts"
      role: Display + section headings; tight tracking, extrabold by default
    body:
      stack: ["Inter", "sans-serif"]
      weights: [300, 400, 500, 600]
      source: "Google Fonts"
      role: Paragraphs, descriptions, supporting copy
    label:
      stack: ["Inter", "sans-serif"]
      weights: [400, 500, 600]
      role: Eyebrow tags, breadcrumbs, coordinates, KPI captions
    icon:
      stack: ["Material Symbols Outlined"]
      source: "Google Fonts (variable)"
      variation_settings:
        FILL: 0   # outlined by default; cards switch to FILL 1 for glyph plate
        wght: 300
        GRAD: 0
        opsz: 24
    mono:
      stack: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "monospace"]
      role: Code blocks inside project-detail panels (rendered cyan-200/80)

  type_scale:
    # name → { size, line_height, weight, letter_spacing, family, casing }
    display_xl:
      size: "clamp(2.6rem, 6vw, 4.2rem)"   # hero headline
      line_height: 1.05
      weight: 800
      letter_spacing: "-0.01em"
      family: headline
    display_lg:
      size: "3rem"      # 48px — category & detail H2
      line_height: 1.1
      weight: 800
      letter_spacing: "-0.02em"   # tracking-tighter
      family: headline
    display_md:
      size: "2.25rem"   # 36px — "Neural Portfolios"
      line_height: 1.15
      weight: 800
      family: headline
    h1:
      size: "3rem"      # detail page title
      line_height: 1.1
      weight: 800
      letter_spacing: "-0.02em"
      family: headline
    h2:
      size: "1.875rem"  # 30px — panel titles
      line_height: 1.2
      weight: 700
      family: headline
    h3:
      size: "1.5rem"    # 24px — card titles (large)
      line_height: 1.25
      weight: 700
      family: headline
    h4:
      size: "1.125rem"  # 18px — card titles (compact grid)
      line_height: 1.3
      weight: 700
      family: headline
    body_lg:
      size: "1.25rem"   # 20px — category subtitle
      line_height: 1.6
      weight: 300
      family: body
    body_md:
      size: "1rem"      # 16px — paragraph default
      line_height: 1.65
      weight: 400
      family: body
    body_sm:
      size: "0.875rem"  # 14px — card description
      line_height: 1.6
      weight: 400
      family: body
    body_xs:
      size: "0.75rem"   # 12px — supporting copy in cards
      line_height: 1.55
      weight: 400
      family: body
    label_md:
      size: "0.75rem"   # 12px — nav links
      line_height: 1
      weight: 700
      letter_spacing: "0.15em"
      casing: uppercase
      family: label
    label_sm:
      size: "0.625rem"  # 10px — tags, eyebrows, KPI captions
      line_height: 1
      weight: 700
      letter_spacing: "0.20em"
      casing: uppercase
      family: label
    code:
      size: "0.875rem"
      line_height: 1.6
      weight: 400
      family: mono

  rendering:
    antialiased: true
    smoothing: subpixel-off
    body_default_color: on_surface
    headings_default_color: on_surface
    secondary_text_color: on_surface_variant
    accent_text_color: primary_fixed_dim   # cyan when text needs to "speak"

spacing:
  unit: 4px              # Tailwind default scale
  scale:
    "0":   "0"
    "0.5": "2px"
    "1":   "4px"
    "1.5": "6px"
    "2":   "8px"
    "3":   "12px"
    "4":   "16px"
    "5":   "20px"
    "6":   "24px"
    "8":   "32px"
    "10":  "40px"
    "12":  "48px"
    "16":  "64px"
    "20":  "80px"
  page:
    max_width: "80rem"          # 1280px (max-w-7xl)
    detail_max_width: "72rem"   # 1152px (max-w-6xl)
    gutter_inline: "32px"       # px-8
    section_block: "80px"       # py-20

layout:
  grid:
    columns: 12
    gap: "32px"                 # gap-8 in detail layouts
    card_grid_gap: "24px"       # gap-6 in landing card grid
    breakpoints:
      sm:  "640px"
      md:  "768px"
      lg:  "1024px"
      xl:  "1280px"
      "2xl": "1536px"
  navbar:
    height: "80px"              # h-20
    behavior: "fixed top, transparent until scrollY > 40px, then frosted"
    transition_ms: 500
  sections:
    hero_height: "100vh"
    detail_hero_height: "400px"
    card_image_height: "176px"  # h-44 (landing)
    category_card_image_height: "192px"  # h-48
    detail_icon_glyph_size: "12rem"

radii:
  none:    "0"
  sm:      "0.25rem"   # 4px — tiny chips/tag pills
  md:      "0.5rem"    # 8px — inputs (rare)
  default: "1rem"      # 16px — buttons, cards, panels
  lg:      "2rem"      # 32px — hero / detail outer
  xl:      "3rem"      # 48px — oversized feature surfaces
  full:    "9999px"    # pill CTAs, status dots, eyebrow chips
  notes:
    default_role: "Cards, glass panels, code blocks, nav chips"
    full_role: "Primary CTA buttons, eyebrow tags, animated status dots"

elevation:
  # The system reads elevation as light, not as drop shadow under a card.
  # Surfaces float on the dark canvas and are lit by colored glows.
  scale:
    flat:
      role: "Page background, hero canvas"
      shadow: "none"
    raised:
      role: "Glass cards & panels"
      shadow: "inset 0 0 0 1px rgba(72,69,94,0.18)"   # hairline border, no drop
    interactive_hover:
      role: "Card on hover"
      shadow:
        - "0 20px 50px -20px rgba(0,245,245,0.30)"     # cyan halo
        - "0 20px 50px -20px rgba(255,81,250,0.20)"    # magenta halo (alt cards)
    overlay:
      role: "Sticky / scrolled navbar"
      shadow: "0 1px 0 0 rgba(72,69,94,0.15)"         # hairline base only
    modal:
      role: "Detail hero panel"
      shadow: "0 25px 50px -12px rgba(0,0,0,0.50)"    # shadow-2xl
  glows:
    neon_primary:        "0 0 20px -5px rgba(0,245,245,0.30)"
    neon_primary_hover:  "0 0 20px -5px rgba(0,245,245,0.40)"
    neon_secondary:      "0 0 20px -5px rgba(255,81,250,0.30)"
    glow_cyan:           "0 0 40px -15px rgba(0,245,245,0.30)"
    glow_fuchsia:        "0 0 40px -15px rgba(255,81,250,0.20)"
    cta_cyan_halo:       "0 0 30px -8px rgba(0,245,245,0.40)"

shadows:
  # Box-shadow tokens (neutral, used sparingly — color glows do most of the work)
  none: "none"
  hairline:    "inset 0 0 0 1px rgba(72,69,94,0.18)"
  hairline_lg: "inset 0 0 0 1px rgba(72,69,94,0.30)"
  card_lift:   "0 20px 50px -20px rgba(0,0,0,0.50)"
  modal:       "0 25px 50px -12px rgba(0,0,0,0.50)"

borders:
  hairline:        "1px solid rgba(72, 69, 94, 0.18)"
  hairline_strong: "1px solid rgba(72, 69, 94, 0.30)"
  primary_soft:    "1px solid rgba(0, 245, 245, 0.20)"
  secondary_soft:  "1px solid rgba(255, 81, 250, 0.20)"
  divider_inline:  "1px solid rgba(255, 255, 255, 0.05)"
  navbar_scrolled: "1px solid rgba(72, 69, 94, 0.15)"

blur:
  # Backdrop-filter blur values used for glass-morphism
  chip:          "12px"
  panel_soft:    "20px"
  panel:         "24px"
  navbar:        "24px"
  sidebar:       "40px"

motion:
  easing:
    standard:    "cubic-bezier(0.4, 0, 0.2, 1)"     # ease-in-out (default)
    decelerate:  "cubic-bezier(0.0, 0, 0.2, 1)"
    accelerate:  "cubic-bezier(0.4, 0, 1, 1)"
  duration:
    instant:  "100ms"
    fast:     "200ms"
    base:     "300ms"
    slow:     "500ms"
    slower:   "700ms"
  patterns:
    card_hover:
      properties: ["transform", "box-shadow"]
      transform: "translateY(-8px) scale(1.00)"
      duration: slow
      easing: standard
    cta_hover:
      properties: ["transform"]
      transform: "scale(1.05)"
      duration: base
      easing: standard
    icon_glyph_hover:
      properties: ["color", "transform", "opacity"]
      transform: "scale(1.10)"
      duration: slow
      easing: standard
    nav_scroll:
      properties: ["background", "backdrop-filter", "border-bottom"]
      duration: slow
      easing: standard
    breadcrumb_chevron_advance:
      properties: ["transform"]
      transform: "translateX(4px)"
      duration: base
      easing: standard
    cta_sheen:
      description: >
        White diagonal sheen swept across primary CTA on hover.
      transform: "translateX(100%) skewX(12deg)"
      duration: slow
      easing: standard
    pulse_dot:
      description: >
        Tailwind 'animate-pulse' on 8px status dots in eyebrow chips.
      duration: "2000ms"
      easing: "cubic-bezier(0.4, 0, 0.6, 1)"
      iteration: infinite
    particle_field:
      description: >
        Hero canvas — 80 cyan particles drift at v ≈ 0.4 px/frame, connected by
        thin cyan lines whose alpha falls off linearly past 160px distance.
        Reflects off canvas edges. requestAnimationFrame loop.
      particles: 80
      max_link_distance_px: 160
      particle_color: "rgba(0,245,245,0.35)"
      link_color_base: "rgba(0,245,245,0.12)"

iconography:
  family: "Material Symbols Outlined"
  default_size: "1rem"          # 16px (Tailwind text-base)
  scale:
    sm:    "0.875rem"
    md:    "1rem"
    lg:    "1.25rem"
    xl:    "1.5rem"
    "2xl": "2rem"
    hero:  "5rem"               # text-[5rem] in card glyph plate
    huge:  "8rem"               # category wide-card glyph
    detail: "12rem"             # detail-hero glyph
  variation_default:
    FILL: 0
    wght: 300
    GRAD: 0
    opsz: 24
  variation_filled:
    FILL: 1
    role: "Project glyph that floats inside a card's icon plate"
  color_default: on_surface_variant
  color_accent:  primary_fixed   # cyan when interactive
  ghosted_alpha: 0.10            # cards render the glyph at 10–30% cyan alpha

components:
  navbar:
    role: "Top, fixed, transparent → glass on scroll"
    height: "80px"
    logo:
      mark: "ARCHITECT"
      mark_extension: ".OS"
      mark_color: on_surface
      extension_color: cyan-400 (≈ primary_fixed)
      family: headline
      weight: 800
    links:
      family: label
      size: label_md
      casing: uppercase
      tracking: "0.15em"
      active_treatment: "2px bottom border in on_surface"
      inactive_color: "on_surface_variant @ 60% alpha"
      hover_color: on_surface
    actions:
      icons: ["mail", "account_circle"]
      hover_color: cyan-300

  hero:
    background:
      layers:
        - "Static neural-brain image (cover, position center 40%)"
        - "Animated cyan particle canvas overlay (z-index 1)"
        - "Three-layer radial vignette (z-index 2)"
    eyebrow_chip:
      fill: glass_fill_chip
      blur: chip
      border: glass_border
      radius: lg
      label_size: label_sm
      label_color: on_surface_variant
    headline:
      treatment: "two-line; line 1 in on_surface, line 2 in signature_text gradient"
      weight: 800
      tracking: tight
    subtitle:
      family: body
      color: on_surface_variant
      max_width: "32rem"
    cta_primary:
      shape: pill
      fill: gradient.cta_cyan
      text_color: on_primary_fixed
      glow: cta_cyan_halo
      hover: cta_hover
    cta_secondary:
      shape: pill
      fill: glass_fill_panel
      blur: panel
      border: glass_border_strong
      text_color: on_surface
      trailing_icon: "north_east"
    coordinate_overlay:
      family: label
      color: "on_surface_variant @ 50% alpha"
      tracking: "0.15em"
      casing: uppercase

  glass_panel:
    fill: glass_fill_panel
    border: glass_border
    blur: panel
    radius: default
    padding: "32px"
    elevation: raised
    notes: "Shared shell for project overview, dataset list, sample outputs."

  project_card:
    layout:
      width: "1fr in 1/2/3 column responsive grid"
      image_plate_height: "176px"
      image_plate_fill: gradient.card_plate
      content_padding: "24px"
      content_spacing: "8px"
    title:
      style: h4
      color: on_surface
      hover_color: cyan-200 (≈ primary_fixed @ tinted)
    description:
      style: body_xs
      color: on_surface_variant
      truncation: "line-clamp-2"
    glyph:
      family: icon
      size: hero
      fill: filled
      color: "primary_fixed @ 15% alpha (group-hover 30%)"
    tag:
      shape: pill
      casing: uppercase
      tracking: "0.15em"
      size: label_sm
      variants:
        primary:
          fill: primary_tint_12
          text: primary_fixed
          border: primary_soft
        secondary:
          fill: secondary_tint_12
          text: secondary
          border: secondary_soft
    hover:
      transform: "translateY(-8px) scale(1.02)"
      glow_alt:
        even_index: glow_cyan
        odd_index:  glow_fuchsia

  category_section:
    header:
      icon_well:
        size: "40px"
        shape: full
        fill: primary_tint_08
        glyph_color: primary_fixed
      title: { style: h3, color: on_surface }
      meta: { style: label_sm, color: on_surface_variant }

  project_detail:
    hero_panel:
      height: "400px"
      shape: lg
      fill: "linear-gradient(135deg, surface_container_high → surface_container_low → surface_container_lowest)"
      glyph: { size: detail, color: "primary_fixed @ 10% alpha" }
      fade_to_canvas: "linear gradient bottom→top from background to transparent"
      title: { style: h1, color: on_surface }
      cta_primary:
        shape: lg
        fill: primary_fixed
        text_color: on_primary_fixed
        glow: glow_cyan
        sheen: cta_sheen
    breadcrumb:
      family: body
      size: body_sm
      color: on_surface_variant
      separator: "material chevron_right"
      current_color: cyan-300
      hover_color: cyan-400
    overview_panel: glass_panel
    stat_tile:
      fill: "surface_container_high @ 50% alpha"
      border: "1px solid rgba(outline_variant, 0.10)"
      caption: { style: label_sm, color: "on_surface_variant @ 60% alpha" }
      value: { size: "1.875rem", weight: 900, color: primary_fixed }
    code_block:
      window_chrome:
        fill: surface_container_high
        traffic_lights:
          - "rgba(error, 0.30)"
          - "rgba(secondary, 0.30)"
          - "rgba(primary, 0.30)"
        filename_label: { style: label_sm, color: "on_surface_variant @ 60%" }
      pre:
        fill: surface_container_lowest
        family: mono
        size: code
        color: "cyan-200 @ 80% alpha"
        padding: "32px"
    sidebar_panel:
      variants:
        - { base: glass_panel, glow: glow_fuchsia }   # datasets
        - { base: glass_panel, fill: "surface_container_high @ 40% alpha" } # outputs
        - { fill: "linear-gradient(135deg, surface_container_high → surface_container_lowest)", border: hairline_strong } # architecture

  status_dot:
    size: "8px"
    shape: full
    animation: pulse_dot
    color_variants: [primary_fixed, secondary, error]

  loading_state:
    pattern: "pulsing dot + uppercase 'Loading system…' label"
    label_style: label_sm
    label_color: on_surface_variant
    dot_color: cyan-400

accessibility:
  contrast:
    body_text_on_background:
      pair: ["#e7e2ff", "#0d0b21"]
      ratio: "≈ 13.4:1"
      target: "AAA"
    secondary_text_on_background:
      pair: ["#aca8c5", "#0d0b21"]
      ratio: "≈ 7.6:1"
      target: "AAA (normal text)"
    cyan_accent_text_on_background:
      pair: ["#00f5f5", "#0d0b21"]
      ratio: "≈ 11.2:1"
      target: "AAA"
    magenta_secondary_on_background:
      pair: ["#ff51fa", "#0d0b21"]
      ratio: "≈ 6.7:1"
      target: "AA (normal), AAA (large)"
  motion:
    respect_prefers_reduced_motion: true
    safe_alternatives: "Disable particle field, card translateY, sheen, pulse"
  focus:
    style: "2px outline in primary_fixed at 60% alpha, 2px offset, radius matches element"

assets:
  fonts:
    - "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap"
    - "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
  meta:
    title: "ARCHITECT.OS | Projects Dashboard"
    theme_color: "#0d0b21"

voice_and_tone:
  product_voice: "Calm, technical, slightly cinematic — like a HUD that respects the reader."
  copy_patterns:
    eyebrows: "ALL CAPS, 0.15–0.20em tracking — e.g. ADVANCED COMPUTER VISION"
    nav_labels: "ALL CAPS, single word — HUB, SHOWCASE, WORK, BIO"
    ctas: "Verb phrases — 'Explore Architecture', 'View Source', 'View Project'"
    chrome_metadata: "Coordinate / time stamps — 'COORD // 40.7128° N', 'TIME // 14:32:07 BST'"
---

# ARCHITECT.OS — Visual Identity

## The room you walk into

ARCHITECT.OS opens onto a deep indigo-black canvas (`#0d0b21`) lit from the corners by two faint nebulae: a cool cyan glow drifting in from the upper-left, a magenta wash bleeding from the lower-right. The page never goes pure black — there is always a hum of color in the background, painted onto `<body>` as overlapping radial gradients. Above that ambient field, every interactive surface is a pane of frosted glass: translucent indigo (`rgba(37,34,66,0.5)`) blurred with a 24px backdrop filter, hairlined with a 1px violet-grey border. The effect is less "dark mode" and more "control room at 2 a.m."

The product styles itself as an operating system for a personal portfolio — the wordmark is **ARCHITECT.OS**, the nav links are codenames (HUB, SHOWCASE, WORK, BIO), and the corners of the hero carry coordinates and a live UTC clock. The implied user is a deep-learning researcher logging into their own console.

## Color, in practice

Color does double duty here. The palette is deliberately narrow — a near-black canvas, three accents, and a lavender-white text color — but each accent has a job:

- **Cyan (`#00f5f5`)** is the system color. It marks every primary action, every active state, every "you are here." The CTA gradient runs cyan-to-cyan (with a faint shift to `#00e6e6`), the hero particles are cyan, the breadcrumb's current page is cyan, the project glyphs ghost in at 10–20 % cyan alpha and warm up to 30–40 % on hover. When in doubt, the answer is cyan.
- **Magenta (`#ff51fa`)** is the counter-melody. It tags secondary content, lights every other card with a pink halo on hover, animates the pulsing dot in eyebrow chips, and supplies the warm half of the hero vignette. Magenta is never used for a CTA — its role is rhythmic, not directional.
- **Violet (`#a68cff`)** appears almost exclusively as the middle stop of the **signature headline gradient** (cyan → violet → magenta at 135°). That gradient is the brand mark; it shows up on the hero's second line and on the highlighted word of every page title, and nowhere else. Use it sparingly or it loses its weight.

Body type is **`#e7e2ff`** — a cool lavender-white that reads as neutral against indigo but shifts the whole interface a half-step toward violet. Secondary copy steps down to **`#aca8c5`**. Neither text color is pure grey; both carry the same hue family as the canvas, which is what keeps the dark UI from feeling dead.

The Material 3 expressive token names (`primary-fixed`, `surface-container-highest`, `on-secondary-fixed-variant`, etc.) are exposed end-to-end. The naming is intentional — the system is meant to slot into M3 tooling — but the visual language drifts well past stock Material into something more cinematic.

## Typography: editorial display, technical body

Two typefaces do all the work:

- **Plus Jakarta Sans** at weight 800 (extrabold) for everything that wants to be read as a headline. Tracking is tight (`-0.02em` on display sizes), leading is compressed (`1.05` on the hero), and the hero size is fluid: `clamp(2.6rem, 6vw, 4.2rem)`. Headlines feel architectural — closer to a magazine cover than a SaaS dashboard.
- **Inter** at 300–600 for body, supporting copy, and labels. Body text is loose and readable (`leading-relaxed` and `leading-loose` on detail panels). Labels — eyebrows, KPI captions, breadcrumbs, nav links, code-block filenames — are uppercase Inter at 10–12px with **wide tracking (0.15–0.20em)** and bold weight. The wide tracking is a load-bearing detail of the look; without it, the labels collapse into anonymous metadata.

A third face, **Material Symbols Outlined**, is wired in as a variable font with `FILL` exposed. Project glyphs flip to filled (`'FILL' 1`) when used as the giant ghost icon inside a card plate or detail hero; everywhere else (nav, breadcrumb chevrons, KPIs) the glyphs stay outlined. Code blocks fall through to a system monospace stack and render in `cyan-200 @ 80%`, which gives them a phosphorescent terminal feel.

## Surfaces and elevation

There are essentially two surfaces in this UI: **the canvas** (the indigo-black page with its ambient nebulae) and **the glass panel** (a translucent indigo card that floats on top). Elevation is communicated by **light**, not by drop shadow:

- A panel at rest carries only a hairline border (`rgba(72,69,94,0.18)`) and the backdrop blur — no shadow.
- On hover, cards lift 8px and emit a colored halo: `0 20px 50px -20px rgba(0,245,245,0.30)` on even-indexed cards, the magenta equivalent on odd ones. The shadows alternate down the grid, which keeps the page feeling alive without ever using a generic grey shadow.
- Primary CTAs glow constantly — `0 0 30px -8px rgba(0,245,245,0.40)` — and a diagonal white sheen sweeps across them on hover (a 500ms `translateX(-100%) → translateX(100%)` with a 12° skew).
- The fixed navbar is invisible at the top of the page and dissolves into a 24px-blurred glass slab once `scrollY > 40px`. The transition is 500ms, which is slow enough to register as a deliberate state change rather than a flicker.

Radii are bold and consistent: most surfaces use the **default 16px** radius (`rounded` ≡ `1rem`), which already reads as soft against the angular type. Hero plates and detail surfaces step up to `2rem`. CTAs and eyebrow tags go fully pill (`9999px`). There are no sharp corners anywhere in the product — even the code window's traffic lights are perfect circles.

## Motion: drift, lift, sweep

Motion is restrained but present in three modes:

1. **Drift.** The hero canvas runs a real particle simulation — 80 cyan dots, gently floating at ~0.4 px/frame, with thin cyan lines drawn between any pair within 160px (alpha falling off linearly with distance). It's a physical neural-net visualization, not a video loop. Status dots in eyebrow chips pulse on a 2-second loop.
2. **Lift.** Cards translate up 8px and scale to 1.02 on hover (500ms, standard easing). CTAs scale to 1.05 (300ms). The detail-page chevron in the breadcrumb advances 4px to the right when its row is hovered. Nothing rotates, nothing flips — the motion vocabulary is strictly vertical lift and forward advance.
3. **Sweep.** The white sheen on primary CTAs and the hover state of card glyphs (color fades from 15% → 30% cyan, scale 1.0 → 1.1) feel like light moving across a surface rather than the surface itself changing.

Durations cluster around 300ms (`base`) for state changes and 500ms (`slow`) for hovers and the navbar transition. Nothing snaps; everything decelerates with the standard `cubic-bezier(0.4, 0, 0.2, 1)`.

## Layout, density, rhythm

The page is centered in a `max-w-7xl` (1280px) container with `px-8` (32px) gutters and `py-20` (80px) section blocks. Detail pages narrow to `max-w-6xl` (1152px) and split into a 12-column grid (`gap-8`) — 8 columns of narrative on the left, 4 columns of metadata sidecar on the right.

The landing grid is a familiar 1 / 2 / 3 column responsive grid (`gap-6`, ~24px). The category page introduces a wide variant: every fourth card spans two columns and breaks into a horizontal split — a 50/50 of icon plate and copy block — which becomes the page's natural rhythm break.

White space is generous. Card padding is 24–40px, panel padding is 32–40px, and headers leave at least 64px of air above the next block. The product never feels cramped, even though the type itself is dense and confident.

## What to do (and what not to do)

**Do:**

- Reach for cyan as the default accent, magenta as a counter-rhythm, and the cyan→violet→magenta gradient *only* on a single highlighted word per page.
- Pair extrabold Plus Jakarta Sans headlines with all-caps wide-tracked Inter eyebrows. The contrast in weight, case, and tracking is the look.
- Treat every interactive surface as a glass panel — translucent indigo, hairline border, backdrop blur — and let the canvas show through it.
- Animate sparingly: lift, fade, sweep. Always decelerate.
- Use Material Symbols glyphs at huge ghost sizes (5–12rem) at 10–20% cyan alpha as decorative figures inside card plates.

**Don't:**

- Don't introduce a light theme. The product is dark-only, and the body explicitly sets `bg-background` — color tokens like `on_surface` are calibrated for indigo, not white.
- Don't use the signature gradient on body copy, on more than one phrase per page, or as a fill behind a UI element. It's a wordmark gradient, not a brand fill.
- Don't add drop shadows for elevation. Lift comes from colored glows; depth comes from blur and translucency.
- Don't tighten the label tracking. The 0.15–0.20em on uppercase Inter is what makes labels feel like instrument panel text rather than tags.
- Don't fill icons by default. Outlined Material Symbols are the rule; filled (`'FILL' 1`) is reserved for the ghost glyph that lives behind card content.

## The mood, in one line

A control room for a research lab — quiet, cool, slightly luminous, and confident enough to be patient with the reader.
