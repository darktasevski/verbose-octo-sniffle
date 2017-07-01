class QuickSort

  def self.sort1(array)
    return array if array.length < 2
    mid = [array[array.length / 2]]
    remainder = array.take(array.length / 2) +
      array.drop((array.length / 2) + 1)
    left = remainder.select { |el| el < mid[0] }
    right = remainder.select { |el| el >= mid[0] }
    sorted_left = QuickSort.sort1(left)
    sorted_right = QuickSort.sort1(right)
    sorted_left + mid + sorted_right
  end

end
