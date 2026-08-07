# Level 4 — Cloud, Observability & Production

> [!success] Goal
> Run something real. Deploy to a cloud provider, measure everything, automate rollouts with GitOps, and operate with an SRE mindset — reliability, incidents, costs. Ends with a portfolio-grade capstone.

#devops #level-4 #cloud #observability #sre

[[03-Level-3-Containers-K8s|← Level 3]] · [[00-Overview|Overview]]

---

## M16 — Cloud Fundamentals (AWS + Azure)

### Basic
- What "the cloud" actually is: regions, availability zones, global vs regional resources
- Core building blocks: compute, storage, networking, identity — in both AWS and Azure
- The console vs CLI vs IaC (spoiler: you'll use IaC, but you need to *see* the console once)

### Deep
- **AWS**: accounts, IAM (users/roles/policies), VPC (subnets, route tables, security groups, NAT), EC2, S3, billing/cost explorer
- **Azure**: subscriptions/resource groups, Entra ID, VNet, VM, Blob Storage, cost management
- **Identity is everything**: understand IAM/Entra deeply — least privilege, policies, managed identity
- **VPC/VNet networking**: public vs private subnets, NACLs vs security groups (AWS), NSGs (Azure)
- **Cost awareness**: tags, budgets, right-sizing, and why infra as code helps costs

### 🛡️ Production-grade focus
- **Day-2 reality**: cloud is *someone else's computer with an invoice*. Identity misconfig is the #1 cause of real breaches, and un-tagged resources are how bills explode.
- **Failure modes to know**: over-permissive IAM policy (read/write to everything); public subnets for things that should be private; no NAT so private instances can't patch; untagged resources → surprise bill; a leaked key (rotate + audit); single-AZ deployment = one datacenter outage kills you.
- **Ops checklist**: IAM least privilege + test the *deny*; VPC/VNet with private subnets + NAT; tag and budget *everything*; enable account root MFA; keep access via roles/identity federation, not long-lived keys; plan for multi-AZ from day one; use IaC so infra is reviewable.
- **Resources**: [[Resources/Level-4-Cloud-Production|Level 4 resources]] → AWS Well-Architected (must-read pillars); *AWS in Action*; Microsoft Learn paths; Skill Builder sandboxes. 🐙 [Effective DevOps with AWS](https://github.com/PacktPublishing/Effective-DevOps-with-AWS).

### 🛠️ Lab ideas
- Create a VPC/VNet with public+private subnets and route traffic through a NAT
- Create an IAM user with only the permissions needed for one task; test denial
- Put a tag/budget on everything you create; check the cost view
- Use CLI to create + destroy resources (learn by paying pennies, not dollars)

### 🎯 Checkpoint
Design and create (via IaC or CLI): a VPC with public/private subnets, an IAM role with least privilege, and a cost budget — and explain region/AZ/global scoping from memory.

---

## M17 — Observability

### Basic
- Why observability > logging alone: you need metrics, logs, and traces
- Prometheus: metrics model, exporters, `rate()`, basic queries, alert rules
- Grafana: dashboards, panels, alerting basics

### Deep
- **Metrics**: the RED method (Rate, Errors, Duration) and USE (Utilization, Saturation, Errors) — what to measure, and the four golden signals
- **PromQL**: instant vs range vectors, `rate` vs `increase`, `histogram_quantile` for latency SLOs
- **Exporters & targets**: node_exporter, blackbox, service discovery
- **Logging**: Loki (pull logs, cheap at scale) vs ELK; structured logging (JSON) and why
- **Tracing**: OpenTelemetry, spans/traces, how traces cross services, correlation IDs
- **Alerting**: alert rules, severity, routing to Slack/email, avoiding alert fatigue
- **SLOs & error budgets**: defining targets, SLO/SLI, alerting on burn rate

### 🛡️ Production-grade focus
- **Day-2 reality**: observability answers the only question on-call cares about: *is it broken, where, and since when?* Logs alone are archaeology; you need metrics and traces too.
- **Failure modes to know**: dashboards that measure everything except what users feel; alerts on *causes* (high CPU) instead of *symptoms* (error rate up); alert fatigue → alerts ignored; no correlation IDs so a trace can't cross services; SLO defined but never measured.
- **Ops checklist**: the four golden signals (latency, traffic, errors, saturation); RED for services, USE for resources; alert on symptom + burn rate, not raw causes; structured (JSON) logs with correlation IDs; OpenTelemetry traces end-to-end; dashboard that a new hire can read; runbook linked from every alert.
- **Resources**: [[Resources/Level-4-Cloud-Production|Level 4 resources]] → *Google SRE book* (observability + SLO chapters); Prometheus/PromQL docs; OpenTelemetry docs; demo.prometheus.io for real queries. 🐙 [Hands-On Infrastructure Monitoring](https://github.com/PacktPublishing/Hands-On-Infrastructure-Monitoring-with-Prometheus) + [Cloud Native Observability](https://github.com/PacktPublishing/Cloud-Native-Observability).

### 🛠️ Lab ideas
- Export metrics from your own service; query it in Prometheus with `rate` and `histogram_quantile`
- Build a Grafana dashboard showing RED metrics for your app
- Add structured logging, query it in Loki
- Instrument one service with OpenTelemetry, follow a trace across two services
- Define an SLO, set a burn-rate alert

### 🎯 Checkpoint
Instrument a running service end-to-end: metrics + logs + traces all flowing into Prometheus/Loki/tracing backend, a Grafana dashboard with RED metrics, and an SLO with burn-rate alerting — each piece explained in your own words.

---

## M18 — GitOps & Progressive Delivery

### Basic
- Git as the single source of truth for what's running
- ArgoCD: app-of-apps, sync, drift correction, UI

### Deep
- **ArgoCD workflow**: apps, projects, sync policies (auto vs manual), pruning, self-heal
- **Helm + ArgoCD**: templated GitOps at scale
- **Progressive delivery**: canary, blue/green, feature flags; Argo Rollouts, Flagger
- **Rollback strategy**: how GitOps makes rollback = `git revert`
- **Repo structure**: apps of apps, kustomize vs helm, environment overlays

### 🛡️ Production-grade focus
- **Day-2 reality**: GitOps makes the Git repo the *source of truth* for prod — which means a good commit history and a good PR review are your safety net. Rollback becomes a revert you can do in seconds.
- **Failure modes to know**: auto-sync applied without review; drift accumulating because self-heal is off; secrets committed to the GitOps repo; a canary rollout stuck mid-flight with no rollback tested; app-of-apps so tangled you can't trace a change.
- **Ops checklist**: review + approval gate before auto-sync to prod; keep `self-heal` on so drift self-corrects; secrets via sealed/ESO, never in Git; test the canary *rollback* before you need it; structured repo (app-of-apps, env overlays) so any change is greppable; treat the repo like prod (branch protection).
- **Resources**: [[Resources/Level-4-Cloud-Production|Level 4 resources]] → ArgoCD + Argo Rollouts docs; *ArgoCD in Practice* (Manning); Codefresh GitOps guide. 🐙 [ArgoCD in Practice](https://github.com/PacktPublishing/ArgoCD-in-Practice) + [Implementing GitOps with K8s](https://github.com/PacktPublishing/Implementing-GitOps-with-Kubernetes).

### 🛠️ Lab ideas
- Install ArgoCD, deploy an app purely from a Git repo, mutate the cluster → watch self-heal
- Set up Argo Rollouts with a canary; promote; rollback mid-flight
- Structure a monorepo with overlays for dev/stage/prod

### 🎯 Checkpoint
Deploy your Level 3 Helm chart to a cluster via ArgoCD from a Git repo (self-healing), run a canary rollout with Argo Rollouts, then trigger a rollback and explain why "rollback is just a revert."

---

## M19 — SRE & Production Hardening

### Basic
- The difference between DevOps and SRE (error budgets, toil, SLOs)
- Toil: what it is, how to eliminate it

### Deep
- **Reliability engineering**: capacity planning, redundancy, failover, chaos engineering basics (turning off nodes on purpose)
- **Incident response**: severity, timelines, postmortems (blameless), on-call mindset
- **Backups & DR**: backups vs replication, RPO/RTO, testing restores
- **Security hardening**: image scanning in CI, secrets rotation, patching, least privilege end-to-end
- **Cost optimization**: right-sizing, spot instances, deleting idle resources, FinOps mindset
- **Performance**: load testing basics, latency vs throughput

### 🛡️ Production-grade focus
- **Day-2 reality**: SRE is the discipline that *owns reliability on purpose*. Production readiness is: it fails, you know fast, it recovers, and it's tested.
- **Failure modes to know**: a backup that was never restored (backup ≠ backup); no RPO/RTO documented; single points of failure unexercised; postmortems that blame people (nothing gets fixed); capacity surprises during load; costs creeping with no owner.
- **Ops checklist**: *tested* restore with documented RPO/RTO; deliberate failure drills (chaos): kill a node/container and watch recovery; blameless postmortem for a real outage you caused; load test to find the real bottleneck; one cost win that doesn't hurt reliability; alert on error budget burn, not just symptoms.
- **Resources**: [[Resources/Level-4-Cloud-Production|Level 4 resources]] → *Site Reliability Engineering* + *The SRE Workbook* (free from Google); *Building Secure & Reliable Systems*; chaosengineering.org + Chaos Monkey docs. 🐙 [Becoming a Rockstar SRE](https://github.com/PacktPublishing/Becoming-a-Rockstar-SRE) + [Real-World SRE](https://github.com/PacktPublishing/Real-World-SRE).

### 🛠️ Lab ideas
- Kill a node/container in your cluster on purpose → watch the system recover
- Write a blameless postmortem for a deliberate outage you caused
- Test a real backup restore (create → back up → destroy → restore)
- Run a simple load test, find a bottleneck, fix it, re-test

### 🎯 Checkpoint
Cause a deliberate failure in your stack, document the incident, prove recovery, and explain your RPO/RTO for the system. Show one cost-saving change that didn't hurt reliability.

---

## Level 4 Capstone — The Hero Project

> [!success] You've hit hero when...
> You operate a **complete, real system**, end to end:
>
> - A real app, containerized (multi-stage, secure)
> - Deployed to a cloud + Kubernetes cluster via GitOps (ArgoCD)
> - Auto-scaled, network-policied, with proper probes/resources
> - Fully observed (metrics/logs/traces, dashboard, SLO + alerts)
> - Backed up with a *tested* restore, documented RPO/RTO
> - Deployed by a CI/CD pipeline from a Git repo, rolled back with `git revert`
> - Presented as a portfolio repo with a README that explains the architecture
>
> **That repo is your DevOps resume. Congratulations — zero to hero.**

---

## Beyond (stretch topics)
- Platform engineering & internal developer platforms (IDPs)
- Service mesh at scale (Istio) — traffic, mTLS, observability
- eBPF observability, Cilium
- Cloud cost platforms / FinOps tooling
- AI-assisted ops: copilots, incident triage
