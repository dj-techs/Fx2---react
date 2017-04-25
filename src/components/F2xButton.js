import React, {Component} from 'react';



/*
 * Style
 */
import './F2xButton.css';



//
// ******* Component: [ Button ]
//
	// Presentational Component
	class F2xButton extends Component {
		constructor(props){
			super(props);
			
			this.state = {
				spinner: false
			}
		}
		
		componentWillMount(){
			const spinner = this.props.spinner ? true : false;
			
			this.setState({
				spinner: spinner
			});
		}
		
		componentWillReceiveProps(nextProps){
			const spinner = nextProps.spinner ? true : false;
			
			this.setState({
				spinner: spinner
			});
		}
		
		render() {
			const { name, className, style, medium, small, onClick, spinnerStyle } = this.props;
			
			const button = (<button className={`f2x-button${className ? ' '+ className : ''}${medium ? ' f2x-button-medium' : ''}${small ? ' f2x-button-small' : ''}`} style={style} onClick={ () => onClick()  }>{name}</button>);
			
			const spinner = (<div className="f2x-loader" style={spinnerStyle}></div>);
			
			
			const renderDOM = this.state.spinner ? spinner : button;
			
			return renderDOM;
			
		}
	}
	

export default F2xButton;