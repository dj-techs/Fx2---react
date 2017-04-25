import React, { Component } from 'react';


/*
 * Style
 */
import './F2xExerciseCustomWorkout.css';


/*
 * Redux
 */
import { connect } from 'react-redux'
import { uWorkoutTypes } from '../../actions'



import F2xItemTypes from '../F2xItemTypes';
import { DropTarget } from 'react-dnd';


/*
 * Components
 */ 

import F2xWorkoutTray from '../../components/F2xWorkoutTray';




// Drag exercises from the grid to the workout area

const exerciseTarget = {
  drop(item) {
  }
};



function collect(connect, monitor) {
  return {
	  connectDropTarget: connect.dropTarget(),
	  isOver: monitor.isOver(),
	  canDrop: monitor.canDrop()
  };
}





class f2xExerciseCustomWorkout extends Component {
	constructor(props){
		super(props);
		
		this.state = {
			msg: true
		}
	}
	componentWillMount() {
		//resetWorkout();
	}
	
	
	/*
	componentWillReceiveProps(nextProps){
		console.log(nextProps)
		
		let nobj = nextProps.exercises.map(
			(item, i) => {
				return {id:i , uid: item.uid, title: item.title, cover: item.video.poster}
			}
		)	
		
		this.setState(
			Object.assign({}, this.state, {exercises: nobj } )
		)
		
		console.log(nextProps.exercises)
	}
	*/
	
	componentWillReceiveProps(nextProps){
		if(nextProps.filter === true || nextProps.exercises.length)
			this.setState({
				msg: false
			})
	}
	
	componentWillUnmount() {
		//resetWorkout();
	}

	render(){
	    const { connectDropTarget, exercises, mode } = this.props; //canDrop, isOver,
		const isActive = mode === uWorkoutTypes.ADD;//canDrop && isOver;
		
		return connectDropTarget(
			<div className="f2x-configure-workout">
				<F2xWorkoutTray exercises={exercises} isActive={isActive} buttons={true}/>
				
				<div className="f2x-shadow-workout pc" />
				
				<div className={`f2x-configure-label mobile${!this.state.msg ? ' hidden':''}`}>
					TAP THE PLUS SIGN OR DRAG EXERCISES 
					<br />
					TO CREATE A WORKOUT
				</div>			
			</div>		

		)
	}
}



const mapStateToProps = (state) => {
	const {exercises} = state;
	
	
		
	const filter = 	(
						(exercises.sort !== 1) ||
						(exercises.sport.toLowerCase() !== 'all') ||
						(exercises.tipe.toLowerCase() !== 'all') ||
						(exercises.trainer.toLowerCase() !== 'all') ||
						(exercises.muscle.length !== 0) ||
						(exercises.intensity.length !== 0)
					);
	
	return {
		exercises: state.updateWorkout.exercises,
		mode: state.updateWorkout.mode,
		filter: filter
	};
}


const F2xExerciseCustomWorkout = connect(
	mapStateToProps, 
	null 	
)(f2xExerciseCustomWorkout);



export default DropTarget(F2xItemTypes.EXERCISE, exerciseTarget, collect)(F2xExerciseCustomWorkout);