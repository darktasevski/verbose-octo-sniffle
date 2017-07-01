/**

Write an emitter class that supports the following operations:

Constructor:
```
emitter = new Emitter();
```

Subscription to events:
```
sub = emitter.subscribe('event_name', callback);
sub2 = emitter.subscribe('event_name', callback2);
```

Emitting events:
This particular example should lead to the `callback` above being invoked with `foo` and `bar` as parameters.
```
emitter.emit('event_name', foo, bar);
```

Unsubscribing from existing subscriptions by releasing them:
```
sub.release(); // `sub` is the reference returned by `subscribe` above.
```

**/

class Emitter {
    constructor() {
        this.events = {};
    }

    subscribe(eventName, callback) {
        if (!this.events[eventName]) {
            this.events[eventName] = new Map();
        }
        const events = this.events;
        const subscriber = {
            release: function () {
                events[eventName].delete(this);
                // No more subscriptions for that event. Delete that eventName from events.
                if (!events[eventName].size) {
                    delete events[eventName];
                }
            },
        };
        this.events[eventName].set(subscriber, callback);
        return subscriber;
    }

    emit(eventName, ...parameters) {
        const callbacks = this.events[eventName];
        if (!callbacks) {
            return;
        }
        callbacks.forEach(callback => {
            callback(...parameters);
        });
    }
}

// Testing code.
const emitter = new Emitter();
const sub = emitter.subscribe('add', (a, b) => {
    console.log('add', a, b, a + b);
});
const sub2 = emitter.subscribe('add', (a, b) => {
    console.log('add double', a * 2, b * 2, a * b * 2);
});
emitter.emit('add', 1, 2);
sub2.release();
const sub3 = emitter.subscribe('add', (a, b) => {
    console.log('add triple', a * 3, b * 3, a * b * 3);
});
emitter.emit('add', 1, 2);
const sub4 = emitter.subscribe('mul', (a, b) => {
    console.log('mul', a, b, a * b);
})
emitter.emit('mul', 2, 3);
