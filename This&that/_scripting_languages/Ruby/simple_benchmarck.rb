def benchmark
    start = Time.now
    puts "--------------------- start: #{start}"
    start = Time.now
    yield
    the_end = Time.now
    puts "--------------------- end: #{the_end}"
    puts "================= TIME: #{the_end - start}"
end

benchmark do
    puts 'your code here...'
end


benchmark do
    11379516.times do |n|
        a == 1
    end
end

# about 1 second long...
