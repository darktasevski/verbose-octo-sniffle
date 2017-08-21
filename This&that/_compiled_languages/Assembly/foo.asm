; # Generate object file from assembly:
; nasm -f macho64 -o foo.o foo.asm
;
; # Link object file:
; ld foo.o -o foo
;
; # Run executable:
; ./foo

%define SYSCALL_WRITE 0x2000004
%define SYSCALL_EXIT  0x2000001

section .data
    ; to use escape sequences, use backticks
    full_name db `Brian Spinos\n\n\n`

    ; get the length of the string ; "$" means "here"
    full_name_length equ $ - full_name

    foo db `foobar\n`

    ; get the length of foo string ; "$" means "here"
    foo_length equ $ - foo

section .bss
    ; this section is for constants?

section .text
    global start ; the main function name

    start:
        ; write 'Brian Spinos'
        mov rax, SYSCALL_WRITE
        mov rdi, 1 ; stdout
        mov rsi, full_name
        mov rdx, full_name_length
        syscall ; call the kernel

        ; write 'foobar'
        mov rax, SYSCALL_WRITE
        mov rdi, 1 ; stdout
        mov rsi, foo
        mov rdx, foo_length
        syscall ; call the kernel

        ; exit my program
        mov rax, SYSCALL_EXIT
        mov rdi, 0
        syscall ; call the kernel


; REGISTERS
; rsi: what to wite to output?
; rdx: length of output?
; rax: what to do (exit, read, write)
; rdi: where to write to, like stdout ?


; rax - temporary register; when we call a syscal, rax must contain syscall number ?
; rdi - used to pass 1st argument to functions ?
; rsi - pointer used to pass 2nd argument to functions ?
; rdx - used to pass 3rd argument to functions ?
