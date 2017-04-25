import { SET_TITLE_MOBILE } from '../actions'



/*
 * Initial State
 */
 
const initialState = {
	title: ''
}



/*
 * Modal action generator
 */
 
export const F2xTitleMobile = (state = initialState, action) => {
	switch (action.type) {
		case SET_TITLE_MOBILE:
			return Object.assign({}, state, {
				title: action.title
			})
		
		default:
			return state
	}
}