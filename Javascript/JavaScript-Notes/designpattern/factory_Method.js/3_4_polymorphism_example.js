// 多态,本例中是传入通过参数数组的长度来返回不同的函数实现的多态polymorphism
function Add(){
	function zero(){
		return 10;
	}

	function one(num){
		return 10+num;
	}

	function two(num1,num2){
		return num1+num2;
	}
	
	this.add = function(){
		var arg = arguments,
			len = arguments.length;
		switch(len){
			case 0:
				return zero();
			case 1:
				return one(arg[0]);
			case 2:
				return two(arg[0],arg[1]);
		}
	}
}

var a = new Add();
console.log(a.add())
console.log(a.add(1))
console.log(a.add(1,2))



// 多态,本例中是传入通过参数数组的长度来返回不同的函数实现的多态polymorphism
// 项目有可以实现多态的地方，单向关注，与多项关注

function follow(csuid,csuname,btn){
	var followonly = function(csuid, csuname){
		if (!login){
			$('#spmodal h4', window.parent.document).html(gettext('Please sign in'));
			$('#spmsg', window.parent.document).html(gettext("Join XXX to follow ")+csuname+gettext("'s closet!"));
			$('#spmodal', window.parent.document).modal('show');
			return;
		}
	    var data = new Object();
		data.action = 'follow';
	    data.feid = csuid;
	    myajax('POST', '/follow/', data);
		$('#'+csuid).addClass('disabled').attr('disable', 'disable');
	}

	var followbtn = function(csuid, csuname, btn){
		// Global变量获取btndom
	    rframe_follow_btn = btn;
	    if (!login) {
	        $('#spmodal h4', window.parent.document).html(gettext('Please sign in'));
	        $('#spmsg', window.parent.document).html(gettext("Join XXX to follow ") + csuname + gettext("'s closet!"));
	        $('#spmodal', window.parent.document).modal('show');
	        return;
	    }
	    //为发送ajax做准备
	    var data = new Object();
	    data.action = "follow";
	    data.uni = 1; 
	    data.feid = csuid;

	    myajax('POST', '/follow/', data);
	    rframe_follow_btn.attr('disabled', true);
	}


	var args = arguments,
	var len = arguments.length;

	switch(len){
		case 2:
			return followonly(csuid, csuname);
		case 3:
			return followbtn(csuid, csuname, btn);
	}
}




