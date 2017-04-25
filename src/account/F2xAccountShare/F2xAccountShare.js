import React from 'react';
import { connect } from 'react-redux'



/*
 * Global Vars & Functions
 */
import { setVisibilityModal, ModalVisibilityFilters, ModalTypes } from '../../actions'



/*
 * Components
 */
import F2xButton from '../../components/F2xButton';
import F2xFooter from '../../components/F2xFooter';


/*
 * Style
 */
import './F2xAccountShare.css';








const f2xAccountShare = ({dispatch}) => (
	<div className="f2x-account-share">
		
		<F2xButton name="INVITE FRIENDS" 
				className="f2x-new-button-black-invert separated" 
				style={{height: '46px', width: '155px', fontSize: '11px'}} 
				onClick={ () => dispatch( setVisibilityModal(ModalVisibilityFilters.SHOW, ModalTypes.INVITE_FRIEND) ) } />
		
		<div className="f2x-account-share-info small-font">
			{/*<i>for every friend who becomes a F2X<br />subscriber, receive 1 month free</i>*/}
		</div>
		
		
		<F2xFooter />
	</div>
)

const F2xAccountShare = connect()(f2xAccountShare);


export default F2xAccountShare;