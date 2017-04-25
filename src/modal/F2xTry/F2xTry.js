import React from 'react';


/*
 * Redux
 */
import { connect } from 'react-redux'
import { setVisibilityModal, ModalVisibilityFilters, ModalTypes } from '../../actions'



/*
 * Style
 */
import './F2xTry.css';




import F2xButton from '../../components/F2xButton'



/*
 * Login Button
 */
const actionButton = ({dispatch}) => (
	<div style={{marginTop: '35px'}}>
		<F2xButton name="JOIN NOW"
			className="f2x-new-button-black small-font separated"
			style={{height: '52px', width: '188px', fontSize: '12px'}}
			onClick={ () => dispatch( setVisibilityModal(ModalVisibilityFilters.SHOW, ModalTypes.JOIN) ) } />
	</div>
);


const ActionButton = connect()(actionButton);



const F2xTry = () => (
	<div className="cuerpo">
		<div className="f2x-modal-title">TRY F2X <u>FREE</u> FOR 1 MONTH!</div>
		
		
		<div className="f2x-try-text small-font separated">
			Get unlimited access to a 100+ hours of video exercises featuring the industry’s top models.
		</div>
		
		<div style={{marginBottom: '56px'}}>
			<ActionButton />
		</div>
	</div>
)



export default F2xTry;