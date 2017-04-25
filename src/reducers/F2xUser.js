import { SET_USER_STATE, SET_EMAIL } from '../actions'



/*
 * Initial State
 */
 
const initialState = {
	login: false,
	name:'',
	username: '',
	avatar:'',
	fullName: '',
	lastName: '',
	birthday: '',
	about: '',
	email: '',
	invite_url: '',
	subscriptions: {}
}



/*
 * Modal action generator
 */
 
export const F2xUser = (state = initialState, action) => {
	switch (action.type) {
		case SET_USER_STATE:
			return Object.assign({}, state, {
				login: action.login,
				name: action.name,
				username: action.username,
				avatar: action.avatar,
				fullName: action.fullName,
				lastName: action.lastName,
				birthday: action.birthday,
				about: action.about,
				email: action.email,
				invite_url: action.invite_url,
				subscriptions: action.subscriptions
			})
		
		case SET_EMAIL:
			return Object.assign({}, state, {
				login: state.login,
				name: state.name,
				username: state.username,
				avatar: state.avatar,
				fullName: state.fullName,
				lastName: state.lastName,
				birthday: state.birthday,
				about: state.about,
				email: action.email,
				invite_url: state.invite_url,
				subscriptions: state.subscriptions
			})
		
		default:
			return state
	}
}