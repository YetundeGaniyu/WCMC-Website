# Where everything lives

```
WCMC-Website/
├── app/                  Pages (each folder = a page on the site)
│   ├── globals.css       Loads fonts + Tailwind + theme + animations (rarely touched)
│   ├── icon.svg          Browser tab icon (the roundel)
│   └── (site)/           The public pages: home, about, visit, news…
│
├── styles/               🎨 THE LOOK
│   ├── theme.css         Brand colours & fonts  →  edit colours here
│   └── animations.css    All movement + focus ring  →  edit animations here
│
├── public/brand/         🔴 THE LOGO (plain files for email/social/print)
│   ├── logo.svg          Red logo
│   └── logo-white.svg    White logo
│
├── components/
│   ├── brand/Logo.tsx    The logo used ON the site (animated, recolourable)
│   ├── ui/Reveal.tsx     Fade-content-in-on-scroll wrapper
│   ├── ui/               Buttons, cards, pills…
│   └── layout/           Top nav + footer
│
├── lib/sanity/           Talks to the CMS (where content comes from)
└── docs/                 You are here
    ├── STRUCTURE.md      This file
    ├── BRANDING.md       Colours, logo & font rules
    └── ANIMATIONS.md     How to add motion
```

## "I want to change…"
| …this | Open this |
|-------|-----------|
| A colour | `styles/theme.css` |
| An animation | `styles/animations.css` |
| The logo shape | `components/brand/Logo.tsx` + `public/brand/*.svg` |
| The menu links | `components/layout/SiteNav.tsx` |
| Page content | the matching folder in `app/(site)/` |
