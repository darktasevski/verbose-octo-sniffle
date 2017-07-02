Array.prototype.concatAll = function() {
var results = [];
this.forEach(function(subArray) {
  // ------------ INSERT CODE HERE! ----------------------------
  // Add all the items in each subArray to the results array.
  if (Array.isArray(subArray)) {
    results.push(...subArray);
  }
  // ------------ INSERT CODE HERE! ----------------------------
});

return results;
};

function mapIt() {
var movieLists = [
    {
      name: "New Releases",
      videos: [
        {
          "id": 70111470,
          "title": "Die Hard",
          "boxart": "http://cdn-0.nflximg.com/images/2891/DieHard.jpg",
          "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
          "rating": 4.0,
          "bookmark": []
        },
        {
          "id": 654356453,
          "title": "Bad Boys",
          "boxart": "http://cdn-0.nflximg.com/images/2891/BadBoys.jpg",
          "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
          "rating": 5.0,
          "bookmark": [{ id: 432534, time: 65876586 }]
        }
      ]
    },
    {
      name: "Dramas",
      videos: [
        {
          "id": 65432445,
          "title": "The Chamber",
          "boxart": "http://cdn-0.nflximg.com/images/2891/TheChamber.jpg",
          "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
          "rating": 4.0,
          "bookmark": []
        },
        {
          "id": 675465,
          "title": "Fracture",
          "boxart": "http://cdn-0.nflximg.com/images/2891/Fracture.jpg",
          "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
          "rating": 5.0,
          "bookmark": [{ id: 432534, time: 65876586 }]
        }
      ]
    }
  ];

// ------------   INSERT CODE HERE!  -----------------------------------
// Use map and concatAll to flatten the movieLists in a list of video ids.
// ------------   INSERT CODE HERE!  -----------------------------------

const list = movieLists.map(function(item) {
  return item.videos.map(function(thing) {
    return thing.id;
  });
});
return list.concatAll();
// Complete this expression!

}

mapIt();
