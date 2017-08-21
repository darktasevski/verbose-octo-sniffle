class AnimalShelter {
  constructor() {
    this.cats = [];
    this.dogs = [];
    this.currentID = 0;
  }

  enqueueCat(name) {
    this.cats.push({
      name: name,
      id: ++this.currentID,
    })
  }

  enqueueDog(name) {
    this.dogs.push({
      name: name,
      id: ++this.currentID,
    })
  }

  dequeueAny() {
    let dogId = this.dogs.length ? this.dogs[0].id : Number.POSITIVE_INFINITY;
    let catId = this.cats.length ? this.cats[0].id : Number.POSITIVE_INFINITY;

    if (dogId < catId) {
      return this.dogs.shift().name
    } else {
      return this.cats.shift().name
    }
  }

  dequeueCat() {
    return this.cats.shift().name
  }

  dequeueDog() {
    return this.dogs.shift().name
  }
}

let shelter = new AnimalShelter();
shelter.enqueueCat('luna')
shelter.enqueueDog('jack')
shelter.enqueueDog('doggie')
shelter.enqueueDog('doggie2')
shelter.enqueueCat('sunny')
console.log(shelter.dequeueAny());
// console.log(shelter.dequeueCat());
console.log(shelter.dequeueAny());
console.log(shelter.dequeueDog());
