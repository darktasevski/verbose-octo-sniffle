# elementary OS 0.4

### Adding a new application to the application menu..

go to `cd /usr/share/applications/` 

&

`sudo touch NAMEofAPPLICATION.desktop`

then past in it:

```
[Desktop Entry]
Encoding=UTF-8
Name=NAME of APPLICATION
Comment=Android IDE
Exec=/usr/local/bin/APP
Icon=APP_ICON
Terminal=false
Type=Application
Categories=GNOME;Application;Development;
StartupNotify=true
```

save and press on the menu to see changes...
If nothing happens its possibel its just not on the right Categorie OR the path to the bin is incorrect.
