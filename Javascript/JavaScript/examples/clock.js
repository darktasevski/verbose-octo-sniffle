/*8. Write a JavaScript program to create a Clock.
Note : The output will come every second.
Expected Console Output :
*/
function time() {
  let current = new Date();
  console.log(current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds());
}
setInterval(time, 1000);
