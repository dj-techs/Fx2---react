import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { findDOMNode } from 'react-dom';
import $ from 'jquery';



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

class F2xScrollAnimation extends Component {

	constructor(props) {
		super(props)
		this.state = {
			tutoTitleOpacity: 0,
			thumbRightPos: 154,
			thumbMovePos: {left: 203, top: 127},
			cursorPos: {left: 170, top: 211},
			curOpacity: 1,
			reachTitleClass: 'f2x-title',
			reachLine1Class: 'f2x-linear',
			reachSiteClass: 'f2x-title',
			reachLine2Class: 'f2x-linear',
			reachPhoneClass: 'f2x-phone-img',
			reachAppClass: 'f2x-title'
		}

		this.handleScroll = this.handleScroll.bind(this);
		
	}
	
	componentWillMount() {
		window.addEventListener('scroll', this.handleScroll);
	}

	componentWillUnmount() {
		document.documentElement.removeEventListener('scroll', this.handleScroll);
	}

	componentDidMount() {
		this.vheight = $(".f2x-home-logo").position().top;
		this.tposition = $(".f2x-tutorial-title").position().top;
	}

	handleScroll() {
		console.log(window.scrollY);
		this.currentposition = window.scrollY;
		let topacity = (this.currentposition - this.tposition + this.vheight - 100)/200;
		let tutoprogress = 0;
		let curOpacity = 0;
		if(topacity < 0) {
			topacity = 0;
		} else if (topacity > 1) {
			tutoprogress = topacity - 1;
			tutoprogress /=2;
			if(tutoprogress > 1){ 
				tutoprogress = 1;
				curOpacity = topacity - 2;
				curOpacity /= 2;
			}
			if(curOpacity > 1)
				curOpacity = 1;
			curOpacity = 1 - curOpacity;
			topacity = 1;
		}

		if(this.currentposition > 925 ){
			this.setState({
				reachTitleClass: 'f2x-title show'
			})
		}

		if(this.currentposition > 1000 ){
			this.setState({
				reachLine1Class: 'f2x-linear linear-1'
			})
		}

		if(this.currentposition > 1050 ){
			this.setState({
				reachSiteClass: 'f2x-title show'
			})
		}

		if(this.currentposition > 1050 ){
			this.setState({
				reachSiteClass: 'f2x-title show'
			})
		}

		if(this.currentposition > 1100 ){
			this.setState({
				reachLine2Class: 'f2x-linear linear-2',
				reachPhoneClass: 'f2x-phone-img show'
			})
		}

		if(this.currentposition > 1200 ){
			this.setState({
				reachAppClass: 'f2x-title show'
			})
		}

		this.setState({
			tutoTitleOpacity: topacity,
			thumbRightPos: 154*(1-tutoprogress),
			thumbMovePos: {left: 203 + 259*tutoprogress, top: 127*(1-tutoprogress)},
			cursorPos: {left: 170+259*tutoprogress, top: 84+127*(1-tutoprogress)},
			curOpacity: curOpacity
		})
	}

	render(){

		return (
			<div>
				<div className="f2x-tutorial-title" style={{ opacity: this.state.tutoTitleOpacity, transform: 'scale(' + ( 2 - this.state.tutoTitleOpacity) + ')' }} />
				<div className="f2x-tutorial-container">				
					<div className="f2x-tutorial-thumb-left"/>
					<div className="f2x-tutorial-thumb-right" style={{ right: this.state.thumbRightPos }}/>
					<div className="f2x-tutorial-thumb-move" style={{ left: this.state.thumbMovePos.left, top: this.state.thumbMovePos.top }}/>
					<div className="f2x-tutorial-text" />
					<div className="f2x-tutorial-cursor" style={{ left: this.state.cursorPos.left, top: this.state.cursorPos.top, opacity: this.state.curOpacity }}/>
					<div className="f2x-tutorial-button" />
				</div>
				<div className="f2x-content-1">
					<h2 className={ this.state.reachTitleClass } style={{color:"#9B9B9B"}}>BROWSE</h2>
					<h2 className={ this.state.reachTitleClass } style={{color:"#1d1d1d"}}>HOT EXPERCISE VIDEOS</h2>
					<h2 className={ this.state.reachTitleClass } style={{color:"#9B9B9B"}}>THAT WILL MAKE YOU SWEAT</h2>
					<div className={ this.state.reachLine1Class }/>
					<h2 className={ this.state.reachSiteClass } style={{color:"#9B9B9B"}}>at F2X.com</h2>
					<div className={ this.state.reachLine2Class }/>
					<div className={ this.state.reachPhoneClass }/>
					<h2 className={ this.state.reachAppClass } style={{color:"#9B9B9B"}}>and within the</h2>
					<h2 className={ this.state.reachAppClass } style={{color:"#9B9B9B"}}>Ford industry iOS app</h2>
				</div>

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
			<div className="f2x-home" onScroll={ this.handleScroll }>
				{/*<F2xPoster />*/}
				<F2xVideoCarousel />
				<div className='f2x-home-logo'>
					<div style={{ width: '100%', height: 'calc(100% - 30px)', transform: 'skewX(-40deg)', marginLeft: '25%', background: 'white', zIndex: 1 }}>
						<div className="f2x-home-logo-image"/>
					</div>
				</div>
				<F2xScrollAnimation />
				<F2xWorkout />				
			</div>
		)
	}
}

export default DragDropContext(HTML5Backend)(F2xHome)