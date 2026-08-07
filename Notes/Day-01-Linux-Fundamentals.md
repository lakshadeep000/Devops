---
tags: [daily-log, linux]
date: 2026-08-05
day: 1
phase: 1
---

# Day 1 — Linux Fundamentals

#daily-log #linux

> [!info] Reference
> All commands with argument breakdowns: [[Cheatsheets/Linux-Cheat-Sheet|Linux Cheat Sheet]]

## 📖 What I Learned Today

### The Filesystem
- Everything is a file. Directories, devices, configs — all files.
- Filesystem layout:
  - `/` — root of everything
  - `/home` — user home directories (`/home/vijay`)
  - `/etc` — system configuration files
  - `/var` — variable data (logs, queues, mail)
  - `/tmp` — temporary files (cleared on reboot)
  - `/usr` — user-installed programs
  - `/bin` / `/sbin` — essential binaries
- Paths: absolute (`/home/vijay/file`) vs relative (`./file`, `../file`, `~`)

### Navigation & File Operations
```bash
pwd                     # print working directory
ls -la                  # list all, long format (show hidden, permissions, sizes)
#   -l shows: permissions, owner, group, size, MODIFICATION date (not creation!)
#   -a shows hidden files (dotfiles) + '.' (this dir) and '..' (parent dir)
cd /etc                 # change directory
cd ..                   # move up one level
mkdir -p projects/2026  # create nested dirs
touch notes.txt         # create empty file
cp notes.txt copy.txt   # copy
mv copy.txt renamed.txt # move / rename
rm renamed.txt          # remove (careful — no trash!)
rm -r dir/              # remove directory recursively
```

### File Permissions
```bash
ls -l                   # shows e.g.  -rw-r--r-- 1 vijay vijay
#                    types:  - file, d dir, l link
#                    owner group others: r=read w=write x=execute
chmod 755 script.sh     # owner rwx, group r-x, others r-x
chmod u+x script.sh     # add execute to user only
chmod 644 file.txt      # typical for files
chown vijay:dev file    # change owner:group
```
- Numbers: r=4, w=2, x=1 → 7=rwx, 6=rw-, 5=r-x, 4=r--, 0=---
- **Directory permissions apply to contents**: `r`=list names, `w`=create/delete inside, `x`=enter/traverse to files by name
- `chmod 000` dir → cannot list or access anything inside; `chmod 111` (x only) → can still `cat file` by name but `ls` fails
- Security logic: `chmod 700` on `/home/vijay` keeps your home private from other users

### Reading Files
```bash
cat file.txt     # print whole file
less file.txt    # scroll through large files (q to quit)
head -20 file    # first 20 lines
tail -20 file    # last 20 lines (tail -f to follow logs)
wc -l file.txt   # count lines
```

### Searching, Pipes & Redirects
- `grep pattern file` — print matching lines; `grep -c` counts **lines** (0 = no match, not an error)
- `cmd | cmd2` — pipe output into next command (`ls | wc -l` = count files)
- `cmd > file` — save output to file (overwrite); `>>` = append
- `cmd1 && cmd2` — run cmd2 only if cmd1 succeeds

### Users & Sudo
- Regular user vs root (`#` prompt = root)
- `sudo` = do a single command as root (least privilege)
- `whoami` shows current user; `/etc/passwd` lists users

## 🛠️ What I Did (Hands-On)
- [x] Explored filesystem: `cd /`, `ls`, saw root structure (bin, etc, home, var, tmp)
- [x] Compared `ls` vs `ls -la` — learned `-la` adds hidden files, permissions, owner, size, mod date
- [x] Created `~/practice` with `mkdir`/`touch`, copied/moved files with `cp`/`mv`
- [x] Hit the `rm` on directory error → fixed with `rm -r` (lesson: Linux refuses dangerous ops by default)
- [x] `mkdir -p a/b/c` — creates nested folder chain in one command
- [x] Permissions experiment on `~/practice/locked`: `000` → nothing accessible; `111` → `cat file` works by name, `ls` fails; proves dir perms apply to contents
- [x] `ls -la > listing.txt`, `cat listing.txt`, `ls -la | wc -l` (6 lines incl. `total` header), `cat file | grep -c .` (pipe-only line count)
- [ ] Read `/var/log/syslog` (or system log) with `less` and `tail -f` in a second terminal

## ❌ Misses & Corrections (Session)
1. **`ls -l` shows modification date, not creation date** — Linux rarely tracks creation time
2. **Directory permissions DO apply to contents** — `x` on a dir = "enter/traverse"; without it, files inside are unreachable. (Initial thought: "may not apply inside" — wrong.)
3. **Skipped testing `ls -la locked` at `111`** — that's where the "listing fails but by-name access works" split is visible
4. **`grep -c` returning `0`** — that's a valid result meaning "no matching lines", not a command failure. The word "practice" isn't in `listing.txt` because `ls -la` lists `.`/`..` names
5. **Line count via pipe** — `cat file | grep -c .` counts non-empty lines; matches `wc -l` when no blank lines
6. **Quiz Q4 ❌ — directory vs file permissions** — applied file-logic to a dir: for a dir, `ls` needs `r`, by-name `cat` needs only `x`. Same trap as miss #2
7. **Quiz Q5 ⚠️ — `grep -c` ≠ "is file empty"** — it only counts lines matching the pattern; a 0 result doesn't prove the file has no content

## 🏆 Quiz Result
Score **3/5** on Day 1 review. Got right: `ls -la` parts (partially), `mkdir -p`, `chmod` letters+numbers. Missed: hidden files in `ls -la`, directory vs file permission semantics, `grep -c` meaning.

## 🔗 Commands to Remember
```bash
ls -la && pwd          # chain commands with &&
df -h                  # disk usage, human-readable
du -sh /home           # size of a folder
clear                  # clean the screen (Ctrl+L)
man ls                 # read the manual (q to quit)
```

## 📝 Notes to Self / Questions
- ✅ `/home` separate partition → we can mount a storage device at `/home` (a mount point) to separate user files from system files. Survives OS reinstall/corruption; one partition full doesn't stall the other
- ✅ `rm -rf` → recursively deletes the folder and its contents, no prompts, no undo. Danger: typos (`rm -rf / home`, empty `$var`) — always double-check paths
- Question: what do sticky bits (`t`) and setuid (`s`) in permissions mean? → tomorrow's rabbit hole

## ✅ Checklist
- [x] Reviewed today's topic
- [x] Practiced hands-on
- [x] Logged notes
- [x] Misses & corrections documented
- [x] [[Cheatsheets/Linux-Cheat-Sheet|Linux Cheat Sheet]] created + linked
