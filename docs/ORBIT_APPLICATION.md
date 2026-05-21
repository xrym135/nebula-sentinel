# MiMo Orbit 申请 · 项目描述参考

## 项目名称

Nebula Sentinel — AI-native Security Operations Center

## 一句话介绍

基于 MiMo V2.5 多智能体推理能力构建的企业级 AI 安全运营平台（Early Access v0.8），覆盖威胁关联、攻击图谱、事件处置与 CVE 情报闭环。

## 项目解决的问题

传统 SOC 依赖人工关联海量日志、CVE 与攻击路径，响应慢、上下文碎片化。Nebula Sentinel 通过 MiMo V2.5 的**长上下文理解**、**多 Agent 并行推理**与 **MCP 工具调用**，在统一控制台完成威胁研判、攻击链还原与自动化响应编排。

## 核心功能

1. **Attack Graph** — 攻击链阶段关联与置信度分析  
2. **Multi-Agent Workflow** — Threat / CVE / Forensics / Response 四类 Agent 协同  
3. **AI Threat Analysis** — MiMo-V2.5-Reasoner 威胁模式识别与处置建议  
4. **Incident Timeline** — 多级别安全事件时间线与管理  
5. **CVE Intelligence** — 漏洞评分与修复工作流  
6. **Live Security Logs** — 实时安全日志与 MCP 工具审计  
7. **Agent Console & AI Assistant** — 命令行编排与安全问答  
8. **Dynamic Risk Engine** — 风险分、GPU、推理 Token 实时监控  

## 技术架构

- **前端**：Next.js 16 + React 19 + Tailwind CSS 4  
- **AI**：小米 MiMo V2.5（Reasoner、长上下文、并行工具调用）  
- **Agent**：MCP 工具网关 + 多 Agent 编排  
- **数据层**：事件与遥测接入 v0.9 规划中  

## 当前进度

- ✅ SOC 主控制台、攻击图谱、事件时间线、CVE 模块  
- ✅ 多 Agent 工作流、MCP 工具面板、AI 安全助手  
- ✅ 响应编排（隔离、报告导出、处置动作）  
- 🚧 MiMo API 全量对接、持久化事件库  

## 链接

- GitHub: `https://github.com/<你的用户名>/nebula-sentinel-ai-soc`  
- 在线预览: `https://<你的域名>.vercel.app`  

## 开发环境

**Cursor** + **MiMo V2.5**

## 申请注意

- 小米账号绑定邮箱需与申请表邮箱一致  
- 建议提交 3–4 张 `docs/screenshots/` 中的产品截图  
- 活动：https://100t.xiaomimimo.com  
