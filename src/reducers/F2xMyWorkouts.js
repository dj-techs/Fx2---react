import { SET_MYWORKOUTS } from '../actions'


/*
 * Initial State
 */
 
export const initialState = {
	list: [],
	sort: 1
}


/*
 * User action generator
 */
 
export const F2xMyWorkouts = (state = initialState, action) => {
	switch (action.type) {
		case SET_MYWORKOUTS:
			return Object.assign({}, state, {
				list: action.list,
				sort: action.sort
			})
		
		default:
			return state
	}
}