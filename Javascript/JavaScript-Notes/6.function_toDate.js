/**
 * @param  {[type]} param [description]
 * @return {[type]}       [description]
 * ---------------------------------------------
 * 需要思考的是为什么将判断Array的条件放在判断object之前？
 */

function toDate(param){
	if(typeof(param)=="string"||typeof(param)=="number"){
		return new Date(param);
	}
	if(param instanceof Array){
		var date = new Date(0);
		date.setYear(param[0]);
		date.setMonth(parma[1]-1);
		date.setDate(param[2]);
		return date;
	}

	if(typeof(param)=='object'){
		var date = new Date(0);
		date.setYear(param.y);
		date.setMonth(param.m-1);
		date.setDate(param.d);
		return date;
	}
	return -1;
}
