var normalize = require('vectors/normalize')(2)
  ,add = require('vectors/add')(2)
  ,sub = require('vectors/sub')(2)
  ,mag = require('vectors/mag')(2)
  ,mult = require('vectors/mult')(2)
  ,limit = require('vectors/limit')(2)
  ;


function truncate(vector, max){
  var i = max / vector.length;
  i = i< 1.0 ? i : 1.0;
  return mult(vector, i);
};

function straight(target, position){
  var target = target.slice(),
      position = position.slice();
  
  return normalize(sub(target, position));
}

function seek(target, position, current_velocity, max_velocity, slowing_radius){
  //make clones of inputs to not mutate originals
  var target = target.slice(),
      position = position.slice(),
      current_velocity = current_velocity.slice();
  
  desired = sub(target, position);
  
  distance = mag(desired);
  desired = normalize(desired);
  
  if (distance <= slowing_radius) {
    desired = mult(desired, (max_velocity * distance/slowing_radius));
  } else {
    desired = mult(desired, max_velocity);
  }
  
  force = sub(desired, current_velocity);
  
  return force;
};

function flee(target, position, current_velocity, max_velocity){
  var target = target.slice(),
      position = position.slice(),
      current_velocity = current_velocity.slice();

  desired = sub(position, target);
  desired = normalize(desired);
  desired = mult(desired, max_velocity);
  
  force = sub(desired, current_velocity);
  
  return force;
}

function setAngle(vector, value){
  var mag = mag(vector);
  vector[0] = Math.cos(value) * mag;
  vector[1] = Math.sin(value) * mag;
}

function wander(current_velocity, wander_distance, wander_radius, wander_angle, angle_change){
  var current_velocity = current_velocity.split();
  
  var circleCenter = mult(normalize(current_velocity), wander_distance);
  
  displacement = mult([0, -1], wander_radius);

  setAngle(displacement, wander_angle);
  wander_angle += Math.random() * angle_change - angle_change * .5;

  wanderForce = add(circleCenter,displacement);
  return wanderForce;
}

function evade(target, position, max_velocity, current_velocity, target_velocity){
  var target = target.slice(),
      position = position.slice(),
      current_velocity = current_velocity.slice(),
      target_velocity = target_velocity.slice();
  
  distance = sub(target, position);
  
  var updatesNeeded = mag(distance) / max_velocity;
  
  var tv = mult(target_velocity.slice(), updatesNeeded);
  
  targetFuturePosition = add(target_velocity.slice(), tv);
  
  return flee(targetFuturePosition, position, current_velocity, max_velocity);
}

function pursuit(target, position, max_velocity, current_velocity, target_velocity){
  var target = target.slice(),
      position = position.slice(),
      current_velocity = current_velocity.slice(),
      target_velocity = target_velocity.slice(),
      distance = sub(target, position),
      updatesNeeded = mag(distance) / max_velocity,
      tv = mult(target_velocity.slice(), updatesNeeded),
      targetFuturePosition = add(target_velocity.slice(), tv);
  
  return seek(targetFuturePosition, position, current_velocity, max_velocity, 0);
}

function avoidance(target, position, current_velocity, max_avoid_ahead, max_velocity, avoidance_force){
  var target = target.slice(),
      position = position.slice(),
      current_velocity = current_velocity.slice();
  var tv  = velocity.slice();
  tv = normalize(tv);
  tv = mult(tv, (max_avoid_ahead * mag(velocity)) / max_velocity);
  
  var ahead = add(position.slice(), tv);
    
  var avoidance = sub(ahead, avoidance);
  avoidance = normalize(avoidance);
  avoidance = mult(avoidance_force);
  
  return avoidance;
}

module.exports = {
  straight: straight,
  seek: seek,
  flee: flee,
  wander: wander,
  pursuit: pursuit,
  avoidance: avoidance
};
