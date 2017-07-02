// 在即时函数内部，我们用$符号来表示JQuery，我们在事件处理程序中也使用了$,
// 即便是这些处理程序很久才使用，通过闭包，$也能够正确绑定。

$ = function(){
	console.log("not Jquery");
}

(function($){
	$('img').on('click',function(event){
		$(event.target).addClass('clickedOn')
	})
})(Jquery);


$ = function(){
	console.log("Not Jquery");
}

(function($){
	$("img").on("click",function(event){
		$(event.target).addClass('clickOn');
	})
}(Jquery));