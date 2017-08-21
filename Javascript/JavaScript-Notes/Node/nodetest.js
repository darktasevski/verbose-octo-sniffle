function(req,res){
	var pathname = url.parse(req.url).pathname;
	for(var i=0;i<routes.length;i++){
		var routes = routes[i];
		if(pathname === routes[0]){
			var action = routes[1];
			action(req,res);
			  return;

		}
	}
	handle404(req,res);
}

// function(req,res){
// 	var pathname = url.parse(req.url).pathname;
// 	for(var i=0;i<routes.length;i++){
// 		var routes = routes[i];
// 		if(pathname===routes[0]){
// 			var action = routes[1];
// 			action(req,res);
// 			return;
// 		}
// 	}
// 	hanle404(req,res)
// }
