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