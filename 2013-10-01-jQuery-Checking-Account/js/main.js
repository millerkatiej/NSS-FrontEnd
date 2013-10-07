$(document).ready(initialize)
var balance = 1000;

function deposit(balance, deposit_amt) {
  return balance + deposit_amt;
}

function withdrawal(balance, withdrawal_amt) {
  return balance - withdrawal_amt;
}

function initialize() {
  $('#deposit').click(deposit_btn);
  $('#withdrawal').click(withdrawal_btn);
}

function deposit_btn() {
  var deposit_amt = $('#amount').val();
  deposit_amt = parseFloat(deposit_amt);
  var deposit_bal = deposit(balance, deposit_amt);
  balance = deposit_bal;
 $('#amount').val(balance);
}


function withdrawal_btn() {
  var withdrawal_amt = $('#amount').val();
  withdrawal_amt = parseFloat(withdrawal_amt);
  var withdrawal_bal = withdrawal(balance, withdrawal_amt);
  balance = withdrawal_bal;
 $('#amount').val(balance);
}


if(balance < 0)
{
  $('#balance_amt').changeClass('debt')
}



