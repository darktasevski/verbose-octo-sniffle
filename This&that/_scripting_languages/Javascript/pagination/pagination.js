function getUsers(obj){
	var total = 100;
	var page = obj.page > 1 ? Math.floor(obj.page) : 1;

	if(obj.page > 1){
		var page = Math.floor(obj.page);
	}else{
		var page = 1;
	}

	var rows = Math.floor(obj.rows);
	
	if(total > rows){
		var pages = total / rows;
	}else{
		var pages = 1;
	}

	var offset = rows * (page - 1);
	console.log('SELECT * FROM users LIMIT ' + offset + ', ' + rows + ';');
	console.log('number of pages: ' + pages);
}



getUsers({page: 3, rows: 10});

/*
output:

SELECT * FROM users LIMIT 20, 10;
number of pages: 10
*/
