var arr = ['string', 'water',1,2,'string',2];

Array.prototype.myUniq = function () {
	let uniq = [];
	for(let i = 0; i < this.length; i+=1) {
		if (uniq.includes(this[i]) === false) {
			uniq.push(this[i]);
		}
	}
	return uniq;
}

console.log(arr.myUniq());