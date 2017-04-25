import React from 'react';
import { browserHistory } from 'react-router';


/*
 * Files for Home
 */
import './F2xCircularWorkout.css';


//Presentational Individual component
	const F2xCircularWorkout = (props) => {
		let timeAgo = '';
		
		const dateNow		= new Date();
		const dateWorkout = new Date(props.params.date_added);
		
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
		
		
		const trainerName = props.params.exercises ? props.params.creator.name : props.params.name ? props.params.name : props.params.trainer;
		
		
		let name = (<div className={`trainer small-font montse_light${props.mode ? ' ' : ''}`} onClick={() => props.onClick( trainerName , 1 )} >{trainerName}</div>);
		if(props.noName)
			name = '';
		
		return (
			<div className="circ-wo-list-item" style={props.style}>
				<div className="img-cont cover-img" style={props.mstyle} onClick={() => {props.onClick( props.params.uid , 0 ); browserHistory.push('/view/'+ props.params.uid);} } />
				
				<div className="info centered">
					<div className={`label ${props.mode ? '' : ''}`} onClick={() => props.onClick( props.params.uid , 0 )}>{props.params.title}</div>
					
					{name}
					
					<div className='f2x-time-Ago small-font montse_light'>
						{timeAgo}
					</div>
				</div>			
			</div>
		)
	}
	

export default F2xCircularWorkout;