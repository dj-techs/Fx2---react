import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux'





import { getFX2DB, F2xDB } from '../../data/data';
import { resetWorkout } from '../../data/workout_tools';


/*
 * Components
 */
import F2xDropdown from '../../components/F2xDropdown';




/*
 * Style
 */
import './F2xMenu.css';


	

/*
 * Images
 */
import ICON_LOGO from '../../media/f-2-x-logo.svg';










// Presentational Component
const titleMobile = ({title}) => (
	<span>
		{title}
	</span>
)

let mapStateToProps = (state) => {
	return {
		title: state.title.title
	};
}

const TitleMobile = connect(
	mapStateToProps,
)(titleMobile);




const Menu = ({list, onClick, slc}) => (
	<ul>
		{
			list.map(
				(item, i) =>
					<li key={i} className={`separated cursor${slc === (i+1) ? ' selected' : ''}`} onClick={() => onClick(i+1, item[1])}>{item[0][0]} <span className="f2x-mobile-menu-display">{item[0][1]}</span></li>
			)
		}
	</ul>
)





const category = [
	["EXERCISE", ''],
	["EAT", 'disabled'],
	["WEAR", 'disabled']
];

const menu = [
	[["WORKOUT", "BUILDER"], "/exercise"],
	[["MY", "WORKOUTS"], "/myworkout"],
	[["PRECONFIGURED", "WORKOUTS"], "/workout"],
	[["MY", "GOALS"], "/mygoals"]
]


class f2xMenu extends Component {
	constructor(props){
		super(props);
		
		let menu = 0;
		
		switch(location.pathname.split("/")[1]){
			case 'exercise':
				menu = 1;
				break;
				
			case 'myworkout':
				menu = 2;
				break;
				
			case 'workout':
				menu = 3;
				break;
			
			case 'mygoals':
				menu = 4;
				break;
			
			default:
				menu = 0;
				break;
		}
		
		this.state = {
			category: 0,
			menu: menu
		}
		
		this.changeCategory = this.changeCategory.bind(this);
		this.changeMenu = this.changeMenu.bind(this);
	}
	
	componentWillReceiveProps(nextProps){
		let menu = 0;
		
		switch(nextProps.title.title){
			case 'WORKOUT BUILDER':
				menu = 1;
				break;
			
			case 'MY WORKOUTS':
				menu = 2;
				break;
			
			case 'PRECONFIGURED':
				menu = 3;
				break;
			
			default:
				break;
		}
		
		this.setState({
			menu: menu
		})
	}
	
	
	changeCategory(id){
		this.setState({category: id})
	}
	
	changeMenu(id, url){
		resetWorkout();
		
		getFX2DB( F2xDB['workoutsUser'] );
		
		browserHistory.push(url)
		
		this.setState({menu: id})
	}
	
	
	
	
	render() {
		let menuRender = '';
		switch(this.state.category){
			case 0:
				menuRender = (<Menu list={menu} onClick={this.changeMenu} slc={this.state.menu} />);
				break;
			
			default:
				break;
		}
		
		const iconLogoCenter = location.pathname === '/' ? (<img src={ICON_LOGO} alt="" className="logoCenterImg" />) : '';
		
		return (
			<div className="f2x-header-menu">
				<div className="pc">
					<div className="f2x-header-menu-category">
						<F2xDropdown list={category} style={{width: '105px', fontSize: '12px', borderBottomWidth: 0}} styleItems={{fontSize: '11px'}} className="separated normal-font" onChange={ (i) => this.changeCategory(i) } value={this.state.category} />
					</div>
					
					
					<div className="f2x-header-menu-items">
						{menuRender}
					</div>
				</div>
				
				<div className="f2x-header-nav-mobile mobile">
					<TitleMobile />
					{iconLogoCenter}
				</div>
				
				<div className="clear" />
			</div>
		)
	}
}


mapStateToProps = (state) => {
	const { title } = state;
	
	return {
		title: title
	}
}

const F2xMenu = connect(
	mapStateToProps
)(f2xMenu);
	
export default F2xMenu;