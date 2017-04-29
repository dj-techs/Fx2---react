import React , { Component } from 'react';
import { connect } from 'react-redux'






/*
 * GLOBAL Vars & Functions
 */
import { setVisibilityModal, ModalVisibilityFilters, ModalTypes } from '../actions'
import { loginRequest, socialConnect } from '../data/data'



/*
 * Style
 */
import './F2xPaypalSign.css';




class f2xPaypalSign  extends Component {
	
	constructor(props) {
	    super(props);
	    
	}	
	
	


	
	render(){
		const { dispatch, savein } = this.props; 
		
		const saveDatas = savein ? savein : {};
		
		return(
			<div className="cuerpo" style={{bottom: '0'}}>
				Paypal sign in
			</div>
		);
	}
}


const mapStateToProps = (state) => {
	return {
		flags: state.evalLogin.flags
	};
}

const F2xPaypalSign = connect(
	mapStateToProps,
	null
)(f2xPaypalSign);



export default F2xPaypalSign;

