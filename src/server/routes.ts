import { Router, Request, Response } from 'express';
import { Server as SocketIOServer } from 'socket.io';
import { db } from './db';
import { aiService } from './ai-engine';
import {
  User, Team, TeamMember, CollaborationRequest,
  Opportunity, SkillGap, Activity, Project
} from '../types';

export function createApiRouter(io: SocketIOServer): Router {
  const router = Router();

  // Helper to get active user (defaults to demo user Alex)
  const getDemoUser = (): User => {
    return db.users.get('u-alex') || Array.from(db.users.values())[0];
  };

  // 1. AUTH
  router.get('/auth/me', (req: Request, res: Response) => {
    const user = getDemoUser();
    res.json({
      user,
      token: 'kyntra-demo-token-alex-chen'
    });
  });

  router.post('/auth/login', (req: Request, res: Response) => {
    const { email } = req.body;
    let user = Array.from(db.users.values()).find(u => u.email.toLowerCase() === (email || '').toLowerCase());
    if (!user) {
      user = getDemoUser();
    }
    db.logAudit(user.id, 'USER_LOGIN', 'AUTH', user.id);
    res.json({
      user,
      token: `kyntra-token-${user.id}`
    });
  });

  router.post('/auth/register', (req: Request, res: Response) => {
    const { name, email, role, location, bio } = req.body;
    const id = `u-${Date.now()}`;
    const newUser: User = {
      id,
      name: name || 'Innovator',
      email: email || `user-${Date.now()}@kyntra.io`,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      bio: bio || 'KYNTRA Community Member',
      location: location || 'Global',
      role: role || 'DEVELOPER',
      availability: 'AVAILABLE',
      yearsExperience: 3,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    db.users.set(newUser.id, newUser);
    db.logAudit(newUser.id, 'USER_REGISTER', 'USER', newUser.id);
    res.json({ user: newUser, token: `kyntra-token-${newUser.id}` });
  });

  // 2. COMMUNITY OVERVIEW & DATA
  router.get('/community/overview', (req: Request, res: Response) => {
    res.json({
      name: 'KYNTRA Developer & Innovation Community',
      memberCount: db.users.size,
      skillCount: db.skills.size,
      projectCount: db.projects.size,
      opportunityCount: db.opportunities.size,
      skillGapCount: db.skillGaps.size,
      activeCollaborationsCount: Array.from(db.collaborationRequests.values()).filter(c => c.status === 'ACCEPTED').length
    });
  });

  router.get('/community/members', (req: Request, res: Response) => {
    const members = Array.from(db.users.values()).map(user => {
      const skills = Array.from(db.userSkills.values())
        .filter(us => us.userId === user.id)
        .map(us => ({
          ...us,
          skill: db.skills.get(us.skillId)
        }));
      const interests = Array.from(db.userInterests.values())
        .filter(ui => ui.userId === user.id)
        .map(ui => db.interests.get(ui.interestId))
        .filter(Boolean);
      return { ...user, skills, interests };
    });
    res.json(members);
  });

  router.get('/community/skills', (req: Request, res: Response) => {
    res.json(Array.from(db.skills.values()));
  });

  router.get('/community/projects', (req: Request, res: Response) => {
    const projects = Array.from(db.projects.values()).map(p => {
      const owner = db.users.get(p.ownerId);
      const skills = p.requiredSkillIds.map(sid => db.skills.get(sid)).filter(Boolean);
      return { ...p, owner, skills };
    });
    res.json(projects);
  });

  // 3. COMMUNITY GRAPH (React Flow Nodes & Edges)
  router.get('/community/graph', (req: Request, res: Response) => {
    const filter = (req.query.filter as string) || 'all'; // all, people, skills, projects, opportunities

    const nodes: any[] = [];
    const edges: any[] = [];

    // Helper for circular layout
    let userIndex = 0;
    const userNodes = Array.from(db.users.values()).slice(0, 18);
    const radius = 380;
    const centerX = 450;
    const centerY = 350;

    userNodes.forEach(user => {
      const angle = (userIndex / userNodes.length) * 2 * Math.PI;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      userIndex++;

      nodes.push({
        id: `node-${user.id}`,
        type: 'customUserNode',
        position: { x, y },
        data: {
          id: user.id,
          label: user.name,
          subtitle: user.role,
          category: 'USER',
          avatar: user.avatar,
          availability: user.availability,
          yearsExperience: user.yearsExperience
        }
      });
    });

    // Core Skills (Inner ring)
    const skillsToShow = Array.from(db.skills.values()).slice(0, 10);
    const innerRadius = 180;
    skillsToShow.forEach((skill, sIdx) => {
      const angle = (sIdx / skillsToShow.length) * 2 * Math.PI + 0.3;
      const x = centerX + innerRadius * Math.cos(angle);
      const y = centerY + innerRadius * Math.sin(angle);

      nodes.push({
        id: `node-${skill.id}`,
        type: 'customSkillNode',
        position: { x, y },
        data: {
          id: skill.id,
          label: skill.name,
          subtitle: skill.category,
          category: 'SKILL',
          description: skill.description
        }
      });
    });

    // Projects (Center cluster)
    const projectsToShow = Array.from(db.projects.values()).slice(0, 4);
    projectsToShow.forEach((proj, pIdx) => {
      const x = centerX - 120 + pIdx * 90;
      const y = centerY - 60 + (pIdx % 2 === 0 ? -40 : 40);

      nodes.push({
        id: `node-${proj.id}`,
        type: 'customProjectNode',
        position: { x, y },
        data: {
          id: proj.id,
          label: proj.name,
          subtitle: proj.domain,
          category: 'PROJECT',
          status: proj.status
        }
      });
    });

    // Opportunities
    const oppsToShow = Array.from(db.opportunities.values()).slice(0, 3);
    oppsToShow.forEach((opp, oIdx) => {
      nodes.push({
        id: `node-${opp.id}`,
        type: 'customOpportunityNode',
        position: { x: centerX + (oIdx - 1) * 160, y: centerY + 180 },
        data: {
          id: opp.id,
          label: opp.title,
          subtitle: `Score: ${(opp.score * 100).toFixed(0)}%`,
          category: 'OPPORTUNITY',
          type: opp.type
        }
      });
    });

    // Build Edges
    let edgeCount = 0;
    // User -> Skill (HAS_SKILL)
    db.userSkills.forEach(us => {
      if (userNodes.some(u => u.id === us.userId) && skillsToShow.some(s => s.id === us.skillId)) {
        edgeCount++;
        edges.push({
          id: `edge-${edgeCount}`,
          source: `node-${us.userId}`,
          target: `node-${us.skillId}`,
          label: `${us.proficiency}%`,
          data: {
            relationship: 'HAS_SKILL',
            explanation: `Verified ${us.proficiency}% proficiency with ${us.yearsExperience} yrs experience`
          },
          animated: us.proficiency >= 90
        });
      }
    });

    // Project -> Skill (REQUIRES)
    projectsToShow.forEach(proj => {
      proj.requiredSkillIds.forEach(sid => {
        if (skillsToShow.some(s => s.id === sid)) {
          edgeCount++;
          edges.push({
            id: `edge-${edgeCount}`,
            source: `node-${proj.id}`,
            target: `node-${sid}`,
            label: 'REQUIRES',
            data: {
              relationship: 'REQUIRES',
              explanation: `${proj.name} requires core competence in this skill.`
            },
            animated: true
          });
        }
      });
    });

    // User -> Project (WORKS_ON / OWNS)
    projectsToShow.forEach(proj => {
      if (userNodes.some(u => u.id === proj.ownerId)) {
        edgeCount++;
        edges.push({
          id: `edge-${edgeCount}`,
          source: `node-${proj.ownerId}`,
          target: `node-${proj.id}`,
          label: 'LEADS',
          data: {
            relationship: 'WORKS_ON',
            explanation: `Project Owner & Lead Architect`
          }
        });
      }
    });

    res.json({ nodes, edges, filter });
  });

  // 4. OPPORTUNITY ENGINE
  router.get('/opportunities', (req: Request, res: Response) => {
    res.json(Array.from(db.opportunities.values()));
  });

  router.post('/opportunities/analyze', async (req: Request, res: Response) => {
    const opps = await aiService.discoverOpportunities();
    io.emit('opportunity:detected', { opportunities: opps });
    res.json({ success: true, count: opps.length, opportunities: opps });
  });

  router.get('/opportunities/:id', (req: Request, res: Response) => {
    const opp = db.opportunities.get(req.params.id);
    if (!opp) return res.status(404).json({ error: 'Opportunity not found' });
    res.json(opp);
  });

  // 5. ASSEMBLE TEAM (Primary Demo Feature)
  router.post('/assemble', async (req: Request, res: Response) => {
    const { projectName, requiredSkillNames } = req.body;
    const result = await aiService.assembleTeam({
      projectName: projectName || 'AI Healthcare Assistant',
      requiredSkillNames: requiredSkillNames || ['Computer Vision', 'Machine Learning', 'Backend', 'UI/UX']
    });
    res.json(result);
  });

  // 6. FORM TEAM (Creates DB records, collaboration requests, activities, audit log, Socket event)
  router.post('/teams', (req: Request, res: Response) => {
    const { teamName, projectName, members } = req.body;
    const teamId = `team-${Date.now()}`;
    const user = getDemoUser();

    // Find or create project
    let project = Array.from(db.projects.values()).find(p => p.name === projectName);
    if (!project) {
      project = {
        id: `proj-${Date.now()}`,
        name: projectName || 'AI Healthcare Assistant',
        description: 'Multidisciplinary assembled team initiative',
        domain: 'Healthcare AI',
        status: 'RECRUITING',
        ownerId: user.id,
        requiredSkillIds: ['sk-cv', 'sk-ml', 'sk-node', 'sk-uiux'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      db.projects.set(project.id, project);
    }

    // 1. Create TEAM
    const newTeam: Team = {
      id: teamId,
      name: teamName || 'AI Healthcare Builders',
      projectId: project.id,
      status: 'AWAITING_CONFIRMATION',
      createdAt: new Date().toISOString(),
      coverageScore: 96,
      projectRelevance: 94,
      explanation: 'Optimal multidisciplinary quad squad covering Computer Vision, ML, Backend, and UI/UX.'
    };
    db.teams.set(teamId, newTeam);

    // 2. Create TEAM_MEMBER records & Collaboration Requests
    const candidateList = Array.isArray(members) && members.length > 0
      ? members
      : [
          { user: db.users.get('u-priya')!, role: 'Computer Vision & Diagnostic Lead', coveredSkills: ['Computer Vision'], whySelected: 'Priya covers Computer Vision (98% proficiency).' },
          { user: db.users.get('u-arun')!, role: 'Lead ML & Predictive Modeler', coveredSkills: ['Machine Learning'], whySelected: 'Arun covers Machine Learning & statistical validation.' },
          { user: db.users.get('u-rahul')!, role: 'Backend Systems Architect', coveredSkills: ['Backend', 'Node.js'], whySelected: 'Rahul provides high-throughput relational backend.' },
          { user: db.users.get('u-meena')!, role: 'Lead Product & UX Designer', coveredSkills: ['UI/UX'], whySelected: 'Meena crafts clinician-centric ergonomic workflows.' }
        ];

    const teamMemberRecords: TeamMember[] = [];
    candidateList.forEach((c: any, idx: number) => {
      const u = c.user || c;
      const tmId = `tm-${teamId}-${u.id || idx}`;
      const tm: TeamMember = {
        id: tmId,
        teamId,
        userId: u.id,
        role: c.primaryRole || c.role || 'Specialist',
        skillContribution: c.coveredSkills || [],
        status: 'PENDING',
        whySelected: c.whySelected || 'Selected by KYNTRA Assemble engine.'
      };
      db.teamMembers.set(tmId, tm);
      teamMemberRecords.push(tm);

      // Create outgoing collaboration request
      const crId = `cr-${Date.now()}-${u.id}`;
      db.collaborationRequests.set(crId, {
        id: crId,
        fromUserId: user.id,
        toUserId: u.id,
        projectId: project!.id,
        reason: `KYNTRA Assemble: Inviting you to join "${newTeam.name}" as ${tm.role}.`,
        status: 'PENDING',
        createdAt: new Date().toISOString()
      });
    });

    // 3. Create Activity
    const act = db.logActivity(
      user.id,
      'TEAM_FORMED',
      `Assembled team "${newTeam.name}" for "${project.name}" with 96% capability coverage.`,
      { teamId, members: candidateList.map((c: any) => c.user?.name || c.name) }
    );

    // 4. Create Audit Log
    db.logAudit(user.id, 'TEAM_FORMED', 'TEAM', teamId, { memberCount: candidateList.length });

    // 5. Emit Socket.IO Events
    io.emit('team:assembled', { team: newTeam, members: teamMemberRecords, project });
    io.emit('activity:created', act);
    io.emit('community:updated', { timestamp: new Date().toISOString() });

    res.json({
      success: true,
      team: newTeam,
      project,
      members: teamMemberRecords
    });
  });

  router.get('/teams', (req: Request, res: Response) => {
    const list = Array.from(db.teams.values()).map(team => {
      const project = db.projects.get(team.projectId);
      const members = Array.from(db.teamMembers.values())
        .filter(tm => tm.teamId === team.id)
        .map(tm => ({
          ...tm,
          user: db.users.get(tm.userId)
        }));
      return { ...team, project, members };
    });
    res.json(list);
  });

  router.get('/teams/:id', (req: Request, res: Response) => {
    const team = db.teams.get(req.params.id);
    if (!team) return res.status(404).json({ error: 'Team not found' });
    const project = db.projects.get(team.projectId);
    const members = Array.from(db.teamMembers.values())
      .filter(tm => tm.teamId === team.id)
      .map(tm => ({ ...tm, user: db.users.get(tm.userId) }));
    res.json({ ...team, project, members });
  });

  // 7. COLLABORATION ACTIVATION & MANAGEMENT
  router.get('/collaborations', (req: Request, res: Response) => {
    const user = getDemoUser();
    const all = Array.from(db.collaborationRequests.values()).map(cr => {
      const fromUser = db.users.get(cr.fromUserId);
      const toUser = db.users.get(cr.toUserId);
      const project = cr.projectId ? db.projects.get(cr.projectId) : undefined;
      return { ...cr, fromUser, toUser, project };
    });

    const incoming = all.filter(c => c.toUserId === user.id);
    const outgoing = all.filter(c => c.fromUserId === user.id);
    const active = all.filter(c => c.status === 'ACCEPTED');

    res.json({ incoming, outgoing, active, total: all.length });
  });

  router.post('/collaborations', (req: Request, res: Response) => {
    const { toUserId, projectId, reason } = req.body;
    const user = getDemoUser();
    const id = `cr-${Date.now()}`;
    const newCr: CollaborationRequest = {
      id,
      fromUserId: user.id,
      toUserId,
      projectId,
      reason: reason || 'Invitation to collaborate on KYNTRA project.',
      status: 'PENDING',
      createdAt: new Date().toISOString()
    };
    db.collaborationRequests.set(id, newCr);

    const act = db.logActivity(
      user.id,
      'OPPORTUNITY_FOUND',
      `Sent collaboration invitation to ${db.users.get(toUserId)?.name || 'peer'}.`
    );

    io.emit('collaboration:created', newCr);
    io.emit('activity:created', act);
    res.json(newCr);
  });

  router.patch('/collaborations/:id', (req: Request, res: Response) => {
    const { status } = req.body;
    const cr = db.collaborationRequests.get(req.params.id);
    if (!cr) return res.status(404).json({ error: 'Collaboration request not found' });

    cr.status = status;
    cr.respondedAt = new Date().toISOString();
    db.collaborationRequests.set(cr.id, cr);

    // If accepted, check if there are associated team members to update
    if (status === 'ACCEPTED') {
      db.teamMembers.forEach(tm => {
        if (tm.userId === cr.toUserId) {
          tm.status = 'ACCEPTED';
        }
      });

      // Check if all team members of any team are now accepted
      db.teams.forEach(team => {
        const members = Array.from(db.teamMembers.values()).filter(tm => tm.teamId === team.id);
        if (members.length > 0 && members.every(m => m.status === 'ACCEPTED')) {
          team.status = 'ACTIVE';
        }
      });

      const act = db.logActivity(
        cr.toUserId,
        'COLLABORATION_ACCEPTED',
        `Accepted collaboration request from ${db.users.get(cr.fromUserId)?.name || 'collaborator'}.`
      );
      io.emit('activity:created', act);
    }

    io.emit('collaboration:updated', cr);
    res.json(cr);
  });

  // 8. COMMUNITY LENS (Camera / Vision Processing)
  router.post('/lens/image', async (req: Request, res: Response) => {
    const { image, posterType } = req.body;
    const result = await aiService.extractContextFromImage(posterType || image || '');
    
    // Log activity
    const user = getDemoUser();
    const act = db.logActivity(
      user.id,
      'LENS_SCAN',
      `Analyzed image with Community Lens: extracted "${result.projectName}" requirements.`,
      { detectedSkills: result.detectedSkills }
    );
    io.emit('lens:processed', result);
    io.emit('activity:created', act);

    res.json(result);
  });

  router.post('/lens/context', (req: Request, res: Response) => {
    const { projectName, domain, skills, eventName } = req.body;
    const user = getDemoUser();

    // Create a new event or project based on lens extraction
    const eventId = `ev-${Date.now()}`;
    const newEvent = {
      id: eventId,
      title: eventName || projectName || 'Scanned Opportunity',
      description: `Added via Community Lens vision capture by ${user.name}.`,
      domain: domain || 'General Tech',
      requiredSkills: skills || ['Computer Vision', 'Machine Learning'],
      date: '2026-10-25T10:00:00Z',
      location: 'Community Hub'
    };
    db.events.set(eventId, newEvent);

    db.logAudit(user.id, 'LENS_ADD_COMMUNITY', 'EVENT', eventId);
    io.emit('community:updated', { event: newEvent });

    res.json({ success: true, event: newEvent });
  });

  // 9. VOICE COMMUNITY COMMAND
  router.post('/voice/command', async (req: Request, res: Response) => {
    const { command } = req.body;
    if (!command) return res.status(400).json({ error: 'Command is required' });

    const intent = await aiService.analyzeIntent(command);
    io.emit('voice:processed', intent);
    res.json(intent);
  });

  // 10. SKILL GAP RADAR
  router.get('/skill-gaps', (req: Request, res: Response) => {
    res.json(Array.from(db.skillGaps.values()));
  });

  router.post('/skill-gaps/analyze', (req: Request, res: Response) => {
    // Dynamic recalculation
    const skills = Array.from(db.skills.values());
    const gaps: SkillGap[] = [];

    skills.forEach(skill => {
      // count projects that require this skill
      const demand = Array.from(db.projects.values()).filter(p => p.requiredSkillIds.includes(skill.id)).length;
      // count active members with this skill >= 80%
      const supply = Array.from(db.userSkills.values()).filter(us => us.skillId === skill.id && us.proficiency >= 80).length;

      if (demand > 0 || supply > 0) {
        const gapRatio = demand / Math.max(1, supply);
        const gapScore = Math.min(100, Math.round(gapRatio * 35));
        const gapLevel = gapScore >= 75 ? 'CRITICAL' : gapScore >= 60 ? 'HIGH' : gapScore >= 40 ? 'MEDIUM' : 'LOW';

        gaps.push({
          id: `sg-${skill.id}`,
          skillId: skill.id,
          skillName: skill.name,
          demandScore: demand * 4 + 1, // scaled for realistic community size
          supplyScore: supply,
          gapScore,
          gapLevel,
          explanation: `${demand * 4 + 1} project requirements versus ${supply} verified community practitioners.`,
          createdAt: new Date().toISOString()
        });
      }
    });

    // Save and emit
    gaps.forEach(g => db.skillGaps.set(g.id, g));
    io.emit('skillgap:detected', gaps);
    res.json(gaps);
  });

  // 11. PROJECT COLLISION DETECTION
  router.post('/projects/:id/analyze-overlap', async (req: Request, res: Response) => {
    const result = await aiService.detectProjectOverlap(req.params.id);
    const user = getDemoUser();
    const act = db.logActivity(
      user.id,
      'PROJECT_COLLISION',
      `Identified ${Math.round(result.overlapScore * 100)}% project overlap between "${result.sourceProject.name}" and "${result.overlappingProject.name}".`
    );
    io.emit('project:overlap', result);
    io.emit('activity:created', act);
    res.json(result);
  });

  // 12. MENTORS
  router.get('/mentors', (req: Request, res: Response) => {
    const mentors = Array.from(db.users.values())
      .filter(u => u.role === 'MENTOR' || u.availability === 'MENTORING_ONLY' || u.yearsExperience >= 7)
      .map(user => {
        const skills = Array.from(db.userSkills.values())
          .filter(us => us.userId === user.id)
          .map(us => ({ ...us, skill: db.skills.get(us.skillId) }));
        return { ...user, skills };
      });
    res.json(mentors);
  });

  router.post('/mentors/match', (req: Request, res: Response) => {
    const { skillName } = req.body;
    const targetSkill = Array.from(db.skills.values()).find(s => s.name.toLowerCase() === (skillName || '').toLowerCase());
    
    // Find best mentor
    const mentors = Array.from(db.users.values()).filter(u => u.role === 'MENTOR' || u.availability === 'MENTORING_ONLY' || u.yearsExperience >= 7);
    const scored = mentors.map(m => {
      const sProf = targetSkill ? Array.from(db.userSkills.values()).find(us => us.userId === m.id && us.skillId === targetSkill.id)?.proficiency || 50 : 80;
      return {
        mentor: m,
        matchScore: sProf / 100,
        skill: targetSkill?.name || 'Technical Architecture',
        reason: `${m.name} has ${m.yearsExperience} years experience with verified mastery.`
      };
    }).sort((a, b) => b.matchScore - a.matchScore);

    res.json(scored);
  });

  // 13. COMMUNITY DNA & PULSE
  router.get('/community/pulse', (req: Request, res: Response) => {
    res.json({
      membersCount: 1248,
      projectsCount: 326,
      openOpportunitiesCount: 84,
      skillGapsCount: 17,
      potentialCollaborationsCount: 23,
      insights: [
        {
          id: 'ins-1',
          type: 'SKILL_SURGE',
          title: 'Computer Vision demand is rising',
          subtitle: '+35% project requirements this month against 6 active experts.',
          actionText: 'View Radar',
          actionLink: '/skill-gaps'
        },
        {
          id: 'ins-2',
          type: 'COLLISION',
          title: '3 projects appear highly related',
          subtitle: 'Strong overlap between Resume Analyzer and Career Engine initiatives.',
          actionText: 'Inspect Collision',
          actionLink: '/projects'
        },
        {
          id: 'ins-3',
          type: 'ACTIVE_INTENT',
          title: '12 members are actively looking for collaborators',
          subtitle: 'Available candidates ready for hackathon team formation.',
          actionText: 'Launch Assemble',
          actionLink: '/assemble'
        },
        {
          id: 'ins-4',
          type: 'MENTORSHIP',
          title: '4 mentorship opportunities detected',
          subtitle: 'Cloud architecture & database mentors have open capacity.',
          actionText: 'Discover Mentors',
          actionLink: '/mentors'
        }
      ]
    });
  });

  router.get('/community/dna', (req: Request, res: Response) => {
    res.json({
      topEmergingSkills: [
        { name: 'Computer Vision', growth: '+42%', demand: 17, category: 'AI_ML' },
        { name: 'Vector Databases', growth: '+38%', demand: 14, category: 'AI_ML' },
        { name: 'Edge AI / TinyML', growth: '+29%', demand: 8, category: 'Hardware' },
        { name: 'Autonomous Robotics', growth: '+25%', demand: 9, category: 'Robotics' },
        { name: 'PostgreSQL Internals', growth: '+18%', demand: 12, category: 'Backend' }
      ],
      unmetCommunityNeeds: [
        { domain: 'Medical AI Diagnostics', gap: 'Critical', need: 'Clinical validation partners' },
        { domain: 'Drone Edge Vision', gap: 'High', need: 'Low-power tensor RT developers' },
        { domain: 'Decentralized Telemetry', gap: 'Medium', need: 'Zero-knowledge proof engineers' }
      ],
      collaborationHotspots: [
        { hub: 'Healthcare AI Cluster', activeProjects: 4, connectedMembers: 9 },
        { hub: 'Autonomous Systems & Robotics', activeProjects: 3, connectedMembers: 6 },
        { hub: 'Talent & Semantic Graph Tech', activeProjects: 2, connectedMembers: 5 }
      ],
      metrics: {
        networkDensity: 0.74,
        averageSynergyScore: 0.91,
        activeCollaborationRate: '86%'
      }
    });
  });

  // 14. OFFICE KIT DEMO BRIDGE
  router.post('/officekit/sync', (req: Request, res: Response) => {
    const { deviceId, eventType, payload } = req.body;
    const syncData = {
      deviceId: deviceId || 'iQOO-12-Pro-Hackathon-Device',
      eventType: eventType || 'OPPORTUNITY_CAPTURED',
      timestamp: new Date().toISOString(),
      payload: payload || {
        opportunityId: 'opp-1',
        title: 'Priya Sharma could solve your Computer Vision capability gap',
        targetProject: 'AI Healthcare Assistant'
      }
    };

    io.emit('officekit:sync', syncData);
    res.json({ success: true, message: 'Synced from iQOO device', syncData });
  });

  // 15. ACTIVITY
  router.get('/activity', (req: Request, res: Response) => {
    res.json(db.activities);
  });

  // 16. DEMO RESET
  router.post('/demo/reset', (req: Request, res: Response) => {
    db.seed();
    io.emit('community:updated', { reset: true });
    res.json({ success: true, message: 'Community reset and re-seeded successfully' });
  });

  return router;
}
