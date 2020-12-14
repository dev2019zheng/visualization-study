import rough from 'roughjs';

function createHillOption(color) {
  return { roughness: 2.8, strokeWidth: 2, fill: color };
}

const rc = rough.canvas(
  document.querySelector('.base-coordinates-system>canvas')
);
rc.path('M76 256L176 156L276 256', createHillOption('#007fff'));
rc.path('M236 256L336 156L436 256', createHillOption('#00ff00'));
rc.circle(256, 106, 105, {
  stroke: 'red',
  strokeWidth: 4,
  fill: 'rgba(255, 255, 0, 0.4)',
  fillStyle: 'solid'
});

// 坐标系变换，使之适用于数学通用坐标系
const transformRc = rough.canvas(
  document.querySelector('.transform-coordinates-system>canvas')
);
const ctx = transformRc.ctx;
ctx.translate(256, 256);
ctx.scale(1, -1);

transformRc.path('M-180 0L-80 100L20 0', createHillOption('#007fff'));
transformRc.path('M-20 0L80 100L180 0', createHillOption('#00ff00'));
transformRc.circle(0, 150, 105, {
  stroke: 'red',
  strokeWidth: 4,
  fill: 'rgba(255, 255, 0, 0.4)',
  fillStyle: 'solid'
});
