import React, { Component } from 'react';

/*
 * Style
 */
import './F2xSwitch.css';



/*
 * Components
 */
import F2xButton from './F2xButton';






class F2xSwitch extends Component {
	constructor(props){
		super(props);
		
		this.state = {
			className: 'f2x-new-button-grey-invert'
		}
	}
	
	toggle(){
		const { className } = this.state;
		const newClassName = (className === 'f2x-new-button-grey-invert' ? 'f2x-new-button-black' : 'f2x-new-button-grey-invert');
		
		this.setState({
			className: newClassName
		});
		
		let mode = 1;
		if(newClassName !== 'f2x-new-button-black'){
			mode = -1;
		}
		
		
		
		this.props.onClick(this.props.item, mode);
	}
	
	componentWillMount(){
		if( this.props.value.indexOf(this.props.item) !== -1 )
			this.toggle();
	}
	
	componentWillReceiveProps(nextProps){
		if(nextProps.restart){
			const newClassName = 'f2x-new-button-grey-invert';
			
			this.setState({
				className: newClassName
			});
		}
	}
	
	render(){
		const padding = this.props.medium ? '0 20px' : '0 7px';
		
		return(
			<F2xButton name={this.props.item}  className={`small-font separated montse_light ${this.state.className}`} style={{width: 'auto', padding: padding, height: '26px', fontSize: '11px'}} onClick={ () => this.toggle() } medium={this.props.medium} small={this.props.small}  />
		)
	}
}



export default F2xSwitch;