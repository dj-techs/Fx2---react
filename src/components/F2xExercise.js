import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DragSource } from 'react-dnd';





/*
 * Global Vars & Functions
 */
import { store } from '../';
import { MURL, isMobile } from '../data/data';
import { setVisibilityVideo, ModalVisibilityFilters, VideoTypes, setVisibilityModal, ModalTypes, setMobileOptionBox } from '../actions';
import { addItemToWorkout } from '../data/workout_tools';



/*
 * Components
 */
import F2xItemTypes from '../exercise/F2xItemTypes';



/*
 * Style
 */
import './F2xExercise.css';



/*
 * Icons
 */
import PREVIEW_PLAY from '../media/preview_play_button.svg';
import ICON_ADD from '../media/button-exercise-add.svg';
import ICON_SHARE from '../media/paperclip-icon.svg';

import SETTINGS from '../media/icon_settings.svg';

import ICON_ADD_WORKOUT from '../media/add.svg';




/**********************************************************************************************************************************************************/



/*
 * Labels
 */
const ExerciseImgLabel = (props) => (
	<button className={`f2x-exercise-img-labels ${props.className}${props.intensity ? ' f2x-exercise-img-labels-intensity': ''}`}>
		{props.name}
	</button>
)

const ExerciseImgLabelMap = (props) => (
	<div>
		{
			props.list.map(
				(item, i) => {
					if(i < 2)
						return (<ExerciseImgLabel key={i} name={item} className="" />)
					else
						return ''
				}
			)
		}
	</div>
)




/*
 * Exercise Image
 */
const exerciseImage = ({dispatch, item, filter, intensity, muscles}) => {
	let labelIntensity = filter ? (<ExerciseImgLabel name={item.intensity} intensity="true" className="pc" />) : '';
	let labelIntensityM = filter ? (<ExerciseImgLabel name={item.intensity} intensity="true" className="f2x-intensity-mobile mobile" />) : '';
	
	const newIntensity = intensity.find( x => x === item.intensity);
	
	if(!newIntensity){
		labelIntensity = '';
		labelIntensityM = '';
	}
	
	
	
	
	const labelMuscle = filter ? (<ExerciseImgLabelMap list={muscles} />) : '';
	
	return (
		<div className="f2x-exercise-img cover-img cursor" style={{backgroundImage: 'url('+ MURL + item.video.poster +')'}} onClick={ () => {
									dispatch( setVisibilityVideo(ModalVisibilityFilters.SHOW, VideoTypes.EXERCISES, item.video, item.uid) ) 
									
								}}>
			<div className="f2x-exercise-img-padding">
				{labelIntensity}				
				
				{labelMuscle}
				
				{labelIntensityM}	
				<div className="clear" />
				
				
			</div>
			
			<div className="f2x-exercise-img-play cursor" style={{backgroundImage: 'url('+ PREVIEW_PLAY +')'}} />
			
			<div className="f2x-exercise-add cover-img" style={{backgroundImage: 'url('+ ICON_ADD_WORKOUT +')'}} onClick={(e) => {e.stopPropagation(); addItemToWorkout(item);}} />
		</div>
	);
}

let mapStateToProps = (state, props) => {
	const {exercises} = state;
	
	const checkFilter = (
							(exercises.sport.toLowerCase() !== 'all') ||
							(exercises.tipe.toLowerCase() !== 'all') ||
							(exercises.trainer.toLowerCase() !== 'all') ||
							(exercises.intensity.length !== 0) ||
							(exercises.muscle.length !== 0)
						);
	
	
	let newMuscleGroups = props.item.muscle_groups.slice();
	newMuscleGroups = newMuscleGroups.filter( x => exercises.muscle.find( y => y.trim().toLowerCase() === x.trim().toLowerCase()));
	
	
	return {
		filter: checkFilter,
		intensity: exercises.intensity,
		muscles: newMuscleGroups
	}
}

const ExerciseImage = connect(
	mapStateToProps
)(exerciseImage)




/*
 * Settings Options
 */
const LiOptions = ({icon, alt, text, onClick}) => (
	<li onClick={() => onClick() }>
		<img src={icon} alt={alt} width="14" height="14" /> {text}
	</li>
)





/*
 * Settings
 */
class settings extends Component {
	constructor(props){
		super(props);
		
		this.state = {
			menu: 'none'
		}
		
		this.toggle = this.toggle.bind(this);
		this.closeB = this.closeB.bind(this);
	}
	
	toggle() {
		const newState = this.state.menu === 'none' ? 'block' : 'none';
		
		this.setState({
			menu: newState
		});
		
		
	}
	
	closeB() {
		this.setState({
			menu: 'none'
		})
	}
	
	openB() {
		this.setState({
			menu: 'block'
		})
	}
	
	render(){
		const {uid, dispatch, item, login} = this.props;
		
		const addModal = login ? 'WORKOUT_SELECT' : 'SIGN_IN';
		
		
		const addExercise = login ? (<LiOptions icon={ICON_ADD} alt="Add to an Existing Workout" text="Add to an Existing Workout" onClick={ () => {this.toggle(); store.dispatch( setVisibilityModal( ModalVisibilityFilters.SHOW, ModalTypes[addModal], uid ) );} } modal="" />) : '';
		
		if(item === '')
			return (<div />);
		else
			return (
				<div style={{position: 'relative'}}>
					<div className="filter-image cover-img" style={{backgroundImage: 'url('+ MURL + item.video.poster +')'}} />						
						
					<div className="f2x-video-settings" style={{display: this.state.menu}} onMouseOut={() => this.closeB()} onMouseOver={() => this.openB()}>
						<ul className="" onMouseOver={() => this.openB()}>
							{addExercise}
							<LiOptions icon={ICON_SHARE} alt="Share Workout" text="Share" onClick={ () => { this.toggle();  store.dispatch( setVisibilityModal( ModalVisibilityFilters.SHOW, ModalTypes['EXERCISE_SHARE'], uid ) ); } } />
						</ul>
					</div>
					
					{
						isMobile()?
							(<img src={SETTINGS} alt="Settings" width="13" onClick={(e) => {e.stopPropagation(); dispatch(setMobileOptionBox(uid, 'block'));}} className="f2x-exercise-settings-img" />)
							:
							(<img src={SETTINGS} alt="Settings" width="13" onClick={() => this.toggle()} className="f2x-exercise-settings-img" />)
					}
					
				</div>
			)
	}
}


mapStateToProps = (state) => {
	const {user} = state;
	
	return {
		login: user.login
	}
}


const Settings = connect(
	mapStateToProps
)(settings);


function collect(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	};
}



const exerciseSource = {
	beginDrag(props) {
		return props.item;
	},
	
	endDrag(props, monitor) {
		const item = monitor.getItem();
		const dropResult = monitor.getDropResult();
		if (dropResult) {
			addItemToWorkout(item);
		}
	}
};



const F2xExercise = (props, { dispatch }) => {
	let exerciseTimeMinutes = ~~(props.item.duration/60);
		exerciseTimeMinutes = exerciseTimeMinutes < 10 ? '0'+ exerciseTimeMinutes : exerciseTimeMinutes;
		
	let exerciseTimeSeconds = ( props.item.duration - (60 * ~~(props.item.duration/60)) );
		exerciseTimeSeconds = exerciseTimeSeconds < 10 ? '0'+ exerciseTimeSeconds : exerciseTimeSeconds;
		
	let exerciseTime = exerciseTimeMinutes +':'+ exerciseTimeSeconds;
	
	
    const { connectDragSource, isDragging } = props;
    const opacity = isDragging ? 0.2 : 1;	
	
	
	return (
		connectDragSource(
			<div className="f2x-exercise" style={ {opacity: opacity } } >
				<ExerciseImage item={props.item} />
				
				<div>
					<div className="f2x-exercise-name">
						{props.item.title}
						
						<div className="f2x-exercise-settings cursor">
							<Settings uid={props.item.uid} item={props.item} />
							
							<div className="clear" />
						</div>
					</div>
					
					<div className="f2x-exercise-info small-font montse_light">
						<div className="f2x-exercise-trainer separated">{props.item.trainer.name}</div>
						<div className="f2x-exercise-time pc">{exerciseTime}</div>
						<div className="f2x-exercise-cal pc">{props.item.calories}</div>
						
						<div className="f2x-exercise-cal mobile">{props.item.calories}</div>
						<div className="f2x-exercise-time mobile">{exerciseTime}</div>
					</div>
				</div>
			</div>
		)	
	)
}



export default DragSource(F2xItemTypes.EXERCISE, exerciseSource, collect)(F2xExercise);