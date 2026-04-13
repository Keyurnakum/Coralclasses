# 🚀 EduStream Academy - SPA Deployment Guide

## React Router Setup ✅
Your React Router is correctly configured with:
- ✅ BrowserRouter wrapper in App.tsx
- ✅ Proper Route paths defined
- ✅ All navigation routes handled

## The SPA 404 Problem & Solution

### Why You Get 404 Errors
When you refresh `/faculty`:
1. Browser sends GET request to `/faculty`
2. Server looks for `/faculty` file (doesn't exist)
3. Server returns 404

**Solution:** Server must serve `index.html` for all non-file routes, then React Router takes over.

---

## 🌐 Platform-Specific Deployment

### Option 1: **VERCEL** (Recommended for React)

**File:** `vercel.json`
**Location:** Root of project
**Content:**
```json
{
  "rewrites": [
    {
      "source": "/((?!api|.*\\.).*)",
      "destination": "/index.html"
    }
  ],
  "buildCommand": "npm run build",
  "outputDirectory": "dist"
}
```

**Steps:**
1. Install Vercel CLI: `npm i -g vercel`
2. Deploy: `vercel` or `vercel deploy`
3. Done! ✅

---

### Option 2: **NETLIFY**

**File:** `netlify.toml`
**Location:** Root of project
**Content:**
```toml
[build]
command = "npm run build"
publish = "dist"

[[redirects]]
from = "/*"
to = "/index.html"
status = 200
```

**Steps:**
1. Install Netlify CLI: `npm i -g netlify-cli`
2. Deploy: `netlify deploy --prod --dir=dist`
3. Or push to GitHub and connect to Netlify UI

---

### Option 3: **APACHE HOSTING**

**File:** `.htaccess`
**Location:** Root of `dist/` folder (after build)
**Content:** Already created ✅

**Steps:**
1. Build: `npm run build`
2. Upload `dist/` folder to Apache server
3. Ensure `.htaccess` is in the `dist/` root
4. Enable `mod_rewrite` on server:
   ```bash
   sudo a2enmod rewrite
   sudo systemctl restart apache2
   ```

---

### Option 4: **CUSTOM NODE.JS/EXPRESS SERVER**

Update your `server.ts`:

```typescript
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Serve static files
app.use(express.static(path.join(__dirname, 'dist')));

// API routes (must come before SPA fallback)
app.get('/api/*', (req, res) => {
  // Your API routes here
});

// SPA Fallback - MUST be last
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
```

---

## ✅ Deployment Checklist

- [ ] React Router properly configured (checked ✅)
- [ ] Choose hosting platform
- [ ] Create appropriate config file (vercel.json / netlify.toml / .htaccess)
- [ ] Build project: `npm run build`
- [ ] Deploy to platform
- [ ] Test refresh on different routes:
  - [ ] http://yoursite.com/faculty (refresh)
  - [ ] http://yoursite.com/courses (refresh)
  - [ ] http://yoursite.com/dashboard (refresh)

---

## 🧪 Local Testing (Before Deployment)

Test production build locally:

```bash
# Build production
npm run build

# Preview build
npm run preview
```

Visit: http://localhost:4173/faculty and refresh - should work!

---

## 🔍 File Locations Summary

| Platform | File | Location | Purpose |
|----------|------|----------|---------|
| Vercel | vercel.json | Root | ✅ Already created |
| Netlify | netlify.toml | Root | ✅ Already created |
| Apache | .htaccess | Root | ✅ Already created |
| Express | server.ts | Root | Update for production |

---

## 🐛 Troubleshooting

**Issue:** Still getting 404 on refresh
- ✅ Check config file is in correct location
- ✅ Rebuild project: `npm run build`
- ✅ Clear browser cache (Ctrl+Shift+Delete)
- ✅ Check server logs for errors

**Issue:** API calls not working
- ✅ Ensure `/api/*` routes are before SPA fallback
- ✅ Check proxy settings match your backend

**Issue:** Static assets (CSS, JS) not loading
- ✅ Check asset paths are relative in vite.config.ts
- ✅ Run `npm run build` again

---

## 📞 Support

Your React Router setup is **CORRECT** ✅

Just deploy with the appropriate config file for your platform!
