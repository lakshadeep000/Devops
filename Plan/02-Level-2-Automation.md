# Level 2 — Automation

> [!success] Goal
> Everything you did by hand in Level 1 now gets automated. You'll write Python automation, build CI/CD pipelines, manage servers with Ansible, and provision cloud infra as code with Terraform. Repetition is the enemy; automation is the job.

#devops #level-2 #automation

[[01-Level-1-Foundations|← Level 1]] · [[00-Overview|Overview]] · → [[03-Level-3-Containers-K8s|Level 3]]

---

## M8 — Python for DevOps

### Basic
- Syntax: variables, types, lists, dicts, conditionals, loops, functions
- Reading/writing files, `with` blocks
- `pip`, virtual environments (`venv`), `requirements.txt`

### Deep
- **Working with data**: JSON, YAML, CSV — parse, transform, emit (the glue of DevOps)
- **Modules & packages**: `import`, stdlib gems (`os`, `pathlib`, `subprocess`, `shutil`, `re`, `datetime`)
- **Automation patterns**: calling shell commands via `subprocess`, walking directories with `pathlib`, retries/error handling, `try/except` done right
- **CLI tools**: `argparse` / `click` — real flags, help text, exit codes
- **HTTP**: `requests`/`urllib` — hitting APIs, handling auth, pagination
- **Testing mindset**: `pytest` basics, assert, fixtures
- **Environment**: `.env` files, `os.environ`, keeping secrets out of code

### 🛡️ Production-grade focus
- **Day-2 reality**: Python here is the *automation glue* — the tool you write to parse logs, hit APIs, and clean up disk at 2am. It must survive running unattended and being debugged at 3am.
- **Failure modes to know**: a script that exits 0 while failing (no exception handling / wrong exit codes); secrets in argparse help or debug logs; `subprocess` with `shell=True` (command injection); retries that hammer an API without backoff; no logging so a failure is invisible.
- **Ops checklist**: structured logging with timestamps; proper exit codes for CI; `try/except` around only what can fail; retry + backoff for API calls; `pathlib` (not string paths); `shell=False` in subprocess; type hints + pytest in CI; config from env, never hardcoded.
- **Resources**: [[Resources/Level-2-Automation|Level 2 resources]] → *Automate the Boring Stuff* (files, CLI, automation chapters); `pathlib`/`subprocess`/`argparse` docs; exercism drills. 🐙 [Python for DevOps](https://github.com/PacktPublishing/Python-for-DevOps-The-Ultimate-Hands-On-Guide) + [Python Automation Cookbook](https://github.com/PacktPublishing/Python-Automation-Cookbook-Third-Edition); 📕 [[PythonNotesForProfessionals.pdf]].

### 🛠️ Lab ideas (in `Scripts/`)
- A log parser that reads a file, extracts metrics, writes a JSON summary
- A file-renamer / directory-cleaner utility
- A script that hits a public API, paginates, and saves structured results
- A YAML→JSON converter (useful everywhere)
- Unit tests for the log parser with pytest

### 🎯 Checkpoint
Write a Python CLI tool from scratch that: takes a log file, parses it into structured data, writes a JSON report, supports `--output` and `--verbose` flags, and has passing pytest tests. No copy-paste.

---

## M9 — CI/CD with GitHub Actions

### Basic
- Why CI/CD: catch problems early, deploy automatically, reduce toil
- Workflow anatomy: `on:`, `jobs:`, `steps:`, `runs-on`, `actions/checkout`
- A simple build+test pipeline

### Deep
- **Triggers**: `push`, `pull_request`, `schedule`, `workflow_dispatch`, paths filtering
- **Matrix builds** — test across versions/OSs
- **Caching** dependencies, artifact upload/download between jobs
- **Secrets & environments**: `${{ secrets.* }}`, environment protection rules, branch protection
- **Concurrency control**, job dependencies (`needs`), conditionals, failure handling
- **Reusable workflows** (DRY across repos), composite actions
- **Self-hosted runners** (why/when)
- **Deploy stages**: build → test → staging → production gates

### 🛡️ Production-grade focus
- **Day-2 reality**: CI/CD is the *gatekeeper* of production. A weak pipeline ships broken code; a strong one stops it, artifact in hand, reproducibly.
- **Failure modes to know**: secrets injected into public logs; untrusted third-party actions (supply chain); tests that pass but don't test; a deploy that's not reproducible (build in prod, not from artifact); no rollback story; matrix that's secretly only ever run on one version.
- **Ops checklist**: secrets via `${{ secrets }}` + environment protection; pin/audit actions by SHA; upload the build artifact and deploy *that*; cache deps, never `npm ci`/`pip install` twice; gate prod (manual approval or environment rule); keep artifacts immutable and versioned; test the rollback path.
- **Resources**: [[Resources/Level-2-Automation|Level 2 resources]] → GitHub Actions docs (workflow syntax, security hardening guide); [starter-workflows](https://github.com/actions/starter-workflows). 🐙 [Learning GitHub Actions](https://github.com/PacktPublishing/Learning-GitHub-Actions-for-DevOps-CI-CD) + [GitHub Actions Cookbook](https://github.com/PacktPublishing/GitHub-Actions-Cookbook).

### 🛠️ Lab ideas
- CI pipeline: lint + test + build on every PR (matrix across Python versions)
- CD pipeline: on merge to `main`, build and "deploy" to staging, gate before prod
- A scheduled pipeline that runs your disk-check script and posts results as an issue/artifact
- A reusable workflow your own repos call

### 🎯 Checkpoint
From scratch: write a pipeline that runs tests in a matrix, caches deps, uploads a build artifact, and only deploys on tagged releases using a secret. Explain each key part in your own words.

---

## M10 — Ansible (Configuration Management)

### Basic
- Why config management: idempotency, drift, fleet-scale changes
- Inventory (hosts/groups), ad-hoc commands, `ping` module
- Playbooks: `tasks`, `become`, `handlers`

### Deep
- **Modules** for real life: `apt`, `copy`, `template`, `service`, `user`, `command/shell`
- **Jinja2 templating**: dynamic configs, conditionals/loops in templates
- **Variables & facts**: precedence, `vars`, `group_vars`/`host_vars`, `set_fact`
- **Roles** — reusable, structured playbooks (tasks, handlers, templates, vars, defaults)
- **Idempotency mindset**: writing tasks that are safe to re-run
- **Vault**: encrypting secrets in playbooks/repos
- **Molecule/testing** (optional, later)

### 🛡️ Production-grade focus
- **Day-2 reality**: Ansible is how fleets stay identical. The whole point is *idempotency and drift* — running it twice changes nothing, and it fixes any server that drifted.
- **Failure modes to know**: a task that's not idempotent (restarts service every run); secrets in plaintext playbooks; `become: yes` everywhere (lose least privilege); handlers not firing on changes; a playbook that only works on the author's machine.
- **Ops checklist**: run every playbook twice and read `changed` vs `ok`; use `ansible-vault` for secrets; limit `become` to the tasks that need it; use `--check`/`--diff` before applying; structure into roles; `tags` so you can target just one change; inventory = groups, not one-off hosts.
- **Resources**: [[Resources/Level-2-Automation|Level 2 resources]] → *Ansible for DevOps* (Geerling) + his ansible-for-devops repo; modules reference; Vault guide. 🐙 [Ansible for Real-Life Automation](https://github.com/PacktPublishing/Ansible-for-Real-life-Automation) + [Mastering Ansible](https://github.com/PacktPublishing/Mastering-Ansible-Fourth-Edition).

### 🛠️ Lab ideas
- Playbook that provisions a VM/server: install nginx, deploy a templated config, start service
- A role `webserver` you can reuse for any server
- Use Vault to store a password, use it in a playbook
- Verify idempotency: run the playbook twice, show "ok" vs "changed"

### 🎯 Checkpoint
Write an Ansible role from scratch that installs + configures a service with a templated config + a secret from Vault, run it twice to prove idempotency, and explain the role directory structure.

---

## M11 — Terraform (Infrastructure as Code)

### Basic
- Why IaC: reviewable, versioned, reproducible infra
- HCL syntax: `resource`, `variable`, `output`
- Core loop: `init` → `plan` → `apply` → `destroy`

### Deep
- **State**: what it is, why it exists, remote state (S3/Azure storage + locking), state commands
- **Modules**: reusable infra blocks, input/output variables, module registry
- **Providers**: multiple providers, `terraform.tfvars`, environment separation
- **Workspaces** vs directories per env
- **Lifecycle**: `depends_on`, `count` vs `for_each`, `lifecycle { prevent_destroy }`, `ignore_changes`
- **Drift detection**: `plan` showing external changes, refresh
- **Secrets & backends**: state encryption, sensitive variables
- **Terraform vs Ansible vs CloudFormation** — knowing which tool for which job
- **Terragrunt** (optional advanced)

### 🛡️ Production-grade focus
- **Day-2 reality**: Terraform's #1 production risk is *state*. Lose state, lose the environment's mental model; share state without locking, and two people `apply` at once.
- **Failure modes to know**: state not stored remotely (single laptop holds prod); `terraform destroy` on the wrong workspace; drift ignored until an outage; secrets in state files; `count` vs `for_each` reordering your infra; no plan review before apply.
- **Ops checklist**: remote state with locking (S3/Azure + DynamoDB/blob lease); environment separation via workspaces or dirs; review `plan` output in CI (or a PR); `lifecycle { prevent_destroy }` on critical resources; treat state as sensitive (encrypt at rest); `sensitive = true` on secrets; keep providers pinned.
- **Resources**: [[Resources/Level-2-Automation|Level 2 resources]] → *Terraform: Up & Running*; HashiCorp Learn + [state guide](https://developer.hashicorp.com/terraform/language/state); registry examples. 🐙 [Terraform Cookbook](https://github.com/PacktPublishing/Terraform-Cookbook-Second-Edition) + [Mastering Terraform](https://github.com/PacktPublishing/Mastering-Terraform).

### 🛠️ Lab ideas
- Provision a local resource (or free-tier cloud) with Terraform: init→plan→apply→destroy
- Create a reusable module (e.g., "web server") with variables, use it 2–3 times
- Set up remote state with locking (explain why it matters in a team)
- Simulate drift, catch it with `plan`

### 🎯 Checkpoint
From scratch: write a Terraform config using a module + variables that provisions an environment, migrate state to remote with locking, detect drift, and tear it all down cleanly. Explain why state is the #1 thing to protect.

---

## Level 2 Capstone — The Automation Pipeline

> [!success] Pass Level 2 when...
> You push a Python tool to GitHub; a pipeline lints/tests it, builds an artifact, and deploys it to a server that Ansible configured from a playbook — while the whole environment is provisioned and tracked by Terraform. Every step automated, no manual SSH sessions. **Then move to [[03-Level-3-Containers-K8s|Level 3]].**
