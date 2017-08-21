#
# A thread pool.
#
class Pool
    def initialize(size)

        # size of the pool that you want
        @size = size   

        @jobs = Queue.new

        # @size here are the number of elements in the array, zero-based
        @pool = Array.new(@size) do |i|   

            # create a thread for each of all elements in the array
            Thread.new do                   
                
                #  assign an ID for each thread, each ID correspond to an element in the array above, zero-based
                Thread.current[:id] = i     

                # when a thread exits, use another thread in its place! ???
                catch(:exit) do             
                    loop do
                        job, args = @jobs.pop
                        job.call(*args)
                    end
                end
            end
        end
    end

    def schedule(*args, &block)
        @jobs << [block, args]
    end

    def shutdown
        @size.times do
            schedule { throw :exit }
        end
        @pool.map(&:join)
    end
end


pool = Pool.new(20) # 20 concurrent workers


# 100 APPS
100.times do |i|
    pool.schedule do

        puts "\n WORKER ##{Thread.current[:id]}, APP ##{i}, CMD $1, time: #{Time.now.strftime('%H:%M:%S %4N')} \n"
        File.open("APP_#{i}.txt", 'a') { |file| file.write("\n WORKER ##{Thread.current[:id]}, APP ##{i}, CMD $1, time: #{Time.now.strftime('%H:%M:%S %4N')} \n") }
        sleep 1

        puts "\n WORKER ##{Thread.current[:id]}, APP ##{i}, CMD $2, time: #{Time.now.strftime('%H:%M:%S %4N')} \n"
        File.open("APP_#{i}.txt", 'a') { |file| file.write("\n WORKER ##{Thread.current[:id]}, APP ##{i}, CMD $2, time: #{Time.now.strftime('%H:%M:%S %4N')} \n") }
        sleep 1

        puts "\n WORKER ##{Thread.current[:id]}, APP ##{i}, CMD $3, time: #{Time.now.strftime('%H:%M:%S %4N')} \n"
        File.open("APP_#{i}.txt", 'a') { |file| file.write("\n WORKER ##{Thread.current[:id]}, APP ##{i}, CMD $3, time: #{Time.now.strftime('%H:%M:%S %4N')} \n") }
        sleep 1
    end

  #at_exit { p.shutdown }
end

