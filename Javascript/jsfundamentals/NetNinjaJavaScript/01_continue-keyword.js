for (i = 0; i < 10; i++) {
	if (i === 5 || i ===3) {
		continue;
	};

	console.log(i);

};

// prints 0-2, 4, and 6-9 - NOT 3 or 5.