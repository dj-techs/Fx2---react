import { SET_EVAL_CHANGE_PASSWORD  } from '../actions'


/*
 * Initial State
 */
 
export const initialState = {
	flags: {}
}


/*
 * User action generator
 */
 
export const F2xEvalChangePassword = (state = initialState, action) => {
	switch (action.type) {
		case SET_EVAL_CHANGE_PASSWORD:
			return Object.assign({}, state, {
				flags: action.flags
			})
		
		default:
			return state
	}
}