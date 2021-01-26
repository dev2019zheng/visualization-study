import { SEGMENTS as TAU_SEGMENTS } from './ARGS_DEFINE';

const TAU = Math.PI * 2;

export default function arc(
  x0,
  y0,
  radius,
  startAng = 0,
  endAng = Math.PI * 2
) {
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
