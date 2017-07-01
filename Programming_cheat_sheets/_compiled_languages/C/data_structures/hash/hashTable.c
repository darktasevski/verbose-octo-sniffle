#include <stdlib.h>
#include <stdio.h>
#include <limits.h>
#include <string.h>

//
// Hash Table
//

typedef struct Node{
    char * key;
    char * value;
    struct Node * next;
} Node;


typedef struct hash{
    int size;
    Node ** array; // array of pointers
} Hash;


/**
 * Create a new hash. 
 */
Hash * createHash(int size){

    // Allocate the hash table itself. 
    Hash * hash = malloc(sizeof(Hash));

    // Allocate pointers to the head nodes.
    hash->array = malloc(sizeof(Node *) * size);

    hash->size = size;

    // init the array
    int i;
    for(i = 0; i < size; i++){
        hash->array[i] = NULL;
    }

    return hash;
}

/**
 * Hash a string to get an index for the underlying array `hash->array` 
 */
int hashFunction(Hash * hash, char * key){

    unsigned long int hash_value = 0;
    int i = 0;

    /**
     * Convert our key to a big number.
     * Loop through the letters of the key 
     * while the hash_value is less than ULONG_MAX
     * multiplying hash_value by 256 
     * and adding the int value of the character
     */
    while( i < strlen(key) && hash_value < ULONG_MAX ){
        hash_value *= 256; // same as: `hash_value << 8`
        hash_value += key[i];
        i++;
    }

    return hash_value % hash->size;
}

/**
 * Create an node. 
 */
Node * createNode(char * key, char * value){
    Node * node = (Node *)malloc(sizeof(Node));
    node->key = strdup(key);
    node->value = strdup(value);
    node->next = NULL;

    return node;
}

/**
 * Insert a node into a hash table. 
 */
void insert(Hash * hash, char * key, char * value){

    int index = hashFunction(hash, key);

    Node * currentNode = hash->array[index];

    while(currentNode != NULL && currentNode->key != NULL && strcmp(key, currentNode->key) > 0){
        currentNode = currentNode->next;
    }

    // If there's already a node.  Let's replace that string.
    if(currentNode != NULL && currentNode->key != NULL && strcmp(key, currentNode->key) == 0){
        free(currentNode->value);
        currentNode->value = strdup(value);
    } else { 
        // Nope, could't find it. add a node.
        
        Node * newNode = createNode(key, value);

        // We're at the start of the linked list in this index.
        if(currentNode == hash->array[index]){
            newNode->next = currentNode;
            hash->array[index] = newNode;

        // We're at the end of the linked list in this index.
        } else if (currentNode == NULL){
            currentNode->next = newNode;

        // We're in the middle of the list.
        } else {
            newNode->next = currentNode;
            currentNode->next = newNode;
        }
    }
}

/* Retrieve an node from a hash table. */
char * get(Hash * hash, char * key){

    int index = hashFunction(hash, key);

    Node * currentNode = hash->array[index];

    /* Step through the index, looking for our value. */
    while(currentNode != NULL && currentNode->key != NULL && strcmp(key, currentNode->key) > 0){
        currentNode = currentNode->next;
    }

    // Did we actually find anything?
    if(currentNode == NULL || currentNode->key == NULL || strcmp(key, currentNode->key) != 0){
        return NULL;
    }else{
        return currentNode->value;
    }
}

int main(){
    Hash * hash = createHash(100); 

    insert(hash, "name", "brian");
    insert(hash, "address", "123 4th Ave");
    insert(hash, "country", "USA");
    insert(hash, "state", "AZ");

    printf("%s\n", get(hash, "name")); // brian
    printf("%s\n", get(hash, "address")); // 123 4th Ave
    printf("%s\n", get(hash, "country")); // USA
    printf("%s\n", get(hash, "state")); // AZ
    
    return 0;
}
