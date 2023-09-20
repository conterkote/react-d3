import {useEffect, useRef} from 'react';
import * as d3 from "d3"

export interface I_Props {
  dimensions: {
    width: number
    height: number
  }
}

function Template({dimensions}: I_Props) {
  const svgRef = useRef<SVGSVGElement>(null)
  useEffect( () => {
    if (!svgRef.current) return;
    d3.select(svgRef.current)
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

export default Template;