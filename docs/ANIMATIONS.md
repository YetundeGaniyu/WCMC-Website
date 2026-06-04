# Animations

All motion is defined in [`styles/animations.css`](../styles/animations.css).

## 1. Drop-in classes
Add a class to any element — it animates the moment it appears:

| Class | Effect |
|-------|--------|
| `animate-fade-in` | Fades in |
| `animate-fade-in-up` | Fades in while sliding up |
| `animate-scale-in` | Fades in while growing slightly |
| `animate-menu-down` | Slides down (used by the mobile menu) |

**Stagger** a list by adding a delay class or an inline delay:
```tsx
<div className="animate-fade-in-up delay-100">…</div>
// or, inside a .map():
<div className="animate-fade-in-up" style={{ animationDelay: `${i * 90}ms` }}>…</div>
```
Delay classes available: `delay-100`, `delay-200`, `delay-300`, `delay-500`.

## 2. Reveal on scroll
Wrap anything that should fade in as the visitor scrolls to it:
```tsx
import Reveal from '@/components/ui/Reveal';

<Reveal>          <BigSection /> </Reveal>
<Reveal delay={150}> <NextItem /> </Reveal>   // stagger with a head-start (ms)
```

## 3. Logo hover
The roundel's four segments spread apart on hover automatically — any logo placed
inside an element with the class `logo-link` gets this for free.

## Built-in safety
- **Reduce motion:** if a visitor's device is set to "reduce motion", every animation
  is switched off automatically.
- **No JavaScript:** `Reveal` content still shows (a `<noscript>` fallback in
  `app/layout.tsx` guarantees nothing stays hidden).
- **Keyboard focus:** a red focus ring shows on every focusable element.

## Where to tweak
Want it faster/slower or a new movement? Edit the keyframes and class durations in
[`styles/animations.css`](../styles/animations.css) — it's commented section by section.
