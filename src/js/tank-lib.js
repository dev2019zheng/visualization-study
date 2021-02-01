const TAU = Math.PI * 2;
const TAU_SEGMENTS = (1 << 8) - 1;

export function arc(x0, y0, radius, startAng = 0, endAng = Math.PI * 2) {
  const ang = Math.min(TAU, endAng - startAng);
  const ret = ang === TAU ? [] : [[x0, y0]];
  const segments = Math.round((TAU_SEGMENTS * ang) / TAU);
  for (let i = 0; i <= segments; i++) {
    const x = x0 + radius * Math.cos(startAng + (ang * i) / segments);
    const y = y0 + radius * Math.sin(startAng + (ang * i) / segments);
    ret.push([x, y]);
  }
  return ret;
}

export function draw(
  ctx,
  points,
  strokeStyle = 'black',
  strokeWidth = 1,
  fillStyle = null
) {
  ctx.save();
  ctx.strokeStyle = strokeStyle;
  ctx.lineWidth = strokeWidth;
  ctx.beginPath();
  ctx.moveTo(...points[0]);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(...points[i]);
  }
  ctx.closePath();
  if (fillStyle) {
    ctx.fillStyle = fillStyle;
    ctx.fill();
  }
  ctx.stroke();
  ctx.restore();
}

export function drawSegment(
  ctx,
  p1,
  p2,
  style = {
    strokeStyle: 'rgba(100, 100, 100, 0.2)',
    dash: true
  }
) {
  ctx.save();
  ctx.strokeStyle = style.strokeStyle;
  if (style.dash) {
    ctx.setLineDash([4, 3]);
  }
  if (style.width) {
    ctx.lineWidth = style.width;
  }
  ctx.beginPath();
  ctx.moveTo(...p1);
  ctx.lineTo(...p2);
  ctx.closePath();
  ctx.stroke();
  ctx.restore();
}
