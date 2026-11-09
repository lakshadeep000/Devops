---
tags: [daily-log, linux]
date: 2026-08-12
day: 4
phase: 1
module: M1
topic: systemd, /proc & /sys, Boot Sequence, apt
status: completed
---

# Day 4 — systemd, /proc, Boot & Package Management

#daily-log #linux

> [!info] Handoff
> Previous: [[Day-03-Special-Perms-Processes-System]] · Reference: [[Cheatsheets/Linux-Cheat-Sheet|Linux Cheat Sheet]]
> **M1 now fully complete** — all agenda items + 4/4 checkpoints passed.

## 📖 What I Learned (Concept)

### systemd — the service recipe
- Unit files have 3 sections:
  - `[Unit]` — identity + ordering: `After=` (order), `Wants=` (soft dep), `Requires=` (hard dep)
  - `[Service]` — execution: `ExecStart`, `Restart=`, `RestartSec`, `Type=simple` vs `notify`, `TimeoutStartSec`
  - `[Install]` — `WantedBy=multi-user.target` = enable symlink → auto-start at boot
- **Self-healing:** `Restart=on-failure` — kill the main PID (even `kill -9`), systemd relaunches it. Proven live: log showed `Main process exited, code=killed, status=9/KILL` → `Scheduled restart job, restart counter is at 1.` → new PID.
- **Crash-loop governor:** `StartLimitBurst` (default 5) / `StartLimitIntervalSec` (default 10s) — exceed → unit goes `failed`, stops trying. `systemctl reset-failed` clears it.
- **`Type` gotcha:** `simple` = "started" the moment the process forks (started ≠ ready — hence health checks); `notify` = waits for `READY=1`, guarded by `TimeoutStartSec` (default 90s).
- `daemon-reload` after editing any unit file. Clean removal = stop → disable → rm file → daemon-reload.

### File descriptors
- fd = number the kernel uses to track an open resource. **0=stdin, 1=stdout, 2=stderr**; each open file/socket gets the next free number.
- `ls -l /proc/PID/fd` shows everything a process has open (bash reserves fd 255 for its terminal).
- Real-world: "Too many open files" = fd limit (`ulimit -n`) hit; sockets show up as `socket:[inode]`.

### Virtual filesystems & inodes
- `/proc/<pid>/` = per-process dossier (status, cmdline, fd/, maps, environ, limits, oom_score); `/proc/self` = current process; `/proc/meminfo|loadavg|uptime|cmdline` = system stats.
- Kernel enforces ownership even in `/proc` (permission denied on other users' `cwd/exe/root` symlinks).
- **Inode = a file's permanent ID** (metadata + data pointers). A file = inode + name(s). Hard link = second name → same inode (`Links: 2`).
- `df -i` = inode usage; **"no space" with free space = inodes exhausted** (millions of tiny files).
- `fs.protected_hardlinks` blocks linking files you don't own — a kernel security feature.

### Boot sequence
`UEFI → GRUB → kernel + initramfs → systemd (PID 1) → default.target → services`
- `/proc/cmdline`: `root=UUID=…` (stable disk ID, not /dev/sdX), `ro` (read-only first), `quiet splash`.
- `systemd-analyze blame` shows slowest units (mine: plymouth-quit-wait 20.5s = desktop splash).
- Targets = modern runlevels: `graphical.target` → `multi-user.target` (servers) → `basic.target` → `sysinit.target`.

### apt
- `apt` = dependency-resolving front-end over `dpkg` (raw installer). `update` refreshes index, `upgrade` applies.
- `apt-cache policy pkg` = installed vs candidate version + which repo (the `***` marks installed).
- Repos: `noble(-updates/-security/-backports)` + third-party. Same software can exist in multiple repos (docker-ce official vs Ubuntu's `docker.io`) — always check `policy`.

## 🛠️ What I Did (Hands-On)
1. **myDemo service:** wrote `/usr/local/bin/mydemo.sh` (while-true ticker with `trap` for graceful SIGTERM shutdown) + `/etc/systemd/system/mydemo.service`. `enable --now` → saw it tick in `journalctl -f`. `restart` → trap caught SIGTERM → clean. `kill -9` → `status=9/KILL`, `Restart=on-failure` relaunched it with a new PID. Cleaned up properly (stop, disable, rm, daemon-reload).
2. **fd experiment:** `exec 5> /tmp/fdtest.txt` → fd 5 → file appeared in `ls -l /proc/$$/fd`; `>&-` closed it; `cat` read back `hello`.
3. **Inodes:** `ln ~/orig.txt /tmp/orig-link.txt` → same inode `22704571`, `Links: 2`. (First attempt on `/etc/hostname` failed — `protected_hardlinks`.)
4. **Boot:** read `/proc/cmdline`, `systemd-analyze`, targets list.
5. **apt:** installed/removed `figlet`, `apt-cache policy figlet` showed installed (***) = candidate, `dpkg -l` states.

## ❌ Misses & Corrections
- [x] First hard-link attempt failed — didn't know `fs.protected_hardlinks`; that's the kernel refusing links to files you don't own.
- [x] The `sudo kill -9 <that-pid>` syntax error — paste-then-edit; the journal was the real evidence anyway.

## 🔗 Commands / Snippets
```bash
systemctl status mydemo --no-pager
systemctl cat docker --no-pager
systemctl enable --now mydemo
journalctl -u mydemo -f
ls -l /proc/$$/fd
exec 5> /tmp/fdtest.txt; echo hi >&5; exec 5>&-
ln ~/orig.txt /tmp/link.txt; ls -i ~/orig.txt /tmp/link.txt
df -i /; df -h /
cat /proc/cmdline; systemd-analyze blame
apt list --upgradable; apt-cache policy figlet
```

## 📝 Notes to Self / Questions
- Next module: **M2 — Bash Scripting** (level 1 continues).
- Revisit at M3: `lsof` as friendlier fd viewer; `ncdu` for interactive disk hunt.

## ✅ Checklist
- [x] Learned today's topic
- [x] Practiced hands-on
- [x] Logged notes + misses
- [x] 🎯 **Checkpoint 4/4 passed — M1 module complete**
