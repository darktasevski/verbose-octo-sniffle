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
    - (id)initWithNameX:(NSString *)myName 
                 andAge:(NSNumber *)myAge;
@end

//------------------------------------------------------------------ implementation
@implementation Person

    /*
     * instance variables
     */
    @synthesize name;
    @synthesize age;
    
    /*
     * constructor (actually any method can acts as a constructor... there is nothing special about 'init')
     */
    - (id)init
    {
        self = [super init];
        if (self) {
            self.name = @"No Name";
        }
        return self;
    }
    
    /*
     * we will use this method as a constructor
     * unfortunately, in Objective-c, you cannot have the same local variable name and instance variable name
     * so you need to use: 'myName' and 'name'
     */
    - (id)initWithNameX:(NSString *)myName 
                 andAge:(NSNumber *)myAge
    {
        self = [super init];
        if (self) {
            self.name = myName;
            self.age = myAge;
        }
        return self;
    }

    -(NSString *) getName
    {
        return self.name;
    }

    -(NSNumber *) getAge
    {
        return self.age;
    }
@end

//------------------------------------------------------------------
int main()
{
    NSAutoreleasePool * pool = [[NSAutoreleasePool alloc] init];

    /*
     * create an object from the Person class
     */
    // Person *brian = [[Person alloc]init];
    Person *brian = [
        [Person alloc]initWithNameX:@"Brian Spinos" 
                             andAge: [NSNumber numberWithInt:27]
    ];
    
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
