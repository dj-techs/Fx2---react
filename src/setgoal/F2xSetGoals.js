import React, {Component} from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'




/*
 * Global Vars & Functions
 */
import {  } from '../data/data';
import {  } from '../actions';
import { setOpenDropdown } from '../App';



/*
 * Components
 */
import F2xInput from '../components/F2xInput'
import F2xButton from '../components/F2xButton'
import F2xDropdown from '../components/F2xDropdown'



/*
 * Style
 */
import './F2xSetGoals.css';



const actionButton = ({ onClick, enabled, name }) => (
	<div style={{marginTop: '5px', textAlign: 'center'}}>
		<F2xButton name={name} 
			className={`f2x-new-button-black small-font separated f2x-login-sign-btn ${enabled ? '':' disabled'}`}
			onClick={ () => onClick()}/>
	</div>
);


const ActionButton = connect()(actionButton)


class f2xBecomePlatinum extends Component {
	constructor(props){
		super(props);
		
		this.state = {
			goalname: '',
			birthday: '',
			gender: 'Male',
			feet: 0,
            inch: 0,
			weight: '',
			targetweight: '',
            workoutPerWeeks: 1,
            targetDate: '',
            enableSet: false,
            startable: false,
            errors:{}
		}
		
		this.setGoal = this.setGoal.bind(this);
        this.update = this.update.bind(this);
	}
	
	componentDidMount(){
        

	}

    componentWillReceiveProps(nextProps){
        this.setState({

        })
	}
	
	
	setGoal() {
		console.log("setGoal");		
        
	}

	
    update() {
		let tForm = {}														   // We defined the form values here

		
	}

	validateCardname(data){
		var re = /^[a-z ,.'-]+$/i;
		return data !== '' && re.test(data);
	}

	validateCardnumber(data){
		var re = /^4[0-9]{12}(?:[0-9]{3})?$/;

		return data !== '' && re.test(data);
	}

	validateExpdate(data){
		var re = /^(0[1-9]|1[0-2])\/([0-9][0-9])$/
		return data !== '' && re.test(data)
	}

	validateCvv(data){
		var re = /^[0-9]{3,4}$/;
		return data !== '' && re.test(data)
	}
	
	render(){
		return (
            <div style={{ position: 'relative'}}>
                <div style={{ maxWidth: '360px', margin: '0 auto', position: 'relative', paddingTop: '75px', textAlign: 'center'}}>
                    <div className='f2x-modal-title' style={{fontSize: '18px', marginBottom: '10px'}}>SET A PERSONAL GOAL</div>
                    <div className="f2x-modal-title" style={{fontSize: '12px'}}>Complete the fields below to create a workout schedule.</div>

                    <div style={{width: '100%', margin: '40px auto 15px auto'}}>

                        <F2xInput 	placeholder='Name of Goal' 
                                    ref="goalName" refID="text" 
                                    className="f2x-input-full" 
                                    style={{width: '100%', marginTop: '25px'}} 
                                    styleBox={{width: '100%', marginTop: '23px'}}
                                    onChange={(e) => { this.update(e) }} />
                        
                        <F2xInput 	placeholder='Birthday (MM/DD/YYYY)' 
                                    ref="birthday" refID="text" 
                                    className="f2x-input-full"
                                    style={{width: '100%', marginTop: '25px'}} 
                                    styleBox={{width: '100%', marginTop: '23px'}} 
                                    onChange={(e) => { this.update(e) }} />
                        
                        <div style={{position: 'relative', height: '60px', marginTop: '25px'}}>

                            <F2xDropdown	placeholder='Gender'
                                    ref="gender" refID="text" 
                                    className="f2x-input-full separated normal-font"
                                    list={['Male', 'Female']} style={{width: 'calc(50% - 15px)', fontSize: '12px', borderBottomWidth: 1, float: 'left', marginTop: '23px'}} styleItems={{fontSize: '11px'}} onChange={ (i) => this.feetChange(i) } value={this.state.feet}/>

                            <F2xDropdown	placeholder='Feet' 
                                    ref="heightFeet" refID="text"
                                    className="f2x-input-full separated normal-font" 
                                    list={[...Array(4)].map((x, i) => {	return i+3 })} style={{width: 'calc(25% - 5px)', fontSize: '12px', borderBottomWidth: 1, marginTop: '23px'}} styleItems={{fontSize: '11px'}} onChange={ (i) => this.feetChange(i) } value={this.state.feet}/>

                            <F2xDropdown 	placeholder='Inches' 
                                    ref="heightInch" refID="text"
                                    className="f2x-input-full separated normal-font" 
                                    list={[...Array(11)].map((x, i) => { return i+1 })} style={{width: 'calc(25% - 5px)', fontSize: '12px', borderBottomWidth: 1, marginTop: '23px', marginLeft: '10px'}} styleItems={{fontSize: '11px'}} onChange={ (i) => this.feetChange(i) } value={this.state.feet}/>
                        </div>
                        <div style={{clear: 'both', marginTop: '25px'}} />
                        <div style={{position: 'relative', height: '60px'}}>
                            <F2xInput 	placeholder='Weight (lbs)' 
                                        ref="curWeight" refID="text" 
                                        className="f2x-input-full" 
                                        style={{margin: 0, width: '100%'}} 
                                        styleBox={{width: 'calc(50% - 15px', marginTop: '23px', float: 'left'}}
                                        onChange={(e) => { this.update(e) }} />
                            <F2xInput 	placeholder='Target Weight (lbs)' 
                                        ref="tarWeight" refID="text" 
                                        className="f2x-input-full" 
                                        style={{margin: 0, width: '100%'}} 
                                        styleBox={{width: 'calc(50% - 15px', marginTop: '23px', float: 'right'}}
                                        onChange={(e) => { this.update(e) }} />
                        </div>

                        <div style={{clear: 'both', marginTop: '25px'}} />
                        <div style={{position: 'relative', height: '60px'}}>
                            <F2xDropdown 	placeholder='Workout per Week' 
                                        ref="heightInch" refID="text"
                                        className="f2x-input-full separated normal-font" 
                                        list={[...Array(7)].map((x, i) => { return i+1 })} style={{width: 'calc(50% - 15px)', fontSize: '12px', borderBottomWidth: 1, marginTop: '23px', float: 'left'}} styleItems={{fontSize: '11px'}} onChange={ (i) => this.feetChange(i) } value={this.state.feet}/>

                            <F2xDropdown 	placeholder='Target Date' 
                                        ref="heightInch" refID="text"
                                        className="f2x-input-full separated normal-font" 
                                        list={[...Array(11)].map((x, i) => { return i+1 })} style={{width: 'calc(50% - 15px)', fontSize: '12px', borderBottomWidth: 1, marginTop: '23px', marginLeft: '10px', float: 'right'}} styleItems={{fontSize: '11px'}} onChange={ (i) => this.feetChange(i) } value={this.state.feet}/>
                        </div>
                        <div style={{clear: 'both', marginTop: '30px'}} />
                        <ActionButton
                            enabled = {this.state.enableSet}
                            name = {this.state.enableSet? 'SAVE':'SET A GOAL'}
							onClick={ this.setGoal } />
                    </div> 
                    <div style={{position: 'absolute', right: '-250px', bottom: '80px', width: '200px', height: '150px', border: '1px solid #e6e6e6'}}>
                        {/*<div ref="placeholder" style={{color: '#bababa', fontSize: '13px', fontWeight: '100', width: '70%', position: 'absolute', top: '35%', left: '15%'}}> Enter a goal to see a per workout calorie estimate</div>*/}
                        <div style={{ color: '#222', marginTop: '20px', fontSize: '13px', width: '100%'}}>Your goal requires:</div>
                        <div style={{ color: '#222', fontSize: '55px', width: '100%'}}>547</div>
                        <div style={{ color: '#bababa', fontSize: '11px', width: '100%', textAlign: 'center'}}>Calories burned<br/>per workout</div>
                    </div>               
                </div>                
            </div>
		)
	}
}

const mapStateToProps = (state) => {
	const {modal, workouts, card, appState} = state;
	
	let newWorkout = ''
	
	workouts.list.map(
		(item) =>{
			const searchWorkout = item.exercises.find(x => x.uid === modal.param);
			
			if(searchWorkout)
				newWorkout = item.title;
				
			return null;
		}
	)
	
	
	return {
		title: newWorkout,
		card: card.card,
        appState: appState
	}
}


const F2xBecomePlatinum = connect(
	mapStateToProps
)(f2xBecomePlatinum);

export default F2xBecomePlatinum