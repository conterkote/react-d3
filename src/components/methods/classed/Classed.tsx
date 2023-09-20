import {useEffect, useRef} from 'react';
import * as d3 from "d3"
import "./index.css"

export interface IClassedProps {
  dimensions: {
    width: number
    height: number
  }
}

function Classed({dimensions}: IClassedProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  useEffect( () => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current)
    const grayClassed = svg
      .selectAll('line')
      .classed("gray", true)
      .classed("half-opacity", true)
      .classed("half-opacity", false)
    console.log(grayClassed)
  }, []);

  const lines = new Array(5).fill(0).map((_, index) => {
    const x1 = 0
    const x2 = 200
    const y1 = index * 20 + 10
    const y2 = index * 20 + 10
    return <line key={index} x1={x1} y1={y1} x2={x2} y2={y2} className={index % 2 === 0 ? "gray" : undefined} />
  })

  return (
    <>
      <svg ref={svgRef} width={dimensions.width} height={dimensions.height}>
        {lines}
      </svg>
    </>
  );
}

export default Classed;