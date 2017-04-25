import { SET_HOME_IMAGE  } from '../actions'


/*
 * Initial State
 */
 
export const initialState = {
	image: false
}


/*
 * User action generator
 */
 
export const F2xHomeImage = (state = initialState, action) => {
	switch (action.type) {
		case SET_HOME_IMAGE:
			return Object.assign({}, state, {
				image: action.image
			})
		
		default:
			return state
	}
}