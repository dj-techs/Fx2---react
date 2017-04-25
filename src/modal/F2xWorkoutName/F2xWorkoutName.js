import React, { Component } from 'react';



/*
 * Redux
 */
import { connect } from 'react-redux'
//import { setVisibilityModal, ModalVisibilityFilters } from '../../actions'


import { saveWorkout } from '../../data/workout_tools';





/*
 * Style
 */
import './F2xWorkoutName.css';



import F2xInput from '../../components/F2xInput'
import F2xButton from '../../components/F2xButton'



/*
 * Login Button
 */
const actionButton = ({dispatch , value, spinner, spinnerON }) => (
	<div style={{marginTop: '30px'}}>
		<F2xButton spinner={spinner} name="SAVE" className="f2x-button-black f2x-button-big small-font separated" 
					onClick={ () => {																	//Click action. Probably we should merge this in a simple action + reducer dispatch
						saveWorkout( value ); 
						spinnerON();
					}} />
	</div>
);

const ActionButton = connect()(actionButton);




/*
 *  WorkOut name modal
 *  It cannot be stateless since we need access to REFS
 */

class f2xWorkoutName extends Component {
	
	constructor(props) {
	    super(props);
	    
	    this.state = { 
            value: {
	            wName:''
	        },
	        spinner: false,
	        send: false
	    };
	    
	    this.update = this.update.bind( this );    							 	// Generic UPDATE inner function for our Forms
	    this.spinnerON = this.spinnerON.bind(this);
	}
	
	spinnerON(){
		this.setState({
			spinner: true
		})
	}
	update(){
		let tForm = {}														   // We defined the form values here
		tForm.wName = this.refs.wName.refs.wNameContent.value;				   // Component REF +  subcomponent REF
		
		this.setState(
			Object.assign({}, this.state,{
		    		value: {
			    		wName: tForm.wName
			    	}
		        })
	    )
	}	
	
	
	render(){
		return(
			<div className="cuerpo">
				<div className="f2x-modal-title">NAME THIS WORKOUT</div>
				
				<div style={{marginTop: '25px'}}>
					<div>
						<F2xInput className="f2x-input-long centered" style={{textAlign: 'center'}} placeholder="e.g. My Workout" ref="wName" refID="wNameContent" onChange={ (e) => { this.update(e) } } />
					</div>
				</div>
				
				<div style={{marginBottom: '70px'}}>
					<ActionButton value={this.state.value} spinner={this.state.spinner} spinnerON={this.spinnerON} />
				</div>
			</div>			
		)
	}
}




const F2xWorkoutName = connect()(f2xWorkoutName);


export default F2xWorkoutName;