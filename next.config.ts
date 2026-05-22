import type { NextConfig } from 'next'

/** Set GITHUB_PAGES=true when building for https://<user>.github.io/<repo>/ */
const isGithubPages = process.env.GITHUB_PAGES === 'true'
const repoName = process.env.GITHUB_REPO_NAME ?? 'nebula-sentinel'

const nextConfig: NextConfig = {
  ...(isGithubPages
    ? {
        output: 'export',
        basePath: `/${repoName}`,
        assetPrefix: `/${repoName}/`,
        images: { unoptimized: true },
        trailingSlash: true,
      }
    : {}),
}

export default nextConfig
