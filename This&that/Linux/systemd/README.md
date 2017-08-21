# Generic commands for systemd

---
## Getty

### Auto login tty console
`/etc/systemd/system/getty@tty1.service.d/override.conf
[Service]
ExecStart=
ExecStart=-/usr/bin/agetty --autologin <username> --noclear %I $TERM`

---
#### References

```
https://wiki.archlinux.org/index.php/Getty
```

---

---
