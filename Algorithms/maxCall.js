const maxCall = (func, num) => {
  var timesCalled = 0;
  return  () => {
    console.log(timesCalled)
    if (timesCalled >= num) {
      console.log('cannot invoke func');
    } else {
      func()
      timesCalled++;
    }
  }
}

const func = maxCall(() => {
  console.log('hi')
}, 3)

func()
func()
func()
func()
func()