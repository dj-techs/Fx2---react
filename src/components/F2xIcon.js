import React from 'react';




const F2xIcon = ( { className, icon, hidden, onClick, style={}, noTrans, over, out }) => (
	<div 
		style={ Object.assign({}, {backgroundImage: 'url('+ icon +')'}, style) } 
		className={`${className ? className : ''} cover-img${!noTrans ? ' transparent' : ''}${hidden ? ' hidden': ''}`} 
		onMouseUp={ onClick !== undefined ? (e) => onClick(e) : '' } 
		onMouseOver={ over !== undefined ? () => over() : ''} 
		onMouseOut={ out !== undefined ? () => out() : ''}
	/>
);



export default F2xIcon;