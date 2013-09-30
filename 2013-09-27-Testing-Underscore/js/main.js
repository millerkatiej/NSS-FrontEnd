function filter_evens(numbers)
{
  return _.filter(numbers, function(num) {return (num % 2) == 0;});
}

function filter_odds(numbers)
{
  return _.filter(numbers, function(num) {return (num % 2) == 1;});
}

function filter_short_strings(strings)
{
  return _.filter(strings, function(strings) {return strings.length < 5});
}

function filter_a_strings(strings)
{
  return _.filter(strings, function(strings) {return strings [0].toLowerCase()  == 'a' ;});
}

function find_string(blah, whatever)
{
  return _.find(blah, function(duh) {return duh == whatever;});
}

function find_string_ending_letter(strings, letter)
{
  return _.find(strings, function(string) {return string[string.length - 1] ==  letter;});
}