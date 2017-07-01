function feuerFrei(concentration, barrels) {
  //help Rammstein here

  let hours = concentration * barrels;

  if (hours < 100) {
    return `${100 - hours} Stunden mehr Benzin benötigt.`;
  }
  else if (hours === 100) {
    return `Perfekt!`;
  }
  else {
    return hours - 100;
  }
}

feuerFrei(5, 2);
