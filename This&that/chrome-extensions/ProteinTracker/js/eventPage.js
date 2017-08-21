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