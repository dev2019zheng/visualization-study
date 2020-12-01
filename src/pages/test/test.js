let SIDE_LENGTH = 200; // canvas边长
let $canvass = $('#panel-26 .ring-canvas');

let $values = $('#panel-26 .values span.span-ring-value');

let $percents = $('#panel-26 .ring-figure .span-ring-percent');

let colors = [
  ['#8AABFC', '#084EFE'],
  ['#C38AFC', '#A80AFF'],
  ['#FEED9F', '#FECD06']
];

//计算圆环上点的坐标
function calcRingPoint(x, y, radius, angle) {
  let res = {};
  res.x = x + radius * Math.cos((angle * Math.PI) / 180);
  res.y = y + radius * Math.sin((angle * Math.PI) / 180);
  return res;
}
//弧度转角度
function radian2Angle(radian) {
  return (180 * radian) / Math.PI;
}
//角度转弧度
function angle2Radian(angle) {
  return (angle * Math.PI) / 180;
}

var RingItem = function (x, y, radius, thickness, canvas, colors) {
  this.total = 100;
  this.now = 0;
  this.startAngle = 0; //开始角度
  this.endAngle = 360; //结束角度
  this.radius = radius; //外环半径
  this.thickness = thickness; //圆环厚度
  this.innerRadius = this.radius - this.thickness; //内环半径
  this.x = x; //圆心x坐标
  this.y = y; //圆心y坐标
  this.canvas = canvas;
  let ctx = canvas.getContext('2d');
  this.ctx = ctx;
  //进度条颜色
  this.lingrad = this.ctx.createLinearGradient(
    0,
    0,
    SIDE_LENGTH / 2,
    SIDE_LENGTH / 2
  );
  this.lingrad.addColorStop(0, colors[0]);
  this.lingrad.addColorStop(1, colors[1]);
};
var _proto = RingItem.prototype;
_proto.reset = function () {
  // 重置
  this.canvas.width = SIDE_LENGTH;
  this.canvas.height = SIDE_LENGTH;
  this.ctx.translate(this.canvas.width * 0.5, this.canvas.height * 0.5); //将绘图原点移到画布中央
  this.ctx.rotate(angle2Radian(270)); //将画布旋转270度
  this.renderRing(this.startAngle, this.endAngle, 'rgba(12, 33, 60, 1)');
};
_proto.renderRing = function (startAngle, endAngle, fillStyle) {
  this.ctx.save();
  this.ctx.beginPath();
  this.ctx.fillStyle = fillStyle;
  //绘制外环
  this.ctx.arc(
    this.x,
    this.y,
    this.radius,
    angle2Radian(startAngle),
    angle2Radian(endAngle)
  );
  //计算外环与内环第一个连接处的中心坐标
  let oneCtrlPoint = calcRingPoint(
    this.x,
    this.y,
    this.innerRadius + this.thickness * 0.5,
    endAngle
  );
  //绘制外环与内环第一个连接处的圆环
  this.ctx.arc(
    oneCtrlPoint.x,
    oneCtrlPoint.y,
    this.thickness * 0.5,
    angle2Radian(-90),
    angle2Radian(270)
  );
  //绘制内环
  this.ctx.arc(
    this.x,
    this.y,
    this.innerRadius,
    angle2Radian(endAngle),
    angle2Radian(startAngle),
    true
  );
  //计算外环与内环第二个连接处的中心坐标
  let twoCtrlPoint = calcRingPoint(
    this.x,
    this.y,
    this.innerRadius + this.thickness * 0.5,
    startAngle
  );
  //绘制外环与内环第二个连接处的圆环
  this.ctx.arc(
    twoCtrlPoint.x,
    twoCtrlPoint.y,
    this.thickness * 0.5,
    angle2Radian(-90),
    angle2Radian(270)
  );
  this.ctx.closePath();
  this.ctx.fill();
  this.ctx.restore();
};

_proto.draw = function (total, now) {
  this.reset();
  //开始绘画
  let tempAngle = this.startAngle;
  let percent = now / total; //百分比
  if (percent > 1) {
    percent = 1;
  }
  let twoEndAngle = percent * 360 + this.startAngle;
  let step = (twoEndAngle - this.startAngle) / 40;
  let inter = setInterval(() => {
    if (tempAngle > twoEndAngle) {
      clearInterval(inter);
    } else {
      tempAngle += step;
    }
    this.renderRing(this.startAngle, tempAngle, this.lingrad);
  }, 20);
};

let rings = $.map($canvass, function ($c, i) {
  let ring = new RingItem(0, 0, 100, 20, $c, colors[i]);
  ring.reset();
  return ring;
});

function fetchData() {
  return new Promise((resolve) => {
    setTimeout(function () {
      resolve([
        {
          rate: 103.38,
          value: 10480.17
        },
        {
          rate: 89.34,
          value: 8407.37
        },
        {
          rate: 57.58,
          value: 175.63
        }
      ]);
    });
  });
}

function handleData(data) {
  var _d = data || [];
  for (let i = 0; i < 3; i++) {
    $values[i].innerText = _d[i].value.toFixed(0);
    $percents[i].innerText = _d[i].rate.toFixed(0) + '%';
    rings[i].draw(100, _d[i].rate.toFixed(0));
  }
}
var renderclData = async function () {
  var data = await fetchData();
  handleData(data);
};
renderclData();
