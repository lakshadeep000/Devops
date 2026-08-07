# Level 1 — Foundations (The Zero)

> [!success] Goal
> You can operate a Linux server blindfolded, script it, version-control it, and explain exactly what happens when a packet crosses the network. This is the "zero" — everything above is built on it.

#devops #level-1 #foundations

[[00-Overview|← Back to Overview]] · → [[02-Level-2-Automation|Level 2]]

---

## M1 — Linux Operating System

### Basic (mostly done on Day 1)
- Filesystem hierarchy, navigation, file ops, permissions (`chmod`/`chown`)
- Users, groups, `sudo`
- Reading files, pipes, redirects, grep

### Deep (the part Day 1 skipped — this is where it gets real)
- **Permissions, truly**: sticky bit (`t`), setuid (`s`), setgid, special permission semantics
- **Processes & system**: `ps`, `top`, `htop`, process states, `kill`/signals, background jobs, `nice`/priority
- **System health**: `df`, `du`, `free`, `uname`, `lscpu`, load average
- **systemd**: units, `systemctl`, `journalctl`, writing your own `.service` file
- **Package management**: `apt`, `dpkg`, installing/removing/pinning packages
- **Filesystems**: `/proc` and `/sys` as virtual filesystems, mount points, inodes
- **Boot sequence**: BIOS/UEFI → GRUB → kernel → init/systemd (conceptual)

### 🛡️ Production-grade focus
- **Day-2 reality**: this module is *the* on-call foundation. Every outage debrief eventually becomes "what did the server do and why?" — that's `ps`, `free`, `journalctl`, and `/proc`.
- **Failure modes to know**: disk full (`df` at 90% = panic), runaway process pegging CPU (`top`, `yes` trick), OOM (swap + `free -h`), crashed service (systemd `Restart=on-failure`), zombie/stopped processes.
- **Ops checklist**: never `kill -9` first (TERM, wait, escalate); audit `find / -perm -4000`; write systemd units with `Restart`, `TimeoutSec`, `User=`, `LimitNOFILE`; know your host's CPU count vs load average before you say "it's slow".
- **Resources**: [[Resources/Level-1-Foundations|Level 1 resources]] → *The Linux Command Line* ch 1–11 (filesystem, permissions, processes, environment); `man systemd.unit` + `man systemd.service` for the unit fields that matter. 🐙 [Linux bootcamp repo](https://github.com/PacktPublishing/The-Ultimate-Linux-Bootcamp-for-DevOps-SRE-and-Cloud-Engineers); 📕 [[LinuxNotesForProfessionals.pdf]].

### 🛠️ Lab ideas
- Recreate the Day 1 permissions experiment **including sticky + setuid**
- Write + enable your own `systemd` service that runs a script on boot
- Stress the system with a busy loop, watch it in `top`, then `kill` it correctly
- Answer "why is `/tmp` different from `/var/tmp`?" by reading the docs, not guessing

### 🎯 Checkpoint
From a blank screen: create a user, give them sudo, write a service file for a script, start/enable it, verify via `journalctl`, and explain every column of `ps aux`. Explain sticky bit vs setuid with an example each.

---

## M2 — Bash Scripting

### Basic
- Variables, `$1`/`$@`, conditionals (`if`, `test`, `[[ ]]`), loops (`for`, `while`)
- Exit codes, `&&`/`||`
- Writing your first executable script with a shebang

### Deep
- **Robust scripts**: `set -euo pipefail`, error handling, `trap` for cleanup
- **Arrays, maps, string manipulation, arithmetic**
- **Job control**: `&`, `jobs`, `fg`, `bg`, `wait`, signals (`trap '...' INT`)
- **Advanced expansion**: `${var:-default}`, `${var//search/replace}`, command substitution vs process substitution
- **Functions** and sourcing/namespacing
- **getopts** for real CLI flags
- Reading from files/stdin like an engineer: `read` loops, IFS

### 🛡️ Production-grade focus
- **Day-2 reality**: your scripts run unattended in cron/systemd/CI — nobody is there to babysit. Exit codes, logging, and idempotency are *not* optional.
- **Failure modes to know**: script "works" interactively but fails in cron (missing env/PATH); `rm -rf $DIR` on an empty var (quote *everything*); partial failure mid-run; secret echo'd into logs; zombie background jobs.
- **Ops checklist**: `set -euo pipefail` in every script; timestamped logs with a log dir; `trap` cleanup for temp files/locks; exit non-zero on failure; add a lock file for cron re-entry; run `shellcheck` before shipping.
- **Resources**: [[Resources/Level-1-Foundations|Level 1 resources]] → *Bash Guide* (compound commands + parameter expansion sections); GNU Bash manual ch 3.5 (expansion); https://www.shellcheck.net as your lint gate. 🐙 [Bash cookbook](https://github.com/PacktPublishing/Linux-Shell-Scripting-Cookbook-Third-Edition); 📕 [[BashNotesForProfessionals.pdf]].

### 🛠️ Lab ideas (write these in `Scripts/`)
- A backup script with rotation (keep last 7 copies) + trap cleanup
- A log parser using grep/awk that produces a summary report
- A disk-usage alert script that emails/warns when `df` crosses a threshold
- A script that takes flags (`-f file -v`) via getopts

### 🎯 Checkpoint
Write a single robust script from scratch that: backs up a directory, keeps N rotations, logs each run to a timestamped logfile, and exits non-zero on failure — with `set -euo pipefail`, `trap`, and a `-h` flag. It must not have a single fragile line.

---

## M3 — Text Processing Power Tools

### Basic
- `grep`, `sed` (find/replace), `cut`, `sort`, `uniq`, `wc`

### Deep
- **Regex, properly**: anchors, groups, backreferences, greedy vs lazy, PCRE vs BRE/ERE
- **`sed` scripting**: ranges, multiple commands, in-place editing, delete/append/insert
- **`awk` as a mini-language**: fields, `NR`/`NF`, patterns, BEGIN/END, arrays, simple computation
- **`xargs`** — the pipeline workhorse, with `-I`, `-n`, `-P` parallelism
- Combining them to answer real questions about log files

### 🛡️ Production-grade focus
- **Day-2 reality**: text tools are your *log forensics* kit. When a 5xx spike hits, you answer "which endpoint, which IPs, since when?" with a pipeline, fast.
- **Failure modes to know**: pattern that matches nothing (empty output ≠ error); PCRE vs ERE surprises; `grep -r` on a huge dir being slow (use `rg`); `sed -i` on a file you didn't back up; NUL bytes / weird encodings in logs.
- **Ops checklist**: `awk`/`grep` for counting (never `cat file | grep`); `cut -d' ' -fX` for access-log fields; parse real `nginx`/`apache` logs not toy data; make a "top 10" report you'd actually send in an incident.
- **Resources**: [[Resources/Level-1-Foundations|Level 1 resources]] → GNU `grep`, `sed`, `gawk` manuals (regex + range chapters); regex101/regexone for drill; *sed & awk* (O'Reilly) if you want depth. 🐙 [Bash cookbook](https://github.com/PacktPublishing/Linux-Shell-Scripting-Cookbook-Third-Edition) grep/sed/awk chapters.

### 🛠️ Lab ideas
- Parse `nginx`/`apache` access logs: top IPs, top URLs, 4xx count, unique visitors
- Extract + transform a CSV into a clean report with awk
- Bulk-rename files using sed + a loop
- Find the 10 largest files on disk with `du`/`find`/`sort`

### 🎯 Checkpoint
Given a real access-log-format file: produce (1) top-10 IPs, (2) count of 5xx, (3) requests per hour — all in a single pipeline chain, and explain each stage.

---

## M4 — Git & GitHub

### Basic
- `init`, `clone`, `add`, `commit`, `status`, `log`, `diff`
- Branches, merge, push/pull, `.gitignore`

### Deep
- **Merge vs rebase** — when and why; interactive rebase; resolving merge conflicts by hand
- **Undoing**: `reset` (soft/mixed/hard), `revert`, `reflog` (the safety net), `stash`
- **Advanced**: `cherry-pick`, `bisect` (find the breaking commit), `tags`, `hooks`
- **Remotes**: `remote -v`, `fetch` vs `pull`, upstream tracking, force-push dangers
- **GitHub workflows**: PRs, code review, forks vs branches, GitHub Flow
- **clean history habits**: atomic commits, good messages, never commit secrets

### 🛡️ Production-grade focus
- **Day-2 reality**: in GitOps and on-call, Git is the *audit trail* — every change is reviewable and (usually) revertible. How you commit determines how well you can bisect and roll back.
- **Failure modes to know**: a secret committed 50 commits ago (must use `git filter-repo`/BFG + rotate, not just delete); force-push overwriting teammates' work; broken `main`; large binary blobs bloating the repo; lost work recovered via `reflog`.
- **Ops checklist**: atomic commits with messages that explain *why*; branch protection on `main`; PR review before merge; tags for releases; `git revert` as the standard rollback (not `reset --hard` on shared branches); sign your commits.
- **Resources**: [[Resources/Level-1-Foundations|Level 1 resources]] → *Pro Git* ch 3 (branching), 7 (rebase/reset), 10 (internals/reflog); https://learngitbranching.js.org; GitHub docs on branch protection. 🐙 [GitHub Foundations repo](https://github.com/PacktPublishing/GitHub-Foundations-Certification-Guide).

### 🛠️ Lab ideas
- Create a repo, intentionally create a conflict, resolve it both by merge and rebase
- Break your commit history, then recover with `reflog`
- Use `bisect` to find the exact commit that introduced a bug in a script
- Set up a pre-commit hook (lint your shell scripts)

### 🎯 Checkpoint
From scratch: init a repo, make a feature branch, resolve a conflict, squash-merge via `git rebase -i`, recover an "accidentally deleted" branch via `reflog`, and explain the difference between `reset --hard`, `revert`, and `restore`.

---

## M5 — Markdown & YAML

### Basic
- Markdown headings/lists/links/code/tables
- YAML indentation, lists, maps

### Deep
- **YAML (critical for DevOps)**: anchors `&`, aliases `*`, merge keys `<<`, multi-doc `---`
- YAML gotchas: quoting, multi-line strings (`|`, `>`), numbers vs strings, `null`
- Where YAML lives in the stack: CI/CD, Compose, Ansible, K8s, Terraform variables
- Validating YAML programmatically (Python `yaml`, or tooling)

### 🛡️ Production-grade focus
- **Day-2 reality**: YAML is *config-as-code* — the thing you deploy is the thing in the file, and a single wrong type breaks every environment downstream (CI, Compose, Helm, Ansible, K8s).
- **Failure modes to know**: `on:` parsed as boolean `true`; tabs instead of spaces; multi-line strings eating newlines; anchors/merge silently ignored by a parser version; secrets committed next to the config.
- **Ops checklist**: lint YAML in CI (e.g. `yamllint` + a schema check); use anchors/merge keys to DRY, then *validate*; prefer explicit quoting for strings that look like numbers/bools; never store secrets in YAML (reference env/vault).
- **Resources**: [[Resources/Level-1-Foundations|Level 1 resources]] → YAML 1.2 spec (skim), learnxinyminutes YAML, `yamllint` docs. 🐙 YAML in the wild: read the manifests in the K8s/Ansible packt repos ([[Packt-DevOps]]).

### 🛠️ Lab ideas
- Write a YAML that uses anchors + merge keys to DRY a repeated config
- Write a small ansible-style inventory with hosts/groups/vars
- Validate it with a Python one-liner

### 🎯 Checkpoint
Write a valid multi-document YAML from scratch using anchors and merge keys, and explain (in your own words) three places you'd use YAML in a DevOps toolchain.

---

## M6 — Networking

### Basic
- OSI model (focus layers 3/4/7), IP addressing, ports, common services (22, 80, 443, 5432, 3306)

### Deep
- **Subnetting for real**: CIDR math, subnet masks, network/broadcast/host addresses, VLSM
- **TCP vs UDP** and the handshake/teardown; why it matters for DevOps (timeouts, retries)
- **DNS end-to-end**: root → TLD → authoritative, `dig`/`nslookup`, A/CNAME/MX/TXT records, TTL, propagation
- **HTTP deep**: methods, status codes, headers, cookies/sessions, caching, TLS/HTTPS handshake
- **Practical tools**: `ping`, `traceroute`/`mtr`, `curl` (every flag you need), `nc`, `ss`, `ip`
- **Firewalls**: `ufw`, understanding `iptables` chains conceptually

### 🛡️ Production-grade focus
- **Day-2 reality**: "it works on my machine but not in prod" is usually a network layer. Debugging connectivity, latency, DNS, and TLS is the daily bread of DevOps.
- **Failure modes to know**: DNS TTL/TTL cache giving stale IPs; connection timeouts vs refused (port closed vs firewall drop); TLS handshake failures (expired cert, wrong SNI); NAT port exhaustion; 502/504/521 meaning the *upstream* failed.
- **Ops checklist**: `curl -v`/`curl -w` to see the full path; `ss -tulpn` to check what's listening; `dig +trace` for DNS; `nc -vz` for port tests; know your firewall's default policy (allow vs deny); timeouts and retries are *expected*, code for them.
- **Resources**: [[Resources/Level-1-Foundations|Level 1 resources]] → Kurose & Ross (HTTP, DNS, TCP chapters); Professor Messer networking; `curl` docs; https://subnettingpractice.com for drill. 🐙 [CompTIA Network+ repo](https://github.com/PacktPublishing/CompTIA-Network-Cert-N10-007-Full-Course-and-Practice-Exam).

### 🛠️ Lab ideas
- Draw + explain a full request flow: browser → DNS → TCP → TLS → HTTP → server → response
- Use `curl -v` and explain every line of the output
- Test connectivity with `nc`/`ss`; check listening ports
- Subnet a `/24` into 4 subnets by hand and with a script

### 🎯 Checkpoint
Explain the entire path of `curl https://example.com` from keystroke to response, covering DNS, TCP handshake, TLS, HTTP — and run real commands that prove each hop. Subnet a CIDR block without a calculator.

---

## M7 — Security Essentials

### Basic
- SSH: `ssh-keygen`, keys vs passwords, `ssh-copy-id`, agent

### Deep
- **SSH deep**: config file, key types (ed25519), permissions (700/600), port forwarding, `scp`/`rsync`
- **Authentication vs authorization** — the difference, applied
- **TLS concepts**: certificates, CA, trust chain, `openssl s_client`
- **Least privilege** in practice: users, sudo rules, permissions
- **Secrets mindset**: never in code/repos, env vars, secret managers (vault later)
- **Auditing**: `who`, `last`, `/var/log/auth.log`, failed login checks

### 🛡️ Production-grade focus
- **Day-2 reality**: security is the *first* thing a production team reviews, not an afterthought. Every access path, port, and stored secret is an attack surface.
- **Failure modes to know**: SSH brute force (watch `auth.log`); password auth enabled with weak keys; expired/rotating TLS certs; secrets in env dumps or image layers; over-privileged sudo rules; keys with 777 perms silently ignored.
- **Ops checklist**: key-only SSH + no root login; ed25519 keys with 600/700 perms; least-privilege sudo; audit `auth.log` for failed logins; know the TLS cert lifecycle and how to check expiry (`openssl x509 -noout -dates`); threat-model each open port.
- **Resources**: [[Resources/Level-1-Foundations|Level 1 resources]] → OpenSSH manual (keys/config/forwarding); Let's Encrypt *How it works* (TLS primer); *Practical Cryptography in Python* if you want the math. 🐙 [CompTIA Security+ repo](https://github.com/PacktPublishing/CompTIA-Security-SY0-701-Full-Training-Guide).

### 🛠️ Lab ideas
- Generate ed25519 keys, explain the 700/600 permission requirements and why
- Inspect a real TLS cert with `openssl s_client -connect example.com:443`
- Check `/var/log/auth.log` (or `journalctl`) for SSH login attempts
- Lock down: disable password auth (conceptually), explain the threat model

### 🎯 Checkpoint
Set up passwordless SSH to a target (localhost loopback counts), explain authentication vs authorization with a concrete example, and inspect a TLS certificate chain with the commands to prove it.

---

## Level 1 Capstone — The Zero Made Real

> [!success] Pass Level 1 when...
> You can, without notes: script a server task in Bash, push it to GitHub with clean history, parse its logs with a pipeline, explain its network path, and SSH to it securely. **Then move to [[02-Level-2-Automation|Level 2]].**
