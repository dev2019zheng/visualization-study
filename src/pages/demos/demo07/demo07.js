import { Vector2D } from '../../../js/lib/Vector2D.js';

(function () {
  const defaltP = new Vector2D(0, 100);
  const defaltQ = new Vector2D(-120, 0);
  const defaltR = new Vector2D(120, 0);
  const $dist1 = $('#dist1');
  const $dist2 = $('#dist2');
  const canvas = document.querySelector('canvas');

  if (!canvas) {
    return;
  }

  let OP = defaltP,
    OQ = defaltQ,
    OR = defaltR;

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
        OP = temp;
        break;
      case 'Q':
        OQ = temp;
        break;
      case 'R':
        OR = temp;
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

  function draw() {
    initailCanvas();
    drawPointWithText(OP, 'P');
    drawPointWithText(OQ, 'Q');
    drawPointWithText(OR, 'R');
    drawLine(OQ, OR);
    drawSegment(OQ, OR, { strokeStyle: 'blue', dash: true });

    let QR = OR.copy().sub(OQ),
      QP = OP.copy().sub(OQ),
      normalizeQR = QR.copy().normalize(),
      cosPQR = QP.dot(QR) / (QP.len * QR.len),
      QN = normalizeQR.scale(QP.len * cosPQR),
      ON = OQ.copy().add(QN);

    drawPointWithText(ON, 'N');

    // P到直线QR的距离
    $dist2.text(ON.copy().sub(OP).len);
    drawSegment(OP, ON, { strokeStyle: 'green', dash: false, width: 2 });

    // P到线段QR的距离
    let temp;
    if (cosPQR < 0) {
      // Q左侧
      temp = OQ;
    } else if (QN.len <= QR.len) {
      // QR内部
      temp = ON;
    } else {
      // R右侧
      temp = OR;
    }
    $dist1.text(temp.copy().sub(OP).len);
    drawSegment(OP, temp, { strokeStyle: 'red', dash: true });
  }
  draw();
})();
