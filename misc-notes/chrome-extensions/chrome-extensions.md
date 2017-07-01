Chrome Extensions
=================

A useful way to add functionality to the Chrome browser using HTML, CSS and JavaScript.

## Introduction ##

Using the model Google provides for extending the capabilities of Chrome, we can add custom functionality to Chrome in all kinds of useful way - including changing some of the default behaviors. Extensions are not the same a plugins, which run outside the context of the browser, whereas extensions run within the browser itself and conform to a specific set of API and capabilities exposed by Chrome.

>You can see and manage both extensions and plugins by typing `chrome://extensions` or `chrome://plugins` into the address bar in Chrome.

### How They Work ###

1. Developer Creates HTML, CSS and JavaScript files - just like a regular website
2. Files are packaged with a manifest into zipped file with a .CRX
3. The extension is deployed into the Chrome web store (or another location user can install it from)
4. Users install it, and Chrome uses the manifest file to know how to integrate with the browser

### What Extensions Can Do ###

- Interact with web pages or servers
- Control browser features
- Add UI to Chrome
- Create options pages
- Modify loaded pages
- Add to context menu (right click)
- Even load DLLs (DANGEROUS)

### Access The Chrome APIs ###

The [Google Developers](http://developer.google.com) site has a [page for extensions](https://developer.chrome.com/extensions) with extensive details about the [`chrome.*` API](https://developer.chrome.com/extensions/api_index).

### Anatomy Of A Chrome Extension ###

Chrome extensions can be broken down into three main parts: background pages, UI pages and content scripts.

- **Background Pages**
An HTML page that runs in the background and contains the JavaScript to control the capabilities of the extension when it is active from the Chrome UI. They can be persistent (always running and open) or event (registered for a specific event and only loaded when needed) pages. Background pages can be memory hogs!

- **UI Pages**
HTML pages that expose the UI for the extension, most commonly displayed when you click the extensions icon in the toolbar. Browser actions can have a pop-up to display this code or open a new tab or a window. UI pages can also invoke functions on a background page.

- **Content Scripts**
Content scripts are scripts that are executed when certain pages load in the browser and are used to inject JavaScript into a page to modify its behavior or user interface.

### Extension Manifest ###

At a minimum, the extension will need a [manifest file](https://developer.chrome.com/extensions/manifest); which is just a JSON formatted file that describes your extension. The minimum required fields are `manifest_version`, `name` and `version`.

The following code shows the supported manifest fields for extensions.

```javascript
{
	// Required
	"manifest_version": 2,
	"name": "My Extension",
	"version": "versionString",

	// Recommended
	"default_locale": "en",
	"description": "A plain text description",
	"icons": {...},

	// Pick one (or none), but not both. The content is the same for
	// both a browser action and a page action.
	"browser_action":
	{
		"default_icon":                 // optional
		{
			"19": "images/icon19.png",  // optional
			"38": "images/icon38.png"   // optional
		},
		"default_title": "Google Mail", // optional; shown in tooltip
		"default_popup": "popup.html"   // optional
	},

	"page_action":
	{
		"default_icon":                 // optional
		{
			"19": "images/icon19.png",  // optional
			"38": "images/icon38.png"   // optional
		},
		"default_title": "Google Mail", // optional; shown in tooltip
		"default_popup": "popup.html"   // optional
	},

	// Optional
	"author": ...,
	"automation": ...,
	"background":
	{
		// Recommended
		"persistent": false
	},
	"background_page": ...,
	"chrome_settings_overrides": {...},
	"chrome_ui_overrides":
	{
		"bookmarks_ui":
		{
			"remove_bookmark_shortcut": true,
			"remove_button": true
		}
	},
	"chrome_url_overrides": {...},
	"commands": {...},
	"content_pack": ...,
	"content_scripts": [{...}],
	"content_security_policy": "policyString",
	"converted_from_user_script": ...,
	"current_locale": ...,
	"devtools_page": "devtools.html",
	"externally_connectable":
	{
		"matches": ["*://*.example.com/*"]
	},
	"file_browser_handlers": [...],
	"homepage_url": "http://path/to/homepage",
	"import": ...,
	"incognito": "spanning or split",
	"input_components": ...,
	"key": "publicKey",
	"minimum_chrome_version": "versionString",
	"nacl_modules": [...],
	"oauth2": ...,
	"offline_enabled": true,
	"omnibox":
	{
		"keyword": "aString"
	},
	"optional_permissions": ["tabs"],
	"options_page": "options.html",
	"options_ui":
	{
		"chrome_style": true,
		"page": "options.html"
	},
	"permissions": ["tabs"],
	"platforms": ...,
	"plugins": [...],
	"requirements": {...},
	"sandbox": [...],
	"script_badge": ...,
	"short_name": "Short Name",
	"signature": ...,
	"spellcheck": ...,
	"storage":
	{
		"managed_schema": "schema.json"
	},
	"system_indicator": ...,
	"tts_engine": {...},
	"update_url": "http://path/to/updateInfo.xml",
	"web_accessible_resources": [...]
}
```

### Browser Action vs Page Action ###

Use a browser action when the extension is relevant to most pages; and a page action when the extensions icon should appear or disappear, depending on the page. Icons for browser actions show up in the toolbar to the right of the omnibox, while icons for page actions show up on the right *inside* of the omnibox. Page actions cannot use badges and must be explicitly made visible with `show`.

## Simple "Hello, World" Extension ##

This is a simple example extension that just shows how the pieces of an extension fit together - it isn't representative of what a real Chrome extension is likely to look like. It doesn't interact with the Chrome APIs or implemening much functionality. It's value lies in understanding the basics before delving into these broader topics.

Since extensions are really just a directory with everything your extension needs in it, create a directory for this example called `HelloWorld`. Inside this directory, create the following files.

**manifest.json**

```javascript
{
	"manifest_version" : 2,

	"name"        : "Hello World",
	"version"     : "1.0",
	"description" : "The description of the extension.",

	"browser_action" :
	{
		"default_icon":
		{
			"19": "img/icon-hw-19.png",
			"38": "img/icon-hw-38.png"
		},
		"default_title": "Hello World Title",
		"default_popup": "popup.html"
	}
}
```

**popup.html**

We can include one or more HTML files to use for the UI of our extension. These are just regular HTML file with one exception: **you can't use inline JavaScript**. All your JavaScript has to be in external files. Our manifest says an HTML file called `popup.html` will be our entry point, so here it is:

```html
<!doctype html>
<html lang=en>
	<head>
		<meta charset=utf-8>
		<title>Hello, World</title>

		<link rel="stylesheet" href="css/popup.css">

		<script src="js/jquery.min.js"></script>
		<script src="js/popup.js"></script>
	</head>
	<body>

		<h1 id="greeting">Hi!</h1>
		<input id="name" type="text">
	</body>
</html>
```

**popup.js**

Since our HTML file is referencing some external scripts, go ahead and create the `js` folder in your extenstion directory. Download [jQuery](http://jquery.com/download/) there, and then add this content to the `popup.js` file:

```javascript
$(document).ready(function ()
{
	$('#name').keyup(function ()
	{
		$('#greeting').text('Hi, ' + $('#name').val() + '!');
	});
});
```

**popup.css**

Just for the sake of completeness, we're going to add some CSS to our example. While we can do this inside the HTML file (unlike JavaScript), it's cleaner to put that in it's own file.

```css
h1
{
	color: blue;
}
```

**icon-hw-19.png and icon-hw-38.png**

Use your preferred image editor to create these. They can look however you want, as long as their dimensions are 19x19 and 38x38, respectively. Put these in a subfolder named `img` - which matches the path we specified in our manifest file.

Feel free to use mine, listed here for your convinience:

| File Name  | Icon |
|------------|------|
| icon-hw-19.png | ![](https://raw.githubusercontent.com/scottoffen/ps-notes/master/chrome-extensions/HelloWorld/img/icon-hw-19.png) |
| icon-hw-38.png | ![](https://raw.githubusercontent.com/scottoffen/ps-notes/master/chrome-extensions/HelloWorld/img/icon-hw-38.png) |

### Using Developer Mode ###

While developing our extension, we're going to want to test it. Put Chrome in developer mode by going to `chrome://extensions` and checking the box at the top labeled *Developer mode* - which should be unchecked by default.

![](https://raw.githubusercontent.com/scottoffen/ps-notes/master/chrome-extensions/developer-mode.png)

Once checked, a button bar becomes visible. Click the *Load unpacked extension...* button and browse to the folder the extension is located in. The icon should become visible in our browser bar, and when clicked will show our pop-up. As we continue to make changes to our extension files, the developer-mode plugin will automatically refresh for us.

>We can launch the Chrome developer tool on our extension by right-clicking on inside the pop-up and selecting the *Inspect element* option. This will open the developer tools in a seperate window that will be specific to our extension, not the open browser tab.

## Browser Action Extension ##

This extension will use the Chrome storage APIs for storing and syncing data, demonstrate how to use the browser action badge and notifications, have an options page, and use and event page that runs in the background to register for events.

### Chrome Storage API ###

The [Chrome Storage API](https://developer.chrome.com/extensions/storage) has been optimized to meet the specific storage needs of extensions. It provides the same storage capabilities as the [localStorage](https://developer.mozilla.org/en/DOM/Storage#localStorage) API with the following key differences:

- User data can be automatically synced with Chrome sync (using storage.sync).
- Your extension's content scripts can directly access user data without the need for a background page.
- A user's extension settings can be persisted even when using split incognito behavior.
- It's asynchronous with bulk read and write operations, and therefore faster than the blocking and serial localStorage API.
- User data can be stored as objects (the localStorage API stores data in strings).
- Enterprise policies configured by the administrator for the extension can be read (using storage.managed with a schema).

>**REMEMBER:** Never store confidential information! The storage area is not encrypted. 

**Manifest**

```javascript
{
	"name" : ...

	"permissions" :
	[
		"storage"
	]
}
```

To store user data for your extension, you can use either `storage.sync` or `storage.local`. When using `storage.sync`, the stored data will automatically be synced to any Chrome browser that the user is logged into, provided the user has sync enabled.

When Chrome is offline, Chrome stores the data locally. The next time the browser is online, Chrome syncs the data. Even if a user disables syncing, `storage.sync` will still work. In this case, it will behave identically to `storage.local`.

**Storing and Retrieving Data**

Use the `set` and `get` methods with callbacks to store and retrieve data.

```javascript
chrome.storage.sync.set({ 'key1' : 'value1', 'key2' : 'value2' }, function()
{
	console.log('Settings saved');
});

chrome.storage.sync.get('key1', function (items)
{
	if (items.key1)
	{
		console.log(items.key1);
	}
});
```

**Observing Changes**

If you're interested in tracking changes made to a data object, you can add a listener to its `onChanged` event. Whenever anything changes in storage, that event fires. Here's sample code to listen for saved changes:

```javascript
chrome.storage.onChanged.addListener(function(changes, namespace)
{
	for (key in changes)
	{
		var storageChange = changes[key];
		console.log('Storage key "%s" in namespace "%s" changed. ' +
		'Old value was "%s", new value is "%s".',
		key,
		namespace,
		storageChange.oldValue,
		storageChange.newValue);
	}
});
```

### Options Page ###

To allow users to customize the behavior of your extension, you may wish to provide [an options page](https://developer.chrome.com/extensions/options). If you do, a link to it will be provided from the extensions management page at `chrome://extensions`. Clicking the Options link opens a new tab or dialog pointing at your options page.

>Use the storage.sync API to persist these preferences. These values will then become accessible in any script within your extension, on all your user's devices.

**Manifest**

In versions of Chrome prior to 40, you simply add the `options_page` property to your `manifest.json`.

```javascript
{
	"name" : ...

	"options_page" : "options.html"
}
```

However, Chrome version 40 and higher, you can [specify a dialog](https://developer.chrome.com/extensions/optionsV2) for your options page.

```javascript
{
	"name" : ...

	"options_ui":
	{
		"page"         : "options.html", // required
		"chrome_style" : true,           // recommended
		"open_in_tab"  : true            // not recommended, for backwards compatibility only
	},
}
```

>At least until Chrome 40 is stable, you should specify both the `options_ui` and the `options_page` fields. Older versions of Chrome will only recognize `options_page`, and only open in tabs. Chrome 40 and onward prefers to use the `options_ui` field if it's specified.

### Notifications API ###

Use the `chrome.notifications` API to create rich notifications using templates and show these notifications to users in the system tray.

**Manifest**

```javascript
{
	"name" : ...

	"permissions" :
	[
		"notifications"
	]
}
```

**extension.js**

```javascript
var opts =
{
	'type'    : 'basic',
	'title'   : 'Notification Title',
	'message' : 'Here I will tell you of important things.',
	'iconUrl' : 'img/icon-pt-48.png'
};

chrome.notifications.create('myNotification', opts, function () { });
```

You can also update and clear notification, as well as bind to events that occur on the notification that appears via `onClosed`, `onClicked`, etc.

### Background and Event Pages ###

A common need for extensions is to have a single long-running script to manage some task or state.

The [background page](https://developer.chrome.com/extensions/background_pages) is an HTML page that runs in the extension process. It exists for the lifetime of your extension, and only one instance of it at a time is active. (Exception: if your extension uses incognito "split" mode, a second instance is created for incognito windows.)

An [event page](https://developer.chrome.com/extensions/event_pages) loads only when needed, and is unloaded when the page is not actively doing anything, freeing memory and other system resources. The performance advantages are significant, especially on low-power devices.

>**Google is recommending** that background pages be migrated to event pages. They've provided [conversion information](https://developer.chrome.com/extensions/event_pages#transition) to help with the transition.

In a typical extension with a background page, the UI - for example, the browser action or page action and any options page - is implemented by dumb views. When the view needs some state, it requests the state from the background page. When the background page notices a state change, the background page tells the views to update.

**Manifest**

```javascript
{
	"name" : ...

	"background" :
	{
		"scripts"    : ["background.js"],
		"persistent" : false // for event pages only
	}
}
```

>Notice that without the `persistent` key, you have a regular background page. Persistence is what differentiates an event page from a background page.

### Context Menus ###

Use the [context menus](https://developer.chrome.com/extensions/contextMenus) API to add items to Google Chrome's context menu. You can choose what types of objects your context menu additions apply to, such as images, hyperlinks, and pages.

Context menu items can appear in any document (or frame within a document), even those with `file://` or `chrome://` URLs. To control which documents your items can appear in, specify the `documentUrlPatterns` field when you call the `create()` or `update()` method.

>You can create as many context menu items as you need, but if more than one from your extension is visible at once, Google Chrome automatically collapses them into a single parent menu.

**Manifest**

You must declare the `contextMenus` permission in your extension's manifest to use the API. Also, you should specify a 16x16-pixel icon for display next to your menu item

```javascript
{
	"name" : ...

	"permissions" :
	[
		"contextMenus"
	],

	"icons":
	{
		"16"  : "icon-pt-16.png",
		"48"  : "icon-pt-48.png",
		"128" : "icon-pt-128.png"
	},
}
```

### Extension Files ###

Here are the files for the Protein Tracker Extension

**manifest.json**

```javascript
{
	"manifest_version" : 2,

	"name"        : "Protein Tracker",
	"description" : "Tracks a user's protein consumption throughout the day.",
	"version"     : "1.0",

	"browser_action" :
	{
		"default_icon":
		{
			"19": "img/icon-pt-19.png",
			"38": "img/icon-pt-38.png"
		},
		"default_title": "Protein Tracker",
		"default_popup": "popup.html"
	},

	"options_page" : "options.html",

	"options_ui":
	{
		"page"         : "options.html",
		"chrome_style" : true
	},

	"background" :
	{
		"scripts"    : [ "js/eventPage.js" ],
		"persistent" : false
	},

	"permissions" :
	[
		"storage",
		"notifications",
		"contextMenus"
	],

	"icons" :
	{
		"16"  : "img/icon-pt-16.png",
		"48"  : "img/icon-pt-48.png",
		"128" : "img/icon-pt-128.png"
	}
}
```

**eventPage.js**

```javascript
var menuItem =
{
	"type"     : "normal",
	"id"       : "ctxAddProtein",
	"title"    : "Add Protein",
	"contexts" : [ "selection" ]
};

chrome.contextMenus.create(menuItem);

chrome.contextMenus.onClicked.addListener(function (clickData)
{
	if ((clickData.menuItemId === 'ctxAddProtein') && (clickData.selectionText))
	{
		if ((/^\d+$/).test(clickData.selectionText))
		{
			chrome.storage.sync.get('total', function (items)
			{
				var total = (items.total) ? parseInt(items.total) : 0;
				total += parseInt(clickData.selectionText);

				chrome.storage.sync.set({ 'total' : total });
			});
		}
	}
});

chrome.storage.onChanged.addListener(function (changes)
{
	chrome.browserAction.setBadgeText({ "text" : changes.total.newValue.toString() });
});
```

**popup.html**

```html
<!doctype html>
<html lang=en>
	<head>
		<meta charset=utf-8>
		<title>Protein Tracker</title>

		<link rel="stylesheet" href="css/bootstrap.min.css">

		<script src="js/jquery.min.js"></script>
		<script src="js/bootstrap.min.js"></script>
		<script src="js/popup.js"></script>
	</head>
	<body>

		<div style="width: 500px; margin: 10px;">

			<h3>Protein Tracker</h3>
			<h4>Total: <span id="total">0</span> &nbsp;&nbsp;&nbsp; Goal: <span id="goal">0</span></h4>

			<div class="form-group">
				<label for="amount">Record Protein Consumption</label>
				<input type="text" class="form-control" id="amount" placeholder="Enter an integer amount">
			</div>

			<button type="button" class="btn btn-default" id="addAmount">Add Protein</button>

		</div>

	</body>
</html>
```

**popup.js**

```javascript
$(document).ready(function ()
{
	var $total  = $('#total');
	var $goal   = $('#goal');
	var $amount = $('#amount');

	chrome.storage.sync.get(['total', 'goal'], function (items)
	{
		var total = (items.total) ? parseInt(items.total) : 0;
		var goal  = (items.goal) ? parseInt(items.goal) : 0;

		$total.text(total);
		$goal.text(goal);
		$amount.val('');
	});

	$('#addAmount').click(function ()
	{
		chrome.storage.sync.get(['total', 'goal'], function (items)
		{
			var total = (items.total) ? parseInt(items.total) : 0;
			var goal  = (items.goal) ? parseInt(items.goal) : 0;

			if ($amount.val())
			{
				total += parseInt($amount.val());
			}

			chrome.storage.sync.set({ 'total' : total });
			$total.text(total);
			$amount.val('');

			if (total >= goal)
			{
				var msg = (total > goal) ? 'You exceeded your goal of ' + goal + ' by ' + (total - goal) + '!' : 'You reached your goal of ' + goal + '!'
				var opts =
				{
					'type'    : 'basic',
					'title'   : 'Goal Reached',
					'message' : msg,
					'iconUrl' : 'img/icon-pt-128.png'
				};

				chrome.notifications.create('goalReached', opts, function () { });
			}
		});
	});
});
```

**options.html**

```html
<!doctype html>
<html lang=en>
	<head>
		<meta charset=utf-8>
		<title>Protein Tracker Options</title>

		<link rel="stylesheet" href="css/bootstrap.min.css">

		<script src="js/jquery.min.js"></script>
		<script src="js/bootstrap.min.js"></script>
		<script src="js/options.js"></script>
	</head>
	<body>

		<div style="width: 500px; margin: 10px;">

			<h3>Protein Tracker Options</h3>

			<div class="form-group">
				<label for="amount">Create a Goal</label>
				<input type="text" class="form-control" id="goal" placeholder="Enter an integer amount">
			</div>

			<button type="button" class="btn btn-primary" id="setGoal">Set Goal</button>
			<button type="button" class="btn btn-default" id="reset">Reset Total</button>

		</div>

	</body>
</html>
```

**options.js**

```javascript
$(document).ready(function ()
{
	var $goal = $('#goal');

	chrome.storage.sync.get('goal', function (items)
	{
		var goal = (items.goal) ? parseInt(items.goal) : 0;
		$goal.val(goal);
	});


	$('#setGoal').click(function ()
	{
		chrome.storage.sync.set({ 'goal' : parseInt($goal.val()) });
	});


	$('#reset').click(function ()
	{
		chrome.storage.sync.set({ 'total' : 0 }, function ()
		{
			var opts =
			{
				'type'    : 'basic',
				'title'   : 'Total reset!',
				'message' : 'Total has been reset back to 0.',
				'iconUrl' : 'img/icon-pt-128.png'

			};

			chrome.notifications.create('resetAlert', opts, function () { });
		});
	});
});
```

**Icons**

Icons are in the `/img` folder, as specified in our manifest and other locations. Feel free to use mine, listed here for your convinience:

| File Name  | Icon |
|------------|------|
| icon-pt-16.png | ![](https://raw.githubusercontent.com/scottoffen/ps-notes/master/chrome-extensions/ProteinTracker/img/icon-pt-16.png) |
| icon-pt-19.png | ![](https://raw.githubusercontent.com/scottoffen/ps-notes/master/chrome-extensions/ProteinTracker/img/icon-pt-19.png) |
| icon-pt-38.png | ![](https://raw.githubusercontent.com/scottoffen/ps-notes/master/chrome-extensions/ProteinTracker/img/icon-pt-38.png) |
| icon-pt-48.png | ![](https://raw.githubusercontent.com/scottoffen/ps-notes/master/chrome-extensions/ProteinTracker/img/icon-pt-48.png) |
| icon-pt-128.png | ![](https://raw.githubusercontent.com/scottoffen/ps-notes/master/chrome-extensions/ProteinTracker/img/icon-pt-128.png) |

## Page Action Extension ##

### Tabs ###

Use the [`chrome.tabs`](https://developer.chrome.com/extensions/tabs) API to interact with the browser's tab system. You can use this API to create, modify, and rearrange tabs in the browser. You can use most chrome.tabs methods and events without declaring any permissions in the extension's manifest file. However, if you require access to the url, title, or favIconUrl properties of tabs.Tab, you must declare the "tabs" permission in the manifest.

**Manifest**

```javascript
{
	"name" : ...

	"permissions" :
	[
		"tabs"
	]
}
```

**JavaScript**

```javascript
chrome.tabs.query({ active : true, currentWindow : true }, function (tabs)
{
	// because there is only one active page in the current window
	chrome.pageAction.show(tabs[0].id);
});
```

### Content Scripts ###

[Content scripts](https://developer.chrome.com/extensions/content_scripts) are JavaScript files that run in the context of web pages. By using the standard Document Object Model (DOM), they can read details of the web pages the browser visits, or make changes to them.

Here are some examples of what content scripts can do:

- Find unlinked URLs in web pages and convert them into hyperlinks
- Increase the font size to make text more legible
- Find and process [microformat](http://microformats.org/) data in the DOM

However, content scripts have some limitations. They cannot:

- Use `chrome.*` APIs, with the exception of:
	- `extension` ( getURL , inIncognitoContext , lastError , onRequest , sendRequest )
	- `i18n`
	- `runtime` ( connect , getManifest , getURL , id , onConnect , onMessage , sendMessage )
	- `storage`
- Use variables or functions defined by their extension's pages
- Use variables or functions defined by web pages or by other content scripts

These limitations aren't as bad as they sound. Content scripts can indirectly use the `chrome.*` APIs, get access to extension data, and request extension actions by exchanging [**messages**](https://developer.chrome.com/extensions/messaging) with their parent extension. Content scripts can also make [**cross-site XMLHttpRequests**](https://developer.chrome.com/extensions/xhr) to the same sites as their parent extensions, and they can [**communicate with web pages**](https://developer.chrome.com/extensions/content_scripts#host-page-communication) using the shared DOM. For more insight into what content scripts can and can't do, learn about the [**execution environment**](https://developer.chrome.com/extensions/content_scripts#execution-environment).

**Manifest**

```javascript
{
	"name" : ...

	"content_scripts" :
	[
		{
			"matches" : [ "http://www.google.com/*" ],
			"css"     : [ "mystyles.css" ],
			"js"      : [ "jquery.js", "myscript.js" ]
		}
	]
}
```

If you want to inject the code only sometimes, use the permissions field instead, as described in [**Programmatic injection**](https://developer.chrome.com/extensions/content_scripts#pi).

```javascript
{
	"name": ...

	"permissions":
	[
		"tabs", "http://www.google.com/*"
	]
}
```

### Messaging ###

Since content scripts run in the context of a web page and not the extension, they often need some way of communicating with the rest of the extension. For example, an RSS reader extension might use content scripts to detect the presence of an RSS feed on a page, then notify the background page in order to display a page action icon for that page.

Communication between extensions and their content scripts works by using [message passing](https://developer.chrome.com/extensions/messaging). Either side can listen for messages sent from the other end, and respond on the same channel. A message can contain any valid JSON object (null, boolean, number, string, array, or object). 

>In addition to sending messages between different components in your extension, you can use the messaging API to [communicate with other extensions](https://developer.chrome.com/extensions/messaging#external). This lets you expose a public API that other extensions can take advantage of.

### Extension Files ###

There is a dark serial on the internet I like to read called [The Zombie Knight](http://thezombieknight.blogspot.com/2013/04/page-1.html "You should totally read this, too!"). While I otherwise enjoy the writing, I'd prefer to read it without the profanity. So, I wrote a page extension that only works on that site, and replaces the profanity with other words.

**manifest.json**

It would appear that the order in which content scripts are listed in the array is important. When I listed jQuery last, my other scripts didn't have access to the global jQuery variable ($).

```javascript
{
	"manifest_version" : 2,

	"name"        : "TZK ClearPlay",
	"description" : "Cleans up the language on the dark serial The Zombie Knight",
	"version"     : "1.0",

	"page_action" :
	{
		"default_icon":
		{
			"19": "img/sword-19.png",
			"38": "img/sword-38.png"
		},
		"default_title": "TZK ClearPlay"
	},

	"background" :
	{
		"scripts"    : [ "/js/events.js" ],
		"persistent" : false
	},

	"content_scripts" :
	[
		{
			"matches" : [ "http://thezombieknight.blogspot.com/*" ],
			"js"      : [ "/js/jquery.min.js", "/js/clearplay.js" ]
		}
	],

	"permissions" :
	[
		"tabs",
		"http://thezombieknight.blogspot.com/*"
	],

	"icons" :
	{
		"16"  : "img/sword-16.png",
		"48"  : "img/sword-48.png",
		"128" : "img/sword-128.png"
	}
}
```

**events.js**

```javascript
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse)
{
	if ((request.action) && (request.action === 'show'))
	{
		chrome.tabs.query({ active : true, currentWindow : true }, function (tabs)
		{
			chrome.pageAction.show(tabs[0].id);
		});
	}
});
```

**clearplay.js**

```javascript
chrome.runtime.sendMessage({ action : "show" });

$(document).ready(function ()
{
	var $post  = $('.post-body');

	$post.html(cleanText($post.html()));

	alert('clean');
});


function cleanText(html)
{
	html = html.replace(/fuck/gi, 'fart');

	return html;
}
```

**Icons**

| File Name  | Icon |
|------------|------|
| icon-pt-16.png | ![](https://raw.githubusercontent.com/scottoffen/ps-notes/master/chrome-extensions/TZKClearPlay/img/sword-16.png) |
| icon-pt-19.png | ![](https://raw.githubusercontent.com/scottoffen/ps-notes/master/chrome-extensions/TZKClearPlay/img/sword-19.png) |
| icon-pt-38.png | ![](https://raw.githubusercontent.com/scottoffen/ps-notes/master/chrome-extensions/TZKClearPlay/img/sword-38.png) |
| icon-pt-48.png | ![](https://raw.githubusercontent.com/scottoffen/ps-notes/master/chrome-extensions/TZKClearPlay/img/sword-48.png) |
| icon-pt-128.png | ![](https://raw.githubusercontent.com/scottoffen/ps-notes/master/chrome-extensions/TZKClearPlay/img/sword-128.png) |

## Debugging ##

Chrome extensions can be debugged just like any other web page using the [Chrome Developer Tools](https://developer.chrome.com/devtools), except that the developer tools have to be opened inside the context of the extension.

**Developer Tools Context**

- **Popup and Options:** Simply right click in the visible area and select *Inspect element* from the context menu to open the developer tools in the context of those pages. For popups, you can also right click on the icon for the pluging and select *Inspect popup*.

- **Background Pages:** On the `chrome://extensions` page, under each extension that's using a background page, will be an option to open the developer tools in the context of the background running page.

- **Context Scripts:** As these are inserted onto the page, they can be debugged right from the developer tools for the page you're viewing.

>The Chrome Developers Tools will also allow you explore the chrome API in the console.

See the content of any page you are trying to debug by going to the page in the browser using the `chrome-*` protocol in the omnibar.

```
chrome-extension://[extension-id]/js/events.js
```

## Packaging ##

To package an extension, use the *Pack extension...* button on the extension page in chrome and browse to the directory where your extension is located.

![](https://raw.githubusercontent.com/scottoffen/ps-notes/master/chrome-extensions/developer-mode.png)

This will automatically package the `.CRX` file for you.  The first time you package an extension, you do not provide a key (`.PEM`) file, as that will be generated. It needs to be kept because it contains the **private** key used to sign the extension. If you want to update the extension, you will need that file.

## Deployment ##

There are three main way to deploy your extension.

### Self Hosted ###

[Hosting](https://developer.chrome.com/extensions/hosting)
[Autoupdate](https://developer.chrome.com/extensions/autoupdate)

>As of Chrome 33, Windows stable/beta channel users can only download extensions hosted in the Chrome Web store, except for installs via [enterprise policy](https://support.google.com/chrome/a/answer/188453) or developer mode (see [Protecting Windows users from malicious extensions](http://blog.chromium.org/2013/11/protecting-windows-users-from-malicious.html)). You can still create your own .crx file and use it for testing in the dev channel, but you can't host that file on your own server.

### Chrome Web Store ###

Login to the [Chrome Developer Dashboard](https://chrome.google.com/webstore/developer/dashboard) and upload the extension directory.

Using this method, the developer site will generate and keep track of your private key files for you. After upload, you can edit all the details about your extension - including promotional tile images and a link to a YouTube video!

You can limit visibility (who can download/install/use) of your extension and limit it to people with the link or a Google Group for Trusted Testers.

### Inline Installation ###

The [inline installation](https://developer.chrome.com/webstore/inline_installation) allows you to host the extension in the Chrome Web Store, but include code on our site to allow people to install it directly from our site. Requires that the extension is already in the Chrome Web Store.


### Analytics ###

You can use [Google Analytics](http://www.google.com/analytics/) to track downloads and usage of your extension. Check out [this tutorial](https://developer.chrome.com/extensions/tut_analytics).

<!-- http://www.pluralsight.com/courses/google-analytics -->