EXECUTABLE=hello

all:hello.ll
	llvm-as hello.ll
	llc hello.bc
	gcc -o $(EXECUTABLE) hello.s

clean:
	rm $(EXECUTABLE)
	rm hello.s
	rm hello.bc	
