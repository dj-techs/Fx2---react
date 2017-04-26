import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';



/*
 * Global Vars & Functions
 */
import { store } from '../';
import {setTitleMobile, setVisibilityModal, ModalVisibilityFilters, ModalTypes} from '../actions/';
import {getFX2DB, F2xDB, MURL, updateSpecificWorkoutRequest, isMobile} from '../data/data';





/*
 * Components
 */
import F2xVideoCarousel from './F2xVideoCarousel/F2xVideoCarousel'
import F2xWorkout from './F2xWorkout/F2xWorkout'
import F2xExercise from '../components/F2xExercise';



/*
 * Style
 */
import './F2xHome.css';

class F2xCustomWorkout extends Component {

	constructor (props) {
		super(props)
		this.state = { 
			percent: 0
	    };
	}

	render(){
		return (
			<div className="f2x-content-1">
				<h2 className="f2x-title" style={{color:"#9B9B9B"}}>BROWSE</h2>
				<h2 className="f2x-title" style={{color:"#1d1d1d"}}>HOT EXPERCISE VIDEOS</h2>
				<h2 className="f2x-title" style={{color:"#9B9B9B"}}>THAT WILL MAKE YOU SWEAT</h2>
				<div className="f2x-linear-1"/>
				<h2 className="f2x-title" style={{color:"#9B9B9B"}}>at F2X.com</h2>
				<div className="f2x-linear-2"/>
				<h2 className="f2x-title" style={{color:"#9B9B9B"}}>and within the</h2>
				<h2 className="f2x-title" style={{color:"#9B9B9B"}}>Ford industry iOS app</h2>
			</div>
		)
	}
}

class F2xAdPart1 extends Component {

	constructor (props) {
		super(props)
		this.state = { 
			percent: 0
	    };
	}

	render(){
		return (
			<div className="f2x-tutorial-container">				
				<div className="f2x-tutorial-thumb-left"/>
				<div className="f2x-tutorial-thumb-right" />
				<div className="f2x-tutorial-thumb-move" />
				<div className="f2x-tutorial-text" />
				<div className="f2x-tutorial-cursor" />
				<div className="f2x-tutorial-button" />
			</div>
		)
	}
}

class F2xHome extends Component {
	componentWillMount() {
		const {pathParam} = this.props.params;
		
		store.dispatch( setTitleMobile('') );
		
		
		if(pathParam){
			store.dispatch( setVisibilityModal( ModalVisibilityFilters.SHOW, ModalTypes.JOIN, {invite: pathParam}) );
		}
		
	}
	
	render(){
		
		return (
			<div className="f2x-home">
				{/*<F2xPoster />*/}
				<F2xVideoCarousel />
				<img className='f2x-image-title'/>
				<div className='f2x-tutorial-title'/>
				<F2xAdPart1 />
				<F2xCustomWorkout/>
				<F2xWorkout />				
			</div>
		)
	}
}

export default DragDropContext(HTML5Backend)(F2xHome)