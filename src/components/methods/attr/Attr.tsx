import {useEffect, useRef} from 'react';
import * as d3 from "d3"

export interface IAttrProps {
  dimensions: {
    width: number
    height: number
  }
}

function Attr({dimensions}: IAttrProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  useEffect( () => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current)
    svg
      .selectChildren()
      .attr('style', function (_) {
        return `fill : rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`
      })
      .attr('r', 24)
  }, []);

  return (
    <>
      <svg ref={svgRef} width={dimensions.width} height={dimensions.height}>
        <circle r={25} cx={50} cy={50}/>
        <circle r={25} cx={125 - 20} cy={50}/>
        <circle r={25} cx={200 - 20 * 2} cy={50}/>
        <circle r={25} cx={275 - 20 * 3} cy={50}/>
      </svg>
    </>
  );
}

export default Attr;