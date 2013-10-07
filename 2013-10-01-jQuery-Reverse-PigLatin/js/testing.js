test("pig_latin", function() {
  deepEqual(pig_latin("hello"), "ellohay", "hello in pig latin");
});

test("split_string", function() {
  deepEqual(split_string("hello nashville code"), ['hello','nashville','code'], "splitting string");
});

test("reverse_array", function () {
  deepEqual(reverse_array(['hello','nashville','code']), ['code','nashville','hello'], "reversing list");
});

