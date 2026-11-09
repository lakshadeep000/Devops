---
role: master-session
last-updated: 2026-08-06
---

# 🎛️ Master Session — Control Room

> This is the **master chat window**'s shared memory. It tracks the whole journey across all module sessions, and is where you ask questions about **any** module's progress.

## 📊 Overall Progress

| Module | Status | Session file |
|--------|--------|--------------|
| **L1-M1** Linux | ✅ done | [[Sessions/M1-Linux]] |
| **L1-M2** Bash Scripting | ⬜ pending | [[Sessions/M2-Bash-Scripting]] |
| **L1-M3** Text Power Tools | ⬜ pending | [[Sessions/M3-Text-Tools]] |
| **L1-M4** Git & GitHub | ⬜ pending | [[Sessions/M4-Git]] |
| **L1-M5** Markdown & YAML | ⬜ pending | [[Sessions/M5-YAML]] |
| **L1-M6** Networking | ⬜ pending | [[Sessions/M6-Networking]] |
| **L1-M7** Security Essentials | ⬜ pending | [[Sessions/M7-Security]] |
| **L2-M8** Python for DevOps | ⬜ pending | [[Sessions/M8-Python]] |
| **L2-M9** CI/CD (GitHub Actions) | ⬜ pending | [[Sessions/M9-CICD]] |
| **L2-M10** Ansible | ⬜ pending | [[Sessions/M10-Ansible]] |
| **L2-M11** Terraform | ⬜ pending | [[Sessions/M11-Terraform]] |
| **L3-M12** Docker Deep | ⬜ pending | [[Sessions/M12-Docker]] |
| **L3-M13** Docker Compose | ⬜ pending | [[Sessions/M13-Compose]] |
| **L3-M14** Kubernetes Fundamentals | ⬜ pending | [[Sessions/M14-K8s]] |
| **L3-M15** Kubernetes Advanced | ⬜ pending | [[Sessions/M15-K8s-Advanced]] |
| **L4-M16** Cloud (AWS + Azure) | ⬜ pending | [[Sessions/M16-Cloud]] |
| **L4-M17** Observability | ⬜ pending | [[Sessions/M17-Observability]] |
| **L4-M18** GitOps & Progressive Delivery | ⬜ pending | [[Sessions/M18-GitOps]] |
| **L4-M19** SRE & Hardening | ⬜ pending | [[Sessions/M19-SRE]] |
| Capstones L1–L4 | ⬜ pending | — |

> [!info] Live view
> The visual dashboard (`Dashboard/index.html`) mirrors this table. Both are updated by the tutor as sessions complete.

## 🔀 How the multi-session model works

- **Each module = its own chat window (session).** Full history is kept by opencode — you resume anytime.
- **Each module also has a session file** (`Sessions/M1-Linux.md`, ...) — the "shared memory" both the master window and the dashboard read.
- **Want to switch topics?** Just jump to another module's chat. No need to finish one first.
- **Start fresh on a module** → new chat session for it.
- **Pre-training assessment** → when a module starts, the tutor runs its questionnaire (`Assessments/<module>.md`) — you self-rate 🔴🟠🟡🟢 per topic, and the tutor focuses on gaps, skips what you know.
- **Continue where you stopped** → reopen that module's chat; the tutor reads its session file and picks up.
- **Ask about anything here** → ask in this master window; I read the session files and answer.

## 📝 Master Session Log

### 2026-11-09
- **Course content updated to use all available resources**: created missing `Resources/Cross-Platform-Logging-Monitoring.md` atlas (BSD/Solaris/AIX/HP-UX logging matrix — feeds M1 d7 cross-platform topic); wired local Packt clone chapters into plans (Bash Cookbook Chapter02 `backup.sh` → M2 checkpoint skeleton; Python-for-DevOps `logging/` folder → M8 logging practice); updated all GitHub URLs verified live (54/54). M1 remains reopened for logging/monitoring extension (d6–d8, U1–U5 gated curriculum). Dashboard + assessments regenerated via sync.js.

### 2026-08-12
- **M1 (Linux) module COMPLETE**: systemd (units, restart policies, crash-loop governor, self-healing mydemo service, journalctl), `/proc` & `/sys` + file descriptors, mount points & inodes (hard links, `df -i`), boot sequence, `apt`. 4/4 checkpoints passed. Cheatsheet expanded (systemd, virtual fs, boot, apt). Day-04 note written. Status → done.

### 2026-08-07
- **Resources watchdog rule added to `AGENTS.md`**: every session now starts by checking `Resources/` + `git status` for new materials and wiring them into the level sheets, plan 📚 lines, and (only if topics change) `topics.json` + `sync.js`.
- **Wired in 2 new PDFs the student added**: `GitNotesForProfessionals.pdf` → M4 (plan + Level-1 sheet); `MySQLNotesForProfessionals.pdf` → new "Databases (optional)" section in `Resources/Extras.md` + M19 backup/restore lab reference. Also found + wired **DevOps Shack 250 Linux Scenario Q&A PDF** → M1 checkpoint drill (plan + Level-1 sheet).
- **M16 redesigned as a comparative AWS ⇄ Azure study**: every topic is now "X in AWS ≈ Y in Azure" (identity IAM↔Entra ID, VPC↔VNet, EC2↔VM, Lambda↔Functions, EKS↔AKS, CodePipeline↔Azure DevOps, SG↔NSG, Cost Explorer↔Cost Management). Student holds AWS associate certs → AWS = review, Azure = deep dive; target depth DOP-C02 + AZ-400. Topics synced via `topics.json` + `sync.js` (4 basic / 9 deep); plan, Level-4 resources, and M16 session file updated.
- **Cloned 3 Packt repos locally** into `Resources/Packt/` for offline labs: Linux Shell Scripting Cookbook (464K), The Ultimate Linux Bootcamp (16M), Python for DevOps (12M). Documented in `Resources/Packt-DevOps.md` + `AGENTS.md`.
- **Packt companion-code repos mapped to every module** in `Resources/Packt-DevOps.md` (curated from the PacktPublishing GitHub org: Bash cookbook 246⭐, CompTIA Security+ 464⭐, Terraform Cookbook, K8s Enterprise Guide, ArgoCD-in-Practice, Prometheus/Observability, Rockstar SRE, etc.) — used as example farms during labs. Linked from all 4 `Resources/Level-*.md` sheets + every `Plan/01–04` module's 📚 Resources line.
- **Local PDFs now wired into the training material**: `TLCL-25.12A.pdf` + `LinuxNotesForProfessionals.pdf` → M1, `BashNotesForProfessionals.pdf` → M2, `PythonNotesForProfessionals.pdf` → M8. Referenced in the level sheets, plan Resources lines, and `AGENTS.md` (tutor cites them in labs).
- **Dashboard topics now driven by `Dashboard/topics.json`** (canonical): dashboard fetches it (with embedded fallback for offline), `Dashboard/sync.js` pushes it into `index.html` + regenerates `Assessments/`. New plan topics now automatically reach the dashboard.
- **Production-ready pass across all 19 modules**: added 🛡️ Production-grade focus (day-2 ops, failure modes, ops checklists) + 📚 resource mappings to every module in `Plan/01–04`; added the **Production-Ready Doctrine** to `Plan/00-Overview`; `AGENTS.md` now mandates the production lens in teaching. M1 remaining agenda production-hardened.
- Added pre-training questionnaires: `Assessments/_Template.md` + 19 per-module questionnaires (generated from each module's topics). Tutor runs them when a module starts and tailors the agenda.
- M1 deep half part 1 done: special perms (sticky/setuid/setgid), processes & signals, system health. Quiz 6/8 → both misses corrected.
- Cheatsheet updated (setuid `passwd` control experiment row). M1 status → in progress.
- Created + pre-loaded all 19 module chat sessions (linked from dashboard `chat ↗`); added `AGENTS.md` resume contract.

### 2026-08-06
- Restructured plan: zero-to-hero, module-based, no daily deadlines (90-day target).
- Added `Resources/` (per-level study materials + extras), `Cheatsheets/`, `Dashboard/`.
- Launched multi-session model: one chat per module + this master window.
- M1 basic half done (Day 1). Deep half (processes, systemd, special perms) is next.

## ❓ Questions Asked Here
- (log questions + answers as they happen)
