import React, { Component } from 'react';
import update from 'react/lib/update';






/*
 * Store for dispatch
 */
import { store } from '../';



/*
 * Redux
 */
import { setVisibilityModal, ModalVisibilityFilters, ModalTypes } from '../actions'


/*
 * Components
 */ 
import F2xButton from './F2xButton';
import F2xWorkExPreview from './F2xWorkExPreview';


/*
 * Style
 */
import './F2xWorkoutTray.css';


/*
 * Images
 */
import ICON_SAVE from '../media/form_ok.svg';
import ICON_CANCEL from '../media/button-cancel.svg';
import ICON_ADD from '../media/drag_icon.svg';
import ICON_PENCIL from '../media/Icon_Pencil.svg';


/*
 * Data & Functions
 */
import { actWorkout, resetWorkout, removeExercise, sortExercises, mustUpdate ,updateSaveWorkout, saveWorkout, addExercisesToWorkout } from '../data/workout_tools';










// PC WORKOUTS 
class F2xWorkoutTrayButtons extends Component {
	constructor(props){
		super(props);
		
		this.state = {
			nameMaxLength: 30,
			spinner: false, 
			isActive: true
		}
		
		this.updateAdd = this.updateAdd.bind(this);
		this.sendSave = this.sendSave.bind(this);
	}
	
	componentDidMount(){
		this.refs.name.innerText = 'Untitled Workout';
	}
	
	trayOutNameLimit(e) {
		if(e.which !== 8 && this.refs.name.innerText.length > this.state.nameMaxLength)
	       e.preventDefault();
	}
	
	updateAdd(){
		const  {update, add } = this.props;
		
		if(update){
			if(add){
				addExercisesToWorkout(actWorkout)
			}
			else{
				resetWorkout();
				
				history.back(1)
			}
		}
		else
			resetWorkout();
	}
	
	sendSave(){
		const  {isActive, update } = this.props;
		
		if(isActive){
			if (!update) {
				if(this.refs.name.innerText.trim() === 'Untitled Workout'){
					store.dispatch( setVisibilityModal(ModalVisibilityFilters.SHOW, ModalTypes.WORKOUT_NAME)) 
					
					return null;
				}
				else
					saveWorkout( {wName: this.refs.name.innerText} );
			} else {
				updateSaveWorkout({wName: this.refs.name.innerText});
			}
			
			this.setState({
				spinner: true,
				isActive: false
			})
		}	
	}
	
	render() {
		const  {isActive, update, min, cal, onChange, focus, add } = this.props;
		
		return (
			<div className="f2x-configure-workout-save pc">
				<div className="f2x-new-workout-datas">
					<div className={`f2x-new-workout-name small-font cursor`} onFocus={() => focus() } onKeyDown={(e) => this.trayOutNameLimit(e)} contentEditable="true" ref="name" onBlur={() => onChange()}/>
					
					<img src={ICON_PENCIL} alt="Edit" className="float-l" style={{margin: '0 15px 0 5px'}} onClick={() => focus() } />
					
					<div className="small-font float-l montse_light">
						{min} min | {cal} cal 
					</div>
				</div>
				
				<div className="f2x-workout-save-buttons">
					<F2xButton name={update ? add ? 'ADD EXERCISE' : 'CANCEL' : 'CLEAR'} className={`f2x-new-button-black-invert small-font separated${isActive && this.state.isActive ?'':' disabled'}`} style={{width: (update ? add ? '122px' : '92px' : '100px'), height: '36px', fontSize: '11px', marginRight: '8px'}} onClick={this.updateAdd } />
					
					<F2xButton spinner={this.state.spinner} spinnerStyle={{float: 'right', margin: '3px 31px 0', width: '20px', height: '20px'}} name={update ? "UPDATE": "SAVE"} className={`f2x-new-button-black small-font separated${isActive?'':' disabled'}`} style={{width: '92px', height: '36px', fontSize: '11px'}}
						onClick={this.sendSave} />
				</div>
				
				<div className="clear" />	
			</div>	
		)
	}
}








const F2xWorkoutTrayButtonsMobile = ( {isActive, update } ) => (
	<div className="workout-try-buttons mobile">
		<img src={ICON_SAVE} alt="Save" className={isActive?'':'hidden'} 
			onClick={ 
				() => {
					if (!update) {
						store.dispatch( setVisibilityModal(ModalVisibilityFilters.SHOW, ModalTypes.WORKOUT_NAME)) 
					} else {
						updateSaveWorkout();
					}	 
				}  
			} 
		/>
		
		<img src={ICON_CANCEL} alt="Cancel" className={isActive?'':'hidden'} 
			onClick={ 
				() =>  
					resetWorkout()
			} 
		/>
	</div>
)





class F2xWorkoutTray extends Component {
	constructor(props) {
	    super(props);
	    
	    this.state = {
	      exerCards:  props.exercises,
	      min: 0,
	      cal: 0,
	      def: true
	    }
	    
	    this.moveExerCard = this.moveExerCard.bind(this);
	    this.nameChange = this.nameChange.bind(this);
	    this.nameFocus = this.nameFocus.bind(this);
	}
	
	
	componentDidMount(){
		window['Ps'].initialize(this.refs.list);
		
		const name = actWorkout.title;
		
		if(!this.refs.datas) return null;
		
		this.refs.datas.refs.name.innerText = name;
		
		if(name === '' || name.toLowerCase() === 'untitled workout'){
			this.setState({
				def: true
			});
			
			if(name === '')
				this.refs.datas.refs.name.innerText = 'Untitled Workout'
		}
		else {
			this.setState({
				def: false
			});
		}
		
		
		this.setState({
			min: actWorkout.duration || 0,
			cal: actWorkout.calories || 0
		});
	}
	
	componentWillReceiveProps(nextProps){
		if(!actWorkout.duration){
			this.setState({
				def: true
			});
			
			this.refs.datas.refs.name.innerText = 'Untitled Workout'
		}
		
		
		this.setState({
			exerCards:  nextProps.exercises,
			min: actWorkout.duration || 0,
			cal: actWorkout.calories || 0
		})
	}
	
	moveExerCard(dragIndex, hoverIndex) {
	    const { exerCards } = this.state;
	    const dragExerCards = exerCards[dragIndex];

	    this.setState(update(this.state, {
	    	exerCards: {
	        	$splice: [
					[dragIndex, 1],
					[hoverIndex, 0, dragExerCards]
				]
	      	}
	    }));
	    
	    sortExercises(this.state.exerCards)
	}
	
	
	nameChange(){
		const name = this.refs.datas.refs.name.innerText.trim();
		
		if(name === '' || name.toLowerCase() === 'untitled workout'){
			this.setState({
				def: true
			});
			
			if(name === '')
				this.refs.datas.refs.name.innerText = 'Untitled Workout'
		}
		else {
			this.setState({
				def: false
			});
		}
		
		window.getSelection().removeAllRanges();
	}
	
	nameFocus() {
		setTimeout(() => {
			const element = this.refs.datas.refs.name;
			
			let range= '';
			
			if (document.body.createTextRange) {
		       range = document.body.createTextRange();
		       range.moveToElementText(element);
		       range.select();
		   	} else if (window.getSelection) {
		       const selection = window.getSelection();        
		       range = document.createRange();
		       range.selectNodeContents(element);
		       selection.removeAllRanges();
		       selection.addRange(range);
		   	}
		   }, 0);
	}
	
	render(){
		const {  isActive, buttons, fromVideo, saveBtn, hiddeIcon, add } = this.props;
		const {  exerCards } = this.state; 
		
		const mobileMenu = saveBtn === undefined ? (<F2xWorkoutTrayButtonsMobile isActive={ !exerCards.length ? false : isActive } update={ mustUpdate() } />) : '';
		
		
		const exerciseTime = ~~(this.state.min/60);
		
		
		const iconMode = hiddeIcon ? hiddeIcon : 'inline-block';
		
		
		return (
			<div className="f2x-configure-workout-box">
				<div className="f2x-configure-workout-box-shadow" />
				
				<div className="f2x-configure-workout-box-content">
					<div className="f2x-configure-workout-slider" ref="list">
						{
							exerCards.map(
								(item, i) => {
									return (
										<F2xWorkExPreview 
												key={item.uid + '_' + i} 
												uid={item.uid} 
												index={i}
												cover={item.cover} 
												moveExerCard={this.moveExerCard}
												onClick={ (e) => removeExercise(e, fromVideo)} />
									)	
								}
							)	
						}
						
						<div className={`f2x-configure-workout-empty${exerCards.length?' long':''}${exerCards.length?' f2x-workout-builder-use':''}${exerCards.length >= 6 ?' hidden':''}`} style={{display: iconMode}} >
							<span className="f2x-add-icon">
								<img src={ICON_ADD} alt="Add Workout" style={{marginRight: '10px', verticalAlign: 'middle'}} /> 
							</span>
							
							<span className="separated small-font pc1" style={{color: '#C8C8C8', fontSize: '14px'}}>
								<span className={`${exerCards.length?'hidden':''}`}>Tap the Plus Sign or Drag Exercises to Create a Workout</span><
							/span>
						</div>
					</div>
												
				</div>

				{mobileMenu}
			
				{buttons ? <F2xWorkoutTrayButtons add={add} isActive={ !exerCards.length ? false : isActive } focus={this.nameFocus} update={ mustUpdate() } def={this.state.def} min={exerciseTime} cal={this.state.cal} ref="datas" onChange={this.nameChange}/> : '' }	 			
			</div>
		)
	}
	
}

export default F2xWorkoutTray;