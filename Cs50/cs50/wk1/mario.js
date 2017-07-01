function mario(height) {
  var build = '#';
  var spacer = ' ';
  var block = 2;
  var space = height - 1;
  while (block <= height) {
    console.log(" ".repeat(space) + build.repeat(block));
    block++;
    space--;
  }
}

mario(6);

// make a function that prints a mario-style half pyramid from '#'
// base should equal the height
// top should equal 2
