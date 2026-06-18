# Branding

All values live in [`styles/theme.css`](../styles/theme.css). Change them there.

## Colours
| Name | Class | Hex | Use for |
|------|-------|-----|---------|
| Methodist Red | `bg-red` / `text-red` | `#c51718` | Primary brand colour, buttons, logo |
| Red (dark) | `bg-red-dark` | `#9e1213` | Button hover |
| Red (light) | `bg-red-light` | `#e0393a` | Soft accents |
| Gold | `text-gold` | `#D4A24C` | Local accent only — see note below |
| Background | `bg-bg` | `#FAF7F2` | Page background |
| Paper | `bg-paper` | `#FFFDF8` | Cards |
| Ink | `text-ink` | `#2A2723` | Main text |
| Ink muted | `text-ink-muted` | `#5A554E` | Secondary text |

**Methodist Red is `#c51718`** (Pantone 186 / RGB 197,23,24). This matches the
official Methodist Church identity. ⚠️ Confirm the exact value against the official
brand pack before print — the online artwork pack was unavailable at build time.

**Gold** is *not* part of the central Methodist palette (red / white / black). It is
kept as a deliberate West Croydon accent. Keep it for backgrounds/borders; avoid it
for small body text (contrast is weak on light backgrounds).

## Logo
The roundel (four red segments around a cross). Use the component:
```tsx
import { LogoMark } from '@/components/brand/Logo';
<LogoMark className="w-10 h-10 text-red" />   // colour follows text colour
```
Rules: don't stretch, rotate, recolour (except the approved white version), or
redraw it. To swap in official artwork, see [`public/brand/README.md`](../../public/brand/README.md).

## Fonts
The Methodist Church brand typeface is **Franklin Gothic** (Demi for "Methodist",
Book for "The"/"Church"). It's a commercial font, so the site loads **Libre Franklin**
— the open-source web equivalent — from Google Fonts.

- One family for the whole site (headings + body); hierarchy comes from size + weight.
- Headings: `font-serif` → Libre Franklin (the token name is kept for compatibility).
- Body: Libre Franklin (default).
- If you license real Franklin Gothic, it's already first in the font stack in
  `styles/theme.css`, so licensed machines use it automatically.
