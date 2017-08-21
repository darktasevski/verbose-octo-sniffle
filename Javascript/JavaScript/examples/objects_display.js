/*
4. Write a JavaScript program to display the reading status
(i.e. display book name, author name and reading status)
of the following books.
*/

var library = [
   {
       author: 'Bill Gates',
       title: 'The Road Ahead',
       readingStatus: true
   },
   {
       author: 'Steve Jobs',
       title: 'Walter Isaacson',
       readingStatus: true
   },
   {
       author: 'Suzanne Collins',
       title:  'Mockingjay: The Final Book of The Hunger Games',
       readingStatus: false
   }];

function showReadingStatus(library) {
  for (var i = 0; i < library.length; i++) {
    let book = library[i].title + ' by ' + library[i].author;

    if (library[i].readingStatus === true) {
      console.log("Already read: " + book);
    }
    else
      console.log("Still need to read: " + book);

  }
}

showReadingStatus(library);
