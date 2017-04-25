import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';


/*
 * Redux
 */
import { connect } from 'react-redux'
import { setVisibilityModal, ModalVisibilityFilters, ModalTypes } from '../../actions'



/*
 * Global Vars & Functions
 */
import { store } from '../../';
import { MURL, isMobile } from '../../data/data';


/*
 * Style
 */
import './F2xLogo.css';



/*
 * Images
 */
import ICON_CLOSE from '../../media/Icon_Close.svg';
import ICON_USER from '../../media/usr_icon.svg';
import ICON_LOGO from '../../media/blank.svg';
import ICON_HAMBURGER from '../../media/Icon_Hamburger.svg';
import ICON_HAMBURGER_WHITE from '../../media/Icon_Hamburger_white.svg';
import ICON_GEAR from '../../media/gear.svg';





const MobileMenuItems = ({items, slc}) => (
	<ul className="f2x-mobile-menu-items">
		{
			items.map(
				(item, i) =>
					<li key={i} className={i === slc ? 'active' : ''}>{item}</li>
			)
		}
	</ul>
)

const MobileMenu2Items = ({items, toggle}) => (
	<ul className="f2x-mobile-menu2-items">
		{
			items.map(
				(item, i) =>
					<li key={i} onClick={() => {toggle(); browserHistory.push('/'+ item.url);} }>{item.name}</li>
			)
		}
	</ul>
)


const menuUser = ({name, avatar, toggle, status, onClick}) => {
	
	const gearIcon = status ? (<div className="f2x-gear-icon" style={{backgroundImage: 'url('+ ICON_GEAR +')'}} onClick={(e) => { e.stopPropagation(); e.preventDefault(); toggle(); browserHistory.push('settings');}}></div>) : '';
	
	return (
		<div className="f2x-mobile-menu-box-user" style={{top: innerHeight - 70 +"px"}} onClick={(e) => { e.preventDefault(); if(status) {toggle(); browserHistory.push('/account');} else {onClick()} } }>
			<div style={{float: 'left', width: '35px', height: '35px', backgroundImage: 'url('+ avatar +')', borderRadius: '50%', margin: '-10px 15px 0 0'}} className="cover-img" />
			
			{name} {gearIcon}
			
			<div className="clear" />
		</div>
	);
}

const mapStateToProps = (state) => {
	const { user } = state;
	
	const newAvatar = !user.login ? ICON_USER : MURL + user.avatar;
	const userStatus = !user.login ? false : true;
	
	const newName = !user.login ? 'SIGN IN' : user.name;
	
	return {
		name: newName,
		avatar: newAvatar,
		status: userStatus
	}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: () => {
    	dispatch( setVisibilityModal(ModalVisibilityFilters.SHOW, ModalTypes.SIGN_IN, true))
    }
  }
}

const MenuUser = connect(
	mapStateToProps,
	mapDispatchToProps
)(menuUser);



class MobileMenu extends Component {
	constructor(props){
		super(props);
		
		this.state = {
			slc: 0
		}
	}
	
	render(){
		const {toggle} = this.props;
		const {slc} = this.state;
		
		return (
			<div className="f2x-mobile-menu" ref="menu" onClick={() => toggle() }>
				<div className="f2x-mobile-menu-box" onClick={(e) => e.stopPropagation()}>
					<img src={ICON_CLOSE} alt="close" className="f2x-mobile-menu-close" onClick={() => toggle() } />
					
					<center style={{padding: '35px 0 20px 0'}}>
						<img src={ ICON_LOGO } onClick={ () => {console.log(store.getState() ); toggle(); browserHistory.push('/');} } />
					</center>
					
					
					<MobileMenuItems items={[]} slc={slc} />
					
					
					<MobileMenu2Items 
						toggle={toggle} 
						items={
							[
								{
									name: "WORKOUT BUILDER",
									url: 'exercise'
								},
								{
									name: "MY WORKOUTS", 
									url: 'myworkout'
								},
								{
									name: "PRECONFIGURED WORKOUTS",
									url: 'workout'
								}
							]
						} 
					/>
					
					
					<MenuUser toggle={toggle} />
					
					{/*
					<div className="f2x-mobile-menu-box-back">
						<img src={ICON_ARROW} alt="Back" />FORD MODELS
					</div>
					*/}
				</div>
			</div>
		)
	}
}











class F2xLogo extends Component {
	constructor(props){
		super(props);
		
		this.state = {
			menu: 'none'
		}
		
		this.toggle = this.toggle.bind(this);
	}
	
	
	toggle(){
		const { menu } = this.state;
		
		this.setState({
			menu: (menu === 'none' ? 'block' : 'none')
		})
		
		
		switch( (menu === 'none' ? 'block' : 'none') ){
			case 'none':
				document.body.style.position = 'relative';
				document.body.style.left = '0';
				document.body.style.width = '100%';
				
				window['f2x-header'].style.left = '0';
				if(window['f2x-creator-name'])
					window['f2x-creator-name'].style.left = '0';
				
				
				this.refs.menu.refs.menu.style.marginLeft = -270 +"px";
				
				setTimeout(() => {
					this.refs.menu.refs.menu.style.display = 'none';
				}, 250)
				break;
			
			case 'block':
				document.body.style.position = 'absolute';
				document.body.style.left = '270px';
				document.body.style.width = '100%';
				
				window['f2x-header'].style.left = '270px';
				if(window['f2x-creator-name'])
					window['f2x-creator-name'].style.left = '270px';
				
				this.refs.menu.refs.menu.style.display = 'block';
				
				setTimeout(() => {
					this.refs.menu.refs.menu.style.marginLeft = 0;
				}, 0)
				
				break;
				
			default:
				return;
		}
	}
	
	
	render(){
		const iconHamburger = location.pathname === '/' ? ICON_HAMBURGER_WHITE : ICON_HAMBURGER;
		const iconHamburgerStyle = location.pathname === '/' ? ' iconHamburgerHome' : '';
		
		return (
			<div className="f2x-logo">
				<div className="f2x-logo-img">
		
					<Link to="/">
						<img src={ ICON_LOGO } onClick={ () => console.log(store.getState() ) } width="100" height='55' />
					</Link>
				</div>
				
				<div className="f2x-logo-menu-mobile" onClick={() => this.toggle() } style={{display: this.state.menu === 'block' || !isMobile() ? 'none' : 'block'}}>
					<div className={iconHamburgerStyle}>
						<img src={iconHamburger} alt="Menu" width="30" height="20" />
					</div>
				</div>
				
				
				{/* MOBILE MENU */}
				<MobileMenu menu={this.state.menu} toggle={this.toggle} ref="menu" />
			</div>
		)
	}
}


export default F2xLogo;