#import <Foundation/Foundation.h>

/*
 * a simple hello world in Objective-c
 *
 * Compile the code:
 *     $ clang -framework Foundation helloWorld.m -o helloWorld
 * Run the code:
 *     $ ./helloWorld
 */
int main (int argc, const char * argv[])
{
    NSAutoreleasePool * pool = [[NSAutoreleasePool alloc] init];

    NSLog (@"hello world");
    [pool drain];
    return 0;
}
