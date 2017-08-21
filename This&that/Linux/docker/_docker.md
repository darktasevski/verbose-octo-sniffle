### DOCKER

###### Gotchas
```
- containers are running images!
```

###### Useful links
```
(digitalocen and nginx loadbalancing)
https://www.youtube.com/watch?v=JBtWxj9l7zM
https://www.youtube.com/watch?v=K6WER0oI-qs

https://www.youtube.com/watch?v=UV3cw4QLJLs
https://www.youtube.com/watch?v=1OLyXJJPBSA (good!)
```

```bash
$ docker images # list images


# create a container from an image called 'ruby', version '2.3.3',
# and run bash
$ docker run -it ruby:2.3.3 /bin/bash 


# Stop the container without quitting
# CTRL + P + Q 


# list containers
$ docker ps 


# to get back inside the container, even to the last visited folder
$ docker attach <container-id-or-name> 


# STOP running container! it will not show up in the `docker ps` command, just on the `docker ps -a`
# CTRL + D  


# restart the previously stopped container, but does not go in it.
$ docker start <container-id-or-name> 
$ docker ps # also shows that its running again!


# stop the container
$ docker stop <container-id-or-name> 
$ docker ps # shows that its not there anymore! only on `docker ps -a`
```




### Gotchas
``` bash
$ docker build -t my-new-image-name . # creates a new IMAGE, based on the Dockerfile in the current folder.

$ docker run -it --name my-new-container-name <IMAGE_ID_OR_NAME>  # creates a new container.

$ docker start <CONTAINER_ID_OR_NAME>  # start a previously stopped container.

$ docker stop <CONTAINER_ID_OR_NAME>  # stop a container, that was previously running.

$ docker attach <CONTAINER_ID_OR_NAME>  # start a shell session in that container. (container needs to be started)

```



### Cheatsheet
```bash
# https://github.com/wsargent/docker-cheat-sheet

$ docker create # creates a container but does not start it.
$ docker rename # allows the container to be renamed.
$ docker run # creates and starts a container in one operation.
$ docker rm # deletes a container.

# If you want a transient container, 
$ docker run --rm # will remove the container after it stops.


$ docker start # starts a container so it is running.
$ docker stop # stops a running container.
$ docker restart # stops and starts a container.
$ docker pause # pauses a running container, "freezing" it in place.
$ docker unpause # will unpause a running container.
$ docker wait # blocks until running container stops.
$ docker kill # sends a SIGKILL to a running container.
$ docker attach # will connect to a running container.

$ docker ps # shows running containers.
$ docker logs # gets logs from container. (You can use a custom log driver, but logs is only available for json-file and journald in 1.10).
$ docker inspect # looks at all the info on a container (including IP address).
$ docker events # gets events from container.
$ docker port # shows public facing port of container.
$ docker top # shows running processes in container.
$ docker stats # shows containers' resource usage statistics.
$ docker diff # shows changed files in the container's FS.
$ docker ps -a # shows running and stopped containers.

$ docker stats --all # shows a running list of containers.

$ docker commit <container> <new-image-name>  # use a container to create an image
```
