import { SEGMENTS as LINE_SEGMENTS } from './ARGS_DEFINE';

export default function parabola(x0, y0, p, min, max) {
  const ret = [];
  for (let i = 0; i <= LINE_SEGMENTS; i++) {
    const s = i / 60;
    const t = min * (1 - s) + max * s;
    const x = x0 + 2 * p * t ** 2;
    const y = y0 + 2 * p * t;
    ret.push([x, y]);
  }
  return ret;
}
