import React from 'react';


/*
 * Redux
 */
import { connect } from 'react-redux'
import { setVisibilityModal, ModalVisibilityFilters } from '../../actions'



/*
 * Style
 */
import './F2xWorkoutSaveChanges.css';




import F2xButton from '../../components/F2xButton'



/*
 * Login Button
 */
const actionButton = ({dispatch}) => (
	<div style={{marginTop: '60px'}}>
		<F2xButton name="SAVE" className="f2x-button-black f2x-button-big small-font separated" onClick={ () => dispatch( setVisibilityModal(ModalVisibilityFilters.HIDE) ) } />
	</div>
);


const ActionButton = connect()(actionButton);



const f2xWorkoutSaveChanges = ({dispatch}) => (
	<div className="cuerpo">
		<div className="f2x-modal-title">SAVE CHANGES TO THIS WORKOUT?</div>
		
		
		<div style={{marginBottom: '15px'}}>
			<ActionButton />
		</div>
		
		<div className="small-font" style={{paddingBottom: '35px', fontSize: '14px'}}>
			<span onClick={() => dispatch( setVisibilityModal(ModalVisibilityFilters.HIDE) ) } style={{textDecoration: 'underline', cursor: 'pointer'}}>
				DON’T SAVE
			</span>
		</div>
	</div>
)

const F2xWorkoutSaveChanges = connect()(f2xWorkoutSaveChanges)



export default F2xWorkoutSaveChanges;