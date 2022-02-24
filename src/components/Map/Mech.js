import React from 'react';

const Mech = ({selected, setSelected, facilities}) => {

  function getColor(facility, key) {
    if (selected !== '') {
      if (selected === key) {
        return '#00838f'
        
      } 
      return '#fff'
    }

    if (!facility) {
      return '#fff'
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
      id: "mech1",
      height: "82.33333",
      width: "82.66667",
      y: "180.66667", 
      x: "690.26667",      
    },
    {
      id: "mech2",
      height: "28.66666",
      width: "43.33332",
      y: "275.06647", 
      x: "355.99977",      
    },
    {
      id: "mech3",
      height: "40.33332",
      width: "82.66667",
      y: "263", 
      x: "690",      
    },
    {
      id: "mech4",
      height: "82.33333",
      width: "82.66667",
      y: "303", 
      x: "690",      
    },
    {
      id: "mech5",
      height: "41",
      width: "78",
      y: "345.66667", 
      x: "586.8001",      
    },
    {
      id: "mech6",
      height: "41",
      width: "44",
      y: "345.66667", 
      x: "545",      
    },
    {
      id: "mech7",
      height: "41",
      width: "86.66668",
      y: "345.66667", 
      x: "458.33332",      
    },
    {
      id: "mech8",
      height: "61.33334",
      width: "42",
      y: "180.40003", 
      x: "439.46675",      
    },
    {
      id: "mech9",
      height: "69.33334",
      width: "40.66667",
      y: "180.40003", 
      x: "398.66666",      
    },
    {
      id: "mech10",
      height: "34.66667",
      width: "40.66667",
      y: "269.0667", 
      x: "399.33333",      
    },
    {
      id: "mech11",
      height: "35.33317",
      width: "83",
      y: "268.39738", 
      x: "273.33025",      
    },
    {
      id: "mech12",
      height: "63.99971",
      width: "63",
      y: "239.73084", 
      x: "210.66387",      
    },
    {
      id: "mech13",
      height: "59.99973",
      width: "63",
      y: "179.99998", 
      x: "210.66387",      
    },
    {
      id: "mech14",
      height: "124",
      width: "84",
      y: "180", 
      x: "126.66676",      
    },
    {
      id: "mech15",
      height: "124",
      width: "62",
      y: "180", 
      x: "64.9999",      
    },
    {
      id: "mech16",
      height: "49.33324",
      width: "61",
      y: "180", 
      x: "273.33203",      
    },
  ]

  return (
    <svg preserveAspectRatio="xMaxYMid meet" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
      {rects.map(rect => (
        <g id="Mech">
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
      <g>
      <rect stroke="#000" id="svg_9" height="41" width="18" y="345.66667" x="441.00001" fill="#fff"/>
      <line id="svg_14" y2="275.0667" x2="367.46674" y1="293.73337" x1="367.46674" stroke="#000" fill="none"/>
      <line id="svg_15" y2="303.73337" x2="377.46675" y1="283.73337" x1="377.46675" stroke="#000" fill="none"/>
      <line fill="none" stroke="#000" x1="22.66473" y1="179.73112" x2="65.99787" y2="179.73112" id="svg_24"/>
      <line fill="none" stroke="#000" x1="21.99807" y1="261.73074" x2="65.3312" y2="261.73074" id="svg_25"/>
      <line fill="none" x1="9.99812" y1="221.06426" x2="65.3312" y2="221.06426" id="svg_26" stroke="#000"/>
      <line fill="none" stroke="#000" x1="22.66473" y1="261.73074" x2="22.66473" y2="229.06422" id="svg_27"/>
      <line fill="none" x1="22.66473" y1="212.39763" x2="22.66473" y2="179.73112" id="svg_29" stroke="#000"/>
      <line fill="none" stroke="#000" x1="33.33135" y1="211.73097" x2="33.33135" y2="230.39755" id="svg_30"/>
      <line fill="none" x1="22.66473" y1="212.39763" x2="32.66469" y2="212.39763" id="svg_33" stroke="#000"/>
      <line fill="none" x1="22.66473" y1="229.73089" x2="32.66469" y2="229.73089" id="svg_35" stroke="#000"/>
      <rect stroke="#000" id="svg_21" height="49.33324" width="22.33341" y="180" x="333.99859" fill="#fff"/>
      <line id="svg_22" y2="180" x2="401.33178" y1="179.86572" x1="355.33187" stroke="#000" fill="none"/>
      <line id="svg_23" y2="180.66667" x2="690.66456" y1="180.66667" x1="481.9983" stroke="#000" fill="none"/>
      <line id="svg_28" y2="253.86558" x2="356" y1="229.19896" x1="355.99854" stroke="#000" fill="none"/>
      <line id="svg_31" y2="255.86557" x2="346" y1="239.8656" x1="346" stroke-dasharray="5,5" stroke="#000" fill="none"/>
      <line id="svg_32" y2="345.8654" x2="439.99838" y1="303.86548" x1="439.99838" stroke-dasharray="2,2" stroke="#000" fill="none"/>
      </g>

    </svg>
  );
};
export default Mech;
