const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const allUsers = ['Hansheng', 'Jason', 'Aiden', 'Emily', 'Eli', 'Hanz', 'Han', 'Trent', 'Ethan', 'Kamron'];

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json 
app.use(bodyParser.json())

app.use(express.static(__dirname + `/../client`));

app.get('/allUser', function (req, res) {
  // console.log(req.query.q);
  
  let str = req.query.q.toLowerCase();
  let filteredUsers = []
  for (var i = 0; i < allUsers.length; i++) {
    let user = allUsers[i].toLowerCase();  
    if (user.indexOf(str) === 0) {
      filteredUsers.push(user);
    }
  }
  res.send(filteredUsers);
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});