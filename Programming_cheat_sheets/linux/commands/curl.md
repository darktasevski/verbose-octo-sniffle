### curl is linux's web browser!

### example:
```bash
$ curl google.com
# <HTML><HEAD><meta http-equiv="content-type" content="text/html;charset=utf-8">
# <TITLE>301 Moved</TITLE></HEAD><BODY>
# <H1>301 Moved</H1>
# The document has moved
# <A HREF="http://www.google.com/">here</A>.
# </BODY></HTML>

$ curl google.com -I
# HTTP/1.1 301 Moved Permanently
# Location: http://www.google.com/
# Content-Type: text/html; charset=UTF-8
# Date: Sat, 31 Dec 2016 20:34:41 GMT
# Expires: Mon, 30 Jan 2017 20:34:41 GMT
# Cache-Control: public, max-age=2592000
# Server: gws
# Content-Length: 219
# X-XSS-Protection: 1; mode=block
# X-Frame-Options: SAMEORIGIN

```
