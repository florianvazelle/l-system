const deg2rad = function(degree) {
  return degree * (Math.PI / 180)
}

const randexec = function(arr) {
  var prob = [];
  var i, sum = 0;

  for (i = 0; i < arr.length - 1; i++) {
    sum += (arr[i].probability / 100.0);
    prob[i] = sum;
  }

  var r = Math.random();
  for (i = 0; i < prob.length && r >= prob[i]; i++);

  return arr[i].output;
}

export {
  randexec,
  deg2rad
}