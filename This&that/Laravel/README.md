# Laravel framework


## Migrate a project's DB

* Remenber to change the db connection in the _.env_ file

```
 php artisan migrate
```

## Seeding a project's DB

```
php artisan db:seed
```

* If we want to specify a indevual custom seed then..

```
php artisan db:seed --class=<CUSTOMSEEDCLASS>
```

---
##### References

```
https://laravel.com/docs/5.4/seeding
```
