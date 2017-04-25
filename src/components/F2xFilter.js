import React from 'react';


 
 
 
/*
 * Components
 */
import F2xDropdown from './F2xDropdown';
import F2xSwitch from './F2xSwitch';
 
 
 
/*
 * Style
 */
import './F2xFilter.css';







const FilterButton = (props) => (
	<F2xSwitch item={props.item} onClick={props.onClick} medium={props.medium} small={props.small} value={props.value} restart={props.restart} />
)



const FilterButtonList = (props) => (
	<div className="f2x-filter-button-group">
		{
			props.list.map(
				(item, i) => 
					<FilterButton key={i} item={item} medium={props.medium} small={props.small} onClick={props.onClick} value={props.value} restart={props.restart} />
			)
		}
	</div>
)




const F2xFilter = (props) => {
	let style = Object.assign({}, props.style);
	
	const {reset, resetFnc, restart} = props;
	
	const resetBox = reset ? (<div className="cursor" style={{float: 'right', textDecoration: 'underline'}} onClick={() => resetFnc()}>RESET ALL</div>) : '';
	
	return (
		<div className={`f2x-filter-label${props.className ? ' '+ props.className : ''}`} style={style}>
			<div style={{marginBottom: '12px'}}>
				{resetBox}
				{props.name}
			</div>
			
			{
				!props.button && props.list.length 
				?
					<F2xDropdown list={props.list} style={props.style} onChange={(i) => props.onClick(i, props.name)} value={props.value} restart={restart} />
				:
					<FilterButtonList list={props.list} medium={props.medium} small={props.small} onClick={(i, mode) => { props.onClick(i, props.name, mode) }} value={props.value} restart={restart} />
			}
			
			<div className="clear" />
		</div>
	)
}



export default F2xFilter;