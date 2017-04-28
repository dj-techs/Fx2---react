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
			<h2 className="f2x-title show" style={{color:"#1d1d1d", textAlign: 'center'}}>CHECK OUT OUR PRECONFIGURED WORKOUTS</h2>
			<h2 className="f2x-title show" style={{color:"#9b9b9b", textAlign: 'center'}}>CURTED BY TOP MODELS</h2>
			
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