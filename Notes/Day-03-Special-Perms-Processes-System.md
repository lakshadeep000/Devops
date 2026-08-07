---
tags: [daily-log, linux]
date: 2026-08-07
day: 3
phase: 1
module: M1
topic: Special Permissions, Processes & System Health
status: in-progress
---

# Day 3 — Special Permissions, Processes & System Health

#daily-log #linux

> [!info] Handoff
> Previous: [[Day-01-Linux-Fundamentals]] · Reference: [[Cheatsheets/Linux-Cheat-Sheet|Linux Cheat Sheet]]
> Part of M1 **deep half** (the half Day 1 skipped).

## 📖 What I Learned (Concept)

### Special permissions — the `s` and `t`
- **Sticky bit** (`t`, mode `1777`): world-writable dir, but you can only **delete/rename your own files**. Root is exempt. `/tmp` is `drwxrwxrwt`.
- **Setuid** (`s`, mode `4xxx`): a program runs with the **file owner's** privileges, not the caller's. `/usr/bin/passwd` is `-rwsr-xr-x` (owner = root) — that's the *only* reason a normal user can write `/etc/shadow`.
- **Setgid** (`s` on group, `2xxx`): on a dir, new files **inherit the dir's group** — shared team spaces.
- **Lowercase vs uppercase:** `s`/`t` = bit on AND execute on; `S`/`T` = bit on but NO execute (misconfig).
- **Ops relevance:** setuid binaries = privilege-escalation attack surface. Audit with `find / -perm -4000`. Modern systems prefer Linux *capabilities* (`cap_net_raw`) over setuid.

### Processes
- `ps aux` columns: `USER PID %CPU %MEM VSZ RSS TTY STAT START TIME COMMAND`
  - `RSS` = physical RAM in use; `VSZ` = reserved address space (may be swapped/untouched)
  - `%CPU` = share of one core *since start* (realtime = `top`)
  - `?` TTY = daemon/kernel process
  - `[bracketed]` = kernel thread (VSZ/RSS = 0, lives in kernel space)
- **STAT letters:** `R` running · `S` sleeping · `D` uninterruptible I/O wait · `T` stopped · `Z` zombie · `I` idle kthread · `s` session leader · `l` multithreaded · `<` high priority
- `top` header: load average (1/5/15 min), tasks, CPU states (`us sy ni id wa hi si st`), memory.
  - `wa` high = slow disk, not fast CPU. `st` high in a VM = noisy neighbor (steal).

### Signals — the ones that matter
| Signal | # | Meaning |
|--------|---|---------|
| SIGTERM | 15 | polite kill (default for `kill`), catchable → cleanup |
| SIGKILL | 9 | force, uncatchable, no cleanup — last resort |
| SIGINT | 2 | Ctrl-C |
| SIGSTOP | 19 | freeze (uncatchable) |
| SIGCONT | 18 | resume |
| SIGTSTP | 20 | Ctrl-Z |
| SIGHUP | 1 | hangup / config reload |
| SIGPIPE | 13 | write to closed pipe (`yes | head` stops via this) |

- **Job control:** `cmd &`, `jobs`, `fg %1`, `bg %1`, `kill %1`
- **Priority:** `nice -n 10` (range −20 … +19), `renice` on a running process. Lower number = higher priority. Only root can go negative; you can only renice processes you own.

### System health
- `free -h`: trust **`available`** — buff/cache is *reclaimable*, evicted on demand. Swap used 0B = healthy.
- `df -h`: alert at 80%, panic at 90%. `/tmp` shared `/` filesystem here (no separate mount).
- `uptime`/`nproc`: load < cores = idle, ≈ cores = saturated, > cores = queueing.

## 🛠️ What I Did (Hands-On)
1. **Sticky/setuid proof:** ran `passwd` as `demo` (a real user) with the setuid bit → password changed. Stripped the bit (`sudo chmod u-s /usr/bin/passwd`) → `passwd: Authentication token manipulation error` → restored.
   - Tried `su -s /bin/bash nobody` first → "Authentication failure" (`su` needs target's password; `nobody` is locked). Used `sudo -u` instead.
2. **Processes:** `ps aux` vs `ps -ef`; `top -bn1`; found `yes > /dev/null &` (PID 13872) pegging one core at 100%.
3. **Signals:** SIGSTOP → STAT `T`; SIGCONT → resumed; SIGTERM → gone. Full fg/Ctrl-Z/bg/kill %1 cycle. `nice -n 10 sleep 30` → NI 10 in ps.
4. **Health:** `free -h` (26Gi available), `df -h /` (52%), `du -sh` vault (6.6M), `uname -a`, `uptime`, `nproc` (12 cores).
5. **renice lesson:** `renice 5 13275` → "Operation not permitted" because that `sleep 3600` is **root-owned** — you can't renice what you don't own.

## ❌ Misses & Corrections (from quiz)
- [x] ✗ Sticky bit ≠ "global write variable" — it protects **ownership of files in a shared dir** (only owner/root deletes).
- [x] ✗ `passwd` works via **setuid**, not because "my account is root" — proven by the control experiment.
- [x] ✗ Forgot `s` vs `S`: lowercase = bit + execute on, uppercase = bit but no execute.
- [x] ✓ Remembered: RSS vs VSZ, STAT letters (T/D/Z/Ssl), TERM vs KILL, `available` vs `free`, load vs cores.

## 🔗 Commands / Snippets
```bash
ls -ld /tmp                                   # sticky bit
stat -c '%A %U' /usr/bin/passwd               # perms + owner
sudo -u demo /usr/bin/passwd                  # run passwd AS demo
sudo chmod u-s /usr/bin/passwd                # strip setuid → breaks password change
ps aux | head -20                             # all processes
top -bn1 | head -12                           # one live snapshot
yes > /dev/null &                             # burn a core for experiments
kill -STOP PID ; kill -CONT PID               # freeze / resume
kill -TERM PID                                # polite kill
find / -perm -4000                            # audit setuid binaries (harden)
free -h ; df -h ; du -sh dir ; uptime ; nproc # health check
sudo du -xhd1 / | sort -h | tail              # disk-hog hunt
```

## 📝 Notes to Self / Questions
- Next: **systemd** — `systemctl`, `journalctl`, writing my own `.service` (checkpoint #2).
- Still to come in M1: `/proc` & `/sys`, inodes/mounts, boot sequence, `apt`.
- Revisit: `htop` (friendlier than `top`), zombie processes (make one on purpose).

## ✅ Checklist
- [x] Reviewed previous session's notes
- [x] Learned today's topic
- [x] Practiced hands-on
- [x] Logged notes + misses
- [ ] 🎯 Checkpoint: sticky/setuid explained ✓ · `ps aux` columns explained ✓ · user+sudo + systemd service + journalctl (pending)
