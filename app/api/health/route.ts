import { NextResponse } from 'next/server'

export const dynamic = 'force-static'

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'nebula-sentinel',
    version: '0.8.2',
    cluster: process.env.SOC_CLUSTER_ID ?? 'prod-soc-01',
    agents: { online: 24, reasoning: 4 },
    timestamp: new Date().toISOString(),
  })
}
