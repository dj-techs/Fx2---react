import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux'






/*
 * Global Vars & Functions
 */
import { setVisibilityVideo, ModalVisibilityFilters, VideoTypes, setVisibilityModal, ModalTypes } from '../actions';



/*
 * Components
 */
import F2xButton from '../components/F2xButton';



/*
 * Players
 */
import F2xEVplayer from './F2xEVplayer/F2xEVplayer';
import F2xWVplayer from './F2xWVplayer/F2xWVplayer';



/*
 * Style
 */
import './F2xVideoPlayer.css';











const MuscleLabel = (props) => (
	<div className="f2x-muscle-labels f2x-muscle-labels-view">
		{props.name}
	</div>
)

const MuscleLabelList = (props) => (
	<div className="f2x-label-content">
		{
			props.list.map(
				(item, i) =>
					<MuscleLabel name={item} key={i} />
			)
		}
	</div>
);









const shareButton = ( {dispatch, uid} ) => (
	<F2xButton 	name="SHARE" 
				className="f2x-new-button-black2-invert pc" 
				style={{height: '32px', padding: '0 23px', fontSize: '11px'}} 
				onClick={ () => dispatch( setVisibilityModal(ModalVisibilityFilters.SHOW, ModalTypes.EXERCISE_SHARE, uid)) } />
);

const ShareButton = connect()(shareButton);

const addButton = ( {dispatch, uid, login} ) => {
	const addModal = login ? 'WORKOUT_SELECT' : 'SIGN_IN';
	
	return (
		<F2xButton 	name="ADD TO WORKOUT" 
					className="f2x-new-button-black-invert pc" 
					style={{height: '32px', padding: '0 23px', fontSize: '11px', marginLeft: '8px'}} 
					onClick={ () => dispatch( setVisibilityModal(ModalVisibilityFilters.SHOW, ModalTypes[addModal], uid)) } />
	);
}


let mapStateToProps = (state) => {
	const {user} = state;
	
	
	return {
		login: user.login
	}
}

const AddButton = connect(
	mapStateToProps
)(addButton);









const f2xVideoPlayer = ({mode, type, video, onClick, item, onClose}) => {
	if(!item) return (<div />);
	
	let videoRender = '';
	
	switch(type){
		case VideoTypes.WORKOUT:
			videoRender = (<F2xWVplayer datas={item} />);
			break;
		
		case VideoTypes.EXERCISES:
			videoRender = (<F2xEVplayer datas={item} video={video}/>);
			break;
			
		default:
			break;
	}
	
	let exerciseTimeMinutes = ~~(item.duration/60);
		exerciseTimeMinutes = exerciseTimeMinutes < 10 ? '0'+ exerciseTimeMinutes : exerciseTimeMinutes;
		
	let exerciseTimeSeconds = ( item.duration - (60 * ~~(item.duration/60)) );
		exerciseTimeSeconds = exerciseTimeSeconds < 10 ? '0'+ exerciseTimeSeconds : exerciseTimeSeconds;
		
	let exerciseTime = exerciseTimeMinutes +':'+ exerciseTimeSeconds;
	
	return (
		<div className="f2x-video f2x-video-single" style={{display: mode}}>
			<div className="f2x-video-back" onClick={ () => onClick() }></div>
			
			<div className="f2x-video-compo">
				{videoRender}
				
				<div className="f2x-video-compo-close cursor" onClick={onClose}>
					CLOSE
				</div>
				
				<div className="f2x-video-single-info">
					<div className="f2x-video-title">
						{item.title} <AddButton uid={item.uid} /> <ShareButton uid={item.uid} />
					<div className="clear" />
					</div>
					
					<div className="f2x-video-info small-font montse_light">
						{item.trainer && item.trainer.name}  |  {exerciseTime} min  |  {item.calories} cal
					</div>
					
					
					<div className="f2x-video-labels small-font montse_light">
						Muscle Group: <span className="small-font"><MuscleLabelList list={item.muscle_groups || []} /><div className="f2x-label-content" style={{margin: '0'}}><div className="f2x-muscle-labels">{item.intensity || ''}</div></div></span>
					</div>
					
					<div className="clear" />
				</div>
			</div>
		</div>
)};




mapStateToProps = (state) => {
	const {exercises} = state;
	
	const exercise = exercises.list ? (exercises.list.length ? (exercises.list.find(x => x.uid === state.videoPlayer.id)) : []) : [];
	
	return {
		mode: state.videoPlayer.state,
		type: state.videoPlayer.type,
		video: state.videoPlayer.video,
		item: exercise
	};
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: () => {
	    browserHistory.push('/exercise');
    	dispatch( setVisibilityVideo(ModalVisibilityFilters.HIDE))
    },
    onClose: () => {
    	dispatch( setVisibilityVideo(ModalVisibilityFilters.HIDE))
    }
  }
}


const F2xVideoPlayer = connect(
	mapStateToProps, 
	mapDispatchToProps 
)(f2xVideoPlayer)


export default F2xVideoPlayer;
