import { SET_EXERCISES } from '../actions'



/*
 * Initial State
 */
 
const initialState = {
	list: [],
	sort: 1,
	sport: 'all',
	tipe: 'all',
	trainer: 'all',
	intensity: [],
	muscle: []
}



/*
 * Modal action generator
 */
 
 
export const F2xExercise = (state = initialState, action) => {
	switch (action.type) {
		case SET_EXERCISES:
			return Object.assign({}, state, {
				list: action.list,
				sort: action.sort,
				sport: action.sport,
				tipe: action.tipe,
				trainer: action.trainer,
				intensity: action.intensity,
				muscle: action.muscle
			})
		
		default:
			return state
	}
}