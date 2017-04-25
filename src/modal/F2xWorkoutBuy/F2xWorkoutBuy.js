import React, {Component} from 'react';
import { connect } from 'react-redux'




/*
 * Global Vars & Component
 */
import { stripeToken, getStripeCard, buyWorkout, buyPaypalWorkout, mountWorkoutBuyCallback, checkoutWorkout, cardType } from '../../data/data';
import { setVisibilityModal, ModalVisibilityFilters, ModalTypes } from '../../actions';
import { setOpenDropdown } from '../../App';



/*
 * Component
 */
import F2xInput from '../../components/F2xInput'
import F2xButton from '../../components/F2xButton'



/*
 * Style
 */
import './F2xWorkoutBuy.css';



/*
 * Icons
 */
import ICON_PAYPAL from '../../media/cards/paypal.svg';
import ICON_CARD_VISA from '../../media/cards/visa.svg';
import ICON_CARD_MASTERCARD from '../../media/cards/mastercard.svg';
import ICON_INFO from '../../media/question-mark-icon.svg';
import ICON_OK from '../../media/form_ok.svg';
import ICON_LOGO from '../../media/f-2-x-logo.svg';











class f2xWorkoutBuy extends Component {
	constructor(props){
		super(props);
		
		this.state = {
			card: '',
			left: 0,
			deleteCard: 'none',
			send: false,
			send2: true,
			update: false,
			spinner: false
		}
		
		this.onChange = this.onChange.bind(this);
		this.sendCard = this.sendCard.bind(this);
		this.sendDatas = this.sendDatas.bind(this);
		this.updateTxt = this.updateTxt.bind(this);
		this.toggleCVV = this.toggleCVV.bind(this);
	}
	
	
	componentWillMount(){
		getStripeCard();
	}
	
	componentDidMount(){
		const {card} = this.props;
		
		this.updateCardDatas(card);
		
		let params = this.props;
		
		mountWorkoutBuyCallback((obj) => {
			buyPaypalWorkout(obj.nonce, params.uid, () => params.onClick())
		})
		
		this.refs.paypalPay.addEventListener('click', (event) => {
			event.preventDefault();
			
			checkoutWorkout.paypal.initAuthFlow();
		});
	}
	
	
	
	onChange(){
		const value = this.refs.cardNumber.refs.text.value;
		
		let newLeft = 0;
		let newCard = '';
		if(value.length === 16){
			newCard = cardType(value);
			if(newCard !== '')
				newLeft = 30;
		}
			
		this.setState({
			card: newCard,
			left: newLeft
		});
	}
	
	
	
	
	sendCard() {
		console.log("GENERE STRIPE TOKEN");
		
		stripeToken({
			name: this.refs.cardName.refs.text.value,
			number: this.refs.cardNumber.refs.text.value,
			month: this.refs.cardDate.refs.text.value.split("/")[0],
			year: this.refs.cardDate.refs.text.value.split("/")[1],
			cvc: this.refs.cardCVV.refs.text.value
		});
	}
	
	
	
	componentWillReceiveProps(nextProps){
		const {card} = nextProps;
		
		this.updateCardDatas(card);
	}
	
	updateCardDatas(card){
		if(!card){
			this.setState({
				deleteCard: 'none',
				card: '',
				left: 0
			})
			
			this.refs.cardName.refs.text.value = null;
			
			this.refs.cardNumber.refs.text.value = '';
			this.refs.cardNumber.refs.text.focus(); this.refs.cardNumber.refs.text.blur();
			
			this.refs.cardDate.refs.text.value = '';
			this.refs.cardDate.refs.text.focus(); this.refs.cardDate.refs.text.blur();
			
			this.refs.cardCVV.refs.text.value = '';
			this.refs.cardCVV.refs.text.focus(); this.refs.cardCVV.refs.text.blur();
			
			return;
		}
		
		this.setState({
			deleteCard: 'block'
		})
		
		if(this.refs.cardName.refs.text.value === '' && card.cardholder !== ''){
			this.setState({
				send: true,
				send2: false,
				spinner: false
			})
		}
		
		if(this.refs.cardName.refs.text.value !== '' && card.cardholder !== '' && this.refs.cardNumber.refs.text.value !== '************'+ card.last4){
			this.setState({
				send: true,
				send2: false,
				spinner: false
			})
		}
		
		
		this.refs.cardName.refs.text.value = card.cardholder;
			this.refs.cardName.refs.label.className = 'small-font separated slc';
			
		this.refs.cardNumber.refs.text.value = '************'+ card.last4;
			this.refs.cardNumber.refs.label.className = 'small-font separated slc';
			
		this.refs.cardDate.refs.text.value = card.expires.split("/")[0] +"/"+ card.expires.split("/")[1].substr(2, 2);
			this.refs.cardDate.refs.label.className = 'small-font separated slc';
			
		this.refs.cardCVV.refs.text.value = '***';
			this.refs.cardCVV.refs.label.className = 'small-font separated slc';
		
		let newLeft = 0;
		let newCard = '';
			
		switch(card.type){
			case 'mastercard':
				newCard = ICON_CARD_MASTERCARD;
				break;
			
			case 'visa':
				newCard = ICON_CARD_VISA;
				break;
			
			default:
				break;
		}
		
		if(newCard !== '')
			newLeft = 30;
		
		
		
		this.setState({
			card: newCard,
			left: newLeft
		});
	}
	
	updateTxt(){
		this.setState({
			update: true,
			send: false,
			send2: true,
			spinner: false
		})
	}
	
	
	sendDatas(){
		const {uid, onClick} = this.props;
		
		if((!this.props.card.type || this.state.update) && !this.state.send){
			this.sendCard();
			
			this.setState({
				send: true,
				spinner: true
			})
		}
		else if(!this.state.send2){
			buyWorkout(uid, onClick);
			
			this.setState({
				send2: true,
				spinner: true
			});
		}
	}
	
	
	toggleCVV(e) {
		e.stopPropagation();
		e.preventDefault();
		
		this.refs.cvv.style.display = this.refs.cvv.style.display === 'block' ? 'none' : 'block';
		
		setOpenDropdown(this.refs.cvv);
	}
	
	
	render() {
		const {title} = this.props;
		
		
		return (
			<div className="cuerpo">
				<div className="f2x-modal-title">
					BUY
					<br/>
					{title.toUpperCase()}
				</div>
				
				
				<div className="f2x-price-format" style={{fontSize: '36px', margin: '10px 0 0 0'}}>
					<span>$</span>2.99
				</div>
				
				<div style={{fontSize: '14px', margin: '12px auto 0 auto', width: '220px'}}>
					Online streaming access to this workout
				</div>
				
				
				<div style={{width: '300px', margin: '40px auto 35px auto'}}>
					<F2xInput 	placeholder='Name on Card' 
								ref="cardName" refID="text" 
								className="f2x-input-full" 
								style={{width: '100%'}} 
								styleBox={{width: '100%'}}
								onChange={this.updateTxt} />
					
					<F2xInput 	placeholder='Card Number' 
								ref="cardNumber" refID="text" 
								style={{margin: '0', width: 'CALC(100% - '+ this.state.left +'px)', paddingLeft: this.state.left +'px'}} 
								styleBox={{width: '300px', marginTop: '23px'}} 
								icon={this.state.card}
								onChange={this.updateTxt} />
					
					
					<F2xInput 	placeholder='Exp. Date' 
								ref="cardDate" refID="text" 
								className="f2x-input-full" 
								style={{width: '140px'}} 
								styleBox={{float: 'left', width: '140px', marginTop: '23px'}}
								onChange={this.updateTxt} />
					
					<div style={{position: 'relative'}}>
						<F2xInput 	placeholder='CVV' 
									ref="cardCVV" refID="text"
									className="f2x-input-full" 
									style={{width: '140px'}} 
									styleBox={{float: 'right', width: '140px', marginTop: '23px'}} 
									iconR={ICON_INFO}
									onChange={this.updateTxt}
									iconClick={this.toggleCVV} />
						
						<div ref="cvv" className="f2x-billing-cvv" style={{top: '-111px', left: '91px', bottom: 'auto'}}>
							The CVV Number on your credit card or debit card is a 3 digit number on the rear of VISA®.
							<br />
							MasterCard® and Discover® branded credit and debit cards. On your American Express® branded credit or debit card it is a 4 digit numeric code located on the front.
						</div>
					</div>
					
					<div style={{clear: 'both'}} />
				</div>
				
				
				
				<div style={{fontSize: '14px', width: '170px', margin: '0 auto'}}>
					<div className="cursor" style={{paddingTop: '2px'}} onClick={() => console.log(this.state.paypalToken)} ref="paypalPay">
					{/*<div style={{paddingTop: '2px',cursor:'pointer'}} onClick={() => console.log(this.state.paypalToken)} ref="paypalPay">*/}
						<img src={ICON_PAYPAL} width="20" height="20" alt="Pay Pal" style={{paddingRight: '20px', float: 'left', marginTop: '-2px'}} /> PAY WITH PAYPAL
					</div>
				</div>
				
				<div className="small-font separated" style={{fontSize: '10px', margin: '25px auto 10px auto', width: '240px'}}>By clicking “Submit” you are agreeing to the <b>Terms of Use</b></div>
					
				<F2xButton 	name="SUBMIT"
							spinner={this.state.spinner}
							spinnerStyle={{marginBottom: '50px'}}
							className="f2x-new-button-black small-font separated" 
							style={{height: '45px', padding: '0 35px', fontSize: '11px', marginBottom: '50px'}} 
							onClick={ this.sendDatas } />
			</div>
		);
	}
}



const mapStateToProps = (state) => {
	const {modal, workouts, myworkouts, card} = state;
	
	let newWorkout = workouts.list.find(x => x.uid === modal.param);
	
	if(!newWorkout)
		newWorkout = myworkouts.list.find(x => x.uid === modal.param);
	
	return {
		title: newWorkout.title,
		uid: newWorkout.uid,
		card: card.card
	}
}



const mapDispatchToProps = (dispatch) => {
	return{
		onClick: () => {
			dispatch( 
				setVisibilityModal(
					ModalVisibilityFilters.SHOW, 
					ModalTypes.GENERIC, 
					{
						title: '',
						content: (
							<div className="f2x-moda-generic-content">
								<center style={{marginBottom: 30}}>
									<img src={ICON_LOGO} alt="Logo" width="90" />
								</center>
								
								<center>
									<img src={ICON_OK} alt="successful" width="50" />
								</center>
								
								<br />
								<b>Workout purchased!</b>
								<br />
								Let´s get fit like a model. 
							</div>
						),
						btn: () => {
							dispatch( setVisibilityModal(ModalVisibilityFilters.HIDE));
						},
						btnText: 'CONTINUE WATCHING'
					}
				)
			)
		}
	}
}

const F2xWorkoutBuy = connect(
	mapStateToProps,
	mapDispatchToProps
)(f2xWorkoutBuy);

export default F2xWorkoutBuy