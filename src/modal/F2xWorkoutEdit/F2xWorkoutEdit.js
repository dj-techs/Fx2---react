import React, { Component } from 'react';

/*
 * Redux
 */
import { connect } from 'react-redux'
import {  } from '../../actions'

/*
 * Dnd
 */
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { uWorkoutTypes } from '../../actions'


/*
 * Style
 */
import './F2xWorkoutEdit.css';


/*
 * Icons
 */
import remove from '../../media/removework.svg';
import F2xWorkoutTray from '../../components/F2xWorkoutTray';




let counter;
window.addEventListener("touchstart", (e) =>{
	let a = e;
	
	counter = setTimeout(()=>{
		a.preventDefault();
		a.stopPropagation();
	}
	,
	800);
})
window.addEventListener("touchend", (e) =>{
	
	clearTimeout(counter);
})



class f2xWorkoutEdit extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
		    workouts: props.workout
	    }
	}	
	
	render(){
		const { exercises, mode } = this.props; //canDrop, isOver,
		const isActive = mode === uWorkoutTypes.ADD;//canDrop && isOver;
		
		return(
			<div className="cuerpo">
				<div className="f2x-modal-title">EDIT WORKOUT</div>
				
				
				<div className="small-font separated" style={{marginTop: '25px'}}>
					Drag to reorder exercises or click the <img src={remove} alt="Delete" width="17" height="17" style={{verticalAlign: 'middle'}} /> button to remove from workout.
				</div>
				
				
				<div className="f2x-configure-workout" style={{padding: '0', margin: '35px auto 15px auto', height:'185px', position: 'relative'}}>
					<F2xWorkoutTray exercises={exercises} isActive={isActive} hiddeIcon="none" buttons={true} add={true} />
					{/*<F2xWorkoutTray exercises={ createExerciseList( workout ) } fromVideo={'true'} key='wedit' isActive={true} saveBtn={false} hiddeIcon="none" buttons={true} add={true} />*/}
				</div>
			</div>
		)
	}
}


const mapStateToProps = (state) => {
	return {
		workouts: state.updateWorkoutTray.workout,
		exercises: state.updateWorkout.exercises,
		mode: state.updateWorkout.mode
	};
}


const F2xWorkoutEdit = connect(
	mapStateToProps, 
	null 	
)(f2xWorkoutEdit);


export default DragDropContext(HTML5Backend)(F2xWorkoutEdit);