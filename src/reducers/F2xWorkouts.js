import { SET_WORKOUTS } from '../actions'


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
 
export const F2xWorkouts = (state = initialState, action) => {
	switch (action.type) {
		case SET_WORKOUTS:
			return Object.assign({}, state, {
				list: action.list,
				sort: action.sort
			})
		
		default:
			return state
	}
}