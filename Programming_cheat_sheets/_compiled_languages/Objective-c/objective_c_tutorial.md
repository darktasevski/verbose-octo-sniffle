# Objective-c tutorial


# compiling and running a file

```objective-c
// prog1.m

#import <Foundation/Foundation.h>

int main (int argc, const char * argv[])
{
   NSAutoreleasePool * pool = [[NSAutoreleasePool alloc] init];
   NSLog (@"Programming is fun!");
   [pool drain];
   return 0;
}


/* 

Compile the code:
  $ clang -framework Foundation prog1.m -o prog1
Run the code:  
  $ ./prog1





gotchas: 
  - add the Foundation HEADER
  - make sure you are using the right file...lol (it happened to me)

*/

```

# log
```objective-c
NSLog(@"Brian"); // log string "brian"
NSLog(firstName); // log variable
```

# variables
```objective-c
// syntax: <object-type> *<variable-name> = @<value>;
NSString *firstName = @"brian";
```
# interpolation
```objective-c
NSLog(@"Hello there, %@.", firstName);
```

# integer
```objective-c
NSNumber *age = @768;
```
# array
```objective-c
NSArray *apps = @[@"AngryFowl", @"Lettertouch", @"Tweetrobot"];
// redefine 'apps'
apps = @[@"AngryFowl", @"Lettertouch", @"Tweetrobot", @"Instacanvas"];
```

# log array element
```objective-c
NSLog(@"%@", apps[1]);
```
# dictionaries
```objective-c
// like ruby hashes

NSDictionary *person = @{@"First Name": @"Eric"};

NSDictionary *appRatings = @{@"AngryFowl": @3, @"Lettertouch": @5};

// access value of a key:
NSLog(@"Lettertouch has a rating of %@.", appRatings[@"Lettertouch"]); // "Lettertouch has a rating of 5"
```

# send message
```objective-c
// like ruby functions

// syntax:   [object function];
// the key-word: 'description' is like ruby's '.inspect' method

NSArray *foods = @[@"tacos", @"burgers"];
NSLog(@"%@", [foods description]);

// storing the return of the function in a variable:
NSArray *foods = @[@"tacos", @"burgers"];
NSString *result = [foods description];
NSLog(@"%@", result);
```

# append to string:
```objective-c
NSString *firstName = @"brian";
NSString *lastName = @"spinos";

NSString *fullName = [firstName stringByAppendingString:lastName];
NSLog(@"%@", fullName);

```
# nested functions
```objective-c
NSString *firstName = @"brian";
NSString *lastName = @"spinos";

NSString *fullName = [ [firstName stringByAppendingString:@" "] stringByAppendingString:lastName];

NSLog(@"%@", fullName);
```
