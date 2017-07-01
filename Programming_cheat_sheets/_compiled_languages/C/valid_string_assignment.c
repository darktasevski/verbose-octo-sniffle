#include <stdio.h>

int main() {
    //-----------------------------------
    char str1[]  = "str1";
    printf("%s\n", str1);

    //-----------------------------------
    char str2[10]  = "str2";
    printf("%s\n", str2);

    //-----------------------------------
    char * str3 = "str3";
    printf("%s\n", str3);

    //-----------------------------------
    const char str4[]  = "str4";
    printf("%s\n", str4);

    //-----------------------------------
    const char str5[10]  = "str5";
    printf("%s\n", str5);

    //-----------------------------------
    const char * str6 = "str6";
    printf("%s\n", str6);

    //-----------------------------------
    char * str7;
    str7 = "str7";
    printf("%s\n", str7);

    //-----------------------------------
    const char * str8;
    str8 = "str8";
    printf("%s\n", str8);

    //-----------------------------------
    return 0;
}
