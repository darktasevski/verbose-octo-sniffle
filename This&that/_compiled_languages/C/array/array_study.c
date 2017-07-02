#include<stdio.h>

int main() {
    
    int array[] = {10, 20, 30, 40, 50};
	int  * array2 = array;
	int array4[10]; // initialize an array of size 10
	char myString1[] = {'b','r','i','a','n', '\0'};
	
	// int array[] = {10, 20, 30, 40, 50};
	// *array --> is equal to the first element of the array!
	// array + 1 --> is equal to the address of the second element in the array!
	// *(array + 1) --> is equal to the second element of the array!
	// int * x = array + 1; --> *x is equal to the second element in the array!
	// int x = *(array + 1); --> x is equal to the second element in the array!
	//int ** array3 = &array; // ERROR
	
	
	
	
	/**
	 * It is possible to determine the number of elements in an array:
	 * by doing:
	 *     int size = sizeof(myArray) / sizeof(int);
	 */
	int sizeOfArray = sizeof(array) / sizeof(int);
	for(int i = 0; i < sizeOfArray; i++){
	   // printf("--> %d \n\n", array[i]);
	   // printf("--> %d \n\n", array2[i]);
	   // printf("--> %d \n\n", *array3[i]);  // ERROR
	}
	
	
	/**
	 * It is also possible to access memory beyond the array... be careful
	 */
	sizeOfArray += 10;
	for(int i = 0; i < sizeOfArray; i++){
	   // printf("--> %d \n\n", array[i]);
	}
	
	/**
	 * Using a loop to set values to an array:
	 */
	 int array4Size = sizeof(array4) / sizeof(int);
	for(int i = 0; i < array4Size; i++){
	    array4[i] = i + 100;
	   // printf("--> %d \n\n", array4[i]);
	}
	
	//
	// Strings (char arrays, or char pointers)
	//
	
	/**
	 * 
	 */
	 int myString1Size = sizeof(myString1) / sizeof(char);
	for(int i = 0; i < myString1Size - 1; i++){
	   //printf("--> %c \n\n", myString1[i]);
	}
	
// 	printf("--> %s \n\n", myString1);

}
