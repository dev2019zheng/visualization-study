import { Vector2D } from '../../../js/lib/Vector2D.js';

(function () {
  const defaltP = new Vector2D(0, 100);
  const defaltQ = new Vector2D(-120, 0);
  const defaltR = new Vector2D(120, 0);

  const canvas = document.querySelector('canvas');

  if (!canvas) {
    return;
  }

  let P = defaltP,
    Q = defaltQ,
    R = defaltR;

  const bottom = new Vector2D(0, -canvas.height * 0.5),
    top = new Vector2D(0, canvas.height * 0.5),
    right = new Vector2D(canvas.height * 0.5, 0),
    left = new Vector2D(-canvas.height * 0.5, 0);

  const ctx = canvas.getContext('2d');
  ctx.translate(canvas.height * 0.5, canvas.height * 0.5);
  ctx.scale(1, -1);

  const handleMouseMove = (e) => {
    const { x, y } = e;
    var temp = new Vector2D(x - canvas.height * 0.5, canvas.height * 0.5 - y);
    const checked = $('input:radio:checked').val();
    switch (checked) {
      case 'P':
        P = temp;
        break;
      case 'Q':
        Q = temp;
        break;
      case 'R':
        R = temp;
        break;
      default:
        return;
    }
    draw();
  };

  canvas.addEventListener('mousemove', handleMouseMove);

  function initailCanvas() {
    ctx.clearRect(
      -canvas.height * 0.5,
      -canvas.height * 0.5,
      canvas.height,
      canvas.height
    );
    drawSegment(top, bottom);
    drawSegment(left, right);
  }

  function drawPointWithText(point, text) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(...point, 4, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
    ctx.scale(1, -1);
    ctx.font = '14px serif';
    ctx.fillText(
      `${text}(${point.x}, ${point.y})`,
      point.x - 18,
      -point.y + 18
    );
    ctx.restore();
  }

  function drawLine(
    p1,
    p2,
    style = {
      strokeStyle: 'rgba(255, 125, 0, 0.5)',
      dash: false,
    }
  ) {
    var dir = p1.copy().sub(p2).normalize().scale(10000);
    drawSegment(p1.copy().add(dir), p2.copy().sub(dir), style);
  }

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
      ctx.setLineDash([4, 2]);
    }
    ctx.beginPath();
    ctx.moveTo(...p1);
    ctx.lineTo(...p2);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }

  function draw() {
    initailCanvas();
    drawPointWithText(P, 'P');
    drawPointWithText(Q, 'Q');
    drawPointWithText(R, 'R');

    drawLine(Q, R);
    drawSegment(Q, R, { strokeStyle: 'blue', dash: true });
  }
  draw();
})();
