module.exports = function(number) {
  var r = String(number);
  if (r.length === 1) {
    r = '0' + r;
  }
  return r;
}
