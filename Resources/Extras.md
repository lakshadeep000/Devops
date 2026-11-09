# Extras — Curated Collections & Practice

Bonus resources beyond the per-level sheets: the big community-curated collections, practice sites, and must-read books.

#devops #resources #extras

[[00-Overview|← Back to Roadmap]]

---

## 🌟 The Mega-Collection (bregman-arie/devops-resources)

[**devops-resources**](https://github.com/bregman-arie/devops-resources) — 9.7k⭐ *(verified live 2026-08-22)*. Curated resources per topic (Linux, Git, Bash, Python, Ansible, Terraform, Kubernetes, Networking, Security, AWS, Azure, Containers, Prometheus...), plus roadmaps, tools, blogs, and interview questions.

Use it as your **"dig deeper" index** — when a module's official docs feel thin, check its section here.

**Per-topic deep links → module map** (each is a curated page of books/courses/videos):

| Topic page | Feeds module |
|---|---|
| [`resources/linux.md`](https://github.com/bregman-arie/devops-resources/blob/master/resources/linux.md) | M1 (incl. logging extension) |
| [`resources/bash.md`](https://github.com/bregman-arie/devops-resources/blob/master/resources/bash.md) | M2 |
| [`resources/git.md`](https://github.com/bregman-arie/devops-resources/blob/master/resources/git.md) | M4 |
| [`resources/network.md`](https://github.com/bregman-arie/devops-resources/blob/master/resources/network.md) | M6 |
| [`resources/security.md`](https://github.com/bregman-arie/devops-resources/blob/master/resources/security.md) | M7 |
| [`resources/python.md`](https://github.com/bregman-arie/devops-resources/blob/master/resources/python.md) | M8 |
| [`resources/ansible.md`](https://github.com/bregman-arie/devops-resources/blob/master/resources/ansible.md) | M10 |
| [`resources/kubernetes.md`](https://github.com/bregman-arie/devops-resources/blob/master/resources/kubernetes.md), [`containers.md`](https://github.com/bregman-arie/devops-resources/blob/master/resources/containers.md) | M12–M15 |
| [`resources/prometheus.md`](https://github.com/bregman-arie/devops-resources/blob/master/resources/prometheus.md), [`elk.md`](https://github.com/bregman-arie/devops-resources/blob/master/resources/elk.md), [`victoriametrics.md`](https://github.com/bregman-arie/devops-resources/blob/master/resources/victoriametrics.md) | M17 Observability (native logging → industry stack bridge) |
| [`resources/aws.md`](https://github.com/bregman-arie/devops-resources/blob/master/resources/aws.md), [`azure.md`](https://github.com/bregman-arie/devops-resources/blob/master/resources/azure.md) | M16 comparative study |

Also useful from its toolchain section for **M17 context**: log-management landscape (Logstash/Graylog/Fluentd/Splunk, Loki aggregation) — shows where native `journald`/`rsyslog` skills plug into production stacks.

---

## Practice & Testing Your Knowledge

| Resource | Use it for |
|----------|-----------|
| [devops-exercises](https://github.com/bregman-arie/devops-exercises) — 1000+ questions by topic | **Checkpoint prep** — quiz yourself after each module |
| [Kodekloud Engineer](https://www.kodekloud-engineer.com/) | Real tasks in a fictional org — great for K8s/docker practice |
| [Qwiklabs](https://www.qwiklabs.com) | Guided AWS/GCP/Azure labs |
| [Learn Git Branching](https://learngitbranching.js.org) | Git mastery trainer |
| [Linux Journey](https://linuxjourney.com) | Linux text guides + quizzes |
| [Exercism](https://exercism.org) | Python/shell skill drills |

## 📚 Must-Read Books

| Book | Why |
|------|-----|
| *The Phoenix Project* | DevOps explained as a story — read first, it's the culture |
| *The DevOps Handbook* | The practical companion to Phoenix |
| [Google SRE books](https://sre.google/books/) | The theory + practice bible (free) |
| [The 12-Factor App](https://12factor.net) | How to write deployable apps — must-read |

## 🗄️ Databases (optional / cross-cutting)

Not a module on its own, but databases show up in every stack — backups, RDS vs Azure SQL, migration.

| Resource | Use it for |
|----------|-----------|
| 📕 *MySQL Notes for Professionals* — [[MySQLNotesForProfessionals.pdf]] | Backup/restore (`mysqldump`), indexing, replication — used in the M19 RPO/RTO lab |
| 📖 [PostgreSQL docs](https://www.postgresql.org/docs/) | The other major open-source DB; same backup concepts apply |

## 🔎 SRE & Design Extras

| Resource | What it is |
|----------|-----------|
| [sre-checklist](https://github.com/bregman-arie/sre-checklist) | Production-readiness checklist — audit your capstone against it |
| [howtheydevops](https://github.com/bregman-arie/howtheydevops) | How real companies do DevOps |
| [system-design-notebook](https://github.com/bregman-arie/system-design-notebook) | Availability, reliability, scalability, performance |
| [System Design Primer](https://github.com/donnemartin/system-design-primer) | The classic system-design study repo |
| [CNCF Landscape](https://landscape.cncf.io) | The full cloud-native tool map |
| [devopsbookmarks](https://www.devopsbookmarks.org) | Discover tools by category |

## 🗞️ Stay Current (blogs/news)

- [Codefresh Blog](https://codefresh.io/blog) — best GitOps content
- [Spacelift Blog](https://spacelift.io/blog) — Terraform/K8s/Ansible deep dives
- [thisweekindevops.com](https://thisweekindevops.com) — DevOps news without hype
- [Reddit r/devops](https://www.reddit.com/r/devops)

---

> [!tip] Golden use
> `devops-exercises` is your checkpoint companion — at the end of each module, run its question set for that topic. Miss 3+ → redo the lab. It's the fastest way to catch shallow understanding.

[[00-Overview|← Back to Roadmap]]
