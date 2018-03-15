var wson = new Boolean;

function sendMessage(msg) {
	if(wson == true){
		ws.send(msg);
	}
}
function setupEvent(){
	ws.onopen = function(){
		wson = true;
		sendMessage("client ready");
	}
	ws.onmessage = function(evt){
		receiveMessage(evt.data);	
	}
	ws.onerror = function(evt){

	}
	ws.onclose = function(evt){
		wson = false;

	}

}

function receiveMessage(msg)
{	
	if(msg == "drawLines")
	{
		drawLines(map);
	}else if(msg == "clearOverlays")
	{
		clearOverlays(map);	
	}else if (msg == "getpoints")
	{
		getPoints();
	}
		
		
}

function initWebSocket() {
       // 打开一个 web socket
	ws = new WebSocket(wsUri);
	setupEvent();
}

function setwebsocket()
{
	initWebSocket();
}


