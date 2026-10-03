import { DemoAIProvider } from '../server/ai-engine';
import { db } from '../server/db';

async function runTestSuite() {
  console.log('--- [KYNTRA TEST SUITE] Starting Core Intelligence Engine Validation ---');
  let passed = 0;
  let failed = 0;

  const ai = new DemoAIProvider();

  // Test 1: Team Assembly Engine Skill Coverage
  try {
    const assembly = await ai.assembleTeam({
      projectName: 'AI Healthcare Assistant',
      requiredSkillNames: ['Computer Vision', 'Machine Learning', 'Backend', 'UI/UX']
    });

    if (assembly.coverageScore >= 90 && assembly.members.length === 4) {
      console.log('✅ Test 1 PASSED: Team assembly produced 4-member squad with >=90% coverage.');
      passed++;
    } else {
      console.error('❌ Test 1 FAILED: Expected >=90% coverage, got:', assembly.coverageScore);
      failed++;
    }

    // Verify candidate roles
    const names = assembly.members.map(m => m.user.name);
    if (names.includes('Priya Sharma') && names.includes('Arun Patel') && names.includes('Rahul Verma') && names.includes('Meena Iyer')) {
      console.log('✅ Test 2 PASSED: Team correctly identified Priya, Arun, Rahul, and Meena.');
      passed++;
    } else {
      console.error('❌ Test 2 FAILED: Expected demo quad candidates, got:', names);
      failed++;
    }
  } catch (e) {
    console.error('❌ Test 1/2 ERROR:', e);
    failed += 2;
  }

  // Test 3: Intent Engine Parsing
  try {
    const intent = await ai.analyzeIntent('Find someone who knows computer vision and is interested in healthcare AI.');
    if (intent.intent === 'FIND_COLLABORATOR' && intent.skills.includes('Computer Vision')) {
      console.log('✅ Test 3 PASSED: Natural language query resolved to FIND_COLLABORATOR with Computer Vision skill.');
      passed++;
    } else {
      console.error('❌ Test 3 FAILED: Unexpected intent output:', intent);
      failed++;
    }

    const mentorIntent = await ai.analyzeIntent('Find me a mentor for Kubernetes.');
    if (mentorIntent.intent === 'FIND_MENTOR' && mentorIntent.skills.includes('Kubernetes')) {
      console.log('✅ Test 4 PASSED: Mentor intent correctly identified for Kubernetes.');
      passed++;
    } else {
      console.error('❌ Test 4 FAILED: Unexpected mentor intent:', mentorIntent);
      failed++;
    }
  } catch (e) {
    console.error('❌ Test 3/4 ERROR:', e);
    failed += 2;
  }

  // Test 5: Project Collision Detection
  try {
    const collision = await ai.detectProjectOverlap('proj-resume');
    if (collision.overlapScore >= 0.85 && collision.overlappingProject.name.includes('Career')) {
      console.log('✅ Test 5 PASSED: Project collision detected 92% semantic overlap with Career Engine.');
      passed++;
    } else {
      console.error('❌ Test 5 FAILED: Collision detection mismatch:', collision);
      failed++;
    }
  } catch (e) {
    console.error('❌ Test 5 ERROR:', e);
    failed++;
  }

  // Test 6: Skill Gap Radar Consistency
  try {
    const cvGap = db.skillGaps.get('sg-cv');
    if (cvGap && cvGap.demandScore === 17 && cvGap.supplyScore === 6 && cvGap.gapLevel === 'CRITICAL') {
      console.log('✅ Test 6 PASSED: Computer Vision critical skill gap verified (17 demand vs 6 supply).');
      passed++;
    } else {
      console.error('❌ Test 6 FAILED: Skill gap verification failed:', cvGap);
      failed++;
    }
  } catch (e) {
    console.error('❌ Test 6 ERROR:', e);
    failed++;
  }

  console.log(`--- [KYNTRA TEST SUITE] Finished: ${passed} Passed, ${failed} Failed ---`);
  if (failed > 0) process.exit(1);
}

runTestSuite();
