import {useEffect, useRef} from 'react';
import * as d3 from "d3"
import {TAvailableTabs} from "../../../App";
import {Selection} from "d3";

export interface IFilterAreaProps {
  dimensions: {
    width: number
    height: number
  }
  currentSelection: TAvailableTabs
}

function getRandomHue(): number {
  return Math.ceil(Math.random() * 360)
}


function FilterArea({dimensions, currentSelection}: IFilterAreaProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current)
    let selected : Selection<SVGSVGElement, unknown, SVGSVGElement, any>;
    switch (currentSelection) {
      case "select":
        selected = svg.selectAll("g :nth-child(1)")
        break;
      case "selectAll":
        selected = svg.selectAll("g :nth-child(n)")
        break;
      case "selectEven":
        selected = svg.selectAll("g :nth-child(even)")
        break;
      case "selectOdd":
        selected = svg.selectAll("g :nth-child(odd)")
        break;
      default:
        return;
    }
    const hue = getRandomHue()
    selected.select(function (_, index) {
      const saturation = (0.25 + (index % 4) / 5) * 100
      this.style.fill = `hsl(${hue}, ${saturation}%, 50%)`
      return this;
    })

  }, [currentSelection]);

  let currentParentY = 0
  const marginParentY = 25;

  const circles = new Array(4).fill(0).map((_, index, array) => {
    const marginX = dimensions.width / array.length * 0.1
    const availableX = dimensions.width - marginX * (array.length - 1)
    const diameter = availableX / array.length
    const xPos = diameter / 2 + (diameter + marginX) * index
    const yPos = diameter / 2
    if (index === array.length - 1) currentParentY += yPos + diameter / 2 + marginParentY
    return <circle key={`circle_${index}`} r={diameter / 2} cx={xPos} cy={yPos}/>
  })

  const squares = new Array(4).fill(0).map((_, index, array) => {
    const marginX = dimensions.width / array.length * 0.1
    const availableX = dimensions.width - marginX * (array.length - 1)
    const size = availableX / array.length
    const xPos = (size + marginX) * index
    const yPos = currentParentY
    if (index === array.length - 1) currentParentY += size + marginParentY

    return <rect key={`square_${index}`} width={size} height={size} x={xPos} y={yPos}/>

  })

  const rects = new Array(4).fill(0).map((_, index) => {
    const marginY = 10
    const width = dimensions.width
    const height = 20

    const xPos = 0
    const yPos = currentParentY

    currentParentY += height + marginY

    return <rect key={`rect_${index}`} width={width} height={height} x={xPos} y={yPos}/>
  })


  return (
    <svg ref={svgRef} width={dimensions.width} height={dimensions.height}>
      <g>
        {circles}
      </g>

      <g>
        {squares}
      </g>

      <g>
        {rects}
      </g>
    </svg>
  );
}

export default FilterArea;