# How can I get the otcal file permisssion from command line?
## Answer
You can try

```
$ stat -c "%a %n" *
```

## Explaination
**-c** option for **stat** means:
> -c  --format=FORMAT
>
> use the specified FORMAT instead of the default; output a newline after each use of FORMAT
>

**%a** format means:
>        %a     access rights in octal

**%n** format means:
>%n     file name

## Example
```
$ stat -c "%a    %n" 01-get_otcal_file_perm.md
664    01-get_otcal_file_perm.md
```
