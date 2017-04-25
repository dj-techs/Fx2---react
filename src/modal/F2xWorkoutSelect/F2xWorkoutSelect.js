import React, { Component } from 'react';
import { browserHistory } from 'react-router';




/*
 * Globals Vars & Functions
 */
import { addIfUnique } from '../../data/utils';
import { updateSpecificWorkoutRequest, F2xDB, getFX2DB } from '../../data/data';
import { setMyWorkouts, setVisibilityModal, ModalVisibilityFilters } from '../../actions';
import { store } from '../../';



/*
 * Redux
 */
import { connect } from 'react-redux'



/*
 * Components
 */
import F2xInput from '../../components/F2xInput';
import F2xList from '../../components/F2xList';
import F2xButton from '../../components/F2xButton';



/*
 * Style
 */
import './F2xWorkoutSelect.css';



/*
 * Icons
 */
import search_icon from '../../media/search-icon.svg';






class ModalPart1 extends Component {
	render() {
		const {state, update, onSelect, workouts} = this.props;
		
		return (
			<div style={{height:"400px"}}>
				<div className="f2x-modal-title" style={{paddingTop: '0px'}}>SELECT A WORKOUT</div>
				
				<div className={`f2x-woe-error-msg ${ state.amount < 5 ? 'hidden':'' }`}>You cannot add more than 6<br/> Exercises to this Workout</div>
				
				
				<div style={{marginTop: '78px', marginBottom: '10px'}}>
					<div>
						<F2xInput ref="search" 
								refID='box' 
								className="f2x-input-long" 
								styleBox={{width: '300px !important'}} placeholder="Type the workout name to search" icon={search_icon} 
							onChange={ (e) => { update(e) } }/>
					</div>
				</div>
				
				
				<div style={{marginBottom: '20px'}}>
					<F2xList list={workouts} onClick={ (e, i) => onSelect(e, i) }/>
				</div>
			</div>
		)
	}
}


class ModalPart2 extends Component {
	render() {
		const {dispatch, finish, exercise, workout} = this.props;
		
		return (
			<div>
				<div className="f2x-modal-title" style={{paddingTop: '0px'}}>ADD TO WORKOUT</div>
				
				<div className="small-font separated" style={{fontSize: '14px', width: '350px', margin: '40px auto 0 auto'}}>
					Are you sure you want to add "{exercise}" to "{workout}"?
				</div>
				
				
				<div style={{marginTop: '55px'}}>
					<F2xButton 	name="YES" 
								className={`f2x-new-button-black small-font separated`} 
								style={{height: '52px', width: '188px', fontSize: '12px'}}
								onClick={ () => finish()} />
				</div>
				
				
				<div className="footer-link-sign small-font" style={{marginTop: '15px'}}>
					<span onClick={() => dispatch( setVisibilityModal(ModalVisibilityFilters.HIDE) ) } style={{textDecoration: 'underline', cursor: 'pointer', color: '#222'}}>
						CANCEL
					</span>
				</div>
			</div>
		)
	}
}


class ModalPart3 extends Component {
	render() {
		const {dispatch, workout} = this.props;
		
		return (
			<div style={{height: 285}}>
				<div className="f2x-modal-title" style={{paddingTop: '0px'}}>WORKOUT SAVED</div>
				
				<div className="small-font separated" style={{fontSize: '14px', width: '350px', margin: '40px auto 0 auto'}}>
					Changes to "{workout}" have been saved.
				</div>
				
				
				<div style={{marginTop: '55px', marginBottom: '25px'}}>
					<F2xButton 	name="OK" 
								className={`f2x-new-button-black small-font separated`} 
								style={{height: '52px', width: '188px', fontSize: '12px'}}
								onClick={ () => dispatch( setVisibilityModal(ModalVisibilityFilters.HIDE) ) } />
				</div>
			</div>
		)
	}
}





class f2xWorkoutSelect extends Component {
	constructor(props){
		super(props);
		
		this.state = {
			filter: '',
			amount: 0,
			selected: -1,
			confirm: -1,
			mode: 1,
			i: false,
			exercise: '',
			workout: ''
		}
		
		this.onSelect = this.onSelect.bind(this);
		this.update = this.update.bind(this);
		this.finishAdd = this.finishAdd.bind(this);
	}	
	
	
	update(){
		this.setState(
			Object.assign({}, this.state,{
				amount: 0,
			})
		)
	}
	
	onSelect(data, i) {
		this.update();
		
		let workoutsF = F2xDB["workoutsUser"].data.results.find( (item) => (item.uid === i) );

		this.setState({
			amount: workoutsF.exercises.length
		})
		
		if(workoutsF.exercises.length < 5){
			this.setState({
				mode: 2,
				i: i,
				workout: workoutsF.title
			})
		}
	}
	
	
	finishAdd() {
		const {exercise} = this.props;
		
		let workoutsI = F2xDB["workoutsUser"].data.results.findIndex( (item) => (item.uid === this.state.i) );
		
		addIfUnique(F2xDB["workoutsUser"].data.results[workoutsI].exercises, exercise, "uid")
		
		updateSpecificWorkoutRequest(
			F2xDB["workoutsUser"].data.results[workoutsI], 
			() => {
				getFX2DB( 
					F2xDB['workoutsUser'], 
					() => { 
						console.log("Full Data correctly updated")
						store.dispatch( setMyWorkouts(F2xDB['workoutsUser'].data.results, 2) ); 
						
						browserHistory.push("/myworkout/"+ F2xDB["workoutsUser"].data.results[workoutsI].uid)
						
						this.setState({
							mode: 3
						});
					}
				);
			}
		)
	}

	
	componentDidMount(){
		this.refs.modal.refs.search.refs.box.focus();
	}
	
	
	render(){
		const {dispatch} = this.props;
		
		let workoutsF = F2xDB["workoutsUser"].data.results.filter( (item) => {
			
													return item.title.toLowerCase().indexOf(this.state.filter.toLowerCase()) !== -1 })								
																		
		let workouts = workoutsF.map( (item) => {
													return {name:item.title, value:item.uid} })		
												
														
		let renderModal = '';
		
		switch(this.state.mode){
			case 1:
				renderModal = (<ModalPart1 ref="modal" state={this.state} update={this.update} onSelect={this.onSelect} workouts={workouts} />);
				break;
			
			case 2:
				renderModal = (<ModalPart2 dispatch={dispatch} finish={this.finishAdd} exercise={this.props.exercise.title} workout={this.state.workout} />);
				break;
			
			case 3: 
				renderModal = (<ModalPart3 dispatch={dispatch} workout={this.state.workout} />);
				break;
				
			default:
				break;
		}																								

		return (
			<div className="cuerpo">
				{renderModal}
			</div>
		)
	}
}




const mapStateToProps = (state) => {
	const {modal, exercises} = state;
	
	return {
		exercise: exercises.list.find(x => x.uid === modal.param)
	}
}

const F2xWorkoutSelect = connect(
	mapStateToProps
)(f2xWorkoutSelect);



export default F2xWorkoutSelect;
