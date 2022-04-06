import React from 'react';

const Library = ({selected, setSelected, facilities, hasShadow}) => {

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
      id: "Lib",
      height: "400",
      width: "400",
      y: "175", 
      x: "300",      
    },
  ]

  return (
    <svg preserveAspectRatio="xMaxYMid meet" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
      {rects.map(rect => (
        <g id="Library">
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
      <title>Library</title>
      </g>

    </svg>
  );
};
export default Library;
