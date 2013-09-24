var first_name = prompt('What is your first name?');
var last_name = prompt('What is your last name?');
var full_name = first_name + ' ' + last_name;
  console.log('Name: ' + full_name);

var initial_balance = prompt('What is your initial balance?');
initial_balance = parseFloat(initial_balance);
var balance = initial_balance;
  console.log('Initial Balance: $' + initial_balance);

var deposit1 = prompt('What is your first deposit?');
deposit1 = parseFloat(deposit1);
balance += deposit1;
  console.log('Current Balance: $' + balance);

var withdrawal1 = prompt('What is your initial wirthdrawal?');
withdrawal1 = parseFloat(withdrawal1);
balance -= withdrawal1;
  console.log('Current Balance: $' + balance);

var deposit2 = prompt('What is your second deposit?');
deposit2 = parseFloat(deposit2);
balance += deposit2;
  console.log('Current Balance: $' + balance);

var withdrawal2 = prompt('What is your second wirthdrawal?');
withdrawal2 = parseFloat(withdrawal2);
balance -= withdrawal2;
  console.log('Current Balance: $' + balance);

var deposit3 = prompt('What is your final deposit?');
deposit3 = parseFloat(deposit3);
balance += deposit3;
  console.log('Current Balance: $' + balance);

var withdrawal3 = prompt('What is your final wirthdrawal?');
withdrawal3 = parseFloat(withdrawal3);
balance -= withdrawal3;
  console.log('Current Balance: $' + balance);





console.log('Balance: $' + balance);

if(balance < 0)
{
  console.log('$50.00 overdraft fee!');
  console.log(('New Balance: $') + (balance - 50.00));
}
else
  console.log('Good money management!');

