# Using pm2

## Install pm2..

> sudo npm install pm2@latest -g

## Run a nodejs server using pm2..

> sudo pm2 start app.js

## pm2 start on boot..

For start on boot we can use the command `pm2 start app.js` ran as root, However we are better off using the ecosystem file for it.

* Create an ecosystem file by.. `pm2 ecosystem`

* 

----
###### References

> http://pm2.keymetrics.io/docs/usage/quick-start/
