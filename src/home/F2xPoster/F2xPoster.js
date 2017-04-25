import React, {Component} from 'react';
import { connect } from 'react-redux'
import { browserHistory } from 'react-router';


import { MURL, isMobile } from '../../data/data';
import { resetWorkout } from '../../data/workout_tools';




/*
 * Components
 */
import F2xButton from '../../components/F2xButton';



/*
 * Style
 */
import './F2xPoster.css';





//
// ******* HERO POSTER
//

//Presentational component
class heroPoster extends Component {
	
	componentDidMount(){
		if(isMobile()){
			document.querySelector(".f2x-header").style.border = 'none'
			document.querySelector(".f2x-header").style.background = 'transparent'
		}
	}
	
	componentWillUnmount(){
		if(isMobile()){
			document.querySelector(".f2x-header").style.background = '#fff'
			document.querySelector(".f2x-header").style.borderBottom = 'solid 2px rgb(195,195,195)';
		}
	}
	
	render() {
		const {hero, text, link, title} = this.props;
		
		return (
			<div className="hero-img cover-img" style={ {backgroundImage:'url('+ MURL + hero +')' }}>
				<div className="hero-label">
					<div className="hero-label-text separated">{text}</div>
					
					<div className="hero-label-btn" style={{marginTop: '20px', textAlign: 'left'}}>
						<F2xButton name={`${title}`}  className="f2x-new-button-black small-font separated" style={{width: '185px', height: '54px'}} onClick={ () => { resetWorkout(); browserHistory.push(link) }} />
					</div>
				</div>
			</div>
		)
	}
}


const mapStateToProps = (state) => {
	const { homeImage } = state;
	
		let hero = '';
		let text = '';
		let link = '';
		let title = '';
		
	if(homeImage.image !== false){
		hero = homeImage.image[0].image;
		text = homeImage.image[0].description;
		link = homeImage.image[0].url;
		title = homeImage.image[0].title.toUpperCase();
	}
	
	return {
		hero: hero,
		text: text,
		link: link,
		title: title
	}
}


const HeroPoster = connect(
	mapStateToProps
)(heroPoster);

// Container component
const F2xPoster = () => (
	<HeroPoster params={ {name:'tabata training'} } />
)
	

export default F2xPoster;