import React, { Component } from 'react';
import { connect } from 'react-redux';




/*
 * Global Vars & Functions
 */
import { MURL } from '../../data/data';



/*
 * Components
 */
import F2xButton from '../../components/F2xButton'



 /*
 * Style
 */
import './F2xWorkoutShare.css';




/*
 * Icons
 */
//import instagram from '../../media/share_instagram.svg';
import facebook from '../../media/share_facebook.svg';
import twitter from '../../media/share_twitter.svg';






class f2xWorkoutShare extends Component {
	copyLink(el){
		el.disabled = false;
		
		var editable = el.contentEditable; // Record contentEditable status of element
        
       	el.contentEditable = true; // iOS will only select text on non-form elements if contentEditable = true;
       	
        var range = document.createRange();
        	range.selectNodeContents(el);
        
        var sel = window.getSelection();
        	sel.removeAllRanges();
			sel.addRange(range); // Does not work for Firefox if a textarea or input
        
        if (el.nodeName === "TEXTAREA" || el.nodeName === "INPUT") 
        	el.select(); // Firefox will only select a form element with select()
        
        if (el.setSelectionRange && navigator.userAgent.match(/ipad|ipod|iphone/i))
        	el.setSelectionRange(0, 999999); // iOS only selects "form" elements with SelectionRange
        
        el.contentEditable = editable; // Restore previous contentEditable status
        
	    if (document.queryCommandSupported("copy")){
		    document.execCommand('copy');
		    
			el.disabled = true;
			el.blur();
			
			this.refs.copyText.style.opacity = 1;
			let textC = this.refs;
			
			setTimeout(function(){
				textC.copyText.style.opacity = 0;
			}, 1000);
		}
	}
	
	
	share(network){
		const {workout} = this.props;
		
		switch(network){
			case 'twitter':
				const instagramText = 'text%20goes%20here';
				const instagramTags = 'hashtag1#hashtag2#hashtag3';
				
				window.open('https://twitter.com/intent/tweet?text='+ instagramText +'&url=http%3A%2F%2Fwww.jeekjee.net%3A8002%2Fexercise%2F58181d4e-1fc6-4c4f-b734-891fed56af0d&hashtags='+ instagramTags, '_blank');
			break;
			
			
			
			case 'facebook':
				window.open('https://www.facebook.com/sharer.php?u='+ encodeURI('http://projects.jeekjee.net/f2x/share.php?img1='+ MURL + workout.exercises[0].video.poster +'&title='+ workout.title +'&description='+ workout.description), '_blank');
				break;
			
			default:
				break;
		}
	}
	
	render(){
		const {workout} = this.props;
		
		return (
			<div className="cuerpo">
				<div className="f2x-modal-title">SHARE THIS WORKOUT</div>
				
				<div style={{marginTop: '10px', marginBottom: '12px'}}>
					<div style={{backgroundImage: 'url('+ MURL + workout.exercises[0].video.poster +')', width: '115px', height: '115px', margin: '0 auto', borderRadius: '50%'}} className="cover-img" />
				</div>
				
				
				<div style={{fontSize: '15px'}}>
					{workout.title}
				</div>
				
				<div className="small-font" style={{fontSize: '15px', color: '#6b6b6b'}}>
					{workout.user || workout.exercises[0].trainer.name}
				</div>
				
				
				
				<div style={{background: '#c8c8c8', width: '456px', height: '1px', margin: '25px auto 23px auto'}} />
				
				
				<div style={{paddingBottom: '33px'}}>
					<div style={{width: '50%', float: 'left'}}>
						<div style={{borderRight: 'solid 1px #c8c8c8', paddingTop: '8px', paddingBottom: '20px'}}>
							<div>Link to this workout:</div>
							
							<input type="text" className="f2x-input-normal f2x-input-small" ref="copy" style={{position: 'absolute', left: '-10px', width: '2px', padding: '0', margin: '0', display: 'block'}} defaultValue={`http://www.jeekjee.net:8002/view/${workout.uid}`} readOnly="true" />
							
							<F2xButton name="COPY LINK" style={{padding: '4px 0', width: '180px', marginTop: '20px'}} onClick={ () => this.copyLink(this.refs.copy) } />
							
							<div ref="copyText" className="copied">
								Copied to clipboard
							</div>
						</div>
					</div>
					
					<div style={{width: '50%', float: 'right', paddingTop: '8px'}}>
						<div>Share link via:</div>
						
						<div style={{marginTop: '17px'}}>
							{/*<img src={instagram} alt="Instagram" className="mobileInline" width="50" height="50" style={{margin: '0 7px', cursor: 'pointer'}} />*/}
							<img src={facebook} alt="Facebook" width="50" height="50" style={{margin: '0 7px', cursor: 'pointer'}} onClick={() => this.share('facebook')} />
							<img src={twitter} alt="Twitter" width="50" height="50" style={{margin: '0 7px', cursor: 'pointer'}} onClick={() => this.share('twitter')} />
						</div>
					</div>
					
					<div style={{clear: 'both'}} />
				</div>
			</div>
		);
	}
}




const mapStateToProps = (state) => {
	const {modal, workouts, myworkouts} = state;
	
	let newWorkout = workouts.list.find(x => x.uid === modal.param);
	
	if(!newWorkout)
		newWorkout = myworkouts.list.find(x => x.uid === modal.param);
	
	
	return {
		workout: newWorkout
	}
}

const F2xWorkoutShare = connect(
	mapStateToProps
)(f2xWorkoutShare);


export default F2xWorkoutShare;