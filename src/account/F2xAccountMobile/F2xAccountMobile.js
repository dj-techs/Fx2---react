import React, { Component } from 'react';
import { connect } from 'react-redux'
import { browserHistory } from 'react-router';



/*
 * Global Vars & Functions
 */
import { MURL, logOutRequest, updateAvatarRequest, goBack } from '../../data/data';
import { setVisibilityModal, ModalVisibilityFilters, ModalTypes } from '../../actions'



/*
 * Pages
 */
import F2xProfile from './F2xProfile';
import F2xEmailPassword from './F2xEmailPassword';
import F2xBilling from './F2xBilling';
import F2xMembership from './F2xMembership';



/*
 * Components
 */
import F2xButton from '../../components/F2xButton';



/*
 * Style
 */
import './F2xAccountMobile.css';



/*
 * Images
 */
import ICON_CLOSE from '../../media/Icon_Close.svg';











const menuButtons = ({dispatch}) => (
	<div className="accountBottom">
		<F2xButton name="INVITE FRIENDS" 
			className="f2x-button-black-invert f2x-button-small-border" 
			style={{padding: '8px 10px', fontSize: '12px'}} 
			onClick={
				() => 
					dispatch( setVisibilityModal(ModalVisibilityFilters.SHOW, ModalTypes.INVITE_FRIEND) )
			}
		/>
		
		<div className="signOut">
			<u onClick={() => {logOutRequest(); browserHistory.push('/');} }>Sign Out</u>
		</div>
	</div>
)

const MenuButtons = connect()(menuButtons);






class f2xAccount extends Component {
	uploadAvatar(){
		console.log("uploading")
		this.refs.avatarUploader.click() 
	}
	
	upload(e){
		e.preventDefault()
		let files = (e.dataTransfer !== undefined)?e.dataTransfer.files:e.target.files; // FileList object.
		let f = files[0]		
		let reader = new FileReader();
	    reader.onload = (
	    	(theFile) => {
		        return (n) => {
				    updateAvatarRequest(theFile)
		        };
		    }
	    )(f);
		reader.readAsDataURL(f);		
	}
	
	render(){
		const { user, move } = this.props;
		const { avatar, name } = user;
		
		return (
			<div style={{textAlign: 'center', minHeight: '568px', position: 'relative', height: '100%' }}>
				<div className="f2x-mobileSettings-header">
					<div>ACCOUNT</div>
					<img src={ICON_CLOSE} alt="Close" className="close" onClick={() => goBack()} width="25" />
				</div>
				
				<div className="clear" />
				
				<div className="avatar cover-img" style={{backgroundImage: 'url('+ MURL + avatar +')'}} onClick={(e) => this.uploadAvatar(e)}>
					<span>EDIT</span>
				</div>
				
				<input type="file" className="hidden" ref="avatarUploader" accept="image/*" onChange={this.upload}/>
				
				<div className="userName">
					{name}
				</div>
				
				<ul>
					<li onClick={() => move(1)}>PROFILE</li>
					<li onClick={() => move(2)}>EMAIL & PASSWORD</li>
					<li onClick={() => move(3)}>MEMBERSHIP</li>
					<li onClick={() => move(4)}>BILLING</li>
				</ul>
				
				<MenuButtons />
			</div>
		)
	}
}


const mapStateToProps = (state) => {
	const { user } = state;
	
	return {
		user: user
	}
}

const F2xAccount = connect(
	mapStateToProps
)(f2xAccount);




class F2xAccountMobile extends Component {
	constructor(props){
		super(props);
		
		this.state = {
			page: 0
		}
		
		this.movePage = this.movePage.bind(this);
	}
	
	movePage(id){
		this.setState({
			page: id
		})
	}
	
	render(){
		let renderPage = (<F2xAccount move={this.movePage}  />);
		
		switch(this.state.page){
			case 1:
				renderPage = (<F2xProfile back={() => this.movePage(0)} />);
				break;
				
			case 2:
				renderPage = (<F2xEmailPassword back={() => this.movePage(0)} />);
				break;
				
			case 3:
				renderPage = (<F2xMembership back={() => this.movePage(0)} />);
				break;
				
			case 4:
				renderPage = (<F2xBilling back={() => this.movePage(0)} />);
				break;
				
			default:
				break;
		}
		return (
			<div className="mobile">
				{renderPage}
			</div>
		)
	}
}



export default F2xAccountMobile;