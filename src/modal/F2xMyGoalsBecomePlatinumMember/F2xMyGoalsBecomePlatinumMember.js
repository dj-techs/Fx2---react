import React,  { Component } from 'react';
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'





/*
 * Components
 */
import F2xButton from '../../components/F2xButton'



/*
 * Style
 */
import './F2xMyGoalsBecomePlatinumMember.css';


/*
 * images
 */
import IMG_BACK_IMG from '../../media/modal-mygoals.png'
import IMG_BACK_IMG_RIGHT from '../../media/modal-mygoals-graph.png'




const ActionButton = () => (
	<div style={{marginTop: '35px', marginBottom: '45px'}}>
		<F2xButton name="GO PLATINUM" 
			className="f2x-new-button-black small-font separated" 
			style={{height: '52px', width: '188px', fontSize: '12px'}}
			onClick={ () => {browserHistory.push('/become-platinum') } } />
	</div>
);


class f2xMyGoalsBecomePlatinumMember  extends Component {
	render() {
		return (
			<div className="cuerpo" style={{ width: '675px', height: '454px' }}>
				<img src={IMG_BACK_IMG} alt="F2x" style={{height: '100%', position: 'absolute', left: 0, top: 0}} />
				<img src={IMG_BACK_IMG_RIGHT} alt="F2x" style={{width: '370px', position: 'absolute', right:0, bottom: 0}} />
				<div style={{ width: 'calc(100% - 300px', position: 'absolute', marginTop: '50px', right: 0, top: 0}}>
					<div style={{ marginTop: '35px', fontSize: '16px', fontWeight: 800, fontFamily: 'Arial', marginBottom: '15px' }}>BECOME A</div>
					<div style={{ marginTop: '15px', fontSize: '20px', fontWeight: 300, fontFamily: 'Arial', marginBottom: '15px' }}>PLATINUM MEMBER</div>
					<div style={{ marginTop: '15px', fontSize: '16px', fontWeight: 300, fontFamily: 'Arial', marginBottom: '15px' }}>TO ACCESS MY GOALS</div>
					<ActionButton />
				</div>
			</div>
		)
	}
}

const F2xMyGoalsBecomePlatinumMember = connect()(f2xMyGoalsBecomePlatinumMember);


export default F2xMyGoalsBecomePlatinumMember;