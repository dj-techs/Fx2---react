import React, {Component} from 'react';
import { connect } from 'react-redux';






/*
 * Components
 */
import F2xFooter from '../components/F2xFooter.js';
import F2xInput from '../components/F2xInput';
import F2xButton from '../components/F2xButton';
import F2xDropdown from '../components/F2xDropdown';
import F2xTextBox from '../components/F2xTextBox';



/*
 * Style
 */
import './F2xContact.css';






class f2xContact extends Component {
	constructor(props){
		super(props);
		
		this.state = {
			isActive: false,
			send: false,
			dropOpt: 0
		}
		
		
		this.submit = this.submit.bind(this);
		this.update = this.update.bind(this);
		this.changeDrop = this.changeDrop.bind(this);
	}
	
	componentWillReceiveProps(nextProps){
		this.refs.emailBox.refs.email.value = nextProps.email;
	}
	
	
	
	submit() {
		const {isActive, dropOpt} = this.state;
		
		const email = this.refs.emailBox.refs.email.value;
		const type = dropOpt;
		const comment = this.refs.commentsBox.refs.comments.value;
		
		
		
		if(isActive && email !== '' && comment !== ''){
			alert("Send Comment ("+ email+") ("+ type +") ("+ comment +")");
			
			this.setState({
				isActive: false,
				send: true
			})
		}
	}
	
	update(){
		this.setState({
			isActive: true,
			send: false
		})
	}
	
	changeDrop(i){
		this.setState({
			dropOpt: i
		})
	}
	
	render() {
		const {isActive, send} = this.state;
		
		return (
			<div className="f2x-info-web">
				<div className="f2x-contact">
					<div className="f2x-info-title separated">
						CONTACT US
					</div>
					
					<div className="f2x-info-subtitle-2 separated">
						CALL SUPPORT
						<br />
						<small>1-800-555-55555</small>
					</div>
					
					<div style={{fontWeight: 300}}>
						- or -
					</div>
					
					<div className="f2x-info-subtitle-2 separated" style={{marginTop: 18}}>
						SEND US YOUR COMMENTS
					</div>
					
					<div className="f2x-info-subinfo-text">
						We want to hear from you. Tell us what you love about the F2X website or how we can improve your experience.
					</div>
						
					<F2xInput   placeholder="Email" 
								style={{paddingLeft: '0', paddingRight: '0', width: '100%'}} 
								styleBox={{margin: '0', width: '100%'}} 
								value={undefined}
								ref="emailBox" 
								refID="email"
								onChange={ this.update }   />
					
					<div className="f2x-input-box" style={{position: 'relative', margin: '0px', width: '100%', marginTop: '30px'}}>
						<label className="small-font separated slc" style={{left: 0}}>Feedback Type</label>
						<F2xDropdown 	list={['Report an Issue', 'General Feedback']} 
										style={{width: '100%', borderColor: '#c8c8c8'}} 
										onChange={(i) => {this.changeDrop(i); this.update(); }} 
										value={0} />
					</div>
					
					<div className="f2x-input-box" style={{position: 'relative', margin: '0px', width: '100%', marginTop: '35px'}}>
						<label className="separated slc" style={{top: '-7px', left: 0, fontSize: '14px'}}>Comments:</label>
						
						<F2xTextBox placeholder="" 
									style={{padding: '10px 15px', width: 'CALC(100% - 30px)', height: '125px', resize: 'vertical'}} 
									ref="commentsBox" 
									refID="comments"
									value={undefined}
									onChange={ this.update } />
						
					</div>
					
					<div className="f2x-contact-infoMsg">
						{send ? 'Feedback Submitted' : ''}
					</div>
					
					<F2xButton 	name="SUBMIT" 
								className={`f2x-new-button-black small-font separated${isActive?'':' disabled'}`} 
								style={{padding: '16px 55px', fontSize: '11px'}}
								onClick={ this.submit } />
				</div>
				
				<F2xFooter />
			</div>
		)
	}
}


const mapStateToProps = (state) => {
	const {user} = state;
	
	return {
		email: user.email
	}
}


const F2xContact = connect(
	mapStateToProps
)(f2xContact);


export default F2xContact;