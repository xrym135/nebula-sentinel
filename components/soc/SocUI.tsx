'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import {
  AGENT_POOL,
  CHAT_SEED,
  LOG_POOL,
  MCP_TOOLS,
  QUICK_COMMANDS,
  STATUS_CYCLE,
  attackNodes,
  metrics,
  incidents,
  threats,
} from './data'

type Toast = { id: number; message: string; type: 'info' | 'success' | 'warn' }
type ChatMsg = { role: 'user' | 'assistant'; text: string }
type MainTab = 'graph' | 'workflow' | 'mcp'

function agentBadgeClass(color: (typeof AGENT_POOL)[number]['color']) {
  const map = {
    cyan: 'bg-cyan-500/10 text-cyan-300 border-cyan-400/20',
    purple: 'bg-purple-500/10 text-purple-300 border-purple-400/20',
    emerald: 'bg-emerald-500/10 text-emerald-300 border-emerald-400/20',
    orange: 'bg-orange-500/10 text-orange-300 border-orange-400/20',
  }
  return map[color]
}

function threatBadgeClass(level: string) {
  if (level === 'CRITICAL') return 'bg-red-500/10 text-red-300 border-red-400/20'
  if (level === 'HIGH') return 'bg-orange-500/10 text-orange-300 border-orange-400/20'
  return 'bg-yellow-500/10 text-yellow-300 border-yellow-400/20'
}

function generateAssistantReply(input: string): string {
  const q = input.toLowerCase()
  if (q.includes('incident') || q.includes('summarize'))
    return 'INC-2026-8821: K8s privilege escalation chain. Confidence 96%. Response Agent recommends pod isolation + credential rotation. 3 related CVEs linked.'
  if (q.includes('graph') || q.includes('path') || q.includes('attack'))
    return 'Primary path: External IP → NGINX Exploit → Container Escape → Credential Dump → Lateral Movement → RDS. AI engine correlated 6 stages with 94% confidence.'
  if (q.includes('mitigation') || q.includes('suggest'))
    return 'Autonomous mitigations queued: (1) isolate pod payment-api-7f2, (2) revoke SA token, (3) block 185.220.0.0/16, (4) rotate RDS credentials. Awaiting operator confirmation on playbook #SOC-441.'
  if (q.includes('parallel') || q.includes('agent') || q.includes('analysis'))
    return 'Launching 4-agent parallel pipeline: Threat → CVE → Forensics → Response. Estimated 2.1s. Monitor Multi-Agent Workflow for live status.'
  return `Query processed. Context window: 1M tokens. Correlation updated for: "${input}".`
}

export function SocToasts({ toasts }: { toasts: Toast[] }) {
  return (
    <div className="fixed top-20 right-6 z-[100] flex flex-col gap-2 max-w-sm">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`px-4 py-3 rounded-2xl border backdrop-blur-xl text-sm shadow-xl [animation:slideIn_0.3s_ease-out] ${
            t.type === 'success'
              ? 'bg-emerald-500/20 border-emerald-400/30 text-emerald-100'
              : t.type === 'warn'
                ? 'bg-amber-500/20 border-amber-400/30 text-amber-100'
                : 'bg-cyan-500/20 border-cyan-400/30 text-cyan-100'
          }`}
        >
          {t.message}
        </div>
      ))}
    </div>
  )
}

export function SocConsoleDrawer({
  open,
  onClose,
  terminalLines,
  onRunCommand,
}: {
  open: boolean
  onClose: () => void
  terminalLines: string[]
  onRunCommand: (cmd: string) => void
}) {
  const [cmd, setCmd] = useState('')

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[90] flex justify-end">
      <button
        type="button"
        className="flex-1 bg-black/60 backdrop-blur-sm"
        aria-label="Close console"
        onClick={onClose}
      />
      <aside className="w-full max-w-xl h-full bg-[#0a0f1a] border-l border-white/10 flex flex-col shadow-2xl">
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-widest text-cyan-400">Security Console</div>
            <div className="text-lg font-bold mt-1">Agent Terminal</div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-xl border border-white/10 hover:bg-white/10"
          >
            ✕
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 font-mono text-sm space-y-2">
          {terminalLines.map((line, i) => (
            <div key={`${line}-${i}`} className="text-green-300/90">
              <span className="text-cyan-500">nebula@soc</span>
              <span className="text-white/40">:</span> {line}
            </div>
          ))}
        </div>
        <form
          className="p-4 border-t border-white/10 flex gap-2"
          onSubmit={(e) => {
            e.preventDefault()
            if (!cmd.trim()) return
            onRunCommand(cmd.trim())
            setCmd('')
          }}
        >
          <input
            value={cmd}
            onChange={(e) => setCmd(e.target.value)}
            placeholder="agent run correlate --incident INC-2026-8821"
            className="flex-1 rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-sm font-mono focus:outline-none focus:border-cyan-400/50"
          />
          <button
            type="submit"
            className="px-5 py-3 rounded-xl bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 hover:bg-cyan-500/30"
          >
            Run
          </button>
        </form>
        <div className="px-4 pb-4 flex flex-wrap gap-2">
          {['status', 'agents list', 'mitigate --auto'].map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => onRunCommand(preset)}
              className="text-xs px-3 py-1.5 rounded-lg border border-white/10 text-white/60 hover:text-cyan-300 hover:border-cyan-400/30"
            >
              {preset}
            </button>
          ))}
        </div>
      </aside>
    </div>
  )
}

export function SocChatDrawer({
  open,
  onClose,
  messages,
  onSend,
  busy,
}: {
  open: boolean
  onClose: () => void
  messages: ChatMsg[]
  onSend: (text: string) => void
  busy: boolean
}) {
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[90] flex justify-end">
      <button type="button" className="flex-1 bg-black/60" aria-label="Close chat" onClick={onClose} />
      <aside className="w-full max-w-md h-full bg-[#0a0f1a] border-l border-white/10 flex flex-col">
        <div className="px-6 py-5 border-b border-white/10">
          <div className="text-xs uppercase tracking-widest text-purple-400">AI Security Assistant</div>
          <div className="text-lg font-bold mt-1">Security Assistant</div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`rounded-2xl p-4 text-sm leading-relaxed ${
                m.role === 'user'
                  ? 'ml-8 bg-cyan-500/10 border border-cyan-400/20'
                  : 'mr-4 bg-white/5 border border-white/10'
              }`}
            >
              {m.text}
            </div>
          ))}
          {busy && (
            <div className="text-xs text-white/40 animate-pulse">Analyzing...</div>
          )}
          <div ref={bottomRef} />
        </div>
        <div className="px-4 pb-2 flex flex-wrap gap-2">
          {QUICK_COMMANDS.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => onSend(q)}
              className="text-xs px-3 py-1.5 rounded-full border border-purple-400/20 text-purple-200/80 hover:bg-purple-500/10"
            >
              {q}
            </button>
          ))}
        </div>
        <form
          className="p-4 border-t border-white/10 flex gap-2"
          onSubmit={(e) => {
            e.preventDefault()
            if (!input.trim() || busy) return
            onSend(input.trim())
            setInput('')
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about threats, CVEs, mitigations..."
            className="flex-1 rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-purple-400/50"
          />
          <button
            type="submit"
            disabled={busy}
            className="px-4 py-3 rounded-xl bg-purple-500/20 border border-purple-400/30 text-purple-200 disabled:opacity-40"
          >
            Send
          </button>
        </form>
      </aside>
    </div>
  )
}

export function SocIncidentModal({
  incident,
  onClose,
  onAction,
}: {
  incident: (typeof incidents)[number] | null
  onClose: () => void
  onAction: (action: string) => void
}) {
  if (!incident) return null

  return (
    <div className="fixed inset-0 z-[95] flex items-center justify-center p-6">
      <button type="button" className="absolute inset-0 bg-black/70" aria-label="Close" onClick={onClose} />
      <div className="relative w-full max-w-2xl rounded-[32px] border border-white/10 bg-[#0c1222] p-8 shadow-2xl">
        <div className="flex justify-between items-start gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-cyan-400">{incident.id}</div>
            <h2 className="text-2xl font-bold mt-2">{incident.title}</h2>
            <p className="text-white/60 mt-4 leading-relaxed">{incident.summary}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-xl border border-white/10 hover:bg-white/10 shrink-0"
          >
            ✕
          </button>
        </div>
        <div className="flex gap-3 mt-6">
          <span className="px-3 py-1.5 rounded-full bg-red-500/10 border border-red-400/20 text-red-300 text-xs">
            {incident.severity}
          </span>
          <span className="px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-xs">
            {incident.status}
          </span>
        </div>
        <div className="mt-8">
          <div className="text-sm text-white/50 mb-4">Response actions</div>
          <div className="flex flex-wrap gap-3">
            {incident.actions.map((action) => (
              <button
                key={action}
                type="button"
                onClick={() => onAction(action)}
                className="px-5 py-3 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 text-emerald-200 hover:bg-emerald-500/20 transition-colors"
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function useSocInteractions() {
  const [agents, setAgents] = useState(AGENT_POOL)
  const [activeLogs, setActiveLogs] = useState([
    '[14:32:01] abnormal API token detected',
    '[14:32:04] suspicious outbound traffic identified',
    '[14:32:09] lateral movement pattern matched',
    '[14:32:11] kubernetes privilege escalation detected',
    '[14:32:14] response agent isolating workload',
  ])
  const [systemLoad, setSystemLoad] = useState(82)
  const [riskScore, setRiskScore] = useState(94)
  const [mitigationStatus, setMitigationStatus] = useState('IN PROGRESS')
  const [inferenceTokens, setInferenceTokens] = useState(18_392_201)
  const [streamPaused, setStreamPaused] = useState(false)
  const [consoleOpen, setConsoleOpen] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [mainTab, setMainTab] = useState<MainTab>('graph')
  const [selectedNode, setSelectedNode] = useState(0)
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null)
  const [selectedIncident, setSelectedIncident] = useState<(typeof incidents)[number] | null>(null)
  const [metricModal, setMetricModal] = useState<string | null>(null)
  const [analysisRunning, setAnalysisRunning] = useState(false)
  const [patchedCves, setPatchedCves] = useState<Set<string>>(new Set())
  const [toasts, setToasts] = useState<Toast[]>([])
  const [terminalLines, setTerminalLines] = useState([
    'Nebula Sentinel Agent Console v0.8.2',
    'Nebula Sentinel Agent Console v0.8.2 · cluster prod-soc-01',
  ])
  const [chatMessages, setChatMessages] = useState<ChatMsg[]>(CHAT_SEED)
  const [chatBusy, setChatBusy] = useState(false)
  const toastId = useRef(0)

  const pushToast = useCallback((message: string, type: Toast['type'] = 'info') => {
    const id = ++toastId.current
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000)
  }, [])

  const pushLog = useCallback((line: string) => {
    setActiveLogs((prev) => [line, ...prev.slice(0, 5)])
  }, [])

  const clearLogs = useCallback(() => {
    setActiveLogs([])
    pushToast('Log buffer cleared', 'info')
  }, [pushToast])

  useEffect(() => {
    if (streamPaused) return

    const logInterval = setInterval(() => {
      const newLog = LOG_POOL[Math.floor(Math.random() * LOG_POOL.length)]
      setActiveLogs((prev) => [newLog, ...prev.slice(0, 5)])
      setSystemLoad(78 + Math.floor(Math.random() * 12))
      setRiskScore(88 + Math.floor(Math.random() * 10))
      setInferenceTokens((n) => n + Math.floor(Math.random() * 8000) + 1200)
    }, 3000)

    const agentInterval = setInterval(() => {
      setAgents((prev) =>
        prev.map((agent) => ({
          ...agent,
          status: STATUS_CYCLE[Math.floor(Math.random() * STATUS_CYCLE.length)],
        })),
      )
      setMitigationStatus((s) =>
        s === 'IN PROGRESS' ? 'APPLYING PATCHES' : s === 'APPLYING PATCHES' ? 'VERIFIED' : 'IN PROGRESS',
      )
    }, 2500)

    return () => {
      clearInterval(logInterval)
      clearInterval(agentInterval)
    }
  }, [streamPaused])

  const runAnalysis = () => {
    if (analysisRunning) return
    setAnalysisRunning(true)
    pushToast('Parallel agent analysis started…', 'info')
    pushLog('[action] user triggered Run Analysis')
    setAgents((prev) => prev.map((a) => ({ ...a, status: 'running' as const })))
    setTimeout(() => {
      setAnalysisRunning(false)
      setAgents(AGENT_POOL.map((a, i) => ({ ...a, status: STATUS_CYCLE[(i + 3) % 5] })))
      pushToast('Analysis complete — 6-stage attack path confirmed', 'success')
      pushLog('[14:34:00] multi-agent analysis completed — confidence 97%')
    }, 2200)
  }

  const isolateWorkload = () => {
    setMitigationStatus('ISOLATING')
    pushLog('[14:34:02] response agent: NetworkPolicy applied to payment-api')
    pushToast('Workload isolated — NetworkPolicy applied', 'success')
    setTimeout(() => setMitigationStatus('CONTAINED'), 1500)
  }

  const exportReport = () => {
    const report = {
      product: 'Nebula Sentinel',
      model: 'Nebula-Reasoner',
      generatedAt: new Date().toISOString(),
      riskScore,
      incidents,
      attackPath: attackNodes.map((n) => n.label),
      agents: agents.map((a) => ({ name: a.name, status: a.status })),
    }
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `nebula-sentinel-report-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
    pushToast('Incident report downloaded (JSON)', 'success')
  }

  const invokeMcpTool = (toolId: string) => {
    pushLog(`[mcp] invoke ${toolId} → 200 OK · 142ms`)
    pushToast(`MCP tool "${toolId}" executed`, 'success')
    setInferenceTokens((n) => n + 4200)
  }

  const runConsoleCommand = (cmd: string) => {
    setTerminalLines((prev) => [...prev, `> ${cmd}`])
    const lower = cmd.toLowerCase()
    if (lower === 'status') {
      setTerminalLines((prev) => [
        ...prev,
        `SOC: online | Risk: ${riskScore} | GPU: ${systemLoad}% | Mitigation: ${mitigationStatus}`,
      ])
    } else if (lower.includes('agents')) {
      setTerminalLines((prev) => [
        ...prev,
        ...agents.map((a) => `  ${a.name}: ${a.status}`),
      ])
    } else if (lower.includes('mitigate')) {
      isolateWorkload()
      setTerminalLines((prev) => [...prev, 'mitigation pipeline triggered'])
    } else {
      setTerminalLines((prev) => [
        ...prev,
        `Command accepted · routed to agent orchestrator · job_id=${Date.now().toString(36)}`,
      ])
    }
  }

  const sendChat = (text: string) => {
    setChatMessages((prev) => [...prev, { role: 'user', text }])
    setChatBusy(true)
    setTimeout(() => {
      setChatMessages((prev) => [...prev, { role: 'assistant', text: generateAssistantReply(text) }])
      setChatBusy(false)
    }, 900)
  }

  const incidentAction = (action: string) => {
    pushLog(`[incident] ${action} — dispatched to Response Agent`)
    pushToast(`${action} queued on Response Agent`, 'success')
    setSelectedIncident(null)
  }

  return {
    agents,
    activeLogs,
    systemLoad,
    riskScore,
    mitigationStatus,
    inferenceTokens,
    streamPaused,
    setStreamPaused,
    consoleOpen,
    setConsoleOpen,
    chatOpen,
    setChatOpen,
    mainTab,
    setMainTab,
    selectedNode,
    setSelectedNode,
    selectedAgent,
    setSelectedAgent,
    selectedIncident,
    setSelectedIncident,
    metricModal,
    setMetricModal,
    analysisRunning,
    patchedCves,
    setPatchedCves,
    toasts,
    terminalLines,
    chatMessages,
    chatBusy,
    pushToast,
    pushLog,
    runAnalysis,
    isolateWorkload,
    exportReport,
    invokeMcpTool,
    runConsoleCommand,
    sendChat,
    incidentAction,
    clearLogs,
  }
}

export {
  agentBadgeClass,
  threatBadgeClass,
  attackNodes,
  metrics,
  incidents,
  threats,
  MCP_TOOLS,
}
