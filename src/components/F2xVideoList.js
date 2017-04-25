import React, { Component } from 'react';
import { connect } from 'react-redux';








/*
 * Global Vars & Functions
 */
import { setVisibilityModal, ModalVisibilityFilters, ModalTypes } from '../actions/'
import { MURL, isMobile, goBack } from '../data/data';
import { openWorkout, resetWorkout } from '../data/workout_tools';



/*
 * Components
 */
import F2xVideo from './F2xVideo';
import F2xButton from './F2xButton';
import F2xIcon from './F2xIcon';



/*
 * Style
 */
import './F2xVideoList.css';



/*
 * Icons
 */
import ICON_REMOVE from '../media/Icon_Close.svg';
import ICON_SHARE from '../media/paperclip_icon.svg';
import ICON_SETTINGS from '../media/icon_settings.svg';
import ICON_EDIT from '../media/Icon_Edit.svg';









const MuscleLabel = (props) => (
	<div className="f2x-muscle-labels">
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






class EditButton extends Component {
	render(){
		const { itemID } = this.props;
		return (
			<F2xButton name="EDIT" className="f2x-new-button-black-invert" style={{height: '32px', width: '80px', fontSize: '11px'}} onClick={ () => { openWorkout(itemID) } }/>
		);
	}
}

//const EditButton = connect()(editButton);


const shareButton = ( {dispatch, uid} ) => (
	<F2xButton name="SHARE" className="f2x-new-button-black-invert" style={{height: '32px', width: '80px', fontSize: '11px'}} onClick={ () => dispatch( setVisibilityModal(ModalVisibilityFilters.SHOW, ModalTypes.WORKOUT_SHARE, uid)) } />
);

const ShareButton = connect()(shareButton);


const removeButton = ( {dispatch, itemID } ) => (
	<F2xButton name="DELETE" className="f2x-new-button-black-invert" style={{height: '32px', width: '80px', fontSize: '11px'}} onClick={ () => dispatch( setVisibilityModal(ModalVisibilityFilters.SHOW, ModalTypes.WORKOUT_REMOVE, itemID)) } />
);

const RemoveButton = connect()(removeButton);






const ExerciseImgLabel = ({name, style}) => (
	<button className="f2x-video-labels montse_light" style={style}>
		{name}
	</button>
)

const ExerciseImgLabelMap = ({list}) => (
	<div>
		{
			list.map(
				(item, i) => {
					if(i < 2)
						return (<ExerciseImgLabel key={i} name={item} />)
					else
						return ''
				}
			)
		}
	</div>
)





const VideoListItem = ({item, active, onClick, view}) => {
	let exerciseTimeMinutes = ~~(item.duration/60);
		exerciseTimeMinutes = exerciseTimeMinutes < 10 ? '0'+ exerciseTimeMinutes : exerciseTimeMinutes;
		
	let exerciseTimeSeconds = ( item.duration - (60 * ~~(item.duration/60)) );
		exerciseTimeSeconds = exerciseTimeSeconds < 10 ? '0'+ exerciseTimeSeconds : exerciseTimeSeconds;
		
	let exerciseTime = exerciseTimeMinutes +':'+ exerciseTimeSeconds;
	
		
	return (
		<div className={`f2x-videos-item cursor${active}${view}`} onClick={onClick}>
			<div className="f2x-videos-item-image">
				<div className="f2x-videos-item-image cover-img" style={{backgroundImage: 'url('+ MURL + item.video.poster +')'}} />
			</div>
			
			<div className="f2x-video-item-info">
				<div className="f2x-exercise-name">{item.title}</div>
				
				<div className="f2x-exercise-trainer small-font">
					<u>{item.trainer.name}</u>
				</div>
				
				<div className="f2x-exercise-info small-font">
					{exerciseTime} | {item.calories} cal
				</div>
				
				<div className="f2x-exercise-grouped small-font">
					Muscle Group:
					<br />
					<ExerciseImgLabelMap list={item.muscle_groups} />
				</div>
				
				<div className="f2x-exercise-grouped small-font">
					Intensity:
					<br />
					<ExerciseImgLabel name={item.intensity} style={{margin: '0', width: '22px'}} />
				</div>
			</div>
		</div>
	)
}

class VideoList extends Component {
	componentDidMount(){
		//window['Ps'].initialize(this.refs.slider, {suppressScrollY: true});
	}
		
	render(){
		const {list, id, onClick, views} = this.props;
		
		return(
			<div className="f2x-videos-item-slider" ref="slider">
				{
					list.map(
						(item, i) =>
							<VideoListItem key={i} item={item} active={id === i ? ' active' : ''} view={views.indexOf(i) !== -1 ? ' view' : ''} onClick={() => onClick(i)} />
					)
				}
			</div>
		)
	}
}




const workoutFilter = ({dispatch, filter, item, onClick, my, slc}) => {
	let exerciseTimeMinutes = ~~(item.duration/60);
		exerciseTimeMinutes = exerciseTimeMinutes < 10 ? '0'+ exerciseTimeMinutes : exerciseTimeMinutes;
		
	let exerciseTimeSeconds = ( item.duration - (60 * ~~(item.duration/60)) );
		exerciseTimeSeconds = exerciseTimeSeconds < 10 ? '0'+ exerciseTimeSeconds : exerciseTimeSeconds;
		
	let exerciseTime = exerciseTimeMinutes +':'+ exerciseTimeSeconds;
	
	const editBtn = my === 'true' ? (<li onClick={() => openWorkout(item)}><F2xIcon icon={ICON_EDIT} style={{width: '20px', height: '20px', float: 'left', marginRight: '15px'}} /> EDIT</li>) : '';
	const removeBtn = my === 'true' ? (<li onClick={(e) => {onClick(e); dispatch( setVisibilityModal(ModalVisibilityFilters.SHOW, ModalTypes.WORKOUT_REMOVE, item))} }><F2xIcon icon={ICON_REMOVE} style={{width: '20px', height: '20px', float: 'left', marginRight: '15px'}} /> REMOVE</li>) : '';
	
	if(item === '')
		return (<div />);
	else
		return (
			<div className="f2x-myworkout-filter-box mobile" onClick={(e) => onClick(e)} style={{display: filter}}>
				<div className="f2x-myworkout-filter" onClick={(e) => e.stopPropagation()}>
					<div className="filter-image cover-img" style={{backgroundImage: 'url('+ MURL + item.exercises[slc].video.poster +')'}} />
					
					<div className="filter-data">
						<b>{item.title}</b>
						<br />
						<span className="small-font separated">
							{exerciseTime} min | {item.calories} cal
						</span>
					</div>
					
					<div className="clear" />
					
					<ul>
						{editBtn}
						<li onClick={() => dispatch( setVisibilityModal(ModalVisibilityFilters.SHOW, ModalTypes.WORKOUT_SHARE, item.uid)) }><F2xIcon icon={ICON_SHARE} style={{width: '20px', height: '20px', float: 'left', marginRight: '15px'}} /> SHARE</li>
						{removeBtn}
					</ul>
					
					<div className="cancelBtn" onClick={(e) => onClick(e)}>
						CANCEL
					</div>
				</div>
			</div>
		)
}



const WorkoutFilter = connect()(workoutFilter);






class F2xVideoList extends Component {
	constructor(props){
		super(props);
		
		this.state = {
			id: 0,
			more: 'none',
			text: 'show details +',
			views: [0],
			autoPlay: 'false',
			filter: 'none',
			item: ''
		}
		
		
		this.toggle = this.toggle.bind(this);
		this.nextVideo = this.nextVideo.bind(this);
		this.changeVideo = this.changeVideo.bind(this);
		this.playVideo = this.playVideo.bind(this);
		this.onFilter = this.onFilter.bind( this );
	}
	
	
	componentWillMount(){
		resetWorkout();
	}
	
	componentDidMount(){
		const {mode} = this.props;
		
		if(mode === 'open'){
			this.setState({
				more: 'block',
				text: 'hide details -'
			})
		}
		
		if(isMobile())
			this.setState({
				more: 'block'
			})
	}
	
	toggle(){
		const { more } = this.state;
		
		this.setState({
			more: more === 'none' ? 'block' : 'none',
			text: more === 'none' ? 'hide details -' : 'show details +'
		})
	}
	
	
	nextVideo(){
		const { item } = this.props;
		const { id } = this.state;
		let { views } = this.state;
		
		const nextId = (id+1 < item.exercises.length ? id+1 : id);
		
		views.push(nextId);
		
		this.setState({
			id: nextId,
			views: views
		})
	}
	
	changeVideo(id){
		let { views } = this.state;
		
		views.push(id);
		
		this.setState({
			id: id,
			views: views
		})
	}
	
	playVideo(){
		this.setState({
			autoPlay: 'true'
		})
	}
	
	onFilter(e, item=''){
		e.stopPropagation();
		
		const { filter } = this.state;
		
		this.setState({
			filter: (filter === 'none' ? 'block' : 'none'),
			item: item
		})
	}
	
	render() {
		const { item, complete, my } = this.props;
		
		
		let timeAgo = '';
		
		let dateNow		= new Date();
		let dateWorkout = new Date(item.date_added);
		
		
		let dateTime = ( (dateNow - dateWorkout)/1000/60/60/24 ).toFixed(0);
		
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
		
		
		let exerciseTimeMinutes = ~~(item.duration/60);
			exerciseTimeMinutes = exerciseTimeMinutes < 10 ? '0'+ exerciseTimeMinutes : exerciseTimeMinutes;
			
		let exerciseTimeSeconds = ( item.duration - (60 * ~~(item.duration/60)) );
			exerciseTimeSeconds = exerciseTimeSeconds < 10 ? '0'+ exerciseTimeSeconds : exerciseTimeSeconds;
			
		let exerciseTime = exerciseTimeMinutes +':'+ exerciseTimeSeconds;
		
		
		const video = item.exercises[this.state.id].video;
		
		const buttonsEdit = complete ? (<EditButton itemID={item}/>) : '';
		const buttonsRemove = complete ? (<RemoveButton  itemID={item}/>) : '';
		
		return (
			<div className="f2x-vList">
				<div className="f2x-video">
					<F2xVideo workoutID={item.uid} datas={item.exercises[this.state.id]} url={video.urls['720p']} poster={video.poster} nextVideo={() => this.nextVideo()} play={() => this.playVideo()} last={item.exercises.length === this.state.id+1} autoPlay={this.state.autoPlay} />
					
					<div className="f2x-video-goBack mobile" style={{backgroundImage: 'url('+ ICON_REMOVE +')'}} onClick={() => goBack()} />
					
					
					<div className="f2x-video-show-list small-font">
						<div className="f2x-video-show-list-items" style={{display: this.state.more}}>
							<VideoList list={item.exercises} id={this.state.id} onClick={this.changeVideo} views={this.state.views} />
						</div>
						
						<div className={`cursor f2x-show-more pc${this.state.more === 'block' ? ' f2x-list-shadow' : ''}`} onClick={() => this.toggle()}>{this.state.text}</div>
					</div>
					
					
					<div className="f2x-video-title">
						{item.title} { buttonsRemove } <ShareButton uid={item.uid} /> { buttonsEdit }  <img src={ICON_SETTINGS} alt="Settings" className="mobile" style={{float: 'right', padding: '5px 12px'}} height="14" onClick={(e) => this.onFilter(e, item)} />
					</div>
					
					<div className="f2x-video-info small-font montse_light">
						{timeAgo}  |  {exerciseTime} min  |  {item.calories} cal
					</div>
					
					<div className="f2x-video-labels montse_light">
						<div className="f2x-repo-counter" style={{display: this.props.noCounter ? 'none' : 'block'}}>
							11 Plays
						</div>
						Muscle Group: <span className="small-font"><MuscleLabelList list={item.exercises[this.state.id].muscle_groups} /></span>
					</div>
					
					
					<div className="f2x-video-userdata" style={{display: this.props.noCreated ? 'none' : 'block'}}>
						<div className="f2x-createdBy">Created By:</div>
						<div className="avatImg cover-img" style={{backgroundImage: 'url('+ MURL + item.creator.avatar +')'}} /> {item.creator.name}
						
						<div className="clear"></div>
					</div>
					
					
					<div className="f2x-video-labels montse_light" style={{marginBottom: '18px'}}>
						<span className="f2x-wardrope small-font">Wardrobe Provided By:</span> <span className="small-font">{item.exercises[this.state.id].wardrobe.map( (item, i) => (i !== 0 ? ', ' : '') +item )}</span>
					</div>
					
				</div>
				
				<WorkoutFilter onClick={this.onFilter} filter={this.state.filter} item={this.state.item} my={my} slc={this.state.id} />
			</div>
		)
	}
}



export default F2xVideoList ;