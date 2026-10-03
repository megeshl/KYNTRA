import {
  User, Skill, Project, Opportunity, Team, CollaborationRequest,
  SkillGap, Activity, CommunityEvent, LensAnalysisResult,
  VoiceCommandIntent, TeamAssemblyResponse
} from '../types';

const API_BASE = '/api';

export async function fetchOverview() {
  const res = await fetch(`${API_BASE}/community/overview`);
  return res.json();
}

export async function fetchMembers(): Promise<User[]> {
  const res = await fetch(`${API_BASE}/community/members`);
  return res.json();
}

export async function fetchSkills(): Promise<Skill[]> {
  const res = await fetch(`${API_BASE}/community/skills`);
  return res.json();
}

export async function fetchProjects(): Promise<Project[]> {
  const res = await fetch(`${API_BASE}/community/projects`);
  return res.json();
}

export async function fetchGraph(filter: string = 'all') {
  const res = await fetch(`${API_BASE}/community/graph?filter=${filter}`);
  return res.json();
}

export async function fetchOpportunities(): Promise<Opportunity[]> {
  const res = await fetch(`${API_BASE}/opportunities`);
  return res.json();
}

export async function runOpportunityAnalysis() {
  const res = await fetch(`${API_BASE}/opportunities/analyze`, { method: 'POST' });
  return res.json();
}

export async function assembleTeamApi(projectName: string, requiredSkillNames: string[]): Promise<TeamAssemblyResponse> {
  const res = await fetch(`${API_BASE}/assemble`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ projectName, requiredSkillNames })
  });
  return res.json();
}

export async function formTeamApi(payload: { teamName: string; projectName: string; members: any[] }) {
  const res = await fetch(`${API_BASE}/teams`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return res.json();
}

export async function fetchTeams(): Promise<Team[]> {
  const res = await fetch(`${API_BASE}/teams`);
  return res.json();
}

export async function fetchCollaborations() {
  const res = await fetch(`${API_BASE}/collaborations`);
  return res.json();
}

export async function updateCollaborationStatus(id: string, status: 'ACCEPTED' | 'DECLINED') {
  const res = await fetch(`${API_BASE}/collaborations/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status })
  });
  return res.json();
}

export async function sendCollaborationInvite(toUserId: string, projectId?: string, reason?: string) {
  const res = await fetch(`${API_BASE}/collaborations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ toUserId, projectId, reason })
  });
  return res.json();
}

export async function fetchSkillGaps(): Promise<SkillGap[]> {
  const res = await fetch(`${API_BASE}/skill-gaps`);
  return res.json();
}

export async function analyzeSkillGaps(): Promise<SkillGap[]> {
  const res = await fetch(`${API_BASE}/skill-gaps/analyze`, { method: 'POST' });
  return res.json();
}

export async function fetchMentors() {
  const res = await fetch(`${API_BASE}/mentors`);
  return res.json();
}

export async function matchMentors(skillName: string) {
  const res = await fetch(`${API_BASE}/mentors/match`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ skillName })
  });
  return res.json();
}

export async function fetchPulse() {
  const res = await fetch(`${API_BASE}/community/pulse`);
  return res.json();
}

export async function fetchDna() {
  const res = await fetch(`${API_BASE}/community/dna`);
  return res.json();
}

export async function analyzeLensImage(image?: string, posterType?: string): Promise<LensAnalysisResult> {
  const res = await fetch(`${API_BASE}/lens/image`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ image, posterType })
  });
  return res.json();
}

export async function addLensContextToCommunity(payload: { projectName: string; domain: string; skills: string[]; eventName?: string }) {
  const res = await fetch(`${API_BASE}/lens/context`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return res.json();
}

export async function sendVoiceCommand(command: string): Promise<VoiceCommandIntent> {
  const res = await fetch(`${API_BASE}/voice/command`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ command })
  });
  return res.json();
}

export async function analyzeProjectOverlap(projectId: string) {
  const res = await fetch(`${API_BASE}/projects/${projectId}/analyze-overlap`, { method: 'POST' });
  return res.json();
}

export async function syncOfficeKitBridge(payload?: any) {
  const res = await fetch(`${API_BASE}/officekit/sync`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ payload })
  });
  return res.json();
}

export async function fetchActivities(): Promise<Activity[]> {
  const res = await fetch(`${API_BASE}/activity`);
  return res.json();
}

export async function resetDemoData() {
  const res = await fetch(`${API_BASE}/demo/reset`, { method: 'POST' });
  return res.json();
}
