import React from 'react';
import { connect } from 'react-redux'




/*
 * Global Vars & Functions
 */
import { setVisibilityModal, ModalVisibilityFilters, ModalTypes } from '../../actions'



/*
 * Component
 */
import F2xButton from '../../components/F2xButton'



/*
 * Style
 */
import './F2xViewingOptionSelect.css';








const f2xViewingOptionSelect = ({dispatch, uid}) => (
	<div className="cuerpo">
		<div className="f2x-modal-title f2x-modal-title-select"><div className="f2x-select-topbar"></div>Select a viewing option to<br />continue watching:</div>
		
		<div style={{margin: '40px 0 55px 0', position: 'relative'}}>
			{/* BUY SINGLE WORKOUT */}
			<div style={{width: '50%', float: 'left'}}>
				<div style={{borderRight: 'solid 1px #979797', padding: '0 15px 0 15px'}}>
					<div className="f2x-select-title">BUY SINGLE<br/>WORKOUT</div>
					
					<div className="f2x-price-format" style={{fontSize: '36px', margin: '10px 0 0 0'}}>
						<span>$</span>2.99
					</div>
					
					<div className="f2x-select-info">Online streaming<br/>access to this workout</div>
					
					<F2xButton 	name="PURCHASE" 
								className="f2x-new-button-black small-font separated montse_light"
								style={{padding: '0 25px', fontSize: '12px', height: 45}}
								onClick={ () => dispatch( setVisibilityModal(ModalVisibilityFilters.SHOW, ModalTypes.WORKOUT_BUY, uid) ) } />
				</div>
			</div>
			
			{/* BUY SUBSCRIPTION */}
			<div style={{width: '50%', float: 'right'}}>
				<div style={{padding: '0 15px 30px 15px'}}>
					<div className="f2x-select-title">BECOME A<br />PLATINUM<br/>MEMBER</div>
					
					<div className="f2x-price-format" style={{fontSize: '36px', margin: '10px 0 0 0'}}>
						<span>$</span>12.99<span>/mo</span>
					</div>
						
					<div className="f2x-select-info"><b>Unlimited</b> online<br/>streaming access to all<br/>F2X content </div>
					
					<F2xButton 	name="PURCHASE" 
								className="f2x-new-button-black small-font separated montse_light"
								style={{padding: '0 25px', fontSize: '12px', height: 45}}
								onClick={ () => dispatch( setVisibilityModal(ModalVisibilityFilters.SHOW, ModalTypes.BECOME_PLATINUM_MEMBER, uid) ) } />
				</div>
			</div>
			
			<div className="f2x-select-or">OR</div>
			
			<div style={{clear: 'both'}} />
		</div>
	</div>
);

const F2xViewingOptionSelect = connect()(f2xViewingOptionSelect);


export default F2xViewingOptionSelect;

