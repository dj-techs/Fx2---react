import React,  { Component } from 'react';
import { connect } from 'react-redux'





/*
 * Components
 */
import F2xButton from '../../components/F2xButton'



/*
 * Style
 */
import './F2xGeneric.css';







class f2xGeneric  extends Component {
	render() {
		const { params } = this.props;
		
		const button = params.btn ? (<div style={{textAlign: 'center', padding: '20px 0 25px 0'}}><F2xButton name={params.btnText} 
									className="f2x-new-button-black small-font separated" 
									style={{padding: '16px 55px', fontSize: '11px'}}
									onClick={ params.btn } /></div>) : '';
		
		
		return (
			<div className="cuerpo" style={{bottom: '0'}}>
				<div className="f2x-modal-title">{params.title}</div>
				
				
				<div className="f2x-modal-content montse_light">{params.content}</div>
				
				
				{button}
			</div>
		)
	}
}




const F2xGeneric = connect()(f2xGeneric);


export default F2xGeneric;