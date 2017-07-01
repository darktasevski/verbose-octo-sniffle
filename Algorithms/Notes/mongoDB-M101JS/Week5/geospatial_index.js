/**
 * Geospatial Indexes
**/

// Consider: 'location':[x,y]

// To create an index on a location, do this:
createIndex({'location': '2d'})

// Find all locations near that 'x, y' coordinates, limit amount
// MongoDB takes [longitude, latitude]
find({location:{'$near': [x, y]}}).limit(20);

// Returned in order of increasing index 

/**
 * Geospatial Spherical
**/

db.places.createIndex({'location':'2dsphere'})

// To search
db.places.find({
  location: {
    $near: {
      $geometry: {
        type: 'Point',
        coordinates: [X, Y]
      },
      $maxDistance: 2000
    }
  }
})