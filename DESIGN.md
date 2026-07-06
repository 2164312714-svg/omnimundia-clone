# DESIGN.md — Omnimundia

> Source: extracted from `omnimundia.css` (484 KB) during authorized pentest reconnaissance.
> The original site is a Vue 3 + Element Plus SPA with a custom `--app-*` token system layered on top of Element Plus defaults. This file ports that system to the Next.js + shadcn/ui + Tailwind v4 clone.

## Identity

Omnimundia is an AI-driven interactive fiction / "inference" (推演) platform. The visual identity is **warm parchment + amber** — a literary, earthy palette that distinguishes it from typical blue-accented SaaS UIs. Dark mode inverts to near-black grays with a brighter gold primary.

## Colors

### Primary / Brand

```yaml
primary:
  light: "#d97706"   # amber-600, the only interaction-driver color
  dark: "#de940a"     # brighter gold for dark backgrounds
secondary:
  light: "#fffdf7"    # text-on-primary (warm white)
  dark: "#1a1a1a"     # text-on-primary (near-black)
brand_glow: "#646cff" # logo drop-shadow glow
```

### Semantic

```yaml
blue:   "#409eff"  # Element Plus blue (used for info/icon-circle gradients)
green:  "#4caf50"  # success / "added" changeset
yellow: "#d8af1a"  # warning / "changed" changeset
red:    "#f56c6c"  # danger / "removed" changeset / delete actions
```

### Background Scale (7 levels, light → dark)

```yaml
light:
  bg_l1: "#faf4ea"   # page base (warm parchment)
  bg_l2: "#f7efe4"   # card containers, main content
  bg_l3: "#f3e6d6"   # category panel, elevated surfaces
  bg_l4: "#efe3ca"   # auth cards, dialog bg
  bg_l5: "#e5d5b9"   # hover states, dialog bg (themed)
  bg_l6: "#e0cdb1"   # utility buttons
  bg_l7: "#dac5a9"   # button hover, icon-button hover
  topbar: "#eedabe"  # fixed top navigation
  sidebar: "#efe5d5" # game sidebar base
  card: "#fffaf2"    # script card background
  button: "#e9dac0"  # default button
  button_hover: "#e3d2b0"
  game_option: "#f2e2bf"      # story option button
  game_option_hover: "#e8d4aa"

dark:
  bg_l1: "#1a1a1a"
  bg_l2: "#1f1f1f"
  bg_l3: "#272727"
  bg_l4: "#2f2f2f"
  bg_l5: "#363636"
  bg_l6: "#3f3f3f"
  bg_l7: "#4c4c4c"
  topbar: "#0d0d0d"
  sidebar: "#151515"
  card: "#2f2f2f"
  button: "#5f5f5f"
  button_hover: "#6f6f6f"
```

### Text Scale (6 levels, dark → light)

```yaml
light:
  text_l1: "#2a1b0a"   # headings, primary text
  text_l2: "#3c2712"   # body text, dialog title
  text_l3: "#5b3f21"   # secondary text
  text_l4: "#7a5a35"   # muted, nav inactive
  text_l5: "#9e784f"   # placeholder, hints
  text_l6: "#c39f70"   # disabled
  story_description: "#3c2712"
  story_option: "#3c2712"

dark:
  text_l1: "#ffffff"
  text_l2: "#eeeeee"
  text_l3: "#cccccc"
  text_l4: "#a9a9a9"
  text_l5: "#888888"
  text_l6: "#666666"
  story_description: "#f2eee6"
  story_option: "#f3f1eb"
```

### Border Scale (4 levels)

```yaml
light:
  border_l1: "#eadcc8"   # default borders
  border_l2: "#dbc6a6"   # input, dialog
  border_l3: "#c8a676"   # button, elevated
  border_l4: "#b0834e"   # strong
  hover: "#a0683b"
  focus: "#d78c3f"
dark:
  border_l1: "#333333"
  border_l2: "#444444"
  border_l3: "#555555"
  border_l4: "#666666"
  hover: "#777777"
  focus: "#aaaaaa"
```

### Shadows

```yaml
popover:  "0 4px 12px rgba(0,0,0,0.3)"
dropdown: "0 4px 12px rgba(0,0,0,0.45)"
auth_card: "0 16px 40px rgba(0,0,0,0.5)"
share_card: "0 24px 48px rgba(0,0,0,0.3)"
focus_ring: "0 0 0 1px rgba(255,255,255,0.12)"
```

## Typography

```yaml
font_family:
  primary: '"Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif'
  monospace: "Consolas, Monaco, monospace"
base_size: "16px (desktop), 14px (mobile @max-width:768px, scale 0.875)"
type_scale:
  display: "2.2rem"     # hero h1
  h1: "1.8rem"
  h2: "1.4rem"
  h3: "1.1rem"
  body: "1rem (16px)"
  small: "0.875rem (14px)"
  caption: "0.75rem (12px)"
  micro: "0.7rem"
line_height:
  tight: "1.2"
  normal: "1.5"
  relaxed: "1.6"
  loose: "1.7"
font_weight:
  primary: "500"       # Element Plus default
  bold: "600"
  heavy: "700"
```

## Rounded

```yaml
sm: "4px"    # buttons, inputs, dialogs (EP base)
md: "6px"    # scene-content
lg: "8px"    # cards, panels, editor, version-sidebar
xl: "10px"   # auth cards
2xl: "12px"  # chat panel, hero banner
3xl: "14px"  # option buttons, bar-items
4xl: "18px"  # worldstate collapse, mobile-bottom-bar
5xl: "24px"  # share-card
full: "999px" # pills, role-badges
```

## Layout

```yaml
top_bar:
  height: "50px"
  position: "fixed"
  z_index: 1000
  padding: "0.5rem 1.5rem"
mobile_bottom_bar:
  height: "54px"
  columns: 5
  radius: "18px"
  blur: "18px"
  z_index: 1000
content_max_width: "1200px"
marketplace_grid: "112px 1fr (desktop), 64px 1fr (mobile)"
script_card_grid: "repeat(auto-fill, minmax(280px, 1fr))"
game_sidebar: "260px (expandable to 520px, collapsible to 60px)"
editor_grid: "5fr 2fr"
chat_panel: "clamp(380px, 36vw, 560px) × 540px"
```

## Breakpoints

```yaml
primary: "max-width: 768px"   # font-scale 0.875, grids → 1fr, cards → rows, dialogs 95%
tablet: "max-width: 1024px"   # top-bar padding shrinks
small: "max-width: 520px"    # setting-rows stack vertically
xs: "max-width: 480px"       # icon-only buttons, safe-area insets
```

## Transitions

```yaml
default: "0.3s cubic-bezier(0.645, 0.045, 0.355, 0.1)"
fast: "0.2s ease"
snappy: "0.15s ease"
sidebar: "width 0.3s ease"
```

## z-index Layers

```yaml
game_background: -2      # ::before background image
game_overlay: -1         # ::after tint gradient
content: 0
sticky_toolbar: 2
omi_badge: 3
game_sidebar: 200
top_bar: 1000            # --el-index-top
omi_panel: 1002
overlays_dialogs: 2000   # --el-index-popper
max: 9999
```

## Scrollbar

```yaml
width: "10px (global), 6px (component)"
track: transparent
thumb: "linear-gradient(180deg, var(--app-border-hover), var(--app-border-l3))"
thumb_radius: "999px (pill)"
thumb_border: "2px solid transparent, background-clip: padding-box"
```
