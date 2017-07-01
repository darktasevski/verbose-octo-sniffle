function madLib(verb, adjective, noun) {
	var verb = verb.toUpperCase();
	var adjective = adjective.toUpperCase();
	var noun = noun.toUpperCase();

	return `We shall ${verb} the ${adjective} ${noun}.`;
}

console.log(madLib('make', 'best', 'guac'));
