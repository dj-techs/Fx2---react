import React, { Component } from 'react';
import { connect } from 'react-redux'


/*
 * Global Vars & Functions
 */
// import { store } from '../../';
import { /* MURL , guest, */ isMobile, isIOS } from '../../data/data';



/*
 * Components
 */
import F2xIcon from '../../components/F2xIcon';




/*
 * Style
 */
import './F2xVideoCarousel.css';


/*
 * Icons
 */
import bigMedia from '../../media/big_play_button.svg';
import vcExpand from '../../media/video_control_expand.svg';
import vcPause from '../../media/video_control_pause.svg';
import vcPlay from '../../media/video_control_play.svg';
import vcSoundOff from '../../media/video_control_sound_off.svg';
import vcSoundOn from '../../media/video_control_sound_on.svg';
import prevVideo from '../../media/carousel-left.svg';
import nextVideo from '../../media/carousel-right.svg';
import getStarted from '../../media/button-get-started.svg';
import comment from '../../media/home-comment.svg';
import arrowDown from '../../media/home-arrow-down.svg';



//
// ******* VIDEO BACKGROUND CAROUSEL
//

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
			<div className="f2x-video-controls" style={{display: isIOS() ? 'none' : 'block'}}>
				<F2xVideoProgress hidden={props.hidden} ref="progress" hold={props.hold} percent={props.cT*100} onClick={ (n,v,m) => props.onClick(n,v,m)  }  />
			
				<F2xVideoPause onClick={ (n) => props.onClick(n)  } icon={ props.mode ? vcPlay : vcPause}/>
				<F2xVideoTime currentTime={props.currentTime} duration={props.duration} />
				<F2xVideoMute audioS={props.audioS} ref="audio" onClick={ (n) => props.onClick(n) } onClickAudio={ (n) => props.onClickAudio(n)  } icon={ props.sound ? vcSoundOff : vcSoundOn } />
				<F2xVideoFullScreen onClick={ (n) => props.onClick(n)  } />
			</div>	
		)
	}
}

//Container component
class f2xVideoCarousel extends Component{

	constructor(props) {
	    super(props);
	
	    this.state = { 
           	id: 0,
			invoke: false,
			paused: true,
			hold: false,
			percent: 0,
			currentTime: 0,
			duration: 0,
			muted: false,
			loop: true,
			audioSlider: false,
			autoPlay: false,
			arrow_position: 0
	    };

	}

	componentDidMount() {
		setTimeout( this.animateArrow, 500 )
	}

	componentWillUnmount() {
		clearTimeout(this.arrowAnimate)
	}

	formatTime(seconds) {
        var date = new Date(Date.UTC(1970,1,1,0,0,0,0));
        seconds = isNaN(seconds) ? 0 : Math.floor(seconds);
        date.setSeconds(seconds);
        return date.toISOString().substr(14, 5);
    }

	nextVideo(){
		const { id } = this.state;		
		const nextId = (id+1 < 6 ? id+1 : 0);	
		clearInterval(this.arrowTime)
		this.setState({
			id: nextId,
			paused: false,
			autoPlay: true
		})
	}

	prevVideo(){
		const { id } = this.state;		
		const nextId = (id-1 >= 0 ? id-1 : 5);
		clearInterval(this.arrowTime)		
		this.setState({
			id: nextId,
			paused: false,
			autoPlay: true
		})
	}

	Invoke() {
		clearInterval(this.arrowTime)
        this.setState({
			paused: !this.state.paused,
			invoke: !this.state.invoke,
			autoPlay: true
		})
	}

	closeInvoke() {
		this.pause();
		this.setState({
			paused: !this.state.paused,
			invoke: !this.state.invoke,
			autoPlay: false
		})
	}

	togglePlay() {
		if (this.state.hold) return
		
        if (this.state.paused ) {
            this.play();
        } else {
            this.pause();
        }
		clearInterval(this.arrowTime)
		if (!this.state.invoke){
			this.setState({
				paused: !this.state.paused,
				invoke: true
			})
		} else {
			this.setState({
				paused: !this.state.paused
			})
		}
       
    }

	play() {
        this.refs.foreVideo.play();
		this.refs.backVideo.pause();
		this.refs.blurVideo.pause();
		this.evalTime = setInterval(
	    	() => this.update(),
			50
	    );
    }

    pause() {
        this.refs.foreVideo.pause();
		this.refs.backVideo.play();
		this.refs.blurVideo.play();
		clearInterval(this.evalTime);
    }

	update() {
		if(this.refs.foreVideo.duration > 0){
			const timerVideo = (this.refs.foreVideo.currentTime/this.refs.foreVideo.duration);
			
			this.refs.progressBox.refs.progress.refs.sliderBox.refs.slider.value = (timerVideo * 1000)-2;
		}
		else
			this.refs.progressBox.refs.progress.refs.sliderBox.refs.slider.value = 0;
		
	}

	animateArrow = () =>  {
		if( this.state.arrow_position === 20 ) {
			this.setState({
				arrow_position: 0
			})			
		} else {
			this.setState({
				arrow_position: 20
			})
		}
		this.arrowAnimate = setTimeout( this.animateArrow, 500 )
	}

	toggleMute() {
        if (this.state.muted) {
            this.unmute();
        } else {
            this.mute();
        }
		clearInterval(this.arrowTime)
        this.setState({
			muted: !this.state.muted
		})
    }

	unmute() {
        this.refs.foreVideo.muted = false;
	    this.refs.progressBox.refs.audio.refs.sliderAudio.value = this.state.volume*100;
    }

    mute() {
        this.refs.foreVideo.muted = true;
	    this.refs.progressBox.refs.audio.refs.sliderAudio.value = 0;
    }

	onClickAudio() {
	    const {value} = this.refs.progressBox.refs.audio.refs.sliderAudio;	    
	    const newValue = parseInt(value,10)/100;
	    const muted = newValue === 0 ? true : false;
	    
	    this.refs.foreVideo.volume = newValue;
	    this.refs.foreVideo.muted = muted;
	    clearInterval(this.arrowTime)
	    this.setState({
		    volume: newValue,
		    muted: muted
	    })
    }

	fullScreen() {
	    let mV = this.refs.foreVideo;
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

	playerAction(val,v, m){
		clearInterval(this.arrowTime)
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
				if(isNaN(this.refs.foreVideo.duration)) return null;
				
				this.refs.foreVideo.currentTime = v.currentTarget.value/1000 * this.refs.foreVideo.duration; 
				break;
									
			default:
				break;	
		}
	}

	toSlide (e) {
		clearInterval(this.arrowTime)
		this.setState({
			id: e
		})
	}

	render() {
		const video = [
			"../../media/video/1.mp4",
			"../../media/video/2.mp4",
			"../../media/video/3.mp4",
			"../../media/video/4.mp4",
			"../../media/video/5.mp4",
			"../../media/video/6.mp4"
		];

		const numbers = [0, 1, 2, 3, 4, 5];
		const pagination = numbers.map((number) =>
			<div className="btn-page" key={number.toString()} value={number} onClick={() => this.toSlide(number)} />
		);

		this.flag = false;
		let self = this;

		const playerIcon = isMobile() ? vcPlay : bigMedia;
		return (
			<div className="f2x-video-carousel">
				<div className="fullscreen-bg">
					<video
						muted
						ref="backVideo"	
						loop={this.state.loop}
						autoPlay={!this.state.autoPlay}
						className="bg-back-video"
						preload="auto"
						src={video[this.state.id]}
					/>
					<div className="alphaMask" style={this.state.invoke ? {backgroundColor: 'rgba(0,0,0,0.3)' }:{ backgroundColor: 'rgba(0,0,0,0)'}}></div>
					<div hidden={!this.state.invoke}>
						<video
							ref="foreVideo"
							loop={this.state.loop}
							autoPlay={this.state.autoPlay}
							className="bg-fore-video"
							preload="auto"
							src={video[this.state.id]}
							style={{boxShadow: '0 0 15px rgba(0,0,0,.3)'}}
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
						<div 
							className="f2x-video-player-close cursor" onClick={() => this.closeInvoke()} >CLOSE</div>
						<F2xIcon 	
							className="f2x-video-prev-video cursor" 
							icon={ prevVideo }
							onClick={() => this.prevVideo()} 
							/>
						<F2xIcon 	
							className="f2x-video-next-video cursor" 
							icon={ nextVideo }							
							onClick={() => this.nextVideo()} 
							/>
					</div>
					<F2xIcon
						className="f2x-comment cursor"
						icon={ comment } />
					<F2xIcon
						className="f2x-arrow-down cursor" 
						style={{marginTop: this.state.arrow_position+220, transition: 'all 0.5s'}} 
						icon={ arrowDown } />
					<F2xIcon
						className="f2x-btn-get-started cursor" 
						icon={ getStarted }
						onClick={() => this.getStarted()} />
					<F2xIcon 	
						className="f2x-video-big-play cursor" 
						icon={ playerIcon }
						style={{marginTop: isIOS() ? -20 : -45}} 
						onClick={() => this.togglePlay()} 
						hidden={!this.state.paused || this.state.hold} />
					<div className="blurMask">
						<video
							muted
							ref="blurVideo"
							loop={this.state.loop}
							autoPlay={!this.state.autoPlay}
							className="bg-back-video"
							preload="auto"
							src={video[this.state.id]}
						/>
					</div>
				</div>
				<div className="f2x-pagenation" hidden={this.state.invoke}>
					{pagination}
				</div>

			</div>
		)
	}
}

const mapStateToProps = (state) => {
	const { videoCarousel } = state;
	
	return {
		list: videoCarousel.list
	};
}

const F2xVideoCarousel = connect(
	mapStateToProps 
)(f2xVideoCarousel) 



export default F2xVideoCarousel;