import React,  { Component } from 'react';
import { connect } from 'react-redux'





/*
 * GLOBAL Vars & Functions
 */
import { setVisibilityModal, ModalVisibilityFilters, setEmail } from '../../actions'
import { editEmail } from '../../data/data'



/*
 * Components
 */
import F2xInput from '../../components/F2xInput'
import F2xButton from '../../components/F2xButton'



/*
 * Style
 */
import './F2xEditEmail.css';



/*
 * Icons
 */
import ICON_OK from '../../media/form_ok.svg';














/*
 * Login Button
 */
const ActionButton = ({ onClick, enabled }) => (
	<div style={{marginTop: '55px'}}>
		<F2xButton 	name="UPDATE" 
					className={`f2x-new-button-black small-font separated${enabled ? '':' disabled'}`} 
					style={{height: '52px', width: '188px', fontSize: '12px'}}
					onClick={ () => onClick()} />
	</div>
);



class ModalPart1 extends Component {
	
	
	render() {
		const {update, state, procUpdate, dispatch} = this.props;
		
		return (
			<div>
				<div style={{marginTop: '60px'}}>
					<div>
						<F2xInput 	style={{paddingLeft: '0', paddingRight: '0', width: '300px'}} 
									styleBox={{margin: '0 auto', width: '300px'}} 
									placeholder="New Email Address" 
									errorRes={state.errors.email} 
									ref="lEmail" 
									refID="email" 
									onChange={ (e) => { update(e) } } />
					</div>
				
					<div style={{marginTop: '13px'}}>
						<F2xInput 	type="password"
									style={{paddingLeft: '0', paddingRight: '0', width: '300px'}} 
									styleBox={{margin: '0 auto', width: '300px'}}  
									placeholder="Confirm Your Password"
									errorRes={state.errors.password}  
									ref="lPass" 
									refID="password" 
									onChange={ (e) => { update(e) } }/>
					</div>
				</div>
				
				
				<ActionButton  value={state.value} enabled={state.enableJoin} onClick={() => procUpdate()}/>
				
				
				<div className="footer-link-sign small-font" style={{marginTop: '15px'}}>
					<span onClick={() => dispatch( setVisibilityModal(ModalVisibilityFilters.HIDE) ) } style={{textDecoration: 'underline', cursor: 'pointer', color: '#222', fontSize: '12px'}}>
						CANCEL
					</span>
				</div>
			</div>
		)
	}
}





const ModalPart2 = (props) => {
	const {dispatch} = props;
	
	return (
		<div>
			<div style={{textAlign: 'center', marginTop: '45px', marginBottom: '15px'}}>
				<img src={ICON_OK} alt="OK" width="65" />
			</div>
			
			<div className="small-font separated" style={{fontSize: '15px'}}>
				<b>YOU’RE ALMOST THERE!</b>
			</div>
			
			<div className="small-font separated" style={{width: '370px', margin: '12px auto 0 auto', fontSize: '14px'}}>
				Please check your inbox for your verification email. Once verified, the change will be reflected on the Account page.
			</div>
			
			<div style={{marginTop: '30px', marginBottom: '80px'}}>
				<F2xButton 	name="CLOSE" 
							className={`f2x-new-button-black small-font separated`} 
							style={{height: '52px', width: '188px', fontSize: '12px'}}
							onClick={ () => dispatch( setVisibilityModal(ModalVisibilityFilters.HIDE) ) } />
			</div>
		</div>
	)
}





class f2xEditEmail  extends Component {
	constructor(props) {
	    super(props);
	    
	    this.state = { 
            value: {
	            email:'',
	            password:''
	        },
	        errors:{},
	        enableValidation: false,
	        enableJoin:false,
	        mode: 0
	    };
	    
	    this.update = this.update.bind( this );    							 	// Generic UPDATE inner function for our Forms
	    this.procUpdate = this.procUpdate.bind( this );    							// Generic UPDATE inner function for our Forms
	    
	    this.callbackUpdate = this.callbackUpdate.bind(this);
	}
	
	
	componentWillReceiveProps(nextProps){
		let errors = {
			email: undefined, //{status:1, msg:''},
			password: undefined //{status:1, msg:''}
		}

		
		this.setState(
			Object.assign({}, this.state,{
			    	errors: errors
		        })
	    )
	}
	
	update(){
		let tForm = {}															// We defined the form values here
		tForm.email = 	 this.refs.modal.refs.lEmail.refs.email.value;				   		// Component REF +  subcomponent REF
		tForm.password = this.refs.modal.refs.lPass.refs.password.value;	
		
		let enableJoin = this.validateEmail(tForm.email) && this.validatePassword(tForm.password);
		
		let errors = {}
		//if (this.state.enableValidation){
			errors.password = this.validatePassword(tForm.password) ? {status:1, msg:''} : undefined;
			errors.email = 	  this.validateEmail(tForm.email) ? {status:1, msg:''} : undefined;
		//} 
		
		this.setState({
    		value: {
	    		email: tForm.email,
	    		password: tForm.password
	    	},
	    	errors: errors,
	    	enableJoin:enableJoin
        })
	}	
	
	
	validatePassword(passw){
		return passw !== '' && passw.indexOf(' ') === -1 && passw.length >= 6
	}
	
	validateEmail(email){
		var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return email !== '' && re.test(email);
	}	
	
	
	
	procUpdate(){
		if (this.state.enableJoin && !this.state.enableValidation){
			editEmail({email: this.state.value.email}, this.callbackUpdate, this.callbackError);
			
			this.setState({
				enableValidation: true
			});
	    }
	}
	
	
	callbackUpdate(resp){
		const {update} = this.props;
		
		update(resp.user.email);
		
		this.setState({
			enableValidation: false,
			mode: 1
		});
	}
	
	
	callbackError(resp){
		console.log("ERROR", resp)
		this.setState({
			enableValidation: false
		});
	}
	
	
	
	render() {
		const { dispatch } = this.props;
		
		const drawModal = this.state.mode === 0 ? 
			(<ModalPart1 ref="modal" update={this.update} state={this.state} procUpdate={this.procUpdate} dispatch={dispatch} />) 
			: 
			(<ModalPart2 dispatch={dispatch} />);
		
		return (
			<div className="cuerpo" style={{bottom: '0'}}>
				<div className="f2x-modal-title pc">EMAIL CHANGE REQUEST</div>
				
				{drawModal}
			</div>
		)
	}
}


const mapStateToProps = (state, dispatch) => {
	const {user} = state;
	
	return {
		user: user
	}
}



const mapDispatchToProps = (dispatch) => {
	return {
    	update: (email) => {
    		dispatch(setEmail(email))    
		},
		
		dispatch: (fnc) => {
			dispatch(fnc)
		}
		
	}
}

const F2xEditEmail = connect(
	mapStateToProps,
	mapDispatchToProps
)(f2xEditEmail);


export default F2xEditEmail;