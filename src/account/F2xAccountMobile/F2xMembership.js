import React, { Component } from 'react';
import { connect } from 'react-redux';





/*
 * Pages
 */
import F2xAccountMembership from '../F2xAccountMembership/F2xAccountMembership';




/*
 * Style
 */
import './F2xAccountMobile.css';



/*
 * Icons
 */
import ICON_BACK from '../../media/Icon_BackArrow.svg';






class f2xMembership extends Component {
	render(){
		const {back} = this.props;
		
		return (
			<div>
				<div className="f2x-account-top">
					<div className="back" style={{backgroundImage: 'url('+ ICON_BACK +')'}} onClick={() => back()} /> <span>MEMBERSHIP</span>
				</div>
				
				<div className="f2x-account-content">
					<F2xAccountMembership mobile={true} />
				</div>
			</div>
		)
	}
}


const mapStateToProps = (state) => {
	return {
	}
}

const F2xMembership = connect(
	mapStateToProps
)(f2xMembership);

export default F2xMembership;