import React, { Component } from 'react';
import { connect } from 'react-redux'
import { browserHistory } from 'react-router';



/*
 * Global Vars & Functions
 */
import { setTitleMobile, setVisibilityModal, ModalVisibilityFilters, ModalTypes, setMyWorkouts, setMobileFilter, setMobileFilterBox } from '../../actions'
import { MURL, isMobile } from '../../data/data';
import { store } from '../../.';
import { openWorkout, resetWorkout } from '../../data/workout_tools';



/*
 * Components
 */
import F2xShort from '../../components/F2xShort';
import F2xIcon from '../../components/F2xIcon';
import F2xButton from '../../components/F2xButton';




/*
 * Style
 */
import './F2xMyWorkoutList.css';





/*
 * Icons
 */
import ICON_LIST from '../../media/list_view.svg';
import ICON_GRID from '../../media/grid_view.svg';
import ICON_PREVIEW_PLAY from '../../media/preview_play_button.svg';

import ICON_REMOVE from '../../media/Icon_Close.svg';
import ICON_SHARE from '../../media/paperclip_icon.svg';
import ICON_SETTINGS from '../../media/icon_settings.svg';
import ICON_EDIT from '../../media/Icon_Edit.svg';
import ICON_CLOSE from '../../media/Icon_Close.svg';





const dropOptons = [
	'Most Popular',
	'Newest to Oldest',
	'Oldest to Newest',
	'Alphabetically, A-Z',
	'Alphabetically, Z-A'
];


const MyWorkoutHeader = (props) => (
	<div className="f2x-myworkout-header">
		{/*
		<div className="f2x-workout-title-text f2x-section-title">
			MY WORKOUTS
		</div>
		*/}
		
		<F2xShort style={{float: 'right', marginLeft: '15px'}} selectStyle={{width: '172px', marginTop: '-5px'}} list={dropOptons} value={(props.sort - 1)} onClick={(id) => props.onSort(id+1) } />
		
		<F2xIcon icon={ICON_GRID} className={`f2x-my-workout-content-style cursor${props.slc === 1 ? ' f2x-my-workout-type-inactive' : ''}`} onClick={()=>props.onClick(2)} />
		<F2xIcon icon={ICON_LIST} className={`f2x-my-workout-content-style cursor${props.slc === 2 ? ' f2x-my-workout-type-inactive' : ''}`} onClick={()=>props.onClick(1)} />
		
		
		<div className="clear" />
	</div>
)








class F2xExercise extends Component {
	
	constructor(props){
		super(props);
		
		this.openSettings = this.openSettings.bind(this);
		this.closeSettings = this.closeSettings.bind(this);
	}
	
	openSettings() {
		this.refs.box.style.display = 'block';
	}
	
	
	closeSettings() {
		this.refs.box.style.display = 'none';
	}
	
	
	
	render() {
		const {props} = this;
		
		
		let exerciseTimeMinutes = ~~(props.workout.duration/60);
			exerciseTimeMinutes = exerciseTimeMinutes < 10 ? '0'+ exerciseTimeMinutes : exerciseTimeMinutes;
			
		let exerciseTimeSeconds = ( props.workout.duration - (60 * ~~(props.workout.duration/60)) );
			exerciseTimeSeconds = exerciseTimeSeconds < 10 ? '0'+ exerciseTimeSeconds : exerciseTimeSeconds;
			
		let exerciseTime = exerciseTimeMinutes +':'+ exerciseTimeSeconds;
		
		let timeAgo = '';
			
		const dateNow		= new Date();
		const dateWorkout = new Date(props.workout.date_added);
		
		const dateTime = ( (dateNow - dateWorkout)/1000/60/60/24 ).toFixed(0);
		
		if(!props.mode){
			if(dateTime < 1){
				timeAgo = 'Today';
			}
			else{
				if(dateTime === 1){
					timeAgo = dateTime +' Day Ago';
				}
				else{
					timeAgo = dateTime +' Days Ago';
				}
			}
		}
		
		const stl = isMobile() ? {display: 'block'} : {};
		
		
		const fnc = isMobile() ? (e) => { props.filter(e, props.workout) } : this.openSettings;
		
		
		return (
			<div className="f2x-myworkout-item">
				<div style={{ backgroundImage: 'url('+ MURL + props.item.video.poster +')'}} className="img cover-img" onClick={ () => browserHistory.push('/myworkout/'+ props.id)} />
				
				<div className="f2x-exercise-img-play cursor" style={{backgroundImage: 'url('+ ICON_PREVIEW_PLAY +')'}} onClick={ () => browserHistory.push('/myworkout/'+ props.id)} />
				
				<div className="f2x-myworkout-title">
					{props.title}
					
					<img src={ICON_SETTINGS} alt="Settings" width="14" className="f2x-myworkout-settings cursor" style={stl} onClick={fnc} />
					
					<div className="f2x-myworkout-video-settings" ref="box" onMouseOut={this.closeSettings} onMouseOver={this.openSettings}>
						<ul onMouseOver={this.openSettings}>
							<li className="cursor" onClick={() => {this.closeSettings(); openWorkout(props.workout);}}><F2xIcon icon={ICON_EDIT} style={{width: '15px', height: '15px', float: 'left', marginRight: '15px'}} /> Edit</li>
							<li className="cursor" onClick={() => {this.closeSettings(); store.dispatch( setVisibilityModal(ModalVisibilityFilters.SHOW, ModalTypes.WORKOUT_SHARE, props.workout.uid));}}><F2xIcon icon={ICON_SHARE} style={{width: '15px', height: '15px', float: 'left', marginRight: '15px'}} /> Share</li>
							<li className="cursor" onClick={() => {this.closeSettings(); store.dispatch( setVisibilityModal(ModalVisibilityFilters.SHOW, ModalTypes.WORKOUT_REMOVE, props.workout));}}><F2xIcon icon={ICON_REMOVE} style={{width: '15px', height: '15px', float: 'left', marginRight: '15px'}} /> Delete</li>
						</ul>
					</div>
					
					
					<div className="f2x-myworkout-datas small-font montse_light">
						{timeAgo}   |  {exerciseTime}  |  {props.workout.calories} cal
					</div>
				</div>
			</div>
		)
	}
}





const NoGroupItems = ({list=[], sort, filter}) => {
	let sortList = 'uid';
	let order = -1;
	
	switch(sort){
		case 1:
			break;
			
		case 2:
			sortList = 'date_added';
			order = -1;
			break;
			
		case 3:
			sortList = 'date_added';
			order = 1;
			break;
			
		case 4:
			sortList = 'title';
			order = 1;
			break;
			
		case 5:
			sortList = 'title';
			order = -1;
			break;
			
		default:
			break;
	}
	
	list = getVisibleList(sortList, order, list);
	
	return (
		<div className="f2x-preconfigure-workout-list list">
			{
				list.map(
					(item, i) => (
						<F2xExercise
							key={item.uid} 
							item={item.exercises[0]}
							title={item.title}
							user={item.user}
							id={item.uid}
							filter={filter}
							workout={item}
						/>
					)
				)
			}
		</div>
	)
}














const videoButtons = ({dispatch, item}) => (
	<div className="f2x-myworkouts-options">
		<F2xButton className="f2x-new-button-black-invert" style={{height: '27px', width: '66px', fontSize: '10px', color: '#414141', borderColor: '#414141'}} name="EDIT" onClick={ () => {openWorkout(item)} }/>
		<F2xButton className="f2x-new-button-black-invert" style={{height: '27px', width: '66px', fontSize: '10px', color: '#414141', borderColor: '#414141'}} name="SHARE" onClick={ () => dispatch( setVisibilityModal(ModalVisibilityFilters.SHOW, ModalTypes.WORKOUT_SHARE, item.uid)) } />
		<F2xButton className="f2x-new-button-black-invert" style={{height: '27px', width: '66px', fontSize: '10px', color: '#414141', borderColor: '#414141'}} name="DELETE" onClick={ () => {dispatch( setVisibilityModal(ModalVisibilityFilters.SHOW, ModalTypes.WORKOUT_REMOVE, item)) }} />
	</div>
);

const VideoButtons = connect()(videoButtons);





const F2xExerciseGroup = (props) => (
	<div className="f2x-myworkout-item cover-img" style={{width: props.width +"%", backgroundImage: 'url('+ MURL + props.item.video.poster +')'}}  onClick={ () => browserHistory.push('/myworkout/'+ props.id)}>
		
	</div>
)



const GroupItemsList = ({list=[]}) => {
	let timeAgo = '';
	
	const exerciseTime = ~~(list.duration/60);
	
	
	const dateNow		= new Date();
	const dateWorkout = new Date(list.date_added);
	
	
	const dateTime = ( (dateNow - dateWorkout)/1000/60/60/24 ).toFixed(0);
	
	if(dateTime < 1){
		timeAgo = 'Today';
	}
	else{
		if(dateTime === 1){
			timeAgo = dateTime +' Day Ago';
		}
		else{
			timeAgo = dateTime +' Days Ago';
		}
	}
	
	
	return (
		<div className="f2x-preconfigure-workout-group">
			<div className="f2x-preconfigure-workout-group-i">
				{
					list.exercises.map(
						(item, i) => (
							<F2xExerciseGroup
								key={i} 
								item={item}
								id={list.uid}
								width={(925/list.exercises.length) / (925/100)}
							/>
						)
					)
				}
			</div>
			
			<div className="f2x-myworkout-title">
				{list.title}
				
				<VideoButtons item={list} />
				
				<div className="f2x-myworkout-datas small-font montse_light">
					{timeAgo}  |  {exerciseTime} min |  {list.calories} cal
				</div>
			</div>
				
			<div className="f2x-exercise-img-play cursor" style={{backgroundImage: 'url('+ ICON_PREVIEW_PLAY +')'}} onClick={ () => browserHistory.push('/myworkout/'+ list.uid)} />
		</div>
	)
}



const GroupItems = ({list, sort}) => {
	let sortList = 'populatiry';
	let order = -1;
	
	switch(sort){
		case 1:
			break;
			
		case 2:
			sortList = 'date_added';
			order = -1;
			break;
			
		case 3:
			sortList = 'date_added';
			order = 1;
			break;
			
		case 4:
			sortList = 'title';
			order = 1;
			break;
			
		case 5:
			sortList = 'title';
			order = -1;
			break;
			
		default:
			break;
	}
	
	list = getVisibleList(sortList, order, list);
	
	
	return(
		<div>
			{
				list.map(
					(item, i) => {
						return (
							<div key={i}>
								<GroupItemsList list={ item } />		
				
								<div className="clear" />
							</div>
						)
					}
				)
			}
		</div>
	)
}







function getVisibleList(sorting, order, list) {
	return list
		.sort(
			(a, b) => {
				if(sorting === 'name'){
					a = a.exercises[0].trainer
					b = b.exercises[0].trainer
				}
				if(sorting && order === 1){
					if(a[sorting] > b[sorting])
						return 1;
					else if(a[sorting] < b[sorting])
							return -1;
						else
							return 0;
				}
				if(sorting && order === -1){
					if(a[sorting] < b[sorting])
						return 1;
					else if(a[sorting] > b[sorting])
							return -1;
						else
							return 0;
				}
				
				return 1;
			}
		);
}




// Presentacionales
const workout = ({list, slc, sort, filter}) => {
	if(slc === 2){
		return (<NoGroupItems list={list} sort={sort} filter={filter} />)
	}
	else{
		return (<GroupItems list={list} sort={sort}  />)
	}
}

let mapStateToProps = (state) => {
	const { myworkouts } = state;
	
	return {
		list: myworkouts.list
	};
}

const Workout = connect(
	mapStateToProps, 
	null 
)(workout) 








const workoutFilter = ({dispatch, filter, item, onClick}) => {
	let exerciseTimeMinutes = ~~(item.duration/60);
		exerciseTimeMinutes = exerciseTimeMinutes < 10 ? '0'+ exerciseTimeMinutes : exerciseTimeMinutes;
		
	let exerciseTimeSeconds = ( item.duration - (60 * ~~(item.duration/60)) );
		exerciseTimeSeconds = exerciseTimeSeconds < 10 ? '0'+ exerciseTimeSeconds : exerciseTimeSeconds;
		
	let exerciseTime = exerciseTimeMinutes +':'+ exerciseTimeSeconds;
	
	
	let timeAgo = '';
		
	const dateNow		= new Date();
	const dateWorkout = new Date(item.date_added);
	
	const dateTime = ( (dateNow - dateWorkout)/1000/60/60/24 ).toFixed(0);
	
	if(dateTime < 1){
		timeAgo = 'Today';
	}
	else{
		if(dateTime === 1){
			timeAgo = dateTime +' Day Ago';
		}
		else{
			timeAgo = dateTime +' Days Ago';
		}
	}
	
	if(item === '')
		return (<div />);
	else
		return (
			<div className="f2x-myworkout-filter-box mobile" onClick={(e) => onClick(e)} style={{display: filter}}>
				<div className="f2x-myworkout-filter" onClick={(e) => e.stopPropagation()}>
					<div className="filter-image cover-img" style={{backgroundImage: 'url('+ MURL + item.exercises[0].video.poster +')'}} />
					
					<div className="filter-data">
						<b>{item.title}</b>
						<br />
						<span className="small-font">
							{timeAgo} | {exerciseTime} min | {item.calories} cal
						</span>
					</div>
					
					<div className="clear" />
					
					<ul>
						<li onClick={() => openWorkout(item)}><F2xIcon icon={ICON_EDIT} style={{width: '20px', height: '20px', float: 'left', marginRight: '15px'}} /> EDIT</li>
						<li onClick={() => dispatch( setVisibilityModal(ModalVisibilityFilters.SHOW, ModalTypes.WORKOUT_SHARE)) }><F2xIcon icon={ICON_SHARE} style={{width: '20px', height: '20px', float: 'left', marginRight: '15px'}} /> SHARE</li>
						<li onClick={(e) => {onClick(e); dispatch( setVisibilityModal(ModalVisibilityFilters.SHOW, ModalTypes.WORKOUT_REMOVE, item))} }><F2xIcon icon={ICON_REMOVE} style={{width: '20px', height: '20px', float: 'left', marginRight: '15px'}} /> REMOVE</li>
					</ul>
					
					<div className="cancelBtn" onClick={(e) => onClick(e)}>
						CANCEL
					</div>
				</div>
			</div>
		)
}

const WorkoutFilter = connect()(workoutFilter);




const workoutSortList = ({onClick, filter, onSort, sort}) => {
	return (
		<div className="f2x-myworkout-filter-box mobile" onClick={(e) => onClick(e)} style={{display: filter}}>
			<div className="f2x-myworkout-filter" onClick={(e) => e.stopPropagation()}>
				<div className="f2x-filter-top-menu">
					<img src={ICON_CLOSE} alt="Close" className="f2x-filter-close-btn" onClick={(e) => onClick(e)} />
				</div>
				
				<div className="f2x-filter-content" style={{paddingBottom: 170}}>
					<div className="f2x-exercise-sort">
						<F2xShort selectStyle={{width: '172px', marginTop: '-5px'}} list={dropOptons} value={(sort - 1)} onClick={(id) => onSort(id+1) } />
					</div>
			
				</div>

			</div>
		</div>
	)
}


let mapDispatchToProps = (dispatch) => {
	return {
	    onClick: () => {
	    	dispatch(setMobileFilterBox('none'))
	    }
	}
}

const WorkoutSortList = connect(
	null,
	mapDispatchToProps
)(workoutSortList);




// Constructor
class f2xMyWorkoutList extends Component {
	constructor(props){
		super(props);
		
		this.state = {
			slc: (isMobile() ? 2 : 1),
			sort: store.getState().myworkouts.sort,
			filter: 'none',
			item: ''
		}
		
		this.onClick = this.onClick.bind( this );
		this.onSort = this.onSort.bind( this );
		this.onFilter = this.onFilter.bind( this );
	}
	
	componentWillMount(){
		store.dispatch( setTitleMobile('MY WORKOUTS') );
		
		resetWorkout();
		
		if(isMobile()){
			store.dispatch( setMobileFilter('block') );
		}
	}
	
	componentWillUnmount(){
		store.dispatch( setMobileFilter('none') );
	}
	
	onClick(id){
		this.setState({
			slc: id
		});
	}
	
	onSort(id){
		store.dispatch( setMyWorkouts(store.getState().myworkouts.list, id) );
		
		this.setState({
			sort: id
		});
	}
	
	onFilter(e, item=''){
		e.stopPropagation();
		
		const { filter } = this.state;
		
		this.setState({
			filter: (filter === 'none' ? 'block' : 'none'),
			item: item
		})
	}
	
	render(){
		const { slc, sort } = this.state;
		const {box} = this.props;
		
		return (
			<div className="f2x-my-workout-content">
				<MyWorkoutHeader slc={slc} sort={sort} onClick={this.onClick} onSort={this.onSort} />
				
				<Workout slc={slc} sort={sort} filter={this.onFilter} />
				
				<WorkoutFilter onClick={this.onFilter} filter={this.state.filter} item={this.state.item} />
				
				<WorkoutSortList filter={box} sort={sort} onSort={this.onSort} />
			</div>
		)
	}
}


mapStateToProps = (state) => {
	const {box} = state.filters;
	
	return {
		box: box
	}
}


const F2xMyWorkoutList = connect(
	mapStateToProps
)(f2xMyWorkoutList);



export default F2xMyWorkoutList;