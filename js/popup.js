function getCurrentTabId(callback)
{
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
	{
		if(callback) callback(tabs.length ? tabs[0].id: null);
	});
}


function sendMessageToContentScript(message, callback)
{
	getCurrentTabId((tabId) =>
	{
		chrome.tabs.sendMessage(tabId, message, function(response)
		{
			if(callback) callback(response);
		});
	});
}

$('#btCode').click(() => {
	sendMessageToContentScript({cmd:'generate', value:'Hello Stephen！'}, (response) => {
		if(response) {
            var result = JSON.parse(response);
            $('#taCode').val(result.value);
           // showWindowsTip(result);
        }
	});
});

$('#btReminder').click(() => {
	sendMessageToContentScript({cmd:'reminder', value:'Hello Stephen！'}, (response) => {
		if(response) {
            var result = JSON.parse(response);
            $('#taCode').val(result.value);
           // showWindowsTip(result);
        }
	});
});

function showWindowsTip(response){
    chrome.notifications.create(null, {
        type: 'basic',
        iconUrl: 'icon.png',
        title: response.cmd,
        message: response.value
    });
}


$('#theme').click(() => {
	var theme = $('body').attr('data-theme');
	if (theme == 'light') {
		$('body').attr('data-theme','dark');
	} else {
		$('body').attr('data-theme','light');
	}
	
});