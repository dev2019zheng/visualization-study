/**
 * @author dev2019zheng
 * @description 生成正n边形顶点左边数组
 * @param {number} x 中心x坐标
 * @param {number} y 中心y坐标
 * @param {number} r 半径
 * @param {number} n 定点数
 */
export function createPolygonVertexArray(x, y, r, n) {
  if (n < 3) {
    return new Float32Array([]);
  }
  const positionArray = [];

  const sin = Math.sin;
  const cos = Math.cos;

  const piceAngle = (2 * Math.PI) / n;

  let angle = Math.PI * 0.5,
    i = 0;

  if (n % 2 === 0) {
    angle = angle - piceAngle * 0.5;
  }
  for (; i < n; i++) {
    const dx = x + r * cos(angle);
    const dy = y + r * sin(angle);
    positionArray.push(dx, dy);
    angle += piceAngle;
  }

  return new Float32Array(positionArray);
}
