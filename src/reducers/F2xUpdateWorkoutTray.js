//import { UPDATE_WORKOUT_TRAY, uWorkoutTypes } from '../actions'
import { UPDATE_WORKOUT_TRAY } from '../actions'


/*
 * Initial State
 */
 
export const initialState = {
	workout: {}
}


/*
 * User action generator
 */
 
export const F2xUpdateWorkoutTray = (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_WORKOUT_TRAY:
			return Object.assign({}, state, {
				workout: action.workout
			})
		
		default:
			return state
	}
}