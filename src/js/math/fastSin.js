export function fastSin(steps) {
  var table = [],
    ang = 0,
    angStep = (Math.PI * 2) / steps;
  do {
    table.push(Math.sin(ang));
    ang += angStep;
  } while (ang <= Math.PI * 2);
  return table;
}
