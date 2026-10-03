import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { MobileNav } from './components/layout/MobileNav';
import { OfficeKitModal } from './components/modals/OfficeKitModal';
import { VoiceModal } from './components/modals/VoiceModal';
import { DemoTourModal } from './components/modals/DemoTourModal';

// Views
import { LandingPage } from './views/LandingPage';
import { DashboardView } from './views/DashboardView';
import { GraphView } from './views/GraphView';
import { AssembleView } from './views/AssembleView';
import { LensView } from './views/LensView';
import { OpportunitiesView } from './views/OpportunitiesView';
import { SkillGapsView } from './views/SkillGapsView';
import { ProjectCollisionsView } from './views/ProjectCollisionsView';
import { MentorsView } from './views/MentorsView';
import { CollaborationsView } from './views/CollaborationsView';
import { CommunityDnaView } from './views/CommunityDnaView';
import { ActivityView } from './views/ActivityView';

// API & Socket
import {
  fetchPulse,
  fetchOpportunities,
  fetchActivities,
  fetchCollaborations,
  resetDemoData
} from './api/client';
import { getSocket } from './lib/socket';
import { Opportunity, Activity, VoiceCommandIntent } from './types';

export function App() {
  const [activeView, setActiveView] = useState<string>('dashboard');
  const [isOfficeKitOpen, setIsOfficeKitOpen] = useState(false);
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [officeKitSynced, setOfficeKitSynced] = useState(true);
  const [syncEvents, setSyncEvents] = useState<any[]>([]);
  const [pulseData, setPulseData] = useState<any>(null);
  const [featuredOpportunity, setFeaturedOpportunity] = useState<Opportunity | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [pendingCollabsCount, setPendingCollabsCount] = useState(0);

  // Assemble prefill state
  const [assemblePrefill, setAssemblePrefill] = useState<{
    projectName?: string;
    skills?: string[];
  }>({});

  const refreshCoreData = useCallback(async () => {
    try {
      const [pulse, opps, acts, collabs] = await Promise.all([
        fetchPulse(),
        fetchOpportunities(),
        fetchActivities(),
        fetchCollaborations()
      ]);
      setPulseData(pulse);
      if (opps && opps.length > 0) {
        setFeaturedOpportunity(opps[0]);
      }
      setActivities(acts || []);
      if (collabs && collabs.incoming) {
        setPendingCollabsCount(collabs.incoming.filter((c: any) => c.status === 'PENDING').length);
      }
    } catch (e) {
      console.error('[KYNTRA] Failed to fetch core data:', e);
    }
  }, []);

  useEffect(() => {
    refreshCoreData();

    // Setup Socket.IO real-time event listeners
    const socket = getSocket();

    socket.on('officekit:sync', (data: any) => {
      setSyncEvents((prev) => [data, ...prev]);
      setOfficeKitSynced(true);
    });

    socket.on('activity:created', (newActivity: Activity) => {
      setActivities((prev) => [newActivity, ...prev.slice(0, 49)]);
    });

    socket.on('collaboration:created', () => {
      setPendingCollabsCount((prev) => prev + 1);
    });

    socket.on('collaboration:updated', () => {
      refreshCoreData();
    });

    socket.on('community:updated', () => {
      refreshCoreData();
    });

    return () => {
      socket.off('officekit:sync');
      socket.off('activity:created');
      socket.off('collaboration:created');
      socket.off('collaboration:updated');
      socket.off('community:updated');
    };
  }, [refreshCoreData]);

  const handleResetDemo = async () => {
    try {
      await resetDemoData();
      await refreshCoreData();
      setActiveView('dashboard');
    } catch (e) {
      console.error(e);
    }
  };

  const handleExecuteVoiceIntent = (intent: VoiceCommandIntent) => {
    if (intent.intent === 'BUILD_TEAM') {
      setAssemblePrefill({
        projectName: intent.domain === 'Healthcare AI' ? 'AI Healthcare Assistant' : 'Custom Community Project',
        skills: intent.skills.length > 0 ? intent.skills : ['Computer Vision', 'Machine Learning', 'Backend', 'UI/UX']
      });
      setActiveView('assemble');
    } else if (intent.intent === 'FIND_MENTOR') {
      setActiveView('mentors');
    } else if (intent.intent === 'SHOW_SKILL_GAPS') {
      setActiveView('skill-gaps');
    } else if (intent.intent === 'SHOW_SIMILAR_PROJECTS') {
      setActiveView('collisions');
    } else {
      setActiveView('opportunities');
    }
  };

  const handleNavigateToAssembleWithPrefill = (projectName: string, skills: string[]) => {
    setAssemblePrefill({ projectName, skills });
    setActiveView('assemble');
  };

  if (activeView === 'landing') {
    return (
      <LandingPage
        onEnterApp={() => setActiveView('dashboard')}
        onOpenTour={() => setIsTourOpen(true)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#07090f] text-zinc-100 flex flex-col selection:bg-cyan-500 selection:text-black">
      {/* Top Header */}
      <Header
        onOpenVoice={() => setIsVoiceOpen(true)}
        onOpenOfficeKit={() => setIsOfficeKitOpen(true)}
        onOpenTour={() => setIsTourOpen(true)}
        onResetDemo={handleResetDemo}
        officeKitSynced={officeKitSynced}
        activeView={activeView}
      />

      {/* Main Layout Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <Sidebar
          activeView={activeView}
          onSelectView={setActiveView}
          pendingCollabsCount={pendingCollabsCount}
        />

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-8 py-6">
          <div className="max-w-7xl mx-auto">
            {activeView === 'dashboard' && (
              <DashboardView
                onNavigate={setActiveView}
                featuredOpportunity={featuredOpportunity}
                pulseData={pulseData}
                activities={activities}
              />
            )}

            {activeView === 'graph' && (
              <GraphView
                onNavigateToAssemble={(pName) => {
                  setAssemblePrefill({ projectName: pName });
                  setActiveView('assemble');
                }}
              />
            )}

            {activeView === 'assemble' && (
              <AssembleView
                onNavigate={setActiveView}
                prefilledSkills={assemblePrefill.skills}
                prefilledProjectName={assemblePrefill.projectName}
              />
            )}

            {activeView === 'lens' && (
              <LensView
                onNavigateToAssemble={handleNavigateToAssembleWithPrefill}
                onNavigateToGraph={() => setActiveView('graph')}
              />
            )}

            {activeView === 'opportunities' && (
              <OpportunitiesView
                onNavigateToAssemble={() => setActiveView('assemble')}
                onNavigateToGraph={() => setActiveView('graph')}
              />
            )}

            {activeView === 'skill-gaps' && (
              <SkillGapsView
                onNavigateToGraph={() => setActiveView('graph')}
                onNavigateToAssemble={() => setActiveView('assemble')}
              />
            )}

            {activeView === 'collisions' && (
              <ProjectCollisionsView
                onNavigateToAssemble={() => setActiveView('assemble')}
              />
            )}

            {activeView === 'mentors' && (
              <MentorsView />
            )}

            {activeView === 'collaborations' && (
              <CollaborationsView
                onNavigateToAssemble={() => setActiveView('assemble')}
              />
            )}

            {activeView === 'pulse-dna' && (
              <CommunityDnaView />
            )}

            {activeView === 'activity' && (
              <ActivityView />
            )}
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav
        activeView={activeView}
        onSelectView={setActiveView}
        pendingCollabsCount={pendingCollabsCount}
      />

      {/* Interactive Modals */}
      <OfficeKitModal
        isOpen={isOfficeKitOpen}
        onClose={() => setIsOfficeKitOpen(false)}
        syncEvents={syncEvents}
      />

      <VoiceModal
        isOpen={isVoiceOpen}
        onClose={() => setIsVoiceOpen(false)}
        onExecuteIntent={handleExecuteVoiceIntent}
      />

      <DemoTourModal
        isOpen={isTourOpen}
        onClose={() => setIsTourOpen(false)}
        onNavigateToStep={(viewId) => setActiveView(viewId)}
      />
    </div>
  );
}

export default App;
