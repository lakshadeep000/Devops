---
module: M1
level: 1
name: Linux
status: inprogress
last-updated: 2026-11-09
---

# 🗂️ Session — L1-M1 Linux

> **Shared memory** for this module's chat window. The tutor updates this at the end of every session; the [[Sessions/_MASTER|master window]] and the dashboard read it.

> [!info] Handoff
> Status: **reopened** 🔶 — core module done (10/10), student requested a **logging & monitoring extension** (d6–d8, cross-platform). Cross-platform atlas created at `Resources/Cross-Platform-Logging-Monitoring.md`; local Packt clone chapters wired into M2/M8 plans. 3 topics + extension checkpoint remain; see Agenda below.

## ✅ Covered So Far
- Day 1 (2026-08-05): filesystem hierarchy, navigation/file ops, permissions (`chmod`/`chown`), reading files, pipes/redirects, users/sudo
- Day 3 (2026-08-07, deep half): sticky bit (`1777`, /tmp) & setuid (`4xxx`, passwd) with live control experiment; setgid; `s` vs `S`
  - Processes: `ps aux`/`ps -ef` columns, STAT states, `top` header (load, CPU states, memory), kernel threads
  - Signals: TERM/KILL/STOP/CONT/INT/HUP/PIPE + job control (`&`, `jobs`, `fg`, `bg`, `%n`) + `nice`/`renice`
  - System health: `free -h` (available), `df -h` (80/90 thresholds), `du`, `uname`, `uptime`, `nproc`
  - Quiz (2026-08-07): 6/8 — missed sticky-bit semantics & setuid-as-root confusion; both corrected + documented
- Day 4 (2026-08-12): systemd — unit anatomy (`[Unit]`/`[Service]`/`[Install]`), `systemctl status/cat/enable --now/stop/disable`, cgroup tree, restart policies (`Restart=on-failure`, `StartLimitBurst/Interval` crash-loop governor), `Type=simple` vs `Type=notify` + `TimeoutStartSec`, `trap` graceful shutdown, self-healing demo (mydemo) + clean removal, `journalctl -u -f`

## 📍 Where We Stopped
- **Reopened 2026-08-22** — student asked for deep logging & monitoring coverage across Linux, Unix and BSD (core DevOps strength). Topics d6–d8 added to the plan; nothing started yet.

## 🎯 Agenda for Next Session
- [x] Sticky bit (`t`) & setuid (`s`) — what they mean (Day 3)
- [x] Processes: `ps`, `top`, process states, `kill`/signals, background jobs (Day 3)
- [x] System health: `df`, `du`, `free`, `uname`, load average (Day 3)
- [x] systemd: `systemctl`, `journalctl`, writing your own `.service` file — incl. restart policies, crash-loop governor, `Type=simple` vs `notify` (Day 4)
- [x] `/proc` & `/sys`, mount points, inodes — read capacity/limits from `/proc`, not `top` (Day 4)
- [x] Boot sequence (conceptual) + package management (`apt`) — pin/audit packages, `unattended-upgrades` mindset (Day 4)
- [ ] **d6 — System logging**: journald persistence + `SystemMaxUse` + vacuum; rsyslog facilities/priorities/modules (`imudp`/`imtcp`/`omfwd`), remote forward rule; `/var/log/*` hierarchy per distro (`auth.log` vs `secure`); custom logrotate rule + dry-run; auditd rule for `/etc/passwd` + `ausearch`
- [ ] **d7 — Cross-platform logging**: FreeBSD/OpenBSD `syslog.conf` + `newsyslog.conf` + periodic scripts; Solaris SMF logs + `logadm` + fmd; AIX `errpt`/`alog`/srcmstr; HP-UX syslogd paths; centralized logging architecture (rsyslog → collector); study from [[Resources/Cross-Platform-Logging-Monitoring|the atlas]]
- [ ] **d8 — System monitoring**: enable sysstat (`sar` data collection via cron), generate load, read `sar -u/-d/-r/-n`; atop historical mode; vmstat/iostat interpretation (CPU states, I/O wait, await vs svctm); threshold alert script (disk/mem/load) via cron; cross-platform tool equivalence
- [ ] Extended checkpoint: explain newsyslog vs logrotate, SMF vs systemd units, errpt vs journald + demo the Linux labs live

## 🎓 Extension curriculum — Native Observability & System Logging (d6 focus)

> Spec'd by the student 2026-08-22. Gated: **no next unit until the challenge is passed.** Format per unit: Core Mechanics → Live Terminal Practice → Scenario-Based Troubleshooting.

| Unit | Scope | Gate challenge |
|---|---|---|
| U1 | Event flow: printk ring buffer, `/dev/kmsg`, journald (sockets, storage modes, forwarding), rsyslog paths · 📕 TLCL p225–226 (`journalctl -f` on mounts, syslog tip) · 📕 LinuxNotes p37 | Tier-1: one-line `journalctl` — errors from a service, JSON, time-window |
| U2 | Diagnostic subsystems: `auditd` (rules/ausearch), `psacct`/`acct` (`lastcomm`, `sa`), auth.log/wtmp/btmp trio, `dmesg` deep · 📕 Shack Q&A: `grep "Failed password" /var/log/auth.log` scenario + audit questions (p38) · 📕 LinuxNotes p37 (auditd `/var/log/audit/`) | Tier-3: reconstruct pre-reboot user activity from acct+audit artifacts |
| U3 | Native injection: `logger(1)` (-p/-t/--journald), `systemd-cat`, `/dev/kmsg` prefix writes, rate-limit suppression | Inject tagged message; prove landing in journal + dmesg |
| U4 | Extraction & filters: `-o json*` + `jq`, rsyslog templates/rulesets/RainerScript, drop-vs-stop ordering, logrotate pairing · 📕 Shack Q&A: custom-app logrotate stanza + log archival/truncate scenarios · 📕 TLCL ch15 | Tier-2 + Tier-4: route simulated DB error to own file; bad-sector capture with noise drop |
| U5 | Monitoring & perf analysis: sysstat/sar enablement, atop, vmstat/iostat reading, thresholds, health-check script · 📕 LinuxNotes p27 (vmstat/iostat/dstat worked examples) · 📕 TLCL ch10 p154 (process-tools table) | sar interpretation + working threshold alert script |

Cross-platform matrix (BSD/Solaris/AIX/HP-UX) stays in [[Resources/Cross-Platform-Logging-Monitoring|the atlas]] — no local boxes for hands-on.

**Final assessment**: student's 4-tier lab suite (Extraction → Native Injection → Forensic Diagnostics → Zero-Noise Filtering).
**References**: RHEL Sysadmin Guide *Configuring Logging* · ArchWiki systemd/Journal · kernel docs admin-guide (printk/dmesg) · man pages logger(1) journalctl(1) auditd(8) rsyslog.conf(5) acct(2).

### 📚 Reference-sourced enrichments (fetched 2026-08-22)
- **CORRECTION (U1)**: modern rsyslog **pulls** from the journal via `imjournal`; Arch default is `ForwardToSyslog=no` — push-via-forwarding only needed for non-journal-aware syslogds. Teach both paths explicitly.
- **U1**: `/proc/sys/kernel/printk` exposes 4 values (current/default/min/boot); console_loglevel gates what hits console. Journal size defaults: **10% of FS, soft cap 4 GiB, SystemKeepFree 15% respected jointly**; vacuum only trims rotated files → `journalctl --rotate --vacuum-size=...`. printk hot-path lockups w/ legacy consoles → rate-limited variants.
- **U2**: auth.log/wtmp/btmp unchanged; auditd stays pre-boot/tamper-evident source of truth.
- **U3**: `logger` **cannot emit kern facility — auto-converted to user** (only /dev/kmsg writes are truly kernel-origin); `--prio-prefix` `<134>` = facility×8+level (formalizes kmsg prefix math); `logger --journald` accepts raw field lines incl. `MESSAGE_ID`; `--sd-id/--sd-param` structured data; RFC5424 default since util-linux 2.26; `-n host` direct-to-collector.
- **U4**: extraction upgrades: `journalctl --grep` (preferred over piping to grep), `--catalog`, priority ranges `-p err..alert`, `--file system.journal` speed trick, `-D /mnt/var/log/journal` offline forensics, `strings` recovery without systemd; **journal namespaces** (`LogNamespace=ssh` + `journald@ssh.conf` + `journalctl --namespace ssh`) = per-unit size caps. RHEL ch23 confirms U4 scope: templates/rulesets/queues, imfile, mmjsonparse+@cee JSON parsing, TLS + RELP forwarding.

## 🧪 Checkpoint (pass to mark module done)
- [x] Create a user, give them sudo (`demo` created via `sudo useradd -m` + `sudo passwd`)
- [x] Write + enable a systemd service, verify via `journalctl` (mydemo, Day 4)
- [x] Explain every column of `ps aux`
- [x] Explain sticky bit vs setuid with examples (proven live)

## 🧪 Checkpoint extension — d6–d8 logging & monitoring (reopened topics)
- [ ] d6: journald persistent + `SystemMaxUse` + vacuum; rsyslog `auth.*` forward rule; custom logrotate rule + dry-run; auditd rule on `/etc/passwd` + `ausearch`
- [ ] d7: explain newsyslog vs logrotate, SMF vs systemd units, errpt vs journald — from [[Resources/Cross-Platform-Logging-Monitoring|the atlas]]
- [ ] d8: enable sysstat `sar`, read `sar -u/-d/-r/-n`, write threshold alert script via cron
- [ ] Tier-1 gate: one-line `journalctl` — errors from a service, JSON, time-window (pass before U2+)

## ❓ Open Questions
- (log anything unclear here)
