import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router';
import $ from 'jquery'





/*
 * Global Vars & Functions
 */
import { store } from '../';
import { setAppStates } from '../actions/';



/*
 * Components
 */
// import F2xPoster from './F2xPoster/F2xPoster'
import F2xWorkout from './F2xWorkout/F2xWorkout'
import F2xVideoCarousel from './F2xVideoCarousel/F2xVideoCarousel'



/*
 * Style
 */
import './F2xHome.css';


class f2xScrollAnimation extends Component {

	constructor(props) {

		super(props)
		this.state = {
			mounted: props.mounted,
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
			reachAppClass: 'f2x-title',
			trackTitleClass: 'f2x-title',
			trackBodyClass: 'f2x-title',
			trackKarlieClass: 'f2x-karlie',
			trackLineClass: 'f2x-linear'
		}
		this.handleScroll =  this.handleScroll.bind(this);
	}

	componentWillReceiveProps(props) {
		this.setState(
			Object.assign({}, this.state,{
				currentPage: props.currentPage
			})
	    )
	}

	componentWillMount() {
		console.log('scroll will mount')
		store.dispatch ( setAppStates('home'))
		window.addEventListener('scroll', this.handleScroll);
	}

	componentDidMount() {
		console.log('scroll mounted')
		this.vheight = $(".f2x-home-logo").position().top;
		this.tposition = $(".f2x-tutorial-title").position().top;
	}

	componentWillUnmount() {
		console.log('scroll will unmount')
		window.removeEventListener('scroll', this.handleScroll)
	}

	handleScroll() {
		console.log("scroll working")
		this.currentposition = window.scrollY
		let topacity = (this.currentposition - this.tposition + this.vheight - 100)/200
		let tutoprogress = 0
		let curOpacity = 0
		if(topacity < 0) {
			topacity = 0;
		} else if (topacity > 1) {
			tutoprogress = topacity - 1
			tutoprogress /=2
			if(tutoprogress > 1){ 
				tutoprogress = 1
				curOpacity = topacity - 2
				curOpacity /= 2
			}
			if(curOpacity > 1)
				curOpacity = 1
			curOpacity = 1 - curOpacity
			topacity = 1
		}
		this.setState(
			Object.assign({}, this.state,{
					currentPage: 'home',
					tutoTitleOpacity: topacity,
					thumbRightPos: 154*(1-tutoprogress),
					thumbMovePos: {left: 203 + 259*tutoprogress, top: 127*(1-tutoprogress)},
					cursorPos: {left: 170+259*tutoprogress, top: 84+127*(1-tutoprogress)},
					curOpacity: curOpacity
				})
		)
	

		if(this.currentposition > 1000 ) {
			
			setTimeout(() => {this.setState({reachTitleClass: 'f2x-title show'})}, 0)
			setTimeout(() => {this.setState({reachLine1Class: 'f2x-linear linear-1'})}, 500)
			setTimeout(() => {this.setState({reachSiteClass: 'f2x-title show'})}, 1000)
		}

		if(this.currentposition > 1100) {
			setTimeout(() => {this.setState({reachLine2Class: 'f2x-linear linear-2'})}, 0)
			setTimeout(() => {this.setState({reachPhoneClass: 'f2x-phone-img show'})}, 500)
			setTimeout(() => {this.setState({reachAppClass: 'f2x-title show'})}, 1000)
		}

		if(this.currentposition > 1330) {
			setTimeout(() => {this.setState({trackTitleClass: 'f2x-title show'})}, 0)
		}

		if(this.currentposition > 1550 ){
			setTimeout(() => {this.setState({trackBodyClass: 'f2x-title show'})}, 0)

		}

		if(this.currentposition > 1600 ){
			setTimeout(() => {this.setState({trackLineClass: 'f2x-linear linear-3'})}, 0)
			setTimeout(() => { this.refs.subVideo.play() }, 1000)
		}

		if(this.currentposition > 1700 ){
			setTimeout(() => {this.setState({trackKarlieClass: 'f2x-karlie show'})}, 0)
		}
	}

	render(){

		return (
			<div>
				<div className="f2x-tutorial-title" style={{ opacity: this.state.tutoTitleOpacity, transform: 'scale(' + ( 2 - this.state.tutoTitleOpacity) + ')' }} />
				<div className="f2x-tutorial-container" style={{height:'300px'}}>				
					<div className="f2x-tutorial-thumb-left"/>
					<div className="f2x-tutorial-thumb-right" style={{ right: this.state.thumbRightPos }}/>
					<div className="f2x-tutorial-thumb-move" style={{ left: this.state.thumbMovePos.left, top: this.state.thumbMovePos.top }}/>
					<div className="f2x-tutorial-text" />
					<div className="f2x-tutorial-cursor" style={{ left: this.state.cursorPos.left, top: this.state.cursorPos.top, opacity: this.state.curOpacity }}/>
					<div className="f2x-tutorial-button" />
				</div>
				<div className="f2x-home-content-1">
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
				<div className="f2x-home-bar"/>
				<div className="f2x-home-content-2">
					<div style={{ maxWidth: '980px', padding: '20px 0 15px 0', margin: '0 auto', height: '273px', position: 'relative' }}>
						<div style={{float: 'left'}}>
						<h2 className={ this.state.trackTitleClass } style={{color:"#1d1d1d"}}>TRACK YOUR PROGRESS</h2>
						<h2 className={ this.state.trackTitleClass } style={{color:"#9B9B9B"}}>GET FIT LIKE A MODEL</h2>
						<h4 className={ this.state.trackBodyClass } style={{color:"#2b2b2b", marginTop: '30px'}}>Archive your fitnes goals: runway ready.</h4>
						<h4 className={ this.state.trackBodyClass } style={{color:"#2b2b2b"}}>summertime sexy, or just getting back in shape.</h4>
						<h4 className={ this.state.trackBodyClass } style={{color:"#2b2b2b", marginTop: '20px'}}>3500 calories = 1 pound of fat</h4>
						<h4 className={ this.state.trackBodyClass } style={{color:"#2b2b2b"}}>watch the calories burn!</h4>
						<div className={ this.state.trackLineClass }/>
						</div>
						<video
							muted
							ref = "subVideo"
							style = {{position: 'absolute', top: '100px', right: '0px'}}
							loop = {true}
							autoPlay = {false}
							className = "f2x-home-content2-video"
							preload = "auto"
							src = {"../media/video/6.mp4"}
						/>
					</div>
					<div className={ this.state.trackKarlieClass } />					
				</div>
				<div className="f2x-home-bar"/>
			</div>
		)
	}
}


class F2xHomeFooter extends Component {
	render(){
		return (
			<div className='f2x-home-footer'>
				<div className='f2x-footer-back-img' >
					<button className='f2x-home-btn-select' onClick={ () => {browserHistory.push('/exercise')} }>SELECT</button>
					<button className='f2x-home-btn-select' onClick={ () => {browserHistory.push('/join-platinum')} }>SELECT</button>
				</div>				
			</div>
		)
	}
}


class F2xHome extends Component {


	componentWillMount() {
		console.log('home will mounted')
		this.mounted = true
	}

	componentWillUnmount() {
		console.log('home will unmounted')
		this.mounted = false
	}

	render(){
		return (
			<div className="f2x-home">
				{/*<F2xPoster />*/}
				<F2xVideoCarousel />
				<div className='f2x-home-logo'>
					<div style={{ width: '100%', height: 'calc(100% - 30px)', transform: 'skewX(-40deg)', marginLeft: '25%', background: 'white', zIndex: 1 }}>
						<div className="f2x-home-logo-image"/>
					</div>
				</div>
				<F2xScrollAnimation />
				<F2xWorkout />	
				<div className="f2x-home-bar-top"/>
				<F2xHomeFooter />
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	const { appState } = state;
	
	return {
		currentPage: appState.currentPage
	}
}

const F2xScrollAnimation = connect(
	mapStateToProps
)(f2xScrollAnimation);

export default F2xHome;