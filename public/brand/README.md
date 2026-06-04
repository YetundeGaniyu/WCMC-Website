# public/brand/

The Methodist Church roundel, ready to use anywhere.

| File | Use it for |
|------|-----------|
| `logo.svg` | Red logo on light backgrounds |
| `logo-white.svg` | White logo on dark backgrounds (e.g. the footer) |

On the website itself, the logo is drawn by `components/brand/Logo.tsx` (so it can
animate and recolour). These two files are the plain copies for emails, social
share images, print, etc.

## Replacing with official artwork
This SVG is a faithful redraw of the roundel. If you receive the **official supplied
artwork** from the Methodist Church, simply overwrite these two files (keep the same
names) and update the four `<path>` shapes in `components/brand/Logo.tsx` to match.
Do not stretch, recolour (other than the approved white version), or alter the mark.
