function square(x)
{
  return x * x;
}

function area_rect(width, height)
{
  return width * height;
}

function area_square(side)
{
  return square(side);
}


function area_circle (radius)
{
  return Math.PI * radius * radius;
}

function cuft_to_gallons(cubic_feet)
{
  return (7.48052) * cubic_feet;
}

function volume_cylinder(radius, depth)
{
  return area_circle(radius) * depth;
}

var rooms = []

var n = parseInt(prompt('How many rooms would you like?'));

function area(l, w)
{
  return l * w;
}

for(var i = 0; i < n; i++)
{
  room = {};
  room.name = prompt('Name of the room?');
  room.width = parseFloat(prompt('Width of ' + room.name + "?"));
  room.length = parseFloat(prompt('Length of ' + room.name + '?'));
  room.window = parseInt(prompt('Number of windows in ' + room.name + '?'));
  room.area = area(room.length, room.width);
  rooms.push(room);
}

var diameter = parseFloat(prompt('Diameter of pool?'));
var depth = parseFloat(prompt('Depth of pool?'));
var gallons = cuft_to_gallons(volume_cylinder(diameter/2, depth));

var window_number = 0;
var total_sqft = 0;

for(var i = 0; i < n; i++)
{
  window_number += rooms[i].window;
  total_sqft += rooms[i].width * rooms[i].length
}

var window_cost = window_number * 250;
var sqft_cost = total_sqft * 200;
var pool_cost = gallons * .2


console.log('Total Number of Rooms: ' + rooms.length);
console.log('Total Number of Windows: ' + window_number);
console.log('Total Window Cost: $' + window_cost);
console.log('Total Square Feet: ' + total_sqft);
console.log('Total Square Feet Cost: $' + sqft_cost);
console.log('Total Cost of House: $' + (sqft_cost + window_cost));
console.log('You have ' + gallons + 'gallons of water in your pool');
console.log('Your pool will cost: $' + pool_cost)




