$(document).ready(function () {
  var steps = 4096;
  (function () {
    var $drawTarget = $('#draw-target'),
      divs = '',
      i,
      bars,
      x = 0;

    /**
     *
     * @param {Number} ang 正弦波的开始角度
     * @param {Number} freq 正弦波的频率，定义了波的“紧密度”
     * @param {Number} height 正弦波的幅度，也影响画线的宽度
     */
    var drawGraph = function (ang, freq, height) {
      var height2 = height * 2;
      for (var i = 0; i < 480; i++) {
        bars[i].style.top =
          160 -
          height +
          Math.sin(((ang + i * freq) / steps) * Math.PI * 2) * height +
          'px';
        bars[i].style.height = height2 + 'px';
      }
    };

    for (i = 0; i < 480; i++) {
      divs += `<div style="left:${i}px" ></div>`;
    }
    $drawTarget.append(divs);
    bars = $drawTarget.children();

    const start = function () {
      drawGraph(
        x * 50,
        32 - Math.sin(((x * 20) / steps) * Math.PI * 2) * 16,
        50 - Math.sin(((x * 10) / steps) * Math.PI * 2) * 20,
        x++
      );
      requestAnimationFrame(start);
    };

    requestAnimationFrame(start);
  })();
});
