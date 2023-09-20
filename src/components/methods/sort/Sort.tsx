import {useEffect, useRef} from 'react';
import * as d3 from "d3"

export interface ISortProps {
  dimensions: {
    width: number
    height: number
  }
}

function Template({dimensions}: ISortProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const prevXPos = useRef<undefined | number>(undefined)
  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current)
    const div = d3.select("#paragraphs")
    div
      .selectAll("p")
      .datum(function () {
        if (!this) return;
        return (this as HTMLParagraphElement).innerText
      })
      .sort((a, b) => Number(a) - Number(b))

    svg
      .selectAll("circle")
      .datum(function () {
        if (!this) return;
        return d3.select(this).attr("r");
      })
      .sort((a, b) => Number(b) - Number(a))
      .attr("cx", function (datum, i) {
        const previousXPos = (prevXPos.current && i === 0) ? 0 : Number(prevXPos.current)
        const currentXPos = previousXPos + Number(datum) + 10
        prevXPos.current = currentXPos + Number(datum)
        return currentXPos
      })
      // .sort((a, b) => Number(a) - Number(b))
  }, []);

  const circles = new Array(5).fill(0).map((_) => {
    const min = 10
    const max = 30
    const radius = min + (Math.floor(Math.random() * (max - min)))
    console.log(radius)
    const previousXPos = prevXPos.current ? prevXPos.current : 0
    const currentX = previousXPos + radius + 10
    prevXPos.current = currentX + (radius)
    return <circle cx={currentX} cy={40} r={radius} />
  })

  return (
    <>
      <div id={`paragraphs`}>
        <p>4</p>
        <p>2</p>
        <p>5</p>
        <p>3</p>
        <p>1</p>
      </div>
      <svg ref={svgRef} width={dimensions.width} height={dimensions.height}>
        {circles}
      </svg>
    </>
  );
}

export default Template;