import React, { Component } from 'react';




/*
 * Global Vars & Functions
 */
import {setOpenDropdown} from '../App';




/*
 * Style
 */
import './F2xDropdown.css';





const F2xDropdownOption = (props) => {
	const text = props.item.constructor.toString().indexOf('Array') !== -1 ? props.item[0] : props.item;
	const classN = props.item.constructor.toString().indexOf('Array') !== -1 ? props.item[1] : '';
	
	
	return (
		<div className={`f2x-dropdown-list-option${classN ? ' '+ classN : ''}`} style={props.style} onClick={ (e) => {if(classN !== 'disabled') props.onClick(e, props.id)} }>{isNaN(text) ? text : text < 10 ? '0'+ text : text}</div>
	)
}


class F2xDropdown extends Component { 
	constructor(props){
		super(props);
		
		this.state = {
			mode: 'none',
			slc: props.value?props.value:0
		}
		
		this.onClick = this.onClick.bind( this );
	}
	
	
	
	onClick(e){
		e.stopPropagation();
		e.preventDefault();
		
		setOpenDropdown(this.refs.listaBox);
		
		//if (this.refs[refID].disabled) return;
		
		let newState = '';
		
		switch(this.refs.listaBox.style.display.toLowerCase()){
			case 'block':
				newState = 'none';
				break;
				
			default:
				newState = 'block';
				break;
		}
		
		this.refs.listaBox.style.display = newState;
		
		this.setState(
			Object.assign({}, this.state,{
				mode: newState
			})
		)
	}
	
	onSelect(id){
		//if (this.refs[refID].disabled) return;
		let newState = id;
		
		this.setState(
			Object.assign({}, this.state,{
				slc: newState,
				mode: 'none'
			})
		)
	}
	
	componentDidUpdate(){
		this.refs.lista.scrollTop =  ((this.state.slc * 29) + 6);
	}
	
	componentWillReceiveProps(nextProps){
		if(nextProps.restart)
			this.onSelect(0)
	}
	
	render() {
		const { className, style, styleBox, styleItems, list, onChange, refID, placeholder } = this.props;
		let onC = onChange? onChange : (e) => '';
		
		const text = list[this.state.slc].constructor.toString().indexOf('Array') !== -1 ? list[this.state.slc][0] : list[this.state.slc];
		
		return (
			<div className={`f2x-dropdown montse_light${className ? ' '+ className : ''}`} style={style}  onMouseUp={ (e) => this.onClick(e) }>
				<label ref="label" className='small-font separated' style={{left: '0'}} onClick={() => this.refs[refID].focus()}>{placeholder}</label>
				<div ref = {refID} onFocus={() => { this.refs.label.className = "small-font separated slc" }}>
					{isNaN(text) ? text : text < 10 ? '0'+ text : text}
				</div>
				
				<div className="f2x-dropdown-list" style={{display: this.state.mode}} ref="listaBox">
					<div className="f2x-dropdown-list-content" style={styleBox} ref="lista">
						{
							list.map(
								(item, i) =>
									<F2xDropdownOption key={i} id={i} item={item} style={styleItems} onClick={ (e, i) => {e.stopPropagation();  this.onSelect(i); onC(i); } } />
							)
						}
					</div>
				</div>
			</div>
		)
	}
}




export default F2xDropdown;