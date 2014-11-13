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

function seek(target, position, mass, max_velocity){
  var target = target.slice(),
      position = position.slice();
  
  var velocity = straight(target, position);
  velocity = mult(velocity, max_velocity);
  velocity = mult(velocity, (1 / mass));
  velocity = truncate(velocity, max_velocity);
  return velocity;
};

console.log(seek);

var start = [0,0];
var end = [200, 500];
setInterval(function(){
  var s = seek(end, start, 10, 20);
  var ns = add(start, s);
  debugger;
  console.log(start);
  start = ns;
}, 1000);




