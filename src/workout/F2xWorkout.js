import React, { Component } from 'react';
import { connect } from 'react-redux'




/*
 * Global Vars & Functions
 */
import { setWorkouts, setTitleMobile, setMobileFilter, setMobileFilterBox } from '../actions'
import { MURL, isMobile } from '../data/data';
import { store } from '../.';




/*
 * Style
 */ 
import './F2xWorkout.css';


/*
 * Components
 */ 
import F2xCircularWorkout from '../components/F2xCircularWorkout';
import F2xItemList from '../components/F2xItemList';
import F2xShort from '../components/F2xShort';
import F2xFilter from '../components/F2xFilter';



/*
 * Icons
 */
import ICON_CLOSE from '../media/Icon_Close.svg';


//getFX2DB( F2xDB['workoutsPublic'] ,"Workout");






const NoGroupItems = ({list, creator}) => {
	const name = creator.toLowerCase() === 'all' ? false : true;
	
	return (
		<div>
			{
				name ? (<div className="f2x-creator-name" id="f2x-creator-name">
							CREATOR: {creator}
						</div>) : ''
			}
			
			<div className="f2x-preconfigure-workout-list" style={{paddingTop: name ? 60 : 20}}>
				{
					list.map(
						(item, i) => (
							<F2xCircularWorkout
								key={item.uid}
								mstyle={ {backgroundImage:'url('+ MURL + '/' + item.exercises[0].video.poster + ')'} } 
								params={ item } 
								onClick={ () =>{} }
								noName={name}
							/>
						)
					)
				}
			</div>
		</div>
	)
}






const GroupItems = ({list}) => {
	let trainers = [];
	
	list.map(
		(item) =>{
			if(trainers.indexOf(item.exercises[0].trainer.name) === -1)
				trainers.push( item.exercises[0].trainer.name )
				
			return undefined;
		}
	)
	
	
	return(
		<div>
		{
			trainers.map(
				(item, i) => {
					const trainerImg = list.filter(w => w.exercises[0].trainer.name === item)[0].exercises[0].trainer.photo;
					
					return (
						<div className="f2x-workout-group" key={i}>
							<div>
								<div style={{backgroundImage: 'url('+ MURL + trainerImg +')', width: '35px', height: '35px', borderRadius: '50%', float: 'left', margin: '-8px 8px 0 0'}} className="cover-img"  /> {item}
								<div className="clear" />
							</div>
							

							<F2xItemList
								wo={ list.filter(w => w.exercises[0].trainer.name === item) } 
								noName="true"
								onClick={
									( id, mode ) => 
										console.log(id, mode) 
								}
							/>
						</div>
					)
				}
			)
		}
		</div>
	)
}








const workout = ({list, sort, creator}) => {
	
	if(sort === 1 || sort === 2 || sort === 3 || isMobile()){
		return (<NoGroupItems list={list} creator={creator} />)
	}
	else{
		return (<GroupItems list={list} />)
	}
}


function getVisibleList(sorting, order, list, creator) {
	return list
		.filter(
			x =>
				(
					(creator.toLowerCase() === 'all' || creator.toLowerCase() === x.creator.name.toLowerCase())
				)
		)
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

let mapStateToProps = (state, props) => {
	const { workouts } = state;
	const {creator} = props;
	
	
	let sort = 'popularity';
	let order = -1;
	
	switch(workouts.sort){
		case 1:
			break;
			
		case 2:
			sort = 'date_added';
			order = 1;
			break;
			
		case 3:
			sort = 'date_added';
			order = -1;
			break;
			
		case 4:
			sort = 'name';
			order = 1;
			break;
			
		case 5:
			sort = 'name';
			order = -1;
			break;
			
		default:
			break;
	}
	
	return {
		list: getVisibleList(sort, order, workouts.list, creator),
		sort: workouts.sort
	};
}


const Workout = connect(
	mapStateToProps, 
	null 
)(workout) 
	
	
	











//
// ******* WORKOUT TITLE Y SORT
//
//

const dropOptons = [
	'Most Popular',
	'Newest to Oldest',
	'Oldest to Newest',
	'Creator’s Name, A-Z',
	'Creator’s Name, Z-A'
];

const dropOptonsMobile = [
	'Most Popular',
	'Newest to Oldest',
	'Oldest to Newest',
	'Alphabetically, A-Z',
	'Alphabetically, Z-A'
];

const dropOptonsList = isMobile() ? dropOptonsMobile : dropOptons;


const workoutListShort = ({sort, dispatch, style}) => (
	<F2xShort 
		style={style} 
		selectStyle={{width: '172px', marginTop: '-5px'}} 
		value={sort}
		list={dropOptonsList} 
		onClick={
			(i) => dispatch( 
						setWorkouts( 
							store.getState().workouts.list, 
							i+1
						) 
					)
		} 
	/>
)


mapStateToProps = (state) => {
	const { workouts } = state;
	
	return {
		sort: (workouts.sort-1)
	};
}

const WorkoutListShort = connect(
	mapStateToProps
)(workoutListShort);


const WorkoutTitle = () => (
	<div className="f2x-workout-title">
		
		<WorkoutListShort style={{float: 'right', marginRight: '1px'}} />
		
		<div className="clear" />
	</div>
)





const workoutSortList = ({onClick, filter, list, slc, onChange}) => {
	return (
		<div className="f2x-myworkout-filter-box mobile" onClick={(e) => onClick(e)} style={{display: filter}}>
			<div className="f2x-myworkout-filter" onClick={(e) => e.stopPropagation()}>
				<div className="f2x-filter-top-menu">
					<img src={ICON_CLOSE} alt="Close" className="f2x-filter-close-btn" onClick={(e) => onClick(e)} />
				</div>
				
				<div className="f2x-filter-content" style={{paddingBottom: 170}}>
					<div className="f2x-exercise-sort">
						<WorkoutListShort />
					</div>
					
					
					<F2xFilter name='CREATOR' list={list} onClick={(id) => onChange(id)} value={slc} style={{marginBottom: '15px'}} />
				
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





//
// ******* WORKOUT CONTAINER
//
//
class f2xWorkout extends Component {
	constructor(props){
		super(props);
		
		this.state = {
			slc: 0
		}
		
		this.onChange = this.onChange.bind(this);
	}
	
	componentWillMount() {
		store.dispatch( setTitleMobile('PRECONFIGURED') );
		
		if(isMobile()){
			store.dispatch( setMobileFilter('block') );
		}
	}
	
	componentWillUnmount(){
		store.dispatch( setMobileFilter('none') );
	}
	
	
	onChange(id){
		this.setState({
			slc: id
		})
	}
	
	render() {
		const {box, creatorList} = this.props;
		
		const creatorFilter = creatorList[this.state.slc];
		
		return (
			<div className="f2x-preconfigure-workout">
				<WorkoutTitle />
				
				<Workout creator={creatorFilter} />
				
				<WorkoutSortList filter={box} list={creatorList} slc={this.state.slc} onChange={this.onChange} />
			</div>
		)
	}
}


mapStateToProps = (state) => {
	const {box} = state.filters;
	const {list} = state.workouts;
	
	let creators = ['All'];
	
	list.map(
		(item) => creators.push(item.creator.name)
	)
	
	creators = creators.unique();
	
	return {
		box: box,
		creatorList: creators
	}
}


const F2xWorkout = connect(
	mapStateToProps
)(f2xWorkout);

export default F2xWorkout;
