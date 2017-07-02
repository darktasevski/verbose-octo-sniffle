* most commonly used data structues in web dev are:
  * Stack
    * ex. 'undo' operation of a text editor uses a stack to organize data
  * Queue
    * ethe event-loop of a web-browser uses a queue to process data

**Stack**
  *  linear data structure (organizes data into sequential order)
  * like a stack of plates: the latest plate is stacked on top of the previous plate stacked

  ***Operation of a Stack***
  * two operations of a stack:
    * push(data) --adds data
    * pop() -- removes the most recently added data

    ```

    function Stack() {
      this._size = 0;
      this._storage = {};
    }

    ```

    ```this._storage``` is the container for the ```Stack```
    ```this._size``` is the number of times data was pushed into the current ```Stack```

  ***Methods of a Stack***

    ```push(data)```

      * every time we add data, we increment++

      * every time we add data, we want to keep the data order as it was added

    ```

    Stack.prototype.push = function(data) {
      // increase the size of our storage
      var size = this._size++;

      //assigns size as a key of storage
      // assigns data as the value of this key
      this._storage[size] = data;
    };

    ```

    ```pop()```

    * uses stack's current size to get the most recently added data
    * delete the most recently added data
    * decrement _this._size by 1
    * return the most recently deleted data

    ```

    Stack.prototype.pop = function() {
    var size = this._size,
      deletedData;

    if (size) {
        deletedData = this._storage[size];

        delete this._storage[size];
        this._size--;

        return deletedData;
    }
};

    ```

    ```

    function Stack() {
    this._size = 0;
    this._storage = {};
}

Stack.prototype.push = function(data) {
    var size = ++this._size;
    this._storage[size] = data;
};

Stack.prototype.pop = function() {
    var size = this._size,
        deletedData;

    if (size) {
        deletedData = this._storage[size];

        delete this._storage[size];
        this._size--;

        return deletedData;
    }
};

var cats = new Stack();

cats.push('orange');

console.log(cats);

```
