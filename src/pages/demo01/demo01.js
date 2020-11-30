const canvas = document.querySelector('#my-canvas');

const context = canvas.getContext('2d');

/** demo **/
context.save(); // 暂存状态
const rectSize = [100, 100];
// 平移
context.translate(-0.5 * rectSize[0], -0.5 * rectSize[1]);
context.fillStyle = 'red';
context.beginPath();
context.rect(0.5 * canvas.width, 0.5 * canvas.height, ...rectSize);
context.fill();

// 恢复
// context.translate(0.5 * rectSize[0], 0.5 * rectSize[1]);
context.restore(); // 恢复状态
