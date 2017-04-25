import React, { Component } from 'react';
import { connect } from 'react-redux'




/*
 * Global Vars & Functions
 */
import { isMobile } from '../../data/data';



/*
 * Components
 */
import F2xVideoList from '../../components/F2xVideoList';




/*
 * Style
 */
import './F2xMyWorkoutView.css';




class f2xMyWorkoutView extends Component {
	componentDidMount(){
		if(isMobile())
			document.getElementById('f2x-header').style.opacity = '0';
	}
	
	componentWillUnmount(){
		document.getElementById('f2x-header').style.opacity = '1';
	}
	
	render() {
		const { workouts, params } = this.props;
		
		const newParam = params.split("@")[0];
		
		const item = workouts.list.filter(w => w.uid === newParam);
		
		const videoMode = params.split("@")[1];
		
		if(item.length <= 0)
			return (<div />)
			
		return (
			<div className="f2x-video-hook">
				<F2xVideoList item={item[0]} complete="true" my="true" mode={videoMode} />
			</div>
		)
	}
};

const mapStateToProps = (state) => {
	const { myworkouts } = state;
	
	return {
		workouts: myworkouts
	}
}

const F2xMyWorkoutView = connect(
	mapStateToProps
)(f2xMyWorkoutView);


export default F2xMyWorkoutView;