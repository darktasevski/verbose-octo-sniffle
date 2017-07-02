// form builder

function Builder(){
	var self = this,
	    _html = "";

	//
	// public
	//

	self.label = label;
	self.textField = textField;
	self.build = build;

	//
	// private
	//

	function label(field){
		var html = "\t<label>" + field + "</label>\n";
		_html += html;
	}

	function textField(field){
		var html = "\t<input type='text' value='" + field + "'>\n";
		_html += html;
	}

	function build(){
		console.log("<form>\n" + _html + "</form>");
	}
}

function form_for($resource, $fn){
    $builder = new Builder();
    $fn($builder);
    $builder.build();
}

form_for(1, function($builder){
    $builder.label('name');
    $builder.textField('name');
    
    $builder.label('age');
    $builder.textField('age');
    
    $builder.label('address');
    $builder.textField('address');
});
/*
OUTPUT:

<form>
	<label>name</label>
	<input type='text' value='name'>
	<label>age</label>
	<input type='text' value='age'>
	<label>address</label>
	<input type='text' value='address'>
</form>

*/
