import React from 'react';

const Electrical = ({selected, setSelected, facilities, hasShadow}) => {

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
      id: "D-101",
      height: "132",
      width: "264",
      y: "147", 
      x: "57",      
    },
    {
      id: "D-102",
      height: "132",
      width: "52",
      y: "147", 
      x: "321",      
    },
    {
      id: "D-103",
      height: "132",
      width: "65",
      y: "147", 
      x: "373",      
    },
    {
      id: "D-104",
      height: "132",
      width: "197",
      y: "147", 
      x: "438",      
    },
    {
      id: "D-105",
      height: "132",
      width: "145",
      y: "147", 
      x: "635",      
    },
    {
      id: "D-107",
      height: "132",
      width: "65",
      y: "319", 
      x: "570",      
    },
    {
      id: "D-108",
      height: "132",
      width: "66",
      y: "319", 
      x: "504",      
    },
    {
      id: "D-109",
      height: "132",
      width: "67",
      y: "319", 
      x: "438",      
    },
    {
      id: "D-110",
      height: "132",
      width: "66",
      y: "319", 
      x: "372",      
    },
    {
      id: "D-111",
      height: "132",
      width: "131",
      y: "319", 
      x: "187.6",      
    },
    {
      id: "D-112",
      height: "132",
      width: "52",
      y: "319", 
      x: "136",      
    },
  ]

  return (
    <svg preserveAspectRatio="xMaxYMid meet" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
      {rects.map(rect => (
        <g id="Electrical">
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
      <rect id="svg_12" height="26" width="52" y="425.2" x="161.6" stroke="#000" fill="#fff"/>
      <rect id="svg_16" height="40" width="53" y="279.2" x="726.6" stroke="#000" fill="#fff"/>
      <line id="svg_1" y2="451.8" x2="188" y1="424.8" x1="188" stroke="#000" fill="none"/>
      <path stroke="#000" id="svg_17" d="m57,319l79,0l0,132l-79,0l0,-132z" opacity="undefined" fill="#fff"/>
      <line id="svg_20" y2="303.2" x2="693.6" y1="303.2" x1="670.6" stroke-dasharray="5,5" stroke="#000" fill="none"/>
      <line id="svg_21" y2="424.2" x2="346.6" y1="405.2" x1="345.6" stroke-dasharray="5,5" stroke="#000" fill="none"/>
      <line id="svg_22" y2="318.2" x2="673.6" y1="319.2" x1="634.6" stroke-dasharray="2,2" stroke="#000" fill="none"/>
      <line id="svg_23" y2="318.2" x2="55.6" y1="279.2" x1="56.6" stroke-dasharray="2,2" stroke="#000" fill="none"/>
      <line id="svg_24" y2="451.2" x2="371.6" y1="451.2" x1="318.6" stroke="#000" fill="none"/>
      </g>

    </svg>
  );
};
export default Electrical;
