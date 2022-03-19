chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
	if(request.cmd == 'generate') {
		tip("Generating Code");
		var result = document.title;
		//generate code
		sendResponse(JSON.stringify({cmd:'generate',value:"Generate Code :\n"  + result}));
	}else if(request.cmd == 'reminder') {
		tip("Togger Reminder");
		//togo reminder
		$('#Header1_HeaderTitle').toggle();
		var result = document.location.href;
		sendResponse(JSON.stringify({cmd:'reminder',value:"Toggle Reminder :\n"  + result}));
	}
	else {
		tip(JSON.stringify(request.value));
		sendResponse('Got your message：'+JSON.stringify(request));
	}
});

var tipCount = 0;
function tip(info) {
	info = info || '';
	var ele = document.createElement('div');
	ele.className = 'chrome-plugin-simple-tip slideInLeft';
	ele.style.top = tipCount * 70 + 20 + 'px';
	ele.innerHTML = `<div>${info}</div>`;
	document.body.appendChild(ele);
	ele.classList.add('animated');
	tipCount++;
	setTimeout(() => {
		ele.style.top = '-100px';
		setTimeout(() => {
			ele.remove();
			tipCount--;
		}, 400);
	}, 3000);
}