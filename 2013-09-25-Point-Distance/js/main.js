var coordinates = [];

var x = parseInt(prompt("Enter the 'x' coordinate:"));

while(x)
{
  var coordinate = {};
  coordinate.x = x;
  coordinate.y = parseInt(prompt("Enter the 'y' coordinate:"));
  coordinates.push(coordinate);
  x = parseInt(prompt("Enter the 'x' coordinate:"));
}

debugger;

var point_x = coordinates[0].x;
var point_y = coordinates[0].y;

for(var i = 1; i < 2; i++)
{
  point_x -= coordinates[i].x;
}

for(var i = 1; i < 2; i++)
{
  point_y -= coordinates[i].y;
}

var square_root = Math.sqrt(Math.pow(point_x, 2) + Math.pow(point_y, 2));
console.log(square_root);