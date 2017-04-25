import React from 'react';


/*
 * Redux
 */
import { connect } from 'react-redux'
import { setVisibilityModal, ModalVisibilityFilters } from '../../actions'
import { deleteWorkout } from '../../data/workout_tools'



/*
 * Style
 */
import './F2xWorkoutRemove.css';




import F2xButton from '../../components/F2xButton'



/*
 * Login Button
 */
const actionButton = ({workout}) => (
	<div style={{marginTop: '35px'}}>
		<F2xButton 	name="DELETE" 
					className="f2x-new-button-black separated" 
					style={{height: '44px', width: '118px', fontSize: '11px'}}
					onClick={ () => deleteWorkout(workout) } />
	</div>
);


const ActionButton = connect()(actionButton);



const f2xWorkoutRemove = ({dispatch, workout}) => (
	<div className="cuerpo">
		<div className="f2x-modal-title">DELETE WORKOUT</div>
		
		
		<div className="small-font separated" style={{width: '390px', margin: '28px auto 0 auto', fontSize: '15px', textAlign: 'center'}}>
			Are you sure you want to delete this workout from your account?
		</div>
		
		<div style={{marginBottom: '15px'}}>
			<ActionButton workout={workout}/>
		</div>
		
		<div className="small-font" style={{paddingBottom: '35px', fontSize: '12px'}}>
			<span onClick={() => dispatch( setVisibilityModal(ModalVisibilityFilters.HIDE) ) } style={{textDecoration: 'underline', cursor: 'pointer'}}>
				CANCEL
			</span>
		</div>
	</div>
)

const F2xWorkoutRemove = connect()(f2xWorkoutRemove)



export default F2xWorkoutRemove;