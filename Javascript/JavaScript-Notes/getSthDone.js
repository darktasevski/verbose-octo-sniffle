var mopid = false;
var moimgs = false;
var moindex = false;
var mocover = false;

// 鼠标移上
function mousein(pid){
	mopid = pid;
	moindex = 0;
	mocover = $('#prd'+pid+' img').attr('src');
    //setTimeout(function(){},1000),一定时间之后执行callback function;
	setTimeout(function(){
		if ($('#prd'+pid+' img').is(":hover")) {
            //当被hover时候,自动发送ajax()，0.5秒之后重新获取数据；
			var data = new Object();
			myajax('POST', URLPREFIX + '/product/'+pid+'/getmedia/', data);
		}
	}, 500);
}

//鼠标离开
function mouseout(){
	$('#prd'+mopid+' img').attr('src', mocover);
	mopid = false;
    moimgs = false;
    moindex = false;
    mocover = false;
}
//拉取成功
function getmediadone(obj){
	if (mopid != obj.pid) return;
	if (obj.medias.length == 0) {
		mouseout();
		return;
	}
	moimgs = obj.medias;
	monext(mopid);
}

function monext(npid){
	if (mopid == false || npid != mopid) 
        return;

	$('#prd'+mopid+' img').attr('src', moimgs[moindex]);
	moindex = (moindex + 1) % moimgs.length;
	setTimeout(function() {monext(npid);}, 2000);
    
}