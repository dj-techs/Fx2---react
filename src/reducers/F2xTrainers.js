import { SET_TRAINERS } from '../actions'



/*
 * Initial State
 */
 
const initialState = {
	list: []
}



/*
 * Modal action generator
 */
 
export const F2xTrainers = (state = initialState, action) => {
	switch (action.type) {
		case SET_TRAINERS:
			return Object.assign({}, state, {
				list: action.list
			})
		
		default:
			return state
	}
}