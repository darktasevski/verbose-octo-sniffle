chrome.runtime.onMessage.addListener(function (request, sender, sendResponse)
{
	if (request.action)
	{
 		if (request.action === 'courseCounts')
 		{
 			console.log('courseCounts');
 		}
 		else if (request.action === 'makeSortable')
 		{
 			console.log('makeSortable');
 		}
 	}
});

chrome.runtime.sendMessage({ action : "show" });