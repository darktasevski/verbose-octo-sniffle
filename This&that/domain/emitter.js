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

function Emitter() {
    this.nextSubscriptionId = 0;
    this.events = {};
}

Emitter.prototype.subscribe = function (eventName, callback) {
    if (!this.events.hasOwnProperty(eventName)) {
        this.events[eventName] = {};
    }
    const subscriptionId = this.nextSubscriptionId;
    this.nextSubscriptionId++;
    this.events[eventName][subscriptionId] = callback;
    const events = this.events;
    const subscriber = {
        release: function () {
            delete events[eventName][subscriptionId];
            // No more subscriptions for that event. Delete that eventName from events.
            if (!Object.keys(events[eventName]).length) {
                delete events[eventName];
            }
        },
    };
    return subscriber;
};

Emitter.prototype.emit = function (eventName) {
    if (!this.events.hasOwnProperty(eventName)) {
        // No such event being subscribed to. Terminate.
        return;
    }
    const callbackArgs = Array.prototype.slice.apply(arguments).slice(1);
    const callbacks = Object.values(this.events[eventName]);
    callbacks.forEach(function (callback) {
        callback.apply(null, callbackArgs);
    });
};

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

