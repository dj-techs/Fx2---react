import { SET_EVAL_JOIN  } from '../actions'


/*
 * Initial State
 */
 
export const initialState = {
	flags: {}
}


/*
 * User action generator
 */
 
export const F2xEvalJoin = (state = initialState, action) => {
	switch (action.type) {
		case SET_EVAL_JOIN:
			return Object.assign({}, state, {
				flags: action.flags
			})
		
		default:
			return state
	}
}