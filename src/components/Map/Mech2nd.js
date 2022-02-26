import React from 'react';

const Mech2nd = ({selected, setSelected, facilities}) => {

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
      id: "C-207",
      height: "153",
      width: "261",
      y: "378", 
      x: "274",      
    },
    {
      id: "C-208",
      height: "309",
      width: "261",
      y: "69", 
      x: "274",      
    },
  ]

  return (
    <svg preserveAspectRatio="xMaxYMid meet" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
      {rects.map(rect => (
        <g id="Mech2nd">
          <title>{facilities[rect.id]?.name}</title>
          <rect 
            id={rect.id}
            height={rect.height}
            width={rect.width}
            y={rect.y}
            x={rect.x}
            stroke="#000"
            className='rect'
            onClick={() => setSelected(rect.id)}
            fill={getColor(facilities[rect.id], rect.id)}/>
        </g>
      ))}

    </svg>
  );
};
export default Mech2nd;
