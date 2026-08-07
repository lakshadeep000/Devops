# Zero-to-Hero Roadmap

> [!success] The philosophy
> **No deadlines, no 45-minute caps.** You work a module until it *clicks* — the session ends when **you** say you're done, not when a timer does. Every topic goes **basic → deep**, and you only advance when the **checkpoint** is passed.

#devops #learning-plan #zero-to-hero

[[01-Level-1-Foundations|Level 1]] · [[02-Level-2-Automation|Level 2]] · [[03-Level-3-Containers-K8s|Level 3]] · [[04-Level-4-Cloud-Production|Level 4]]

---

## The 4 Levels

| Level | Name | What you'll master | Pass = you can... |
|-------|------|--------------------|-------------------|
| **1** | Foundations (The Zero) | Linux, Bash scripting, text tools, Git, YAML/Markdown, Networking, Security | Script a server, version control it, explain how a request crosses the network |
| **2** | Automation | Python, CI/CD (GitHub Actions), Ansible, Terraform | Automate builds/deploys and provision infra as code |
| **3** | Containers & Kubernetes | Docker deep, Compose, K8s fundamentals → operators, Helm, service mesh | Run production-grade containerized workloads |
| **4** | Cloud, Observability & Production | AWS + Azure, Prometheus/Grafana/Loki, GitOps, SRE, Capstone | Operate a monitored, resilient, production system |

> [!info] The full map
> - [[01-Level-1-Foundations|Level 1 — Foundations]]
> - [[02-Level-2-Automation|Level 2 — Automation]]
> - [[03-Level-3-Containers-K8s|Level 3 — Containers & Kubernetes]]
> - [[04-Level-4-Cloud-Production|Level 4 — Cloud, Observability & Production]]

> [!book] Study materials per level
> - [[Resources/Level-1-Foundations|Level 1 — PDFs, videos & docs]]
> - [[Resources/Level-2-Automation|Level 2 — PDFs, videos & docs]]
> - [[Resources/Level-3-Containers-K8s|Level 3 — PDFs, videos & docs]]
> - [[Resources/Level-4-Cloud-Production|Level 4 — PDFs, videos & docs]]

---

## How Each Module Works

Every module in this plan follows the same skeleton:

1. **📖 Learn** — concepts, from basics to depth (I explain, you ask questions)
2. **📺 Study** — one video + one PDF from `Resources/` (see the **Study materials per level** block below)
3. **🛠️ Lab** — hands-on exercise in `Scripts/`, run in this workspace
4. **📝 Cheat** — capture every command/tool into the `Cheatsheets/` folder (one sheet per topic)
5. **🎯 Checkpoint** — a real task that proves mastery *before* moving on
6. **📝 Note** — log it in `Notes/` via the [[Templates/Daily-Log-Template|module log template]]

> [!warning] Golden rule
> A checkpoint is **not** "I've seen this before." It's *I can reproduce it from a blank screen.* If you can't, redo the lab — go deeper, not faster.

---

## 🏭 The Production-Ready Doctrine

Everything in this plan is taught through a **production lens** — you learn tools the way a real team operates them, not the way a tutorial presents them. Five principles apply to *every* module:

1. **Security by default** — least privilege, secrets never in code, scan images/dependencies, patch and rotate.
2. **Automate everything twice** — the second time you do something by hand, script it; the third, pipeline it.
3. **Observe it or it doesn't exist** — anything you run gets logs, metrics, and an alert.
4. **Assume it will fail** — plan for crashes, restarts, rollbacks, and *tested* backups (know your RPO/RTO).
5. **Document the boring stuff** — runbooks, postmortems, and READMEs are part of the deliverable.

Every module carries a **🛡️ Production-grade focus** block — the day-2 operational skills, failure modes, and checklists a DevOps engineer is actually paid to know — plus a **📚 Resources** block pointing at the best material, chapters included. The [[Sessions/_MASTER|master window]] and every module session follow this doctrine.

---

## Your Progress

| Module | Status |
|--------|--------|
| L1-M1 Linux fundamentals (basics) | ✅ Day 1 done — finish the *deep* half next |
| L1-M1 Processes, permissions, systemd | ⬜ pending |
| Rest of Level 1 | ⬜ pending |
| Level 2 | ⬜ pending |
| Level 3 | ⬜ pending |
| Level 4 | ⬜ pending |

---

## Suggested Session Rhythm

No timers — but structure keeps you honest:

```
CONCEPT   I explain the topic, basic → deep
ASK       You ask anything (no dumb questions)
LAB       We build/break/fix it together in this terminal
CHECK     You pass the checkpoint from a blank screen
NOTE      We log it in your vault
→ next module when YOU say ready
```

> [!tip] Depth is the point
> Zero-to-hero means *nobody* can out-explore you on any single topic. When you finish Level 1, you will genuinely understand Linux, not just memorized flags.
