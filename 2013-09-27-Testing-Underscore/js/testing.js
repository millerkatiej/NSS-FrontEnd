test( "Filter Even Numbers", function() {
  var numbers = _.range(10);
  var expected = _.range(0, 10, 2);
  deepEqual(filter_evens(numbers), expected, "testing the filter evens function" );
});


test( "Filter Odd Numbers", function() {
  var numbers = _.range(10);
  var expected = [1, 3, 5, 7, 9];
  deepEqual(filter_odds(numbers), expected, "testing the filter_odds function" );
});


test( "Filter Short Strings", function() {
  var strings = ["hello", "there", "a", "the", "cat", "elephant", "encyclopedia"];
  var expected = ["a", "the", "cat"];
  deepEqual(filter_short_strings(strings), expected, "testing short strings under 4 characters" );
});

test( "Filter 'A' Strings", function() {
  var strings = ["hello", "there", "a", "the", "cat", "elephant", "Aardvark", "encyclopedia", "apple"];
  var expected = ["a", "Aardvark", "apple"];
  deepEqual(filter_a_strings(strings), expected, "strings should begin with the letter 'A'");
});


test( "Find a String", function() {
  var blah = ["hello", "there", "a", "the", "cat", "elephant", "Aardvark", "encyclopedia", "apple"];
  deepEqual(find_string(blah, "elephant"), "elephant", "should find 'elephant'");
  deepEqual(find_string(blah, "Aardvark"), "Aardvark", "should find 'Aardvark'");
  deepEqual(find_string(blah, "cat"), "cat", "should find 'cat'");
  deepEqual(find_string(blah, "not here"), undefined, "should not find string")
});


test( "Find a String Ending in a particular letter", function() {
  var strings = ["dog", "cats", "lion", "tigers"];
  deepEqual(find_string_ending_letter(strings, "s"), "cats", "should find first word ending in s ");
  deepEqual(find_string_ending_letter(strings, "z"), undefined, "should not find any words ");
});
