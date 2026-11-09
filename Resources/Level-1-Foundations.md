# Level 1 — Study Materials

Curated PDFs, videos, and docs for **Level 1 — Foundations**. Read/watch alongside the interactive sessions. When you finish a topic, move on — don't get stuck trying to consume everything.

🐙 Packt companion-code repos for every Level-1 module: [[Packt-DevOps|Packt Dev resources]]

#devops #resources #level-1

[[00-Overview|← Back to Roadmap]]

---

## M1 — Linux

| Type          | Resource                                                                                                                                                                      |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 📕 PDF (book) | [*The Linux Command Line*](http://linuxcommand.org/tlcl.php) — William Shotts. Free, the classic. Chapters 1–11 cover filesystem, permissions, processes. **Logging-extension pages: ch10 p154 (process-tools incl. vmstat), ch15 p225–226 (`journalctl -f` + `/var/log/syslog` tail tips)**. [[TLCL-25.12A.pdf]] |
| 📕 PDF | *Linux Notes for Professionals* — [[LinuxNotesForProfessionals.pdf]], Stack-Overflow-curated command reference (searchable, great when you forget a flag). **Logging-extension pages: p27 (vmstat/iostat/dstat examples), p37 (`journalctl -xe/-f/-t sshd`, `-p err -S yesterday`, auditd log path) — p37 is the Tier-1 challenge pattern** |
| 📕 PDF (Q&A) | *DevOps Shack — 250 Linux Scenario Based Q&A* — [[DevOps Shack _ 250 Linux Scenario Based Q and A (1).pdf]] — scenario drill for the checkpoint (the M1 session quiz came from this style of question). **Log-ops scenarios for U2/U4: auth.log brute-force greps, custom-app logrotate stanza, log archival/truncation** |
| 🎥 Video      | NetworkChuck — *Linux for Hackers / Beginners* playlist (YouTube). Fast-paced, hands-on. https://www.youtube.com/watch?v=VbEx7B_PTOE&list=PLIhvC56v63IJIujb5cyE13oLuyORZpdkL  |
| 🎥 Video      | *Linux Journey* — https://linuxjourney.com (interactive text + quiz, great for gaps)                                                                                          |
| 📖 Docs       | `man <command>` for everything; [Ubuntu docs](https://help.ubuntu.com)                                                                                                        |
| 🐙 GitHub     | [bregman-arie/devops-resources → `resources/linux.md`](https://github.com/bregman-arie/devops-resources/blob/master/resources/linux.md) — curated Linux books/courses/videos index (dig-deeper list) |
| 🎧 Audio      | Late Night Linux podcast — stay current                                                                                                                                       |
![[Pasted image 20260808030930.png]]
## M2 — Bash Scripting

| Type | Resource |
|------|----------|
| 📕 PDF | [Bash Guide](https://mywiki.wooledge.org/BashGuide) — the "proper" guide, reads like a book, print-friendly |
| 📕 PDF | *Bash Notes for Professionals* — [[BashNotesForProfessionals.pdf]], Stack-Overflow-curated bash reference (searchable recipes) |
| 📖 Docs | [GNU Bash Reference Manual](https://www.gnu.org/software/bash/manual/) — the authority |
| 🎥 Video | *Bash Scripting Full Course* — LearnLinuxTV (YouTube) |
| 🎯 Practice | https://www.shellcheck.net — paste your scripts, learn from the warnings |

## M3 — Text Processing Tools

| Type | Resource |
|------|----------|
| 📖 Docs | GNU manuals: [`grep`](https://www.gnu.org/software/grep/manual/), [`sed`](https://www.gnu.org/software/sed/manual/), [`awk`](https://www.gnu.org/software/gawk/manual/) |
| 🎥 Video | *Learn sed* and *Learn awk* — Tutorialspoint / freeCodeCamp (YouTube) |
| 🎯 Practice | Regular-Expression practice: https://regex101.com, https://regexone.com |
| 📕 PDF | *sed & awk* (O'Reilly, 2nd ed) — the definitive book if you want PDF depth |

## M4 — Git & GitHub

| Type | Resource |
|------|----------|
| 📕 PDF (book) | [*Pro Git*](https://git-scm.com/book/en/v2) — free, official, reads like a novel. Chapters 3 (branching), 7 (rebase/reset) are essential. |
| 📕 PDF | *Git Notes for Professionals* — [[GitNotesForProfessionals.pdf]], Stack-Overflow-curated Git reference (searchable) |
| 🎥 Video | *Git & GitHub Full Course* — freeCodeCamp (YouTube) |
| 📖 Docs | https://git-scm.com/doc · [GitHub docs](https://docs.github.com) |
| 🎯 Practice | https://learngitbranching.js.org — interactive, the best Git trainer |

## M5 — Markdown & YAML

| Type | Resource |
|------|----------|
| 📖 Docs | [Markdown guide](https://www.markdownguide.org) · [YAML spec](https://yaml.org) |
| 🎯 Practice | YAML one-page intro: https://learnxinyminutes.com/docs/yaml/ |
| 📖 Docs | [Official YAML spec (PDF)](https://yaml.org/spec/1.2.2/) — skim, don't read cover-to-cover |
| 🎥 Video | *YAML in 10 minutes* — TechWorld with Nana (YouTube) |

## M6 — Networking

| Type | Resource |
|------|----------|
| 📕 Book | *Computer Networking: A Top-Down Approach* (Kurose & Ross) — the standard. Read chapters on HTTP/DNS/TCP. |
| 🎥 Video | *Networking Fundamentals* — Professor Messer (YouTube, comptia-style, thorough) |
| 📖 Docs | [RFC 791 (IP)](https://www.rfc-editor.org/rfc/rfc791), [RFC 793 (TCP)](https://www.rfc-editor.org/rfc/rfc793) — skim for the model |
| 🎯 Practice | Subnetting drills: https://subnettingpractice.com |
| 📖 Docs | [`curl` docs](https://curl.se/docs/) — the tool you'll use daily |

## M7 — Security Essentials

| Type | Resource |
|------|----------|
| 📖 Docs | [OpenSSH manual](https://www.openssh.com/manual.html) — keys, config, forwarding |
| 🎥 Video | *SSH essentials* — freeCodeCamp / NetworkChuck |
| 📖 Docs | [Let's Encrypt / TLS how it works](https://letsencrypt.org/how-it-works/) — clear TLS primer |
| 📕 Book | *Practical Cryptography in Python* — if you want the math behind TLS |

---

> [!tip] How to use this
> Pick **one PDF + one video** per module. Watch the video to *see* it, read the PDF to *deepen* it, then do the lab. Depth, not breadth.

[[00-Overview|← Back to Roadmap]]
