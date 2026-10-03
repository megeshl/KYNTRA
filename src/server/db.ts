import {
  User, Skill, UserSkill, Project, Problem, Interest, UserInterest,
  CollaborationRequest, Team, TeamMember, Opportunity, MentorMatch,
  CommunityEvent, SkillGap, Activity, AuditLog
} from '../types';

export class KyntraDatabase {
  users: Map<string, User> = new Map();
  skills: Map<string, Skill> = new Map();
  userSkills: Map<string, UserSkill> = new Map();
  projects: Map<string, Project> = new Map();
  problems: Map<string, Problem> = new Map();
  interests: Map<string, Interest> = new Map();
  userInterests: Map<string, UserInterest> = new Map();
  collaborationRequests: Map<string, CollaborationRequest> = new Map();
  teams: Map<string, Team> = new Map();
  teamMembers: Map<string, TeamMember> = new Map();
  opportunities: Map<string, Opportunity> = new Map();
  mentorMatches: Map<string, MentorMatch> = new Map();
  events: Map<string, CommunityEvent> = new Map();
  skillGaps: Map<string, SkillGap> = new Map();
  activities: Activity[] = [];
  auditLogs: AuditLog[] = [];

  constructor() {
    this.seed();
  }

  seed() {
    this.clear();

    // 1. SKILLS (20+)
    const skillList: Skill[] = [
      { id: 'sk-cv', name: 'Computer Vision', category: 'AI_ML', description: 'Deep learning for image analysis, segmentation, SLAM, and detection.' },
      { id: 'sk-ml', name: 'Machine Learning', category: 'AI_ML', description: 'Model training, statistical modeling, inference, scikit-learn & PyTorch.' },
      { id: 'sk-py', name: 'Python', category: 'AI_ML', description: 'Scientific computing, data workflows, modern async Python.' },
      { id: 'sk-node', name: 'Node.js', category: 'BACKEND', description: 'Event-driven server architecture, Express, REST & GraphQL APIs.' },
      { id: 'sk-react', name: 'React', category: 'FRONTEND', description: 'Component state, hooks, Vite, performance optimization.' },
      { id: 'sk-uiux', name: 'UI/UX', category: 'DESIGN', description: 'Product design, design systems, interactive prototypes, accessibility.' },
      { id: 'sk-figma', name: 'Figma', category: 'DESIGN', description: 'High-fidelity wireframing, component auto-layout, design tokens.' },
      { id: 'sk-pg', name: 'PostgreSQL', category: 'BACKEND', description: 'Relational data modeling, indexing, query execution, Drizzle & Prisma.' },
      { id: 'sk-k8s', name: 'Kubernetes', category: 'CLOUD_DEVOPS', description: 'Container orchestration, Helm charts, ingress, cluster autoscaling.' },
      { id: 'sk-medai', name: 'Medical AI', category: 'DOMAIN_EXPERTISE', description: 'Clinical diagnostics, DICOM imaging, HIPAA compliance, healthcare workflows.' },
      { id: 'sk-nlp', name: 'NLP', category: 'AI_ML', description: 'Large language models, embeddings, RAG architectures, prompt tuning.' },
      { id: 'sk-docker', name: 'Docker', category: 'CLOUD_DEVOPS', description: 'Containerization, multi-stage builds, rootless containers.' },
      { id: 'sk-rust', name: 'Rust', category: 'BACKEND', description: 'Memory-safe systems programming, async Tokio, WebAssembly.' },
      { id: 'sk-cloud', name: 'Cloud Architecture', category: 'CLOUD_DEVOPS', description: 'Distributed systems, AWS/GCP, microservices resilience.' },
      { id: 'sk-robotics', name: 'Robotics', category: 'HARDWARE', description: 'ROS 2, kinematic solvers, sensor fusion, lidar integration.' },
      { id: 'sk-mobile', name: 'Mobile Dev', category: 'MOBILE', description: 'Cross-platform Flutter & native iOS/Android engineering.' },
      { id: 'sk-sec', name: 'Cybersecurity', category: 'BACKEND', description: 'Penetration testing, zero-trust auth, cryptographic protocols.' },
      { id: 'sk-vdb', name: 'Vector Databases', category: 'AI_ML', description: 'HNSW index tuning, Pinecone, Milvus, semantic similarity engines.' },
      { id: 'sk-edgeml', name: 'Edge AI', category: 'AI_ML', description: 'TinyML, ONNX runtime, hardware-accelerated NPU inference.' },
      { id: 'sk-graphql', name: 'GraphQL', category: 'BACKEND', description: 'Schema stitching, Apollo server, federation, subscription websockets.' },
      { id: 'sk-ds', name: 'Data Science', category: 'AI_ML', description: 'Exploratory data analysis, Pandas, statistical hypothesis testing.' },
      { id: 'sk-audio', name: 'Audio AI', category: 'AI_ML', description: 'Speech recognition, audio feature extraction, generative audio synthesis.' }
    ];
    skillList.forEach(s => this.skills.set(s.id, s));

    // 2. INTERESTS (10+)
    const interestList: Interest[] = [
      { id: 'int-health', name: 'Healthcare AI', category: 'Domain' },
      { id: 'int-agents', name: 'Autonomous Agents', category: 'AI' },
      { id: 'int-climate', name: 'Climate Tech', category: 'Domain' },
      { id: 'int-robotics', name: 'Robotics & Hardware', category: 'Hardware' },
      { id: 'int-edtech', name: 'EdTech & Learning', category: 'Domain' },
      { id: 'int-fintech', name: 'Decentralized Finance', category: 'FinTech' },
      { id: 'int-devops', name: 'Cloud Infrastructure', category: 'Engineering' },
      { id: 'int-privacy', name: 'Privacy & Security', category: 'Security' },
      { id: 'int-creative', name: 'Generative Media', category: 'Design' },
      { id: 'int-spatial', name: 'Spatial Computing', category: 'Hardware' }
    ];
    interestList.forEach(i => this.interests.set(i.id, i));

    // 3. USERS (30 users)
    const userList: User[] = [
      {
        id: 'u-alex',
        name: 'Alex Chen',
        email: 'alex.chen@kyntra.io',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        bio: 'Full-stack AI Systems Architect & Founder. Building the future of community intelligence.',
        location: 'San Francisco, CA',
        role: 'FOUNDER',
        availability: 'AVAILABLE',
        yearsExperience: 7,
        createdAt: '2026-01-10T08:00:00Z',
        updatedAt: '2026-10-01T12:00:00Z'
      },
      {
        id: 'u-priya',
        name: 'Priya Sharma',
        email: 'priya.sharma@healthai.org',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        bio: 'Computer Vision Researcher specializing in Medical AI & 3D CT scan segmentation. Active hackathon mentor.',
        location: 'Boston, MA',
        role: 'RESEARCHER',
        availability: 'AVAILABLE',
        yearsExperience: 6,
        createdAt: '2026-01-15T09:00:00Z',
        updatedAt: '2026-10-02T10:00:00Z'
      },
      {
        id: 'u-arun',
        name: 'Arun Patel',
        email: 'arun.patel@deepmindset.ai',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        bio: 'Senior ML Engineer & Data Scientist. Deep focus on PyTorch pipelines, clinical predictive modeling.',
        location: 'Seattle, WA',
        role: 'DEVELOPER',
        availability: 'AVAILABLE',
        yearsExperience: 5,
        createdAt: '2026-01-16T11:00:00Z',
        updatedAt: '2026-10-02T14:30:00Z'
      },
      {
        id: 'u-rahul',
        name: 'Rahul Verma',
        email: 'rahul.verma@cloudcraft.io',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        bio: 'Backend & Distributed Systems Engineer. Node.js, PostgreSQL high-load queries, Dockerized microservices.',
        location: 'Austin, TX',
        role: 'DEVELOPER',
        availability: 'AVAILABLE',
        yearsExperience: 5,
        createdAt: '2026-01-18T10:20:00Z',
        updatedAt: '2026-10-02T16:00:00Z'
      },
      {
        id: 'u-meena',
        name: 'Meena Iyer',
        email: 'meena.iyer@studiodesign.co',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
        bio: 'Lead UI/UX Product Designer & Design Technologist. Translates clinical complexity into crisp, humane interfaces.',
        location: 'New York, NY',
        role: 'DESIGNER',
        availability: 'AVAILABLE',
        yearsExperience: 4,
        createdAt: '2026-01-20T14:00:00Z',
        updatedAt: '2026-10-02T18:00:00Z'
      },
      {
        id: 'u-sophia',
        name: 'Sophia Lin',
        email: 'sophia.lin@k8sscale.net',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
        bio: 'Staff Cloud Architect & Kubernetes maintainer. Mentors on cloud-native infra, Helm, and zero-downtime rollouts.',
        location: 'Vancouver, Canada',
        role: 'MENTOR',
        availability: 'MENTORING_ONLY',
        yearsExperience: 9,
        createdAt: '2026-01-22T08:00:00Z',
        updatedAt: '2026-10-01T09:00:00Z'
      },
      {
        id: 'u-david',
        name: 'David Kim',
        email: 'david.kim@mobilevibe.dev',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
        bio: 'Flutter & Swift Mobile Engineer. Passionate about real-time offline-first mobile synchronization.',
        location: 'San Jose, CA',
        role: 'DEVELOPER',
        availability: 'OPEN_TO_PROJECTS',
        yearsExperience: 4,
        createdAt: '2026-01-25T13:00:00Z',
        updatedAt: '2026-10-01T15:00:00Z'
      },
      {
        id: 'u-elena',
        name: 'Elena Rostova',
        email: 'elena.rostova@nlpforge.ai',
        avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80',
        bio: 'NLP Specialist building semantic resume & career models. Exploring embedding clustering and RAG pipelines.',
        location: 'Zurich, Switzerland',
        role: 'RESEARCHER',
        availability: 'OPEN_TO_PROJECTS',
        yearsExperience: 5,
        createdAt: '2026-02-01T10:00:00Z',
        updatedAt: '2026-10-02T11:00:00Z'
      },
      {
        id: 'u-marcus',
        name: 'Marcus Vance',
        email: 'marcus.vance@zerotrust.io',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
        bio: 'Cybersecurity Architect. Zero-trust networks, encrypted communications, and audit-ready smart systems.',
        location: 'Chicago, IL',
        role: 'DEVELOPER',
        availability: 'BUSY',
        yearsExperience: 8,
        createdAt: '2026-02-05T09:00:00Z',
        updatedAt: '2026-09-30T10:00:00Z'
      },
      {
        id: 'u-carlos',
        name: 'Carlos Mendez',
        email: 'carlos.mendez@careerbot.tech',
        avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
        bio: 'Builder of AI Career Recommendation Engine. Passionate about talent discovery, skill taxonomies, and graph matching.',
        location: 'Barcelona, Spain',
        role: 'FOUNDER',
        availability: 'AVAILABLE',
        yearsExperience: 4,
        createdAt: '2026-02-08T14:00:00Z',
        updatedAt: '2026-10-01T17:00:00Z'
      },
      {
        id: 'u-aisha',
        name: 'Aisha Al-Mansoor',
        email: 'aisha.mansoor@biogen.org',
        avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&auto=format&fit=crop&q=80',
        bio: 'Computational Biologist & Data Scientist. Bridges genomic datasets with deep learning predictive markers.',
        location: 'Dubai, UAE',
        role: 'RESEARCHER',
        availability: 'AVAILABLE',
        yearsExperience: 6,
        createdAt: '2026-02-10T12:00:00Z',
        updatedAt: '2026-10-02T13:00:00Z'
      },
      {
        id: 'u-vikram',
        name: 'Vikram Rao',
        email: 'vikram.rao@rustcore.dev',
        avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
        bio: 'Systems engineer writing ultra-low latency Rust backends and event streams with Kafka and Tokio.',
        location: 'Bengaluru, India',
        role: 'DEVELOPER',
        availability: 'OPEN_TO_PROJECTS',
        yearsExperience: 7,
        createdAt: '2026-02-12T07:30:00Z',
        updatedAt: '2026-10-01T12:00:00Z'
      },
      {
        id: 'u-maya',
        name: 'Maya Patel',
        email: 'maya.patel@productlead.co',
        avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80',
        bio: 'Product Manager & Community Strategist. Specializes in 0-to-1 hackathon execution and validation metrics.',
        location: 'London, UK',
        role: 'MENTOR',
        availability: 'MENTORING_ONLY',
        yearsExperience: 8,
        createdAt: '2026-02-14T09:00:00Z',
        updatedAt: '2026-10-02T16:00:00Z'
      },
      {
        id: 'u-jordan',
        name: 'Jordan Hayes',
        email: 'jordan.hayes@web3d.art',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
        bio: 'Creative Frontend Engineer. Three.js, React Flow, WebGL shader interactions, and high-performance canvases.',
        location: 'Portland, OR',
        role: 'DEVELOPER',
        availability: 'AVAILABLE',
        yearsExperience: 4,
        createdAt: '2026-02-18T16:00:00Z',
        updatedAt: '2026-10-02T19:00:00Z'
      },
      {
        id: 'u-lucas',
        name: 'Lucas Dubois',
        email: 'lucas.dubois@aigov.eu',
        avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150&auto=format&fit=crop&q=80',
        bio: 'AI Ethics, Safety & Regulatory Compliance Lead. Advisor on algorithmic fairness and EU AI Act readiness.',
        location: 'Paris, France',
        role: 'MENTOR',
        availability: 'MENTORING_ONLY',
        yearsExperience: 10,
        createdAt: '2026-02-20T10:00:00Z',
        updatedAt: '2026-10-01T14:00:00Z'
      },
      {
        id: 'u-rachel',
        name: 'Rachel Green',
        email: 'rachel.green@pipelinedata.io',
        avatar: 'https://images.unsplash.com/photo-1534751516642-a171edd25218?w=150&auto=format&fit=crop&q=80',
        bio: 'Data Engineer scaling petabyte-scale lakehouses with Apache Spark, DBT, and Snowflake analytics.',
        location: 'Denver, CO',
        role: 'DEVELOPER',
        availability: 'OPEN_TO_PROJECTS',
        yearsExperience: 6,
        createdAt: '2026-02-22T11:00:00Z',
        updatedAt: '2026-09-28T09:00:00Z'
      },
      {
        id: 'u-kenji',
        name: 'Kenji Sato',
        email: 'kenji.sato@tinyml.jp',
        avatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&auto=format&fit=crop&q=80',
        bio: 'Edge AI Firmware Engineer. Microcontrollers, STM32, ARM Cortex-M, running quantized neural nets on 128KB RAM.',
        location: 'Tokyo, Japan',
        role: 'DEVELOPER',
        availability: 'AVAILABLE',
        yearsExperience: 7,
        createdAt: '2026-02-25T08:00:00Z',
        updatedAt: '2026-10-02T10:00:00Z'
      },
      {
        id: 'u-sarah',
        name: 'Sarah Connor',
        email: 'sarah.connor@devopsguard.net',
        avatar: 'https://images.unsplash.com/photo-1548142813-c348350df52b?w=150&auto=format&fit=crop&q=80',
        bio: 'Platform Engineer automating production pipelines with GitHub Actions, Terraform, and Prometheus observability.',
        location: 'Berlin, Germany',
        role: 'DEVELOPER',
        availability: 'AVAILABLE',
        yearsExperience: 5,
        createdAt: '2026-02-26T15:00:00Z',
        updatedAt: '2026-10-02T08:00:00Z'
      },
      {
        id: 'u-chloe',
        name: 'Chloe Bennett',
        email: 'chloe.bennett@sonicaudio.ai',
        avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80',
        bio: 'Audio AI Researcher. Real-time neural voice conversion, speech synthesis, and latency-optimized websockets.',
        location: 'Montreal, Canada',
        role: 'RESEARCHER',
        availability: 'AVAILABLE',
        yearsExperience: 4,
        createdAt: '2026-03-01T12:00:00Z',
        updatedAt: '2026-10-01T18:00:00Z'
      },
      {
        id: 'u-tariq',
        name: 'Tariq Johnson',
        email: 'tariq.johnson@ecotrack.org',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
        bio: 'Climate Tech builder. Auditable carbon reduction tracking, verified IoT sensor streams, PostgreSQL analytics.',
        location: 'Atlanta, GA',
        role: 'FOUNDER',
        availability: 'OPEN_TO_PROJECTS',
        yearsExperience: 5,
        createdAt: '2026-03-02T14:00:00Z',
        updatedAt: '2026-10-02T15:00:00Z'
      },
      {
        id: 'u-ananya',
        name: 'Ananya Desai',
        email: 'ananya.desai@pulsebio.med',
        avatar: 'https://images.unsplash.com/photo-1573497161161-c3e73707e25c?w=150&auto=format&fit=crop&q=80',
        bio: 'Clinical Informatics & FHIR Specialist. Medical terminology graphs, EHR interoperability, patient telemetry.',
        location: 'Philadelphia, PA',
        role: 'RESEARCHER',
        availability: 'AVAILABLE',
        yearsExperience: 6,
        createdAt: '2026-03-05T09:00:00Z',
        updatedAt: '2026-10-02T12:00:00Z'
      },
      {
        id: 'u-felix',
        name: 'Felix Meier',
        email: 'felix.meier@dronevision.ch',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
        bio: 'Computer Vision & SLAM specialist. Drone autonomous navigation, crop disease detection, stereo depth mapping.',
        location: 'Zurich, Switzerland',
        role: 'FOUNDER',
        availability: 'AVAILABLE',
        yearsExperience: 6,
        createdAt: '2026-03-08T10:00:00Z',
        updatedAt: '2026-10-01T16:00:00Z'
      },
      {
        id: 'u-nina',
        name: 'Nina Kowalski',
        email: 'nina.kowalski@accessibility.ui',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
        bio: 'Design Systems & Inclusive UX Lead. WCAG AAA compliance, cognitive load optimization, high-contrast dark modes.',
        location: 'Warsaw, Poland',
        role: 'DESIGNER',
        availability: 'OPEN_TO_PROJECTS',
        yearsExperience: 7,
        createdAt: '2026-03-10T11:00:00Z',
        updatedAt: '2026-10-02T09:00:00Z'
      },
      {
        id: 'u-liam',
        name: 'Liam O\'Connor',
        email: 'liam.oconnor@graphqlmesh.ie',
        avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
        bio: 'TypeScript & GraphQL Architect. High-throughput federated data graphs and real-time subscription routing.',
        location: 'Dublin, Ireland',
        role: 'DEVELOPER',
        availability: 'AVAILABLE',
        yearsExperience: 5,
        createdAt: '2026-03-12T13:00:00Z',
        updatedAt: '2026-10-02T14:00:00Z'
      },
      {
        id: 'u-fatima',
        name: 'Fatima Al-Zahra',
        email: 'fatima.zahra@deliverymesh.ai',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        bio: 'Autonomous Robotics Engineer. Multi-agent obstacle avoidance, lidar sensor fusion, ROS 2 path planning.',
        location: 'Riyadh, Saudi Arabia',
        role: 'FOUNDER',
        availability: 'OPEN_TO_PROJECTS',
        yearsExperience: 5,
        createdAt: '2026-03-15T09:30:00Z',
        updatedAt: '2026-10-01T15:30:00Z'
      },
      {
        id: 'u-kevin',
        name: 'Kevin Zhang',
        email: 'kevin.zhang@vectorindex.io',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        bio: 'Vector Database & Retrieval Optimization Specialist. Hybrid lexical-dense embeddings, Milvus & Pinecone benchmark tuning.',
        location: 'San Francisco, CA',
        role: 'DEVELOPER',
        availability: 'AVAILABLE',
        yearsExperience: 4,
        createdAt: '2026-03-18T14:00:00Z',
        updatedAt: '2026-10-02T11:30:00Z'
      },
      {
        id: 'u-samantha',
        name: 'Samantha Reed',
        email: 'samantha.reed@clinicaltrials.org',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
        bio: 'Biostatistician & Clinical Trial Methodologist. Power analysis, Bayesian survival modeling, biomarker discovery.',
        location: 'Baltimore, MD',
        role: 'RESEARCHER',
        availability: 'OPEN_TO_PROJECTS',
        yearsExperience: 8,
        createdAt: '2026-03-20T10:00:00Z',
        updatedAt: '2026-09-29T16:00:00Z'
      },
      {
        id: 'u-gabriel',
        name: 'Gabriel Santos',
        email: 'gabriel.santos@spatialxr.io',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        bio: 'XR & Spatial Computing Developer. Unity Vision Pro applications, interactive 3D anatomy visualization.',
        location: 'São Paulo, Brazil',
        role: 'DEVELOPER',
        availability: 'AVAILABLE',
        yearsExperience: 5,
        createdAt: '2026-03-22T15:00:00Z',
        updatedAt: '2026-10-01T19:00:00Z'
      },
      {
        id: 'u-olivia',
        name: 'Olivia Taylor',
        email: 'olivia.taylor@communityops.dev',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
        bio: 'Developer Community Advocate & Tech Writer. API documentation, developer onboarding workshops, hackathon organizing.',
        location: 'Toronto, Canada',
        role: 'STUDENT',
        availability: 'AVAILABLE',
        yearsExperience: 3,
        createdAt: '2026-03-25T11:00:00Z',
        updatedAt: '2026-10-02T13:30:00Z'
      },
      {
        id: 'u-daniel',
        name: 'Daniel Berg',
        email: 'daniel.berg@dbperf.io',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
        bio: 'Database Reliability Engineer. PostgreSQL index optimization, vacuum tuning, zero-loss replication, Redis clustering.',
        location: 'Stockholm, Sweden',
        role: 'MENTOR',
        availability: 'MENTORING_ONLY',
        yearsExperience: 11,
        createdAt: '2026-03-28T09:00:00Z',
        updatedAt: '2026-10-02T10:00:00Z'
      }
    ];
    userList.forEach(u => this.users.set(u.id, u));

    // 4. USER SKILLS
    const userSkillMappings: { u: string; s: string; p: number; exp: number; ver: boolean }[] = [
      // Alex Chen
      { u: 'u-alex', s: 'sk-node', p: 92, exp: 6, ver: true },
      { u: 'u-alex', s: 'sk-react', p: 95, exp: 7, ver: true },
      { u: 'u-alex', s: 'sk-cloud', p: 88, exp: 5, ver: true },
      { u: 'u-alex', s: 'sk-pg', p: 85, exp: 5, ver: true },

      // Priya Sharma (DEMO STAR - Computer Vision / Medical AI)
      { u: 'u-priya', s: 'sk-cv', p: 98, exp: 6, ver: true },
      { u: 'u-priya', s: 'sk-py', p: 95, exp: 6, ver: true },
      { u: 'u-priya', s: 'sk-medai', p: 94, exp: 5, ver: true },
      { u: 'u-priya', s: 'sk-ml', p: 90, exp: 5, ver: true },

      // Arun Patel (DEMO STAR - Machine Learning / Python / Data Science)
      { u: 'u-arun', s: 'sk-ml', p: 96, exp: 5, ver: true },
      { u: 'u-arun', s: 'sk-py', p: 94, exp: 5, ver: true },
      { u: 'u-arun', s: 'sk-ds', p: 92, exp: 4, ver: true },
      { u: 'u-arun', s: 'sk-medai', p: 80, exp: 3, ver: true },

      // Rahul Verma (DEMO STAR - Node.js / Backend / PostgreSQL)
      { u: 'u-rahul', s: 'sk-node', p: 95, exp: 5, ver: true },
      { u: 'u-rahul', s: 'sk-pg', p: 94, exp: 5, ver: true },
      { u: 'u-rahul', s: 'sk-docker', p: 88, exp: 4, ver: true },
      { u: 'u-rahul', s: 'sk-cloud', p: 82, exp: 3, ver: false },

      // Meena Iyer (DEMO STAR - UI/UX / Figma / React)
      { u: 'u-meena', s: 'sk-uiux', p: 98, exp: 5, ver: true },
      { u: 'u-meena', s: 'sk-figma', p: 96, exp: 5, ver: true },
      { u: 'u-meena', s: 'sk-react', p: 88, exp: 4, ver: true },

      // Sophia Lin (Kubernetes Mentor)
      { u: 'u-sophia', s: 'sk-k8s', p: 99, exp: 9, ver: true },
      { u: 'u-sophia', s: 'sk-cloud', p: 95, exp: 8, ver: true },
      { u: 'u-sophia', s: 'sk-docker', p: 95, exp: 8, ver: true },

      // David Kim (Mobile)
      { u: 'u-david', s: 'sk-mobile', p: 94, exp: 5, ver: true },
      { u: 'u-david', s: 'sk-react', p: 84, exp: 3, ver: true },

      // Elena Rostova (NLP)
      { u: 'u-elena', s: 'sk-nlp', p: 96, exp: 5, ver: true },
      { u: 'u-elena', s: 'sk-py', p: 92, exp: 5, ver: true },
      { u: 'u-elena', s: 'sk-vdb', p: 88, exp: 3, ver: true },
      { u: 'u-elena', s: 'sk-ml', p: 90, exp: 4, ver: true },

      // Marcus Vance (Security)
      { u: 'u-marcus', s: 'sk-sec', p: 97, exp: 8, ver: true },
      { u: 'u-marcus', s: 'sk-cloud', p: 86, exp: 6, ver: true },

      // Carlos Mendez (Career Engine / Overlap)
      { u: 'u-carlos', s: 'sk-nlp', p: 90, exp: 4, ver: true },
      { u: 'u-carlos', s: 'sk-ml', p: 88, exp: 4, ver: true },
      { u: 'u-carlos', s: 'sk-py', p: 89, exp: 4, ver: true },

      // Aisha Al-Mansoor (Bioinformatics)
      { u: 'u-aisha', s: 'sk-medai', p: 95, exp: 6, ver: true },
      { u: 'u-aisha', s: 'sk-ds', p: 92, exp: 5, ver: true },
      { u: 'u-aisha', s: 'sk-py', p: 90, exp: 5, ver: true },

      // Vikram Rao (Rust)
      { u: 'u-vikram', s: 'sk-rust', p: 98, exp: 7, ver: true },
      { u: 'u-vikram', s: 'sk-cloud', p: 90, exp: 6, ver: true },

      // Maya Patel (Product)
      { u: 'u-maya', s: 'sk-uiux', p: 86, exp: 6, ver: true },

      // Jordan Hayes (Frontend 3D)
      { u: 'u-jordan', s: 'sk-react', p: 94, exp: 4, ver: true },
      { u: 'u-jordan', s: 'sk-uiux', p: 89, exp: 4, ver: true },

      // Kenji Sato (Edge AI)
      { u: 'u-kenji', s: 'sk-edgeml', p: 96, exp: 7, ver: true },
      { u: 'u-kenji', s: 'sk-cv', p: 84, exp: 4, ver: true },

      // Sarah Connor (DevOps)
      { u: 'u-sarah', s: 'sk-docker', p: 93, exp: 5, ver: true },
      { u: 'u-sarah', s: 'sk-k8s', p: 87, exp: 4, ver: true },

      // Chloe Bennett (Audio AI)
      { u: 'u-chloe', s: 'sk-audio', p: 95, exp: 4, ver: true },
      { u: 'u-chloe', s: 'sk-py', p: 90, exp: 4, ver: true },

      // Tariq Johnson (EcoTrack)
      { u: 'u-tariq', s: 'sk-pg', p: 89, exp: 5, ver: true },
      { u: 'u-tariq', s: 'sk-node', p: 86, exp: 4, ver: true },

      // Ananya Desai (PulseBio)
      { u: 'u-ananya', s: 'sk-medai', p: 96, exp: 6, ver: true },
      { u: 'u-ananya', s: 'sk-py', p: 88, exp: 5, ver: true },

      // Felix Meier (Drone CV)
      { u: 'u-felix', s: 'sk-cv', p: 95, exp: 6, ver: true },
      { u: 'u-felix', s: 'sk-robotics', p: 92, exp: 5, ver: true },

      // Nina Kowalski (UX)
      { u: 'u-nina', s: 'sk-uiux', p: 97, exp: 7, ver: true },
      { u: 'u-nina', s: 'sk-figma', p: 95, exp: 6, ver: true },

      // Liam O'Connor (GraphQL)
      { u: 'u-liam', s: 'sk-graphql', p: 94, exp: 5, ver: true },
      { u: 'u-liam', s: 'sk-node', p: 91, exp: 5, ver: true },

      // Fatima Al-Zahra (Robotics)
      { u: 'u-fatima', s: 'sk-robotics', p: 95, exp: 5, ver: true },
      { u: 'u-fatima', s: 'sk-cv', p: 86, exp: 4, ver: true },

      // Kevin Zhang (Vector DB)
      { u: 'u-kevin', s: 'sk-vdb', p: 96, exp: 4, ver: true },
      { u: 'u-kevin', s: 'sk-nlp', p: 88, exp: 3, ver: true },

      // Daniel Berg (Database Mentor)
      { u: 'u-daniel', s: 'sk-pg', p: 99, exp: 11, ver: true }
    ];

    userSkillMappings.forEach((m, idx) => {
      const id = `us-${idx + 1}`;
      this.userSkills.set(id, {
        id,
        userId: m.u,
        skillId: m.s,
        proficiency: m.p,
        yearsExperience: m.exp,
        verified: m.ver,
        lastUsedAt: '2026-09-15T00:00:00Z'
      });
    });

    // 5. USER INTERESTS
    const interestMappings = [
      { u: 'u-alex', i: ['int-health', 'int-agents'] },
      { u: 'u-priya', i: ['int-health', 'int-agents'] },
      { u: 'u-arun', i: ['int-health', 'int-creative'] },
      { u: 'u-rahul', i: ['int-health', 'int-devops'] },
      { u: 'u-meena', i: ['int-health', 'int-creative'] },
      { u: 'u-sophia', i: ['int-devops', 'int-privacy'] },
      { u: 'u-elena', i: ['int-edtech', 'int-agents'] },
      { u: 'u-carlos', i: ['int-edtech', 'int-agents'] },
      { u: 'u-felix', i: ['int-climate', 'int-robotics'] },
      { u: 'u-tariq', i: ['int-climate', 'int-fintech'] }
    ];
    let uiCount = 0;
    interestMappings.forEach(mapping => {
      mapping.i.forEach(intId => {
        uiCount++;
        this.userInterests.set(`ui-${uiCount}`, {
          id: `ui-${uiCount}`,
          userId: mapping.u,
          interestId: intId
        });
      });
    });

    // 6. PROJECTS (10 projects)
    const projectList: Project[] = [
      {
        id: 'proj-health',
        name: 'AI Healthcare Assistant',
        description: 'Autonomous clinical diagnostics support platform with 3D medical imaging analysis and real-time triage recommendation engine.',
        domain: 'Healthcare AI',
        status: 'RECRUITING',
        ownerId: 'u-alex',
        requiredSkillIds: ['sk-cv', 'sk-ml', 'sk-node', 'sk-uiux'],
        createdAt: '2026-09-10T10:00:00Z',
        updatedAt: '2026-10-02T12:00:00Z'
      },
      {
        id: 'proj-resume',
        name: 'AI Resume Analyzer',
        description: 'Semantic parsing and gap analysis for technical candidate profiles using embedding similarity and ATS scoring models.',
        domain: 'Talent & HR Tech',
        status: 'IN_PROGRESS',
        ownerId: 'u-elena',
        requiredSkillIds: ['sk-nlp', 'sk-py', 'sk-ml', 'sk-vdb'],
        createdAt: '2026-08-15T09:00:00Z',
        updatedAt: '2026-09-25T14:00:00Z'
      },
      {
        id: 'proj-career',
        name: 'AI Career Recommendation Engine',
        description: 'Intelligent career trajectory forecasting using graph-based skill taxonomies and real-time job market semantic matching.',
        domain: 'Talent & HR Tech',
        status: 'IN_PROGRESS',
        ownerId: 'u-carlos',
        requiredSkillIds: ['sk-nlp', 'sk-py', 'sk-ml', 'sk-react'],
        createdAt: '2026-08-20T11:00:00Z',
        updatedAt: '2026-09-28T16:00:00Z'
      },
      {
        id: 'proj-agri',
        name: 'AgriTech Drone Vision',
        description: 'Edge-computed aerial crop health analytics and pest detection using multispectral camera feeds.',
        domain: 'Climate & Agriculture',
        status: 'IN_PROGRESS',
        ownerId: 'u-felix',
        requiredSkillIds: ['sk-cv', 'sk-edgeml', 'sk-robotics', 'sk-py'],
        createdAt: '2026-07-12T08:00:00Z',
        updatedAt: '2026-09-15T10:00:00Z'
      },
      {
        id: 'proj-delivery',
        name: 'Autonomous Delivery Mesh',
        description: 'Decentralized multi-robot delivery routing and kinematic obstacle avoidance in pedestrian environments.',
        domain: 'Robotics',
        status: 'IDEA',
        ownerId: 'u-fatima',
        requiredSkillIds: ['sk-robotics', 'sk-cv', 'sk-rust'],
        createdAt: '2026-09-01T12:00:00Z',
        updatedAt: '2026-09-29T11:00:00Z'
      },
      {
        id: 'proj-ecotrack',
        name: 'EcoTrack Carbon Ledger',
        description: 'Verifiable carbon offset telemetry tracking for enterprise supply chains with high-frequency sensor ingest.',
        domain: 'Climate Tech',
        status: 'IN_PROGRESS',
        ownerId: 'u-tariq',
        requiredSkillIds: ['sk-pg', 'sk-node', 'sk-cloud'],
        createdAt: '2026-06-18T14:00:00Z',
        updatedAt: '2026-09-20T17:00:00Z'
      },
      {
        id: 'proj-pulsebio',
        name: 'PulseBio Clinical Intelligence',
        description: 'Continuous ICU telemetry anomaly detector leveraging Bayesian filters and clinical ontology mapping.',
        domain: 'Healthcare AI',
        status: 'IDEA',
        ownerId: 'u-ananya',
        requiredSkillIds: ['sk-medai', 'sk-py', 'sk-ds', 'sk-cv'],
        createdAt: '2026-09-14T08:00:00Z',
        updatedAt: '2026-10-01T15:00:00Z'
      },
      {
        id: 'proj-audio',
        name: 'OmniVoice Realtime Agent',
        description: 'Sub-150ms speech-to-speech AI agent featuring expressive vocal cadence and zero-shot voice cloning.',
        domain: 'Audio & Conversational AI',
        status: 'IN_PROGRESS',
        ownerId: 'u-chloe',
        requiredSkillIds: ['sk-audio', 'sk-py', 'sk-node', 'sk-react'],
        createdAt: '2026-08-05T13:00:00Z',
        updatedAt: '2026-10-02T16:00:00Z'
      },
      {
        id: 'proj-edgeguard',
        name: 'EdgeGuard IoT Sentinel',
        description: 'Microcontroller intrusion prevention system using quantized anomaly detection on industrial controllers.',
        domain: 'Cybersecurity & Hardware',
        status: 'IN_PROGRESS',
        ownerId: 'u-kenji',
        requiredSkillIds: ['sk-edgeml', 'sk-sec', 'sk-rust'],
        createdAt: '2026-07-28T16:00:00Z',
        updatedAt: '2026-09-27T12:00:00Z'
      },
      {
        id: 'proj-campusskill',
        name: 'CampusSkill Peer Exchange',
        description: 'Student-to-student peer mentorship and skill-barter micro-platform for university technical cohorts.',
        domain: 'EdTech',
        status: 'LAUNCHED',
        ownerId: 'u-maya',
        requiredSkillIds: ['sk-react', 'sk-node', 'sk-uiux'],
        createdAt: '2026-05-10T10:00:00Z',
        updatedAt: '2026-09-18T14:00:00Z'
      }
    ];
    projectList.forEach(p => this.projects.set(p.id, p));

    // 7. PROBLEMS (5 problems)
    const problemList: Problem[] = [
      {
        id: 'prob-1',
        title: 'High-speed 3D DICOM rendering on low-tier mobile devices',
        description: 'WebGL pipeline stutters when segmenting dense 512x512 volumetric CT scans on mobile Safari.',
        domain: 'Healthcare AI',
        status: 'OPEN',
        createdBy: 'u-alex',
        createdAt: '2026-09-22T10:00:00Z'
      },
      {
        id: 'prob-2',
        title: 'Kubernetes ingress latency spikes during multi-tenant model updates',
        description: 'Rolling pod updates cause intermittent 502 bad gateway spikes on ingress controllers.',
        domain: 'Cloud Infrastructure',
        status: 'OPEN',
        createdBy: 'u-rahul',
        createdAt: '2026-09-24T14:30:00Z'
      },
      {
        id: 'prob-3',
        title: 'Quantization loss in lightweight TinyML edge models',
        description: 'INT8 post-training quantization degrades vision accuracy by over 14% on noisy daylight frames.',
        domain: 'Edge AI',
        status: 'IN_DISCUSSION',
        createdBy: 'u-felix',
        createdAt: '2026-09-26T11:00:00Z'
      },
      {
        id: 'prob-4',
        title: 'Semantic drift in automated career taxonomy clustering',
        description: 'Emerging tech titles like "Prompt Engineer" get misclassified into legacy software buckets.',
        domain: 'Talent & HR Tech',
        status: 'OPEN',
        createdBy: 'u-elena',
        createdAt: '2026-09-27T09:00:00Z'
      },
      {
        id: 'prob-5',
        title: 'High gas fees on high-frequency IoT carbon verification blocks',
        description: 'Need off-chain zero-knowledge rollup state proofs before committing to base ledger.',
        domain: 'Climate Tech',
        status: 'SOLVED',
        createdBy: 'u-tariq',
        createdAt: '2026-09-15T08:00:00Z'
      }
    ];
    problemList.forEach(pr => this.problems.set(pr.id, pr));

    // 8. EVENTS (3 events)
    const eventList: CommunityEvent[] = [
      {
        id: 'ev-1',
        title: 'Global HealthTech & AI Hackathon 2026',
        description: '48-hour sprint to build next-generation clinical decision support tools and computer vision diagnostic aids.',
        domain: 'Healthcare AI',
        requiredSkills: ['Computer Vision', 'Machine Learning', 'Python', 'UI/UX'],
        date: '2026-10-15T09:00:00Z',
        location: 'Virtual & San Francisco Hub'
      },
      {
        id: 'ev-2',
        title: 'Kubernetes & Cloud Resilience Workshop',
        description: 'Deep dive into zero-downtime microservice orchestration, service mesh topologies, and eBPF monitoring.',
        domain: 'Cloud Infrastructure',
        requiredSkills: ['Kubernetes', 'Cloud Architecture', 'Docker'],
        date: '2026-10-20T17:00:00Z',
        location: 'Community Live Stage'
      },
      {
        id: 'ev-3',
        title: 'Robotics & Edge AI Demo Day',
        description: 'Showcase of autonomous aerial drones, sensory fusion systems, and low-power hardware implementations.',
        domain: 'Robotics',
        requiredSkills: ['Robotics', 'Edge AI', 'Computer Vision'],
        date: '2026-11-02T14:00:00Z',
        location: 'Innovation Lab A'
      }
    ];
    eventList.forEach(e => this.events.set(e.id, e));

    // 9. SKILL GAPS (5 skill gaps - Computer Vision is highlight!)
    const skillGapList: SkillGap[] = [
      {
        id: 'sg-cv',
        skillId: 'sk-cv',
        skillName: 'Computer Vision',
        demandScore: 17, // 17 active projects need it
        supplyScore: 6,  // only 6 active members have expertise
        gapScore: 84,
        gapLevel: 'CRITICAL',
        explanation: '17 active projects currently require Computer Vision while only 6 active members have verified expertise.',
        createdAt: '2026-10-01T00:00:00Z'
      },
      {
        id: 'sg-k8s',
        skillId: 'sk-k8s',
        skillName: 'Kubernetes',
        demandScore: 14,
        supplyScore: 4,
        gapScore: 78,
        gapLevel: 'HIGH',
        explanation: 'Heavy infrastructure demand for multi-region microservices deployment exceeds available cluster administrators.',
        createdAt: '2026-10-01T00:00:00Z'
      },
      {
        id: 'sg-sec',
        skillId: 'sk-sec',
        skillName: 'Cybersecurity',
        demandScore: 11,
        supplyScore: 3,
        gapScore: 73,
        gapLevel: 'HIGH',
        explanation: 'Zero-trust verification requirements in healthcare and fintech projects are constrained by limited security reviewers.',
        createdAt: '2026-10-01T00:00:00Z'
      },
      {
        id: 'sg-edgeml',
        skillId: 'sk-edgeml',
        skillName: 'Edge AI',
        demandScore: 8,
        supplyScore: 3,
        gapScore: 62,
        gapLevel: 'MEDIUM',
        explanation: 'Emerging robotics and drone projects seek embedded NPU optimization specialists.',
        createdAt: '2026-10-01T00:00:00Z'
      },
      {
        id: 'sg-medai',
        skillId: 'sk-medai',
        skillName: 'Medical AI',
        demandScore: 12,
        supplyScore: 5,
        gapScore: 65,
        gapLevel: 'MEDIUM',
        explanation: 'High concentration of biomedical hackathon proposals against a specialized pool of clinical ML engineers.',
        createdAt: '2026-10-01T00:00:00Z'
      }
    ];
    skillGapList.forEach(sg => this.skillGaps.set(sg.id, sg));

    // 10. HIDDEN OPPORTUNITIES (8 initial opportunities)
    const initialOpportunities: Opportunity[] = [
      {
        id: 'opp-1',
        type: 'COLLABORATION',
        title: 'Priya Sharma could solve your Computer Vision capability gap',
        description: 'Priya has 98% verified Computer Vision mastery and is actively available for Healthcare AI initiatives.',
        score: 0.96,
        reasons: [
          'Priya covers your project’s highest-priority missing capability: Computer Vision',
          'Both share explicit research focus on Healthcare AI & diagnostic imaging',
          'Alex’s project "AI Healthcare Assistant" has an open recruiting status',
          'Priya has availability status marked as AVAILABLE'
        ],
        status: 'ACTIVE',
        memberUserIds: ['u-alex', 'u-priya'],
        relatedProjectId: 'proj-health',
        createdAt: '2026-10-02T08:30:00Z'
      },
      {
        id: 'opp-2',
        type: 'PROJECT_OVERLAP',
        title: 'Project Overlap: AI Resume Analyzer & AI Career Recommendation Engine',
        description: 'Both projects address semantic talent qualification using identical embeddings and vector similarity pipelines.',
        score: 0.92,
        reasons: [
          'Shared domain: Talent & HR Tech',
          'Overlapping skill requirements: NLP, Python, Machine Learning',
          'Complementary capabilities: Elena brings vector DB specialization, Carlos brings UI & market integrations',
          'High synergy for team introduction or dataset consolidation'
        ],
        status: 'ACTIVE',
        memberUserIds: ['u-elena', 'u-carlos'],
        relatedProjectId: 'proj-resume',
        createdAt: '2026-10-02T09:15:00Z'
      },
      {
        id: 'opp-3',
        type: 'MENTORSHIP',
        title: 'Sophia Lin can mentor on Kubernetes ingress latency issue',
        description: 'Sophia has 9 years of Kubernetes cluster production maintenance and currently accepts mentorship requests.',
        score: 0.94,
        reasons: [
          'Direct match for problem: "Kubernetes ingress latency spikes during multi-tenant model updates"',
          'Sophia maintains open MENTORING_ONLY availability',
          'Verified 99% proficiency in Kubernetes & distributed cloud architecture'
        ],
        status: 'ACTIVE',
        memberUserIds: ['u-rahul', 'u-sophia'],
        createdAt: '2026-10-02T10:00:00Z'
      },
      {
        id: 'opp-4',
        type: 'COLLABORATION',
        title: 'Felix Meier & Kenji Sato: Drone Edge AI Hardware Synergy',
        description: 'Felix needs on-device model quantization for AgriTech drones, perfectly matching Kenji’s TinyML firmware expertise.',
        score: 0.89,
        reasons: [
          'Solves Felix’s reported problem on quantization accuracy loss in sunlight',
          'Kenji has 7 years experience in STM32 & embedded NPU pipelines',
          'Both users marked as AVAILABLE'
        ],
        status: 'ACTIVE',
        memberUserIds: ['u-felix', 'u-kenji'],
        relatedProjectId: 'proj-agri',
        createdAt: '2026-10-02T11:20:00Z'
      },
      {
        id: 'opp-5',
        type: 'TEAM_FORMATION',
        title: 'Full-Stack Quad Assembly for AI Healthcare Assistant',
        description: 'Optimal 4-person multidisciplinary team found: Priya (Vision), Arun (ML/Data), Rahul (Backend), Meena (UI/UX).',
        score: 0.96,
        reasons: [
          '100% skill coverage across all required capabilities',
          '4/4 candidates currently AVAILABLE with no scheduling conflicts',
          'Zero redundant capability overlap; optimal multidisciplinary distribution'
        ],
        status: 'ACTIVE',
        memberUserIds: ['u-priya', 'u-arun', 'u-rahul', 'u-meena'],
        relatedProjectId: 'proj-health',
        createdAt: '2026-10-02T13:00:00Z'
      },
      {
        id: 'opp-6',
        type: 'SKILL_GAP',
        title: 'Community Skill Gap Alert: Computer Vision Critical Shortage',
        description: '17 active projects require Computer Vision, but only 6 community members possess relevant expertise.',
        score: 0.91,
        reasons: [
          'High project demand growth (+35% this month)',
          'Supply constraint: 3 of 6 experts currently allocated to active projects',
          'Recommendation: Sponsor community workshop or peer cohort'
        ],
        status: 'ACTIVE',
        memberUserIds: ['u-alex'],
        createdAt: '2026-10-02T14:45:00Z'
      },
      {
        id: 'opp-7',
        type: 'COLLABORATION',
        title: 'Ananya Desai & Priya Sharma: Medical Imaging Diagnostic Cross-Check',
        description: 'Ananya’s clinical ICU telemetry project could integrate Priya’s 3D radiological segmentation models.',
        score: 0.88,
        reasons: [
          'Shared domain: Healthcare AI & clinical diagnostics',
          'Priya and Ananya both actively published in medical AI forums',
          'High complementary value between radiological vision and physiological telemetry'
        ],
        status: 'ACTIVE',
        memberUserIds: ['u-ananya', 'u-priya'],
        relatedProjectId: 'proj-pulsebio',
        createdAt: '2026-10-02T15:30:00Z'
      },
      {
        id: 'opp-8',
        type: 'EVENT_MATCH',
        title: 'Global HealthTech & AI Hackathon: Team Formation Signal',
        description: 'Upcoming hackathon on Oct 15 matches 8 available community members looking for teammates.',
        score: 0.87,
        reasons: [
          'Required skills (Vision, ML, UI/UX) strongly represented by available members',
          'Alex and Priya both interested in submitting AI Healthcare prototypes'
        ],
        status: 'ACTIVE',
        memberUserIds: ['u-alex', 'u-priya', 'u-meena'],
        createdAt: '2026-10-02T16:00:00Z'
      }
    ];
    initialOpportunities.forEach(op => this.opportunities.set(op.id, op));

    // 11. MENTOR MATCHES
    const mentorList: MentorMatch[] = [
      {
        id: 'mm-1',
        menteeId: 'u-alex',
        mentorId: 'u-sophia',
        skillId: 'sk-k8s',
        reason: 'Sophia has 9 years Kubernetes experience and specializes in resilient cloud microservices.',
        score: 0.95,
        status: 'AVAILABLE'
      },
      {
        id: 'mm-2',
        menteeId: 'u-rahul',
        mentorId: 'u-daniel',
        skillId: 'sk-pg',
        reason: 'Daniel is an 11-year database reliability lead who can assist with query optimization.',
        score: 0.94,
        status: 'AVAILABLE'
      },
      {
        id: 'mm-3',
        menteeId: 'u-arun',
        mentorId: 'u-lucas',
        skillId: 'sk-medai',
        reason: 'Lucas guides medical ethics and AI compliance for clinical health algorithms.',
        score: 0.91,
        status: 'AVAILABLE'
      },
      {
        id: 'mm-4',
        menteeId: 'u-meena',
        mentorId: 'u-nina',
        skillId: 'sk-uiux',
        reason: 'Nina is a staff design systems architect specializing in accessibility and design tokens.',
        score: 0.93,
        status: 'AVAILABLE'
      },
      {
        id: 'mm-5',
        menteeId: 'u-elena',
        mentorId: 'u-maya',
        skillId: 'sk-nlp',
        reason: 'Maya guides product validation and user research for AI-first applications.',
        score: 0.88,
        status: 'AVAILABLE'
      }
    ];
    mentorList.forEach(m => this.mentorMatches.set(m.id, m));

    // 12. COLLABORATION REQUESTS
    const collabList: CollaborationRequest[] = [
      {
        id: 'cr-1',
        fromUserId: 'u-carlos',
        toUserId: 'u-alex',
        projectId: 'proj-career',
        reason: 'Would love to discuss integrating your AI Healthcare skill taxonomy with our career engine.',
        status: 'PENDING',
        createdAt: '2026-10-02T14:00:00Z'
      },
      {
        id: 'cr-2',
        fromUserId: 'u-david',
        toUserId: 'u-alex',
        projectId: 'proj-health',
        reason: 'Offering Flutter mobile engineering support for your upcoming hackathon build.',
        status: 'PENDING',
        createdAt: '2026-10-02T15:30:00Z'
      },
      {
        id: 'cr-3',
        fromUserId: 'u-alex',
        toUserId: 'u-priya',
        projectId: 'proj-health',
        reason: 'Inviting you to lead the Computer Vision diagnostic module for AI Healthcare Assistant.',
        status: 'ACCEPTED',
        createdAt: '2026-10-01T09:00:00Z',
        respondedAt: '2026-10-01T11:00:00Z'
      }
    ];
    collabList.forEach(c => this.collaborationRequests.set(c.id, c));

    // 13. ACTIVITIES
    this.activities = [
      {
        id: 'act-1',
        userId: 'u-priya',
        userName: 'Priya Sharma',
        userAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        type: 'OPPORTUNITY_FOUND',
        description: 'New collaboration opportunity identified between Priya Sharma and Alex Chen for "AI Healthcare Assistant".',
        createdAt: '2026-10-02T08:30:00Z'
      },
      {
        id: 'act-2',
        userId: 'u-alex',
        userName: 'Alex Chen',
        userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        type: 'LENS_SCAN',
        description: 'Scanned hackathon poster with Community Lens: extracted 4 core skill requirements and 1 project archetype.',
        createdAt: '2026-10-02T09:00:00Z'
      },
      {
        id: 'act-3',
        userId: 'u-carlos',
        userName: 'Carlos Mendez',
        userAvatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
        type: 'PROJECT_COLLISION',
        description: 'Detected 92% semantic overlap between "AI Career Recommendation Engine" and "AI Resume Analyzer".',
        createdAt: '2026-10-02T09:15:00Z'
      },
      {
        id: 'act-4',
        userId: 'u-alex',
        userName: 'Alex Chen',
        userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        type: 'SKILL_GAP_ALERT',
        description: 'Community Intelligence Graph identified Critical Skill Gap: Computer Vision demand (17) vs supply (6).',
        createdAt: '2026-10-02T14:45:00Z'
      }
    ];

    // 14. AUDIT LOGS
    this.auditLogs = [
      {
        id: 'al-1',
        userId: 'u-alex',
        action: 'SYSTEM_SEED',
        entity: 'COMMUNITY',
        entityId: 'kyntra-core',
        metadata: { members: 30, skills: 22, projects: 10 },
        createdAt: '2026-10-01T00:00:00Z'
      }
    ];
  }

  clear() {
    this.users.clear();
    this.skills.clear();
    this.userSkills.clear();
    this.projects.clear();
    this.problems.clear();
    this.interests.clear();
    this.userInterests.clear();
    this.collaborationRequests.clear();
    this.teams.clear();
    this.teamMembers.clear();
    this.opportunities.clear();
    this.mentorMatches.clear();
    this.events.clear();
    this.skillGaps.clear();
    this.activities = [];
    this.auditLogs = [];
  }

  logAudit(userId: string, action: string, entity: string, entityId: string, metadata?: Record<string, any>) {
    const log: AuditLog = {
      id: `al-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      userId,
      action,
      entity,
      entityId,
      metadata,
      createdAt: new Date().toISOString()
    };
    this.auditLogs.unshift(log);
    return log;
  }

  logActivity(userId: string, type: Activity['type'], description: string, metadata?: Record<string, any>) {
    const user = this.users.get(userId);
    const act: Activity = {
      id: `act-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      userId,
      userName: user ? user.name : 'Community Member',
      userAvatar: user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      type,
      description,
      metadata,
      createdAt: new Date().toISOString()
    };
    this.activities.unshift(act);
    if (this.activities.length > 50) this.activities.pop();
    return act;
  }
}

export const db = new KyntraDatabase();
