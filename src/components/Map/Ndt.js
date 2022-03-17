import React from 'react';

const Ndt = ({selected, setSelected, facilities, hasShadow}) => {

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
      id: "C-218",
      height: "197",
      width: "198",
      y: "100", 
      x: "168",      
    },
    {
      id: "C-217",
      height: "198",
      width: "198",
      y: "297", 
      x: "168",      
    },
    {
      id: "C-216",
      height: "194",
      width: "264",
      y: "100", 
      x: "366",      
    },
  ]

  return (
    <svg preserveAspectRatio="xMaxYMid meet" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
      {rects.map(rect => (
        <g id="Ndt">
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
      <line fill="none" stroke="#000" stroke-dasharray="5,5" x1="600" y1="342.8" x2="599" y2="291.8" id="svg_6"/>
      <line fill="none" stroke="#000" stroke-dasharray="5,5" x1="166" y1="65.8" x2="168" y2="102.8" id="svg_7"/>
      <line fill="none" stroke="#000" stroke-dasharray="5,5" x1="307" y1="66.8" x2="166" y2="66.8" id="svg_8"/>
      <line fill="none" stroke="#000" stroke-dasharray="5,5" x1="169" y1="494.8" x2="170" y2="529.8" id="svg_9"/>
      <line fill="none" stroke="#000" stroke-dasharray="5,5" x1="307" y1="528.8" x2="168" y2="529.8" id="svg_10"/>
      </g>

    </svg>
  );
};
export default Ndt;
