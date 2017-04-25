import React, { Component } from 'react';
import { connect } from 'react-redux'



import { updateAvatarRequest, MURL } from '../../data/data';




/*
 * Global Vars & Functions
 */
import { uuInfo } from '../../data/data';

let day  = [...Array(31)].map(
				(x, i) => {
					return i+1
				}
			);
			
let month = [...Array(12)].map(
				(x, i) => {
					return i+1
				}
			);
			
let year = [...Array(80)].map(
				(x, i) => {
					return ( (new Date()).getFullYear() - 80 ) +i
				}
			);
			
			

/*
 * Components
 */
import F2xIcon from '../../components/F2xIcon';
import F2xInput from '../../components/F2xInput';
import F2xButton from '../../components/F2xButton';
import F2xTextBox from '../../components/F2xTextBox';
import F2xDropdown from '../../components/F2xDropdown';





/*
 * Style
 */
import './F2xAccountProfile.css';




/*
 * Icons
 */
import USER_IMG from '../../media/usr_icon.svg'










/*
 * Birthday Component
 */
class F2xbirthdayControl extends Component {
	constructor(props) {
	    super(props);
	    
	   // console.log(props)
	    this.state = {
		    day: props.date.day  - 1 ,
		    month: props.date.month  - 1 ,
		    year: props.date.year - ((new Date()).getFullYear() - 80),
		}
	}		
	
	update(mode, i){
		console.log(mode,i)
		let upd = {}
		switch(mode){
			case "d":
				upd.day = i;
			break;
			case "m":
				upd.month = i;
			break;
			case "y":
				upd.year =  i;
			break;
			default:
			break;						
		}
		//this.refs.refID.value = 
		this.refs[this.props.refID].value =	Object.assign({}, this.state, upd);
		this.setState(
			Object.assign({}, this.state, upd )
		)
		this.props.onChange();	
	}
	
	render(){
		const { refID } = this.props;
		return(
				<div className="f2x-account-input" ref={refID}>
					<span style={{color: '#9e9e9e'}}>Birthday (MM/DD)</span>
					<br />
					
					<F2xDropdown list={month} style={{marginRight: '10px', paddingLeft: '10px', width: '50px'}} value={this.state.month} 
								onChange={ (e) => this.update("m",e) } />
													
					<F2xDropdown list={day} style={{marginRight: '10px', paddingLeft: '10px', width: '50px'}} value={this.state.day} 
								onChange={ (e) => this.update("d",e) } />
					
					<F2xDropdown list={year} style={{marginRight: '10px', paddingLeft: '10px', width: '70px', display: 'none'}} value={this.state.year} 
								onChange={ (e) => this.update("y",e) } />
				</div>			
		)
	}
}











/*
 * Account Component
 */
class AccountProfile extends Component { 
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
		    bDate:{
		    	day: sdate[2],
		    	month:sdate[1],
		    	year: Number(sdate[0])
		    }
	    };

	    this.evalForm = this.evalForm.bind( this );    							// Generic UPDATE inner function for our Forms	    
	    this.update = this.update.bind( this );    							 	// Generic UPDATE inner function for our Forms
	    this.saveThisSection = this.saveThisSection.bind( this );    		    // Generic SAVE DATA inner function for our Forms
	    this.uploadAvatar = this.uploadAvatar.bind( this )
	    this.upload = this.upload.bind( this )
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
	
	uploadAvatar(){
		console.log("uploading")
		this.refs.avatarUploader.click() 
	}
	
	
	
	evalForm(){
		let tForm = {}														   // We defined the form values here
		tForm.userName = this.refs.uUname.refs.userName.value;				   // Component REF +  subcomponent REF		   	   
		tForm.fullName = this.refs.uFname.refs.fullName.value;
		tForm.lastName = this.refs.uLname.refs.lastName.value;
		tForm.about = this.refs.uAbout.refs.about.value;
		if (this.refs.uBdate.refs.bDate.value !== undefined) {
			tForm.bDate = this.refs.uBdate.refs.bDate.value;	
		} else {
			tForm.bDate = Object.assign({}, {
				day: this.state.bDate.day - 1,
				month: this.state.bDate.month - 1,
				year: this.state.bDate.year - ((new Date()).getFullYear() - 80)
			})
		}
		return tForm;
	}
	
	componentWillReceiveProps(nextProps){
		const { user } = nextProps;
		
		
		let defaultdate = ((new Date()).getFullYear() - 20) + '-1-1';
		    
	    if (user.birthday === null || user.birthday === undefined) user.birthday = defaultdate;
	    
	    
	    let sdate = user.birthday.split("-");
	    //
	    
		this.setState(
			{ 
			    fullName: user.fullName,
			    lastName: user.lastName,
			    userName: user.username,
			    about:user.about,
			    bDate:{
			    	day: sdate[2],
			    	month:sdate[1],
			    	year: Number(sdate[0])
			    }
		    }
	    )
	}
	
	
	
	update(){
		let tForm = this.evalForm()		
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
	
	
	saveThisSection(){
		let tForm = this.evalForm();
		// back transform to user original properties
		let uprops = {}
		uprops.username = tForm.userName;
		uprops.about = tForm.about;
		uprops.first_name = tForm.fullName;
		uprops.last_name = tForm.lastName;
		/*
		if (tForm.fullName !== ''){
			if (tForm.fullName.indexOf(" ") !== -1){
				
				let nameparts = tForm.fullName.split(' ');
				uprops.first_name = nameparts[0]
				uprops.last_name = tForm.fullName.substr(nameparts[0].length + 1)
				
			} else {
				uprops.first_name = tForm.fullName
			}
		}*/
		
		uprops.date_of_birth = [(new Date()).getFullYear() - 80 + Number(tForm.bDate.year),tForm.bDate.month + 1,tForm.bDate.day + 1].join("-")
		
		uuInfo(uprops);
	}	
	
	
	render(){
		let uAv = this.props.user.avatar ? MURL + this.props.user.avatar: USER_IMG
		
		
		const registeredPlan = this.props.plan.length ? (<div className="f2x-account-platinum">PLATINUM MEMBER</div>) : '';
		
		if(this.props.user.login === false)
			return (<div />)
		else
			return (	
				<div className="f2x-account-data">
					YOUR ACCOUNT
					
					{registeredPlan}
					
					<div className="f2x-account-data-user cursor">
						<F2xIcon icon={uAv} className="f2x-account-data-user-img" onClick={(e) => this.uploadAvatar(e)}/>
						<input type="file" className="hidden" ref="avatarUploader" accept="image/*" onChange={this.upload}/>
						
						<div className={`f2x-account-data-user-edit${uAv.indexOf('no_avatar.jpg') !== -1 ? ' visible' : ''}`} onClick={(e) => this.uploadAvatar(e)}>edit</div>
					</div>
					
					
					<div className="f2x-account-input float-l">
						<br />
						<F2xInput   placeholder="First Name" 
									style={{paddingLeft: '0', paddingRight: '0', width: '160px'}} 
									styleBox={{margin: '0', width: '160px'}} 
									value={this.state.fullName}
									ref="uFname" 
									refID="fullName"
									onChange={ (e) => { this.update(e) } }   />
					</div>
					
					<div className="f2x-account-input float-r">
						<br />
						<F2xInput   placeholder="Last Name" 
									style={{paddingLeft: '0', paddingRight: '0', width: '160px'}} 
									styleBox={{margin: '0', width: '160px'}} 
									value={this.state.lastName}
									ref="uLname" 
									refID="lastName"
									onChange={ (e) => { this.update(e) } }   />
					</div>					
					
					<div className="clear" />
					
					<div className="f2x-account-input">
						<br />
						<F2xInput 	placeholder="Username" 
									style={{paddingLeft: '0', paddingRight: '0', width: '368px'}} 
									styleBox={{margin: '0', width: '370px'}} 
									value={this.state.userName}
									ref="uUname" 
									refID="userName"
									onChange={ (e) => { this.update(e) } }   />
					</div>
					
					
					<F2xbirthdayControl ref="uBdate" refID="bDate"  date={this.state.bDate} onChange={ (e) => this.update(e) }/>
					
					
					<div className="f2x-account-input hidden">
						ABOUT<br />
						<F2xTextBox placeholder="Tell us about yourself." 
									style={{padding: '10px 15px', width: '338px', height: '72px'}} 
									ref="uAbout" 
									refID="about"
									value={this.state.about}
									onChange={ (e) => { this.update(e) } } />
					</div>
					<br/>
					<br/>
					<div className="f2x-account-saves">
						<F2xButton 	name="SAVE CHANGES" 
									className="f2x-new-button-black small-font separated" 
									style={{height: '52px', width: '188px', fontSize: '11px'}}
									onClick={ () => this.saveThisSection() } />
					</div>
					

				</div>
			)
	}
}




const f2xAccountProfile = ({user, plan}) => (
	<AccountProfile user={user} name={user.name} plan={plan} />
);


const mapStateToProps = (state) => {
	const { user, plan } = state;
	
	return {
		user: user,
		plan: plan.plan
	}
}

const F2xAccountProfile = connect(
	mapStateToProps
)(f2xAccountProfile);


export default F2xAccountProfile;