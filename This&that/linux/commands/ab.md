# ab (Apache benchmark)

```bash
ab -k -c 10 -n 10 http://socialapp.192.168.0.2.xip.io/

ab -k -c 10 -n 10 brian.dev:3000/

# localhost does not work
ab -k -c 10 -n 10 localhost:3000/
```
