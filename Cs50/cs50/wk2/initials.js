function initials(name) {
  name = name.split(' ');
  var nameInitials = [];
  for (var i = 0; i < name.length; i++) {
      nameInitials.push(name[i][0].toUpperCase());
  }
  return nameInitials.join('');
}

initials('john jacob jingleheimer schmidt');

// return the capitalized initials of a name
