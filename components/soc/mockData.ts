export const incidents = [
  {
    id: 'INC-2026-8821',
    severity: 'CRITICAL',
    title: 'Kubernetes Privilege Escalation',
    status: 'investigating',
    summary:
      'MiMo agents detected container breakout followed by cluster-admin binding. Correlation across 18 nodes.',
    actions: ['Isolate Pod', 'Revoke SA Token', 'Snapshot Node'],
  },
  {
    id: 'INC-2026-7712',
    severity: 'HIGH',
    title: 'Credential Dump Activity',
    status: 'contained',
    summary: 'LSASS-style memory access pattern on Windows jump host. Contained via network segmentation.',
    actions: ['Force Password Reset', 'Block SMB Egress'],
  },
  {
    id: 'INC-2026-6128',
    severity: 'MEDIUM',
    title: 'Suspicious East-West Traffic',
    status: 'monitoring',
    summary: 'Anomalous lateral scan between payment subnet and staging APIs. Monitoring enhanced.',
    actions: ['Enable Micro-segmentation', 'Increase Log Verbosity'],
  },
] as const

export const metrics = [
  { title: 'Threat Events', value: '18.2M', detail: 'Last 24h ingest from 42 data sources' },
  { title: 'Active Agents', value: '24', detail: '4 reasoning · 12 tool-calling · 8 idle' },
  { title: 'Attack Paths', value: '142', detail: '12 critical paths under active review' },
  { title: 'Realtime Queries', value: '8.9K/s', detail: 'Vector + keyword hybrid retrieval' },
] as const

export const AGENT_POOL = [
  {
    name: 'Threat Agent',
    status: 'reasoning',
    color: 'cyan' as const,
    tools: ['correlate_iocs', 'score_anomaly', 'build_attack_graph'],
  },
  {
    name: 'CVE Agent',
    status: 'tool-calling',
    color: 'purple' as const,
    tools: ['fetch_nvd', 'match_sbom', 'prioritize_patch'],
  },
  {
    name: 'Forensics Agent',
    status: 'running',
    color: 'emerald' as const,
    tools: ['parse_audit_log', 'timeline_rebuild', 'memory_artifact_scan'],
  },
  {
    name: 'Response Agent',
    status: 'completed',
    color: 'orange' as const,
    tools: ['isolate_workload', 'rotate_secrets', 'generate_incident_report'],
  },
]

export const STATUS_CYCLE = ['idle', 'reasoning', 'tool-calling', 'running', 'completed'] as const

export const LOG_POOL = [
  '[14:33:01] anomaly score increased above threshold',
  '[14:33:04] suspicious IAM policy modification',
  '[14:33:08] AI response agent triggered mitigation',
  '[14:33:12] outbound traffic redirected to sandbox',
  '[14:33:16] credential rotation completed successfully',
  '[14:33:21] attack graph confidence recalculated',
  '[14:33:25] MCP tool: query_threat_intel invoked',
  '[14:33:29] parallel agent pipeline stage 3/4 complete',
]

export const threats = [
  { region: 'Tokyo Cluster', level: 'CRITICAL' as const },
  { region: 'US-East Gateway', level: 'HIGH' as const },
  { region: 'Singapore API', level: 'MEDIUM' as const },
]

export const attackNodes = [
  {
    id: 'node-0',
    label: 'External IP',
    detail: '185.220.x.x — Tor exit node, 847 prior blocks',
  },
  {
    id: 'node-1',
    label: 'NGINX Exploit',
    detail: 'CVE-2026-3812 exploit attempt on /api/admin',
  },
  {
    id: 'node-2',
    label: 'Container Escape',
    detail: 'runc breakout via malicious cgroup config',
  },
  {
    id: 'node-3',
    label: 'Credential Dump',
    detail: 'K8s service account token exfiltrated',
  },
  {
    id: 'node-4',
    label: 'Lateral Movement',
    detail: 'East-west scan to payment namespace',
  },
  {
    id: 'node-5',
    label: 'RDS Database Access',
    detail: 'PostgreSQL admin role escalation attempt',
  },
]

export const MCP_TOOLS = [
  { id: 'query_threat_intel', label: 'query_threat_intel', desc: 'Fetch IOC reputation & ATT&CK mapping' },
  { id: 'search_logs', label: 'search_logs', desc: 'Hybrid search over 18.4TB security logs' },
  { id: 'isolate_pod', label: 'isolate_pod', desc: 'NetworkPolicy deny-all on target workload' },
  { id: 'generate_report', label: 'generate_report', desc: 'Export MiMo reasoning trace as PDF/JSON' },
  { id: 'run_sandbox', label: 'run_sandbox', desc: 'Detonate sample in isolated environment' },
]

export const CHAT_SEED = [
  {
    role: 'assistant' as const,
    text: 'Nebula Sentinel online. I can correlate incidents, explain attack paths, and coordinate response workflows. Try a quick command below.',
  },
]

export const QUICK_COMMANDS = [
  'Summarize critical incident',
  'Explain attack graph path',
  'List suggested mitigations',
  'Run parallel agent analysis',
]
