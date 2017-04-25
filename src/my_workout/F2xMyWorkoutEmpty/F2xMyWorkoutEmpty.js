import React from 'react';
import { browserHistory } from 'react-router';





/*
 * Style
 */
import './F2xMyWorkoutEmpty.css';



import F2xButton from '../../components/F2xButton';




const F2xMyWorkoutEmpty = () => (
	<div style={{height: innerHeight - 88 +'px'}} className="f2x-myworkout-empty">
		<div className="f2x-myworkout-empty-label">
			THE CUSTOM WORKOUTS YOU BUILD
			<br/>
			WILL BE SAVED HERE.
			
			<div className="f2x-myworkout-empty-label-button">
				<F2xButton name="BUILD A WORKOUT" className="f2x-new-button-black separated" style={{fontSize: '12px', width: '225px', height: '52px'}} onClick={ () => browserHistory.push('/exercise') } />
			</div>
		</div>
	</div>
)



export default F2xMyWorkoutEmpty;