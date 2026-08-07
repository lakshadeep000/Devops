# Level 3 — Containers & Kubernetes

> [!success] Goal
> Package anything into a container, run multi-service stacks, then step up to Kubernetes and understand it deeply enough to run production workloads — scheduling, operators, Helm, and service mesh.

#devops #level-3 #containers #kubernetes

[[02-Level-2-Automation|← Level 2]] · [[00-Overview|Overview]] · → [[04-Level-4-Cloud-Production|Level 4]]

---

## M12 — Docker Deep

### Basic
- Containers vs VMs (the mental model: shared kernel, isolated processes)
- Architecture: daemon, CLI, registry; images vs containers
- Core commands: `pull`, `build`, `run`, `ps`, `logs`, `exec`, `stop`, `rm`
- Dockerfile basics: `FROM`, `RUN`, `COPY`, `ENV`, `EXPOSE`, `CMD`, `ENTRYPOINT`
- Ports (`-p`), volumes (`-v`), networks

### Deep
- **How images work**: layers, layer caching, `COPY`/`RUN` ordering for cache efficiency
- **Multi-stage builds** — tiny production images without build toolchains
- **`.dockerignore`**, image size & security hygiene
- **Non-root best practice**, distroless images, scanning (trivy/dockle)
- **Volumes vs bind mounts vs tmpfs** — when each, and named volumes
- **Docker networking**: bridge, host, none; user-defined networks; container-to-container DNS
- **Docker internals (conceptual)**: namespaces, cgroups, overlayfs, `docker inspect`
- **Dockerfile vs Compose vs run** — when to use which
- **Healthchecks**, restart policies, logging drivers

### 🛡️ Production-grade focus
- **Day-2 reality**: images are *artifacts* — they must be small, secure, immutable, and reproducible. A 2GB image or a root-running container is a production liability.
- **Failure modes to know**: secrets baked into an image layer (still recoverable via `docker history`); running as root; image not pinned (base drift → "worked yesterday"); bloated images slowing deploys; no healthcheck so a broken container stays "healthy"; orphan containers eating disk.
- **Ops checklist**: multi-stage builds to distroless; non-root user in the image; pin base images by digest; scan with `trivy`/`dockle` in CI; add `HEALTHCHECK` + restart policies; set resource limits; log to stdout (not files) for the logging driver; never `COPY` secrets.
- **Resources**: [[Resources/Level-3-Containers-K8s|Level 3 resources]] → *Docker Deep Dive* (Poulton); Dockerfile reference; Play with Docker sandbox. 🐙 [Containerize your Apps](https://github.com/PacktPublishing/Containerize-your-Apps-with-Docker-and-Kubernetes) + [Mastering Docker](https://github.com/PacktPublishing/Mastering-Docker-Fourth-Edition).

### 🛠️ Lab ideas
- Containerize a real app with a multi-stage build → measure image size before/after
- Optimize build caching: touch a dependency file, show the cache hit in `docker build`
- Run an app as non-root, verify with `whoami` inside
- Network two containers by name on a custom bridge network
- Scan your image with trivy, fix a high-severity finding

### 🎯 Checkpoint
From scratch: write a Dockerfile (multi-stage, non-root, distroless-friendly) for a sample app, build it, run it on a custom network with another container, and explain each layer + why it's ordered that way.

---

## M13 — Docker Compose

### Basic
- `docker-compose.yml`: services, volumes, networks, environment

### Deep
- Multi-service app: web + db + cache, with healthchecks and startup ordering
- `depends_on` + healthchecks (real readiness, not just start)
- `.env` files, `$VAR` interpolation, environment vs `env_file`
- Named volumes & backup workflows
- Profiles, resource limits, restart policies
- The "local dev parity with prod" mindset

### 🛡️ Production-grade focus
- **Day-2 reality**: Compose is how dev/prod stay in sync. If it works in Compose and fails in prod, the configs drifted — healthchecks and readiness are the difference.
- **Failure modes to know**: app starts before DB is ready (missing healthcheck/retry); `depends_on` without healthcheck; secrets or prod URLs in compose files; unnamed volumes losing data; orphan containers from interrupted `up`; no resource limits on a shared host.
- **Ops checklist**: `healthcheck:` on every service; `depends_on: condition: service_healthy`; config from `.env`/env, secrets via files or Docker secrets; named volumes + a documented backup; `profiles` for tools you don't always run; keep compose and prod manifests in sync (or same source).
- **Resources**: [[Resources/Level-3-Containers-K8s|Level 3 resources]] → Compose spec; [awesome-compose](https://github.com/docker/awesome-compose) real stacks. 🐙 [Docker Compose essential guide](https://github.com/PacktPublishing/A-Developer-s-Essential-Guide-to-Docker-Compose).

### 🛠️ Lab ideas
- Compose a 3-service stack (app + postgres + redis) with proper healthchecks
- Break the DB, show how the app's retry/healthcheck handles it
- Add `.env`, run `compose up --scale` (if app is stateless), clean teardown

### 🎯 Checkpoint
Write a compose file for a 3-service stack from scratch with healthchecks, env config, and named volumes; start it; prove the app waits for DB readiness; tear it down without leaving orphans.

---

## M14 — Kubernetes Fundamentals

### Basic
- The mental model: declarative desired state, control plane vs worker nodes
- Core objects: `Pod`, `Deployment`, `Service`, `ConfigMap`, `Secret`, `Namespace`, `Ingress`
- `kubectl` workflow: `apply`, `get`, `describe`, `logs`, `exec`, `port-forward`
- Labels & selectors — how everything finds everything

### Deep
- **Deployments**: replicas, rolling updates, rollbacks, `strategy`, revision history
- **Probes**: liveness vs readiness vs startup — and what breaks when you get them wrong
- **Resources**: requests vs limits, QoS classes, why limits can bite you
- **Services deep**: ClusterIP/NodePort/LoadBalancer, selector mechanics, DNS naming
- **Ingress**: path/host routing, TLS termination
- **Storage**: emptyDir, hostPath, PV/PVC, storage classes
- **Namespaces & resource quotas**
- **RBAC**: ServiceAccounts, Roles/RoleBindings, ClusterRole
- **Multi-node practice**: `k3d`/`k3s` or minikube for a real cluster

### 🛡️ Production-grade focus
- **Day-2 reality**: Kubernetes is a *declarative operating system* — your job is to describe the desired state and let the cluster keep it. Probes, resources, and RBAC are what keep prod alive during a deploy.
- **Failure modes to know**: wrong probes (liveness killing a slow-but-healthy pod; readiness kept even when broken); limits too tight → OOMKilled; rolling update that never completes (no `maxUnavailable`/`maxSurge`); RBAC too permissive; a node dies and nobody notices.
- **Ops checklist**: correct probe types + `initialDelay`/`period`; requests for scheduling, limits as a safety cap; test the rollback (`kubectl rollout undo`); restrict RBAC and verify with `kubectl auth can-i`; resource quotas per namespace; storage with PVC + backup; simulate a node failure.
- **Resources**: [[Resources/Level-3-Containers-K8s|Level 3 resources]] → *Kubernetes in Action* (Lukša); docs *Workloads* + *Services*; Killercoda scenarios; CKA/CKAD depth. 🐙 [K8s Enterprise Guide](https://github.com/PacktPublishing/Kubernetes-An-Enterprise-Guide-Third-Edition) + [Microservices w/ K8s](https://github.com/PacktPublishing/Hands-On-Microservices-with-Kubernetes).

### 🛠️ Lab ideas
- Deploy an app, expose it, scale it, do a rolling update, then roll back
- Break a readiness probe on purpose → show the pod being removed from Service endpoints
- Set a bad memory limit → watch OOMKilled, fix it
- Grant/deny access with RBAC, prove it with `kubectl auth can-i`
- Create a PV/PVC and make a stateful app persist

### 🎯 Checkpoint
From a blank cluster: deploy a stateless app (Deployment + Service + Ingress), scale to 3, run a rolling update + rollback, add correct probes, set sensible resources, and restrict access with RBAC. Explain endpoints when a pod fails a probe.

---

## M15 — Kubernetes Advanced

### Basic
- (assumes M14 complete)

### Deep
- **Scheduling & placement**: nodeSelector, affinity/anti-affinity, taints & tolerations
- **Controllers & operators**: controllers/reconcile loop, CRDs, and how operators (e.g. cert-manager, Prometheus Operator) automate ops
- **Helm**: charts, templating, values, releases, installing/upgrading/rolling back; writing your own chart
- **HPA / VPA**: autoscaling on CPU/custom metrics; cluster autoscaler concepts
- **Network policies**: microsegmentation, allow-list patterns
- **Service mesh**: Istio/Linkerd concepts — mTLS, traffic shifting, canary, observability
- **Multi-tenancy & quotas**, node/taints in mixed clusters
- **Secrets management**: External Secrets Operator / Vault integration

### 🛡️ Production-grade focus
- **Day-2 reality**: advanced K8s is about *operating the platform*, not just deploying on it — scheduling, policy, and secrets are what let a team run many apps safely on one cluster.
- **Failure modes to know**: no network policy (any pod can reach any pod); taints/affinity misconfig (pods Pending forever); HPA reacting to the wrong metric; a Helm upgrade that breaks values backwards-compat; secrets in `values.yaml` or ConfigMaps; cert-manager certs silently expiring.
- **Ops checklist**: default-deny network policies, allow only the app→db path; taints + tolerations for node pools; HPA on real metrics (not just CPU); Helm chart hygiene (`helm lint`, versioned releases, `--atomic`); secrets via ESO/Vault, never in Git; cert-manager with expiry alerts; document the reconcile loop you rely on.
- **Resources**: [[Resources/Level-3-Containers-K8s|Level 3 resources]] → Helm docs + chart template guide; Operator pattern/CRDs docs; Network Policies + HPA docs; *Programming Kubernetes* for operators. 🐙 [K8s Enterprise Guide](https://github.com/PacktPublishing/Kubernetes-An-Enterprise-Guide-Third-Edition) (Helm/operators/RBAC chapters).

### 🛠️ Lab ideas
- Taint a node, schedule a pod onto it, and prove the logic
- Write a Helm chart for your M14 app; upgrade + rollback a release
- Set an HPA, generate load, watch it scale in/out
- Write a NetworkPolicy that blocks all cross-namespace traffic except the app→db path
- Deploy cert-manager, get a real (self-signed) cert via its operator

### 🎯 Checkpoint
Package your app as a Helm chart from scratch, deploy it to a multi-node cluster, add HPA + NetworkPolicy + taints/affinity so pods land where you want, and explain the reconcile loop of a custom controller you've seen in action.

---

## Level 3 Capstone — Production Containers

> [!success] Pass Level 3 when...
> You have a multi-node cluster running your app from a Helm chart, with autoscaling, network policies, correct probes/resources, and a clean rolling-update story. **Then move to [[04-Level-4-Cloud-Production|Level 4]].**
