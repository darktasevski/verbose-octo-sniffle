function sum(nums) {
  let count = 0;

  function addNum(num) {
    count += num;
  }

  for (let i = 0; i < nums.length; i++){
    addNum(nums[i]);
  }

  return count;
}

console.log(sum([1, 3, 5, 10]));

