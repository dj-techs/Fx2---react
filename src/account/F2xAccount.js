import React, { Component } from 'react';
import { connect } from 'react-redux'
import { browserHistory } from 'react-router';






/*
 * Global Vars & Functions
 */
import { getStripeCard, getPlans } from '../data/data';
import { setTitleMobile } from '../actions';
import { store } from '../.';



/*
 * Components
 */
import F2xAccountMenu from './F2xAccountMenu/F2xAccountMenu'
import F2xAccountProfile from './F2xAccountProfile/F2xAccountProfile'
import F2xAccountEmailPassword from './F2xAccountEmailPassword/F2xAccountEmailPassword'
import F2xAccountBilling from './F2xAccountBilling/F2xAccountBilling'
import F2xAccountShare from './F2xAccountShare/F2xAccountShare'
import F2xAccountMobile from './F2xAccountMobile/F2xAccountMobile'
import F2xAccountMembership from './F2xAccountMembership/F2xAccountMembership';

import F2xAccountResetPassword from './F2xAccountResetPassword/F2xAccountResetPassword';




/*
 * Style
 */
import './F2xAccount.css';







class f2xAccount extends Component {
	constructor(props){
		super(props);
		
		this.state = {
			menu: 1
		};
		
		this.onChange = this.onChange.bind( this );
	}
	
	componentWillMount() {
		getStripeCard();
		getPlans();
		
		store.dispatch( setTitleMobile('ACCOUNT') );
		
		if(this.props.params.pathParam !== 'password-reset' && !localStorage.tID){
			browserHistory.push("/");
		}
	}
	
	onChange(page){
		this.setState({
			menu: page
		})
	}
	
	render(){
		let render = '';
		
		
		if(this.props.params.pathParam === 'password-reset'){
			render = (<F2xAccountResetPassword />)
		}
		else{
			switch(this.state.menu){
				case 1:
					render = (<F2xAccountProfile />);
					break;
				
				case 2:
					render = (<F2xAccountEmailPassword />);
					break;
				
				case 3:
					render = (<F2xAccountMembership />);
					break;
				
				case 4:
					render = (<F2xAccountBilling />);
					break;
					
				default:
					break;
			}
			
			render = (
				<div>
					<div className="pc">
						<F2xAccountMenu onClick={ this.onChange } active={this.state.menu} />
						
						{render}
						
						<div className="clear" />
						
						<F2xAccountShare />
					</div>
					
					<F2xAccountMobile onClick={ this.onChange } />
				</div>
			)
		}
		
		
		return (
			<div className="f2x-account">
				{render}
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

const F2xAccount = connect(
	mapStateToProps
)(f2xAccount);


export default F2xAccount;
