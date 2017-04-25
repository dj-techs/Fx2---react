import React , { Component } from 'react';
import { connect } from 'react-redux'






/*
 * GLOBAL Vars & Functions
 */
import { setVisibilityModal, ModalVisibilityFilters, ModalTypes } from '../../actions'
import { loginRequest, socialConnect } from '../../data/data'



/*
 * Components
 */
import F2xInput from '../../components/F2xInput'
import F2xButton from '../../components/F2xButton'



/*
 * Style
 */
import './F2xSignIn.css';



/*
 * Icons
 */
import icon_user from '../../media/input_user.svg';
import input_lock from '../../media/input_lock.svg';

import Instagram from '../../media/instagram.svg';
import facebook from '../../media/facebook.svg';








class LoginFB extends Component{
  	onClick(){
		window['FB'].login(
			(response) => {
				if (response.authResponse) {
					const access_token = window['FB'].getAuthResponse()['accessToken'];
					
					socialConnect("facebook", access_token);
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
					SIGN IN WITH FACEBOOK
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
					SIGN IN WITH INSTAGRAM
				</button>
			</div>
		);
	}
}






/*
 * Login Button
 */
const actionButton = ({  onClick, enabled, spinner }) => (
	<div className="f2x-signin-btn">
		<F2xButton name="SIGN IN"
			className={`f2x-new-button-black small-font separated f2x-login-sign-btn ${enabled ? '':' disabled'}`} 
			onClick={ () => onClick() }
			spinner={spinner} />
	</div>
);


const ActionButton = connect()(actionButton)



class f2xSignIn  extends Component {
	
	constructor(props) {
	    super(props);
	    
	    this.state = { 
            value: {
	            username:'',
	            password:''
	        },
	        errors:{},
	        enableValidation: false,
	        enableLogin:false,
	        spinner: false
	    };
	    
	    this.update = this.update.bind( this );    							 	// Generic UPDATE inner function for our Forms
	    this.procLogin = this.procLogin.bind( this );    					    // Generic UPDATE inner function for our Forms
	}	
	
	
	componentWillReceiveProps(nextProps){

		let errors = {
			username:{status:1, msg:''},
			password:{status:1, msg:''}
		}

		if (nextProps.flags.error !==  undefined) {
			errors.username = {status:0, msg:''};
			errors.password= {status:0, msg:nextProps.flags.error};
		}	
		
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
		tForm.password = this.refs.lPass.refs.password.value;	
		
		let enableLogin = this.validateUser(tForm.username) && this.validatePassword(tForm.password);
		
		let errors = {}
		if (this.props.flags.errorUser !==  undefined) errors.username = {status:0, msg:''};
		
		this.setState(
			Object.assign({}, this.state,{
		    		value: {
			    		username: tForm.username,
			    		password: tForm.password
			    	},
			    	errors: errors,
			    	enableLogin:enableLogin
		        })
	    )
	}	
	

	procLogin(){
		const { savein } = this.props; 
		
		const saveDatas = savein ? savein : {};
		
		if (this.state.enableLogin){
		   	loginRequest(this.state.value, saveDatas); 
		   	
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

	
	render(){
		const { dispatch, savein } = this.props; 
		
		const saveDatas = savein ? savein : {};
		
		return(
			<div className="cuerpo" style={{bottom: '0'}}>
				<div className="f2x-modal-title pc">SIGN IN</div>
				
				<form onSubmit={(e) => e.preventDefault()}>
					<div style={{marginTop: '60px'}}>
						<div>
							<F2xInput className="f2x-input-long-2" placeholder="Email or Username" icon={icon_user} styleBox={{marginBottom: 23, width: 'CALC(100% - 50px)', maxWidth: '300px'}} 
									errorRes={this.state.errors.username} ref="lUser" refID="username" onChange={ (e) => { this.update(e) } }/>
						</div>
						
						<div style={{marginTop: '13px'}}>
							<F2xInput className="f2x-input-long-2" placeholder="Password" icon={input_lock} textR="Forgot?" 
									errorRes={this.state.errors.password} ref="lPass" refID="password" onChange={ (e) => { this.update(e) } }
									textRClick={()=> dispatch( setVisibilityModal(ModalVisibilityFilters.SHOW, ModalTypes.RESET_PASSWORD) ) } type="password" styleBox={{width: 'CALC(100% - 50px)', maxWidth: '300px'}} />
						</div>
					</div>
					
					
					<ActionButton spinner={this.state.spinner} value={this.state.value} enabled={this.state.enableLogin} onClick={() => this.procLogin()} />
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
				
				
				
				<div className="footer-link-join small-font">
					Not yet a member?
					<div>
						<span onClick={() => dispatch( setVisibilityModal(ModalVisibilityFilters.SHOW, ModalTypes.JOIN) ) } style={{textDecoration: 'underline', cursor: 'pointer'}}>
							join
						</span>
					</div>
				</div>
			</div>
		);
	}
}


const mapStateToProps = (state) => {
	return {
		flags: state.evalLogin.flags
	};
}

const F2xSignIn = connect(
	mapStateToProps,
	null
)(f2xSignIn);



export default F2xSignIn;

