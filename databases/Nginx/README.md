# Nginx Notes

#### Quick reference


## Instalation for debian8

* Install with apt-get

```
apt-get install nginx
```

## Instalation for ubuntu16.04

* Install with apt-get

```
sudo apt-get install nginx
```

* Adjust the firewall

    * See the list of apps and 'select' the appropriate one `sudo ufw app list`

    * After choosing enable the right one.. `sudo ufw allow 'Nginx HTTP'`

    * Make sure its active.. `sudo ufw status`

## Configure Nginx

* Main configuration in `/etc/nginx/nginx.conf`

#### Reverse Proxy config

* Example:

    * What we would put in the /etc/nginx/sites/enabled/<domain>

```

server {
    listen 80;
    listen [::]:80;

    server_name domain.com;

    location /location2/{
        proxy_pass http://xxx.xxx.xxx.xxx:3000/;
    }
    location /location1/{
        proxy_pass http://xxx.xxx.xxx.xxx:3001/;
        proxy_set_header HOST $host;
    }
}

```


---

##### References

`http://nginx.org/en/docs/stream/ngx_stream_proxy_module.html`

`https://www.nginx.com/resources/admin-guide/reverse-proxy/`
