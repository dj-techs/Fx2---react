import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';




/*
 * Gloval Vars & Functions
 */
import { store } from '../../.';
import {getFX2DB, F2xDB, MURL, updateSpecificWorkoutRequest, isMobile} from '../../data/data';
import { setExercises } from '../../actions';
import { setVisibilityVideo, ModalVisibilityFilters, ModalTypes, VideoTypes, setMobileFilterBox, setMobileOptionBox, setVisibilityModal, setMyWorkouts } from '../../actions';



/*
 * Components
 */
import F2xFilter from '../../components/F2xFilter';
import F2xExercise from '../../components/F2xExercise';
import F2xShort from '../../components/F2xShort';
import F2xInput from '../../components/F2xInput'
import F2xButton from '../../components/F2xButton';

import F2xExerciseCustomWorkout from '../F2xExerciseCustomWorkout/F2xExerciseCustomWorkout';



/*
 * Style
 */
import './F2xExerciseList.css';



/*
 * Images
 */
import ICON_CLOSE from '../../media/icon_download.svg';
import ICON_ADD from '../../media/button-exercise-add.svg';
import ICON_SHARE from '../../media/paperclip-icon.svg';
import ICON_X from '../../media/Icon_Close.svg';
import ICON_SEARCH from '../../media/search-icon2.svg';

/*
 * API Calss
 */
getFX2DB( F2xDB['exercise'] );
getFX2DB( F2xDB['filters'] );
getFX2DB( F2xDB['trainer'] );





















/*
 * SHORT
 */
const dropOptons = [
	'Most Popular',
	'Newest to Oldest',
	'Oldest to Newest',
	'Alphabetically, A-Z',
	'Alphabetically, Z-A'
];

const exerciseListShort = ({dispatch, sort}) => (
	<div className="f2x-exercise-sort">
		<F2xShort selectStyle={{width: '175px'}} list={dropOptons} 
			value={sort}
			onClick={
				(i) => 
					dispatch( 
						setExercises( 
							store.getState().exercises.list, 
							i+1, 
							store.getState().exercises.sport, 
							store.getState().exercises.tipe, 
							store.getState().exercises.trainer, 
							store.getState().exercises.intensity, 
							store.getState().exercises.muscle
						) 
					)
			} />
	</div>
)

let mapStateToProps = (state) => {
	const { exercises } = state;
	
	return {
		sort: (exercises.sort-1)
	};
}

const ExerciseListShort = connect(
	mapStateToProps
)(exerciseListShort);




/*
 * FILTER
 */
class exerciseListFilter extends Component {
	constructor(props){
		super(props);
		
		this.state = {
			reset: false,
			resetButton: false
		}
		
		this.resetAll = this.resetAll.bind(this);
	}
	
	
	resetAll() {
		store.dispatch( setExercises(store.getState().exercises.list, 1, 'all', 'all', 'all', [], []) );
		
		
		this.setState({
			reset: true,
			resetButton: false
		})
		
		setTimeout(() => {
			this.setState({
				reset: false
			})
		}, 1);
	}
	
	
	componentWillReceiveProps(nextProps){
		const {intensity, muscle, sport, tipe, trainer} = nextProps.filter;
		
		if(
			(intensity.length > 0) ||
			(muscle.length > 0) ||
			(sport.toLowerCase() !== 'all') ||
			(tipe.toLowerCase() !== 'all') ||
			(trainer.toLowerCase() !== 'all')
		){
			this.setState({
				resetButton: true
			})
		}
		else{
			this.setState({
				resetButton: false
			})
		}
	}
	
	render() {
		const {sport, type, leadTrainer, intensity, musclegroups, onClick, slcSport, slcType, slcTrainer, slcIntensity, slcMuscle} = this.props;
		
		return (
			<div className="f2x-exercise-filter">
				<div className="f2x-exercise-filter-inter">
					<F2xFilter name='SPORT' list={sport} onClick={onClick} value={slcSport} style={{width: '100%', marginBottom: '25px'}} reset={this.state.resetButton} resetFnc={this.resetAll} restart={this.state.reset} />
					<F2xFilter name='TYPE' list={type} onClick={onClick} value={slcType} style={{width: '100%', marginBottom: '25px'}} restart={this.state.reset} />
					<F2xFilter name='LEAD TRAINER' list={leadTrainer} onClick={onClick} value={slcTrainer} style={{width: '100%', marginBottom: '25px'}} restart={this.state.reset} />
					
					<F2xFilter name='INTENSITY' list={intensity} onClick={onClick} button="true" medium="true" value={slcIntensity} style={{marginBottom: '25px'}} restart={this.state.reset} />
					<F2xFilter name='MUSCLE GROUP' list={musclegroups} onClick={onClick} button="true" small="true" value={slcMuscle} style={{marginBottom: '25px'}} restart={this.state.reset} />
				</div>
			</div>
		)
	}
}


mapStateToProps = (state) => {
	const { filters, trainers, exercises } = state;
	
	let slcSport = 0;
	let slcType = 0;
	let slcTrainer = 0;
	
	filters.sport.find(
		(id, i) => {
			if(id.toLowerCase() === exercises.sport.toLowerCase())
				slcSport = i;
				
			return null;
		}
	);
	
	filters.type.find(
		(id, i) => {
			if(id.toLowerCase() === exercises.tipe.toLowerCase())
				slcType = i;
				
			return null;
		}
	);
	
	trainers.list.find(
		(id, i) => {
			if(id.toLowerCase() === exercises.trainer.toLowerCase())
				slcTrainer = i;
				
			return null;
		}
	);
	
	return {
		sport: filters.sport,
		type: filters.type,
		leadTrainer: trainers.list,
		intensity: filters.intensity,
		musclegroups: filters.musclegroups,
		
		slcSport: slcSport,
		slcType: slcType,
		slcTrainer: slcTrainer,
		slcIntensity: exercises.intensity,
		slcMuscle: exercises.muscle,
		
		filter: exercises,
		
		box: filters.box
	};
}


let mapDispatchToProps = (dispatch) => {
  return {
    onClick: (i, item, mode=1) => {
	    const list = store.getState().exercises.list;
	    const sort = store.getState().exercises.sort;
	    
	    let sport = store.getState().exercises.sport;
	    let tipe = store.getState().exercises.tipe;
	    let trainer = store.getState().exercises.trainer;
	    let intensity = store.getState().exercises.intensity;
	    let muscle = store.getState().exercises.muscle;
	    
	    switch(item){
		    case 'SPORT':
		    	sport = store.getState().filters.sport[i].toLowerCase();
		    	break;
		    
		    case 'TYPE':
		    	tipe = store.getState().filters.type[i].toLowerCase();
		    	break;
		    
		    case 'LEAD TRAINER':
		    	trainer = store.getState().trainers.list[i].toLowerCase();
		    	break;
		    	
		    case 'INTENSITY':
		    	if(mode === 1){
			    	intensity.push( i );
		    	}
		    	else{
			    	intensity = intensity.filter(
				    	m =>  (i !== m)
			    	)
			    	
		    	}
		    	
		    	break;
		    
		    case 'MUSCLE GROUP':
		    	if(mode === 1){
			    	muscle.push( i );
		    	}
		    	else{
			    	muscle = muscle.filter(
				    	m =>  (i !== m)
			    	)
			    	
		    	}
		    	
		    	break;
		    
		    default:
		    	break;
	    }
	    
	    dispatch( setExercises( list, sort, sport, tipe, trainer, intensity, muscle) );
    },
    onReset: () => {
	    dispatch( setExercises(store.getState().exercises.list, 1, 'all', 'all', 'all', [], []) );
    },
    onCloseBox: () =>{
	    dispatch(setMobileFilterBox('none'));
    }
  }
}


const ExerciseListFilter = connect(
	mapStateToProps,
	mapDispatchToProps
)(exerciseListFilter);













/*
 * FILTER ON MOBILE
 */
const exerciseFilter = ({filter, onClose, sport, type, leadTrainer, intensity, musclegroups, onClick, slcSport, slcType, slcTrainer, slcIntensity, slcMuscle, onReset, box, onCloseBox}) => {
	return (
		<div className="f2x-myworkout-filter-box mobile" style={{display: box}} onClick={(e) => {onClose(e); onCloseBox();} }>
			<div className="f2x-myworkout-filter" onClick={(e) => e.stopPropagation()}>
				<div className="f2x-filter-top-menu">
					<img src={ICON_CLOSE} alt="Close" onClick={(e) => {onClose(e); onCloseBox();} } width="20" style={{padding: '13px 15px'}} />
					
					<span style={{float: 'right', padding: '13px'}} onClick={() => onReset()}>RESET</span>
				</div>
				
				<div className="f2x-filter-content">
					<ExerciseListShort />
					
					<F2xFilter name='SPORT' list={sport} onClick={onClick} value={slcSport} style={{marginBottom: '15px'}} />
					<F2xFilter name='TYPE' list={type} onClick={onClick} value={slcType} style={{marginBottom: '15px'}} />
					<F2xFilter name='LEAD TRAINER' list={leadTrainer} onClick={onClick} value={slcTrainer} style={{marginBottom: '15px'}} />
					
					<F2xFilter name='INTENSITY' list={intensity} onClick={onClick} button="true" medium="true" value={slcIntensity} className="f2x-filter-intensity" style={{marginBottom: '15px'}} />
					<F2xFilter name='MUSCLE GROUP' list={musclegroups} onClick={onClick} button="true" small="true" value={slcMuscle} style={{marginBottom: '5px'}} />
				</div>
			</div>
		</div>
	)
}




const ExerciseFilter = connect(
	mapStateToProps,
	mapDispatchToProps
)(exerciseFilter);
















/*
 * SETTINGS ON MOBILE (PAGE 1)
 */
const ExerciseSettingsPage1 = ({id, item, onClose, onCloseBox, addWorkout, shareWorkout, change, login}) => {
	if(!item)
		return (<div />);
	
	let exerciseTimeMinutes = ~~(item.duration/60);
		exerciseTimeMinutes = exerciseTimeMinutes < 10 ? '0'+ exerciseTimeMinutes : exerciseTimeMinutes;
		
	let exerciseTimeSeconds = ( item.duration - (60 * ~~(item.duration/60)) );
		exerciseTimeSeconds = exerciseTimeSeconds < 10 ? '0'+ exerciseTimeSeconds : exerciseTimeSeconds;
		
	let exerciseTime = exerciseTimeMinutes +':'+ exerciseTimeSeconds;


	const addExercise = login ? (<li onClick={() => change(id) }><img src={ICON_ADD} alt="Add to an existing workout" width="18" height="18" /> Add to an Existing Workout</li>) : '';
	
	return (
		<div className="f2x-myworkout-filter" onClick={(e) => e.stopPropagation()}>
			
			<div className="filter-image cover-img" style={{backgroundImage: 'url('+ MURL + item.video.poster +')'}} />
				
				<div className="filter-data">
					<b>{item.title}</b>
					<br />
					<span className="small-font">
						{item.trainer.name} | {exerciseTime} min | {item.calories} cal
					</span>
				</div>
				
				<div className="clear" />
				
			<div className="f2x-option-content">
				<ul>
					{addExercise}
					<li onClick={() => shareWorkout(id) }><img src={ICON_SHARE} alt="Share exercise" width="18" height="18" /> Share</li>
				</ul>
				
				<div className="cancelBtn2" onClick={(e) => {onClose(e); onCloseBox();}}>CANCEL</div>
			</div>
		</div>
	)
}







/*
 * SETTINGS ON MOBILE (PAGE 2)
 */
const MyWorkoutList = ({title, onClick}) => (
	<li onClick={onClick}>
		{title}
	</li>
);

class exerciseSettingsPage2 extends Component {
	constructor(props){
		super(props);
		
		this.state = {
			limit: 0,
			search: ''
		}
		
		this.onClick = this.onClick.bind(this);
		this.update = this.update.bind(this);
	}
	
	componentDidMount(){
		this.refs.input.refs.search.focus();
	}
	
	onClick(id){
		const {workouts, select} = this.props;
		
		const newWorkout = workouts.find(x => x.uid === id);
		
		if(newWorkout.exercises.length >= 6){
			this.setState({
				limit: 1
			})
		} else {
			this.setState({
				limit: 0
			});
			
			select(newWorkout.uid);
		}
		
	}
	
	update(){
		this.setState({
			search: this.refs.input.refs.search.value
		})
	}
	
	
	
	render(){
		const {onClose, onCloseBox, workouts} = this.props;
		
		const workoutsList = workouts.filter(x => (x.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 || this.state.search === '' ) );
		
		return (
			<div className="f2x-myworkout-filter" style={{height: 'CALC(100% - 135px)', boxShadow: 'none'}} onClick={(e) => e.stopPropagation()}>
				<div className="f2x-myworkout-titleBar">
					<img src={ICON_X} alt="Close"  onClick={(e) => {onClose(e); onCloseBox();} } />SELECT A WORKOUT
				</div>
				
				<div className="f2x-myworkout-info" style={{opacity: this.state.limit}}>
					You cannot add more than 6
					<br />
					exercises to this workout.
				</div>
				
				<div style={{marginTop: 19}}>
					<F2xInput 	className="f2x-input-long" 
								placeholder="Type the workout name to search"
								style={{padding: 0, width: '100%'}} 
								styleBox={{width: '80%'}} 
								styleSpan={{fontSize: 13}}
								ref="input" 
								refID="search" 
								onChange={ () => this.update() }/>
				</div>
				
				<img src={ICON_SEARCH} alt="Search" className="f2x-myworkout-settings-search" />
				
				<div>
					<ul className="f2x-myworkout-slc">
						{
							workoutsList.map(
								(item, i) =>
									(<MyWorkoutList key={i} title={item.title} onClick={() => this.onClick(item.uid)} />)
							)
						}
					</ul>
				</div>
			</div>
		)
	}
}

mapStateToProps = (state) => {
	const {list} = state.myworkouts;
	
	return {
		workouts: list
	}
}

const ExerciseSettingsPage2 = connect(
	mapStateToProps
)(exerciseSettingsPage2);












class exerciseSettingsPage3 extends Component {
	constructor(props){
		super(props);
		
		this.state = {
			page: 1
		}
		
		this.finishAdd = this.finishAdd.bind(this);
		this.clickFinish = this.clickFinish.bind(this);
	}
	
	finishAdd() {
		const {workout, exercise, workouts, exercises} = this.props;
		
				
		let workoutsI = workouts.find(x => x.uid === workout);
		const exercise1 = exercises.find(x => x.uid === exercise);
		
		workoutsI.exercises.push(exercise1);
		
		updateSpecificWorkoutRequest(
			workoutsI, 
			() => {
				getFX2DB( 
					F2xDB['workoutsUser'], 
					() => { 
						console.log("Full Data correctly updated")
						store.dispatch( setMyWorkouts(F2xDB['workoutsUser'].data.results, 2) ); 
						
						this.setState({
							page: 2
						})
						//
					}
				);
			}
		)
	}
	
	clickFinish(e){
		const {workout, workouts, onCloseBox} = this.props;
		
		onCloseBox();
		
		let workoutsI = workouts.find(x => x.uid === workout);
		
		browserHistory.push("/myworkout/"+ workoutsI.uid);
	}
	
	render() {
		const {workout, exercise, workouts, exercises, onClose, onCloseBox} = this.props;
		
		const newWorkout = workouts.find(x => x.uid === workout);
		const newExercise = exercises.find(x => x.uid === exercise);
		
		
		let renderPage = '';
		
		switch(this.state.page){
			case 1:
				renderPage = (
					<div>
						<div className="f2x-modal-title">ADD TO WORKOUT</div>
							
						<div className="small-font separated" style={{fontSize: '12px', width: '90%', margin: '40px auto 0 auto'}}>
							Are you sure you want to add "{newExercise.title}" to "{newWorkout.title}"?
						</div>
						
						
						<div style={{marginTop: '40px'}}>
							<F2xButton 	name="YES" 
										className={`f2x-new-button-black small-font separated`} 
										style={{padding: '13px 60px', fontSize: '12px'}}
										onClick={ () => this.finishAdd()} />
						</div>
						
						
						<div className="footer-link-sign small-font" style={{marginTop: '15px'}}>
							<span onClick={(e) => {onClose(e); onCloseBox();} } style={{textDecoration: 'underline', cursor: 'pointer', color: '#222'}}>
								CANCEL
							</span>
						</div>
					</div>
				)
				break;
			
			case 2:
				renderPage = (
					<div>
						<div>
							<div className="f2x-modal-title">WORKOUT SAVED</div>
								
							<div className="small-font separated" style={{fontSize: '12px', width: '90%', margin: '40px auto 0 auto'}}>
								Changes to "{newWorkout.title}" have been saved.											</div>
							
							
							<div style={{marginTop: '40px'}}>
								<F2xButton 	name="OK" 
											className={`f2x-new-button-black small-font separated`} 
											style={{padding: '13px 60px', fontSize: '12px'}}
											onClick={(e) => this.clickFinish(e)} />
							</div>
						</div>
					</div>
				);
				break;
				
			default:
				break;
		}
		
		return (
			<div className="f2x-accept-message" onClick={(e) => {e.preventDefault(); e.stopPropagation();}}>
				{renderPage}
			</div>
		);
	}
}

mapStateToProps = (state) => {
	 const {myworkouts, exercises} = state;
	 
	 return {
		 workouts: myworkouts.list,
		 exercises: exercises.list
	 }
}

const ExerciseSettingsPage3 = connect(
	mapStateToProps
)(exerciseSettingsPage3);






/*
 * SETTINGS ON MOBILE
 */
class exerciseSettings extends Component {
	constructor(props){
		super(props);
		
		this.state = {
			page: 1,
			id: false,
			workout: false
		}
		
		this.changePage = this.changePage.bind(this);
		this.selectWorkout = this.selectWorkout.bind(this);
	}
	
	changePage(id){
		this.setState({
			page: 2,
			id: id
		})
	}
	
	componentWillReceiveProps(nextProps){
		if(nextProps.status === 'none'){
			this.setState({
				page: 1,
				id: false,
				workout: false
			})
		}
	}
	
	selectWorkout(id){
		this.setState({
			page: 3,
			workout: id
		})
	}
	
	render(){
		const {id, item, status, onClose, onCloseBox, addWorkout, shareWorkout, login} = this.props;
		
		let pageRender = '';
		
		switch(this.state.page){
			case 1: 
				pageRender = (<ExerciseSettingsPage1 login={login} change={this.changePage} id={id} item={item} status={status} onClose={onClose} onCloseBox={onCloseBox} addWorkout={addWorkout} shareWorkout={shareWorkout} />);
				break;
			
			case 2:
				pageRender = (<ExerciseSettingsPage2 onClose={onClose} onCloseBox={onCloseBox} select={this.selectWorkout} />);
				break;
			
			case 3:
				pageRender = (<ExerciseSettingsPage3 onClose={onClose} onCloseBox={onCloseBox} exercise={id} workout={this.state.workout} />);
				break;
			
			default:
				break;
		}
		
		return (
			<div className="f2x-myworkout-filter-box mobile" style={{display: status}} onClick={(e) => {onClose(e); onCloseBox();}} >
				{pageRender}
			</div>
		);
	}
}


mapStateToProps = (state) => {
	const {id, status} = state.filters.options;
	const {exercises, user} = state;
	
	const newItem = exercises.list.find( x => x.uid === id);
	
	return {
		id: id,
		status: status,
		item: newItem,
		login: user.login
	}
}

mapDispatchToProps = (dispatch) => {
  return {
	addWorkout: (uid) => {
		dispatch(setVisibilityModal(ModalVisibilityFilters.SHOW, ModalTypes['WORKOUT_SELECT'], uid));
	},
	
	shareWorkout: (uid) => {
		dispatch(setVisibilityModal(ModalVisibilityFilters.SHOW, ModalTypes['EXERCISE_SHARE'], uid));
	},
	
    onCloseBox: () =>{
	    dispatch(setMobileOptionBox(false, 'none'));
    }
  }
}

const ExerciseSettings = connect(
	mapStateToProps,
	mapDispatchToProps
)(exerciseSettings);













/*
 * LIST
 */
class exerciseList extends Component {
	constructor(props){
		super(props);
		
		this.state = {
			inter: false
		}
		
		this.onExerciseScroll = this.onExerciseScroll.bind(this);
	}
	
	componentWillMount(){
		const { params } = this.props;
		const { list } = this.props;
		
		if(params.pathParam)
			store.dispatch( setVisibilityModal( ModalVisibilityFilters.HIDE ) );
			
		if (params.pathParam && list.length > 0) {
			
			if (this.lastViewed !== params.pathParam) {
				let item = list.find( x => x.uid === params.pathParam)
				
				if(item){					
					document.querySelector("meta[property='og:title']").setAttribute('content', item.title);
					document.querySelector("meta[property='og:image']").setAttribute('content', MURL + item.video.poster);
					document.querySelector("meta[property='og:site_name']").setAttribute('content', 'F2X');
					document.querySelector("meta[property='og:description']").setAttribute('content', item.description);
				
					store.dispatch( setVisibilityVideo(ModalVisibilityFilters.SHOW, VideoTypes.EXERCISES, item.video, item.uid) );
					store.dispatch( setVisibilityModal( ModalVisibilityFilters.HIDE ) );
				}
				
			}
			
			this.lastViewed = params.pathParam
		}	
			
	}

	

	componentDidMount(){
		const { params } = this.props;
		
		window['Ps'].initialize(this.refs.list);
		if(params.pathParam)
			store.dispatch( setVisibilityModal( ModalVisibilityFilters.HIDE ) );
	}

	
	componentWillReceiveProps(nextProps){
		const { params } = nextProps;
		const { list } = nextProps;
		if (params.pathParam && list.length > 0) {	
			if (this.lastViewed !== params.pathParam) {
				let item = list.find( x => x.uid === params.pathParam)
				
				
				if (item){
					document.querySelector("meta[property='og:title']").setAttribute('content', item.title);
					document.querySelector("meta[property='og:image']").setAttribute('content', MURL + item.video.poster);
					document.querySelector("meta[property='og:site_name']").setAttribute('content', 'F2X');
					document.querySelector("meta[property='og:description']").setAttribute('content', item.description);
				
				
					store.dispatch( setVisibilityVideo(ModalVisibilityFilters.SHOW, VideoTypes.EXERCISES, item.video, item.uid) );
					store.dispatch( setVisibilityModal( ModalVisibilityFilters.HIDE ) );
				}
				
			}
			this.lastViewed = params.pathParam
		}	
			
	}
	
	onExerciseScroll() {
		if(!this.state.inter){
			this.setState({
				inter: setTimeout(
					() => {
						document.querySelector('.f2x-configure-label').style.opacity = 0;
						
						setTimeout(() => document.querySelector('.f2x-configure-label').style.display = 'none', 200);
					}
					, 2500
				)
			})
		}
	}
	
	
	render(){	
		const { list } = this.props;
		
		return (
			<div className="f2x-exercise-list">
				<F2xExerciseCustomWorkout />
			
			
				<div style={{position: 'relative'}}>
					<div className="f2x-exercise-list-title">
						<span className="f2x-section-title">EXERCISES</span>
						
						<ExerciseListShort />
						
						<div className="clear" />
					</div>
					
					<div ref="list" onScroll={this.onExerciseScroll} className="f2x-exercise-items" style={{height: (innerHeight - (isMobile() ? 142 : 325)  ) +'px', minHeight: (isMobile() ? 'auto' : '575px'), overflow: 'auto'}}>
						{
							list.map(
								(item) =>
									<F2xExercise key={item.uid} item={item} />
							)
						}
					</div>
				</div>
			</div>
		)
	}
}

function getVisibleMovies(sport, tipe, trainer, intensity, muscle, sorting, order, list) {
	return list
		.filter(
			m => {
				
				let muscleStatus = false;
				//let muscleStatus1 = true;				// OPTIONAL
				m.muscle_groups.map(
					(item) => {
						if(muscle.indexOf(item) !== -1)
							muscleStatus = true;
						//else							// OPTIONAL
						//	muscleStatus1 = false;		// OPTIONAL
						
						return '';

					}
				)
				
				return (
					(sport === 'all' || sport === m.sport.toLowerCase()) &&
					(tipe === 'all' || tipe === m.type.toLowerCase()) &&
					(trainer === 'all' || trainer === m.trainer.name.toLowerCase()) &&
					(!intensity.length || intensity.indexOf(m.intensity) !== -1) &&
					(!muscle.length || muscleStatus ) 
					//(!muscle.length || (muscleStatus && muscleStatus1) ) 
				);										// OPTIONAL ^
			}
		)
		.sort(
			(a, b) => {
				if(sorting === 'name'){
					a = a.trainer
					b = b.trainer
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


mapStateToProps = (state) => {
	const { exercises, updateWorkout } = state;
	
	let sort = 'popularity';
	let order = -1;
	
	switch(exercises.sort){
		case 1:
			break;
			
		case 2:
			sort = 'uid';
			order = 1;
			break;
			
		case 3:
			sort = 'uid';
			order = -1;
			break;
			
		case 4:
			sort = 'title';
			order = 1;
			break;
			
		case 5:
			sort = 'title';
			order = -1;
			break;
			
		default:
			break;
	}
	
	const newList = getVisibleMovies(exercises.sport, exercises.tipe, exercises.trainer, exercises.intensity, exercises.muscle, sort, order, exercises.list);
	
	const newExeriseList = newList.filter(x => !updateWorkout.exercises.find( y => x.uid === y.uid));
	
	
	return {
		list: newExeriseList
	};
}


const ExerciseList = connect(
	mapStateToProps,
	null
)(exerciseList);













/*
 * CONTAINER
 */

class F2xExerciseList extends Component {
	constructor(props){
		super(props);
		
		this.state = {
			filter: 'none'
		}
		
		this.onFilter = this.onFilter.bind(this);
	}
	
	onFilter(e){
		e.stopPropagation();
	}
	
	render(){
		const {params} = this.props;
		 
		return (
			<div className="f2x-exercise-l">
				<ExerciseListFilter />
				
				<ExerciseList params={params}/>
				
				<ExerciseFilter onClose={this.onFilter} filter={this.state.filter} />
				<ExerciseSettings onClose={this.onFilter} />
			</div>
		)
	}
}



export default F2xExerciseList;
