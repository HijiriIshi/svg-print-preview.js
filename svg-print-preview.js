/*!
 * svg-print-preview.js v0.1.0-dev
 * Copyright (c) HijiriIshi
 * Released under the MIT License
 * https://github.com/HijiriIshi/svg-print-preview.js
 *
 * @author HijiriIshi
 * @version 0.1.0-dev
 * @license MIT
 * @since 2025-02-07
 */
class SVGPrintPreview {
  constructor(options = {}) {
    this.pageSize = options.pageSize || 'A4'; // A4 or B5
    this.orientation = options.orientation || 'portrait'; // portrait or landscape
    this.margin = options.margin || 10; // mm
    this.svgs = [];
  }

  setSVGs(svgs) {
    this.svgs = Array.isArray(svgs) ? svgs : [svgs];
    this.#renderPreview();
  }

  getPageDimensions() {
    const sizes = {
      A4: { width: 210, height: 297 },
      B5: { width: 176, height: 250 },
    };
    let { width, height } = sizes[this.pageSize] || sizes.A4;
    if (this.orientation === 'landscape') {
      [width, height] = [height, width];
    }
    return { width, height };
  }

  #scaleSVG(svg, maxWidth, maxHeight) {
    const svgElement = new DOMParser().parseFromString(svg, 'image/svg+xml').documentElement;
    const viewBox = svgElement.getAttribute('viewBox')?.split(' ').map(Number)
      || [0, 0, svgElement.getAttribute('width') || 100, svgElement.getAttribute('height') || 100]; // viewbox or width-height
    const [x, y, w, h] = viewBox;
    const scale = Math.min((maxWidth - this.margin * 2) / w, (maxHeight - this.margin * 2) / h);
    return { svgElement, scale, x, y, w, h };
  }

  #renderPreview() {
    const { width, height } = this.getPageDimensions();
    const newWindow = window.open('', '_blank');
    newWindow.document.write('<html><head><title>Print Preview</title></head><body></body></html>');

    this.svgs.forEach(svg => {
      const page = document.createElement("div");
      page.setAttribute("style", `width: ${width}mm; height: ${height}mm; display: flex;break-before: always; align-items: center; justify-content: center; overflow: hidden; background: white;`);
      const { svgElement, scale, x, y, w, h } = this.#scaleSVG(svg, width, height);
      svgElement.setAttribute('width', `${w * scale}mm`);
      svgElement.setAttribute('height', `${h * scale}mm`);
      svgElement.setAttribute('viewBox', `${x} ${y} ${w} ${h}`);
      page.appendChild(svgElement);
      newWindow.document.body.appendChild(page);
    });
    
    newWindow.document.close();
    newWindow.print();
  }
}
