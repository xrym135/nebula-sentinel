# Deployment Guide

> **在 GitHub 上直接给人看？** 见 [GITHUB_SHOWCASE.md](./GITHUB_SHOWCASE.md)（Vercel / GitHub Pages / README 截图三种方式）

## Vercel (Recommended)

1. Push repository to GitHub
2. Import project at [vercel.com/new](https://vercel.com/new)
3. Framework preset: **Next.js** (auto-detected)
4. Root directory: `.` (default)
5. Build command: `npm run build`
6. Output: default

### Environment Variables (v0.9+)

| Name | Environment |
|------|-------------|
| `MIMO_API_KEY` | Production, Preview |
| `MIMO_BASE_URL` | Production |
| `SOC_CLUSTER_ID` | Production |

v0.8 UI deploys **without** env vars.

### Custom Domain

Vercel → Project → Settings → Domains → add `soc.yourcompany.com`

---

## GitHub Pages

Automated via `.github/workflows/github-pages.yml` on push to `main`.

1. **Settings → Pages → Source:** GitHub Actions  
2. After workflow succeeds: `https://<username>.github.io/<repo-name>/`  
3. Repo name is auto-detected in CI (`GITHUB_REPO_NAME`)

Static export build:

```bash
GITHUB_PAGES=true GITHUB_REPO_NAME=your-repo-name npm run build
# output in ./out
```

---

## Netlify

1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `.next` is handled by `@netlify/plugin-nextjs`

Install plugin in `netlify.toml` (included in repo) or Netlify UI.

---

## Docker (Optional)

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```

> Enable `output: 'standalone'` in `next.config.ts` before using this Dockerfile.

---

## Self-Hosted

```bash
npm ci
npm run build
npm run start
# listens on :3000
```

Use a reverse proxy (Nginx, Caddy) for TLS termination.

---

## Post-Deploy Checklist

- [ ] Verify homepage loads and agent status updates
- [ ] Test Console, AI Assistant, Export Report
- [ ] Add screenshots to `docs/screenshots/`
- [ ] Update README live preview link
