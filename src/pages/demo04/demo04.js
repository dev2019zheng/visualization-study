import { createPolygonVertexArray } from '../../js/lib/polygon-tools';

const canvas = document.querySelector('#my-canvas');

const gl = canvas.getContext('webgl');

// WebGLProgram
// 顶点着色器（Vertex Shader）
const vertex = `
  attribute vec2 position;
  varying vec3 color;

  void main() {
    gl_PointSize = 1.0;
    color = vec3(0.5 + position * 0.5, 0.5);
    gl_Position = vec4(position, 1.0, 1.0);
  }
`;
// 片元着色器（Fragment Shader）
const fragment = `
  precision mediump float;
  varying vec3 color;
  void main()
  {
    gl_FragColor = vec4(color, 1.0);
  }    
`;

const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vertex);
gl.compileShader(vertexShader);

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fragment);
gl.compileShader(fragmentShader);

const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);

gl.useProgram(program);
let count = 3;
let points = createPolygonVertexArray(0, 0, 1, count);
const bufferId = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);

// gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);

const vPosition = gl.getAttribLocation(program, 'position');
// 获取顶点着色器中的position变量的地址;
gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
// 给变量设置长度和类型;
gl.enableVertexAttribArray(vPosition);
// 激活这个变量;

// gl.clear(gl.COLOR_BUFFER_BIT);
// gl.drawArrays(gl.TRIANGLE_FAN, 0, points.length / 2);

drawPolygon(count);

function drawPolygon(n) {
  $('.count').text(`[ count: ${n} ]`);
  points = createPolygonVertexArray(0, 0, 1, n);
  gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLE_FAN, 0, points.length / 2);
}

$('.decrease').on('click', function () {
  drawPolygon(--count);
});
$('.increase').on('click', function () {
  drawPolygon(++count);
});
