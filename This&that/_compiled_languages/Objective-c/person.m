#import <Foundation/Foundation.h>


@interface Person:NSObject
    
    /*
     * instance variables declarations
     */
    {
        NSString *name;
        NSNumber *age;
    }
    
    /*
     * configuration for the variables?
     * attaching variables to the class instance as properties?
     */
    @property(nonatomic, readwrite, assign)  NSString *name;
    @property(nonatomic, readwrite, assign)  NSNumber *age;
    
    /*
     * instance methods
     */
    -(NSString *) getName;
    -(NSNumber *) getAge;
@end

//------------------------------------------------------------------ implementation
@implementation Person
    @synthesize name;
    @synthesize age;
    
    /*
     * constructor
     */
    -(id)init
    {
        self = [super init];
        return self;
    }

    -(NSString *) getName
    {
        NSString *myName = @"brian";
        return myName;
    }

    -(NSNumber *) getAge
    {
        NSNumber *myAge = [NSNumber numberWithInt:27];
        return myAge;
    }
@end

//------------------------------------------------------------------
int main()
{
    NSAutoreleasePool * pool = [[NSAutoreleasePool alloc] init];

    /*
     * create an object from the Person class
     */
    Person *brian = [[Person alloc]init];
    
    //---
    NSString *name;
    name = [brian getName];
    NSLog(@"name: %@", name);

    //---
    NSNumber *age;
    age = [brian getAge];
    NSLog(@"age: %@", age);

    //---
    [pool drain];
    return 0;
}
