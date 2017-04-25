import { SET_VIDEO_CAROUSEL } from '../actions'


/*
 * Initial State
 */
 
export const initialState = {
	list: []
}


/*
 * User action generator
 */
 
export const F2xVideoCarousel = (state = initialState, action) => {
	switch (action.type) {
		case SET_VIDEO_CAROUSEL:
			return Object.assign({}, state, {
				list: action.list
			})
		
		default:
			return state
	}
}