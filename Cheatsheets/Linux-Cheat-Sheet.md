---
tags: [cheatsheet, linux]
topic: linux
source-type: session-notes
---

# Linux Cheat Sheet

#cheatsheet #linux

> [!info] Use this
> Every command from my sessions, with description and argument breakdown. Link this note from any learning note with `[[Linux-Cheat-Sheet]]`.

---

## Navigation

| Command | Description |
|---------|-------------|
| `pwd` | **P**rint **W**orking **D**irectory — shows where you are in the filesystem |
| `ls` | List files/folders in the current directory |
| `ls -l` | Long format: permissions, owner, group, size, modification date |
| `ls -a` | Include hidden files (dotfiles) + `.` (this dir) + `..` (parent dir) |
| `ls -la` | Combine both: `-l` long format **and** `-a` all files |
| `ls -ld dir` | Show info about the directory **itself**, not its contents (`-d`) |
| `cd dir` | **C**hange **D**irectory — move into `dir` |
| `cd ..` | Move up one level (to parent directory) |
| `cd ~` | Go to home directory (`~` = shorthand for home) |
| `cd /` | Go to filesystem root |
| `cd .` | "This directory" — does nothing useful; useful in `./script.sh` form |

**Args explained**
- `-l` = long, `-a` = all, `-d` = directory itself, `-h` = human-readable sizes (`ls -lh`)
- Absolute path (`/home/vijay/x`) vs relative path (`./x`, `../x`)

---

## Creating / Managing Files

| Command | Description |
|---------|-------------|
| `mkdir dir` | **M**a**k**e **dir**ectory |
| `mkdir -p a/b/c` | `-p` = **p**arents — create nested folders in one command, no error if exists |
| `touch file` | Create an empty file (or update timestamp if it exists) |
| `cp file copy` | **C**o**p**y a file |
| `cp -r dir1 dir2` | `-r` = recursive — copy a folder and everything inside |
| `mv file newname` | **M**o**v**e or rename |
| `rm file` | **R**e**m**ove a file — **no undo, no trash!** |
| `rm -r dir` | `-r` = recursive — delete folder + everything inside |
| `rm -f file` | `-f` = force — never prompt, ignore missing files |
| `rm -rf dir` | ⚠️ DANGER: force-delete recursively. Double-check path before running |

---

## Reading Files

| Command | Description |
|---------|-------------|
| `cat file` | Print entire file to terminal |
| `less file` | Scroll through big files; `q`=quit, `/`=search |
| `head -5 file` | `-n`/`-5` = first 5 lines |
| `tail -5 file` | `-n`/`-5` = last 5 lines |
| `tail -f file` | `-f` = **follow** — keep showing new lines as they're added (live logs!) |
| `wc -l file` | **W**ord **c**ount; `-l` = count **l**ines |

---

## Searching & Filtering

| Command | Description |
|---------|-------------|
| `grep pattern file` | Print lines of `file` containing `pattern` |
| `grep -c pattern file` | `-c` = count — number of **lines** that match (0 means no match, not an error) |
| `grep -i pattern file` | `-i` = case-insensitive |
| `grep -v pattern file` | `-v` = invert — lines that do **NOT** match |
| `grep -r pattern dir` | `-r` = recursive — search all files in a folder |
| `grep -n pattern file` | `-n` = show line numbers |

**Trick:** `cat file \| grep pattern` and `grep pattern file` do the same thing. Prefer the short form.

---

## Permissions

| Command | Description |
|---------|-------------|
| `ls -l file` | Show permissions: `-rwxr-xr--` → type + owner/group/others |
| `chmod 755 file` | Change mode with numbers: **r=4, w=2, x=1**, add per set |
| `chmod u+x file` | Symbolic: `u`=owner, `g`=group, `o`=others, `a`=all; `+`=add, `-`=remove |
| `chown user:group file` | **Ch**ange **own**er (user:group); usually needs `sudo` |
| `chmod -R 700 dir` | `-R` = recursive — apply to everything inside |

**Number meanings:** `7`=rwx(4+2+1), `6`=rw-(4+2), `5`=r-x(4+1), `4`=r--, `0`=---
**Common:** `755` for scripts/binaries, `644` for normal files, `600` private, `700` private dirs

**Directory permissions matter for contents:**
- `r` = list names (`ls`), `w` = create/delete files inside, `x` = enter/traverse to files by name
- `000` = nothing accessible; `111` = can still `cat file` by name but `ls` fails

---

## Special Permissions (Sticky / Setuid / Setgid)

| Command / Value | Description |
|-----------------|-------------|
| `ls -ld /tmp` | See the `t` in `drwxrwxrwt` — the **sticky bit** |
| `chmod 1777 dir` | Sticky bit (`1`xxx): world-writable dir where users can **only delete their own files** (`/tmp` is the canonical example) |
| `chmod 4xxx file` | **Setuid** (`4`xxx): program runs with the **file owner's** privileges, not the caller's. `passwd` and `sudo` rely on this (`-rwsr-xr-x`) |
| `chmod 2xxx file` | **Setgid** (`2`xxx): file runs as the file's **group**; on a dir, new files **inherit the dir's group** |
| `chmod u+s` / `chmod u-s` | Symbolic form: add / remove setuid bit |
| `sudo chmod u-s /usr/bin/passwd` | ⚠️ Lab-proven: stripping setuid from `passwd` makes it fail (`Authentication token manipulation error`) — proof that setuid is *why* it works. Restore with `sudo chmod u+s` |
| `stat -c '%A %U' file` | Show permission string + owner (`%A` = perms, `%U` = owner) |
| `find / -perm -4000` | ⚠️ Hardening audit: list every **setuid** binary on the system |

**s vs S, t vs T:** lowercase = bit on **and** execute bit on (`s`/`t`); uppercase = bit on but **no execute** (`S`/`T`) — usually a misconfig.
**Number positions:** `4xxx` setuid, `2xxx` setgid, `1xxx` sticky (e.g. `/tmp` = `1777`).
**Why it matters in ops:** setuid binaries are privilege-escalation attack surface — modern systems prefer *capabilities* (`cap_net_raw`) over setuid.

---

## Users & sudo (multi-user labs)

| Command | Description |
|---------|-------------|
| `sudo useradd -m demo` | Create user `demo` with a home dir (`-m`) |
| `sudo passwd demo` | Set `demo`'s password |
| `sudo -u demo cmd` | Run `cmd` **as** `demo` (sudo switches user, no password needed) |
| `su -s /bin/bash nobody -c 'cmd'` | Switch to user via `su` — requires **their** password (fails for locked accounts like `nobody`) |
| `id` | Show uid/gid + groups of current user |
| `id -u` | Show just the numeric uid |

---

## Processes (`ps`, `top`, signals)

| Command | Description |
|---------|-------------|
| `ps aux` | All processes, BSD style: `USER PID %CPU %MEM VSZ RSS TTY STAT START TIME COMMAND` |
| `ps -ef` | All processes, SysV style: adds `PPID` (parent PID) + `STIME` |
| `ps -u vijay -o pid,stat,cmd` | Processes for a user with only chosen columns (`-o`) |
| `ps -o pid,stat,cmd -p 1234` | Specific PID |
| `top` | Realtime view; press `q` to quit |
| `top -u vijay -bn1` | Batch mode: one snapshot (`-b`), no live UI, `-n1` = 1 iteration |
| `top -bn1 \| head -12` | Snapshot + just the header lines (load, tasks, CPU%) |

**`ps aux` columns:** `USER` owner · `PID` · `%CPU` share of one core since start · `%MEM` RSS÷RAM · `VSZ` virtual (reserved) size KB · `RSS` physical RAM in use KB · `TTY` controlling terminal (`?` = daemon/kernel) · `STAT` state · `START` · `TIME` cumulative CPU · `COMMAND`

**STAT letters:** `R` running · `S` sleeping · `D` uninterruptible (stuck on disk I/O) · `T` stopped (Ctrl-Z / SIGSTOP) · `Z` zombie (dead, parent never cleaned up) · `I` idle kernel thread · `s` session leader · `l` multithreaded · `<` high priority · `N` low priority
**Kernel threads** (`[kworker]`, `[kthreadd]`) have VSZ/RSS = 0 — they live in kernel space, not user memory.

**Signals:**

| Command | Signal | Meaning |
|---------|--------|---------|
| `kill PID` | SIGTERM (15) | Polite terminate — process can catch it & clean up. **Always try first** |
| `kill -9 PID` | SIGKILL (9) | Force — uncatchable, no cleanup. Last resort |
| `kill -STOP PID` | SIGSTOP (19) | Freeze (uncatchable) |
| `kill -CONT PID` | SIGCONT (18) | Resume a stopped process |
| `kill %1` | — | Kill by **job** number |
| `kill -l` | — | List all 64 signals |
| `pkill name` | — | Kill by name (no PID needed) |
| Ctrl-C / Ctrl-Z | SIGINT (2) / SIGTSTP (20) | Interrupt / stop-to-background |
| `kill -HUP` | SIGHUP (1) | "Hangup" — also used to **reload config** (nginx, systemd) |

---

## Job Control & Priority

| Command | Description |
|---------|-------------|
| `cmd &` | Run in **background** (shell prints `[1] PID`) |
| `jobs` | List background/stopped jobs (`+` = current job) |
| `fg %1` | Bring job 1 to **foreground** |
| `bg %1` | Resume a stopped job in the **background** |
| `nice -n 10 cmd` | Start `cmd` with priority value 10 (range −20 high … +19 low, default 0) |
| `renice 5 PID` | Change priority of a **running** process — only root can go negative, and only for processes you own |

**Lower nice number = higher priority.** `yes > /dev/null &` is the classic way to burn one core for experiments.

---

## Pipes, Redirects & Chains

| Command | Description |
|---------|-------------|
| `cmd \| cmd2` | **Pipe** — feed first command's output into the second |
| `cmd > file` | Redirect output **into** a file (overwrites) |
| `cmd >> file` | Redirect output, **append** to file |
| `cmd1 && cmd2` | Run cmd2 **only if** cmd1 succeeds |
| `cmd1; cmd2` | Run both, regardless of success |
| `ls \| wc -l` | Count lines of `ls` output (file count) |
| `tail -f log \| grep ERROR` | Live-filter a log for errors |

---

## System Info & Health

| Command | Description |
|---------|-------------|
| `man cmd` | Show the manual for `cmd` (`q` to quit) — the original docs |
| `clear` (or `Ctrl+L`) | Clear the screen |
| `whoami` | Show current user |
| `id` | Show uid, gid, groups |
| `uname -a` | Kernel info: name, hostname, kernel version (`-r` = just release), arch |
| `uptime` | Uptime + users + load average (1/5/15 min) |
| `nproc` | Number of logical CPU cores |
| `lscpu` | Full CPU details (model, cores, threads) |
| `free -h` | RAM: total/used/free/shared/buff-cache/**available** — **trust `available`**, not `free` |
| `df -h` | Disk free per filesystem; `-h` = human-readable |
| `du -sh dir` | Disk usage of a dir; `-s` = summary, `-h` = human-readable |
| `du -xhd1 / \| sort -h \| tail` | Disk-hog hunt: biggest dirs at depth 1 (`-x` = stay on one filesystem) |
| `echo text` | Print text (great for `>` / `>>` demos) |

**Reading the health output like an engineer:**
- `free -h`: `buff/cache` is **reclaimable disk cache** — evicted on demand, so `available` is the real headroom. Heavy swap use + high load = "out of RAM, disks are the bottleneck".
- `df -h`: alert at **80%**, panic at **90%**. Check whether `/tmp` is its own filesystem or shares `/`.
- `uptime`: load average is the count of processes wanting CPU. **Load < cores = idle**, ≈ cores = saturated, > cores = queueing.

---

## systemd — Services (the recipe)

| Command | Description |
|---------|-------------|
| `systemctl status NAME` | Live state, PID, cgroup tree, recent logs |
| `systemctl cat NAME` | Show the unit file (`systemctl cat docker`) |
| `systemctl start/stop/restart NAME` | Lifecycle control |
| `systemctl enable --now NAME` | Start now **and** auto-start at boot |
| `systemctl disable NAME` | Remove auto-start (stop separately) |
| `systemctl daemon-reload` | ⚠️ Always run after editing a unit file |
| `systemctl list-units --type=service --state=running` | Running services |
| `systemctl show -p MainPID --value NAME` | Just the main PID |
| `systemctl reset-failed NAME` | Clear `failed` state after fixing a crash-loop |
| `journalctl -u NAME` | All logs for that unit |
| `journalctl -u NAME -f` | Follow logs live |
| `journalctl -n 20` | Last N log lines |
| `journalctl -b -1` | Logs from the previous boot |

**Unit file anatomy** (three sections):
- `[Unit]` — identity + ordering: `Description`, `After=` (order), `Wants=` (soft dep), `Requires=` (hard dep)
- `[Service]` — execution: `ExecStart`, `ExecReload`, `Restart=on-failure/always` (self-healing), `RestartSec=`, `TimeoutStartSec`, `Type=simple` (started when forked) vs `Type=notify` (waits for READY=1), `User=`
- `[Install]` — scheduling: `WantedBy=multi-user.target` (enabled = symlink into `.wants/`)

**Crash-loop governor:** `StartLimitBurst` (default 5) within `StartLimitIntervalSec` (default 10s) → unit goes `failed` and stops retrying. Set to `0` to disable.

---

## Virtual Filesystems (`/proc`, `/sys`) & Inodes

| Command | Description |
|---------|-------------|
| `/proc/<pid>/` | Per-process dossier (status, cmdline, fd/, maps, environ, limits, oom_score) |
| `/proc/self` | Your current process |
| `/proc/meminfo`, `/proc/loadavg`, `/proc/uptime`, `/proc/cmdline` | System stats / boot args |
| `ls -l /proc/PID/fd` | Open file descriptors — **0=stdin, 1=stdout, 2=stderr**, then one number per open file/socket |
| `cat /proc/PID/status` | State, PPid, Uid, VmRSS, Threads |
| `findmnt` | The whole mount tree (real fs vs `proc`/`sys`/`cgroup2`) |
| `df -i` | **Inode** usage — "how many files fit", separate from space |
| `ls -i file` | The file's inode number (its permanent ID) |
| `stat file` | Inode + `Links` (hard-link count) + device `major:minor` |
| `ln a b` | Hard link: a second name → **same inode**. Blocked across owners (`fs.protected_hardlinks`) |

**Mental model:** a file = *inode* (metadata + data pointers) + one or more *names*. `/proc` & `/sys` are kernel memory exposed as files — that's how monitoring tools read stats.
**Inode trap:** "No space left on device" with free space = **inodes exhausted** (millions of tiny files). Diagnose with `df -i`.

---

## Boot Sequence & Package Management (`apt`)

**Boot:** `UEFI → GRUB → kernel + initramfs → systemd (PID 1) → default.target → services`
- `cat /proc/cmdline` — kernel boot args: `root=UUID=…` (stable disk ID, not `/dev/sdX`), `ro` (read-only until fs check), `quiet splash`
- `systemd-analyze` / `systemd-analyze blame` — boot time per phase / slowest units
- Targets = modern runlevels: `graphical.target` requires `multi-user.target` (servers) → `basic.target` → `sysinit.target`

| Command | Description |
|---------|-------------|
| `apt update` | Refresh package index (what's *available*) |
| `apt upgrade` | Apply available upgrades |
| `apt install pkg` / `apt remove pkg` | Install / remove |
| `apt list --installed` / `--upgradable` | Installed / updateable packages |
| `apt-cache policy pkg` | Installed vs **Candidate** version + which repo (the `***` marks installed) |
| `dpkg -l` | Low-level package DB; `ii` = installed & healthy (`apt` is the dependency-solving front-end to `dpkg`) |
| `apt-get autoremove` | Clean orphaned dependencies |

**Repos live in** `/etc/apt/sources.list(.d)`: Ubuntu (`noble`, `noble-updates`, `noble-security`, `noble-backports`) + third-party (docker-ce, chrome, code). Same software can come from multiple repos (e.g. `docker-ce` vs Ubuntu's `docker.io`) — check `apt-cache policy` before trusting versions.

---

## Quick Reference (TL;DR)
```
pwd            where am I?
ls -la         everything, in detail
cd ~           home
mkdir -p a/b   nested dirs
touch f        new file
cp / mv / rm   copy / move / delete
cat / less     read
head / tail    first / last lines
grep -c        count matches
chmod 755      perms with numbers
chmod u+x      perms with letters
chmod 1777     sticky bit (shared tmp)
chmod u+s      setuid (run as owner)
ls -ld /tmp    see the sticky 't'
stat -c '%A'   perms as string
ps aux         all processes, detailed
top            live process monitor
ps -ef         all processes, parent PID
kill PID       SIGTERM (polite)
kill -9 PID    SIGKILL (force)
kill -STOP/CONT  pause / resume
pkill name     kill by name
cmd &          background
jobs / fg / bg job control
nice -n 10     lower priority
free -h        RAM (trust available)
df -h          disk free
df -i          inode usage
du -sh dir     dir size
uptime         load average
uname -a       kernel info
nproc          core count
systemctl status NAME   service state
systemctl enable --now  boot + start
systemctl daemon-reload after editing units
journalctl -u NAME -f   live service logs
cat /proc/loadavg       system stats
ls -l /proc/PID/fd      open files/sockets
apt update && apt upgrade  patch box
apt-cache policy pkg    version + repo source
dpkg -l                 package DB
| > >> &&      pipes, redirects, chains
man cmd        the manual
```
