import React, { Component } from 'react';
import { connect } from 'react-redux';





/*
 * Global Vars & Functions
 */
import { uuInfo } from '../../data/data';

			
			
/*
 * Components
 */
import F2xInput from '../../components/F2xInput';
import F2xButton from '../../components/F2xButton';
import F2xTextBox from '../../components/F2xTextBox';



/*
 * Style
 */
import './F2xAccountMobile.css';



/*
 * Icons
 */
import ICON_BACK from '../../media/Icon_BackArrow.svg';








class f2xProfile extends Component {
	constructor(props) {
	    super(props);
	    
	    // Importing existing user info
		    let my = this.props.user;
		    
		    let defaultdate = ((new Date()).getFullYear() - 20) + '-1-1';
		    if (my.login === false) 
		    	my = {
				    fullName:'Daria',
				    lastName:'Reynolds',
				    username:'daria.reynolds',
				    about:'',
				    birthday: null
			    }
			    
		    if (my.birthday === null) my.birthday = defaultdate;
		    let sdate= my.birthday.split("-");
	    //
	    
	    
	    this.state = { 
		    fullName: my.fullName,
		    lastName: my.lastName,
		    userName: my.username,
		    about:my.about,
		    birthday: sdate[1] +"/"+ sdate[2] +"/"+ Number(sdate[0]),
		    bDate:{
		    	day: sdate[2],
		    	month:sdate[1],
		    	year: Number(sdate[0])
		    }
	    };
	}
	
	
	componentWillReceiveProps(my){
	    const {user} = my;
		
		console.log(my)
		if(!my) return;
		
		let defaultdate = ((new Date()).getFullYear() - 20) + '-1-1';
		    
	    if (user.birthday === null) user.birthday = defaultdate;
	    
	    let sdate = user.birthday.split("-");
	    //
	    
		this.setState(
			{ 
			    fullName: user.fullName,
			    lastName: user.lastName,
			    userName: user.username,
			    about:user.about,
			    birthday: sdate[1] +"/"+ sdate[2] +"/"+ Number(sdate[0]),
			    bDate:{
			    	day: sdate[2],
			    	month:sdate[1],
			    	year: Number(sdate[0])
			    }
		    }
	    )
	}
	
	update(){
		let tForm = this.evalForm();
		
		
		this.setState(
			Object.assign({}, this.state,{
		    		value: {
			    		userName: tForm.userName,
			    		fullName: tForm.fullName,
			    		lastName: tForm.lastName,
			    		about: tForm.about,
			    		date: tForm.bDate
			    	}
		        })
	    )		
	}
	
	evalForm(){
		let tForm = {}														   // We defined the form values here
		tForm.userName = this.refs.uUname.refs.userName.value;				   // Component REF +  subcomponent REF		   	   
		tForm.fullName = this.refs.uFname.refs.fullName.value;
		tForm.lastName = this.refs.uLname.refs.lastName.value;
		tForm.about = this.refs.uAbout.refs.about.value;
		if (this.refs.uBdate.refs.bDate.value !== undefined) {
			const dateValue = this.refs.uBdate.refs.bDate.value.split("/");
			
			const newYear = dateValue[2] || 0;
			const newMonth = dateValue[0] || 0;
			const newDay = dateValue[1] || 0;
			
			tForm.bDate = newYear +"-"+ newMonth +"-"+ newDay;
				
		} else {
			tForm.bDate = Object.assign({}, {
				day: this.state.bDate.day - 1,
				month: this.state.bDate.month - 1,
				year: this.state.bDate.year - ((new Date()).getFullYear() - 80)
			})
		}
		return tForm;
	}
	
	saveThisSection(){
		let tForm = this.evalForm();
		// back transform to user original properties
		let uprops = {}
		
		uprops.username = tForm.userName;
		uprops.about = tForm.about;
		uprops.first_name = tForm.fullName;
		uprops.last_name = tForm.lastName;
		uprops.date_of_birth = tForm.bDate;
	
		//uprops.date_of_birth = [(new Date()).getFullYear() - 80 + Number(tForm.bDate.year),tForm.bDate.month + 1,tForm.bDate.day + 1].join("-")
		
		uuInfo(uprops);
	}	
	
	render(){
		const { back } = this.props;
		
		return (
			<div>
				<div className="f2x-account-top">
					<div className="back" style={{backgroundImage: 'url('+ ICON_BACK +')'}} onClick={() => back()} /> <span>PROFILE</span>
				</div>
				
				<div className="f2x-account-content">
					<div className="f2x-account-input float-l">
						<br />
						<F2xInput   placeholder="First Name" 
									style={{paddingLeft: '0', paddingRight: '0', width: '100%'}} 
									styleBox={{margin: '0', width: '100%'}} 
									value={this.state.fullName}
									ref="uFname" 
									refID="fullName"
									onChange={ (e) => { this.update(e) } }   />
					</div>
					
					<div className="f2x-account-input float-r">
						<br />
						<F2xInput   placeholder="Last Name" 
									style={{paddingLeft: '0', paddingRight: '0', width: '100%'}} 
									styleBox={{margin: '0', width: '100%'}} 
									value={this.state.lastName}
									ref="uLname" 
									refID="lastName"
									onChange={ (e) => { this.update(e) } }   />
					</div>					
					
					<div className="clear" />
					
					<div className="f2x-account-input">
						<br />
						<F2xInput 	placeholder="Username" 
									style={{paddingLeft: '0', paddingRight: '0', width: '100%'}} 
									styleBox={{margin: '0', width: '100%'}} 
									value={this.state.userName}
									ref="uUname" 
									refID="userName"
									onChange={ (e) => { this.update(e) } }   />
					</div>			
					
					<div className="clear" />
					
					<div className="f2x-account-input">
						<br />
						<F2xInput 	placeholder="BIRTHDAY (MM/DD/YYYY)" 
									style={{paddingLeft: '0', paddingRight: '0', width: '100%'}} 
									styleBox={{margin: '0', width: '100%'}} 
									value={this.state.birthday}
									ref="uBdate" 
									refID="bDate"
									onChange={ (e) => { this.update(e) } }   />
					</div>
					
					
					<div className="f2x-account-input">
						ABOUT<br />
						<F2xTextBox placeholder="Tell us about yourself." 
									style={{width: '338px', height: '72px', borderWidth: 0, padding: 0, marginTop: '4px'}} 
									ref="uAbout" 
									refID="about"
									value={this.state.about}
									onChange={ (e) => { this.update(e) } } />
					</div>
					
					<div className="f2x-account-saves alignButton">
						<F2xButton 	name="SAVE" 
									className="f2x-button-black f2x-button-big separated f2x-account-share-button" 
									onClick={ () => this.saveThisSection() } />
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	const { user } = state;
	
	return {
		user: user
	}
}

const F2xProfile = connect(
	mapStateToProps
)(f2xProfile);


export default F2xProfile;