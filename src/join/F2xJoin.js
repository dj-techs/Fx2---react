import React,  { Component } from 'react';
import { connect } from 'react-redux'
import { browserHistory } from 'react-router';








/*
 * GLOBAL Vars & Functions
 */
import { setVisibilityModal, ModalVisibilityFilters, ModalTypes } from '../actions'
import { joinRequest, socialConnect } from '../data/data'



/*
 * Components
 */
import F2xInput from '../components/F2xInput'
import F2xButton from '../components/F2xButton'
import F2xIcon from '../components/F2xIcon'



/*
 * Style
 */
import './F2xJoin.css';



/*
 * Icons
 */
import ICON_MAIL from '../media/email.svg';
import ICON_USER from '../media/input_user.svg';
import ICON_LOCK from '../media/input_lock.svg';
import ICON_VISA from '../media/icon_visa.svg';
import ICON_CARD from '../media/icon_card.svg';
import ICON_NO from '../media/icon_no.png'

import Instagram from '../media/instagram.svg';
import facebook from '../media/facebook.svg';






/*
 * Submit Button
 */
const actionButton = ({ onClick, enabled, spinner }) => (
	<div style={{marginTop: '5px', textAlign: 'center'}}>
		<F2xButton name="SUBMIT" 
			className={`f2x-new-button-black small-font separated f2x-login-sign-btn ${enabled ? '':' disabled'}`} 
			onClick={ () => onClick()}
			spinner={spinner} />
	</div>
);


const ActionButton = connect()(actionButton)

class f2xJoin  extends Component {

	constructor(props) {
	    super(props);
	    
	    this.state = { 
            value: {
	            username:'',
	            email:'',
	            password:''
	        },
	        errors:{},
	        enableValidation: false,
	        enableJoin:false,
            paypal: false,
	        spinner: false
	    };
	    
	    this.update = this.update.bind( this );    							 	// Generic UPDATE inner function for our Forms
	    this.procJoin = this.procJoin.bind( this );    							// Generic UPDATE inner function for our Forms
	}
	
	componentDidMount(){
		const { invite } = this.props; 
		
		const inviteID = invite ? invite.invite : false;
		
		if(inviteID){
			this.setState({
				value: Object.assign({}, this.state.value, {invite: inviteID})
			})
		}
	}
	
	componentWillReceiveProps(nextProps){

		let errors = {
			email:{status:1, msg:''},
			username:{status:1, msg:''},
			password:{status:1, msg:''}
		}

		if (nextProps.flags.errorMail !==  undefined) errors.email = {status:0, msg:nextProps.flags.errorMail};
		if (nextProps.flags.errorUser !==  undefined) errors.username = {status:0, msg:nextProps.flags.errorUser};
		
		this.setState(
			Object.assign({}, this.state,{
			    	errors: errors,
			    	spinner: false
		        })
	    )
	}
	
	update(){
		let tForm = {}														   // We defined the form values here
		tForm.username = this.refs.lUser.refs.username.value;				   // Component REF +  subcomponent REF
		tForm.email = 	 this.refs.lEmail.refs.email.value;				   	   
		tForm.password = this.refs.lPass.refs.password.value;	
		
		let enableJoin = this.validateUser(tForm.username) && this.validateEmail(tForm.email) && this.validatePassword(tForm.password);
		
		let errors = {}
		//if (this.state.enableValidation){
			errors.username = this.validateUser(tForm.username) ? {status:1, msg:''} : undefined;
			errors.password = this.validatePassword(tForm.password) ? {status:1, msg:''} : undefined;
			errors.email = 	  this.validateEmail(tForm.email) ? {status:1, msg:''} : undefined;
		//} 
		
		
		if (this.props.flags.errorEmail !==  undefined) errors.email = 0;
		if (this.props.flags.errorUser !==  undefined) errors.username = 0;
		
		this.setState(
			Object.assign({}, this.state,{
		    		value: {
			    		username: tForm.username,
			    		email: tForm.email,
			    		password: tForm.password
			    	},
			    	errors: errors,
			    	enableJoin:enableJoin
		        })
	    )
	}	
	
	
	procJoin(){
		if (this.state.enableJoin){
		   	joinRequest(this.state.value); 

		   	if (!this.state.enableValidation) {
				this.setState({
			    	enableValidation:true,
			    	spinner: true
		        })
		    }	   		
	    }
	}
	
	validateUser(user){
		return user !== '' && user.indexOf(' ') === -1 && user.length >= 6
	}
	
	validatePassword(passw){
		return passw !== '' && passw.indexOf(' ') === -1 && passw.length >= 6
	}
	
	validateEmail(email){
		var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return email !== '' && re.test(email);
	}	
	
	
	render() {
		const { dispatch, invite } = this.props; 
		
		
		
		const inviteID = invite ? invite.invite ? invite.invite : false : false;
		
		const newTitle = inviteID ? (<span>YOU HAVE BEEN INVITED!!<br /></span>) : '';
		
		
		const savein = invite ? invite.savein ? invite : {} : {};
		
		console.log(savein)
		
		return (
			<div className="cuerpo" style={{bottom: '0'}}>
				<div style={{ textAlign: 'center', marginTop: '50px', fontSize: '16px', lineHeight: '24px'}}>BECOME A</div>
				<div style={{ textAlign: 'center', fontSize: '20px', lineHeight: '20px'}}>PLATINUM MEMBER</div>
                <div style={{ textAlign: 'center', fontSize: '18px', marginTop: '15px'}}>$<span style={{fontSize: '30px'}}>12.99</span>/mo</div>
				<form onSubmit={(e) => e.preventDefault()}>
					<div style={{marginTop: '13px'}}>
						<div>
							<F2xInput className="f2x-input-long-2" styleBox={{marginBottom: '23px', width: 'CALC(100% - 50px)', maxWidth: '300px'}} placeholder="Email" icon={ICON_MAIL} 
									  errorRes={this.state.errors.email} ref="lEmail" refID="email" onChange={ (e) => { this.update(e) } } />
						</div>
					
						<div style={{marginTop: '13px'}}>
							<F2xInput className="f2x-input-long-2 f2x-small" styleBox={{marginBottom: '23px', width: 'CALC(100% - 50px)', maxWidth: '300px'}} placeholder="Username" styleSpan={{fontSize: '12px'}} icon={ICON_USER} 
									  errorRes={this.state.errors.username}  ref="lUser" refID="username" onChange={ (e) => { this.update(e) } }/>
						</div>
						
						<div style={{marginTop: '13px'}}>
							<F2xInput className="f2x-input-long-2 f2x-small" placeholder="Password" styleBox={{width: 'CALC(100% - 50px)', maxWidth: '300px'}} styleSpan={{fontSize: '12px'}} icon={ICON_LOCK} type="password"  
									  errorRes={this.state.errors.password} ref="lPass" refID="password" onChange={ (e) => { this.update(e) } }/>
                            <div style={{fontSize: '10px', color: '#9e9e9e', marginLeft: 'calc(50% - 150px)'}}>Password must be a minimum of 6 characters</div>
						</div>
                        <div style={{marginTop: '13px'}}>
							<F2xInput className="f2x-input-long-2 f2x-small" styleBox={{marginBottom: '23px', width: 'CALC(100% - 50px)', maxWidth: '300px'}} placeholder="Name on Card" styleSpan={{fontSize: '12px'}}
									  errorRes={this.state.errors.username}  ref="lName" refID="namoncard" onChange={ (e) => { this.update(e) } }/>
						</div>
                        <div style={{marginTop: '13px'}}>
							<F2xInput className="f2x-input-long-2 f2x-small" styleBox={{marginBottom: '23px', width: 'CALC(100% - 50px)', maxWidth: '300px'}} placeholder="Card Number" styleSpan={{fontSize: '12px'}} 
									  errorRes={this.state.errors.username}  ref="lName" refID="namoncard" onChange={ (e) => { this.update(e) } }/>
						</div>
                        <div style={{margin: '13px auto', width: '300px'}}>
							<F2xInput className="f2x-input-long-2 f2x-small" styleBox={{marginBottom: '23px', width: 'CALC(50% - 10px)', maxWidth: '150px', marginRight: '20px', display: 'inline-block' }} placeholder="Exp.Date" styleSpan={{fontSize: '12px'}}
									  errorRes={this.state.errors.username}  ref="lName" refID="namoncard" onChange={ (e) => { this.update(e) } }/>
                            <F2xInput className="f2x-input-long-2 f2x-small" styleBox={{marginBottom: '23px', width: 'CALC(50% - 10px)', maxWidth: '150px', display: 'inline-block' }} placeholder="CVV" styleSpan={{fontSize: '12px'}}
									  errorRes={this.state.errors.username}  ref="lName" refID="namoncard" onChange={ (e) => { this.update(e) } }/>
						</div>
					</div>
					<div style={{ fontSize: '13px', margin: '3px auto', lineHeight: '16px', textDecoration: 'underline', textAlign: 'center', color: '#9e9e9e' }}>Payment Terms & Conditions</div>					
					<ActionButton spinner={this.state.spinner} value={this.state.value} enabled={this.state.enableJoin} onClick={() => this.procJoin()}/>
				</form>
				
				<div style={{ margin: '0 auto', marginTop: '5px', maxWidth: '300px', textAlign: 'center', color: this.state.paypal? '#414141' : '#9e9e9e'}}>
				    <div className = {this.state.paypal? 'f2x-paypal' : 'f2x-paypal-disabled'}/>PAY WITH PAYPAL
				</div>
				
				<div className="small-font" style={{ maxWidth: '300px', margin: '5px auto', textAlign: 'center', color: '#414141'}}>
					Already a member?{'  '}
                    <span onClick={() => { browserHistory.push('/signin')} } style={{textDecoration: 'underline', cursor: 'pointer'}}>
                        Sign In
                    </span>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		flags: state.evalJoin.flags
	};
}


const F2xJoin = connect(
	mapStateToProps,
	null
)(f2xJoin);


export default F2xJoin;