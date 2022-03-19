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

$('#btCode').on('click',() => {
	sendMessageToContentScript({cmd:'generate', value:'Hello Stephen！'}, (response) => {
		if(response) {
            var result = JSON.parse(response);
            $('#taCode').val(result.value);
            // showWindowsTip(result);
        }
	});
});

$('#btReminder').on('click',() => {
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


$('#theme').on('click',() => {
	var themeVal = $('body').attr('data-theme');
	if (themeVal == 'light') {
		themeVal = 'dark';
	} else {
		themeVal = 'light';
	}

	$('body').attr('data-theme',themeVal);
	chrome.storage.sync.set({theme: themeVal}, function() {
		console.log('Save default theme '+ themeVal +'successfylly');
	});
	
});

chrome.storage.sync.get({theme: 'dark'}, function(items) {
	$('body').attr('data-theme',items.theme);
	console.log('Load default theme '+ items.theme +'successfylly');
});
