import { SET_CARD } from '../actions'



/*
 * Initial State
 */
 
const initialState = {
	card: false
}



/*
 * Modal action generator
 */
 
 
export const F2xCard = (state = initialState, action) => {
	switch (action.type) {
		case SET_CARD:
			return Object.assign({}, state, {
				card: action.card
			})
		
		default:
			return state
	}
}