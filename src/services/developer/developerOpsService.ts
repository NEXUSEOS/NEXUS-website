import { developerFetch } from './developerPortalService'

export async function fetchDeveloperOperationsDashboard() {
  return developerFetch<{ dashboard: Record<string, unknown> }>('/v1/command-center/developer/operations')
}

export async function fetchCertificationQueue(status = 'pending') {
  return developerFetch<{ queue: Array<{ id: string; packageName: string; version: string; status: string; level: string }> }>(
    `/v1/command-center/developer/certification-queue?status=${encodeURIComponent(status)}`,
  )
}

export async function fetchDeveloperReputation(organizationId: string) {
  return developerFetch<{ reputation: { score: number; tier: string; certifications: number; downloads: number } }>(
    `/v1/organizations/${organizationId}/developer/reputation`,
  )
}

export async function fetchReputationLeaderboard() {
  return developerFetch<{ leaderboard: Array<{ organizationId: string; score: number; tier: string }> }>(
    '/v1/command-center/developer/reputation',
  )
}

export async function fetchUserAchievements(organizationId: string) {
  return developerFetch<{ achievements: Array<{ achievement: { achievementKey: string; title: string; points: number }; earnedAt: string }> }>(
    `/v1/organizations/${organizationId}/developer/achievements`,
  )
}

export async function fetchAchievementCatalog() {
  return developerFetch<{ achievements: Array<{ achievementKey: string; title: string; description: string; points: number }> }>(
    '/v1/developer/achievements',
  )
}

export async function aiDeveloperChat(organizationId: string, message: string, sessionId?: string) {
  return developerFetch<{ result: { content: string; sessionId?: string } }>(
    `/v1/organizations/${organizationId}/developer/ai/chat`,
    { method: 'POST', body: JSON.stringify({ message, sessionId }) },
  )
}

export async function aiGenerateBehavior(organizationId: string, description: string) {
  return developerFetch<{ result: { graph: Record<string, unknown> | null; response: { content: string } } }>(
    `/v1/organizations/${organizationId}/developer/ai/generate-behavior`,
    { method: 'POST', body: JSON.stringify({ description }) },
  )
}

export async function generateCodeSnippet(
  organizationId: string,
  template: 'handler' | 'test' | 'ros-bridge',
  name: string,
  language?: string,
) {
  return developerFetch<{ snippet: { language: string; filename: string; code: string } }>(
    `/v1/organizations/${organizationId}/developer/generate-code`,
    { method: 'POST', body: JSON.stringify({ template, name, language }) },
  )
}

export async function fetchExampleLibrary() {
  return developerFetch<{ examples: Array<{ slug: string; title: string; category: string; path: string }> }>(
    '/v1/developer/examples',
  )
}

export async function fetchPackageAnalytics(organizationId: string, packageSlug: string) {
  return developerFetch<{ analytics: Record<string, unknown> }>(
    `/v1/organizations/${organizationId}/developer/packages/${encodeURIComponent(packageSlug)}/analytics`,
  )
}

export async function listCustomNodes(organizationId: string) {
  return developerFetch<{ nodes: Array<{ typeId: string; label: string; category: string }> }>(
    `/v1/organizations/${organizationId}/developer/custom-nodes`,
  )
}

export async function inviteTeamMember(organizationId: string, email: string, role?: string) {
  return developerFetch<{ invite: { id: string; email: string; role: string } }>(
    `/v1/organizations/${organizationId}/developer/team/invites`,
    { method: 'POST', body: JSON.stringify({ email, role }) },
  )
}

export async function listTeamInvites(organizationId: string) {
  return developerFetch<{ invites: Array<{ id: string; email: string; role: string; status: string }> }>(
    `/v1/organizations/${organizationId}/developer/team/invites`,
  )
}
