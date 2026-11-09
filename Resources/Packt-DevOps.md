# 🐙 Packt Publishing — Companion Code Repos (mapped to modules)

Every repo here is the **companion code for a Packt book**. Each contains chapter-by-chapter example folders. They're not replacements for the sessions — they're **example farms**: steal patterns, run the exercises, and read the chapter that matches the topic you're on.

#devops #resources #packt

[[00-Overview|← Back to Roadmap]]

---

## How to use these

1. Pick the repo for the module you're on.
2. `git clone --depth 1 https://github.com/PacktPublishing/<repo>.git` (shallow = fast, no history).
3. Open the folder that matches the topic, read the code, **run it**, then re-implement it from memory in your own `Scripts/`/`Labs/` folder.
4. Don't collect repos — work through one at a time.

## 📦 Already cloned locally (`Resources/Packt/`)

| Repo | Local path | Best chapters/folders |
|------|-----------|-----------------------|
| Linux Shell Scripting Cookbook | `Resources/Packt/Linux-Shell-Scripting-Cookbook-Third-Edition/` | Ch2 `backup.sh` (rotation = the M2 checkpoint!), Ch3 `remove_duplicates` (M3), Ch9 `intruder_detect.sh` + `pcpu.sh` (M1/M7) |
| The Ultimate Linux Bootcamp | `Resources/Packt/The-Ultimate-Linux-Bootcamp-for-DevOps-SRE-and-Cloud-Engineers/` | Course PDF + `LinuxEssentials_Quiz.docx` — quiz yourself between M1 topics |
| Python for DevOps | `Resources/Packt/Python-for-DevOps-The-Ultimate-Hands-On-Guide/python-devops-main/` | `python-fundamentals/`, `interacting-with-os/`, `files-regex-data-formats/`, `http-requests/`, `automated-testing/` (M8) |

> [!tip] Steal-first rule
> Read the code, close it, rewrite from memory in `Scripts/`/`Labs/`. Copying ≠ learning.

> [!tip] Why code repos
> The best labs are the ones someone already wrote. Reading a correct `Dockerfile`, a production-style Ansible playbook, or a clean GitHub Actions workflow teaches you *shape* — the difference between "I know the syntax" and "this is how it's actually written."

---

## Level 1 — Foundations

| Module | Repo | What to steal from it |
|--------|------|-----------------------|
| **M1 — Linux** | [The-Ultimate-Linux-Bootcamp-for-DevOps-SRE-and-Cloud-Engineers](https://github.com/PacktPublishing/The-Ultimate-Linux-Bootcamp-for-DevOps-SRE-and-Cloud-Engineers) | Filesystem, permissions, systemd, shell-in-production exercises |
| **M2 — Bash** | [Linux-Shell-Scripting-Cookbook-Third-Edition](https://github.com/PacktPublishing/Linux-Shell-Scripting-Cookbook-Third-Edition) (246⭐) | Loops, functions, `trap`, `getopts`, robust-script recipes — the best single repo for this module |
| **M3 — Text tools** | [Linux-Shell-Scripting-Cookbook-Third-Edition](https://github.com/PacktPublishing/Linux-Shell-Scripting-Cookbook-Third-Edition) | `grep`/`sed`/`awk`/`xargs` chapters with real pipelines |
| **M4 — Git** | [GitHub-Foundations-Certification-Guide](https://github.com/PacktPublishing/GitHub-Foundations-Certification-Guide) | Git workflow + PR/review exercises |
| **M6 — Networking** | [CompTIA-Network-Cert-N10-007-Full-Course-and-Practice-Exam](https://github.com/PacktPublishing/CompTIA-Network-Cert-N10-007-Full-Course-and-Practice-Exam) (144⭐) · [Mastering-Python-for-Networking-and-Security](https://github.com/PacktPublishing/Mastering-Python-for-Networking-and-Security) (129⭐) | Networking drills + scripting network tools |
| **M7 — Security** | [CompTIA-Security-SY0-701-Full-Training-Guide](https://github.com/PacktPublishing/CompTIA-Security-SY0-701-Full-Training-Guide) (464⭐) · [Python-Ethical-Hacking](https://github.com/PacktPublishing/Python-Ethical-Hacking) (206⭐) | Threat model, SSH hardening, authz concepts (skip the hacking labs if you prefer) |

## Level 2 — Automation

| Module | Repo | What to steal from it |
|--------|------|-----------------------|
| **M8 — Python** | [Python-for-DevOps-The-Ultimate-Hands-On-Guide](https://github.com/PacktPublishing/Python-for-DevOps-The-Ultimate-Hands-On-Guide) ⚠️ *upstream removed 2026-08 — local copy preserved at* `Resources/Packt/Python-for-DevOps-The-Ultimate-Hands-On-Guide/python-devops-main/` · [Python-Automation-Cookbook-Third-Edition](https://github.com/PacktPublishing/Python-Automation-Cookbook-Third-Edition) · [Clean-Code-in-Python-Second-Edition](https://github.com/PacktPublishing/Clean-Code-in-Python-Second-Edition) (175⭐) · [Playwright-Python-and-Pytest-for-Web-Automation-Testing](https://github.com/PacktPublishing/Playwright-Python-and-Pytest-for-Web-Automation-Testing) (63⭐, pytest) | Automation patterns, argparse, pytest |
| **M9 — CI/CD** | [Learning-GitHub-Actions-for-DevOps-CI-CD](https://github.com/PacktPublishing/Learning-GitHub-Actions-for-DevOps-CI-CD) · [Automating-Workflows-with-GitHub-Actions](https://github.com/PacktPublishing/Automating-Workflows-with-GitHub-Actions) (53⭐) · [Mastering-GitHub-Actions](https://github.com/PacktPublishing/Mastering-GitHub-Actions) · [GitHub-Actions-Cookbook](https://github.com/PacktPublishing/GitHub-Actions-Cookbook) | Full workflows: triggers, matrices, caches, secrets, deploys |
| **M10 — Ansible** | [Ansible-for-Real-life-Automation](https://github.com/PacktPublishing/Ansible-for-Real-life-Automation) (75⭐) · [Mastering-Ansible-Fourth-Edition](https://github.com/PacktPublishing/Mastering-Ansible-Fourth-Edition) (64⭐) · [Security-Automation-with-Ansible-2](https://github.com/PacktPublishing/Security-Automation-with-Ansible-2) (70⭐) | Playbook structure, roles, Vault, real-life automation |
| **M11 — Terraform** | [Terraform-Cookbook-Second-Edition](https://github.com/PacktPublishing/Terraform-Cookbook-Second-Edition) (109⭐) · [Mastering-Terraform](https://github.com/PacktPublishing/Mastering-Terraform) (98⭐) | Recipes: state, modules, `for_each`, drift |

## Level 3 — Containers & Kubernetes

| Module | Repo | What to steal from it |
|--------|------|-----------------------|
| **M12 — Docker** | [Containerize-your-Apps-with-Docker-and-Kubernetes](https://github.com/PacktPublishing/Containerize-your-Apps-with-Docker-and-Kubernetes) (165⭐) · [Kubernetes-and-Docker-The-Container-Masterclass](https://github.com/PacktPublishing/Kubernetes-and-Docker-The-Container-Masterclass) (134⭐, *renamed from Docker-and-Kubernetes-Masterclass*) · [Mastering-Docker-Fourth-Edition](https://github.com/PacktPublishing/Mastering-Docker-Fourth-Edition) (66⭐) | Real `Dockerfile`s: multi-stage, non-root, layering |
| **M13 — Compose** | [A-Developer-s-Essential-Guide-to-Docker-Compose](https://github.com/PacktPublishing/A-Developer-s-Essential-Guide-to-Docker-Compose) (100⭐) · [Working-with-Docker-Dockerfile-and-Docker-Compose](https://github.com/PacktPublishing/Working-with-Docker-Dockerfile-and-Docker-Compose) | Multi-service stacks, healthchecks, volumes |
| **M14 — K8s fundamentals** | [Kubernetes-An-Enterprise-Guide-Third-Edition](https://github.com/PacktPublishing/Kubernetes-An-Enterprise-Guide-Third-Edition) (107⭐) · [Hands-On-Microservices-with-Kubernetes](https://github.com/PacktPublishing/Hands-On-Microservices-with-Kubernetes) (103⭐) · [Kubernetes-and-Docker-The-Complete-Guide](https://github.com/PacktPublishing/Kubernetes-and-Docker-The-Complete-Guide) (100⭐) | Deployments, Services, Ingress, probes — as manifest files |
| **M15 — K8s advanced** | [Kubernetes-An-Enterprise-Guide-Third-Edition](https://github.com/PacktPublishing/Kubernetes-An-Enterprise-Guide-Third-Edition) | Helm, operators, RBAC, network policies at enterprise scale |

## Level 4 — Cloud, Observability & Production

| Module | Repo | What to steal from it |
|--------|------|-----------------------|
| **M16 — Cloud** | [Effective-DevOps-with-AWS](https://github.com/PacktPublishing/Effective-DevOps-with-AWS) (68⭐) · [AWS-Observability-Handbook](https://github.com/PacktPublishing/AWS-Observability-Handbook) (14⭐) | AWS patterns: IAM, VPC, cost; bridge to M17 |
| **M17 — Observability** | [Hands-On-Infrastructure-Monitoring-with-Prometheus](https://github.com/PacktPublishing/Hands-On-Infrastructure-Monitoring-with-Prometheus) (112⭐) · [Cloud-Native-Observability](https://github.com/PacktPublishing/Cloud-Native-Observability) (117⭐, OpenTelemetry) · [Observability-with-Grafana](https://github.com/PacktPublishing/Observability-with-Grafana) (33⭐) · [Mastering-Prometheus](https://github.com/PacktPublishing/Mastering-Prometheus) (28⭐) | PromQL queries, alert rules, dashboards, tracing |
| **M18 — GitOps** | [ArgoCD-in-Practice](https://github.com/PacktPublishing/ArgoCD-in-Practice) (62⭐) · [Implementing-GitOps-with-Kubernetes](https://github.com/PacktPublishing/Implementing-GitOps-with-Kubernetes) (38⭐) · [Mastering-Argo-CD](https://github.com/PacktPublishing/Mastering-Argo-CD) (*replaces removed GitOps-in-Practice-with-Argo-CD repo, checked 2026-08*) | App-of-apps, sync policies, rollouts |
| **M19 — SRE** | [Becoming-a-Rockstar-SRE](https://github.com/PacktPublishing/Becoming-a-Rockstar-SRE) (44⭐) · [Real-World-SRE](https://github.com/PacktPublishing/Real-World-SRE) (26⭐) · [Overcoming-SRE-Anti-pattern-Roadblocks](https://github.com/PacktPublishing/Overcoming-SRE-Anti-pattern-Roadblocks) | Incident response, SLOs, toil, on-call culture |

## Level-wide (any time)

| Repo | When to grab it |
|------|-----------------|
| [Learning-DevOps-Second-Edition](https://github.com/PacktPublishing/Learning-DevOps-Second-Edition) (91⭐) | Overview of the whole pipeline — good refresher between levels |
| [Modern-DevOps-Practices](https://github.com/PacktPublishing/Modern-DevOps-Practices) (65⭐) | Production practices: CI/CD, IaC, observability, security |
| [Go-for-DevOps](https://github.com/PacktPublishing/Go-for-DevOps) (206⭐) | Stretch goal after L4 — operators, CLI tools in Go |

---

[[00-Overview|← Back to Roadmap]]
