import React from 'react';

const Bsad = ({selected, setSelected, facilities}) => {

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
      id: "bsad1",
      height: "83",
      width: "82",
      y: "157.53335", 
      x: "13.6",      
    },
    {
      id: "bsad2",
      height: "65",
      width: "80",
      y: "176", 
      x: "96",      
    },
    {
      id: "bsad3",
      height: "65",
      width: "83",
      y: "176", 
      x: "176",      
    },
    {
      id: "bsad4",
      height: "65",
      width: "84",
      y: "176", 
      x: "258",      
    },{
      id: "bsad5",
      height: "93",
      width: "67.33232",
      y: "37.72819", 
      x: "295.98945",      
    },
    {
      id: "bsad6",
      height: "93",
      width: "67.33232",
      y: "37.72819", 
      x: "393.32131",      
    },
    {
      id: "bsad7",
      height: "93",
      width: "83.83231",
      y: "37.72819", 
      x: "543.92131",      
    },
    {
      id: "bsad8",
      height: "93",
      width: "82.83231",
      y: "37.72819", 
      x: "627.32131",      
    },
    {
      id: "bsad9",
      height: "48",
      width: "47",
      y: "156.9", 
      x: "742.2",      
    },
    {
      id: "bsad10",
      height: "120",
      width: "68.5",
      y: "175.9", 
      x: "424.19999",      
    },
    {
      id: "bsad11",
      height: "120",
      width: "68.5",
      y: "175.9", 
      x: "521.69999",      
    },
    {
      id: "bsad12",
      height: "28",
      width: "93",
      y: "130.4", 
      x: "581",      
    },
  ]

  return (
    <svg preserveAspectRatio="xMaxYMid meet" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
      {rects.map(rect => (
        <g id="Bsad">
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
      <rect fill="#fff" stroke="#000" x="170.6" y="379.2" width="0" height="1" id="svg_6"/>
      <path fill="#fff" stroke="#000" opacity="NaN" d="m321.98906,381.05632" id="svg_9"/>
      <rect fill="#fff" x="363.32175" y="37.72819" width="29.99954" height="93" id="svg_15" stroke="#000"/>
      <line fill="none" stroke="#000" x1="295.98945" y1="129.7268" x2="175.32461" y2="129.06014" id="svg_17"/>
      <line fill="none" stroke="#000" x1="175.99127" y1="157.72638" x2="175.32461" y2="128.39349" id="svg_19"/>
      <path fill="#fff" stroke="#000" opacity="NaN" d="m89.99257,58.39455" id="svg_23"/>
      <path fill="#fff" stroke="#000" opacity="NaN" d="m95.99248,157.72638c0,0 125.33143,0 124.67084,-0.39543" id="svg_24"/>
      <line fill="none" stroke="#000" x1="221.32392" y1="129.06014" x2="221.32392" y2="157.05972" id="svg_25"/>
      <line fill="none" stroke="#000" x1="193.991" y1="129.06014" x2="193.991" y2="157.72638" id="svg_26"/>
      <line fill="none" stroke="#000" stroke-dasharray="5,5" x1="221.32392" y1="157.05972" x2="253.32343" y2="157.72638" id="svg_27"/>
      <line fill="none" stroke="#000" stroke-dasharray="5,5" x1="234.65705" y1="143.05993" x2="263.98994" y2="143.05993" id="svg_28"/>
      <line fill="none" stroke="#000" x1="342.65541" y1="175.7261" x2="697.3167" y2="177.05942" id="svg_29"/>
      <path fill="none" stroke="#000" opacity="NaN" d="m460.6,129.4c0,0 0.5,11.5 0.5,11.5c0,0 82.5,0.5 82.5,0.5c0,0 0,-13.5 0,-13.5" id="svg_31"/>
      <path fill="#fff" stroke="#000" opacity="NaN" d="m580.6,130.9" id="svg_34"/>
      <line fill="none" stroke="#000" stroke-dasharray="2,2" x1="745.7" y1="143.4" x2="775.2" y2="143.9" id="svg_39"/>
      <line fill="none" stroke="#000" x1="788.7" y1="129.9" x2="789.2" y2="156.9" id="svg_40"/>
      <line fill="none" stroke="#000" x1="696.7" y1="203.4" x2="696.7" y2="176.9" id="svg_41"/>
      <line fill="none" stroke="#000" x1="492.7" y1="258.9" x2="521.7" y2="258.9" id="svg_44"/>
      <line fill="none" stroke="#000" x1="492.7" y1="295.9" x2="521.7" y2="295.9" id="svg_45"/>
      <line fill="none" x1="581.19997" y1="130.9" x2="673.19998" y2="130.9" id="svg_47" stroke="#000"/>
      <rect id="svg_5" height="1" width="0" y="175.4" x="849" stroke="#000" fill="#fff"/>
      <line id="svg_7" y2="130.4" x2="788" y1="130.4" x1="709" stroke="#000" fill="none"/>
      </g>

    </svg>
  );
};
export default Bsad;
