export type Role = 'DEVELOPER' | 'DESIGNER' | 'RESEARCHER' | 'STUDENT' | 'MENTOR' | 'FOUNDER' | 'ADMIN';
export type Availability = 'AVAILABLE' | 'OPEN_TO_PROJECTS' | 'BUSY' | 'MENTORING_ONLY';
export type SkillCategory = 'AI_ML' | 'FRONTEND' | 'BACKEND' | 'MOBILE' | 'CLOUD_DEVOPS' | 'DESIGN' | 'DOMAIN_EXPERTISE' | 'HARDWARE';
export type OpportunityType = 'COLLABORATION' | 'TEAM_FORMATION' | 'MENTORSHIP' | 'PROJECT_OVERLAP' | 'SKILL_GAP' | 'EVENT_MATCH';
export type CollaborationStatus = 'PENDING' | 'ACCEPTED' | 'DECLINED' | 'COMPLETED';
export type TeamStatus = 'DRAFT' | 'AWAITING_CONFIRMATION' | 'ACTIVE' | 'ARCHIVED';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  location: string;
  role: Role;
  availability: Availability;
  yearsExperience: number;
  github?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  description: string;
}

export interface UserSkill {
  id: string;
  userId: string;
  skillId: string;
  proficiency: number; // 1-100
  yearsExperience: number;
  verified: boolean;
  lastUsedAt?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  domain: string;
  status: 'IDEA' | 'IN_PROGRESS' | 'RECRUITING' | 'LAUNCHED';
  ownerId: string;
  createdAt: string;
  updatedAt: string;
  requiredSkillIds: string[];
}

export interface ProjectMember {
  id: string;
  projectId: string;
  userId: string;
  role: string;
}

export interface Problem {
  id: string;
  title: string;
  description: string;
  domain: string;
  status: 'OPEN' | 'IN_DISCUSSION' | 'SOLVED';
  createdBy: string;
  createdAt: string;
}

export interface Interest {
  id: string;
  name: string;
  category: string;
}

export interface UserInterest {
  id: string;
  userId: string;
  interestId: string;
}

export interface CollaborationRequest {
  id: string;
  fromUserId: string;
  toUserId: string;
  projectId?: string;
  reason: string;
  status: CollaborationStatus;
  createdAt: string;
  respondedAt?: string;
}

export interface Team {
  id: string;
  name: string;
  projectId: string;
  status: TeamStatus;
  createdAt: string;
  coverageScore: number;
  projectRelevance: number;
  explanation: string;
}

export interface TeamMember {
  id: string;
  teamId: string;
  userId: string;
  role: string;
  skillContribution: string[];
  status: 'PENDING' | 'ACCEPTED' | 'DECLINED';
  whySelected: string;
}

export interface Opportunity {
  id: string;
  type: OpportunityType;
  title: string;
  description: string;
  score: number; // 0.0 - 1.0
  reasons: string[];
  status: 'ACTIVE' | 'DISMISSED' | 'ACTIONED';
  memberUserIds: string[];
  relatedProjectId?: string;
  createdAt: string;
}

export interface MentorMatch {
  id: string;
  menteeId: string;
  mentorId: string;
  skillId: string;
  reason: string;
  score: number;
  status: 'AVAILABLE' | 'REQUESTED' | 'ACTIVE';
}

export interface CommunityEvent {
  id: string;
  title: string;
  description: string;
  domain: string;
  requiredSkills: string[];
  date: string;
  location: string;
}

export interface SkillGap {
  id: string;
  skillId: string;
  skillName: string;
  demandScore: number; // e.g. count of project needs
  supplyScore: number; // count of available proficient users
  gapScore: number; // 0-100 or ratio
  gapLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  explanation: string;
  createdAt: string;
}

export interface Activity {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  type: 'TEAM_FORMED' | 'COLLABORATION_ACCEPTED' | 'OPPORTUNITY_FOUND' | 'LENS_SCAN' | 'SKILL_GAP_ALERT' | 'PROJECT_COLLISION';
  description: string;
  metadata?: Record<string, any>;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  entity: string;
  entityId: string;
  metadata?: Record<string, any>;
  createdAt: string;
}

export interface GraphNodeData {
  id: string;
  label: string;
  subtitle?: string;
  category: 'USER' | 'SKILL' | 'PROJECT' | 'PROBLEM' | 'INTEREST' | 'OPPORTUNITY';
  avatar?: string;
  badge?: string;
  meta?: Record<string, any>;
}

export interface GraphEdgeData {
  id: string;
  source: string;
  target: string;
  label: string;
  relationship: 'HAS_SKILL' | 'INTERESTED_IN' | 'WORKS_ON' | 'REQUIRES' | 'SOLVES' | 'MENTORS' | 'RELATED_TO' | 'AVAILABLE_FOR';
  explanation?: string;
}

export interface TeamAssemblyRequest {
  projectName: string;
  domain?: string;
  requiredSkillNames: string[];
  targetSize?: number;
}

export interface CandidateResult {
  user: User;
  coveredSkills: string[];
  primaryRole: string;
  score: number;
  whySelected: string;
  availability: Availability;
}

export interface TeamAssemblyResponse {
  teamName: string;
  projectName: string;
  coverageScore: number;
  projectRelevance: number;
  availabilityRatio: string;
  members: CandidateResult[];
  missingSkills: string[];
  reasoning: string[];
  confidence: number;
}

export interface LensAnalysisResult {
  eventName?: string;
  projectName: string;
  domain: string;
  detectedSkills: string[];
  summary: string;
  recommendedRoleNeeds: string[];
  confidence: number;
}

export interface VoiceCommandIntent {
  intent: 'FIND_COLLABORATOR' | 'BUILD_TEAM' | 'FIND_MENTOR' | 'SHOW_SKILL_GAPS' | 'SHOW_SIMILAR_PROJECTS' | 'GENERAL_SEARCH';
  skills: string[];
  domain?: string;
  availability?: string;
  rawText: string;
  explanation: string;
}
