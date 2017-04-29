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
	            password:'',
				cardnumber: '',
				cardname: '',
				expdate: '',
				cvv: ''
	        },
	        errors:{},
	        enableValidation: false,
	        enableJoin:false,
            paypal: false,
	        spinner: false,
			signable: false,
			cvvhelp: false,
			payhelp: false
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
			password:{status:1, msg:''},
			cardnumber:{status:1, msg:''},
			cardname:{status:1, msg:''},
			expdate:{status:1, msg:''},
			cvv:{status:1, msg:''}
		}
		
		if (nextProps.flags.errorMail !==  undefined) errors.email = {status:0, msg:nextProps.flags.errorMail};
		if (nextProps.flags.errorUser !==  undefined) errors.username = {status:0, msg:nextProps.flags.errorUser};
		
		if (nextProps.flags.signable){
			this.setState(
			Object.assign({}, this.state,{
			    	errors: errors,
			    	spinner: false,
					signable: true
		        }))
		} else {
			this.setState(
			Object.assign({}, this.state,{
			    	errors: errors,
			    	spinner: false,
					signable: false
		        }))
		}
	}
	
	update(){
		let tForm = {}														   // We defined the form values here
		tForm.username = 	this.refs.lUser.refs.username.value;				   // Component REF +  subcomponent REF
		tForm.email = 	 	this.refs.lEmail.refs.email.value;				   	   
		tForm.password = 	this.refs.lPass.refs.password.value;
		tForm.cardnumber = 	this.refs.lcNum.refs.cardnumber.value;
		tForm.cardname = 	this.refs.lcName.refs.cardname.value;
		tForm.expdate = 	this.refs.lDate.refs.expdate.value;
		tForm.cvv = 		this.refs.lCvv.refs.cvv.value;
		
		let enableJoin = this.validateUser(tForm.username) && this.validateEmail(tForm.email) && this.validatePassword(tForm.password) && this.validateCardname(tForm.cardname) && this.validateCardnumber(tForm.cardnumber) && this.validateExpdate(tForm.expdate) && this.validateCvv(tForm.cvv);

		let enablePaypal = this.validateUser(tForm.username) && this.validateEmail(tForm.email) && this.validatePassword(tForm.password);

		console.log(this.state.paypal);

		if( enablePaypal ) {
			this.state.paypal = true;
		}
		
		let errors = {}
		//if (this.state.enableValidation){
			errors.username = this.validateUser(tForm.username) ? {status:1, msg:''} : undefined;
			errors.password = this.validatePassword(tForm.password) ? {status:1, msg:''} : undefined;
			errors.email = 	  this.validateEmail(tForm.email) ? {status:1, msg:''} : undefined;
			errors.cardname = 	  this.validateCardname(tForm.cardname) ? {status:1, msg:''} : undefined;
			errors.cardnumber = 	  this.validateCardnumber(tForm.cardnumber) ? {status:1, msg:''} : undefined;
			errors.expdate = 	  this.validateExpdate(tForm.expdate) ? {status:1, msg:''} : undefined;
			errors.cvv = 	  this.validateCvv(tForm.cvv) ? {status:1, msg:''} : undefined;
		//} 
		
		
		if (this.props.flags.errorEmail !==  undefined) errors.email = 0;
		if (this.props.flags.errorUser !==  undefined) errors.username = 0;
		
		this.setState(
			Object.assign({}, this.state,{
		    		value: {
			    		username: tForm.username,
			    		email: tForm.email,
			    		password: tForm.password,
						cardname: tForm.cardname,
						cardnumber: tForm.cardnumber,
						expdate: tForm.expdate,
						cvv: tForm.cvv
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

	validateCardname(data){
		var re = /^[a-z ,.'-]+$/i;
		return data !== '' && re.test(data);
	}

	validateCardnumber(data){
		var re = /^4[0-9]{12}(?:[0-9]{3})?$/;

		return data !== '' && re.test(data);
	}

	validateExpdate(data){
		var re = /^^(0[1-9]|1[0-2])\/(0[1-9]|[1-2][0-9]|3[0-1])$/
		return data !== '' && re.test(data)
	}

	validateCvv(data){
		var re = /^[0-9]{3,4}$/;
		return data !== '' && re.test(data)
	}
	
	validateEmail(email){
		var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return email !== '' && re.test(email)
	}

	showCvvHelp = () => {
		this.setState(
			Object.assign({}, this.state, {cvvhelp: true})
		)
	}

	hideCvvHelp = () => {
		this.setState(
			Object.assign({}, this.state, {cvvhelp: false})
		)
	}

	showPayHelp = () => {
		this.setState(
			Object.assign({}, this.state, {payhelp: true})
		)
	}

	hidePayHelp = () => {
		this.setState(
			Object.assign({}, this.state, {payhelp: false})
		)
	}
	
	render() {
		const { dispatch, invite } = this.props; 
		const inviteID = invite ? invite.invite ? invite.invite : false : false;		
		const newTitle = inviteID ? (<span>YOU HAVE BEEN INVITED!!<br /></span>) : '';
		const savein = invite ? invite.savein ? invite : {} : {};
		
		return (
			<div className="cuerpo" style={{bottom: '0'}}>
				<div className={ this.state.signable? 'hidden' : '' } style={{ textAlign: 'center', marginTop: '50px', fontSize: '16px', lineHeight: '24px'}}>BECOME A</div>
				<div style={{ textAlign: 'center', fontSize: '20px', lineHeight: '20px', marginTop: this.state.signable? '74px' : '0'}}>PLATINUM MEMBER</div>
                <div className={ this.state.signable? 'hidden' : '' } style={{ textAlign: 'center', fontSize: '18px', marginTop: '15px'}}>$<span style={{fontSize: '30px'}}>12.99</span>/mo</div>
				<div className={ this.state.signable? 'f2x-welcome' : 'hidden'} />
				<form className={ this.state.signable? 'hidden' : '' } onSubmit={(e) => e.preventDefault()} style={{ position: 'relative' }}>
					<div style={{marginTop: '13px'}}>
						<div>
							<F2xInput className="f2x-input-long-2" styleBox={{width: 'CALC(100% - 50px)', maxWidth: '310px'}} placeholder="Email" icon={ICON_MAIL} 
									  errorRes={this.state.errors.email} ref="lEmail" refID="email" onChange={ (e) => { this.update(e) } } />
						</div>
					
						<div style={{marginTop: '13px'}}>
							<F2xInput className="f2x-input-long-2 f2x-small" styleBox={{ width: 'CALC(100% - 50px)', maxWidth: '310px'}} placeholder="Username" styleSpan={{fontSize: '12px'}} icon={ICON_USER} 
									  errorRes={this.state.errors.username}  ref="lUser" refID="username" onChange={ (e) => { this.update(e) } }/>
						</div>
						
						<div style={{marginTop: '13px'}}>
							<F2xInput className="f2x-input-long-2 f2x-small" placeholder="Password" styleBox={{width: 'CALC(100% - 50px)', maxWidth: '310px'}} styleSpan={{fontSize: '12px'}} icon={ICON_LOCK} type="password"  
									  errorRes={this.state.errors.password} ref="lPass" refID="password" onChange={ (e) => { this.update(e) } }/>
 						</div>
                        <div style={{marginTop: '13px'}}>
							<F2xInput className="f2x-input-long-2 f2x-small" styleBox={{width: 'CALC(100% - 50px)', maxWidth: '310px'}} placeholder="Name on Card" styleSpan={{fontSize: '12px'}}
									  errorRes={this.state.errors.cardname}  ref="lcName" refID="cardname" onChange={ (e) => { this.update(e) } }/>
						</div>
                        <div style={{marginTop: '13px'}}>
							<F2xInput className="f2x-input-long-2 f2x-small" styleBox={{width: 'CALC(100% - 50px)', maxWidth: '310px'}} placeholder="Card Number" styleSpan={{fontSize: '12px'}} icon={ ICON_VISA}
									  errorRes={this.state.errors.cardnumber}  ref="lcNum" refID="cardnumber" onChange={ (e) => { this.update(e) } }/>

						</div>
                        <div style={{margin: '13px auto', width: '310px', position: 'relative'}}>
							<F2xInput className="f2x-input-long-2 f2x-small" styleBox={{width: 'CALC(50% - 15px)', maxWidth: '140px', marginRight: '30px', display: 'inline-block' }} placeholder="Exp.Date" styleSpan={{fontSize: '12px'}}
									  errorRes={this.state.errors.expdate}  ref="lDate" refID="expdate" onChange={ (e) => { this.update(e) } }/>
							<F2xInput className="f2x-input-long-2 f2x-small" styleBox={{width: 'CALC(50% - 15px)', maxWidth: '140px', display: 'inline-block' }} placeholder="CVV" styleSpan={{fontSize: '12px'}}
									  errorRes={this.state.errors.cvv}  ref="lCvv" refID="cvv" onChange={ (e) => { this.update(e) } }/>
							<div className='f2x-input-comment' onMouseOver={this.showCvvHelp} onClick={this.showCvvHelp}/>
							<div className={ this.state.cvvhelp? 'f2x-cvv-comment' : 'hidden'} onClick={ this.hideCvvHelp }/>
						</div>
					</div>
					<div style={{ fontSize: '13px', margin: '3px auto', lineHeight: '16px', textDecoration: 'underline', textAlign: 'center', color: '#9e9e9e' }} onClick={this.showPayHelp}>Payment Terms & Conditions</div>	
					<div className={ this.state.payhelp? 'f2x-payment-comment' : 'hidden'} onClick={ this.hidePayHelp }>Lorem quick brown fox jumps over lazy dog Lorem quick brown fox jumps over lazy dog Lorem quick brown fox jumps over lazy dog Lorem quick brown fox jumps over lazy dog Lorem quick brown fox jumps over lmps over lazy dog Lorem quick brown fox jumps over lazy dog Lorem quick brown fox jumps over lazy dog</div>				
					<ActionButton spinner={this.state.spinner} value={this.state.value} enabled={this.state.enableJoin} onClick={() => this.procJoin()}/>
					
				</form>
				<button className = {this.state.signable? 'f2x-new-button-black' : 'hidden'  }  style={{width: '210px', height: '52px', marginLeft: 'calc(50% - 105px)'}}>BUILD A WORKOUT</button>
				<div className={ this.state.signable? 'hidden' : '' } style={{ margin: '0 auto', marginTop: '5px', maxWidth: '310px', textAlign: 'center', color: this.state.paypal? '#414141' : '#9e9e9e'}} onClick={ () => { if(this.state.paypal){ browserHistory.push('paypalsingin') } } }>
				    <div className = {this.state.paypal? 'f2x-paypal' : 'f2x-paypal-disabled'}/>PAY WITH PAYPAL
				</div>
				
				<div className={ this.state.signable? 'hidden' : '' + "small-font" } style={{ maxWidth: '310px', margin: '5px auto', textAlign: 'center', color: '#414141'}}>
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