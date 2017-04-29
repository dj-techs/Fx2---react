import { browserHistory } from 'react-router';

import { setWorkoutHome, setExercises, setFilters, setTrainers, setWorkouts , setMyWorkouts } from '../actions';
import { setVisibilityModal, ModalVisibilityFilters, ModalTypes , setUserState, setEvalJoin , setEvalLogin, setEvalChangePassword,  setEvalForgotPassword, setHomeImage, setCard, setPlan } from '../actions'



/*
 * Global Vars & Functions
 */
import { actWorkout, saveWorkout } from './workout_tools';
import { store } from '../';






const getStoredToken = function(){
	if (localStorage.tID !== '' && localStorage.tID !== undefined && localStorage.iC !=='' && localStorage.iC !==undefined){
		return {token: JSON.parse(localStorage.tID)}
	} else {
		return null
	}	
}

let gtoken = getStoredToken();

let userInfo = null; 					//getStoredToken();





export const guInfo = () => (userInfo !== null ? userInfo.user : null);




/**
  * API Constants
  */
export const MURL = 'https://f2x-stage.appspot.com';//'https://x-time-149617.appspot.com'; //'https://f2x-stage.appspot.com';

const ver = 'Web/1.0.0';
const contentType = 'application/json';


/**
  * API Generic Call
  */
const sendRequest = (authObj , mcb) => {
	if (authObj === undefined) return false;
	
	const aname = authObj.name;
	const endpoint = authObj.epoint;
	const cb = authObj.callback;
	
	
	
	var xhr = new XMLHttpRequest();
	
	const turl = '/api/v0/' + endpoint + '/?format=json';
	
	xhr.open('GET', turl, true);
	
	xhr.setRequestHeader('Authorization', ['Token ', gtoken.token].join(" "));
	xhr.setRequestHeader('X-F2X-Client', ver);
	xhr.setRequestHeader('Content-Type', contentType);
	
	
	xhr.onload = function() {
		if (xhr.readyState === 4 && xhr.status === 200) {
			
			cb && 	cb( { 
						endpoint: aname, 
						data: xhr.responseText && xhr.responseText.charAt(0) === '{' ? JSON.parse( xhr.responseText ) : {}
					});
			
			
			mcb && mcb();
		}
	};
	
	
	xhr.send();
	
	return {};
}











// App Data Init
export const F2xDB = {
	workoutsPublic:{
		name: "workoutsPublic",
		endpoint: "workout/public",	
		data:{results:[]},
		al:0
	},	
	filters:{
		name: "filters",
		endpoint: "filter",	
		data:{results:[]},
		al:0
	},
	exercise:{
		name: "exercise",
		endpoint: "exercise",	
		data:{results:[]},
		al:0
	},
	workoutsUser:{
		name: "workoutsUser",
		endpoint: "workout/user",	
		data:{results:[]},
		al:1
	},
	trainer:{
		name: "trainer",
		endpoint: "trainer",	
		data:{results:[]},
		al:0
	},
	homeImage: {
		name: "homeImage",
		endpoint: "content/home-image",	
		data:{results:[]},
		al:0
	},
	workoutsHome: {
		name: "workoutsHome",
		endpoint: "content/home-workout",	
		data:{results:[]},
		al:0
	}
}

const processResults = (stream) => {
	if(!stream.data.results) return;
	
	const results = stream.data.results;
	const state = store.getState();
	
	switch(stream.endpoint){
		case 'exercise':
			const exercises = state.exercises;
			
			store.dispatch( setExercises(results, exercises.sort, exercises.sport, exercises.tipe, exercises.trainer, exercises.intensity, exercises.muscle) );

			break;
		
		case 'workoutsPublic':
			store.dispatch( setWorkouts(results, state.workouts.sort) );
			
			break;
		
		case 'workoutsHome':
			store.dispatch( setWorkoutHome(results) );
			break;
			
		case 'workoutsUser':
			store.dispatch( setMyWorkouts(results, state.myworkouts.sort) );
			break;			
		
		case 'filters':
			let obj = {
				sport: ['All'],
				type: ['All'],
				intensity: [],
				musclegroups: []
			}
			
			results.map(
				(item) =>{
					obj[ item.kind.toLowerCase().replace(/ /g, "").replace(/_/g, "") ].push( item.title )
					return '';
				}
			)
			
			
			store.dispatch( setFilters(obj) );
			break;
			
			
		case 'trainer':
			let tobj = ['All'];
			
			results.map(
				(item) =>{
					tobj.push( item.name )
					return '';
				}
			)
			
			store.dispatch( setTrainers(tobj) );
			
			break;
			
		case 'homeImage':
			store.dispatch( setHomeImage(results) );
			
			break;					
		
		default:
			break;
	}
}


export const getFX2DB = (ep, cb, label) => {
	if (label !== undefined) console.log(label)
	if (gtoken === null  || gtoken === -1) return;
	
	let ptocall = {
		name: ep.name,
		epoint: ep.endpoint,
		token: gtoken,
		def:{},
		callback:function(stream){
			F2xDB[stream.endpoint].data = stream.data;
			processResults(stream);
		}
	}
	
	if (ep.al === 0) {
		sendRequest(ptocall, cb)
	} else {
		if (!gtoken.guest) sendRequest(ptocall, cb)
	}
}



const initUserFX2DB = () => {
	console.log("Initializing User DB")
	
	getFX2DB( F2xDB['workoutsUser'] );
	getStripeCard();
	getPlans();
}


const getGuestToken = (callback) => {
	var xhr = new XMLHttpRequest();
	
	xhr.open('POST', '/api/v0/token/guest/?format=json', true);
	
	xhr.setRequestHeader('X-F2X-Client', ver);		
	xhr.setRequestHeader('Content-Type', contentType);
	
	
	xhr.onload = function() {
		if (xhr.readyState === 4) {
	    	if (xhr.status !== 200)
	    		return {err: 'API Request failed with status ' + xhr.status };
	    
			console.log("Getting anonymous token")	
			
			const resp = JSON.parse(xhr.responseText);
			
			callback(resp)
		}
	}
	
	xhr.send();
	
	return {};	
}



export const initNewWorkout = () => {
	return {
		uid:'',
		user: '',
		exercises:[],
		title: 'Untitled Workout',
		duration: 0,
		calories:0,
		muscle_groups:[],
		wardrobe:[]
	}
}


export const launchDB = () => {
	// Initializing DB Loads
	console.log("Initializing Public DB access");
	
	getFX2DB( F2xDB['homeImage']);
	getFX2DB( F2xDB['workoutsHome'], () => {
		getFX2DB( F2xDB['workoutsPublic'] ,  () => {
			getFX2DB( F2xDB['exercise'] );
			getFX2DB( F2xDB['filters'] );
			getFX2DB( F2xDB['trainer'] );
			
		})
	});

	
}


const setUpAuthStorage = (savein) => {
	launchDB();
	
	userInfo.ts = new Date();
	
	const userDatas = userInfo.user;
	
	let username = userDatas ? (userDatas.first_name === ''  ? userDatas.username : `${userInfo.user.first_name} ${userInfo.user.last_name}`) : userDatas.username;
	
	
	if(!savein){
		store.dispatch(
			setVisibilityModal(ModalVisibilityFilters.HIDE)
		);
	}
	
	store.dispatch( 
		setUserState(true, username, userDatas.username, userDatas.avatar, userDatas.first_name, userDatas.last_name, userDatas.date_of_birth, userDatas.about, userDatas.email, userDatas.invite_url, userDatas.subscriptions)
	);
	
	
	gtoken = {};
	
	gtoken.token = userInfo.token;
	gtoken.ts = new Date();
	gtoken.guest = false;
	
	initUserFX2DB();
	
	localStorage.tID = JSON.stringify(userInfo.token);
}


export const requestPasswordReset = function( user, call ){
	var xhr = new XMLHttpRequest();
	
	xhr.open('POST', '/api/v0/user/password_reset/', true);
	
	xhr.setRequestHeader('Authorization', ['Token ', gtoken.token].join(" "));
	xhr.setRequestHeader('X-F2X-Client', ver);	
	xhr.setRequestHeader('Content-Type', contentType);


	xhr.onload = function() {
		if (xhr.status === 200 || xhr.status === 201 ) {
			store.dispatch( setEvalForgotPassword({success: true}) )
			// const resp = JSON.parse(decodeURIComponent(xhr.responseText));
	        
	        // store.dispatch( setVisibilityModal(ModalVisibilityFilters.SHOW, ModalTypes.RESET_PASSWORD, {status: 1, user: user, data: resp.status}) );
		} else {
			store.dispatch( setEvalForgotPassword({success: false}) )
			// const merr = JSON.parse(decodeURIComponent(xhr.responseText));
			
			// store.dispatch( setVisibilityModal(ModalVisibilityFilters.SHOW, ModalTypes.RESET_PASSWORD, {status: 2, user: user, data: merr.error}) );
		}
		
	    call && call(2);
	};
	
	
	xhr.send(
		JSON.stringify({
			username: user
		})
	);


}


export const passwordReset = function(token, password, errorCallback){
	var xhr = new XMLHttpRequest();
	
	xhr.open('POST', '/api/v0/user/password_reset_set/', true);
	
	xhr.setRequestHeader('Authorization', ['Token ', gtoken.token].join(" "));
	xhr.setRequestHeader('X-F2X-Client', ver);	
	xhr.setRequestHeader('Content-Type', contentType);


	xhr.onload = function() {
		if (xhr.status === 200 || xhr.status === 201 ) {
			userInfo = JSON.parse(xhr.responseText);
			
	        setUpAuthStorage();
	        
	        localStorage.iCc = "true";
	        
	        browserHistory.push("/");
		} else {
			const merr = JSON.parse(decodeURIComponent(xhr.responseText));
			
			errorCallback(merr);
			
			store.dispatch( setUserState(false) );
		}	
	};
	
	
	xhr.send(
		JSON.stringify({
			token: token,
			new_password: password
		})
	);	
}


const updateUserRequest = function(){
	var xhr = new XMLHttpRequest();
	
	xhr.open('PUT', '/api/v0/user/?format=json', true);
	
	xhr.setRequestHeader('Authorization', ['Token ', gtoken.token].join(" "));
	xhr.setRequestHeader('X-F2X-Client', ver);	
	xhr.setRequestHeader('Content-Type', contentType);


	xhr.onload = function() {
		if (xhr.status !== 200 && xhr.status !== 201 ) {
			var merr = JSON.parse(decodeURIComponent(xhr.responseText));
				  
			store.dispatch( setEvalLogin({error: merr.error}) )
		}	
	};
	
	xhr.send(
		JSON.stringify(userInfo.user)
	);	
}




export const logOutRequest = function(){
	var xhr = new XMLHttpRequest();
	
	xhr.open('POST', '/api/v0/auth/logout/?format=json', true);
	
	xhr.setRequestHeader('Authorization', ['Token ', gtoken.token].join(" "));
	xhr.setRequestHeader('X-F2X-Client', ver);	
	xhr.setRequestHeader('Content-Type', contentType);


	xhr.onload = function() {
		if (xhr.status === 204){
			userInfo = null;
			
			gtoken.tokenUser = undefined;
			
			localStorage.iC = '0';
			localStorage.removeItem('tID');
			localStorage.removeItem('iCc');
			
			store.dispatch( setUserState(false) );
			
			store.dispatch( setCard(false) );
			store.dispatch( setPlan([]) );
			store.dispatch( setMyWorkouts([]) );
			
			
			browserHistory.push('/'); 
		}
	};
	
	
	xhr.send();	
}


const updateUserPassRequest = function(data){
	var xhr = new XMLHttpRequest();
	
	xhr.open('POST', '/api/v0/user/password/?format=json', true);
	
	xhr.setRequestHeader('Authorization', ['Token ', gtoken.token].join(" "));
	xhr.setRequestHeader('X-F2X-Client', ver);	
	xhr.setRequestHeader('Content-Type', contentType);


	xhr.onload = function() {
		if (xhr.status === 200 || xhr.status === 201 ) {
			logOutRequest();
			
			store.dispatch( setVisibilityModal(ModalVisibilityFilters.SHOW, ModalTypes.SIGN_IN))
			
		} else {
			const merr = JSON.parse(decodeURIComponent(xhr.responseText));
			
			store.dispatch( setEvalChangePassword({error: merr}) )
		}	
	};
	
	
	xhr.send(
		JSON.stringify(data)
	);	
}






/**
 PAYPAL
**/

export const getPaypalToken = (cb) => {
	var xhr = new XMLHttpRequest();
	
	xhr.open('POST', '/api/v0/payment/paypal/token/', true);
	
	xhr.setRequestHeader('Authorization', ['Token ', gtoken.token].join(" "));
	xhr.setRequestHeader('X-F2X-Client', ver);	
	xhr.setRequestHeader('Content-Type', contentType);
	
	
	//console.log("getPaypalToken cb " , cb)
	
	xhr.onload = function() {
		if (xhr.status === 200 || xhr.status === 201 ) {
		    const resp = JSON.parse(xhr.responseText);
		    //console.log("getPaypalToken resp " , resp)
			cb & cb(resp);
		}	    
	};	

	xhr.send();	
}


export const buyPaypalWorkout = (nonce, id, cb) => {
	var xhr = new XMLHttpRequest();
	
	xhr.open('POST', '/api/v0/payment/paypal/purchase/', true);
	
	xhr.setRequestHeader('Authorization', ['Token ', gtoken.token].join(" "));
	xhr.setRequestHeader('X-F2X-Client', ver);	
	xhr.setRequestHeader('Content-Type', contentType);
	
	xhr.onload = function() {
		if (xhr.status === 200 || xhr.status === 201 ) {
		    getFX2DB( F2xDB['workoutsUser'] );
			getFX2DB( F2xDB['workoutsPublic'] );
			
			cb && cb();
		}	    
	};	

	xhr.send(
		JSON.stringify({
			nonce: nonce,
			workout_uid: id
		})
	);	
}



export const buyPaypalSubscription = (nonce, cb) => {
	var xhr = new XMLHttpRequest();
	
	xhr.open('POST', '/api/v0/payment/paypal/subscribe/', true);
	
	xhr.setRequestHeader('Authorization', ['Token ', gtoken.token].join(" "));
	xhr.setRequestHeader('X-F2X-Client', ver);	
	xhr.setRequestHeader('Content-Type', contentType);
	
	xhr.onload = function() {		
		//console.log(xhr.responseText)

		//console.log("Paypal", xhr)
		if (xhr.status === 200 || xhr.status === 201 ) {
		    getFX2DB( F2xDB['workoutsUser'] );
			getFX2DB( F2xDB['workoutsPublic'] );
			getPlans();
			
			cb && cb();
		}	    
	};	
	
	console.log(nonce);
	
	xhr.send(
		JSON.stringify({
			nonce: nonce,
			plan: 'monthly-1'
		})
	);
}








let clientToken;
let cbWorkoutPaymentReceive;
let cbSubscriptionPaymentReceive;

export let checkoutWorkout;
export let checkoutSubs;

export const mountWorkoutBuyCallback = (cb) => {
	cbWorkoutPaymentReceive = cb;
}

export const mountSubscriptionBuyCallback = (cb) => {
	cbSubscriptionPaymentReceive = cb;
}


const renewUserTokenRequest = function(){
	var xhr = new XMLHttpRequest();
	
	xhr.open('POST', '/api/v0/token/refresh/?format=json', true);
	
	xhr.setRequestHeader('Authorization', ['Token ', gtoken.token].join(" "));
	xhr.setRequestHeader('X-F2X-Client', ver);
	xhr.setRequestHeader('Content-Type', contentType);


	xhr.onload = function() {
		const response = xhr.responseText.charAt(0) === '{' ? JSON.parse(xhr.responseText) : {};
		
		if (xhr.status === 200 || xhr.status === 201 ) {
		    userInfo = response;
		    
		    setUpAuthStorage();
		    
		    localStorage.iCc = "true";
		    
		    
		    
		    getPaypalToken((resp) => {
				clientToken = resp.client_token;
				
				window['braintree'].setup(
					clientToken, 
					"custom", 
					{
						onReady: (integration) => {
							
					    	checkoutWorkout = integration;
					  	},
						paypal: {
							singleUse: false,
						    amount: 2.99,
						    currency: 'USD',
						    locale: 'en_US',
						    headless: true
						},
						onPaymentMethodReceived: (obj) => {
							cbWorkoutPaymentReceive && cbWorkoutPaymentReceive(obj);
						}
					}
				);

				
				window['braintree'].setup(
					clientToken, 
					"custom", 
					{
						onReady: (integration) => {
					    	checkoutSubs = integration;
					  	},
						paypal: {
							singleUse: false,
						    amount: 12.99,
						    currency: 'USD',
						    locale: 'en_US',
						    headless: true
						},
						onPaymentMethodReceived: (obj) => {
							cbSubscriptionPaymentReceive && cbSubscriptionPaymentReceive(obj);
						}
					}
				);
			});
			
			
			
		} else {
			userInfo = null;
			
			gtoken = {};
			
			localStorage.iC = '0';
			localStorage.removeItem('tID');
			localStorage.removeItem('iCc');
			
			store.dispatch( setUserState(false) );
			 
			getGuestToken(
				(mobj) => {
					gtoken =  mobj;
					
					if ((localStorage.iC === undefined || localStorage.iC === '') && (localStorage.iCc === undefined || localStorage.iCc === '') ) {
						localStorage.iC = '0';
					} else {
						localStorage.iC = String(Number(localStorage.iC) + 1);
					}	
							
					//if (Number(localStorage.iC)%2 === 1 && location.pathname.match("account/password") === null && location.pathname.match("invite") === null)
					//	store.dispatch( setVisibilityModal( ModalVisibilityFilters.SHOW, ModalTypes.TRY ) );
					
					
					launchDB();
					
					store.dispatch( setVisibilityModal( ModalVisibilityFilters.SHOW, ModalTypes.SIGN_IN ) );
				}
			);
			
			//const merr = JSON.parse(decodeURIComponent(xhr.responseText));
			
			
			
		}	
	};
	
	
	xhr.send();	
}


export const loginRequest = function(ldata, savein){
	var xhr = new XMLHttpRequest();
	
	xhr.open('POST', '/api/v0/auth/login/?format=json', true);
	
	xhr.setRequestHeader('X-F2X-Client', ver);	
	xhr.setRequestHeader('Content-Type', contentType);
	
	
	xhr.onload = function() {
		if (xhr.status === 200 || xhr.status === 201 ) {
		    userInfo = JSON.parse(xhr.responseText);
		    
		    const save = savein ? true : false;
		    setUpAuthStorage(save);
		    
		    if(savein)
		    	saveWorkout(savein.savein);
		} else {
			const merr = JSON.parse(decodeURIComponent(xhr.responseText));	  
			
			store.dispatch( setEvalLogin({error: merr.error}) )
			store.dispatch( setUserState(false) );
		}	    
	};
	
	
	xhr.send(
		JSON.stringify(ldata)
	);	
}


export const updateAvatarRequest = function(file){
	var xhr = new XMLHttpRequest();
	
	xhr.open('POST', '/api/v0/user/avatar/?format=json', true);
	
	xhr.setRequestHeader('X-F2X-Client', ver);	
	xhr.setRequestHeader('Content-Type', file.type);
	xhr.setRequestHeader('Content-Disposition', 'attachment; filename=' + file.name);
	xhr.setRequestHeader('Authorization', ['Token ', gtoken.token].join(" "));
	
	
	xhr.onload = function() {
		userInfo.user.avatar = JSON.parse(xhr.responseText).avatar;
		
		const username = (userInfo.user.first_name === '' ) ? userInfo.user.username : `${userInfo.user.first_name} ${userInfo.user.last_name}`;
		console.log("Avatar request " ,userInfo.user)
		store.dispatch( 
			setUserState(true, username, userInfo.user.username,userInfo.user.avatar, userInfo.user.first_name, userInfo.user.last_name, userInfo.user.date_of_birth, userInfo.user.about, userInfo.user.email, userInfo.user.invite_url, userInfo.user.subscriptions) 
		);
	};
	
	
	xhr.send(file);	
}


export const joinRequest = function(ldata){
	
	var xhr = new XMLHttpRequest();
	
	xhr.open('POST', '/api/v0/auth/signup/?format=json', true);
	
	xhr.setRequestHeader('Authorization', ['Token ', gtoken.token].join(" "));
	xhr.setRequestHeader('X-F2X-Client', ver);	
	xhr.setRequestHeader('Content-Type', contentType);
	
	
	xhr.onload = function() {
		if (xhr.status === 200 || xhr.status === 201 ) {
			//userInfo = JSON.parse(xhr.responseText);
		    //setUpAuthStorage();
		    
		    // store.dispatch( setVisibilityModal( ModalVisibilityFilters.SHOW, ModalTypes.GENERIC, {
			//     title: 'WE´VE SEND YOU A CONFIRMATION EMAIL',
			//     content: 'follow the instructions and them click on login ',
			//     btn: () => {
			// 	    store.dispatch( setVisibilityModal( ModalVisibilityFilters.SHOW, ModalTypes.SIGN_IN))
			//     },
			//     btnText: 'SIGN IN'
		    // }) );
		    store.dispatch( setEvalJoin({signable: true}) )
		    // browserHistory.push('/');
		} else {
			const merr = JSON.parse(decodeURIComponent(xhr.responseText));

			if (merr.username !== undefined){
				store.dispatch( setEvalJoin({errorUser: merr.username}) )
			}
			
			if (merr.email !== undefined){
				store.dispatch( setEvalJoin({errorMail: merr.email}) )
			}

			if (merr.cardnumber !== undefined){
				store.dispatch( setEvalJoin({errorMail: merr.cardnumber}) )
			}

			if (merr.cardname !== undefined){
				store.dispatch( setEvalJoin({errorMail: merr.cardname}) )
			}

			if (merr.expdate !== undefined){
				store.dispatch( setEvalJoin({errorMail: merr.expdate}) )
			}	

			if (merr.cvv !== undefined){
				store.dispatch( setEvalJoin({errorMail: merr.cvv}) )
			}	
		  
			store.dispatch( setUserState(false) );		  
		}	    
	};
	
	
	xhr.send(
		JSON.stringify(ldata)
	);	
}




export const editEmail = function(ldata, cb, cbErr){
	var xhr = new XMLHttpRequest();
	
	xhr.open('POST', '/api/v0/user/email/', true);
	
	xhr.setRequestHeader('Authorization', ['Token ', gtoken.token].join(" "));
	xhr.setRequestHeader('X-F2X-Client', ver);	
	xhr.setRequestHeader('Content-Type', contentType);
	
	
	xhr.onload = function() {
		if (xhr.status === 200 || xhr.status === 201 ) {
			const resp = JSON.parse(xhr.responseText);
		    
		    cb && cb(resp);
		} else {
			const merr = JSON.parse(decodeURIComponent(xhr.responseText));

			cbErr && cbErr(merr);		  
		}	    
	};
	
	xhr.send(
		JSON.stringify(ldata)
	);	
}





export const updateSpecificWorkoutRequest = function(wko,  cb ){
	var xhr = new XMLHttpRequest();
	
	xhr.open('PUT', '/api/v0/workout/user/' + wko.uid + '/?format=json', true);
	
	xhr.setRequestHeader('Authorization', ['Token ', gtoken.token].join(" "));
	xhr.setRequestHeader('X-F2X-Client', ver);	
	xhr.setRequestHeader('Content-Type', contentType);
	
	
	xhr.onload = function() {
		if (xhr.status === 200 || xhr.status === 201 ) {
			cb && cb( JSON.parse(xhr.responseText) )
		} else {
			const merr = JSON.parse(decodeURIComponent(xhr.responseText));
			
			console.log("ERR", merr)
		}	    
	};	
	
	const data = {title: wko.title};
		  data.exercises = wko.exercises.map( (item) => ({uid:item.uid}))
		  
	
	xhr.send(
		JSON.stringify(data)
	);	
}









export const addWorkoutRequest = function( cb ){
	var xhr = new XMLHttpRequest();
	
	xhr.open('POST', '/api/v0/workout/user/?format=json', true);
	
	xhr.setRequestHeader('Authorization', ['Token ', gtoken.token].join(" "));
	xhr.setRequestHeader('X-F2X-Client', ver);	
	xhr.setRequestHeader('Content-Type', contentType);
	
	
	xhr.onload = function() {
		if (xhr.status === 200 || xhr.status === 201 ) {
			cb && cb( JSON.parse(xhr.responseText) )
		} else {
			const merr = JSON.parse(decodeURIComponent(xhr.responseText));
			
			console.log("ERR", merr)
		}	    
	};	
	
	const data = {title: actWorkout.title};
		  data.exercises = actWorkout.exercises.map( (item) => ({uid:item.uid}))
	
	console.log( data);
	xhr.send(
		JSON.stringify(data)
	);	
}


export const updateWorkoutRequest = function( cb ){
	var xhr = new XMLHttpRequest();
	
	xhr.open('PUT', '/api/v0/workout/user/' + actWorkout.uid + '/?format=json', true);
	
	xhr.setRequestHeader('Authorization', ['Token ', gtoken.token].join(" "));
	xhr.setRequestHeader('X-F2X-Client', ver);	
	xhr.setRequestHeader('Content-Type', contentType);
	
	
	xhr.onload = function() {
		if (xhr.status === 200 || xhr.status === 201 ) {
			cb && cb( JSON.parse(xhr.responseText) )
		} else {
			const merr = JSON.parse(decodeURIComponent(xhr.responseText));
			
			console.log("ERR", merr)
		}	    
	};	
	
	
	const data = {title: actWorkout.title};
		  data.exercises = actWorkout.exercises.map( (item) => ({uid:item.uid}))
	
	
	xhr.send(
		JSON.stringify(data)
	);	
}


export const deleteWorkoutRequest = function( uid, cb ){
	var xhr = new XMLHttpRequest();
	
	xhr.open('DELETE', '/api/v0/workout/user/' + uid + '/', true);
	
	xhr.setRequestHeader('Authorization', ['Token ', gtoken.token].join(" "));
	xhr.setRequestHeader('X-F2X-Client', ver);	
	xhr.setRequestHeader('Content-Type', contentType);
	
	
	xhr.onload = function() {
		if (xhr.status === 204 ) {
			console.log("Workout UID " + uid + " has been deleted");
		
			cb && cb()
		} else {
			const merr = JSON.parse(decodeURIComponent(xhr.responseText));
		
			console.log("ERR", merr)
		}	    
	};	
	
	
	xhr.send();	
}













export const socialConnect = function( social, access_token, cb ){
	var xhr = new XMLHttpRequest();
	
	xhr.open('POST', '/api/v0/social/login/', true);
	
	xhr.setRequestHeader('Authorization', ['Token ', gtoken.token].join(" "));
	xhr.setRequestHeader('X-F2X-Client', ver);	
	xhr.setRequestHeader('Content-Type', contentType);
	
	
	xhr.onload = function() {
		if (xhr.status === 200 || xhr.status === 201 ) {
			const resp = JSON.parse(xhr.responseText);
			
			userInfo = resp;
		    
		    setUpAuthStorage();
			
			localStorage.iCc = "true";
			
			cb && cb(resp)
		} else {
			socialRegister(social, access_token, cb)
		}	    
	};
	
	
	xhr.send(
		JSON.stringify({
			social: social,
			access_token: access_token
		})
	);	
}



export const socialRegister = function( social, access_token, cb ){
	var xhr = new XMLHttpRequest();
	
	xhr.open('POST', '/api/v0/social/signup/', true);
	
	xhr.setRequestHeader('Authorization', ['Token ', gtoken.token].join(" "));
	xhr.setRequestHeader('X-F2X-Client', ver);	
	xhr.setRequestHeader('Content-Type', contentType);
	
	
	xhr.onload = function() {
		if (xhr.status === 200 || xhr.status === 201 ) {
			const resp = JSON.parse(xhr.responseText);
			
			userInfo = resp;
		    
		    setUpAuthStorage();
			
			localStorage.iCc = "true";
		} else {
			const merr = JSON.parse(decodeURIComponent(xhr.responseText));
			
			console.log("ERR", merr)
		}	    
	};	
	
	
	xhr.send(
		JSON.stringify({
			social: social,
			access_token: access_token
		})
	);	
}
















export const getStripeCard = () => {
	if (gtoken === null) {
		browserHistory.push('/');
		return;
	}	
	
	var xhr = new XMLHttpRequest();
	
	xhr.open('GET', '/api/v0/payment/stripe/card/', true);
	
	xhr.setRequestHeader('Authorization', ['Token ', gtoken.token].join(" "));
	xhr.setRequestHeader('X-F2X-Client', ver);	
	xhr.setRequestHeader('Content-Type', contentType);
	
	
	xhr.onload = function() {
		if (xhr.status === 200 || xhr.status === 201 ) {
		    const resp = JSON.parse(xhr.responseText);
		    
			store.dispatch( setCard(resp) );
		}
	};	

	xhr.send();	
}


export const deleteStripeCard = () => {
	var xhr = new XMLHttpRequest();
	
	xhr.open('DELETE', '/api/v0/payment/stripe/card/', true);
	
	xhr.setRequestHeader('Authorization', ['Token ', gtoken.token].join(" "));
	xhr.setRequestHeader('X-F2X-Client', ver);	
	xhr.setRequestHeader('Content-Type', contentType);

	xhr.send();
	
	store.dispatch( setCard(false) );	
}


const addStripeCard = (token) => {
	var xhr = new XMLHttpRequest();
	
	xhr.open('PUT', '/api/v0/payment/stripe/card/', true);
	
	xhr.setRequestHeader('Authorization', ['Token ', gtoken.token].join(" "));
	xhr.setRequestHeader('X-F2X-Client', ver);	
	xhr.setRequestHeader('Content-Type', contentType);
	
	
	xhr.onload = function() {
		if (xhr.status === 200 || xhr.status === 201 ) {
		    const resp = JSON.parse(xhr.responseText);

			store.dispatch( setCard(resp) );
		} else {
			const merr = JSON.parse(decodeURIComponent(xhr.responseText));
			
			console.log("ERR", merr)
		}	    
	};	

	xhr.send(
		JSON.stringify({
			stripe_token: token
		})
	);	
}


const stripeTokenResponse = (status, response) => {
	if(status === 200){
		const token = response.id;
		
		addStripeCard(token);
	}
}

export const stripeToken = (card) => {
	window['Stripe'].setPublishableKey('pk_test_A0KVgqpjGsuGpzyiH2f3Y2Yj');
	console.log(card)
	window['Stripe'].createToken(
		{
            name: card.name,
            number: card.number,
            exp_month: card.month,
            exp_year: card.year,
            cvc: card.cvc
        }, 
        stripeTokenResponse
    );
}



export const getPlans = () => {
	
	
	if (gtoken == null) {
		browserHistory.push('/');
		return;
	}		
	
	
	var xhr = new XMLHttpRequest();
	
	xhr.open('GET', '/api/v0/payment/subscription/', true);
	
	xhr.setRequestHeader('Authorization', ['Token ', gtoken.token].join(" "));
	xhr.setRequestHeader('X-F2X-Client', ver);	
	xhr.setRequestHeader('Content-Type', contentType);
	
	xhr.onload = function() {
		//console.log("PLANS")
		if (xhr.status === 200 || xhr.status === 201 ) {
		    const resp = JSON.parse(xhr.responseText);
		    //console.log("PLANS ", resp)


			// here we filter all subscriptions and get only the ones active
			let respresp = [];
			resp.results.map( (item) => {
					if (!item.is_cancelled && item.is_active) respresp.push(item)
				});
		    
		    //console.log(respresp)
		    
			store.dispatch( setPlan(respresp) );
		}	    
	};	

	xhr.send();	
}

/*
export const getPlans = () => {
	var xhr = new XMLHttpRequest();
	
	xhr.open('GET', '/api/v0/payment/subscription/', true);
	
	xhr.setRequestHeader('Authorization', ['Token ', gtoken.token].join(" "));
	xhr.setRequestHeader('X-F2X-Client', ver);	
	xhr.setRequestHeader('Content-Type', contentType);
	
	xhr.onload = function() {
		console.log(xhr.responseText)
		if (xhr.status === 200 || xhr.status === 201 ) {
		    const resp = JSON.parse(xhr.responseText);
		    
			store.dispatch( setPlan(resp) );
		}	    
	};	

	xhr.send();	
}
*/

export const buyWorkout = (uid, cb) => {
	var xhr = new XMLHttpRequest();
	
	xhr.open('POST', '/api/v0/payment/stripe/purchase/', true);
	
	xhr.setRequestHeader('Authorization', ['Token ', gtoken.token].join(" "));
	xhr.setRequestHeader('X-F2X-Client', ver);	
	xhr.setRequestHeader('Content-Type', contentType);
	
	
	xhr.onload = function() {
		if (xhr.status === 200 || xhr.status === 201 ) {
		    const resp = JSON.parse(xhr.responseText);

			
			getFX2DB( F2xDB['workoutsUser'] );
			getFX2DB( F2xDB['workoutsPublic'] );
			getPlans();
			
			cb && cb(resp);
		} else {
			const merr = JSON.parse(decodeURIComponent(xhr.responseText));
			
			console.log("ERR", merr)
		}	    
	};	
	
	console.log(JSON.stringify({
			workout_uid: uid
		}))

	xhr.send(
		JSON.stringify({
			workout_uid: uid
		})
	);	
}


export const becomePlatinum = (cb) => {
	var xhr = new XMLHttpRequest();
	
	xhr.open('POST', '/api/v0/payment/stripe/subscribe/', true);
	
	xhr.setRequestHeader('Authorization', ['Token ', gtoken.token].join(" "));
	xhr.setRequestHeader('X-F2X-Client', ver);	
	xhr.setRequestHeader('Content-Type', contentType);
	
	
	xhr.onload = function() {
		console.log("become platinum " );
		if (xhr.status === 200 || xhr.status === 201 ) {
		    const resp = JSON.parse(xhr.responseText);
			console.log("become platinum resp " ,resp );
			getFX2DB( F2xDB['workoutsUser'] );
			getFX2DB( F2xDB['workoutsPublic'] );
			getPlans();
			
			cb && cb(resp);
		} else {
			const merr = JSON.parse(decodeURIComponent(xhr.responseText));
			
			console.log("ERR", merr)
		}	    
	};	

	xhr.send(
		JSON.stringify({
			plan: 'platinum-member-monthly'
		})
	);	
}


export const cancelBecomePlatinum = (id) => {
	var xhr = new XMLHttpRequest();
	
	xhr.open('DELETE', '/api/v0/payment/subscription/'+ id +'/', true);
	
	xhr.setRequestHeader('Authorization', ['Token ', gtoken.token].join(" "));
	xhr.setRequestHeader('X-F2X-Client', ver);	
	xhr.setRequestHeader('Content-Type', contentType);
	
	
	xhr.onload = function() {
		getFX2DB( F2xDB['workoutsUser'] );
		getFX2DB( F2xDB['workoutsPublic'] );
		
		store.dispatch( setPlan([]) );	    
	};	

	xhr.send();	
}
























export const uuInfo = (value) => {
	if (userInfo !== null && userInfo.user !== null && value !== null && value !== undefined){
		userInfo.user = Object.assign({}, userInfo.user, value);
		
		updateUserRequest();
		
		let username = (userInfo.user.first_name === '' ) ? userInfo.user.username : `${userInfo.user.first_name} ${userInfo.user.last_name}` ;
		
		console.log(userInfo.user)
		
		store.dispatch( 
			setUserState(true, username, userInfo.user.username, userInfo.user.avatar, userInfo.user.first_name, userInfo.user.last_name, userInfo.user.date_of_birth, userInfo.user.about, userInfo.user.email, userInfo.user.invite_url, userInfo.user.subscriptions)
		);
		
		console.log("User Data Updated")
	}
};


export const uuPass = (value) => {
	if (userInfo !== null  && value !== null && value !== undefined){
		if(value.old_password !== value.new_password && value.new_password.length >= 6){
			updateUserPassRequest(value)
		}
		else{
			if(value.old_password === value.new_password){
				store.dispatch( 
					setEvalChangePassword({
						error: {
							old_password: 'Same Password',
							new_password: 'Same Password'
						}
					})
				)
			}
			if(value.new_password.length < 6){
				store.dispatch( 
					setEvalChangePassword({
						error: {
							old_password: '',
							new_password: 'min 6 characters'
						}
					})
				)
			}
		}
	}
};


export const guest = () => (userInfo !== null && userInfo.user !== undefined);















export const isMobile = () => {
    return (
        (navigator.userAgent.match(/Android/i)) ||
        (navigator.userAgent.match(/webOS/i)) ||
        (navigator.userAgent.match(/iPhone/i)) ||
        (navigator.userAgent.match(/iPod/i)) ||
        (navigator.userAgent.match(/iPad/i)) ||
        (navigator.userAgent.match(/BlackBerry/i))
    );
}


export const isIOS = () => {
    return (
        (navigator.userAgent.match(/iPhone/i)) ||
        (navigator.userAgent.match(/iPod/i)) ||
        (navigator.userAgent.match(/iPad/i))
    );
}





 
export const goBack = () => {
	if(!history.state){
		browserHistory.push("/");
	}
	else{
		window.history.back();
	}
}





import ICON_CARD_VISA from '../media/cards/visa.svg';
import ICON_CARD_MASTERCARD from '../media/cards/mastercard.svg';
import ICON_CARD_AMERIAN_EXPRESS from '../media/cards/amex.svg';
import ICON_CARD_DISCOVER from '../media/cards/discover.svg';
import ICON_CARD_DINERS from '../media/cards/diners.svg';
import ICON_CARD_JCB from '../media/cards/jcb.svg';

export const cardType = (digit) => {
	let card = '';
	
	const visa = /^4\d{3}-?\d{4}-?\d{4}-?\d{4}/g;				// Visa

	if(digit.match(visa))
		card = ICON_CARD_VISA;
		
		
	const mastercard = /^5[1-5]\d{2}-?\d{4}-?\d{4}-?\d{4}/g;	//Mastercard
	
	if(digit.match(mastercard))
		card = ICON_CARD_MASTERCARD;
		
		
	const americanexpress = /^3\d{3}-?\d{6}-?\d{5}/g;			//American Express
	
	if(digit.match(americanexpress))
		card = ICON_CARD_AMERIAN_EXPRESS;
		
		
	const discover = /^6\d{3}-?\d{4}-?\d{4}-?\d{4}/g;			//Discover
	
	if(digit.match(discover))
		card = ICON_CARD_DISCOVER;
		
		
	const diners = /^3\d{3}-?\d{4}-?\d{4}-?\d{2}/g;				//Discover
	
	if(digit.match(diners))
		card = ICON_CARD_DINERS;
		
		
	const jcb = /^3\d{3}-?\d{4}-?\d{4}-?\d{5}/g;				//JCB
	
	if(digit.match(jcb))
		card = ICON_CARD_JCB;
	
	
	return card;
}





if (gtoken === null){
	getGuestToken(
		(mobj) => {
			
			gtoken =  mobj;
			
			if ((localStorage.iC === undefined || localStorage.iC === '') && (localStorage.iCc === undefined || localStorage.iCc === '') ) {
				localStorage.iC = '0';
			} else {
				localStorage.iC = String(Number(localStorage.iC) + 1);
			}			
			
			//if (Number(localStorage.iC) === 1 && location.pathname.match("account/password") === null && location.pathname.match("invite") === null)
			//	store.dispatch( setVisibilityModal( ModalVisibilityFilters.SHOW, ModalTypes.TRY ) );
			
			
			
			launchDB();
			
			const searchURL = location.hash;

			if(searchURL.indexOf('#access_token=') !== -1){
				const access_token = searchURL.replace("#access_token=", '');
				
				socialConnect("instagram", access_token);
				
				browserHistory.push('/');
			}
		}
		
	)
}
else {
	renewUserTokenRequest();
}




// START APP DATA STREAMING
export default F2xDB;
