# svg-print-preview.js
Display the print preview of the SVG in the browser, such as for printing forms.

## How to use
### a single page
```js
const svg = "<svg>...</svg>";
const preview = new SVGPrintPreview({ pageSize: "A4", orientation: "portrait" });
preview.setSVGs(svg);
```
### multiple pages
```js
const page1 = "<svg>...</svg>";
const page2 = "<svg>...</svg>";
const preview = new SVGPrintPreview({ pageSize: "A4", orientation: "portrait" });
preview.setSVGs([page1,page2]);
```

## Sample
[sample.html](./sample.html)

## License
The source code is licensed MIT.