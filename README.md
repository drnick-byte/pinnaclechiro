# Pinnacle Chiropractic concept site

This repository is intentionally configured as a public design preview. Search
engines are blocked, forms do not transmit visitor information, and booking,
phone, and directions links open an on-site preview notice.

Cloudflare Workers deploys the buildless site directly from the repository root
using `wrangler.jsonc`. `.assetsignore` prevents project-only files from being
published as website assets.

## Launch checklist

1. In `js/layout.js`, update `SITE_CONFIG` with the production booking, phone,
   directions, contact-form, and newsletter endpoints. Set `previewMode` to
   `false` only after those destinations have been tested.
2. Remove the concept-preview banner from `NAV_HTML` and remove the preview
   interaction dialog if it is no longer needed.
3. Replace all placeholder business, provider, phone, address, hours,
   credentials, insurance, review, and policy content.
4. Replace the placeholder image paths listed in `images/README.txt` with
   appropriately licensed, optimized images.
5. Review all health claims and service descriptions for accuracy and
   applicable advertising requirements.
6. Remove `<meta name="robots" content="noindex, nofollow, noarchive">` from
   every HTML page and replace `robots.txt` with production crawl rules.
7. Add canonical URLs, LocalBusiness/provider structured data, Open Graph
   metadata, a social image, and a sitemap using the final domain.
8. Replace sample blog links with real article URLs or remove unpublished cards.
9. Test keyboard navigation, mobile layouts, form delivery, scheduling, calling,
   directions, analytics, and all internal links on the production hostname.
