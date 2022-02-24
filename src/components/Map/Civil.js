import React from 'react';

const Civil = ({selected, setSelected, facilities}) => {

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
      id: "svg_2",
      height: "85",
      width: "86",
      y: "395.2", 
      x: "145.6",      
    },
    {
      id: "svg_3",
      height: "85",
      width: "170",
      y: "395.2", 
      x: "232",      
    },
    {
      id: "svg_5",
      height: "127",
      width: "51",
      y: "268.2", 
      x: "401.6",      
    },
    {
      id: "svg_7",
      height: "33",
      width: "51",
      y: "395", 
      x: "401.6",      
    },
    {
      id: "svg_8",
      height: "98",
      width: "172",
      y: "106.2", 
      x: "486.6",      
    },
    {
      id: "svg_9",
      height: "119.00001",
      width: "85",
      y: "106.19999", 
      x: "659",      
    },
    {
      id: "svg_10",
      height: "171",
      width: "85",
      y: "255", 
      x: "659",      
    },
    {
      id: "svg_11",
      height: "85",
      width: "257",
      y: "395.2", 
      x: "486.6",      
    },
  ]

  return (
    <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
      {rects.map(rect => (
        <g id="Layer_1">
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
        <rect id="svg_4" height="1" width="0" y="314.2" x="582.6" stroke="#000" />       
        <rect id="svg_6" height="1" width="2" y="266.2" x="927.6" stroke="#000" fill="#fff"/>
        <line id="svg_12" y2="268" x2="401.6" y1="225.2" x1="401.6" stroke="#000" fill="none"/>
        <line id="svg_13" y2="106.2" x2="485.6" y1="106.2" x1="401.6" stroke="#000" fill="none"/>
        <line id="svg_14" y2="479.2" x2="453.6" y1="480.2" x1="401.6" stroke="#000" fill="none"/>
        <line id="svg_15" y2="224.2" x2="401.6" y1="105.2" x1="401.6" stroke-dasharray="2,2" stroke="#000" fill="none"/>
      </g>

    </svg>
  );
};
export default Civil;
