// https://observablehq.com/@veltman/watercolor@551
import define1 from "./e93997d5089d7165@2303.js";

function _1(md){return(
md`# Watercolor

Some pseudo-watercolor effects with blurs, thresholds, and fractal noise.`
)}

function _2(DOM,d3,noise,blur,states,strokeWidth,drawMesh,mesh,spline,blurScale)
{
  const svg = DOM.svg(960, 600);

  const defs = d3
    .select(svg)
    .attr("class", "watercolor")
    .append("defs");

  const splotch = DOM.uid("splotch");

  const path = d3.geoPath();

  defs
    .append("filter")
    .attr("id", splotch.id)
    .html(
      `${
        noise
          ? `<feTurbulence
        type="fractalNoise"
        baseFrequency="${noise}"
        numOctaves="4"
    ></feTurbulence>
    <feColorMatrix
        values="0 0 0 0 0, 0 0 0 0 0, 0 0 0 0 0, 0 0 0 -0.9 1.2"
        result="texture"
    ></feColorMatrix>
    <feComposite
        in="SourceGraphic"
        in2="texture"
        operator="in"
    ></feComposite>`
          : ``
      }<feGaussianBlur stdDeviation="${blur}"></feGaussianBlur>`
    );

  // Generate Observable-friendly IDs
  states.forEach((d, i) => {
    d.filterUid = DOM.uid("filter" + i);
  });

  const groups = d3
    .select(svg)
    .selectAll(".state")
    .data(states)
    .enter()
    .append("g")
    .attr("class", "state")
    .attr("filter", splotch);

  const paths = groups
    .append("path")
    .attr("d", path)
    .attr("fill", d => d.properties.color)
    .attr("stroke", d => d.properties.color)
    .attr("stroke-width", strokeWidth)
    .attr("filter", d => d.filterUid);

  if (drawMesh) {
    const pencil = DOM.uid("pencil");
    defs.append("filter").attr("id", pencil.id)
      .html(`<feTurbulence baseFrequency="0.03" numOctaves="6" type="fractalNoise" />
      <feDisplacementMap scale="4" in="SourceGraphic" xChannelSelector="R" yChannelSelector="G" />
      <feGaussianBlur stdDeviation="0.5" />`);

    d3.select(svg)
      .append("g")
      .attr("class", "mesh")
      .attr("filter", pencil)
      .append("path")
      .attr("d", mesh.map(spline).join(""));
  }

  defs
    .selectAll(".state")
    .data(states)
    .enter()
    .append("filter")
    .attr("id", d => d.filterUid.id)
    .html(
      d =>
        `<feGaussianBlur
         in="SourceGraphic"
         stdDeviation="${blurScale(path.area(d))}"
         result="blur"
     ></feGaussianBlur>
     <feColorMatrix
         in="blur"
         type="matrix"
         values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
         result="threshold"
     ></feColorMatrix>
     <feComposite
         in="SourceGraphic"
         in2="threshold"
         operator="atop"
     ></feComposite>`
    );

  return svg;
}


function _randomize(button){return(
button("Randomize colors")
)}

function _palette(select){return(
select({
  title: "Color palette",
  options: [
    "Wes Anderson",
    "Blues",
    "verena",
    "iiso_daily",
    "iiso_zeitung",
    "present-correct",
    "rag-taj",
    "rag-mysore"
  ]
})
)}

function _drawMesh(checkbox){return(
checkbox([
  { value: "drawMesh", label: "Draw pencil outlines" }
])
)}

function _deviation(slider){return(
slider({
  min: 0,
  max: 5,
  step: 0.5,
  value: 2,
  title: "Shape deviation"
})
)}

function _strokeWidth(slider){return(
slider({
  min: 0,
  max: 8,
  step: 0.1,
  value: 3.5,
  title: "Stroke width"
})
)}

function _blur(slider){return(
slider({
  min: 0,
  max: 5,
  step: 0.1,
  value: 0.8,
  title: "Outer blur amount"
})
)}

function _noise(slider){return(
slider({
  min: 0,
  max: 0.03,
  value: 0.01,
  precision: 3,
  title: "Fractal noise"
})
)}

function _10(md){return(
md`## See also
[Oil paint](https://observablehq.com/@veltman/scribble-paint)  
[Pencil/watercolor map style](https://bl.ocks.org/veltman/2f2aa947772afa095a620dfe5e5486cb)  
[Tyler Hobbs' generative watercolor](https://tylerxhobbs.com/essays/2017/a-generative-approach-to-simulating-watercolor-paints)
`
)}

function _11(md){return(
md`## Appendix`
)}

function _simplification(){return(
1.8
)}

function _tension(){return(
0.6
)}

function _blurScale(d3,deviation){return(
d3
  .scaleLinear()
  .domain([0, 2000])
  .range([deviation, deviation * 3.5])
  .clamp(true)
)}

function _spline(d3,tension){return(
d3.line().curve(d3.curveCardinal.tension(tension))
)}

function _palettes(){return(
{
  "Wes Anderson": ["#ff4848", "#00cdb1", "#ffc638", "#ffa641", "#a0d8e7"],
  Blues: ["#0c96da", "#be98ad", "#77d7e3", "#f4cdcd", "#01ccd9", "#f4e2c6"],
  "rag-taj": ["#73d5c1", "#e29ba0", "#ba1e6b", "#ffbe45"],
  "rag-mysore": ["#e8ac52", "#639aa0", "#ec6c26", "#613a53"],
  iiso_zeitung: ["#f3df76", "#00a9c0", "#f7ab76", "#ee8067"],
  "present-correct": ["#fe7646", "#ffbb51", "#7356ac", "#fe737a", "#a0ccbb"],
  verena: ["#936ead", "#3e78e1", "#f37265", "#f6bc25", "#16b069"],
  iiso_daily: ["#7f8cb6", "#f0d967", "#ef9640", "#1daeb1", "#e76c4a"]
}
)}

function _states(randomize,topojson,us,d3,palettes,palette)
{
  randomize;
  const states = topojson.feature(us, us.objects.states).features;
  const neighbors = topojson.neighbors(us.objects.states.geometries);
  const colors = d3.shuffle(palettes[palette].slice(0));

  states.forEach((d, i) => {
    const color =
      colors.find(
        c => !neighbors[i].some(n => states[n].properties.color === c)
      ) || colors[0];

    colors.push(colors.shift());

    d.properties.color = color;
  });

  return states;
}


function _mesh(topojson,us,simplify,simplification)
{
  return topojson
    .mesh(us, us.objects.states)
    .coordinates.map(line =>
      simplify(line.map(d => ({ x: d[0], y: d[1] })), simplification, true).map(
        d => [d.x, d.y]
      )
    );
}


async function _us(d3){return(
await d3.json("https://unpkg.com/us-atlas@1/us/10m.json")
)}

function _simplify(require){return(
require("simplify-js@1")
)}

function _d3(require){return(
require("d3@5")
)}

function _topojson(require){return(
require("topojson-client@3")
)}

function _24(html){return(
html`<style>
  .watercolor * {
    mix-blend-mode: multiply;
  }
  .mesh {
    stroke: #777;
    fill: none;
    opacity: 0.8;
    stroke-width: 2px;
    stroke-linejoin: round;
  }
  .watercolor {
    width: 100%;
    height: auto;
  }
</style>`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["DOM","d3","noise","blur","states","strokeWidth","drawMesh","mesh","spline","blurScale"], _2);
  main.variable(observer("viewof randomize")).define("viewof randomize", ["button"], _randomize);
  main.variable(observer("randomize")).define("randomize", ["Generators", "viewof randomize"], (G, _) => G.input(_));
  main.variable(observer("viewof palette")).define("viewof palette", ["select"], _palette);
  main.variable(observer("palette")).define("palette", ["Generators", "viewof palette"], (G, _) => G.input(_));
  main.variable(observer("viewof drawMesh")).define("viewof drawMesh", ["checkbox"], _drawMesh);
  main.variable(observer("drawMesh")).define("drawMesh", ["Generators", "viewof drawMesh"], (G, _) => G.input(_));
  main.variable(observer("viewof deviation")).define("viewof deviation", ["slider"], _deviation);
  main.variable(observer("deviation")).define("deviation", ["Generators", "viewof deviation"], (G, _) => G.input(_));
  main.variable(observer("viewof strokeWidth")).define("viewof strokeWidth", ["slider"], _strokeWidth);
  main.variable(observer("strokeWidth")).define("strokeWidth", ["Generators", "viewof strokeWidth"], (G, _) => G.input(_));
  main.variable(observer("viewof blur")).define("viewof blur", ["slider"], _blur);
  main.variable(observer("blur")).define("blur", ["Generators", "viewof blur"], (G, _) => G.input(_));
  main.variable(observer("viewof noise")).define("viewof noise", ["slider"], _noise);
  main.variable(observer("noise")).define("noise", ["Generators", "viewof noise"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _10);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer("simplification")).define("simplification", _simplification);
  main.variable(observer("tension")).define("tension", _tension);
  main.variable(observer("blurScale")).define("blurScale", ["d3","deviation"], _blurScale);
  main.variable(observer("spline")).define("spline", ["d3","tension"], _spline);
  main.variable(observer("palettes")).define("palettes", _palettes);
  main.variable(observer("states")).define("states", ["randomize","topojson","us","d3","palettes","palette"], _states);
  main.variable(observer("mesh")).define("mesh", ["topojson","us","simplify","simplification"], _mesh);
  main.variable(observer("us")).define("us", ["d3"], _us);
  main.variable(observer("simplify")).define("simplify", ["require"], _simplify);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  main.variable(observer("topojson")).define("topojson", ["require"], _topojson);
  const child1 = runtime.module(define1);
  main.import("checkbox", child1);
  main.import("button", child1);
  main.import("select", child1);
  main.import("slider", child1);
  main.variable(observer()).define(["html"], _24);
  return main;
}
