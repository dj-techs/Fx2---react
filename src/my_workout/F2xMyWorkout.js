import React, { Component } from 'react';
import { connect } from 'react-redux';







/*
 * Components
 */
import F2xMyWorkoutEmpty from './F2xMyWorkoutEmpty/F2xMyWorkoutEmpty';
import F2xMyWorkoutList from './F2xMyWorkoutList/F2xMyWorkoutList';
import F2xMyWorkoutView from './F2xMyWorkoutView/F2xMyWorkoutView';



/*
 * Gloval Vars & Functions
 */
import { store } from '../';
import { setTitleMobile } from '../actions/';



/*
 * Style
 */
import './F2xMyWorkout.css';







class f2xMyWorkout extends Component {
	componentWillMount() {
		store.dispatch( setTitleMobile('MY WORKOUTS') );
	}
	
	render(){
		const { params, count } = this.props;
		let mwmode = '';
			mwmode = count === 0 ? (<F2xMyWorkoutEmpty />) : ((params.pathParam === undefined) ? (<F2xMyWorkoutList />): (<F2xMyWorkoutView params={params.pathParam}/>))
			
		return mwmode
	}
}


const mapStateToProps = (state) => {
	const { myworkouts } = state;
	
	return {
		count: myworkouts.list.length
	}
}


const F2xMyWorkout = connect(
	mapStateToProps
)(f2xMyWorkout);


export default F2xMyWorkout;