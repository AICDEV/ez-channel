Lightweight library to create custom events and trigger and subscribe them from everywhere. Works standalone or with other frameworks like react.js or vue.js
===============

# What can this program do ?

Sometimes you need a simple implementation to create global channels and subscribe them from other pieces of code, components or stuff like that. With ez-channel it is easy ;-)


## create channel

A channel is that object that manage all events and subscriptions for you. To create a new channel, just do it like follow.

```javascript
  Channel.create("myAwesomeChannel");
```

## subscribe

Subscribe gives you all the functions that you need to trigger and listen for events. See example below.

```javascript
  const channel = Channel.subscribe();
```

## create and listen to event

If you want to create an event, uhm let´s say "youAreAwesome" and you want listen to that, just do it like follow.

```javascript
  channel.on("myAwesomeChannel", "youAreAwesome", function() {
      console.log("someone says your are awesome");
    });
```

## dispatch event

If you want to dispatch an events, just simple do it like follow.

```javascript
  channel.send("myAwesomeChannel", "youAreAwesome");
```

## dispatch and listen with data

Of course it is possible the send and receive data by "on" and "send". See example below:

```javascript
  channel.send("myAwesomeChannel", "youAreAwesome",{isAwesome: true});
```

```javascript
  channel.on("myAwesomeChannel", "youAreAwesome", function(obj) {
      if(obj.isAwesome) {
        console.log("you are awesome");
      }
    });
```

## remove channel

Maybe it make sometimes sense to remove a channel. You can do it like follow.

```javascript
  channel.remove("myAwesomeChannel");
```

## Licence

Apache 2.0

Happy using and keep coding =)
