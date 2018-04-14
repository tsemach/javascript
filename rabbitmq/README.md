# Using rabbitmq
> This project has two purposes

1. General purpose example of using rabbitmq using amqp.node javascript library.
2. Loopback project - a library enable to record a rabbitmq messages to play them back.

## Loopback Goal
In some scenarios of massive use of rabbitmq like micro-services architecture where
several micro-services talking one to each other using rabbitmq it is difficult to 
debug a single component because all the other dependencies. 
The loopback goal is to provide tools of debugging single component without all its decencies.

* "Message shortcut": when you want to cut the message chain. 
for example: consider the following message chain 
| sender | --> | component-a| --> | component-b | --> | receiver |
each component use rabbitmq to communicate with other.

#### Communication concept
The loopback project is assuming each component has to rabbitmq queues:
1. **tasks** - a message come into the component ask his to do some tasks. 
2. **events** - a message come into the component as result of task that 
this component asking for other to do.

+------------+            +------------+
|            |            |            |
|            |    task    |            |
|            |----------->|            | 
|component-a |            |component-b |
|            |    event   |            | 
|            |<-----------|            |
|            |            |            |
+------------+            +------------+



### Modules
1. *Broker* - a class handle rabbitmq API. using it by:
    - constructor - get rabbitmq configuration
    - addConsumer - add listener to queue   
2. *Recorder* - a class use to record a message and save it into the database.
3. *Player* - a class use to listen on a queue and send back a message match to 
upcoming message.
#### Simulator

 
 

  
