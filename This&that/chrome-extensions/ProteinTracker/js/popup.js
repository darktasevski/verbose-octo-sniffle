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