# Etili Village - Deployment & Hosting Guide

## Deployment Options

### Option 1: Vercel (Recommended for React/Vite) ✅

**Steps:**

1. Create account at https://vercel.com
2. Connect GitHub repository
3. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Environment variables: Copy from `.env`
5. Deploy!

**Vercel Configuration Already in Place:**

- ✅ `vercel.json` with headers
- ✅ Rewrite rules for SPA routing
- ✅ Security headers configured
- ✅ Cache control headers

---

### Option 2: Netlify

**Steps:**

1. Create account at https://www.netlify.com
2. Connect GitHub repository
3. Build settings:
   - Build Command: `npm run build`
   - Publish Directory: `dist`
4. Deploy!

**Netlify Configuration Already in Place:**

- ✅ `netlify.toml` configured
- ✅ Redirects for SPA routing
- ✅ Security and cache headers
- ✅ Environment variables support

---

### Option 3: Apache Server (Self-Hosted)

**Requirements:**

- Apache web server with mod_rewrite enabled
- Node.js for local build

**Steps:**

1. Build locally: `npm run build`
2. Upload `dist` folder contents to server
3. `.htaccess` file already configured for:
   - GZIP compression
   - Browser caching
   - HTTPS redirect
   - URL rewriting for SPA
   - Security headers

**Server Configuration:**

```
Enable modules:
- mod_rewrite
- mod_deflate
- mod_expires
- mod_headers

Create .htaccess in root (already provided)
Upload dist folder to public_html
```

---

## Domain Setup

### DNS Configuration

**For Vercel:**

```
Add to your domain registrar:
CNAME: your-domain.com → cname.vercel-dns.com
www.your-domain.com → cname.vercel-dns.com
```

**For Netlify:**

```
Add to your domain registrar:
CNAME: your-domain.com → your-site.netlify.app
```

**For Apache/Self-Hosted:**

```
A Record: your-domain.com → your-server-ip
A Record: www.your-domain.com → your-server-ip
```

### Current Domain: `etilivillage.com`

Update these based on your actual domain provider.

---

## Pre-Deployment Checklist

- [ ] Update `.env` file with production URLs
- [ ] Verify all social media links in `.env`
- [ ] Check OpenGraph image path (`/og-image.jpg`)
- [ ] Test all internal links
- [ ] Verify sitemap URLs match domain
- [ ] Test mobile responsiveness
- [ ] Run Lighthouse audit
- [ ] Check Core Web Vitals

---

## Post-Deployment

### 1. Google Search Console

```
1. Go to https://search.google.com/search-console
2. Add property: your domain
3. Verify ownership (add meta tag or DNS record)
4. Submit sitemap: https://your-domain.com/sitemap.xml
5. Monitor crawl errors
6. Check search performance
```

### 2. Google Analytics

```
1. Create account at https://analytics.google.com
2. Add measurement ID to site
3. Verify tracking is working
4. Set up goals and events
```

### 3. Bing Webmaster Tools

```
1. Go to https://www.bing.com/webmasters
2. Add and verify domain
3. Submit sitemap
4. Monitor crawl stats
```

### 4. Facebook/Instagram

```
1. Add domain to Meta Business Suite
2. Verify ownership
3. Enable sharing debugger
4. Test OG images
```

### 5. Twitter

```
1. Verify domain on Twitter Creator Studio
2. Test Twitter Card preview
3. Monitor mentions and engagement
```

---

## Environment Variables (.env)

Current configuration:

```
VITE_WHATSAPP_NUMBER=94771111111
VITE_CONTACT_EMAIL=info@etilivillage.com
VITE_CONTACT_PHONE=+94-11111111
VITE_API_BASE_URL=https://ethi-village-backend.onrender.com/api/admin
VITE_FACEBOOK_URL=https://web.facebook.com/...
VITE_INSTAGRAM_URL=https://www.instagram.com/...
VITE_YOUTUBE_URL=https://youtube.com/@etilivillage
VITE_TRIPADVISOR_URL=https://www.tripadvisor.com/...
```

**Update production URLs before deploying.**

---

## Build & Deployment Commands

### Local Development

```bash
npm install
npm run dev
```

### Production Build

```bash
npm run build
npm run preview
```

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

---

## SSL Certificate

### Vercel/Netlify

- ✅ Automatic SSL certificate (Let's Encrypt)
- ✅ HTTPS enabled by default
- ✅ Auto-renewal

### Apache Server

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-apache

# Generate certificate
sudo certbot certonly --apache -d your-domain.com -d www.your-domain.com

# Set up auto-renewal
sudo systemctl enable certbot.timer
```

---

## Performance Optimization

### Already Implemented:

- ✅ GZIP compression
- ✅ Browser caching
- ✅ Font preloading
- ✅ Image optimization hints
- ✅ Minified assets (from build)
- ✅ Code splitting (from Vite)

### Additional Recommendations:

1. Use CDN for static assets
2. Optimize images with WebP format
3. Implement image lazy loading
4. Use service workers (PWA)
5. Monitor Core Web Vitals regularly

---

## Monitoring & Maintenance

### Weekly Tasks:

- Check Google Search Console for errors
- Monitor page speed with PageSpeed Insights
- Review analytics for anomalies

### Monthly Tasks:

- Update sitemap if new content added
- Check for broken links
- Review Core Web Vitals
- Update outdated content

### Quarterly Tasks:

- SEO audit
- Backlink analysis
- Content refresh
- Technical SEO review

---

## Troubleshooting

### 404 Errors on Page Refresh

**Solution:** Ensure rewrite rules are in place

- Vercel: ✅ Configured in `vercel.json`
- Netlify: ✅ Configured in `netlify.toml`
- Apache: ✅ Configured in `.htaccess`

### Images Not Loading

- Check image paths are correct
- Verify CDN or server paths
- Check CORS headers

### Sitemap Not Found

- Verify `sitemap.xml` is in public folder
- Check robots.txt points to correct sitemap URL
- Test with `https://your-domain.com/sitemap.xml`

### Meta Tags Not Showing on Social Media

- Test with Open Graph debugger
- Clear social media cache
- Verify OG image path and size (1200x630px)

---

## Support & Resources

### Official Documentation:

- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com)
- [Google Search Central](https://developers.google.com/search)
- [Vite Documentation](https://vitejs.dev)

### SEO Tools:

- [Google Search Console](https://search.google.com/search-console)
- [Google Analytics](https://analytics.google.com)
- [PageSpeed Insights](https://pagespeed.web.dev)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [WAVE Web Accessibility Tool](https://wave.webaim.org)

---

## Contact & Support

For deployment questions:

- Email: info@etilivillage.com
- WhatsApp: +94 77 1111111

---

**Last Updated:** April 26, 2026
**Status:** Ready for Production Deployment ✅
