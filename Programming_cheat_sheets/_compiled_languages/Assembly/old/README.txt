http://peter.michaux.ca/articles/assembly-hello-world-for-os-x

Hello world program in assembly

how to run the code:

$ nasm -f macho hello.asm
$ ld -o hello -e mystart hello.o  # linking process
$ ./hello  # hello, world

Check the exit status in Bash.
$ echo $?  # 0




#--------------------------

is the mac a x86 assembly ?

I think there are many types of assembly languages, for each type of processor?

the assembly functions are called mnemonic ?

the a seembly language is a human readable version of the binary code?



int 0x80 -> Call to Interrupt Procedure, its how you tell assembly to execute the previous commands!
`int` is the command, and `0x80` is the destination
