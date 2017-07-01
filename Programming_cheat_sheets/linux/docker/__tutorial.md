### docker main tutorial

[youtube tutorial](https://www.youtube.com/watch?v=YFl2mCHdv24)


###### Images
```
images are snapshots of a system (a picture of the state of the system)
```

###### Containers
```
containers are running instances of an image
```

###### Image commands
```bash

# list all containers
$ docker ps -a

# list running containers
$ docker ps

# create new container based on an image and run a command
$ docker container run -it --name <my-new-container-name> <image> bash

# run a command on an existing container (container needs to be running...)
$ docker container exec -it <my-container-name> bash



# run a container based on an image
$ docker run -it --name <my-new-container-name> <image>

# run a container based on an image (with port forwarding)
$ docker run -it -p 80:80 --name <my-new-container-name> <image>

# run a container based on an image (as a backgroud process)
$ docker run -it -d --name <my-new-container-name> <image>

# run a container based on an image 
# (with a volume, so you can make changes in the host, and see them in the container!)
# NOTICE: If you decide to deploy this image, you need to rebuild it! $ docker build -t my_updated-image .
$ docker run -it -v <src-path>:<dest-path> --name <my-new-container-name> <image>

# Stop the container without quitting
# CTRL + P + Q 

# STOP running container! it will not show up in the `docker ps` command, just on the `docker ps -a`
# CTRL + D  

# delete container
$ docker rm <container>

# start, stop, restart, pause, unpause a container:
$ docker start <container>
$ docker stop <container>
$ docker restart <container>
$ docker pause <container>
$ docker unpause <container>

```


###### Container commands
```bash

# list images
$ docker images


# create an image, from a Dockerfile in the current folder
$ docker build -t <my-new-image-name> .

# delete image
$ docker rmi <image>

```

```bash
# these commands were not tested
$ docker wait <container>
$ docker kill <container>

# start a shell session in that container. (container needs to be started)
$ docker attach <container>  

# create an image from a container
$ docker commit <container> <new-image-name>

```


###### Dockerfile example https://docs.docker.com/engine/reference/builder/
```bash
FROM ubuntu  # FROM <image>:<tag>
MAINTAINER Brian Spinos 
ENV foo=bar baz=quux
WORKDIR /some_existing_folder_in_the_container
RUN mkdir my_app
COPY folder_from_host folder_in_container
EXPOSE 80
RUN echo "Hello world"
```

