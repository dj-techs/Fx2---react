import React, { Component } from 'react';
import { connect } from 'react-redux';




			
/*
 * Global Vard & Functions
 */
import {setOpenDropdown} from '../../App';
import { stripeToken, getStripeCard, deleteStripeCard } from '../../data/data';




/*
 * Components
 */
import F2xInput from '../../components/F2xInput';
import F2xButton from '../../components/F2xButton';



/*
 * Style
 */
import './F2xAccountMobile.css';



/*
 * Icons
 */
import ICON_CARD_VISA from '../../media/cards/visa.svg';
import ICON_CARD_MASTERCARD from '../../media/cards/mastercard.svg';
import ICON_BACK from '../../media/Icon_BackArrow.svg';
import ICON_INFO from '../../media/question-mark-icon.svg';






class f2xBilling extends Component {
	constructor(props){
		super(props);
		
		this.state = {
			card: '',
			left: 0,
			deleteCard: 'none'
		}
		
		this.onChange = this.onChange.bind(this);
		this.sendCard = this.sendCard.bind(this);
		this.toggleCVV = this.toggleCVV.bind(this);
	}
	
	
	componentWillMount(){
		getStripeCard();
	}
	
	componentDidMount(){
		const {card} = this.props;
		
		this.updateCardDatas(card);
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
		const {card} = nextProps;
		
		console.log("UPDATE")
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
		this.refs.cardNumber.refs.text.value = '************'+ card.last4;
		this.refs.cardDate.refs.text.value = card.exp_month +"/"+ (card.exp_year+"").split("")[2] +""+ (card.exp_year+"").split("")[3];
		this.refs.cardCVV.refs.text.value = '***';
		
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
	
	
	render(){
		const {back} = this.props;
		
		return (
			<div>
				<div className="f2x-account-top">
					<div className="back" style={{backgroundImage: 'url('+ ICON_BACK +')'}} onClick={() => back()} /> <span>BILLING</span>
				</div>
				
				<div className="f2x-account-content">
					<div className="f2x-account-input">
						<br />
						<F2xInput 	placeholder="Name on Card" 
									ref="cardName" refID="text" 
									styleBox={{margin: '0', width: '100%'}}
									style={{paddingLeft: '0', paddingRight: '0', width: '100%'}} />
					</div>
					
					<div className="f2x-account-input">
						<br />
						<F2xInput 	placeholder="Card Number" 
									ref="cardNumber" refID="text" 
									style={{paddingRight: '0', width: 'CALC(100% - '+ this.state.left +'px)', paddingLeft: this.state.left +'px'}} 
									styleBox={{margin: '0', width: '100%'}} 
									styleIcon={{width: '30px', backgroundSize: '25px 25px'}} 
									icon={this.state.card} 
									onChange={() => this.onChange()} />
					</div>
					
					<div className="f2x-account-input float-l" style={{width: '45%'}}>
						<br />
						<F2xInput 	placeholder="Exp. Data (MM/YY)" 
									ref="cardDate" refID="text" 
									style={{paddingLeft: '0', paddingRight: '0', width: '100%'}} 
									styleBox={{margin: '0', width: '100%'}} />
					</div>
					
					<div className="f2x-account-input float-r" style={{width: '45%', position: 'relative'}}>
						<br />
						<F2xInput 	placeholder="CVV (123)" 
									ref="cardCVV" refID="text"
									style={{paddingLeft: '0', paddingRight: '0', width: '100%'}} 
									styleBox={{margin: '0', width: '100%'}}
									iconR={ICON_INFO}
									
									iconClick={this.toggleCVV}
									 />
									 
						<div ref="cvv" className="f2x-billing-cvv f2x-billing-cvv-mobile">
							The CVV Number on your credit card or debit card is a 3 digit number on the rear of VISA®.
							<br />
							MasterCard® and Discover® branded credit and debit cards. On your American Express® branded credit or debit card it is a 4 digit numeric code located on the front.
						</div>
					</div>
					
					
					<div className="clear" />
					

					
					<div className="f2x-account-terms small-font separated cursor" onClick={() => deleteStripeCard()} style={{textAlign: 'center', fontSize: 14, marginTop: '30px', color: '#FC5454', display: this.state.deleteCard}}>
						DELETE CARD
					</div>
					
					<div className="f2x-account-saves">
						<F2xButton name="SAVE" className="f2x-button-black f2x-button-big small-font separated f2x-account-share-button" onClick={ this.sendCard } />
					</div>
				</div>
			</div>
		)
	}
}


const mapStateToProps = (state) => {
	const {card} = state.card;
	
	return {
		card: card
	}
}

const F2xBilling = connect(
	mapStateToProps
)(f2xBilling);

export default F2xBilling;