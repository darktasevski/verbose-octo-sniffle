
def insertionsort(array)
  1.upto(array.length - 1) do |i|
    value = array[i]
    j = i - 1
    while j >= 0 and array[j] > value
      array[j+1] = array[j]
      j -= 1
    end
    array[j+1] = value
  end
  array
end

array = [7,6,5,9,8,4,3,1,2,0]
p insertionsort(array)
# => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]