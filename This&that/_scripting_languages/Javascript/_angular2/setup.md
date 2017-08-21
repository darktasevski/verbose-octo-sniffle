# Angular 2 setup tutorial

```bash
npm install -g @angular/cli


# it was not included in the PATH, so use:
/usr/local/Cellar/node/0.10.33_1/bin/ng 
/usr/local/Cellar/node/0.10.33_1/lib/node_modules/@angular/cli/bin/ng <--- use this one?

# create an alias
ln -s "/usr/local/Cellar/node/0.10.33_1/lib/node_modules/@angular/cli/bin/ng" /usr/local/bin/ng
# OR:
chmod +x /usr/local/bin/ng

mkdir myAngular2App
cd myAngular2App
ng new myApp
cd myApp
npm install
ng server --port 3000 # build all src code, and spin a DEVELOPMENT server 
```
