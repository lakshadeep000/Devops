---
module: M1
level: 1
name: Linux
status: inprogress
last-updated: 2026-08-07
---

# 🗂️ Session — L1-M1 Linux

> **Shared memory** for this module's chat window. The tutor updates this at the end of every session; the [[Sessions/_MASTER|master window]] and the dashboard read it.

> [!info] Handoff
> Status: **in progress** · Level 1 — Foundations
> Deep half part 1 (special perms, processes, health) done. Next: **systemd**.

## ✅ Covered So Far
- Day 1 (2026-08-05): filesystem hierarchy, navigation/file ops, permissions (`chmod`/`chown`), reading files, pipes/redirects, users/sudo
- Day 3 (2026-08-07, deep half): sticky bit (`1777`, /tmp) & setuid (`4xxx`, passwd) with live control experiment; setgid; `s` vs `S`
  - Processes: `ps aux`/`ps -ef` columns, STAT states, `top` header (load, CPU states, memory), kernel threads
  - Signals: TERM/KILL/STOP/CONT/INT/HUP/PIPE + job control (`&`, `jobs`, `fg`, `bg`, `%n`) + `nice`/`renice`
  - System health: `free -h` (available), `df -h` (80/90 thresholds), `du`, `uname`, `uptime`, `nproc`
  - Quiz (2026-08-07): 6/8 — missed sticky-bit semantics & setuid-as-root confusion; both corrected + documented

## 📍 Where We Stopped
- **Next: systemd** — `systemctl`, `journalctl`, writing + enabling your own `.service` file (checkpoint #2)

## 🎯 Agenda for Next Session
- [x] Sticky bit (`t`) & setuid (`s`) — what they mean (Day 3)
- [x] Processes: `ps`, `top`, process states, `kill`/signals, background jobs (Day 3)
- [x] System health: `df`, `du`, `free`, `uname`, load average (Day 3)
- [ ] systemd: `systemctl`, `journalctl`, writing your own `.service` file — with `Restart=on-failure`, `User=`, `TimeoutSec` (production hardening, per `Plan/01` 🛡️)
- [ ] `/proc` & `/sys`, mount points, inodes — read capacity/limits from `/proc`, not `top`
- [ ] Boot sequence (conceptual) + package management (`apt`) — pin/audit packages, `unattended-upgrades` mindset

## 🧪 Checkpoint (pass to mark module done)
- [x] Create a user, give them sudo (`demo` created via `sudo useradd -m` + `sudo passwd`)
- [ ] Write + enable a systemd service, verify via `journalctl`
- [x] Explain every column of `ps aux`
- [x] Explain sticky bit vs setuid with examples (proven live)

## ❓ Open Questions
- (log anything unclear here)
