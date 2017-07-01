### Docker Wordpress example

```bash
$ docker pull tutum/wordpress

$ docker run -it --name my_wordpress_container -p 80:80 tutum/wordpress

# go to localhost:80

# Thats it! :)

# start a shell session in the container
$ docker exec -it my_wordpress_container bash
# run a command:
# $ ls -la
# to exit:
# $ exit
```
