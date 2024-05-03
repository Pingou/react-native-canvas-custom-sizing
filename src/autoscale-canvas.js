const scale = ratio => item => {
  if (typeof item === 'number') {
    return item * ratio;
  }
  return item;
};

/**
 * Extracted from https://github.com/component/autoscale-canvas
 * @param {Canvas} canvas 
 * @return {Canvas}
 */
window.autoScaleCanvas = function autoScaleCanvas(canvas, viewWidth, viewHeight, canvasWidth, canvasHeight) {
  var ctx = canvas.getContext('2d');
  var ratio = window.devicePixelRatio || 1;

  if (ratio != 1) {
    canvas.style.width = viewWidth + 'px';
    canvas.style.height = viewHeight + 'px';

    canvas.width = canvasWidth * ratio;
    canvas.height = canvasHeight * ratio;

    ctx.isPointInPath = function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return CanvasRenderingContext2D.prototype.isPointInPath.apply(ctx, args.map(scale(ratio)));
    };
  }

  return canvas;
};
