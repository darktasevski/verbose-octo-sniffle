// hash table

function Entry(key, value){
    var self = this;
    self.key = key;
    self.value = value;
    self.next = null;
}

function HashTable(size){
    var self = this;
    
    //
    // public attributes
    //
    
    self.size = size;
    self.table = [];
    
    //
    // public functions
    //
    
    self.inset = inset;
    self.get = get;
    
    //
    // initialization
    //

    create(self.size);
    
    //
    // private functions
    //

    function create(){
        for(var i = 0; i < self.size; i++){
            self.table[i] = null;
        }
    }

    function strcmp(a, b){   
        return ( a < b ? -1 : ( a > b ? 1 : 0 ) );  
    }
    
    /**
     *
     */
    function hashFunction(key){
        var hashval = 0,
            i = 0,
            ULONG_MAX = 4294967295;

        /* Convert our string to an integer */
        while(hashval < ULONG_MAX && i < key.length){
            hashval = hashval << 8; // like multiplying x by (2 to the power of 8  (256))
            asciiVal = key[i].charCodeAt(0);
            hashval += asciiVal;
            i++;
        }

        return hashval % self.size;
    }
    
    /**
     *
     */
    function createEntry(key, value){
        return new Entry(key, value);
    }
    
    /**
     *
     */
    function inset(key, value){
        var index = hashFunction(key);

        next = self.table[index];

        while(next != null && next.key != null && strcmp(key, next.key) > 0){
            last = next;
            next = next.next;
        }

        /* There's already an entry.  Let's replace that string. */
        if(next != null && next.key != null && strcmp(key, next.key) == 0){
            next.value = null;
            next.value = value;

        /* Nope, could't find it.  Time to grow an entry. */
        }else{
            newEntry = createEntry(key, value);

            /* We're at the start of the linked list in this index. */
            if(next == self.table[index]){
                newEntry.next = next;
                self.table[index] = newEntry;

            /* We're at the end of the linked list in this index. */
            }else if(next == null){
                last.next = newEntry;

            /* We're in the middle of the list. */
            }else{
                newEntry.next = next;
                last.next = newEntry;
            }
        }
    }
    
    /**
     *
     */
    function get(key){
        var index = hashFunction(key);

        /* Step through the index, looking for our value. */
        var entry = self.table[index];
        while(entry != null && entry.key != null && strcmp(key, entry.key) > 0){
            entry = entry.next;
        }

        /* Did we actually find anything? */
        if(entry == null || entry.key == null || strcmp(key, entry.key) != 0){
            return null;
        } else{
            return entry.value;
        }
    }
}


//
// API
//

var ht = new HashTable(1024); // size needs to be a power of 2

ht.inset("one", "1");
ht.inset("two", "2");
ht.inset("three", "3");
ht.inset("four", "4");

console.log(ht.get("one")); // '1'
console.log(ht.get("two")); // '2'
console.log(ht.get("three")); // '3'
console.log(ht.get("four")); // '4'

