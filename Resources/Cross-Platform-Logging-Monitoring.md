# 🌍 Cross-Platform Logging & Monitoring Atlas

BSD / Solaris / AIX / HP-UX logging & monitoring — the config-path matrix for M1 d7 (cross-platform logging) and d8 (monitoring).

> No local boxes for hands-on on Solaris/AIX/HP-UX — study this as reference, then map each concept back to Linux systemd/journald/rsyslog you *do* have. [[Sessions/M1-Linux|M1 session]]

#devops #resources #level-1 #logging #monitoring #cross-platform

[[01-Level-1-Foundations|← Level 1]] · [[Resources/Packt-DevOps|Packt example farms]]

---

## 1. Logging systems by platform

| Platform | Default syslog daemon | Config path | Rotation tool | Rotation config | Notes |
|---|---|---|---|---|---|
| **Linux (systemd)** | journald + rsyslog | `/etc/systemd/journald.conf`, `/etc/rsyslog.conf` | `logrotate` | `/etc/logrotate.d/*` | Persistent journal in `/var/log/journal/`; `imjournal` pulls from journald |
| **Linux (syslog-ng)** | syslog-ng | `/etc/syslog-ng/syslog-ng.conf` | `logrotate` | `/etc/logrotate.d/*` | Pattern-based filtering, correlation rules |
| **FreeBSD** | BSD syslogd | `/etc/syslog.conf` | `newsyslog` | `/etc/newsyslog.conf` | `/etc/periodic/*` daily/weekly/monthly scripts rotate + report |
| **OpenBSD** | BSD syslogd | `/etc/syslog.conf` | `newsyslog` | `/etc/newsyslog.conf` | `/etc/daily`, `/etc/weekly` scripts |
| **Solaris** | syslogd + SMF | `/etc/syslog.conf`, `/var/svc/log/*` | `logadm` | `/etc/logadm.conf` | SMF manifests own service logs; `fmd` (fault management daemon) logs hardware faults |
| **AIX** | syslogd + errpt | `/etc/syslog.conf` | (manual / cron) | N/A built-in | `errpt`/`errdaemon` = pre-boot/tamper-evident; `alog` for boot/install logs; `srcmstr` |
| **HP-UX** | syslogd | `/etc/syslog.conf` | (manual) | N/A built-in | `cstm` hardware analysis; `/var/opt/log/` common path |

### Facility & priority (shared across all)
Syslog severity (RFC 5424): 0=emerg … 7=debug. Facilities: kern(0), user(1), mail(2), daemon(3), auth(4/10), cron(9), local0–7. Same scale on every platform — severity semantics transfer, paths don't.

---

## 2. Log file locations by platform

| Platform | Key log paths |
|---|---|
| **Linux** | `/var/log/syslog` (Debian/Ubuntu) or `/var/log/messages` (RHEL); `/var/log/auth.log` or `/var/log/secure`; `/var/log/kern.log`; `/var/log/audit/audit.log`; `/var/log/journal/` (journald) |
| **FreeBSD** | `/var/log/messages`, `/var/log/security`, `/var/log/auth.log`, `/var/log/maillog` |
| **OpenBSD** | `/var/log/messages`, `/var/log/authlog`, `/var/log/maillog` |
| **Solaris** | `/var/adm/messages`, `/var/adm/sulog`, `/var/adm/cron/log`, `/var/svc/log/*` |
| **AIX** | `/var/adm/ras/errlog` (errpt), `/var/adm/wtmp`, `/var/adm/sulog`, `alog` output |
| **HP-UX** | `/var/adm/syslog/syslog.log`, `/var/opt/log/` |

---

## 3. Monitoring tools by platform

| Platform | Native tools | Package-based | Unique / standout |
|---|---|---|---|
| **Linux** | `top`, `vmstat`, `iostat`, `uptime`, `w`, `dmesg`, `/proc/*` | `sysstat` (`sar`, `iostat`, `mpstat`, `sadf`), `atop`, `dstat`/`dool`, `nmon`, `collectl`, `monit` | `/proc/stat`, `/proc/diskstats`, `/proc/net/dev`, `/proc/loadavg`; console_loglevel via `/proc/sys/kernel/printk` |
| **FreeBSD** | `top`, `vmstat`, `iostat`, `systat`, `netstat`, `sockstat` | `gstat` (ZFS), `dtrace` | `systat` multi-view; `zpool iostat`; dtrace probes |
| **OpenBSD** | `top`, `vmstat`, `iostat`, `netstat`, `systat` | `dtrace` (limited) | `systat` |
| **Solaris** | `prstat`, `mpstat`, `iostat`, `vmstat`, `sar`, `dtrace`, `truss`, `prtdiag`, `fmd` | — | DTrace (invented here); SMF health (`svcs -x`); `kstat` data model |
| **AIX** | `topas`, `sar`, `iostat`, `vmstat`, `entstat`, `svmon` | `nmon`, `perfpmr` | `errpt`, `netpmon`, `filemon`, `lslk` |
| **HP-UX** | `glance`, `sar`, `iostat`, `vmstat`, `cstm` | `tusc` | `cstm` hardware analysis |

---

## 4. Concept equivalence map (what you know on Linux → what it is elsewhere)

| Linux concept | FreeBSD | OpenBSD | Solaris | AIX | HP-UX |
|---|---|---|---|---|---|
| journald persistence | syslogd + /var/log/messages | syslogd | syslogd + SMF | syslogd + errpt | syslogd |
| logrotate | newsyslog | newsyslog | logadm | (manual cron) | (manual) |
| systemd units | rc scripts + periodic | rc scripts | SMF manifests (`svcs`) | SRC (`srcmstr`) | rc scripts |
| sar / sysstat | — | — | `sar` (native) | `sar` (native) | `sar` (native) |
| dmesg / ring buffer | `dmesg` | `dmesg` | `dmesg` / `prtdiag` | `errpt` | — |
| auditd | — | — | BSM auditing (`audit`) | `errpt` / `audit` | — |
| ps aux | `ps aux` | `ps aux` | `ps -ef` / `prstat` | `ps` | `ps` |

---

## 5. Centralized logging architecture (cross-platform)

```
[hosts: Linux + BSD + Solaris + AIX]  ──rsyslog/syslogd──> [collector]
                                          │
                                    imjournal / imudp / imtcp
                                          │
                                    [index: Elastic / Loki / Splunk]
```

- rsyslog modules: `imjournal` (pull from journald), `imudp`/`imtcp` (receive remote), `omfwd` (forward), `omfile` (write to file)
- ForwardToSyslog=no (Arch default) — journald pushes nothing; rsyslog pulls via imjournal. Push only needed for non-journal-aware syslogds.
- RHEL: TLS + RELP forwarding for encrypted transport; `mmjsonparse` + `@cee` for structured JSON logging.

---

## 6. Study pointers

- **M1 d7 lab**: reproduce `/etc/syslog.conf` + `/etc/newsyslog.conf` patterns on Linux to understand the config-path difference before you ever touch a BSD box.
- **M1 d8 lab**: enable `sysstat` (`/etc/cron.d/sysstat`), run `sar -u/-d/-r/-n`, write a threshold alert script — then read how Solaris `sar` and AIX `topas` present the same metrics differently.
- **M17 bridge**: the native logging skills here plug into Loki/ELK — see `resources/prometheus.md`, `resources/elk.md` in [[Resources/Extras|the mega-collection]].

---

[[Resources/Level-1-Foundations|← Back to Level 1 resources]] · [[Resources/Extras|← Back to Extras]]
