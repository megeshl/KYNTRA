# KYNTRA — AI Community Intelligence & Collaboration Engine

<div align="center">

  <h1>KYNTRA</h1>
  <p><strong>"Discover. Assemble. Create."</strong></p>
  <p>An Intelligence Layer for Developer & Innovation Communities</p>

  <p>
    <a href="https://ais-dev-rdplaqdekdels2tjb52rzm-819057743971.asia-southeast1.run.app"><strong>🌐 Launch Live Interactive Prototype »</strong></a>
  </p>

  <p>
    <img src="https://img.shields.io/badge/Track-Community_App-00f0ff?style=for-the-badge&logo=google" alt="Community App Track" />
    <img src="https://img.shields.io/badge/Stack-React_19_+_Express-8b5cf6?style=for-the-badge&logo=react" alt="React + Express Stack" />
    <img src="https://img.shields.io/badge/Realtime-Socket.IO-10b981?style=for-the-badge&logo=socketdotio" alt="Socket.IO Realtime" />
    <img src="https://img.shields.io/badge/AI-Gemini_%2F_Deterministic_Engine-f59e0b?style=for-the-badge&logo=google-gemini" alt="AI Engine" />
  </p>

</div>

---

## 📌 Table of Contents
- [🌐 Live Prototype & App Links](#-live-prototype--app-links)
- [💡 What is KYNTRA?](#-what-is-kyntra)
- [⚡ The 10 Signature Features](#-the-10-signature-features)
- [📱 Office Kit Demo Bridge](#-office-kit-demo-bridge)
- [🏗 Tech Stack & Architecture](#-tech-stack--architecture)
- [🔌 API Reference](#-api-reference)
- [🏆 Judges Demo Script (3–5 Minutes)](#-judges-demo-script-35-minutes)
- [🔒 Security & Data Rules](#-security--data-rules)

---

## 🌐 Live Prototype & App Links

You can access the live full-stack prototype directly in your browser:

* **Live Interactive Application**: [https://ais-dev-rdplaqdekdels2tjb52rzm-819057743971.asia-southeast1.run.app](https://ais-dev-rdplaqdekdels2tjb52rzm-819057743971.asia-southeast1.run.app)


*Note: The prototype includes a built-in 3-minute guided tour mode for judges, populated with a coherent 30-member community dataset, interactive React Flow graph, camera vision pipeline, speech command engine, and live Socket.IO tunnel.*

---

## 💡 What is KYNTRA?

KYNTRA is an AI-powered community intelligence platform designed for developer ecosystems, innovation hubs, and hackathons. Rather than acting as a traditional social media feed or static directory, KYNTRA builds a dynamic **Community Intelligence Graph** that understands:

* **People**: Profiles, experience, availability, and activity history.
* **Skills**: 22+ categorized capabilities (AI/ML, Systems, Design, Robotics, Medical AI, etc.).
* **Projects**: Active initiatives, technical requirements, and owner goals.
* **Problems**: Systemic technical bottlenecks and cluster challenges.
* **Intent**: Real-time voice commands, camera scans, and collaboration dispatches.

By applying relational reasoning and transparent scoring, KYNTRA reveals hidden collaboration opportunities, detects critical skill shortages, identifies project duplications, assembles multidisciplinary teams, and activates real collaboration.

---

## ⚡ The 10 Signature Features

### 1. KYNTRA Community Intelligence Graph
- Interactive `@xyflow/react` (React Flow) canvas with custom directional nodes (Users, Skills, Projects, Opportunities) and semantic edges (`HAS_SKILL`, `REQUIRES`, `WORKS_ON`, `SOLVES`, `MENTORS`).
- Node Inspector drawer, Edge Relationship modal, live search, and categorical node filters.

### 2. Hidden Opportunity Engine
- Relational scoring formula:
  $$\text{Relevance} = 0.40 \cdot \text{Skill} + 0.20 \cdot \text{Domain} + 0.15 \cdot \text{Project} + 0.10 \cdot \text{Availability} + 0.10 \cdot \text{Interest} + 0.05 \cdot \text{Activity}$$
- Surfaced opportunities provide plain-language match explanations (e.g. why Priya Sharma was matched with Alex Chen for medical imaging).

### 3. KYNTRA Assemble (Primary Demo Feature)
- Autonomous squad composition engine. User inputs a project goal (*AI Healthcare Assistant* requiring *Computer Vision, Machine Learning, Backend, UI/UX*).
- Generates candidate squad with **96% Skill Coverage**, **94% Project Relevance**, and **4/4 Availability**:
  - **Priya Sharma** (Computer Vision & Diagnostic Lead, 98% verified accuracy)
  - **Arun Patel** (Lead ML & Predictive Modeler)
  - **Rahul Verma** (Backend Systems Architect)
  - **Meena Iyer** (Lead Product & UX Designer)
- 1-Click **"FORM TEAM"** creates real relational records, collaboration requests, activity stream logs, and emits real-time Socket.IO events.

### 4. Community Lens (Camera Vision Pipeline)
- Device camera viewfinder with live frame capture and preset hackathon/whiteboard sample assets.
- Extracts project taxonomy, domain metadata, and required technical roles.
- 1-Click *"Add to Community"*, *"Discover People"*, and *"Assemble Team"* directly from scanned posters.

### 5. Voice Community Command
- Natural language voice interface powered by Web Speech API (`SpeechRecognition`) with manual text fallback.
- `IntentEngine` parses natural commands into structured JSON actions:
  - *"Find someone who knows computer vision and is interested in healthcare AI"*
  - *"Find me a mentor for Kubernetes"*
  - *"Build a team for this project"*
  - *"What skills are missing in our community?"*

### 6. Skill Gap Radar
- Recharts visualization comparing active project demand versus verified community practitioner supply.
- Highlights Critical Gaps (e.g. **Computer Vision**: 17 active project demands vs. 6 verified experts).
- Direct action triggers to discover experts or schedule community workshops.

### 7. Project Collision Detection
- Analyzes initiative goals and embeddings to detect duplicate effort early.
- Discovered 92% semantic overlap between *AI Resume Analyzer* and *AI Career Recommendation Engine*.
- Direct action buttons to introduce team leads and consolidate taxonomy datasets.

### 8. Mentor Discovery
- Matches mentees with senior community architects (e.g. Sophia Lin for Kubernetes, Daniel Berg for PostgreSQL, Lucas Dubois for AI Ethics).
- Direct *"Request Mentorship"* workflow with live confirmation.

### 9. Collaboration Activation Center
- Multi-tab management for Incoming Invitations, Outgoing Dispatches, and Active Partnerships.
- 1-Click Accept/Decline actions update database state and trigger real-time UI synchronization across all connected clients.

### 10. Community DNA & Pulse
- High-level telemetry: 1,248 members, 326 projects, 84 synergy matches, 17 skill gaps, 86% collaboration rate, and emerging skill growth rates.

---

## 📱 Office Kit Demo Bridge

KYNTRA includes a built-in **Office Kit Demo Bridge** (`/api/officekit/sync` + Socket.IO `officekit:sync`):
- Demonstrates real-time Phone ↔ Laptop workspace synchronization.
- When an opportunity or poster is captured on a mobile phone (e.g. iQOO device), the event is instantly broadcast over the Socket.IO tunnel to the laptop screen with zero page refresh.
- Displays `"Synced from iQOO device"` status tag.

---

## 🏗 Tech Stack & Architecture

```
/kyntra
├── server.ts               # Express + Socket.IO + Vite Middleware entry (Port 3000)
├── src/
│   ├── api/client.ts       # REST Client API Abstraction
│   ├── components/         # Design Tokens, Layout, Modals & Custom Graph Nodes
│   │   ├── graph/          # Custom UserNode, SkillNode, ProjectNode, OpportunityNode
│   │   ├── layout/         # Header, Desktop Sidebar, Mobile Bottom Bar
│   │   └── modals/         # OfficeKitModal, VoiceModal, DemoTourModal
│   ├── lib/                # Socket.IO Client Singleton
│   ├── server/             # Express API Routes, Database Store & AI Engines
│   │   ├── db.ts           # Relational Transactional Store + 30-User Seed
│   │   ├── ai-engine.ts    # AIService Abstraction (Demo, Local, OpenAI-compatible)
│   │   └── routes.ts       # REST Endpoints & Socket.IO Emitters
│   ├── types/              # Complete TypeScript Models (User, Project, Skill, Team, etc.)
│   └── views/              # 10 Signature Feature Views (Dashboard, Graph, Assemble, Lens, etc.)
├── docker-compose.yml      # PostgreSQL Compose definition
├── package.json
└── tsconfig.json
```

---

## 🔌 API Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/auth/me` | Fetch active demo user profile (`Alex Chen`) |
| `POST` | `/api/auth/login` | Authenticate user |
| `GET` | `/api/community/overview` | Fetch community statistics |
| `GET` | `/api/community/graph` | Fetch graph nodes & edges for React Flow |
| `GET` | `/api/community/members` | Fetch members with verified skills & interests |
| `GET` | `/api/opportunities` | Surface active hidden opportunities |
| `POST` | `/api/assemble` | Run TeamAssemblyEngine for squad composition |
| `POST` | `/api/teams` | Create Team, Member records & dispatch invites |
| `GET` | `/api/collaborations` | Fetch incoming, outgoing & active collaborations |
| `PATCH` | `/api/collaborations/:id` | Accept or decline collaboration request |
| `POST` | `/api/lens/image` | Extract project requirements from camera image |
| `POST` | `/api/voice/command` | Parse natural speech command into structured intent |
| `GET` | `/api/skill-gaps` | Fetch demand vs supply skill gap metrics |
| `POST` | `/api/projects/:id/analyze-overlap` | Run Project Collision Engine |
| `POST` | `/api/officekit/sync` | Broadcast Phone ↔ Laptop sync over Socket.IO |
| `POST` | `/api/demo/reset` | Reset & re-seed community database |

---



## 🏆 Judges Demo Script (3–5 Minutes)

1. **Open KYNTRA**: Launch the live app link or click **"Judges Demo (3 min)"** in the top bar.
2. **Explore Command Center**: View greeting for **Alex Chen**, the featured opportunity card for **Priya Sharma**, and the Community Pulse metrics.
3. **Scan with Community Lens**: Go to **Community Lens**, click sample poster *"Global HealthTech & AI Hackathon Poster"*, view extracted skills, and click **"ASSEMBLE TEAM"**.
4. **Run KYNTRA Assemble**: View 4-member squad (Priya, Arun, Rahul, Meena) with **96% Skill Coverage**. Click **"FORM TEAM"** to trigger celebratory confetti and create real team records.
5. **Inspect Skill Gap Radar**: Navigate to **Skill Gap Radar** to see the Computer Vision shortage (17 demand vs 6 supply).
6. **Check Project Collisions**: Navigate to **Project Collisions** to inspect 92% semantic overlap between Resume Analyzer and Career Engine.
7. **Simulate Office Kit Bridge**: Click **"Office Kit Bridge"** in the top bar and trigger a simulated phone capture event to watch real-time Socket.IO synchronization.

---

## 🔒 Security & Data Rules

* Strict input validation with TypeScript Zod schemas.
* No client-side API secret exposure; all AI calls route through server proxy engines.
* Zero hardcoded mock text in UI components; all data flows from structured API endpoints.
* Explicit user authorization required before activating collaboration dispatches.

---

<div align="center">

  **KYNTRA** — *Built for the Community App Track*
  <br />
  <sub>"Your community has hidden potential. KYNTRA reveals it."</sub>

</div>
