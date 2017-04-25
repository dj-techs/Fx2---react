import React from 'react';


/*
 * Style
 */
 
import './F2xShort.css';



import F2xDropdown from './F2xDropdown';






const F2xShort = (props) => (
	<div style={props.style}>
		<span className="f2x-short-label">SORT:</span> <F2xDropdown list={props.list} style={props.selectStyle} onChange={ props.onClick } value={props.value} />
		
		<div className="clear" />
	</div>
);



export default F2xShort;