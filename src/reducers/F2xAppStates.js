import { SET_APPSTATES } from '../actions'



/*
 * Initial State
 */
 
const initialState = {
	currentPage: 'home',
	startable: false
}



/*
 * Modal action generator
 */
 
 
export const F2xAppStates = (state = initialState, action) => {
	switch (action.type) {
		case SET_APPSTATES:
			return Object.assign({}, state, {
				currentPage: action.appState.currentPage,
				startable: action.appState.startable
			})
		
		default:
			return state
	}
}