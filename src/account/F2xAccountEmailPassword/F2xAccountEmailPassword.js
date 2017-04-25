import React, { Component } from 'react';
import { connect } from 'react-redux'
import { setEvalChangePassword, setVisibilityModal, ModalVisibilityFilters, ModalTypes } from '../../actions'




/*
 * Global Vars & Functions
 */
import { store } from '../../';
import {  uuPass } from '../../data/data';



/*
 * Component
 */
import F2xInput from '../../components/F2xInput';
import F2xButton from '../../components/F2xButton';



/*
 * Style
 */
 import './F2xAccountEmailPassword.css';



/*
 * Icon
 */
import ICON_LOCK from '../../media/input_lock.svg';










class f2xAccountEmailPassword extends Component {
	constructor(props) {
	    super(props);
	    
	    this.state = {
		    email: this.props.email
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
		let tForm = this.evalForm()		
		uuPass(tForm)	
	}	
	
	render() {
		const { errors } = this.props;
		
		const registeredPlan = this.props.plan.length ? (<div className="f2x-account-platinum">PLATINUM MEMBER</div>) : '';
		
		
		return (
			<div className="f2x-account-data">
				YOUR ACCOUNT
					
				{registeredPlan}
				
				<div className="f2x-account-email">
					Email
					<div className="f2x-account-email-dir">
						{this.props.email}
						
						<div className="f2x-account-email-change cursor" onClick={() => store.dispatch( setVisibilityModal(ModalVisibilityFilters.SHOW, ModalTypes.EDIT_EMAIL) )}><u>CHANGE</u></div>
					</div>
				</div>
				
				<div className="clear" />
				
				<div style={{textAlign: 'left', fontSize: '13px', marginTop: '40px'}}>
					CHANGE YOUR PASSWORD
				</div>
				
				<div className="f2x-account-input">
					<br />
					<br />
					<F2xInput type="password" 
							placeholder='Current Password'
							style={{paddingLeft: '25px', paddingRight: '15px', width: '338px'}} icon={ICON_LOCK}  styleBox={{margin: '0', width: '370px'}} 
							errorRes={errors.old_password}
							ref="oPass" refID="old_password"
							onChange={ (e) => this.update(e) }
							/>
				</div>

				<div className="f2x-account-input">
					<br />
					<F2xInput type="password" 
							placeholder='New Password'
							style={{paddingLeft: '25px', paddingRight: '15px', width: '338px'}} icon={ICON_LOCK}  styleBox={{margin: '0', width: '370px'}} 
							errorRes={errors.new_password}
							ref="nPass" refID="new_password"
							onChange={ (e) => this.update(e) }					
							/>
				</div>
				
				<div className="f2x-account-saves">
					<F2xButton name="CHANGE PASSWORD" 
						className="f2x-new-button-black small-font separated" 
						style={{height: '52px', width: '188px', fontSize: '11px'}}
						onClick={ () => this.savePass() } />
				</div>				
				
				{/*
				<div className="f2x-account-input"><br /><br /><br /><br />
					MOBILE NUMBER FOR PASSWORD RECOVERY<br />
					<F2xInput type="password" className="f2x-input-normal" style={{paddingLeft: '15px', paddingRight: '15px', width: '338px'}} styleBox={{margin: '0', width: '370px'}} />
				</div>
				
				
				<div className="f2x-account-saves">
					<F2xButton name="SAVE CHANGES" className="f2x-button-black f2x-button-big small-font separated f2x-account-share-button" onClick={ () => console.log("Save changes") } />
				</div>
				*/}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	const { flags } = state.evalChangePassword;
	const { email } = state.user;
	const { plan } = state;
	
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
		
	return {
		errors: errors,
		email: email,
		plan: plan.plan
	}
}

const F2xAccountEmailPassword = connect(
	mapStateToProps
)(f2xAccountEmailPassword);


export default F2xAccountEmailPassword;