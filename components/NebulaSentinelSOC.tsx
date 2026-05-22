'use client'

import {
  SocChatDrawer,
  SocConsoleDrawer,
  SocIncidentModal,
  SocToasts,
  agentBadgeClass,
  attackNodes,
  metrics,
  incidents,
  threats,
  MCP_TOOLS,
  threatBadgeClass,
  useSocInteractions,
} from './soc/SocUI'

function ActionBtn({
  children,
  onClick,
  variant = 'default',
  disabled,
}: {
  children: React.ReactNode
  onClick: () => void
  variant?: 'default' | 'primary' | 'danger'
  disabled?: boolean
}) {
  const styles = {
    default: 'border-white/10 bg-white/5 hover:bg-white/10 text-white/90',
    primary: 'border-cyan-400/30 bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-200',
    danger: 'border-red-400/30 bg-red-500/15 hover:bg-red-500/25 text-red-200',
  }
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all disabled:opacity-40 ${styles[variant]}`}
    >
      {children}
    </button>
  )
}

export default function NebulaSentinelSOC() {
  const s = useSocInteractions()

  return (
    <div className="min-h-screen bg-[#030712] text-white overflow-x-hidden relative">
      <SocToasts toasts={s.toasts} />
      <SocConsoleDrawer
        open={s.consoleOpen}
        onClose={() => s.setConsoleOpen(false)}
        terminalLines={s.terminalLines}
        onRunCommand={s.runConsoleCommand}
      />
      <SocChatDrawer
        open={s.chatOpen}
        onClose={() => s.setChatOpen(false)}
        messages={s.chatMessages}
        onSend={s.sendChat}
        busy={s.chatBusy}
      />
      <SocIncidentModal
        incident={s.selectedIncident}
        onClose={() => s.setSelectedIncident(null)}
        onAction={s.incidentAction}
      />

      {s.metricModal && (
        <div className="fixed inset-0 z-[95] flex items-center justify-center p-6">
          <button
            type="button"
            className="absolute inset-0 bg-black/70"
            onClick={() => s.setMetricModal(null)}
          />
          <div className="relative rounded-3xl border border-white/10 bg-[#0c1222] p-8 max-w-md">
            <h3 className="text-xl font-bold">{s.metricModal}</h3>
            <p className="mt-4 text-white/60 leading-relaxed">
              {metrics.find((m) => m.title === s.metricModal)?.detail}
            </p>
            <button
              type="button"
              className="mt-6 px-5 py-2 rounded-xl border border-cyan-400/30 text-cyan-300"
              onClick={() => s.setMetricModal(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(6,182,212,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.18),transparent_35%)]" />
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:36px_36px]" />

      <header className="relative z-10 border-b border-white/10 bg-black/30 backdrop-blur-xl">
        <div className="max-w-[1800px] mx-auto px-6 py-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-xs tracking-[0.35em] uppercase text-cyan-400">
                Enterprise Security Operations
              </div>
              <h1 className="text-3xl font-black mt-2 bg-gradient-to-r from-cyan-300 via-white to-purple-400 bg-clip-text text-transparent">
                Nebula Sentinel
              </h1>
              <p className="text-white/40 text-sm mt-1">
                AI-native SOC Platform · v0.8.2
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="px-4 py-2 rounded-2xl border border-amber-400/20 bg-amber-500/10">
                <div className="text-[10px] uppercase tracking-widest text-amber-200/70">Risk</div>
                <div className="text-2xl font-black text-amber-300">{s.riskScore}</div>
              </div>
              <div className="px-4 py-2 rounded-2xl border border-green-400/20 bg-green-500/10 text-green-300 text-sm">
                Production · Online
              </div>
              <div className="px-4 py-2 rounded-2xl border border-purple-400/20 bg-purple-500/10 text-purple-300 text-sm">
                {s.mitigationStatus}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-white/5">
            <ActionBtn variant="primary" onClick={() => s.setConsoleOpen(true)}>
              Launch Console
            </ActionBtn>
            <ActionBtn variant="primary" onClick={() => s.setChatOpen(true)}>
              AI Assistant
            </ActionBtn>
            <ActionBtn onClick={s.runAnalysis} disabled={s.analysisRunning}>
              {s.analysisRunning ? 'Analyzing…' : 'Run Analysis'}
            </ActionBtn>
            <ActionBtn onClick={s.isolateWorkload}>Isolate Workload</ActionBtn>
            <ActionBtn onClick={s.exportReport}>Export Report</ActionBtn>
            <ActionBtn
              onClick={() => {
                s.setStreamPaused(!s.streamPaused)
                s.pushToast(s.streamPaused ? 'Live stream resumed' : 'Live stream paused', 'info')
              }}
            >
              {s.streamPaused ? 'Resume Stream' : 'Pause Stream'}
            </ActionBtn>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-[1800px] mx-auto px-6 py-6 space-y-6">
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {metrics.map((metric) => (
            <button
              key={metric.title}
              type="button"
              onClick={() => s.setMetricModal(metric.title)}
              className="text-left rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-xl p-6 relative overflow-hidden hover:border-cyan-400/30 transition-colors cursor-pointer group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl rounded-full" />
              <div className="text-xs uppercase tracking-[0.25em] text-white/50 relative z-10">
                {metric.title}
              </div>
              <div className="text-5xl font-black mt-5 bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent relative z-10">
                {metric.value}
              </div>
              <div className="mt-3 text-xs text-cyan-400/0 group-hover:text-cyan-400/80 transition-colors relative z-10">
                Click for drill-down →
              </div>
            </button>
          ))}
        </section>

        <section className="grid grid-cols-1 xl:grid-cols-[320px_1fr_420px] gap-6">
          <aside className="space-y-6">
            <div className="rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-sm text-cyan-300 uppercase tracking-widest">Enterprise Assets</div>
                  <div className="text-white/50 text-xs mt-1">Click region to focus analysis</div>
                </div>
                <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
              </div>
              <div className="space-y-4">
                {threats.map((item) => (
                  <button
                    key={item.region}
                    type="button"
                    onClick={() => {
                      s.pushLog(`[focus] telemetry drill-down: ${item.region}`)
                      s.pushToast(`Focused analysis on ${item.region}`, 'info')
                    }}
                    className="w-full text-left rounded-2xl border border-white/10 bg-black/30 p-4 flex items-center justify-between hover:border-cyan-400/30 transition-colors"
                  >
                    <div>
                      <div className="font-medium text-sm">{item.region}</div>
                      <div className="text-xs text-white/50 mt-1">Live telemetry</div>
                    </div>
                    <div className={`text-xs px-3 py-2 rounded-full border ${threatBadgeClass(item.level)}`}>
                      {item.level}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <section className="space-y-6">
            <div className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b border-white/10 bg-black/20">
                <div className="flex gap-2">
                  {(
                    [
                      ['graph', 'Attack Graph'],
                      ['workflow', 'Agent Workflow'],
                      ['mcp', 'MCP Tools'],
                    ] as const
                  ).map(([tab, label]) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => s.setMainTab(tab)}
                      className={`px-4 py-2 rounded-xl text-sm border transition-colors ${
                        s.mainTab === tab
                          ? 'bg-cyan-500/20 border-cyan-400/40 text-cyan-200'
                          : 'border-white/10 text-white/50 hover:text-white/80'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="text-white/60">
                    Tokens:{' '}
                    <span className="text-cyan-300 tabular-nums">
                      {s.inferenceTokens.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-white/60">
                    GPU: <span className="text-purple-300">{s.systemLoad}%</span>
                  </div>
                </div>
              </div>

              {s.mainTab === 'graph' && (
                <div className="p-8 min-h-[520px] relative">
                  <div className="relative flex flex-col items-center gap-8">
                    {attackNodes.map((node, index) => (
                      <div key={node.id} className="flex flex-col items-center w-full max-w-md">
                        <button
                          type="button"
                          onClick={() => {
                            s.setSelectedNode(index)
                            s.pushLog(`[graph] selected stage: ${node.label}`)
                          }}
                          className={`w-full px-8 py-5 rounded-3xl border backdrop-blur-xl transition-all text-left ${
                            s.selectedNode === index
                              ? 'border-cyan-400/60 bg-cyan-500/20 scale-[1.02] shadow-[0_0_50px_rgba(34,211,238,0.25)]'
                              : 'border-cyan-400/20 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 hover:scale-[1.01]'
                          }`}
                        >
                          <div className="text-lg font-semibold">{node.label}</div>
                          <div className="text-xs text-white/50 mt-2">
                            Confidence: {94 - index}% · click for intel
                          </div>
                        </button>
                        {index !== attackNodes.length - 1 && (
                          <div className="h-12 w-[2px] bg-gradient-to-b from-cyan-400 to-purple-500 relative">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-cyan-400 animate-ping" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 rounded-2xl border border-white/10 bg-black/40 p-5">
                    <div className="text-xs uppercase tracking-widest text-cyan-400 mb-2">
                      Stage Intelligence
                    </div>
                    <p className="text-sm text-white/70 leading-relaxed">
                      {attackNodes[s.selectedNode].detail}
                    </p>
                    <div className="flex gap-2 mt-4">
                      <ActionBtn
                        variant="primary"
                        onClick={() => s.pushToast(`Deep scan on ${attackNodes[s.selectedNode].label}`, 'info')}
                      >
                        Deep Scan
                      </ActionBtn>
                      <ActionBtn onClick={() => s.setChatOpen(true)}>Ask AI</ActionBtn>
                    </div>
                  </div>
                </div>
              )}

              {s.mainTab === 'workflow' && (
                <div className="p-8 min-h-[520px] space-y-4">
                  {s.agents.map((agent) => (
                    <button
                      key={agent.name}
                      type="button"
                      onClick={() =>
                        s.setSelectedAgent(s.selectedAgent === agent.name ? null : agent.name)
                      }
                      className="w-full rounded-2xl border border-white/10 bg-black/30 p-5 text-left hover:border-purple-400/30 transition-colors"
                    >
                      <div className="flex justify-between items-center">
                        <div className="font-semibold">{agent.name}</div>
                        <span className={`px-3 py-1 rounded-full text-xs border ${agentBadgeClass(agent.color)}`}>
                          {agent.status}
                        </span>
                      </div>
                      {s.selectedAgent === agent.name && (
                        <div className="mt-4 pt-4 border-t border-white/10">
                          <div className="text-xs text-white/50 mb-2">Registered tools</div>
                          <div className="flex flex-wrap gap-2">
                            {agent.tools.map((tool) => (
                              <button
                                key={tool}
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  s.invokeMcpTool(tool)
                                }}
                                className="text-xs px-3 py-2 rounded-lg bg-purple-500/10 border border-purple-400/20 text-purple-200 hover:bg-purple-500/20"
                              >
                                {tool}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}

              {s.mainTab === 'mcp' && (
                <div className="p-8 min-h-[520px] grid gap-4 sm:grid-cols-2">
                  {MCP_TOOLS.map((tool) => (
                    <div
                      key={tool.id}
                      className="rounded-2xl border border-white/10 bg-black/30 p-5 flex flex-col"
                    >
                      <code className="text-cyan-300 text-sm">{tool.label}</code>
                      <p className="text-white/50 text-sm mt-2 flex-1">{tool.desc}</p>
                      <ActionBtn
                        variant="primary"
                        onClick={() => s.invokeMcpTool(tool.id)}
                      >
                        Invoke Tool
                      </ActionBtn>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-xl p-6">
              <div className="flex justify-between mb-4">
                <div className="text-sm text-cyan-300 uppercase tracking-widest">AI Threat Analysis</div>
                <ActionBtn variant="danger" onClick={s.isolateWorkload}>
                  Auto-Mitigate
                </ActionBtn>
              </div>
              <div className="space-y-4 text-sm">
                <div className="text-3xl font-black text-cyan-300">96%</div>
                <p className="text-white/60">APT-style lateral movement → critical DB risk</p>
                <ul className="space-y-1 text-white/70">
                  <li>• isolate kubernetes pod</li>
                  <li>• revoke compromised token</li>
                </ul>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-xl p-6">
              <div className="flex justify-between mb-4">
                <div className="text-sm text-cyan-300 uppercase tracking-widest font-mono">Live Logs</div>
                <button
                  type="button"
                  onClick={s.clearLogs}
                  className="text-xs text-white/40 hover:text-cyan-300"
                >
                  Clear
                </button>
              </div>
              <div className="space-y-2 text-sm font-mono max-h-[220px] overflow-y-auto">
                {s.activeLogs.map((log, i) => (
                  <div key={`${log}-${i}`} className="rounded-xl border border-white/10 bg-black/30 p-2 text-green-300 text-xs">
                    $ {log}
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </section>

        <section className="grid grid-cols-1 xl:grid-cols-[1fr_420px] gap-6">
          <div className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl p-8">
            <div className="text-sm uppercase tracking-[0.3em] text-cyan-300 mb-6">
              Incident Timeline · click to open
            </div>
            <div className="space-y-6">
              {incidents.map((incident, index) => (
                <button
                  key={incident.id}
                  type="button"
                  onClick={() => s.setSelectedIncident(incident)}
                  className="w-full flex gap-6 text-left group"
                >
                  <div className="flex flex-col items-center pt-2">
                    <div className="w-5 h-5 rounded-full bg-cyan-400 group-hover:scale-125 transition-transform" />
                    {index !== incidents.length - 1 && (
                      <div className="w-[2px] flex-1 bg-gradient-to-b from-cyan-400 to-purple-500 min-h-[60px] mt-2" />
                    )}
                  </div>
                  <div className="flex-1 rounded-[28px] border border-white/10 bg-black/30 p-6 group-hover:border-cyan-400/40 transition-all">
                    <div className="text-lg font-bold">{incident.title}</div>
                    <div className="text-sm text-white/50">{incident.id} — View details & actions →</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl p-8">
            <div className="text-sm uppercase tracking-[0.3em] text-cyan-300">CVE Intelligence</div>
            <div className="space-y-5 mt-8">
              {[
                { cve: 'CVE-2026-3812', score: '9.8', type: 'RCE Vulnerability' },
                { cve: 'CVE-2026-2881', score: '8.9', type: 'Container Escape' },
                { cve: 'CVE-2026-1042', score: '7.2', type: 'Privilege Escalation' },
              ].map((item) => (
                <div
                  key={item.cve}
                  className={`rounded-[28px] border p-6 transition-all ${
                    s.patchedCves.has(item.cve)
                      ? 'border-emerald-400/30 bg-emerald-500/5 opacity-70'
                      : 'border-white/10 bg-black/30'
                  }`}
                >
                  <div className="flex justify-between">
                    <div>
                      <div className="text-lg font-bold text-cyan-300">{item.cve}</div>
                      <div className="text-sm text-white/50 mt-1">{item.type}</div>
                    </div>
                    <div className="text-4xl font-black text-red-300">{item.score}</div>
                  </div>
                  <button
                    type="button"
                    disabled={s.patchedCves.has(item.cve)}
                    onClick={() => {
                      s.setPatchedCves((prev) => new Set(prev).add(item.cve))
                      s.pushLog(`[cve] remediation workflow started: ${item.cve}`)
                      s.pushToast(`${item.cve} — patch workflow initiated`, 'success')
                    }}
                    className="mt-4 w-full py-2 rounded-xl border border-emerald-400/30 text-emerald-300 text-sm hover:bg-emerald-500/10 disabled:opacity-40"
                  >
                    {s.patchedCves.has(item.cve) ? 'Remediated ✓' : 'Start Remediation'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/10 py-4 text-center text-white/30 text-xs">
        Nebula Sentinel v0.8.2 · Multi-Agent Security Platform
      </footer>

    </div>
  )
}
