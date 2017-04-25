import React,  { Component } from 'react';
import { connect } from 'react-redux'







/*
 * GLOBAL Vars & Functions
 */
import { setVisibilityModal, ModalVisibilityFilters, ModalTypes } from '../../actions'
import { joinRequest, socialConnect } from '../../data/data'



/*
 * Components
 */
import F2xInput from '../../components/F2xInput'
import F2xButton from '../../components/F2xButton'



/*
 * Style
 */
import './F2xJoin.css';



/*
 * Icons
 */
import ICON_MAIL from '../../media/email.svg';
import ICON_USER from '../../media/input_user.svg';
import ICON_LOCK from '../../media/input_lock.svg';

import Instagram from '../../media/instagram.svg';
import facebook from '../../media/facebook.svg';









class LoginFB extends Component{
  	onClick(){
		window['FB'].login(
			(response) => {
				if (response.authResponse) {
					const access_token = window['FB'].getAuthResponse()['accessToken'];
					
					socialConnect("facebook", access_token)
				} else {
					console.log('User cancelled login or did not fully authorize.');
				}
			}, 
			{
				scope: ''
			}
		);
  	}
 
  	render () {
	    return (
			<div>
				<button onClick={() => this.onClick()}>
					JOIN WITH FACEBOOK
				</button>
			</div>
	    );
  	}
}




class LoginINSTA extends Component{
	onClick(){
		const clientId = 'd2b9017ede104311be3ad394e1736892';			// F2X test client
		//const clientId = 'e9c2a9a1f227469c86245efde80eb10a';			// jeekjee test client
		
		const redirect = location.href +'social/instagram/complete/signup/';
	
		const URL = 'https://api.instagram.com/oauth/authorize/?client_id='+ clientId +'&redirect_uri='+ redirect +'&response_type=token';
		
		window.location = URL;
	}
	
	
	render() {
		return (
			<div>
				<button onClick={() => this.onClick()}>
					JOIN WITH INSTAGRAM
				</button>
			</div>
		);
	}
}










/*
 * Login Button
 */
const actionButton = ({ onClick, enabled, spinner }) => (
	<div style={{marginTop: '35px'}}>
		<F2xButton name="JOIN NOW" 
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
				<div className="f2x-modal-title pc">{newTitle}JOIN FOR FREE!</div>
				
				<form onSubmit={(e) => e.preventDefault()}>
					<div style={{marginTop: '60px'}}>
						<div>
							<F2xInput className="f2x-input-long-2" styleBox={{marginBottom: '23px', width: 'CALC(100% - 50px)', maxWidth: '300px'}} placeholder="Email" icon={ICON_MAIL} 
									  errorRes={this.state.errors.email} ref="lEmail" refID="email" onChange={ (e) => { this.update(e) } } />
						</div>
					
						<div style={{marginTop: '13px'}}>
							<F2xInput className="f2x-input-long-2 f2x-small" styleBox={{marginBottom: '23px', width: 'CALC(100% - 50px)', maxWidth: '300px'}} placeholder="Username (no spaces, min 6 characters)" styleSpan={{fontSize: '12px'}} icon={ICON_USER} 
									  errorRes={this.state.errors.username}  ref="lUser" refID="username" onChange={ (e) => { this.update(e) } }/>
						</div>
						
						<div style={{marginTop: '13px'}}>
							<F2xInput className="f2x-input-long-2 f2x-small" placeholder="Password  (no spaces, min 6 characters)" styleBox={{width: 'CALC(100% - 50px)', maxWidth: '300px'}} styleSpan={{fontSize: '12px'}} icon={ICON_LOCK} type="password"  
									  errorRes={this.state.errors.password} ref="lPass" refID="password" onChange={ (e) => { this.update(e) } }/>
						</div>
					</div>
					
					
					<ActionButton spinner={this.state.spinner} value={this.state.value} enabled={this.state.enableJoin} onClick={() => this.procJoin()}/>
				</form>
				
				<div style={{marginTop: '25px'}}>
					- or -
				</div>
				
				<div className="f2x-login-buttons">
					<div style={{paddingTop: '2px'}}>
						<img src={Instagram} width="20" height="20" alt="Instagram" style={{paddingRight: '20px', float: 'left', marginTop: '-2px'}} /> <LoginINSTA />
					</div>
					
					<div style={{marginTop: '20px', paddingTop: '2px'}}>
						<img src={facebook} width="20" height="20" alt="Facebook" style={{paddingRight: '20px', float: 'left', marginTop: '-2px'}} /> <LoginFB />
					</div>
				</div>
				
				
				
				<div className="footer-link-sign small-font">
					Already a member?
					<div>
						<span onClick={() => dispatch( setVisibilityModal(ModalVisibilityFilters.SHOW, ModalTypes.SIGN_IN, savein) ) } style={{textDecoration: 'underline', cursor: 'pointer'}}>
							Sign In
						</span>
					</div>
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