2D vector based steering behaviors. Based on Craig Reynolds' Steering Behaviors For Autonomous Characters.

#Install

```shell
npm install steering
```
#Usage
Steering uses the `vectors` library as a dependency. This means that it expects two element javascript arrays
passed in as arguments.

##Seek

```javascript
var seek = require('steering').seek;
var force = seek(target, position, current_velocity, max_velocity, slowing_radius);
```

##Flee
```javascript
var flee = require('steering').flee;
var force = flee(target, position, current_velocity, max_velocity);
```

##Wander
```javascript
var flee = require('steering').wander;
var force = wander(current_velocity, wander_distance, wander_radius, wander_angle, angle_change);
```
##Evade
```javascript
var flee = require('steering').evade;
var force = evade(target, position, max_velocity, current_velocity, target_velocity);
```

##Pursuit
```javascript
var flee = require('steering').pursuit;
var force = pursuit(target, position, max_velocity, current_velocity, target_velocity);
```

##Avoidance
```javascript
var flee = require('steering').avoidance;
var force = avoidance(target, position, current_velocity, max_avoid_ahead, max_velocity, avoidance_force);
```
