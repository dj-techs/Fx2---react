import React, { Component } from 'react';
import { connect } from 'react-redux'




/*
 * Global Vars & Functions
 */
import { setTitleMobile } from '../actions';
import { store } from '../.';
import { MURL, isMobile } from '../data/data';




/*
 * Components
 */
import F2xCircularWorkout from '../components/F2xCircularWorkout';
import F2xVideoList from '../components/F2xVideoList';





/*
 * Style
 */
import './F2xView.css';









const WorkoutList = (props) => (
	<div>
		<div className="f2x-trainer-workout">
			{
				props.wo.map(
					(item, i) => 
						(
							<F2xCircularWorkout
								key={item.uid}
								mstyle={ {backgroundImage:'url('+ MURL + '/' + item.exercises[0].video.poster + ')'} } 
								params={ item } 
								onClick={ props.onClick }
								mode="true"
							/>
						)
				)
			}
		</div>
	</div>
);


const f2xWorkout = ({list, hiddeUID}) => (
	<WorkoutList wo={ list } onClick={( id, mode ) => {} }/>
)

const mapStateToProps = (state, props) => {
	const workout = state.workouts.list || [];
	const hiddeUID = props.hiddeUID;
	const creator = props.creator;
	
	const newWorkout = workout.slice(0)
							  .filter(x => x.uid !== hiddeUID && x.exercises[0].trainer.name === creator)
							  .slice(0, 5);
	
	return {
		list: newWorkout
	};
}

const F2xWorkout = connect(
	mapStateToProps, 
	null 
)(f2xWorkout) 
	
	







class f2xView extends Component {
	componentWillMount() {
		store.dispatch( setTitleMobile('PRECONFIGURED') );
	}
	
	componentDidMount(){
		if(isMobile())
			document.getElementById('f2x-header').style.opacity = '0';
	}
	
	componentWillUnmount(){
		document.getElementById('f2x-header').style.opacity = '1';
	}
	
	render() {
		const workout = this.props.workout;
		const uid = this.props.params.pathParam;
		
		var result = workout.filter(
			(v) => v.uid === uid	// Filter out the appropriate one
		); 
		
		
		if(result[0] === undefined)
			return (< div/>);
			
			
			
		const workout_data = result[0];
		console.log(workout_data);
		
		return (
			<div className="f2x-view">
				<div className="float-l">
					<F2xVideoList item={workout_data} noCreated={true} noCounter={true} />
				</div>
				
				
				
				<div className="float-r pc">
					<div className="f2x-trainer-photo cover-img" style={{backgroundImage: 'url('+ MURL + workout_data.exercises[0].trainer.photo +')'}} />
						
					<div className="f2x-trainer-info">
						<div className="f2x-creator-name-2 small-font montse_light">{workout_data.exercises[0].trainer.name}</div>
						<div className="f2x-creator-info small-font separated montse_light">
							{workout_data.exercises[0].trainer.story}
						</div>
					</div>
				</div>
				
				
				<div className="clear hr pc" />
				
				<div className="f2x-related-title">
					RELATED WORKOUTS
				</div>
				
				<F2xWorkout hiddeUID={uid} creator={workout_data.exercises[0].trainer.name} />
			</div>
		)
	}
}

const mapStateToProps3 = (state) => {
	const { workouts } = state;
	
	return {
		workout: workouts.list
	};
}

const F2xView = connect(
	mapStateToProps3
)(f2xView);



export default F2xView;