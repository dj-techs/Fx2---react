import React, { Component } from 'react';





import { store } from '../';
import {setTitleMobile, setMobileFilter} from '../actions/';
import {initWorkoutTray} from '../data/workout_tools';
import {isMobile} from '../data/data';




/*
 * Style
 */
 
import './F2xExercise.css';



import F2xExerciseList from './F2xExerciseList/F2xExerciseList';



import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';





class F2xExercise extends Component {
	componentWillMount() {
		store.dispatch( setTitleMobile('WORKOUT BUILDER') );
		
		initWorkoutTray()
		
		if(isMobile()){
			document.body.style.background = '#eee';
			
			store.dispatch( setMobileFilter('block') );
		}
	}
	
	componentWillUnmount(){
		document.body.style.background = '#fff';
			
		store.dispatch( setMobileFilter('none') );
	}
	
	render(){
		const { params } = this.props;
		return (
			<F2xExerciseList params={params}/>
		)
	}
}




export default DragDropContext(HTML5Backend)(F2xExercise);