import rough from 'roughjs';

function createHillOption(color) {
  return { roughness: 2.8, strokeWidth: 2, fill: color };
}

const rc = rough.canvas(document.querySelector('canvas'));
rc.path('M76 256L176 156L276 256', createHillOption('#007fff'));
rc.path('M236 256L336 156L436 256', createHillOption('#00ff00'));
rc.circle(256, 106, 105, {
  stroke: 'red',
  strokeWidth: 4,
  fill: 'rgba(255, 255, 0, 0.4)',
  fillStyle: 'solid',
});
