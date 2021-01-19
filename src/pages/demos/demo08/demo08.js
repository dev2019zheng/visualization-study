import { Vector2D } from '../../../js/lib/Vector2D.js';

const canvas = document.querySelector('canvas');

const ctx = canvas.getContext('2d');
ctx.translate(canvas.height * 0.5, canvas.height * 0.5);
ctx.scale(1, -1);

function drawSegment(
  p1,
  p2,
  style = {
    strokeStyle: 'rgba(100, 100, 100, 0.2)',
    dash: true,
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
drawSegment([-canvas.height * 0.5, 0], [canvas.height * 0.5, 0]);
drawSegment([0, -canvas.height * 0.5], [0, canvas.height * 0.5]);

function regularShape(edges = 3, x, y, step) {
  const ret = [];
  const delta = Math.PI * (1 - (edges - 2) / edges);
  let p = new Vector2D(x, y);
  const dir = new Vector2D(step, 0);
  ret.push(p);
  for (let i = 0; i < edges; i++) {
    p = p.copy().add(dir.rotate(delta));
    ret.push(p);
  }
  return ret;
}

function draw(arrs) {
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(...arrs[0]);
  for (var i = 1; i < arrs.length; i++) {
    const p = arrs[i];
    ctx.lineTo(...p);
  }
  ctx.closePath();
  ctx.stroke();
  ctx.restore();
}

draw(regularShape(3, 128, 128, 100)); // 绘制三角形
draw(regularShape(6, -64, 128, 50)); // 绘制六边形
draw(regularShape(11, -64, -64, 30)); // 绘制十一边形
draw(regularShape(60, 128, -64, 6)); // 绘制六十边形
