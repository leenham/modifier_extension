var author = "leenham";
function sendMessageToContentScript(message, callback)
{
	chrome.tabs.query({active: true}, function(tabs)
	{
		chrome.tabs.sendMessage(tabs[0].id, message, function(response)
		{
			if(callback) callback(response);
		});
	});
}


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
	console.log('收到来自content-script的消息：');
	console.log(request, sender, sendResponse);
	data = JSON.parse(localStorage["data"]);
	sendResponse(data);
});