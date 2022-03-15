import React from 'react';

const Electronics = ({selected, setSelected, facilities, hasShadow}) => {

  function getColor(facility, key) {
    if (selected !== '') {
      if (selected === key) {
        return '#00838f'
        
      } 
      return '#ededed'
    }

    if (!facility) {
      return '#ededed'
    }
    
    const percentage = Math.trunc((facility.occupied/facility.capacity) * 100)
    if (percentage >= 80) {
      return '#ef5350'
    } else if (percentage >= 50) {
      return '#ffc107'
    }
    return '#aed581'
  }

  const rects = [
    {
      id: "D-206",
      height: "130",
      width: "129",
      y: "151.2", 
      x: "67",      
    },
    {
      id: "D-207",
      height: "130",
      width: "182",
      y: "151.2", 
      x: "196",      
    },
    {
      id: "D-208",
      height: "130",
      width: "130",
      y: "151.2", 
      x: "378",      
    },
    {
      id: "D-209",
      height: "130",
      width: "130",
      y: "151.2", 
      x: "508",      
    },
    {
      id: "D-210",
      height: "130",
      width: "72",
      y: "151.2", 
      x: "638",      
    },
    {
      id: "D-211",
      height: "130",
      width: "72",
      y: "151.2", 
      x: "710",      
    },
    {
      id: "D-212",
      height: "131",
      width: "129",
      y: "321", 
      x: "510",      
    },
    {
      id: "D-213",
      height: "131",
      width: "130",
      y: "321", 
      x: "380",      
    },
    {
      id: "D-202",
      height: "131",
      width: "64",
      y: "321", 
      x: "198",      
    },
    {
      id: "D-201",
      height: "131",
      width: "64",
      y: "321", 
      x: "260",      
    },
    {
      id: "D-203",
      height: "131",
      width: "52",
      y: "321", 
      x: "146",      
    },
  ]

  return (
    <svg preserveAspectRatio="xMaxYMid meet" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
      {rects.map(rect => (
        <g id="Electronics">
          <title>{facilities[rect.id]?.name}</title>
          <rect 
            id={rect.id}
            height={rect.height}
            width={rect.width}
            y={rect.y}
            x={rect.x}
            stroke="#000"
            className={hasShadow ? 'rect rect-has-shadow':'rect'}
            onClick={() => setSelected(rect.id)}
            fill={getColor(facilities[rect.id], rect.id)}/>
        </g>
      ))}
      <g>
      <rect stroke="#000" x="67" id="svg_14" height="131" width="79.00001" y="321" fill="#fff"/>
      <rect id="svg_11" height="27" width="53" y="425.2" x="169.6" stroke="#000" fill="#fff"/>
      <line id="svg_19" y2="452.8" x2="198" y1="424.8" x1="198" stroke="#000" fill="none"/>
      <line stroke="#000" id="svg_15" y2="452" x2="379" y1="452.2" x1="325.6" fill="none"/>
      <line id="svg_16" y2="320.2" x2="781.6" y1="320.2" x1="638.6" stroke="#000" fill="none"/>
      <line stroke="#000" id="svg_17" y2="320.2" x2="781.6" y1="281.2" x1="781.6" fill="none"/>
      <line id="svg_18" y2="321.2" x2="67" y1="281.2" x1="67" stroke="#000" fill="none"/>
      <line id="svg_21" y2="424.2" x2="351.6" y1="407.2" x1="352.6" stroke-dasharray="5,5" stroke="#000" fill="none"/>
      <line id="svg_22" y2="303.2" x2="725.6" y1="302.2" x1="676.6" stroke-dasharray="5,5" stroke="#000" fill="none"/>
      <line id="svg_23" y2="302.2" x2="677.6" y1="320.2" x1="676.6" stroke-dasharray="5,5" stroke="#000" fill="none"/>
      </g>

    </svg>
  );
};
export default Electronics;
