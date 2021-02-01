import bg from '@/assets/img/tank.png';
import { Vector2D } from '@/js/lib/Vector2D.js';
import { count } from 'd3';
import { arc, draw, drawSegment } from '../../../js/tank-lib.js';

// $('.tank-img').css('background', `url("${bg}") 50% 50% no-repeat`);

const data = Math.max(Math.random() * 100, 0);

console.log('====================================');
console.log('loading', data);
console.log('====================================');
// 计算半圆
const SPACE = 6;
const INNER_RADIUS = 68;
const INNER_RECT_LENGTH = 208;
const TANK_COLOR = '#6D8499';

const canvas = document.querySelector('canvas');

const ctx = canvas.getContext('2d');
ctx.translate(canvas.width * 0.5, canvas.height * 0.5 + 30);
ctx.scale(1, -1);
const zero = new Vector2D(0, 0);
console.log(zero);
const bottom = new Vector2D(0, -canvas.height),
  top = new Vector2D(0, canvas.height),
  right = new Vector2D(canvas.width, 0),
  left = new Vector2D(-canvas.width, 0);

// 半圆移动距离
const padd1 = INNER_RECT_LENGTH * 0.5;
const l_d = new Vector2D(-padd1, 0);
const r_d = new Vector2D(padd1, 0);

// 矩形上下边
const t_d = new Vector2D(0, -INNER_RADIUS);
const b_d = new Vector2D(0, INNER_RADIUS);

const arrs = arc(0, 0, INNER_RADIUS, -Math.PI * 0.5, Math.PI * 1.5);
const arrs1 = arc(0, 0, INNER_RADIUS + SPACE, -Math.PI * 0.5, Math.PI * 1.5);

const lingrad = ctx.createLinearGradient(0, INNER_RADIUS, 0, -INNER_RADIUS);
lingrad.addColorStop(0, 'rgba(186, 217, 240, 1)');
lingrad.addColorStop(1, 'rgba(186, 217, 240, 0.4)');

const innerRightCircle = arrs
  .slice(0, ~~(arrs.length * 0.5))
  .map((x) => new Vector2D(...x).add(r_d));
const innerLeftCircle = arrs
  .slice(~~(arrs.length * 0.5))
  .map((x) => new Vector2D(...x).add(l_d));

const outterRightCircle = arrs1
  .slice(0, ~~(arrs1.length * 0.5))
  .map((x) => new Vector2D(...x).add(r_d));
const outterLeftCircle = arrs1
  .slice(~~(arrs1.length * 0.5))
  .map((x) => new Vector2D(...x).add(l_d));

const innerArrs = [...innerRightCircle, ...innerLeftCircle];
const outterArrs = [...outterRightCircle, ...outterLeftCircle];

const p1 = new Vector2D(6 - INNER_RECT_LENGTH * 0.5, INNER_RADIUS + SPACE);
const arr1 = [
  p1,
  p1.copy().add(new Vector2D(0, 60)),
  p1.copy().add(new Vector2D(56, 60)),
  p1.copy().add(new Vector2D(56, 0))
];

const d1 = SPACE;
const p2 = new Vector2D(24 - INNER_RECT_LENGTH * 0.5, INNER_RADIUS + SPACE);
const arr2 = [
  p2,
  p2.copy().addv(0, 25),
  p2.copy().addv(10, 25),
  p2.copy().addv(10, 0),
  p2.copy().addv(7, 0),
  p2.copy().addv(7, -INNER_RADIUS + 12),
  p2.copy().addv(10, -INNER_RADIUS + 12),
  p2.copy().addv(10, -INNER_RADIUS - 12),
  p2.copy().addv(7, -INNER_RADIUS - 12),
  p2.copy().addv(7, -INNER_RADIUS * 2 - d1 + 30),
  p2.copy().addv(10, -INNER_RADIUS * 2 - d1 + 30),
  p2.copy().addv(10, -INNER_RADIUS * 2 - d1 + 10),
  p2.copy().addv(7, -INNER_RADIUS * 2 - d1 + 10),
  p2.copy().addv(7, -INNER_RADIUS * 2 - d1),
  p2.copy().addv(3, -INNER_RADIUS * 2 - d1),
  p2.copy().addv(3, -INNER_RADIUS * 2 - d1 + 10),
  p2.copy().addv(0, -INNER_RADIUS * 2 - d1 + 10),
  p2.copy().addv(0, -INNER_RADIUS * 2 - d1 + 30),
  p2.copy().addv(3, -INNER_RADIUS * 2 - d1 + 30),
  p2.copy().addv(3, -INNER_RADIUS - 12),
  p2.copy().addv(0, -INNER_RADIUS - 12),
  p2.copy().addv(0, -INNER_RADIUS + 12),
  p2.copy().addv(3, -INNER_RADIUS + 12),
  p2.copy().addv(3, 0)
];
const p3 = new Vector2D(44 - INNER_RECT_LENGTH * 0.5, INNER_RADIUS + SPACE);
const arr3 = [
  p3,
  p3.copy().addv(0, 25),
  p3.copy().addv(6, 25),
  p3.copy().addv(6, 0)
];
const p4 = arr1[2].copy().addv(0, -13);
const arr4 = [
  p4,
  p4.copy().addv(66, 0),
  p4.copy().addv(66, -18),
  p4.copy().addv(65, -18),
  p4.copy().addv(65, -1),
  p4.copy().addv(0, -1)
];
const p5 = arr1[3].copy().addv(50, 0);
const arr5 = [
  p5,
  p5.copy().addv(0, 30),
  p5.copy().addv(10, 30),
  p5.copy().addv(10, 44),
  p5.copy().addv(20, 44),
  p5.copy().addv(20, 30),
  p5.copy().addv(30, 30),
  p5.copy().addv(30, 0)
];

function initailCanvas() {
  ctx.clearRect(
    -canvas.width,
    -canvas.height,
    canvas.width * 2,
    canvas.height * 2
  );
  drawSegment(ctx, top, bottom); // y
  drawSegment(ctx, left, right); // x
  drawSegment(ctx, top.copy().add(r_d), bottom.copy().add(r_d));
  drawSegment(ctx, top.copy().add(l_d), bottom.copy().add(l_d));

  drawSegment(ctx, left.copy().add(t_d), right.copy().add(t_d));
  drawSegment(ctx, left.copy().add(b_d), right.copy().add(b_d));
}

function drawTank(data) {
  initailCanvas();
  // 计算液体比例
  const _liquidHeight = INNER_RADIUS * 2 * data * 0.01 - INNER_RADIUS;
  const liquidRight = innerRightCircle.filter((x) => x.y <= _liquidHeight);
  const liquidLeft = innerLeftCircle.filter((x) => x.y <= _liquidHeight);
  const liquidArrs = [...liquidRight, ...liquidLeft];
  draw(ctx, arr2, TANK_COLOR, 2, TANK_COLOR);

  // 最终画稿
  draw(ctx, liquidArrs, 'rgba(0,0,0,0)', 2, lingrad);
  draw(ctx, innerArrs, TANK_COLOR, 2);
  draw(ctx, outterArrs, TANK_COLOR, 2);
  // 上部元件
  draw(ctx, arr1, TANK_COLOR, 2);
  draw(ctx, arr3, '#009A3B', 1, '#009A3B');
  draw(ctx, arr5, TANK_COLOR, 2, '#ffffff');
  draw(ctx, arr4, '#2C98EE', 2, '#2C98EE');
  draw(
    ctx,
    arr3
      .map((x) => x.copy().addv(80.5, -SPACE))
      .map((x, i) => (i === 1 || i === 2 ? x.addv(0, 2.5 + SPACE) : x)),
    '#009A3B',
    1,
    '#009A3B'
  );
  draw(
    ctx,
    arr1.map((x) => x.copy().addv(146, 0)),
    TANK_COLOR,
    2
  );
  draw(
    ctx,
    arr3
      .map((x) => x.copy().addv(140, 0))
      .map((x, i) => (i === 1 || i === 2 ? x.addv(0, -13.5) : x))
      .map((x, i) => (i > 1 ? x.addv(3, 0) : x)),
    '#009A3B',
    1,
    '#009A3B'
  );
  drawSegment(ctx, new Vector2D(85, 86), new Vector2D(85, 110), {
    strokeStyle: '#009A3B',
    dash: false
  });
  drawSegment(ctx, new Vector2D(77, 110), new Vector2D(115, 110), {
    strokeStyle: TANK_COLOR,
    dash: false,
    width: 0.6
  });
  drawSegment(ctx, new Vector2D(77, 114), new Vector2D(115, 114), {
    strokeStyle: TANK_COLOR,
    dash: false,
    width: 0.6
  });
}

drawTank(data);
