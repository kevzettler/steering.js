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
      position = position.slice();

  desired = sub(position, target);
  desired = normalize(desired);
  desired = mult(desired, max_velocity);
  
  force = sub(desired, current_velocity);
  
  return force;
}

module.exports = {
  straight: straight,
  seek: seek,
  flee: flee
};

var start = [0,0];
var end = [500, 200];
setInterval(function(){
  var s = seek(end, start, [0,0], 20, 10);
  var ns = add(start, s);
  debugger;
  console.log(start);
  start = ns;
}, 0);




