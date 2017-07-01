function getElements(name){
	if(!getElements.cache){
		getElements.cache = {}
	}
	return getElements.cache[name] = getElements.cache[name]||document.getElementsByTagName(name)
}