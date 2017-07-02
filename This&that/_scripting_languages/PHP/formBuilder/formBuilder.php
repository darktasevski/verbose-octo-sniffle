<?php

class Builder{
    var $html = "";
    
    public function label($field){
        $html = "\t<label>" . $field . "</label>\n";
        $this->html = $this->html . $html;
    }
    
    public function text_field($field){
        $html = "\t<input type='text' value='" . $field . "'>\n";
        $this->html = $this->html . $html;
    }
    
    public function build(){
        echo "<form>\n" . $this->html . "</form>";
    } 
}

function form_for($resource, $fn){
    $builder = new Builder();
    $fn($builder);
    $builder->build();
}

form_for(1, function(&$builder){
    $builder->label('name');
    $builder->text_field('name');
    
    $builder->label('age');
    $builder->text_field('age');
    
    $builder->label('address');
    $builder->text_field('address');
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
