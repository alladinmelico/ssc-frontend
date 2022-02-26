import React from 'react';

const Beng = ({selected, setSelected, facilities}) => {

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
      id: "C-111",
      height: "45",
      width: "138",
      y: "231", 
      x: "627",      
    },
    {
      id: "C-113",
      height: "81",
      width: "138",
      y: "276", 
      x: "627",      
    },
    {
      id: "C-115",
      height: "57",
      width: "138",
      y: "357", 
      x: "627",      
    },
    {
      id: "C-112",
      height: "70",
      width: "93",
      y: "231", 
      x: "488",      
    },
    {
      id: "C-114",
      height: "46",
      width: "71",
      y: "301", 
      x: "510",      
    },
    {
      id: "C-116",
      height: "67",
      width: "93",
      y: "347", 
      x: "488",      
    },
    {
      id: "C-118",
      height: "46",
      width: "37",
      y: "231", 
      x: "451",      
    },
    {
      id: "C-122",
      height: "45",
      width: "93",
      y: "231", 
      x: "303",      
    },
    {
      id: "C-121",
      height: "118",
      width: "72",
      y: "296", 
      x: "303",      
    },
    {
      id: "C-123",
      height: "91",
      width: "93",
      y: "231", 
      x: "210",      
    },
    {
      id: "C-126",
      height: "68",
      width: "45",
      y: "254", 
      x: "210",      
    },
    {
      id: "C-124",
      height: "47",
      width: "93",
      y: "322", 
      x: "210",      
    },
    {
      id: "C-125",
      height: "45",
      width: "93",
      y: "368", 
      x: "210",      
    },
    {
      id: "C-127",
      height: "45",
      width: "46",
      y: "231", 
      x: "164",      
    },
    {
      id: "C-129",
      height: "91",
      width: "46",
      y: "231", 
      x: "25",      
    },
    {
      id: "C-131",
      height: "71",
      width: "46",
      y: "344", 
      x: "25",      
    },
  ]

  return (
    <svg preserveAspectRatio="xMaxYMid meet" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
      {rects.map(rect => (
        <g id="Beng">
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
      <rect fill="#fff" stroke="#000" x="580.66218" y="372.66357" width="46" height="41.33314" id="svg_6"/>
      <rect fill="#fff" stroke="#000" x="395.32969" y="231" width="45" height="45" id="svg_13"/>
      <rect fill="#fff" x="70.33332" y="231" width="46.33333" height="45" id="svg_22" stroke="#000"/>
      <rect fill="#fff" x="487.99594" y="300.53056" width="21.9999" height="58" id="svg_7" stroke="#000"/>    
      <rect fill="#fff" stroke="#000" x="24.66472" y="321.8638" width="46" height="22.66656" id="svg_24"/>
      <line fill="none" stroke="#000" x1="149.99748" y1="275.86401" x2="115.99764" y2="275.86401" id="svg_26"/>
      <line fill="none" stroke="#000" stroke-dasharray="5,5" x1="143.99751" y1="249.86413" x2="143.33085" y2="275.86401" id="svg_27"/>
      <line fill="none" stroke="#000" stroke-dasharray="5,5" x1="131.3309" y1="248.5308" x2="130.66424" y2="263.86407" id="svg_28"/>
      <line fill="none" stroke="#000" stroke-dasharray="5,5" x1="83.99778" y1="291.19727" x2="92.66441" y2="291.19727" id="svg_29"/>
      <line fill="none" x1="421.99624" y1="291.19727" x2="422" y2="409.8634" id="svg_30" stroke="#000"/>
      <line fill="none" x1="421.32957" y1="410.53006" x2="471.32935" y2="410.33334" id="svg_31" stroke="#000"/>
      <line fill="none" stroke="#000" stroke-dasharray="2,2" x1="69.99785" y1="414.53004" x2="209.99721" y2="413.86338" id="svg_32"/>
      <rect id="svg_1" height="40" width="34.66665" y="299.86634" x="437.33282" stroke="#000" fill="#fff"/>
      <rect id="svg_10" height="40" width="34.66665" y="339.66667" x="437.33282" stroke="#000" fill="#fff"/>
      </g>

    </svg>
  );
};
export default Beng;
