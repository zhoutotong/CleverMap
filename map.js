var point = new BMap.Point(116.404, 39.915); // 创建点坐标
var drawlflag = new Boolean(false);
var markerarray = new Array;
var polyline = new BMap.Polyline();
var posarray = new Array;

//setPointOverlay
//功能：标记点
function setPointOverlay(ev, mmap){
	var marker = new BMap.Marker;        // 创建标注 
	marker.setPosition(ev.point); //设置mark位置
	marker.enableDragging();	  //使能marker的拖拽功能
	mmap.addOverlay(marker);      //将标注添加到地图中
	markerarray.push(marker);	  //放入marker矩阵
	marker.addEventListener("dragging", function(e){
		drawLine(mmap);
	});
	var menu = new BMap.ContextMenu();
	var txtMenuItem = [
		{
			text:'删除',
			callback:function(){
					mmap.removeOverlay(marker);
					for(var i = 0; i < markerarray.length; i++){
						if(markerarray[i] == marker){
							markerarray.splice(i, 1);
							drawLine(mmap);
				}}}
		},
	];
	for(var i=0; i < txtMenuItem.length; i++){
		menu.addItem(new BMap.MenuItem(txtMenuItem[i].text,txtMenuItem[i].callback,100));
	}
	marker.addContextMenu(menu);
}
//getPosition
//功能：获取坐标点并添加标注等
function getPosition(ev, mmap){
	setPointOverlay(ev, mmap);
}

function drawLine(mmap){
	if(drawlflag == true){
		posarray.splice(0, posarray.length);//清空坐标点
		for(var i = 0; i < markerarray.length; i++)//重载坐标点
			posarray.push(markerarray[i].getPosition());
		mmap.removeOverlay(polyline);//删除连线重新加载
		polyline = new BMap.Polyline(posarray,  //设置连线属性
			{strokeColor:'blue', strokeWeight:6, strokeOpacity:0.5}    
		);
		map.addOverlay(polyline);//绘线
	}
}

function clearAllData(){
	drawlflag = false;//复位绘图控制
	markerarray.splice(0, markerarray.length);//清空marker
	posarray.splice(0, posarray.length);//清空坐标点
}
function clearOverlays(mmap){
	mmap.clearOverlays();
	clearAllData();
}
function drawLines(mmap){
	drawlflag = true;
	drawLine(mmap);	
}
function get_val(mmap)
{

}

function getPoints()
{
	drawLines(map);
	if(posarray.length != 0){
		sendMessage("pointhead");
		for(var i = 0; i < posarray.length; i++)
		{
			sendMessage("[" + posarray[i].lng + "," + posarray[i].lat + "]");
		}
		sendMessage("pointend");
	}

}

function setup()
{
	// 百度地图API功能
	map.centerAndZoom(point,12);           
	//单击获取点击的经纬度
	map.disableDoubleClickZoom();
	map.enableScrollWheelZoom();
	
	map.addEventListener("click",function(e){
		getPosition(e, map);
	});
}
