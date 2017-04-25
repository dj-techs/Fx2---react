import React, { Component } from 'react';





/*
 * Global Vars & Functions
 */
import { connect } from 'react-redux'
import { requestPasswordReset } from '../../data/data';



/*
 * Components
 */
import F2xInput from '../../components/F2xInput'
import F2xButton from '../../components/F2xButton'



/*
 * Style
 */
import './F2xResetPassword.css';



/*
 * Icons
 */
import icon_email from '../../media/email.svg';
import input_ok from '../../media/input_ok.svg';
import input_error from '../../media/input_error.svg';




/*
 * Login Button
 */
const ActionButton = (props) => (
	<div style={{marginTop: '35px', marginBottom: '45px'}}>
		<F2xButton name="SEND" 
			className="f2x-new-button-black small-font separated" 
			style={{height: '52px', width: '188px', fontSize: '12px'}}
			onClick={ () => props.onClick(props.move) } />
	</div>
);




/*
 * RESET PASSWORD [1]
 */

class f2xResetPassword1 extends Component {
	constructor(props){
		super(props);
		
		const error = undefined
		
		this.state = {
			error: error
		}
		
		this.onClick = this.onClick.bind( this );
		this.update = this.update.bind(this);
	}
	
	onClick(call){
		const value = this.refs.username.refs.usernameInput.value;
		
		const newError = {
			status: 0,
			msg: ''
		}
		
		if(value === ''){
			newError.status = 0;
			newError.msg = 'Username needed';
			
			this.setState({
				error: newError
			})
		}
		else{
			if(!this.validateEmail(value)){
				newError.status = 0;
				newError.msg = 'Please enter a valid email address';
				
				this.setState({
					error: newError
				})
				
				return;
			}
			
			requestPasswordReset( value, call );
		}
	}
	
	validateEmail(email){
		var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return email !== '' && re.test(email);
	}	
	
	update(){
		this.setState({
			error: undefined
		})
	}
	
	render() {
		const {error} = this.state;
		const {move} = this.props;
		
		return  (
			<div className="cuerpo">
				<div className="f2x-modal-title">FORGOT YOUR PASSWORD?</div>
				
				<div className="small-font separated f2x-modal-reset-text montse_light">
					Enter your email address below and we´ll email you a link to reset your password.
				</div>
				
				<div>
					<div>
						<F2xInput className="f2x-input-long" placeholder="Email" ref="username" refID="usernameInput" icon={icon_email} errorRes={error} onChange={ this.update } />
					</div>
				</div>
				
				
				<ActionButton onClick={ this.onClick } move={move} />
			</div>
		);
	}
}

const F2xResetPassword1 = connect()(f2xResetPassword1);



/*
 * RESET PASSWORD [2]
 */
 
const F2xResetPassword2 = ({dispatch, user, back}) => {
	if(!user){
		return(<span></span>);
	}
	
	const icon = user.status === 1 ? input_ok : input_error;
	const footText = user.status === 1 ? 
		(
		<div className="small-font" style={{fontSize: '14px', width: '260px', margin: '0 auto 75px auto'}}>			
			If you did not receive it, check your spam folder, or request a new link
		</div>
		) 
		: 
		'';
		
	
	const footText2 = user.status !== 1 ? 
		(
		<div style={{fontSize: '18px', marginBottom: '40px'}}>			
			<span onClick={() => back(1)}>Back</span>
		</div>
		) 
		: 
		'';

	
	return (
		<div style={{textAlign:'center'}}>
			<div className="f2x-modal-title">RESET PASSWORD</div>
			
			
			<div style={{marginTop: '24px'}}>
				<img src={icon} alt="Reset Password Send" width="150" height="150" />
			</div>
			
			
			
			<div className="small-font" style={{fontSize: '14px', width: '270px', margin: '20px auto 18px auto'}}>			
				{user.data}
			</div>
			
			
			<div style={{fontSize: '18px', marginBottom: '40px'}}>			
				{user.user}
			</div>
			
			
			{footText2}
			
			{footText}
		</div>
	);
}




class F2xResetPassword extends Component {
	constructor(props){
		super(props);
		
		this.state = {
			modal: '1'
		}
		
		this.move = this.move.bind(this);
	}
	
	move(id) {
		this.setState({
			modal: id
		});
	}
	
	render() {
		const { user } = this.props;
		const { modal } = this.state;
		
		let renderR = '';
		
		switch(modal +""){
			case '1':
				renderR = (<F2xResetPassword1 onClick={ this.onClick } error={this.error} ref="box" move={this.move} />);
				break;
			
			case '2':
				renderR = (<F2xResetPassword2 user={user} back={this.move} />);
				break;
				
			default:
				break;
				
		}
		
		return renderR;
	}
}



export default F2xResetPassword;

