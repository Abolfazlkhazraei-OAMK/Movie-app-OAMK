import React from 'react';
import './button.css';

// function Button({icon, name, bgColor = '#ff3700', color = '#ffffff'}) {
//   return (    
//     <a className="mainBtn" style={{color: color, background: bgColor}}>
//         {icon} {name}
//     </a>
//   )
// }
function Button({ onClick, icon, name, bgColor = '#ff3700', color = '#ffffff' }) {
  return (
    <button onClick={onClick} className="mainBtn" style={{ color: color, background: bgColor }}>
      {icon} {name}
    </button>
  );
}

export default Button