import { SET_EVAL_LOGIN  } from '../actions'


/*
 * Initial State
 */
 
export const initialState = {
	flags: {}
}


/*
 * User action generator
 */
 
export const F2xEvalLogin = (state = initialState, action) => {
	switch (action.type) {
		case SET_EVAL_LOGIN:
			return Object.assign({}, state, {
				flags: action.flags
			})
		
		default:
			return state
	}
}