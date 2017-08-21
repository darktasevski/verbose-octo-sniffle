$(document).ready(function ()
{
	$('#courseCounts').on('click', function ()
	{
		chrome.tabs.query({ active : true, currentWindow : true }, function (tabs)
		{
			chrome.tabs.sendMessage(tabs[0].id, { action : 'courseCounts' });
		});
	});

	$('#makeSortable').on('click', function ()
	{
		chrome.tabs.query({ active : true, currentWindow : true }, function (tabs)
		{
			chrome.tabs.sendMessage(tabs[0].id, { action : 'makeSortable' });
		});
	});
});