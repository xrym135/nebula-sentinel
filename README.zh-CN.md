# Nebula Sentinel

<p align="center">
  <strong>AI 原生安全运营中心</strong><br/>
  基于 <a href="https://www.xiaomimimo.com/">MiMo V2.5</a> · 抢先体验 <code>v0.8.2</code>
</p>

[English](README.md) | **简体中文**

---

Nebula Sentinel 是企业级 **AI SOC 平台**，整合威胁关联、多智能体推理、MCP 工具编排与自动化事件响应，依托 MiMo V2.5 长上下文与并行工具调用能力。

> **当前状态：** 抢先体验版 — 控制台与 Agent 工作流已可用，API 网关与持久化层将在 v0.9 陆续上线。

## 功能模块

- 攻击图谱 · 多 Agent 工作流 · AI 威胁分析
- 事件时间线 · CVE 情报 · MCP 工具网关
- Agent 控制台 · AI 安全助手 · 动态风险引擎

## 快速开始

```bash
git clone https://github.com/YOUR_USERNAME/nebula-sentinel-ai-soc.git
cd nebula-sentinel-ai-soc
npm install
npm run dev
```

访问 http://localhost:3000

## 在线展示

- [在 GitHub / Vercel 上部署与展示](docs/GITHUB_SHOWCASE.md)（**推荐阅读**）

## 文档

- [架构说明](docs/ARCHITECTURE.md)
- [API 规划](docs/API.md)
- [部署指南](docs/DEPLOYMENT.md)
- [MiMo Orbit 申请参考](docs/ORBIT_APPLICATION.md)
- [更新日志](CHANGELOG.md)

## 技术栈

Next.js 16 · React 19 · Tailwind CSS 4 · MiMo V2.5

## 许可证

[MIT](LICENSE)
