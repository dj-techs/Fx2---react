import React, {Component} from 'react';
import { connect } from 'react-redux';








/*
 * Global Vard & Functions
 */
import { stripeToken, deleteStripeCard, cardType } from '../../data/data';
import {setOpenDropdown} from '../../App';



/*
 * Components
 */
import F2xInput from '../../components/F2xInput';
import F2xButton from '../../components/F2xButton';



/*
 * Style
 */
import './F2xAccountBilling.css';



/*
 * Icons
 */
import ICON_CARD_VISA from '../../media/cards/visa.svg';
import ICON_CARD_MASTERCARD from '../../media/cards/mastercard.svg';
import ICON_INFO from '../../media/question-mark-icon.svg';











class f2xAccountBilling extends Component {
	constructor(props){
		super(props);
		
		this.state = {
			card: '',
			plan: [],
			left: 0,
			deleteCard: 'none'
		}
		
		this.onChange = this.onChange.bind(this);
		this.sendCard = this.sendCard.bind(this);
		this.updateCardDatas = this.updateCardDatas.bind(this);
		this.toggleCVV = this.toggleCVV.bind(this);
		this.toggleTerms = this.toggleTerms.bind(this);
	}
	
	componentDidMount(){
		const {card} = this.props;
		
		this.updateCardDatas(card);
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
		
		
		this.refs.cardName.refs.text.value = card.cardholder;
			this.refs.cardName.refs.label.className = 'small-font separated slc'
		this.refs.cardNumber.refs.text.value = '************'+ card.last4;
			this.refs.cardNumber.refs.label.className = 'small-font separated slc'
		this.refs.cardDate.refs.text.value = card.expires.split("/")[0] + '/' +  card.expires.split("/")[1].substr(2);
		//card.exp_month +"/"+ (card.expires+"").split("")[2] +""+ (card.exp_year+"").split("")[3];
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
		const registeredPlan = this.props.plan.length ? (<div className="f2x-account-platinum">PLATINUM MEMBER</div>) : '';
		
		
		return (
			<div className="f2x-account-data">
				YOUR ACCOUNT
				
				{registeredPlan}
				
				<div className="f2x-account-margin"></div>
				
				
				<div className="f2x-account-input" style={{marginTop: 30}}>
					<br />
					<F2xInput 	placeholder="Name on Card" 
								ref="cardName" refID="text" 
								style={{paddingLeft: '0', paddingRight: '0', width: '370px'}} 
								styleBox={{margin: '0', width: '370px'}} />
				</div>
				
				<div className="f2x-account-input">
					<br />
					<F2xInput 	placeholder="Card Number" 
								ref="cardNumber" refID="text" 
								style={{paddingRight: '0', width: (368 - this.state.left) +'px', paddingLeft: this.state.left +'px'}} 
								styleBox={{margin: '0', width: '370px'}} 
								styleIcon={{width: '30px', backgroundSize: '25px 25px'}} 
								icon={this.state.card} 
								onChange={() => this.onChange()} />
				</div>
				
				<div className="f2x-account-input float-l">
					<br />
					<F2xInput 	placeholder="Exp. Date (MM/YY)" 
								ref="cardDate" refID="text" 
								style={{paddingLeft: '0', paddingRight: '0', width: '175px'}} 
								styleBox={{margin: '0 20px 0 0', width: '175px'}} />
				</div>
				
				<div className="f2x-account-input float-r">
					<br />
					<F2xInput 	placeholder="CVV (123)" 
								ref="cardCVV" refID="text" 
								style={{paddingLeft: '0', paddingRight: '0', width: '175px'}} 
								styleBox={{margin: '0', width: '175px'}} 
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
			
				
				
				<div className="f2x-account-terms small-font separated cursor" onClick={() => deleteStripeCard()} style={{marginTop: '30px', color: '#FC5454', display: this.state.deleteCard}}>
					DELETE CARD
				</div>
				
				
				<div className="f2x-account-terms" style={{marginTop: '30px', position: 'relative'}}>
					<div ref="terms" className="f2x-billing-cvv f2x-terms-conditions">
						The CVV Number on your credit card or debit card is a 3 digit number on the rear of VISA®.
						<br />
						MasterCard® and Discover® branded credit and debit cards. On your American Express® branded credit or debit card it is a 4 digit numeric code located on the front.
					</div>
				
					<u className="small-font separated" onMouseUp={this.toggleTerms}>Payment Terms & Conditions</u>
				</div>
				
				<div style={{marginBottom: '22px'}}>
					<F2xButton name="SAVE CHANGES" 
						className="f2x-new-button-black small-font separated" 
						style={{height: '52px', width: '188px', fontSize: '11px'}}
						onClick={ this.sendCard } />
				</div>
				{/*
				<div className="f2x-account-pay">
					<div style={{marginBottom: '20px', fontSize: '16px'}} className="small-font separated">
						- or -
					</div>
					
					<img src={ICON_PAYPAL} width="20" height="20" alt="Pay Pal" style={{paddingRight: '20px', display: 'inline-block', marginTop: '-2px', verticalAlign: 'middle'}} /> PAY WITH PAYPAL
				</div>
				*/}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	const {card, plan} = state;
	
	return {
		card: card.card,
		plan: plan.plan
	}
}

const F2xAccountBilling = connect(
	mapStateToProps
)(f2xAccountBilling);


export default F2xAccountBilling;