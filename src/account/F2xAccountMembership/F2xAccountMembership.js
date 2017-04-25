import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';








/*
 * Global Vard & Functions
 */
import { stripeToken, becomePlatinum, cancelBecomePlatinum, buyPaypalSubscription, mountWorkoutBuyCallback, checkoutWorkout  } from '../../data/data';
import {setOpenDropdown} from '../../App';



/*
 * Component
 */
import F2xInput from '../../components/F2xInput';
import F2xButton from '../../components/F2xButton';



/*
 * Style
 */
import './F2xAccountMembership.css';



/*
 * Icons
 */
import ICON_CARD_VISA from '../../media/cards/visa.svg';
import ICON_CARD_MASTERCARD from '../../media/cards/mastercard.svg';

import ICON_INFO from '../../media/question-mark-icon.svg';
import ICON_PAYPAL from '../../media/cards/paypal.svg';
import ICON_OK from '../../media/form_ok.svg';







/*
 * PAGE 1
 */
const MembershipPage1 = ({onClick}) => (
	<div>
		<div className="f2x-membership-subtitle">
			BECOME A PLATINUM MEMBERSHIP
		</div>
		
		<div className="f2x-membership-price">
			<span>$</span>12.99<span>/mo</span>
		</div>
		
		<div className="f2x-membership-description">
			<span>Unlimited</span> online streaming access to all F2x content
		</div>
		
		<div className="f2x-membership-button">
			<F2xButton name="PURCHASE" 
				className="f2x-new-button-black small-font separated" 
				style={{height: '52px', width: '188px', fontSize: '11px'}}
				onClick={() => onClick(2)} />
		</div>
	</div>
);



class membershipPage2 extends Component {
	constructor(props){
		super(props);
		
		this.state = {
			card: '',
			plan: [],
			left: 0,
			deleteCard: 'none',
			send: false,
			send2: true,
			update: false
		}
		
		this.onChange = this.onChange.bind(this);
		this.sendCard = this.sendCard.bind(this);
		this.updateCardDatas = this.updateCardDatas.bind(this);
		this.sendDatas = this.sendDatas.bind(this);
		this.updateTxt = this.updateTxt.bind(this);
		this.toggleCVV = this.toggleCVV.bind(this);
		this.toggleTerms = this.toggleTerms.bind(this);
	}
	
	componentDidMount(){
		const {card} = this.props;
		
		this.updateCardDatas(card);
		
		let params = this.props;
		
		mountWorkoutBuyCallback((obj) => {
			buyPaypalSubscription(obj.nonce, () => params.onClick())
		})		
		
		
		
		this.refs.paypalPay.addEventListener('click', (event) => {
			event.preventDefault();
			
			checkoutWorkout.paypal.initAuthFlow();
		});
	}
	
	
	cardType(digit){
		let cardType = '';
		
		
		const visa = /^4\d{3}-?\d{4}-?\d{4}-?\d{4}$/;				// Visa

		if(digit.match(visa))
			cardType = ICON_CARD_VISA;
			
			
		const mastercard = /^5[1-5]\d{2}-?\d{4}-?\d{4}-?\d{4}$/;	//Mastercard
		
		if(digit.match(mastercard))
			cardType = ICON_CARD_MASTERCARD;
		
		return cardType;
	}
	
	onChange(){
		const value = this.refs.cardNumber.refs.text.value;
		
		let newLeft = 0;
		let newCard = '';
		if(value.length === 16){
			newCard = this.cardType(value);
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
		const {card, plan} = nextProps;
		
		this.setState({
			plan: plan
		})
		
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
				send2: false
			})
		}
		
		if(this.refs.cardName.refs.text.value !== '' && card.cardholder !== '' && this.refs.cardNumber.refs.text.value !== '************'+ card.last4){
			this.setState({
				send: true,
				send2: false
			})
		}
		
		
		this.refs.cardName.refs.text.value = card.cardholder;
			this.refs.cardName.refs.label.className = 'small-font separated slc'
		this.refs.cardNumber.refs.text.value = '************'+ card.last4;
			this.refs.cardNumber.refs.label.className = 'small-font separated slc'
		this.refs.cardDate.refs.text.value = card.expires.split("/")[0] + '/' +  card.expires.split("/")[1].substr(2);
		//card.exp_month +"/"+ (card.exp_year+"").split("")[2] +""+ (card.exp_year+"").split("")[3];
			this.refs.cardDate.refs.label.className = 'small-font separated slc'
		this.refs.cardCVV.refs.text.value = '***';
			this.refs.cardCVV.refs.label.className = 'small-font separated slc'
		
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
	
	
	sendDatas(){
		if((!this.props.card.type || this.state.update) && !this.state.send){
			this.sendCard();
			
			this.setState({
				send: true
			})
		}
		else if(!this.state.send2){
			becomePlatinum();
			
			this.setState({
				send2: true
			});
		}
	}
	
	updateTxt(){
		this.setState({
			update: true,
			send: false,
			send2: true
		})
	}
	
	
	toggleCVV(e) {
		e.stopPropagation();
		e.preventDefault();
		
		this.refs.cvv.style.display = this.refs.cvv.style.display === 'block' ? 'none' : 'block';
		
		setOpenDropdown(this.refs.cvv);
	}
	
	toggleTerms(e){
		e.stopPropagation();
		e.preventDefault();
		
		this.refs.terms.style.display = this.refs.terms.style.display === 'block' ? 'none' : 'block';
		
		setOpenDropdown(this.refs.terms);
	}
	
	render(){
		return (
			<div>
				<div className="f2x-membership-subtitle">
					BECOME A PLATINUM MEMBERSHIP
				</div>
				
				<div className="f2x-membership-price">
					<span>$</span>12.99<span>/mo</span>
				</div>
				
				<div className="f2x-membership-description">
					<span>Unlimited</span> online streaming access to all F2x content
				</div>
				
				<div className="f2x-account-input" style={{marginTop: 30}}>
					<br />
					<F2xInput 	placeholder="Name on Card" 
								ref="cardName" refID="text" 
								style={{paddingLeft: '0', paddingRight: '0', maxWidth: '370px', width: '100%'}} 
								styleBox={{margin: '0', maxWidth: '370px', width: '100%'}} />
				</div>
				
				<div className="f2x-account-input">
					<br />
					<F2xInput 	placeholder="Card Number" 
								ref="cardNumber" refID="text" 
								style={{paddingRight: '0', maxWidth: (368 - this.state.left) +'px', paddingLeft: this.state.left +'px', width: '100%'}} 
								styleBox={{margin: '0', maxWidth: '370px', width: '100%'}} 
								styleIcon={{width: '30px', backgroundSize: '25px 25px'}} 
								icon={this.state.card} 
								onChange={() => this.onChange()} />
				</div>
				
				<div className="f2x-account-input float-l">
					<br />
					<F2xInput 	placeholder="Exp. Date (MM/YY)" 
								ref="cardDate" refID="text" 
								style={{paddingLeft: '0', paddingRight: '0', maxWidth: '175px', width: '100%'}} 
								styleBox={{margin: '0 20px 0 0', maxWidth: '175px', width: 'CALC(100% - 20px)'}} />
				</div>
				
				<div className="f2x-account-input float-r">
					<br />
					<F2xInput 	placeholder="CVV (123)" 
								ref="cardCVV" refID="text" 
								style={{paddingLeft: '0', paddingRight: '0', maxWidth: '175px', width: '100%'}} 
								styleBox={{margin: '0', maxWidth: '175px', width: '100%'}} 
								iconR={ICON_INFO} 
								maxLength={3}
								iconClick={this.toggleCVV} />
					
					<div ref="cvv" className="f2x-billing-cvv">
						The CVV Number on your credit card or debit card is a 3 digit number on the rear of VISA®.
						<br />
						MasterCard® and Discover® branded credit and debit cards. On your American Express® branded credit or debit card it is a 4 digit numeric code located on the front.
					</div>
				</div>
				
				<div className="clear" />
				
				
				<div className="f2x-account-terms" style={{marginTop: '40px', position: 'relative'}}>
					<div ref="terms" className="f2x-billing-cvv f2x-terms-conditions">
						The CVV Number on your credit card or debit card is a 3 digit number on the rear of VISA®.
						<br />
						MasterCard® and Discover® branded credit and debit cards. On your American Express® branded credit or debit card it is a 4 digit numeric code located on the front.
					</div>
					
					<u onMouseUp={this.toggleTerms}>Payment Terms & Conditions</u>
				</div>
				
				<div style={{marginBottom: '22px'}}>
					<F2xButton name="SUBMIT" 
						className="f2x-new-button-black small-font separated" 
						style={{height: '52px', width: '188px', fontSize: '11px'}}
						onClick={ this.sendDatas }
						spinner={this.state.send && this.state.send2 ? true : false} />
				</div>
				
				<div className="f2x-account-pay">
					<div style={{marginBottom: '18px', fontSize: '16px'}} className="small-font separated">
						- or -
					</div>

					<div className="cursor" style={{paddingTop: '2px'}} ref="paypalPay">
					{/*<div style={{paddingTop: '2px',cursor:'pointer'}} onClick={() => console.log(this.state.paypalToken)} ref="paypalPay">*/}

						<img src={ICON_PAYPAL} width="20" height="20" alt="Pay Pal" style={{paddingRight: '20px', display: 'inline-block', marginTop: '-2px', verticalAlign: 'middle'}} /> PAY WITH PAYPAL
					</div>
				</div>
			</div>
		)
	}
}

let mapStateToProps = (state) => {
	const {card, plan} = state;
	
	return {
		card: card.card,
		plan: plan.plan
	}
}


const MembershipPage2 = connect(
	mapStateToProps
)(membershipPage2);









/*
 * PAGE 3
 */
const MembershipPage3 = () => (
	<div>
		<div className="f2x-membership-description" style={{paddingTop: 60}}>
			<img src={ICON_OK} alt="Complete" width="55" />
		</div>
		
		<div className="f2x-membership-description" style={{width: 280, paddingTop: 40}}>
			<span style={{fontWeight: 400}}>Welcome!</span>
			<br />
			To build a custom workout.
			<br />
			tap the button below.
		</div>
		
		<div className="f2x-membership-button" style={{paddingTop: 30}}>
			<F2xButton name="BUILD A WORKOUT" 
				className="f2x-new-button-black small-font separated" 
				style={{height: '52px', padding: '0 30px', fontSize: '11px'}}
				onClick={() => browserHistory.push('/exercise')} />
		</div>
	</div>
);









/*
 * PAGE 4
 */
const MembershipPage4 = ({onClick}) => (
	<div>
		
		<div className="f2x-membership-description" style={{width: 280, paddingTop: 60}}>
			To see details or make changes to your membership, click the button below.
		</div>
		
		<div className="f2x-membership-button" style={{paddingTop: 30}}>
			<F2xButton name="MANAGE" 
				className="f2x-new-button-black small-font separated" 
				style={{height: '52px', width: '188px', fontSize: '11px'}}
				onClick={() => onClick(5)} />
		</div>
	</div>
);





/*
 * PAGE 5
 */
class MembershipPage5 extends Component {
	constructor(props){
		super(props);
		
		this.state = {
			send: false
		}
		
		this.onClick = this.onClick.bind(this);
	}
	
	onClick(){
		const {send} = this.state;
		const {plan, onClick} = this.props;
		
	
		if(!send && plan.length){
			onClick(1);
			cancelBecomePlatinum(plan[0].id);
			
			this.setState({
				send: true
			});
		}
	}
	
	
	render(){
		const {plan, card} = this.props;

		const endDate = new Date(plan[0].date_end);
		
		const month = endDate.getMonth();
		const mL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		
		const day = endDate.getDate();

		const year = endDate.getFullYear();
		
		return (
			<div>
				
				<div className="f2x-membership-description" style={{maxWidth: 325, paddingTop: 60, width: '100%'}}>
					Your next payment of $12.99 will be charged on {mL[month]} {day}, {year} to your card ending in {card.last4}.
				</div>
				
				<div className="f2x-membership-description-2" style={{maxWidth: 325, width: '100%'}}>
					if you cancel your subscription, you will still have access to your F2x Platinum Membership until the end of your billing period.
				</div>
				
				<div className="f2x-membership-button" style={{paddingTop: 20}}>
					<F2xButton name="CANCEL MEMBERSHIP" 
						className={`f2x-new-button-black small-font separated${this.state.send ? ' disabled' : ''}`} 
						style={{height: '52px', padding: '0 30px', fontSize: '11px'}}
						onClick={this.onClick} />
				</div>
			</div>
		);
	}
}












/*
 * PAGE 6
 */
const MembershipPage6 = () => {
	const url = 'itms://ax.itunes.apple.com/WebObjects/MZStore.woa/wa/viewSoftware?id=307538288';
	
	return (
		<div>
			<div className="f2x-membership-subtitle">
				PLATINUM MEMBERSHIP
			</div>
					
			<div className="f2x-membership-description-2" style={{width: 325, paddingTop: 0}}>
				Your subscription is paid through <span className="cursor" style={{textDecoration: 'underline', fontWeight: 400}} onClick={() => location.href = url}>iTunes.</span>
			</div>
			
			<div className="f2x-membership-description-2" style={{width: 325}}>
				Go to <span className="cursor" style={{textDecoration: 'underline', fontWeight: 400}} onClick={() => location.href = url}>iTunes.</span> to update your account and payment details. or to cancel your subscription.
			</div>
		</div>
	);
}






class f2xAccountMembership extends Component {
	constructor(props){
		super(props);
		
		this.state = {
			page: 1,
			lastPage: false,
			plan: false
		}
		
		this.changePage = this.changePage.bind(this);
	}
	
	componentDidMount(){
		const {plan} = this.props;
		
		if(plan.length){
			this.changePage(4);
		}
	}
	
	componentWillReceiveProps(nextProps){
		const {plan} = nextProps;
		
		if(plan.length){
			if(this.state.page === 2){
				this.changePage(3);
				return;
			}
			
			this.changePage(4);
			return;
		}
		
		if(this.state.page === 5)
			this.changePage(1);
	}
	
	changePage(id){
		this.setState({
			page: id
		});
	}
	
	render(){
		const {plan, card, iap} = this.props;
		
		let renderPage = '';
		
		if(iap){
			renderPage = (<MembershipPage6 />);
		}
		else{
			switch(this.state.page){
				case 1:
					renderPage = (<MembershipPage1 onClick={this.changePage} />);
					break;
				
				case 2:
					renderPage = (<MembershipPage2 />);
					break;
				
				case 3:
					renderPage = (<MembershipPage3 />);
					break;
				
				case 4:
					renderPage = (<MembershipPage4 onClick={this.changePage} />);
					break;
					
				case 5:
					renderPage = (<MembershipPage5 plan={plan} card={card} onClick={this.changePage} />);
					break;
				
				default:
					break;
			}
		}
		
		const registeredPlan = this.props.plan.length ? (<div className="f2x-account-platinum">PLATINUM MEMBER</div>) : '';
		
		
		return (
			<div className="f2x-account-data">
				YOUR ACCOUNT
				
				{registeredPlan}
				
				
				{renderPage}
			</div>
		);
	}
}

mapStateToProps = (state) => {
	const {plan, card, user} = state;
	
	//console.log("plan", JSON.stringify(plan.plan))

	return {
		plan: plan.plan,
		card: card.card,
		iap: user.subscriptions.iap
	}
}

const F2xAccountMembership = connect(
	mapStateToProps
)(f2xAccountMembership);

export default F2xAccountMembership;