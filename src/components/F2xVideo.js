//	Some code below adapted from
//	https://github.com/mderrick/react-html5video/blob/master/src/components/video/Video.js

import React, { Component } from 'react';
import { connect } from 'react-redux'




/*
 * Global Vars & Functions
 */
import { store } from '../';
import { MURL , guest, isMobile, isIOS } from '../data/data';   
import { setVisibilityModal, ModalVisibilityFilters, ModalTypes } from '../actions';



/*
 * Components
 */
import F2xButton from '../components/F2xButton';
import F2xIcon from './F2xIcon'



/*
 * Style
 */
import './F2xVideo.css';



/*
 * Icons
 */
import bigMedia from '../media/big_play_button.svg';
import vcExpand from '../media/video_control_expand.svg';
import vcPause from '../media/video_control_pause.svg';
import vcPlay from '../media/video_control_play.svg';
import vcSoundOff from '../media/video_control_sound_off.svg';
import vcSoundOn from '../media/video_control_sound_on.svg';
 







const F2xVideoPause = ({ onClick , icon} ) => (
	<F2xIcon className="f2x-video-play cursor" icon={ icon } onClick={ () => onClick("pause") } />
)


const F2xVideoFullScreen = ({ onClick }) => (
	<F2xIcon className="f2x-video-fullscreen cursor" icon={ vcExpand } onClick={ () => onClick("fs") } />
)


class F2xVideoMute extends Component {
	render(){
		const { onClick, onClickAudio, icon, audioS } = this.props;
			
		return (
			<div className="f2x-video-audio" style={{width: audioS ? '145px' : 'auto' }} onMouseOver={() => onClick("show")} onMouseOut={() => onClick("hide")} >
				<F2xIcon 	className="f2x-video-mute cursor" 
							icon={ icon }
							onClick={() => onClick("mute")} />
							
				<div className="f2x-video-audio-controller" style={{display: audioS ? 'block' : 'none' }}>
					<input className="f2x-video-progress-base" type="range" 
						style={ {width: "100%"} }   
						onChange={ (e) => { onClickAudio(e) } } 
						defaultValue="100"
						min="0"
		                max="100"
		                ref="sliderAudio"
					/>
				</div>
			</div>
		)
	}
}




class F2xVideoProgress extends Component {
	render(){
		const {hold, onClick, hidden, percent} = this.props;
		
		return(
			<div>
				<F2xVideoProgressBase hold={hold} ref="sliderBox" onClick={ (n,v) => onClick(n,v) } hidden={hidden} />
				<div className="f2x-video-progress" style={ {width: percent + "%"} } />
			</div>
		)
	}
}

class F2xVideoProgressBase extends Component {
	render(){
		const { onClick, hidden } = this.props;
		
		return (
			<div>
				<input className="f2x-video-progress-base" type="range"
					style={{width: "100%", display: hidden ? 'none' : 'block'}}
					onChange={(e) => onClick("jumpTo", e)}
					defaultValue="0"
					min="0"
	                max="1000"
	                ref="slider"
				/>
			</div>
		)
	}
}

const F2xVideoTime = (props) => (
	<div className="f2x-video-time">{props.currentTime} / {props.duration}</div>
)



class F2xVideoControls extends Component {
	render(){
		const {props} = this;
		
		return (
			<div className="f2x-videocontrols" style={{display: isIOS() ? 'none' : 'block'}}>
				<F2xVideoProgress hidden={props.hidden} ref="progress" hold={props.hold} percent={props.cT*100} onClick={ (n,v,m) => props.onClick(n,v,m)  }  />
			
				<F2xVideoPause onClick={ (n) => props.onClick(n)  } icon={ props.mode ? vcPlay : vcPause}/>
				<F2xVideoTime currentTime={props.currentTime} duration={props.duration} />
				<F2xVideoMute audioS={props.audioS} ref="audio" onClick={ (n) => props.onClick(n) } onClickAudio={ (n) => props.onClickAudio(n)  } icon={ props.sound ? vcSoundOff : vcSoundOn } />
				<F2xVideoFullScreen onClick={ (n) => props.onClick(n)  } />
			</div>	
		)
	}
}






class f2xVideo extends Component {
	constructor(props) {
	    super(props);
	
	    this.state = { 
            paused: this.props.autoPlay === 'false' ? true : false,
            muted: !!this.props.muted,
            duration: 0,
            currentTime: 0,
            percent: 0,
            playbackRate:1,
            hold: false,
            pg: guest(),
            poster: this.props.poster,
            audioSlider: false,
            counter: 0
	    };
	    
	    
	    this.fullScreen = this.fullScreen.bind( this );
	    this.togglePlay = this.togglePlay.bind( this );	
	    this.toggleMute = this.toggleMute.bind( this );
	    this.playerAction= this.playerAction.bind( this );
	    this.onClickAudio = this.onClickAudio.bind( this );
	    this.resetPlayer = this.resetPlayer.bind( this );
	    this.continueWatchingModal = this.continueWatchingModal.bind( this );
	}
	
	
	componentWillUnmount() {
	    clearInterval(this.evalTime);
	}
	
	componentDidMount() {
		this.refs.mVideo.addEventListener('contextmenu', (e) => {
			e.preventDefault();
		});
		
		
	    this.evalTime = setInterval(
	    	() => this.updateAll(),
			1
	    );
	}	
	
	componentDidUpdate(nextProps, props) {
		if(nextProps.poster !== this.state.poster || this.refs.mVideo.src !== nextProps.url){
			this.refs.mVideo.currentTime = 0;
			
			this.resetPlayer();
			
			this.setState({
				poster: nextProps.poster
			});
			
			this.evalTime = setInterval(
		    	() => this.updateAll(),
				1
		    );
		}
	}	
	
	
	resetPlayer(){
		this.refs.progressBox.refs.progress.refs.sliderBox.refs.slider.value = 0;
		
		if(!this.state.paused)
			this.play()
			
		this.setState({
            duration: 0,
            currentTime: 0,
            percent: 0,
            playbackRate:1,
            hold: false,
            pg: guest()
	    })
	}
	
	playerAction(val,v, m){
		switch(val){
			case "pause":
				this.togglePlay();
				break;
			
			case "show":
				this.setState({
					audioSlider: true
				});
				
				break;
			
			
			
			case "hide":
				this.setState({
					audioSlider: false
				});
				
				break;
				
			case "mute":
				this.toggleMute();
				
				
				break;
				
			case "fs":	
				this.fullScreen();
				break;
				
			case "jumpTo":
				if(isNaN(this.refs.mVideo.duration)) return null;
				
				this.refs.mVideo.currentTime = v.currentTarget.value/1000 * this.refs.mVideo.duration; 
				break;
									
			default:
				break;	
		}
	}
	
	updateAll() {
		const {datas} = this.props;
		
		if (this.state.hold){
			 clearInterval(this.evalTime);
			 return;
		}
		
		let mhold = false;
		let currentTime = '';
		
		try {
			currentTime = this.refs.mVideo.currentTime;
		}
		catch(e){
			clearInterval(this.evalTime);
			return;
		}
		
		
		if (currentTime > 15 && datas.preview === true) {
			this.refs.mVideo.currentTime = 15;
			
			mhold = true;
			this.refs.mVideo.pause();
			
			this.continueWatchingModal();
			
			this.refs.mVideo.webkitExitFullScreen();
		}
		
		
		if(this.props.nextVideo && this.refs.mVideo.duration !== 0)
			if((this.refs.mVideo.duration-.1) <= this.refs.mVideo.currentTime && !this.props.last){
				this.refs.mVideo.currentTime = 0
				
				this.props.nextVideo();
			}
		
		if(this.refs.mVideo.duration > 0){
			const timerVideo = (this.refs.mVideo.currentTime/this.refs.mVideo.duration);
			
			this.refs.progressBox.refs.progress.refs.sliderBox.refs.slider.value = (timerVideo * 1000)-2;
		}
		else
			this.refs.progressBox.refs.progress.refs.sliderBox.refs.slider.value = 0;
			
		this.setState(
			Object.assign({}, this.state,{
	            duration: this.refs.mVideo.duration,
	            currentTime: this.refs.mVideo.currentTime,
	            percent: this.refs.mVideo.currentTime/this.refs.mVideo.duration,
	            paused: this.refs.mVideo.paused,
	            muted: this.refs.mVideo.muted,
	            volume: this.refs.mVideo.volume,
	            hold: mhold
	        })
        )	
	}
	
    togglePlay() {
		if (this.state.hold) return
		
        if (this.state.paused ) {
            this.play();
        } else {
            this.pause();
        }

        this.updateAll();
    }
    
    toggleMute() {
        if (this.state.muted) {
            this.unmute();
        } else {
            this.mute();
        }
        this.updateAll();
    }    
    
    play() {
        this.refs.mVideo.play();
        
        this.props.play && this.props.play()
    }

    pause() {
        this.refs.mVideo.pause();
    }

    unmute() {
        this.refs.mVideo.muted = false;
        
	    
	    this.refs.progressBox.refs.audio.refs.sliderAudio.value = this.state.volume*100;
    }

    mute() {
        this.refs.mVideo.muted = true;
	    
	    this.refs.progressBox.refs.audio.refs.sliderAudio.value = 0;
    }  
       	
	
    fullScreen() {
	    let mV = this.refs.mVideo;
        if (mV.requestFullscreen) {
            mV.requestFullscreen();
        } else if (mV.msRequestFullscreen) {
            mV.msRequestFullscreen();
        } else if (mV.mozRequestFullScreen) {
            mV.mozRequestFullScreen();
        } else if (mV.webkitRequestFullscreen) {
            mV.webkitRequestFullscreen();
        }
    }
    
    
    formatTime(seconds) {
        var date = new Date(Date.UTC(1970,1,1,0,0,0,0));
        seconds = isNaN(seconds) ? 0 : Math.floor(seconds);
        date.setSeconds(seconds);
        return date.toISOString().substr(14, 5);
    }    
    	
    
    onClickAudio() {
	    const {value} = this.refs.progressBox.refs.audio.refs.sliderAudio;
	    
	    const newValue = parseInt(value,10)/100;
	    
	    
	    const muted = newValue === 0 ? true : false;
	    
	    this.refs.mVideo.volume = newValue;
	    this.refs.mVideo.muted = muted;
	    
	    this.setState({
		    volume: newValue,
		    muted: muted
	    })
    }
	
	
	continueWatchingModal(){
		const {workoutID, exercise} = this.props;
		const {uid} = this.props.datas;
		const {user_login} = this.props;
		
		if(!user_login){
			store.dispatch(
				setVisibilityModal(ModalVisibilityFilters.SHOW, ModalTypes.JOIN)
			);
		}
		else{
			if(exercise){
				store.dispatch(
					setVisibilityModal(ModalVisibilityFilters.SHOW, ModalTypes.BECOME_PLATINUM_MEMBER, uid)
				);
			}
			else{
				store.dispatch(
					setVisibilityModal(ModalVisibilityFilters.SHOW, ModalTypes.VIEWING_OPTION_SELECT, workoutID)
				);
			}
		}
	}
	
	
	render(){
		const playerIcon = isMobile() ? vcPlay : bigMedia;
		
		
		return(
			<div className="f2x-video-box">
				
				<video 
					ref="mVideo"
					className="f2x-videoblock"
					
					width={this.props.width? `${this.props.width}`: "100%"} 
					height={this.props.height? `${this.props.height}`: ""} 
					
					preload="auto"
					poster={'' + MURL + this.props.poster}
					src={this.props.url} 
				/>
				
				<F2xVideoControls 
					ref="progressBox"
					onClick={ (n,v, m) => { this.playerAction(n,v, m)} }  
					mode={this.state.paused} 
					cT={this.state.percent} 
					currentTime={ this.formatTime(this.state.currentTime) }
					duration={ this.formatTime(this.state.duration) }
					sound={ this.state.muted }
					hold={ this.state.hold }
					audioS={this.state.audioSlider}
					onClickAudio={this.onClickAudio}
					hidden={this.state.paused && this.state.currentTime === 0}
				/>
				
				<F2xIcon 	className="f2x-video-big-play cursor" 
							icon={ playerIcon }
							style={{marginTop: isIOS() ? -20 : -45}} 
							onClick={() => this.togglePlay()} 
							hidden={!this.state.paused || this.state.hold} />
				
				<div className="f2x-video-hold small-font" style={{display: this.state.hold ? 'block': 'none'}}>
					<div className="f2x-video-hold-content">
						TO VIEW THE FULL EXERCISE,
						<br />
						CLICK THE BUTTON BELLOW
						
						<div>
							<F2xButton 	name="CONTINUE WATCHING" 
										className="f2x-new-button-white small-font separated" 
										style={{padding: '8px 25px', marginTop: '20px'}} 
										onClick={ () => this.continueWatchingModal()} />
						</div>
					</div>
				</div>
					
			</div>
		)
	}
};


const mapStateToProps = (state) => {
	const {login} = state.user;
	
	return {
		user_login: login
	}
}

const F2xVideo = connect(mapStateToProps)(f2xVideo);


export default F2xVideo;