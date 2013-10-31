exports.square = function(x){
  var sq = x * x;
  return sq;
};

exports.area = function(length, width){
  return length * width;
};

exports.vol = function(length, width, height){ //this.area is like saying math.area
  return this.area(length, width) * height;
};