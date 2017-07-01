# Cobol

###### main.cobol
```cobol
IDENTIFICATION DIVISION.
PROGRAM-ID. HELLO.

PROCEDURE DIVISION.
   DISPLAY 'Hello World'.
STOP RUN.
```


```bash
# Install cobol compiler
brew install gnu-cobol

# Compiling main.cobc source code
cobc -c -free -x main.cobol 

# Linking the program
cobc -x -o demo main.o 

# Executing the program
./demo 

# Output
#=> Hello World
```
