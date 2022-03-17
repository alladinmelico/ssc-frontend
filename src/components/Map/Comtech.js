import React from 'react';

const Comtech = ({selected, setSelected, facilities, hasShadow}) => {

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
      id: "C-206",
      height: "162",
      width: "173",
      y: "355", 
      x: "369",      
    },
    {
      id: "C-204",
      height: "217",
      width: "106",
      y: "82", 
      x: "436",      
    },
    {
      id: "C-205",
      height: "56",
      width: "56",
      y: "299", 
      x: "486",      
    },
    {
      id: "C-202",
      height: "218",
      width: "107",
      y: "82", 
      x: "261",      
    },
    {
      id: "C-201",
      height: "217",
      width: "42",
      y: "300", 
      x: "261",      
    },
  ]

  return (
    <svg preserveAspectRatio="xMaxYMid meet" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
      {rects.map(rect => (
        <g id="Comtech">
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
      <rect fill="#fff" stroke="#000" x="368" y="81.8" width="68" height="56" id="svg_7"/>
      <line fill="none" stroke="#000" stroke-dasharray="5,5" x1="366" y1="449.8" x2="336" y2="449.8" id="svg_8"/>
      <line fill="none" stroke-dasharray="5,5" x1="335" y1="488.8" x2="335" y2="450.8" id="svg_9" stroke="#000"/>
      </g>

    </svg>
  );
};
export default Comtech;
