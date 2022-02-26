import React from 'react';

const Bsad2nd = ({selected, setSelected, facilities}) => {

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
      id: "bsad21",
      height: "83",
      width: "82",
      y: "279.6", 
      x: "12.2",      
    },
    {
      id: "bsad22",
      height: "65",
      width: "80",
      y: "297.6", 
      x: "94.2",      
    },
    {
      id: "bsad23",
      height: "65",
      width: "83",
      y: "297.6", 
      x: "174.19",      
    },
    {
      id: "bsad24",
      height: "65",
      width: "84",
      y: "297.6", 
      x: "256.86",      
    },
    {
      id: "bsad25",
      height: "93",
      width: "83",
      y: "158.8", 
      x: "294.5",      
    },
    {
      id: "bsad26",
      height: "93",
      width: "82",
      y: "158.8", 
      x: "376.9",      
    },
    {
      id: "bsad27",
      height: "93",
      width: "83.83231",
      y: "159.8", 
      x: "542.5",      
    },
    {
      id: "bsad28",
      height: "93",
      width: "82.83231",
      y: "159.8", 
      x: "625.9",      
    },
    {
      id: "bsad29",
      height: "35",
      width: "46",
      y: "292", 
      x: "740.8",      
    },
    {
      id: "bsad210",
      height: "120",
      width: "83",
      y: "298", 
      x: "422.8",      
    },
    {
      id: "bsad211",
      height: "120",
      width: "83",
      y: "298", 
      x: "504.3",      
    },
  ]

  return (
    <svg preserveAspectRatio="xMaxYMid meet" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
      {rects.map(rect => (
        <g id="Bsad2nd">
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
      <rect fill="#fff" stroke="#000" x="169.20001" y="438.30774" width="0" height="1" id="svg_6"/>
      <path fill="#fff" stroke="#000" opacity="NaN" d="m320.58907,440.16406" id="svg_9"/>
      <line fill="none" stroke="#000" x1="294.58946" y1="251.83454" x2="173.92462" y2="251.16788" id="svg_17"/>
      <line fill="none" stroke="#000" x1="174.59128" y1="279.83412" x2="173.92462" y2="250.50123" id="svg_19"/>
      <path fill="#fff" stroke="#000" opacity="NaN" d="m94.59249,279.83412c0,0 125.33143,0 124.67084,-0.39543" id="svg_24"/>
      <line fill="none" stroke="#000" x1="219.92393" y1="251.16788" x2="219.92393" y2="279.16746" id="svg_25"/>
      <line fill="none" stroke="#000" x1="192.59101" y1="251.16788" x2="192.59101" y2="279.83412" id="svg_26"/>
      <line fill="none" stroke="#000" stroke-dasharray="5,5" x1="219.92393" y1="279.16746" x2="251.92344" y2="279.83412" id="svg_27"/>
      <line fill="none" stroke="#000" stroke-dasharray="5,5" x1="233.25706" y1="265.16767" x2="262.58995" y2="265.16767" id="svg_28"/>
      <line stroke="#000" fill="none" x1="341.25543" y1="325" x2="422.91671" y2="325" id="svg_29"/>
      <path fill="#fff" stroke="#000" opacity="NaN" d="m579.20001,253.00774" id="svg_34"/>
      <line fill="none" stroke="#000" stroke-dasharray="2,2" x1="744.30001" y1="272.50774" x2="773.80001" y2="273.00774" id="svg_39"/>
      <line stroke="#000" fill="none" x1="787" y1="252.00774" x2="787" y2="295.00773" id="svg_40"/>
      <line fill="none" x1="579.79998" y1="253.00774" x2="671.79999" y2="253.00774" id="svg_47" stroke="#000"/>
      <rect id="svg_5" height="1" width="0" y="234.50774" x="847.60001" stroke="#000" fill="#fff"/>
      <line stroke="#000" id="svg_7" y2="252.50774" x2="786.60002" y1="252.50774" x1="743.60002" fill="none"/>
      <line stroke="#000" fill="none" x1="587.25543" y1="314" x2="740.91671" y2="314" id="svg_1"/>
      <path id="svg_4" d="m708,221.8" opacity="NaN" stroke="#000" fill="none"/>
      <path id="svg_8" d="m708,227.8c0,0 36,0 36,-0.8c0,0.8 0,25.8 0,25.8" opacity="NaN" stroke="#000" fill="none"/>
      <line id="svg_10" y2="224" x2="542" y1="224" x1="459" stroke="#000" fill="none"/>
      </g>

    </svg>
  );
};
export default Bsad2nd;
