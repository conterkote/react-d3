import {useEffect, useRef} from 'react';
import * as d3 from "d3"

export interface IBarChartProps {
  dimensions: {
    width: number
    height: number
  }
}

function BarChart({dimensions}: IBarChartProps) {
  const svg1Ref = useRef<SVGSVGElement>(null)
  const svg2Ref = useRef<SVGSVGElement>(null)
  useEffect( () => {
    if (!svg2Ref.current || !svg1Ref.current) return;
    const leftSvg = d3.select(svg1Ref.current)
    const rightSvg = d3.select(svg2Ref.current)
    const leftCircles = leftSvg.selectAll("circle")
    const rightCircles = rightSvg.selectAll("circle")

    const leftOddCircles = leftCircles.select(function (_, index) {
      if (index % 2 === 0) {
        const circleSvgElement = this as SVGCircleElement
        circleSvgElement.style.fill = "indianred"
        return this
      } else {
        return null
      }
    })

    const leftEvenCircles = leftCircles.select(function (_, index) {
      if (index % 2 === 0) {
        return null
      } else {
        const circleSvgElement = this as SVGCircleElement
        circleSvgElement.style.fill = "#5cbddc"
        return this
      }
    })
    console.log(leftOddCircles)
    console.log(leftEvenCircles)

    const leftWithoutSecondElement = leftCircles.select(function (_, index) {
      return index === 1 ? null : this
    })
    const leftMergedCircles = leftOddCircles.merge(leftEvenCircles)
    const mergedFirstSecond = leftWithoutSecondElement.merge(rightCircles)
    console.log("mFS", mergedFirstSecond)
    console.log(leftMergedCircles)
  }, []);


  return (
    <>
      <svg ref={svg1Ref} width={dimensions.width} height={dimensions.height}>
        <circle r={25} cx={50} cy={50}/>
        <circle r={25} cx={125 - 20} cy={50}/>
        <circle r={25} cx={200 - 20 * 2} cy={50}/>
        <circle r={25} cx={275 - 20 * 3} cy={50}/>
      </svg>
      <svg ref={svg2Ref} width={dimensions.width} height={dimensions.height}>
        <circle r={25} cx={50} cy={50}/>
        <circle r={25} cx={125 - 20} cy={50}/>
        <circle r={25} cx={200 - 20 * 2} cy={50}/>
        <circle r={25} cx={275 - 20 * 3} cy={50}/>
      </svg>
    </>
  );
}

export default BarChart;