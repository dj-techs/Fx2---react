import { setWorkoutHome, setExercises, setFilters } from '../actions';

import { store } from '../';


const getStoredToken = function(){
	if (localStorage.tID !== '' && localStorage.tID !== undefined ){
		var tmp = JSON.parse(localStorage.tID)
		var li = (tmp.li === undefined) ? 3600:tmp.li;
		if ((new Date() - tmp.ti)/1000 > li){
			localStorage.tID = '';
			return null;
		} else {
			return {access_token: tmp.to, token_type: tmp.ty}
		}
	} else {
		return null
	}	
}


var gtoken = null;


// App Data Init
export const F2xDB = {
	filters:{
		name: "filters",
		endpoint: "filter",	
		data:{results:[]}
	},
	exercise:{
		name: "exercise",
		endpoint: "exercise",	
		data:{results:[]}
	},
	workoutsPublic:{
		name: "workoutsPublic",
		endpoint: "workout/public",	
		data:{results:[]}
	},
	workoutsUser:{
		name: "workoutsUser",
		endpoint: "workout/public",	
		data:{results:[]}
	},
	/*
	user:{
		name: "user",
		endpoint: "user",	
		data:{results:[]}
	}*/
}

const processResults = (stream) => {
	switch(stream.endpoint){
		case 'exercise':
			store.dispatch( setExercises(stream.data.results) );
			break;
		
		case 'workoutsPublic':
			store.dispatch( setWorkoutHome(stream.data.results) );
			break;
		
		case 'filters':
			let obj = {
				sport: ['All'],
				type: ['All'],
				intensity: [],
				musclegroups: []
			}
			stream.data.results.map(
				(item) =>{
					obj[ item.kind.toLowerCase().replace(" ", "") ].push( item.title )
					return '';
				}
			)
			
			store.dispatch( setFilters(obj) );
			
			
			break;
		
		default:
			break;
	}
}


export const getFX2DB = function(ep){
	if (gtoken === null  || gtoken === -1) return;
	
	let ptocall = {
		name: ep.name,
		spoint:'http://localhost:3001',
		epoint: ep.endpoint,
		token: gtoken,
		def:{},
		ver:'Web/1.0.0',
		callback:function(stream){
			F2xDB[stream.endpoint].data = stream.data;
			
			processResults(stream);
		}
	}
	sendRequest(ptocall)
}


const initFX2DB = function(){
	Object.keys(F2xDB).map( (item) => ( getFX2DB( F2xDB[item] ) ));
}





let getGuestToken = function(callback){
	
	
	var xhr = new XMLHttpRequest();
	xhr.open('POST', '/api/v0/token/guest/', true);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.send();
	
	xhr.onreadystatechange = function() {
	  if (xhr.readyState === 4) {
	    if (xhr.status !== 200) {
	      return {err: 'API Request failed with status ' + xhr.status }
	    }	
	    var resp = JSON.parse(decodeURIComponent(xhr.responseText));
	    console.log(resp)
	    callback(resp)
	  }
	}
	return {};	
}


/*

let getToken = function(usr,pass,callback){
	if (gtoken !== null) return;
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "oauth2/token/", true);
	
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

   var data= {
	    client_id : "7SrV5jNaUYBJl66DbsrQYnQdWvJG2KWt4xNNt6Cg",
	    client_secret : "3x3KJJwWbvuATyCs7PMpcihW30y8MJeQmtl7MQBMh3j3ozUS2P9t7sYBJWekVcVxNQCx5qkJS89xHVgDPCoD3ZjaDioXjGFSJKM7kHa8cCwm0dMTEnx2oyTg8bu5NQCR",
	    grant_type : "password",
	    username:usr,
	    password:pass
    }
    
    
    var serializedData = Object.keys(data).map(function(k) {
    	return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
	}).join('&')

	xhr.send( serializedData );	
	
	xhr.onreadystatechange = function() {
	  if (xhr.status === 401 && xhr.readyState === 4){
		  var merr = JSON.parse(decodeURIComponent(xhr.responseText));
		   callback(merr)
	  }
	  if (xhr.readyState === 4) {
	    if (xhr.status !== 200) {
	      return {err: 'API Request failed with status ' + xhr.status }
	    }	
	    var resp = JSON.parse(decodeURIComponent(xhr.responseText));
	    callback(resp)
	
	    //initFX2DB();
	  }
	}	
}
*/

function sendRequest(authObj) {
	if (authObj === undefined) return false;
	var aname = authObj.name;
	var endpoint = authObj.epoint;
	var token = authObj.token;
	var ver = authObj.ver;
	var cb = authObj.callback;
	
	var xhr = new XMLHttpRequest();
	xhr.open('GET', '/api/v0/' + endpoint + '/?format=json', true);
	xhr.setRequestHeader('Authorization', ['Token ', token.token].join(" "));
	xhr.setRequestHeader('X-F2X-Client', ver);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.send();
	
	xhr.onreadystatechange = function() {
	  if (xhr.readyState === 4) {
	    if (xhr.status !== 200) {
	      return {err: 'API Request failed with status ' + xhr.status }
	    }	
	    if (cb !== undefined ) cb( { endpoint: aname, data:JSON.parse( xhr.responseText ) });
	  }
	}
	return {};
}


if (gtoken === null){
		getGuestToken(
			(mobj) => {
				if (mobj.error !== undefined ) {
					localStorage.tID = '';
					gtoken = -1;
					return
				}
				gtoken =  mobj;
				gtoken.ts = new Date();
				//localStorage.tID = JSON.stringify({to:gtoken.token,ti:gtoken.ts.getTime(),li:gtoken.expires, ty:'Token '});
				
				initFX2DB();
			}
		);
}





/*
getGuestToken(
	(mobj) => {
		if (mobj.error !== undefined ) {
			localStorage.tID = '';
			gtoken = -1;
			return
		}
		if (gtoken === null){
			gtoken =  mobj;
		//} else {
		if (userInfo !== null) {
			gtoken.tokenUser = userInfo.token;
			console.log("user already logged")
			setUpAuthStorage();
			localStorage.iCc = "true";
		} else {
			//dispatch( setVisibilityModal( ModalVisibilityFilters.SHOW, ModalTypes.TRY ) );
			if ((localStorage.iC === undefined || localStorage.iC === '') && (localStorage.iCc === undefined || localStorage.iCc === '') ) {
				localStorage.iC = '0';
			} else {
				localStorage.iC = String(Number(localStorage.iC) + 1);
			}
			if (Number(localStorage.iC)%2 === 1) store.dispatch( setVisibilityModal( ModalVisibilityFilters.SHOW, ModalTypes.TRY ) );
		}
		//gtoken.ts = new Date();
		//localStorage.tID = JSON.stringify({to:gtoken.token,tou:gtoken.tokenUser, ti:gtoken.ts.getTime(),li:gtoken.token_expires, ty:'Token ', guest:(gtoken.tou === null)});
		//console.log(localStorage.tID)
		initFX2DB();
	}
);
*/



// START APP DATA STREAMING


export default F2xDB;