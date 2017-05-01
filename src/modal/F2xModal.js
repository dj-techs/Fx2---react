import React, {Component} from 'react';
import { connect } from 'react-redux'


/*
 * Data & Functions
 */
// import { resetWorkout } from '../data/workout_tools';
import { isMobile } from '../data/data';
import { setVisibilityModal, ModalVisibilityFilters, ModalTypes } from '../actions';




/*
 * Modals
 */
import F2xSignIn from './F2xSignIn/F2xSignIn';
import F2xJoin from './F2xJoin/F2xJoin';
import F2xTry from './F2xTry/F2xTry';
import F2xResetPassword from './F2xResetPassword/F2xResetPassword';
import F2xWorkoutName from './F2xWorkoutName/F2xWorkoutName';
import F2xWorkoutSelect from './F2xWorkoutSelect/F2xWorkoutSelect';
import F2xWorkoutShare from './F2xWorkoutShare/F2xWorkoutShare';
import F2xWorkoutSaveChanges from './F2xWorkoutSaveChanges/F2xWorkoutSaveChanges';
import F2xWorkoutEdit from './F2xWorkoutEdit/F2xWorkoutEdit';
import F2xWorkoutRemove from './F2xWorkoutRemove/F2xWorkoutRemove';
import F2xWorkoutBuy from './F2xWorkoutBuy/F2xWorkoutBuy';
import F2xExerciseShare from './F2xExerciseShare/F2xExerciseShare';
import F2xViewingOptionSelect from './F2xViewingOptionSelect/F2xViewingOptionSelect';
import F2xBecomePlatinumMember from './F2xBecomePlatinumMember/F2xBecomePlatinumMember';
import F2xInviteFriend from './F2xInviteFriend/F2xInviteFriend';
import F2xEditEmail from './F2xEditEmail/F2xEditEmail';
import F2xGeneric from './F2xGeneric/F2xGeneric';
import F2xMyGoalsBecomePlatinumMember from './F2xMyGoalsBecomePlatinumMember/F2xMyGoalsBecomePlatinumMember'




/*
 * Style
 */
import './F2xModal.css';




/*
 * Images
 */
import ICON_LOGO from '../media/f2x-logo.svg';
import ICON_LOGO_MOBILE from '../media/f-2-x-logo.svg';










/*
 * Close Button
 */
const CloseBtn = ({onClick}) => (
	<div className="close-modal" onClick={ () => onClick()}>
		CLOSE
	</div>
);




class f2xModal extends Component {
	
	
	
	render() {
		
		const {mode, type, param, onClick} = this.props;
		
		let modalRender = '';
		let className = 'f2x-modal-box';
		let dmode = mode === 'update' ? 'block' : mode;
		let imageDisplay = 'block';
		
		switch(type){
			case ModalTypes.SIGN_IN:
				modalRender = (<F2xSignIn savein={param} />);
				break;
			
			case ModalTypes.JOIN:
				modalRender = (<F2xJoin invite={param} />);
				break;
				
			case ModalTypes.TRY:
				modalRender = (<F2xTry />);
				break;
				
			case ModalTypes.RESET_PASSWORD:
				modalRender = (<F2xResetPassword user={param} />);
				break;
				
			case ModalTypes.WORKOUT_NAME:
				modalRender = (<F2xWorkoutName />);
				break;
				
			case ModalTypes.WORKOUT_SELECT:
				modalRender = (<F2xWorkoutSelect />);
				break;
				
			case ModalTypes.WORKOUT_SHARE:
				imageDisplay = 'none';
				
				modalRender = (<F2xWorkoutShare />);
				break;
				
			case ModalTypes.WORKOUT_SAVE_CHANGES:
				modalRender = (<F2xWorkoutSaveChanges />);
				break;
				
			case ModalTypes.WORKOUT_EDIT:
				className += ' f2x-modal-extra';
				modalRender = (<F2xWorkoutEdit workout={param}/>);
				break;
				
			case ModalTypes.WORKOUT_REMOVE:
				modalRender = (<F2xWorkoutRemove workout={param}/>);
				break;
				
			case ModalTypes.WORKOUT_BUY:
				imageDisplay = 'none';
				modalRender = (<F2xWorkoutBuy />);
				break;
				
			case ModalTypes.EXERCISE_SHARE:
				modalRender = (<F2xExerciseShare />);
				break;
				
			case ModalTypes.VIEWING_OPTION_SELECT:
				className += ' f2x-modal-big';
				modalRender = (<F2xViewingOptionSelect uid={param} />);
				break;
				
			case ModalTypes.BECOME_PLATINUM_MEMBER:
				imageDisplay = 'none';
				modalRender = (<F2xBecomePlatinumMember />);
				break;
				
			case ModalTypes.INVITE_FRIEND:
				imageDisplay = 'none';
				modalRender = (<F2xInviteFriend />);
				break;
				
				
			case ModalTypes.EDIT_EMAIL:
				imageDisplay = 'none';
				modalRender = (<F2xEditEmail />);
				break;
				
				
			case ModalTypes.GENERIC:
				imageDisplay = 'none';
				modalRender = (<F2xGeneric params={param} />);
				break;

			case ModalTypes.MYGOALS_BECOME_PLATINUM:
				modalRender = (<F2xMyGoalsBecomePlatinumMember/>)
				break;
				
			default:
				break;
		}
		
		
		if (mode==='update') className += ' disabled';
		
		const LOGO = isMobile() ? ICON_LOGO_MOBILE : ICON_LOGO;
		
		return (
			<div className="f2x-modal" style={{display: dmode}}>
				<div className="f2x-modal-back" onClick={ () => onClick() }></div>
				
				<div className={className} style={{minHeight: isMobile() ? innerHeight +'px' : 'auto'}}>
					<CloseBtn onClick={ onClick } />
					
					<img src={LOGO} alt="Logo" className={`${imageDisplay === 'none' || !isMobile() ? 'hidden': ''} logo mobile`} />
					
					<div style={{clear: 'both'}} />
					
					{modalRender}
				</div>
			</div>
		)
	};
}




const mapStateToProps = (state) => {
	return {
		mode: state.modal.state,
		type: state.modal.type,
		param: state.modal.param
	};
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: () => {
	    //resetWorkout();
    	dispatch( setVisibilityModal(ModalVisibilityFilters.HIDE))
    }
  }
}


const F2xModal = connect(
	mapStateToProps, 
	mapDispatchToProps 
)(f2xModal)


export default F2xModal;
