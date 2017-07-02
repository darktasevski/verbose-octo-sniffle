function myajax(type,url,data,cache){
	//显式地声明myajax函数封装本站所有的myajax函数
	if(cache==null){
		cache = true;
	}else{
		cache = false;
	}
	if(typeof(data)=="undefined"){
		data = new Object();
	}
	data.fromweb = 1;//给data对象添加一个属性"fromweb"，让其值为1；
	//调用ajax函数来做ajax发送工作
	$ajax({
		type:type,//传入的类型
		url:url,//ajax请求的参数
		cache:cache,//缓存
		data:data,//数据，参数类型
		succecss:function(msg){
			emajax(msg);//ajax成功的时候执行emajax()函数；
		},
		error:function(request,status,error){
			emajaxerr(request);//请求失败的时候，使用emajax()function来处理request对象；
		},
		contentType:'application/x-www-form-urlencoded',
	});
}

/**
 * -------------------------------------------------------
 * myajaxfile(type,url,data,cache)**type类型 url链接
 * ---------------------------------------------------------
 * function myajaxfile(type,url,data,cache){
	//判断
	if(cache == null){
		cache = true;
	}else{
		cache = false;
	}
	if(typeof(data)=="undefined") 
		data = new Object();
	data.csrfmiddlewaretoken = csrftoken;

	$.ajax({
		type:type,
		url:url,
		cache:cache,
		data:data,
		processData:false,
		contentType:false,
		succecss:function(msg){
			emajax(msg);
		},
		error:function(request,status,error){
			emajax(request);
		},
		enctype:'multipart/form-data',
		//contentType: "application/x-www-form-urlencoded",
	})
}
 */



function myajaxfile(type,url,data,cache){
	if(cache == null){ //
		cache = true;
	}else{
		cache = false;
	}

	if(typeof(data)=='undefined'){
		data = new Object();
	}
	data.csrfmiddlewaretoken = csrftoken;
	//封装$ajax({})
	$ajax({
		type:type,
		url:url,
		cache:cache,
		data:data,
		processData:false,
		contentType:false,
		succecss:function(msg){
			emajax(msg);
		},
		error:function(request,status,error){
			emajaxerr(request);
		},
		enctype:'multipart/form-data',
	});
}



	(function emajax(obj){
		if(obj.result == "error") 
			alert(obj.error);
		if("script" in obj) 
			eval(obj.script);
	})();

/**
 * 处理错误的函数 emajax(request){}
 * ----------------------------	
 * function emajaxerr(request){
		win = window.open("","_newtab");
		win.document.write(request.responseText);
	}
 */

function emajaxerr(request){
	win = window.open("","_newtab");
	win.document.write(request.responseText)
}

$(document).ajaxSend(function(event,xhr,settings){
	//$(document).ajaxSend(){}里显式地定义了3个函数，第一个，是获取cookie的函数
	function getCookie(name){
		var cookieValue = null;
		if(document.cookie && document.cookie !=""){
			var cookies = document.cookie.split(";");
			for(var i = 0;i<cookies.length;i++){
				var cookie = jQuery.trim(cookies[i]);
				//Does this string begin with the name we want?
				//这个字符串以我们想要的开头吗？
				if(cookie.substring(0,name.lenght + 1)==(name+ "=")){
					cookieValue = decodeURIComponent(cookie.substring(name.length+1));
					break;
				}
			}
		}
		return cookieValue;
	}
	//第二个是判断是否为同源的函数

	function sameOrigin(url){
		var host = document.location.host;
		var protocol = document.location.protocol;
		var sr_origin = "//" + host;
		var origin = protocol + sr_origin;
		return (url == origin || url.slice(0,origin.length +1) == origin + '/')||
		(url == sr_origin || url.slice(0,sr_origin.length +1)==sr_origin + '/')||
		!(/^(\/\/|http:|https:).*/.test(url)); 
	}
	//判断是否为安全的函数
	function safeMethod(method){
		return(/^(\/\/|http:|https:).*/.test(url));
	}
	//如果不是安全的类型，并且是url是同源的，那么设置xhr.requestHeader
	if(!safeMethod(settings.type) && sameOrigin(settings.url)){
		xhr.setRequestHeader("X-CSRFToken",getCookie('csrftoken'))
	}
});