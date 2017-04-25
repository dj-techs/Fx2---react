import { SET_HOME_WORKOUT } from '../actions'


/*
 * Initial State
 */
 
export const initialState = {
	workout: []
}


/*
 * User action generator
 */
 
export const F2xHomeWorkout = (state = initialState, action) => {
	switch (action.type) {
		case SET_HOME_WORKOUT:
			return Object.assign({}, state, {
				workout: action.list
			})
		
		default:
			return state
	}
}