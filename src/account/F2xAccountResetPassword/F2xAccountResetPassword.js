import React, {Component} from 'react';
import { connect } from 'react-redux'
import { browserHistory } from 'react-router';



/*
 * Global Vars & Functions
 */
import { passwordReset } from '../../data/data';



/*
 * Components
 */
import F2xInput from '../../components/F2xInput';
import F2xButton from '../../components/F2xButton';




/*
 * Style
 */
import './F2xAccountResetPassword.css';



/*
 * Icon
 */
import ICON_LOCK from '../../media/input_lock.svg';




class f2xAccountResetPassword extends Component {
	constructor(props){
		super(props);
		
		this.state = {
			errors: {},
			enable: false
		}
		
		
		this.onChange = this.onChange.bind(this);
	}
	
	
	componentDidMount() {
		document.body.style.height = innerHeight+"px";
		document.body.style.overflowX = 'hide';
		document.body.style.position = 'fixed';
		document.body.style.width = '100%';
		document.body.style.height = '100%';
		document.body.style.top = '0';
		document.body.style.left = '0';
	}
	
	componentWillMount() {
		if(location.search.split('&')[0].split("=")[1] === undefined)
			browserHistory.push("/");
	}
	
	componentWillReceiveProps(nextProps) {
		if(nextProps.login)
			browserHistory.push("/");
	}
	
	
	resetPassword(){
		if(!this.state.enable) return;
		
		const password = this.refs.nPass.refs.pass.value;
		const passwordR = this.refs.nPassR.refs.pass.value;
		
		let errors = {
			password:{status:1, msg:''},
			passwordRepeat:{status:1, msg:''}
		}
		
		if(password === '' || passwordR === '' || password !== passwordR){
			errors = {
				password:{status:0, msg:''},
				passwordRepeat:{status:0, msg:'password error'}
			}
		}
		else{
			const token = location.search.split('&')[0].split("=")[1];
			
			// SEND CHANGE PASSWORD
			
			const errorCallback = (error) => {
				errors = {
					password:{status:0, msg:''},
					passwordRepeat:{status:0, msg:error.error}
				}
				
				this.setState({
					errors: errors
				});
			}
			passwordReset(token, password, errorCallback)
			
		}
		
		this.setState({
			errors: errors
		});
	}
	
	onChange(){
		const password = this.refs.nPass.refs.pass.value;
		const passwordR = this.refs.nPassR.refs.pass.value;
		
		let enable = false;
		
		if(password.length >= 6 && passwordR.length >= 6) enable = true;
		
		this.setState({
			enable: enable,
			errors: {}
		})
	}
	
	render(){
		return (
			<div className="mobileOptions">
				<div className="f2x-reset-title">
					RESET PASSWORD
				</div>
				
				<div className="f2x-reset-inputs">
					<F2xInput type="password" 
							placeholder='New Password'
							style={{paddingLeft: '25px', paddingRight: '15px', width: '338px'}} icon={ICON_LOCK}  styleBox={{margin: '45px 0 25px 0', width: '370px'}} 
							ref="nPass" refID="pass"
							errorRes={this.state.errors.password} 
							onChange={() => this.onChange()}
							/>
		
					
					<F2xInput type="password" 
							placeholder='Repeat New Password'
							style={{paddingLeft: '25px', paddingRight: '15px', width: '338px'}} icon={ICON_LOCK}  styleBox={{margin: '0 0 45px 0', width: '370px'}} 
							ref="nPassR" refID="pass"
							errorRes={this.state.errors.passwordRepeat}  
							onChange={() => this.onChange()}
							/>
					
					<center>
						<F2xButton name="RESET PASSWORD" 
							className={`f2x-new-button-black small-font separated${this.state.enable ? '':' disabled'}`}
							style={{height: '52px', width: '188px', fontSize: '11px'}}
							onClick={ () => this.resetPassword() } />
					</center>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	const { user } = state;
	
	return {
		login: user.login
	}
}

const F2xAccountResetPassword = connect(
	mapStateToProps
)(f2xAccountResetPassword);


export default F2xAccountResetPassword;