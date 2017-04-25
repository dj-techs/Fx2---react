import { SET_PLAN } from '../actions'


/*
 * Initial State
 */
 
export const initialState = {
	plan: []
}


/*
 * User action generator
 */
 
export const F2xPlan = (state = initialState, action) => {
	switch (action.type) {
		case SET_PLAN:
			return Object.assign({}, state, {
				plan: action.plan
			})
		
		default:
			return state
	}
}