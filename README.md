# DevOps Zero-to-Hero Journey

A **zero-to-hero** learning plan for DevOps, focusing on **AWS** and **Azure**. Open this folder in **Obsidian** (File → Open folder as vault) to browse, link, and search your notes.

> [!note] How it works
> No rigid day deadlines. Each **module** goes basic → deep. You work a module until its **checkpoint** is passed, then move on — sessions end when *you* say done.

#devops #learning-plan

---

## Dashboard

| Area | Notes |
|------|-------|
| 🗺️ Roadmap | [[Plan/00-Overview\|Zero-to-Hero Overview]] |
| 🟦 Level 1 — Foundations | [[Plan/01-Level-1-Foundations\|Linux, Shell, Git, YAML, Networking, Security]] |
| 🟩 Level 2 — Automation | [[Plan/02-Level-2-Automation\|Python, CI/CD, Ansible, Terraform]] |
| 🟧 Level 3 — Containers & K8s | [[Plan/03-Level-3-Containers-K8s\|Docker, Compose, Kubernetes]] |
| 🟪 Level 4 — Cloud & Production | [[Plan/04-Level-4-Cloud-Production\|Cloud, Observability, GitOps, SRE]] |
| 📚 Study Materials | [[Resources/Level-1-Foundations\|L1]] · [[Resources/Level-2-Automation\|L2]] · [[Resources/Level-3-Containers-K8s\|L3]] · [[Resources/Level-4-Cloud-Production\|L4]] · [[Resources/Extras\|Extras]] |
| 📊 Progress | `00-Overview.md` → "Your Progress" table · 📈 **Dashboard**: open `Dashboard/index.html` in your browser |
| 🎛️ Master Session | [[Sessions/_MASTER\|Overall progress + ask about any module]] |
| 💬 Module Sessions | `Sessions/M1-Linux.md` … `M19-SRE.md` — one shared-memory file per module |
| 📋 Pre-training Assessments | [[Assessments/M1-Linux\|M1]] · [[Assessments/M2-Bash-Scripting\|M2]] · … — self-rate each topic before a module; the tutor tailors the agenda to your gaps (template: [[Assessments/_Template\|_Template]]) |
| 🗒️ Your Notes | [[Notes/Getting-Started\|How to take notes here]] |
| 📚 Cheatsheets | [[Cheatsheets/Linux-Cheat-Sheet\|Linux]] · (grow per module) |
| 🧩 Templates | [[Templates/Daily-Log-Template\|Module Log]] |

---

## Quick Start

1. **Install Obsidian** → https://obsidian.md
2. Open Obsidian → *Open folder as vault* → select this folder.
3. Read the [[Plan/00-Overview|roadmap]], then start (or continue) Level 1.
4. Each module/session, create a module log from the [[Templates/Daily-Log-Template|template]] and save it in `Notes/`.

---

## The Multi-Session Learning Model

**No more one-topic-at-a-time.** Jump between modules freely; nothing is lost:

| Piece | What it is |
|-------|-----------|
| **Module chat windows** | One opencode session per module (`M1-Linux`, `M2-Bash`, ...). Each keeps its own full history — resume exactly where you stopped. |
| **Master window** | One opencode session for the whole journey: overall progress, "what should I do next?", and questions about any module. |
| **Session files** (`Sessions/*.md`) | Shared memory per module: covered ✓, where stopped 📍, next agenda 🎯, checkpoint 🧪. Updated at the end of every module session. |
| **Dashboard** | `Dashboard/index.html` — visual progress + **chat ↗** backlinks that launch each module's opencode session in the browser. |

**To switch topics**: just open another module's chat — no need to finish the current one first.
**To continue a module**: reopen its chat window; the tutor reads the session file and resumes.
**To start fresh on a module**: open a new chat for it (it uses the same session file as the "clean state").

### Launching module chats from the dashboard

The dashboard's **chat ↗** links open each module's session page in the opencode **web interface** (the browser). To use them:

1. Start the web UI once: run `Dashboard/start-web.sh` (or `opencode web --port 4096`).
2. In the dashboard, click **chat ↗** on a module → it opens that module's chat (or a new-session page if none exists yet).
3. When you create/name a module session, add its session ID to `Dashboard/sessions.json` (the tutor can do this for you).

> [!tip] The tutor (AI) reads and updates `Sessions/*.md`, `Dashboard/progress.json`, and `Dashboard/sessions.json` as you work — your progress syncs across all windows automatically.

---

## Progress

| Module | Status |
|--------|--------|
| **L1-M1** Linux — basics + deep | ✅ done |
| **L1-M2** Bash scripting | ⬜ next |
| **L1-M3** Text tools | ⬜ |
| **L1-M4** Git | ⬜ |
| **L1-M5** Markdown & YAML | ⬜ |
| **L1-M6** Networking | ⬜ |
| **L1-M7** Security | ⬜ |
| Level 2 (M8–M11) | ⬜ |
| Level 3 (M12–M15) | ⬜ |
| Level 4 (M16–M19 + Capstone) | ⬜ |

---

## What You'll Be Able To Do

- **Level 1**: Script a Linux server, version it with Git, explain its network path, secure it
- **Level 2**: Automate builds/deploys (CI/CD), configure servers (Ansible), provision infra (Terraform)
- **Level 3**: Containerize apps and run them on Kubernetes with Helm, scaling, and policies
- **Level 4**: Run a fully observed, GitOps-driven, production-grade system on AWS/Azure — your portfolio capstone

> [!tip] Golden rule
> DevOps is learned by **doing**, not reading. Every module is hands-on — build, break, fix, repeat. A checkpoint is "I can reproduce this from a blank screen."
