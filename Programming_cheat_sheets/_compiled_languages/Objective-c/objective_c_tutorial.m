#import <Foundation/Foundation.h>

//------------------------------------------------------------------ interface
/*
 * in Objective-c a class has its interface, and its implementation separate.
 *
 * Compile the code:
 *     $ clang -framework Foundation prog1.m -o prog1
 * Run the code:
 *     $ ./prog1
 */
@interface Person:NSObject
    {
        double length;   // Length of a box
        double breadth;  // Breadth of a box
        double height;   // Height of a box
        NSString *name;
        NSNumber *age; // = [NSNumber numberWithInt:27];
    }

    @property(nonatomic, readwrite) double height; // Property
    @property(nonatomic, readwrite, assign)  NSString *name; // Property
    @property(nonatomic, readwrite, assign)  NSNumber *age; // Property

    -(double) volume;
    -(NSString *) sayHello;
    -(void) myLogger;
    -(int)max:(int)num1 andNum2:(int)num2;
    -(void)greet:(NSString *)title andName:(NSString *)namee;
@end
//------------------------------------------------------------------ implementation
@implementation Person
    @synthesize height;
    @synthesize name;
    @synthesize age;

    -(id)init
    {
        self = [super init];
        length = 1.0;
        breadth = 1.0;
        return self;
    }

    -(double) volume
    {
        return length*breadth*height;
    }

    -(NSString *) sayHello
    {
        return @"hello";
    }

    -(void) myLogger
    {
        NSLog (@"hello world from myLogger");
    }

    - (int)max:(int)num1 andNum2:(int)num2{
        /* local variable declaration */
        int result;

        if(num1 > num2){
            result = num1;
        }else{
            result = num2;
        }

        return result;
    }

    - (void)greet:(NSString *)title andName:(NSString *)namee{
        NSLog (@"hello %@ %@", title, namee);
    }
@end

//------------------------------------------------------------------
int main()
{
    NSAutoreleasePool * pool = [[NSAutoreleasePool alloc] init];
    Person *brian = [[Person alloc]init]; // Create brian object of type Person
    Person *erich = [[Person alloc]init]; // Create erich object of type Person

    double volume = 0.0; // Store the volume of a box here

    // box 1 specification
    brian.height = 5.0;

    // box 2 specification
    erich.height = 10.0;

    // volume of box 1
    volume = [brian volume];
    NSLog(@"Volume of Person1: %f", volume);

    // volume of box 2
    volume = [erich volume];
    NSLog(@"Volume of Person2: %f", volume);

    //---
    NSString *greeting;
    greeting = [brian sayHello];
    NSLog(@"greeting: %@", greeting);

    //---
    [brian myLogger];

    //---
    // NSNumber *age;
    // greeting = [brian sayHello];
    // NSLog(@"greeting : %@", greeting);

    //---
    int ret;
    ret = [brian max:12 andNum2:33];
    NSLog(@"Max value is : %d\n", ret );

    //---
    [brian greet:@"Mr." andName:@"Smith"];

    //--- setting a string:
    NSString *foo = nil;
    NSString *bar = @"Dude";
    NSLog(foo);
    NSLog(bar);

    [pool drain];
    return 0;
}
