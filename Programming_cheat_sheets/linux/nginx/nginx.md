# NGINX

nginx is a reverse proxy, and a web server
you should use unicorn as a application server (nginx will sit in from of it)


### Difference between 'forward proxy' and 'reverse proxy':
```
forward proxy: hides the identities of clients
reverse proxy: hides the identities of servers
```

### Reverse proxy
```
A reverse proxy accepts a request from a client, forwards it to a server that can fulfill it, and returns the server's response to the client. 
```

### Load balancer
```
A load balancer distributes incoming client requests among a group of servers, in each case returning the response from the selected server to the appropriate client.
```
