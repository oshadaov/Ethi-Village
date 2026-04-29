# 🚀 PRE-LAUNCH SEO CHECKLIST

## Critical Items (Must Complete Before Launch)

### Domain & DNS

- [ ] Domain registered and configured
- [ ] DNS records pointing to hosting (Vercel/Netlify/Apache)
- [ ] HTTPS/SSL certificate active
- [ ] www and non-www redirect configured
- [ ] Domain resolves in browser

### Meta Tags

- [ ] Page title is compelling (50-60 chars)
- [ ] Meta descriptions are unique (150-160 chars)
- [ ] Keywords are relevant and included
- [ ] Open Graph image exists at `/og-image.jpg`
- [ ] Twitter Card tags are present

### Sitemaps & Robots

- [ ] `sitemap.xml` exists and is valid
- [ ] `robots.txt` exists and is correct
- [ ] Robots.txt allows crawling
- [ ] All URLs in sitemap are correct
- [ ] Sitemap references correct domain

### Headers & Security

- [ ] HTTP → HTTPS redirect works
- [ ] Security headers are present
- [ ] Cache headers are set correctly
- [ ] No mixed content warnings
- [ ] CSP headers don't block functionality

### Performance

- [ ] Page load time < 3 seconds
- [ ] Lighthouse score > 80
- [ ] Core Web Vitals are green
- [ ] Images are optimized
- [ ] JavaScript is minified

### Mobile & Accessibility

- [ ] Site is mobile responsive
- [ ] Touch targets are large enough
- [ ] Text is readable on mobile
- [ ] No horizontal scroll
- [ ] Accessibility score > 80

### Links & Navigation

- [ ] No broken links (404s)
- [ ] Internal links use absolute paths
- [ ] All social media links work
- [ ] Contact links work
- [ ] CTA buttons are functional

### Content

- [ ] All pages have unique H1 tags
- [ ] Content matches page purpose
- [ ] Keywords are naturally included
- [ ] No duplicate content
- [ ] Images have alt text

### Analytics & Verification

- [ ] Google Analytics is installed
- [ ] Google Search Console property created
- [ ] Domain verified in GSC
- [ ] Tracking is working
- [ ] Conversion tracking set up

---

## Important URLs to Test

| Page          | URL                                    | Status |
| ------------- | -------------------------------------- | ------ |
| Homepage      | https://etilivillage.com/              | ✓      |
| Experiences   | https://etilivillage.com/experiences   | ✓      |
| Accommodation | https://etilivillage.com/accommodation | ✓      |
| Guides        | https://etilivillage.com/guides        | ✓      |
| Gallery       | https://etilivillage.com/gallery       | ✓      |
| About         | https://etilivillage.com/about         | ✓      |
| Contact       | https://etilivillage.com/contact       | ✓      |
| Sitemap       | https://etilivillage.com/sitemap.xml   | ✓      |
| Robots.txt    | https://etilivillage.com/robots.txt    | ✓      |

---

## Testing Tools to Use

### Before Launch

1. **Lighthouse** (Chrome DevTools F12 → Lighthouse)
2. **Google Mobile-Friendly Test** - https://search.google.com/test/mobile-friendly
3. **PageSpeed Insights** - https://pagespeed.web.dev
4. **W3C Validator** - https://validator.w3.org
5. **WAVE Accessibility** - https://wave.webaim.org

### After Launch

1. **Google Search Console** - https://search.google.com/search-console
2. **Google Analytics** - https://analytics.google.com
3. **Bing Webmaster Tools** - https://www.bing.com/webmasters
4. **Broken Link Checker** - https://www.brokenlinkcheck.com

---

## Social Media Verification

### Facebook

- [ ] Test OG image on Facebook Sharing Debugger
- [ ] Add domain to Meta Business Suite
- [ ] Verify Facebook domain ownership
- [ ] Set up Facebook Pixel (optional)

### Twitter/X

- [ ] Test Twitter Card preview
- [ ] Verify domain on Twitter
- [ ] Configure Twitter Card settings

### Instagram

- [ ] Add domain to Instagram Business Suite
- [ ] Set up linked accounts

### LinkedIn (if B2B)

- [ ] Set up LinkedIn Company Page
- [ ] Link company website
- [ ] Enable LinkedIn tags

---

## First Week Post-Launch Tasks

### Day 1

- [ ] Verify site is live and accessible
- [ ] Check all critical pages load
- [ ] Verify analytics is tracking
- [ ] Submit sitemap to Google Search Console
- [ ] Monitor for any errors

### Day 2-3

- [ ] Submit sitemap to Bing
- [ ] Check Google Search Console for crawl errors
- [ ] Request indexing for homepage
- [ ] Verify robots.txt is correct
- [ ] Check mobile usability

### Day 4-7

- [ ] Monitor traffic patterns
- [ ] Check bounce rates
- [ ] Verify conversion tracking
- [ ] Fix any reported issues
- [ ] Share on social media
- [ ] Monitor search rankings

---

## Monthly Maintenance Tasks

- [ ] Monitor Google Search Console
- [ ] Check Analytics for changes
- [ ] Review top-performing content
- [ ] Update sitemap if new pages added
- [ ] Check for broken links
- [ ] Verify Core Web Vitals
- [ ] Update old content
- [ ] Check rankings for target keywords

---

## Key Metrics to Monitor

### Search Performance

- Impressions (how many times your site shows in search)
- Click-through rate (CTR)
- Average position (ranking position)
- Query volume and clicks per query

### Website Performance

- Page load time
- Bounce rate
- Average session duration
- Pages per session
- Conversion rate

### Core Web Vitals

- LCP (Largest Contentful Paint) < 2.5s
- FID (First Input Delay) < 100ms
- CLS (Cumulative Layout Shift) < 0.1

---

## Common Issues & Fixes

### Issue: Site Not Showing in Google Search

**Solution:**

1. Verify domain ownership in GSC
2. Check robots.txt allows crawling
3. Submit sitemap manually
4. Wait 1-4 weeks for indexing
5. Check for crawl errors in GSC

### Issue: Low Page Speed Score

**Solution:**

1. Optimize images with WebP
2. Enable GZIP compression ✅ Done
3. Minimize CSS/JavaScript
4. Use a CDN
5. Enable browser caching ✅ Done

### Issue: 404 Errors on Page Refresh

**Solution:**

1. Check rewrite rules in configuration file
2. For Vercel: Verify `vercel.json` ✅ Done
3. For Netlify: Verify `netlify.toml` ✅ Done
4. For Apache: Verify `.htaccess` ✅ Done

### Issue: Meta Tags Not Showing on Social Media

**Solution:**

1. Verify OG image path and size (1200x630px)
2. Test in OG Debugger
3. Clear social media cache
4. Check all og:\* meta tags are present ✅ Done

### Issue: Analytics Not Tracking

**Solution:**

1. Verify tracking code is in HTML head
2. Check with Google Analytics debugger
3. Wait 24 hours for data to appear
4. Verify no ad blockers blocking tracking

---

## Success Criteria

✅ **Green Light for Launch When:**

- [ ] All critical meta tags present
- [ ] Sitemap and robots.txt working
- [ ] Page load time < 3 seconds
- [ ] Mobile score > 80
- [ ] Lighthouse score > 80
- [ ] No broken links
- [ ] HTTPS working
- [ ] Analytics installed
- [ ] No console errors
- [ ] All CTAs functional

---

## Post-Launch Optimization

### Week 1-2

- Focus on getting indexed by Google
- Monitor for technical issues
- Promote on social media

### Month 1-3

- Monitor traffic and engagement
- Optimize high-traffic, low-conversion pages
- Build quality backlinks

### Month 3+

- Expand content strategy
- Target new keywords
- Monitor competitors
- Regular SEO audits

---

## Quick Contact Reference

**For Technical Issues:**

- Email: info@etilivillage.com
- WhatsApp: +94 77 1111111
- Website: https://etilivillage.com

**For SEO Questions:**

- Google Search Central: https://developers.google.com/search
- Google Support: https://support.google.com

---

## Files Status

| File           | Status     | Check               |
| -------------- | ---------- | ------------------- |
| index.html     | ✅ Updated | Meta tags           |
| robots.txt     | ✅ Updated | Crawling rules      |
| sitemap.xml    | ✅ Updated | All pages included  |
| manifest.json  | ✅ Created | PWA ready           |
| vercel.json    | ✅ Updated | Headers & redirects |
| netlify.toml   | ✅ Created | Alternative host    |
| .htaccess      | ✅ Created | Apache config       |
| seoMetadata.js | ✅ Created | Utility ready       |

---

## Ready for Launch! 🎉

All SEO files are in place and configured correctly.
Follow this checklist to ensure a smooth launch.

**Good luck! 🚀**

---

**Last Updated:** April 26, 2026
**Prepared by:** Your Development Team
**Status:** Ready for Deployment
