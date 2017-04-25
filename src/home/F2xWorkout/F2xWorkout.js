import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';



/*
 * Components
 */
import F2xButton from '../../components/F2xButton';
import F2xItemList from '../../components/F2xItemList';




/*
 * Style
 */
import './F2xWorkout.css';





//
// ******* HOME WORKOUT
//

//Container component
const f2xWorkout = ({list}) => (
	<div className="f2x-home-workout-list">
		<div className="f2x-home-workout-title">
			<div className="f2x-workouts-line separated">...or select a preconfigured workout below:</div>
			
			<div style={{float: 'right'}}>
				<F2xButton name="See All"  className="f2x-new-button-transparent separated upper" onClick={ () => browserHistory.push('/workout') } />
			</div>
			
			<div className="clear" />
		</div>
		
		<F2xItemList wo={ list } onClick={( id, mode ) => console.log(id, mode) }/>
	</div>
)

const mapStateToProps = (state) => {
	const { homeWorkout } = state;
	
	return {
		list: homeWorkout.workout
	};
}

const F2xWorkout = connect(
	mapStateToProps 
)(f2xWorkout) 



export default F2xWorkout;