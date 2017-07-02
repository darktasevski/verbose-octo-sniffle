var schedule = [];

function pushList(task) {
	schedule.push(task);
}

function whatsNext() {
	return schedule.shift();
}

function urgentList(task) {
	schedule.unshift(task);
}

console.log(schedule);