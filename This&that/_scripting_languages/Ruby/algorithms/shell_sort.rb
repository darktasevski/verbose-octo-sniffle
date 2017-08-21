
def shellsort(array)
    inc = array.length / 2
    while inc != 0
        inc.step(array.length - 1) do |i|
            el = array[i]
            while i >= inc and array[i - inc] > el
                array[i] = array[i - inc]
                i -= inc
            end
            array[i] = el
        end
        inc = (inc == 2 ? 1 : (inc * 5.0 / 11).to_i)
    end
    array
end


data = [3,5,9,4,7,0,2,8,6,1]
shellsort(data)
p data # [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]