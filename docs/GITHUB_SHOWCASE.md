# 在 GitHub 上直接展示项目

GitHub 仓库本身**不能运行** Next.js，但可以用下面三种方式让访客「点开就能看」。

---

## 方式一：Vercel 在线 Demo（最推荐）

评估人、面试官最喜欢：**点链接就是完整交互界面**。

### 步骤

1. 把 `nebula-sentinel` 推到 GitHub（仓库名建议 `nebula-sentinel-ai-soc`）
2. 打开 [vercel.com/new](https://vercel.com/new) → Import 该仓库
3. 保持默认 **Next.js**，直接 Deploy
4. 得到地址，例如：`https://nebula-sentinel-ai-soc.vercel.app`

### 写进 GitHub

**仓库首页 → 右侧 ⚙️ About → Website** 填 Vercel 地址。

**README.md** 顶部改成：

```markdown
🌐 **Live Demo:** https://nebula-sentinel-ai-soc.vercel.app
```

MiMo Orbit 申请表里的「项目链接」也填这个。

---

## 方式二：GitHub Pages（地址在 github.io 下）

适合希望链接形如 `https://你的用户名.github.io/仓库名/` 的情况。

本仓库已配置工作流：`.github/workflows/github-pages.yml`

### 步骤

1. 代码推到 GitHub 的 **`main`** 分支
2. 仓库 **Settings → Pages**
3. **Build and deployment → Source** 选 **GitHub Actions**
4. 等 Actions 里 `Deploy GitHub Pages` 跑绿
5. Pages 会显示访问地址，一般为：

   `https://<你的用户名>.github.io/<仓库名>/`

### 注意

- 仓库名若不是 `nebula-sentinel-ai-soc`，无需改代码：CI 会自动用当前仓库名作为路径
- GitHub Pages 为**静态站点**，`/api/health` 在 Pages 上不可用（Vercel 上可用）
- 主界面 SOC 控制台可完整使用

### 本地预览 Pages 构建

```powershell
$env:GITHUB_PAGES='true'
$env:GITHUB_REPO_NAME='nebula-sentinel-ai-soc'   # 改成你的仓库名
npm run build
npx serve out
```

浏览器打开提示的地址（需带仓库名路径）。

---

## 方式三：README 里直接看图（无需部署）

即使还没部署，GitHub 仓库页也能「有视觉效果」：

1. 本地 `npm run dev`，截 3～4 张全屏图
2. 放到 `docs/screenshots/`
3. 在 `README.md` 里引用：

```markdown
## Preview

![Dashboard](docs/screenshots/dashboard-full.png)
![Attack Graph](docs/screenshots/attack-graph.png)
```

推上去后，**浏览 README 即可看到界面**，适合配合 Live Demo 链接一起用。

---

## 推荐组合（申 Orbit / 展示）

| 用途 | 做法 |
|------|------|
| 申请表链接 | Vercel Live Demo |
| GitHub About 网站 | 同上 |
| 仓库第一印象 | README 大图 + Live Demo 按钮 |
| 备用访问 | GitHub Pages（可选） |

---

## 推送仓库命令参考

```bash
cd d:\code_workspace\cursor\xiaomi_tokenplan\nebula-sentinel
git init
git add .
git commit -m "feat: Nebula Sentinel v0.8.2 early access"
git branch -M main
git remote add origin https://github.com/<你的用户名>/nebula-sentinel-ai-soc.git
git push -u origin main
```

推送后记得在 GitHub 打开 **Pages（Actions）** 或去 **Vercel Import** 一次。
