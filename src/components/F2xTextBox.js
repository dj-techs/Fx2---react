import React, { Component } from 'react';


/*
 * Style
 */
import './F2xTextBox.css';




class F2xTextBox extends Component{
	
	componentDidMount() {
		const {  refID,  value, disabled } = this.props;
		if (value !== undefined) this.refs[refID].value = value;
		if (disabled !== undefined) this.refs[refID].disabled = true;
	}
	
	
	render(){
		const { className, style , placeholder, refID, onChange } = this.props;
		let onC = onChange? onChange : (e) => '';	
		
		return (
			<textarea 	className={`f2x-textarea small-font${className ? ' '+ className : ''}`} 
						style={style} 
						placeholder={placeholder}
						ref={refID} 
						onChange={ (e) => onC(e) /* Move event value up with onchange handler  */} />
		 );
	}
}

export default F2xTextBox;