### https://hub.docker.com/
```
DockerHub is like github, but for images, so you can create your own images!
You can use DockerHub to download the image into you server! (so its easy to create multiple instances of your server!)
You should work with GIT inside your container
```

### Dockerfile
```
The Dockerfile is used to to specify instructions to create an image.
```

### Images
```
An image is a snapshot of a container
An image is an inert, immutable, file that's essentially a snapshot of a container. 
Images are created with the build command, and they'll produce a container when started with run. 
Images are stored in a Docker registry such as registry.hub.docker.com
```

```bash
$ docker search ubuntu
$ docker pull <image> # Download images from docker hub
$ docker images # List downloaded images


# create you own image, notice the '.' specifying the folder where the 'Dockerfile' is in
$ docker build -t <my-docker-username>/<name-for-new-image>  . # example: $ docker build -t brianspinos777/my_foo_image
$ docker run -it <my-docker-username>/<name-for-new-image> /bin/bash # start a shell session

# tagging images
$ docker tag <image-id> <my-docker-hub-username>/<my-image-name>:<my-tag-name>
$ docker tag 5db5f8471261 ouruser/sinatra:devel # as an example

# remove all local? images
$ docker rmi $(docker images -a )

```

### Containers
```
A container is a running image
```

```bash
$ docker run <image> <command> # Create a container (boot and exit)
$ docker run --rm  <image> <command> # Create a container (boot and exit) and also deletes it (it is a good practice!)
$ docker run -it <image> sh # create a container and start a shell session
$ docker ps # Show running containers
$ docker ps -a # show all containers
$ docker start <container-id> # Restart a container
$ docker rm <container-id> # delete container

$ docker attach <container-id> # start a shell session, to exit, press CTRL + C

# remove stale containers
docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
```

### volumes
```
docker volume ls
```


### workflow
```bash
# create your Dockerfile

# create/build/update the image "a system's snapshot"
$ docker build -t myApp . # the '.' is to specify the location of the Dockerfile

# run it!
# myApp is the name we created in the 'build' command!
# in a server, use the '-d' option to run it in the background
$ docker run -it -p 80:3000 myApp 

# go to http://localhost:3000

$ docker stop <container-name> # NOT IMAGE NAME

```
