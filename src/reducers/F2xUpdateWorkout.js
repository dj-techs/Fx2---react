import { UPDATE_WORKOUT, uWorkoutTypes } from '../actions'


/*
 * Initial State
 */
 
export const initialState = {
	exercises: [],
	mode: uWorkoutTypes.RESET
}


/*
 * User action generator
 */
 
export const F2xUpdateWorkout = (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_WORKOUT:
			return Object.assign({}, state, {
				exercises: action.list,
				mode: action.mode
			})
		
		default:
			return state
	}
}