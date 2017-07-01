function wrap(object,method,wrapper){
	var fn = object[method]

	return object[method]=function(){
		return wrapper.apply(this,[fn.bind(this)].concat(Array.prototype.slice(arguments)));
	}
}

if(Prototype.Browser.Opera){
	wrap(Element.Methods,"readAttribute",function(original,elem,attr){
		return attr=="title" ? elem.title:original(elem,attr)})
}