# Level 4 — Cloud, Observability & Production

> [!success] Goal
> Run something real. Deploy to a cloud provider, measure everything, automate rollouts with GitOps, and operate with an SRE mindset — reliability, incidents, costs. Ends with a portfolio-grade capstone.

#devops #level-4 #cloud #observability #sre

[[03-Level-3-Containers-K8s|← Level 3]] · [[00-Overview|Overview]]

---

## M16 — Cloud Fundamentals (AWS ⇄ Azure, comparative)

> [!note] Approach: learn both clouds as one subject
> You already hold AWS associate certs, so this module is built as a **side-by-side comparison**: for every concept, learn the AWS way, then map it to the Azure equivalent. The pattern to internalize is *"X in AWS ≈ Y in Azure"* — that's what makes the second cloud fast to learn and the porting table you'll use on the job. Target depth: **AWS DevOps Engineer Pro (DOP-C02)** + **Azure DevOps Engineer (AZ-400)** level.

### Basic (comparison frame)
- **Regions, AZs & global structure**: AWS Regions/AZs/edge vs Azure Regions/Availability Zones; global vs regional services
- **Accounts & org**: AWS accounts/organizations vs Azure tenants, subscriptions, resource groups
- **Console, CLI & IaC**: AWS Console + `aws` CLI + CloudFormation vs Azure Portal + `az` CLI + Bicep/ARM
- **Core building blocks side-by-side**: compute, storage, networking, identity — the two vocabularies

### Deep (side-by-side per domain)
- **Identity**: AWS IAM (users, roles, policies, managed identity) vs Azure Entra ID (RBAC, managed identities, service principals)
- **Networking**: AWS VPC (subnets, route tables, NAT, peering, security groups, NACLs) vs Azure VNet (subnets, NSGs, NAT gateway, VNet peering, DNS zones)
- **Compute**: EC2 + ASG vs Azure VMs + VMSS; instance types vs VM sizes; spot vs spot/preemptible
- **Storage**: S3/EBS/EFS vs Blob Storage/Managed Disks/Files; lifecycle, tiers, backup
- **Security**: Security Groups vs NSGs; WAF both sides; secrets (Secrets Manager vs Key Vault); IAM policies vs RBAC definitions
- **Serverless**: Lambda vs Azure Functions (triggers, cold start, quotas)
- **K8s bridge**: EKS vs AKS (maps back to M14/15 — cluster ops on both)
- **CI/CD bridge**: CodePipeline/CodeBuild vs Azure DevOps Pipelines (maps to M9/M18)
- **Cost & governance**: Cost Explorer/budgets vs Cost Management; tags vs tags + resource groups; right-sizing

### 🛡️ Production-grade focus
- **Day-2 reality**: you'll hold certs in one cloud and get hired to operate the other. The comparison table is the actual job skill — most incidents are "AWS team misconfigures Azure" or vice versa.
- **Failure modes to know**: over-permissive IAM policy *or* Entra RBAC role; public subnets where private is needed; no NAT → private instances can't patch; untagged resources → surprise bill on both clouds; a leaked key/credential (rotate + audit); single-AZ on either side = one datacenter outage.
- **Ops checklist**: learn the same workload in *both* clouds — build once per provider; IAM/RBAC least privilege on both; VPC/VNet private subnets + NAT on both; tag + budget on both; root/tenant MFA; use IaC so infra is reviewable; keep the mental "AWS ≈ Azure" table updated as you go.
- **Resources**: [[Resources/Level-4-Cloud-Production|Level 4 resources]] → AWS Well-Architected + [Azure Well-Architected](https://learn.microsoft.com/en-us/azure/well-architected/); [Microsoft's official AWS-to-Azure service map](https://learn.microsoft.com/en-us/azure/architecture/aws-professional/); *AWS in Action*; Microsoft Learn paths; Skill Builder + Azure free account. 🐙 [Effective DevOps with AWS](https://github.com/PacktPublishing/Effective-DevOps-with-AWS).

### 🛠️ Lab ideas (build the SAME workload on both)
- **Pair-lab 1 — Identity**: create a least-privilege principal on both (IAM user/role vs Entra service principal); test the deny on each
- **Pair-lab 2 — Networking**: build a VPC *and* a VNet with public+private subnets + NAT; compare the console journeys
- **Pair-lab 3 — Compute**: launch an EC2 vs an Azure VM, expose it, scale (ASG vs VMSS)
- **Pair-lab 4 — Serverless**: same Lambda function vs Azure Function triggered the same way
- **K8s bridge**: deploy the same deployment to EKS *and* AKS (reuses your M14/15 manifests)
- Tag/budget everything on both; compare the cost views

### 🎯 Checkpoint
From memory, build a **translation table**: for each of identity, networking, compute, storage, security, serverless, K8s, CI/CD, and cost — the AWS service, the Azure equivalent, and one key difference each. Then create the same least-privilege principal + private-subnet network on *both* clouds via IaC/CLI.

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
- **Resources**: [[Resources/Level-4-Cloud-Production|Level 4 resources]] → *Site Reliability Engineering* + *The SRE Workbook* (free from Google); *Building Secure & Reliable Systems*; chaosengineering.org + Chaos Monkey docs. 🐙 [Becoming a Rockstar SRE](https://github.com/PacktPublishing/Becoming-a-Rockstar-SRE) + [Real-World SRE](https://github.com/PacktPublishing/Real-World-SRE). 📕 [[MySQLNotesForProfessionals.pdf]] for the backup/restore lab (classic RPO/RTO drill).

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
