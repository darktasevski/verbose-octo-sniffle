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