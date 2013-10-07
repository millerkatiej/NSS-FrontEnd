test("deposit", function() {
  deepEqual(deposit(20, 30), 50, "twenty plus thirty");
});

test("withdrawal", function() {
  deepEqual(withdrawal(30, 20), 10, "thirty minus twenty");
})

