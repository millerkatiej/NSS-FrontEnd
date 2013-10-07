
test("split_input", function() {
  deepEqual(split_input("5 3"), ['5', '3'], "splitting 5 and 3 into array");
});

test("interger_spread", function() {
  deepEqual(interger_spread(5), "[1,2,3,4,5]", "array with 5 elements");
});

