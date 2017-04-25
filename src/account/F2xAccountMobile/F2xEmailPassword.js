import React, { Component } from 'react';
import { connect } from 'react-redux'
import { setEvalChangePassword, setVisibilityModal, ModalVisibilityFilters, ModalTypes } from '../../actions'




/*
 * Global Vars & Functions
 */
import { store } from '../../';
import {  guInfo, uuPass } from '../../data/data';



/*
 * Components
 */
import F2xInput from '../../components/F2xInput';
import F2xButton from '../../components/F2xButton';


/*
 * Style
 */
import './F2xAccountMobile.css';



/*
 * Icons
 */
import ICON_LOCK from '../../media/input_lock.svg';
import ICON_BACK from '../../media/Icon_BackArrow.svg';






class f2xEmailPassword extends Component {
	constructor(props) {
	    super(props);
	    let uI = guInfo();
	    this.state = {
		    email: uI.email
		}
		this.update = this.update.bind(this)
		this.evalForm = this.evalForm.bind(this)
		this.savePass = this.savePass.bind(this)
	}	
	
	
	evalForm(){
		let tForm = {}														   // We defined the form values here
		tForm.old_password = this.refs.oPass.refs.old_password.value;				   // Component REF +  subcomponent REF		   	   
		tForm.new_password = this.refs.nPass.refs.new_password.value;
		return tForm;
	}
	
	
	
	update(){
		store.dispatch( setEvalChangePassword({error: {}}) )
	}	
	
	savePass(){
		let tForm = this.evalForm();
				
		uuPass(tForm)	
	}
	
	render() {
		const { back, errors } = this.props;
		
		return (
			<div>				<div className="f2x-account-top">
					<div className="back" style={{backgroundImage: 'url('+ ICON_BACK +')'}} onClick={() => back()} /> <span>EMAIL & PASSWORD</span>
				</div>
				
				<div className="f2x-account-content">
					<div className="f2x-account-email">
						EMAIL
						<div className="f2x-account-email-dir">
							{this.state.email}
							
							<div className="f2x-account-email-change cursor" onClick={() => store.dispatch( setVisibilityModal(ModalVisibilityFilters.SHOW, ModalTypes.EDIT_EMAIL) )}><u>CHANGE</u></div>
						</div>
					</div>
					
					<div className="f2x-account-input" style={{marginTop: '40px'}}>
						<br />
						<F2xInput type="password" placeholder="Current Password" style={{paddingLeft: '25px', paddingRight: '15px', width: (innerWidth-25-15-30) +"px"}} icon={ICON_LOCK}  styleBox={{margin: '0', width: '100%'}} 
								errorRes={errors.old_password}
								ref="oPass" refID="old_password"
								onChange={ (e) => this.update(e) }
								/>
					</div>
		
					<div className="f2x-account-input">
						<br />
						<F2xInput type="password" placeholder="New Password" style={{paddingLeft: '25px', paddingRight: '15px', width: (innerWidth-25-15-30) +"px"}} icon={ICON_LOCK}  styleBox={{margin: '0', width: '100%'}} 
								errorRes={errors.new_password}
								ref="nPass" refID="new_password"
								onChange={ (e) => this.update(e) }					
								/>
					</div>
					
					<div className="f2x-account-saves">
						<F2xButton name="SAVE" className="f2x-button-black f2x-button-big small-font separated f2x-account-share-button" onClick={ () => this.savePass() } />
					</div>
				</div>
			</div>
		)
	}
}


const mapStateToProps = (state) => {
	const { flags } = state.evalChangePassword;

	let errors = {
		old_password:undefined,
		new_password:undefined
	}
	
	if(flags.error){
		if(flags.error.old_password)
			errors.old_password = {
				status: 0,
				msg: flags.error.old_password
			}
		
		
		if(flags.error.new_password)
			errors.new_password = {
				status: 0,
				msg: flags.error.new_password
			}
		
		if(errors.old_password && errors.new_password)
		if(errors.old_password.msg === errors.new_password.msg)
			errors.old_password.msg = '';
	}
	
	errors.new_password = {
		status: 2,
		msg: 'Password must be a minimum of 6 characters'
	}
	
		
	return {
		errors: errors
	}
}

const F2xEmailPassword = connect(
	mapStateToProps
)(f2xEmailPassword);


export default F2xEmailPassword;