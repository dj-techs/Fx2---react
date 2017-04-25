import React, { Component } from 'react';





/*
 * Global Vars & Functions
 */
import { store } from '../';
import {setTitleMobile, setVisibilityModal, ModalVisibilityFilters, ModalTypes} from '../actions/';



/*
 * Components
 */
import F2xVideoCarousel from './F2xVideoCarousel/F2xVideoCarousel'
import F2xWorkout from './F2xWorkout/F2xWorkout'



/*
 * Style
 */
import './F2xHome.css';






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
				<F2xWorkout />
			</div>
		)
	}
}


export default F2xHome;