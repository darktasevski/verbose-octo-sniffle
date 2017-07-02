# Fortran

```fortran
! foo.f95

program hello
   Print *, "Hello World!"
end program Hello
```


```fortran
! bar.f95

program addNumbers

! This simple program adds two numbers
   implicit none

! Type declarations
   real :: a, b, result

! Executable statements
   a = 12.0
   b = 15.0
   result = a + b
   print *, 'The total is ', result

end program addNumbers
```

```bash
brew install gcc

# compile fortran:
gfortran  -std=f95 foo.f95 -o foo

# execute:
./foo

# output
#=> Hello World!
```
