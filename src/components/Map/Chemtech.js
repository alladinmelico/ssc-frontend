import React from 'react';

const Chemtech = ({selected, setSelected, facilities, hasShadow}) => {

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
      id: "C-214",
      height: "333",
      width: "127",
      y: "133", 
      x: "658",      
    },
    {
      id: "C-215",
      height: "167",
      width: "256",
      y: "299", 
      x: "402",      
    },
    {
      id: "C-213",
      height: "167",
      width: "256",
      y: "133", 
      x: "402",      
    },
    {
      id: "C-210",
      height: "165",
      width: "153",
      y: "301", 
      x: "94",      
    },
    {
      id: "C-211",
      height: "169",
      width: "230",
      y: "133", 
      x: "17",      
    },
  ]

  return (
    <svg preserveAspectRatio="xMaxYMid meet" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
      {rects.map(rect => (
        <g id="Chemtech">
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
      <rect fill="#fff" stroke="#000" x="534" y="387.8" width="124" height="78" id="svg_3"/>
      <rect fill="#fff" stroke="#000" x="17" y="301.8" width="77" height="113" id="svg_9"/>
      <rect fill="#fff" stroke="#000" x="17" y="413.8" width="77" height="52" id="svg_10"/>
      <rect fill="#fff" stroke="#000" x="247" y="132.8" width="155" height="130" id="C-212"/>
      <line fill="none" stroke="#000" x1="246" y1="465.8" x2="402" y2="465.8" id="svg_14"/>
      <line fill="none" stroke="#000" stroke-dasharray="5,5" x1="305" y1="363.8" x2="306" y2="434.8" id="svg_15"/>
      <line fill="none" stroke="#000" stroke-dasharray="5,5" x1="336" y1="370.8" x2="336" y2="465.8" id="svg_16"/>
      </g>

    </svg>
  );
};
export default Chemtech;
