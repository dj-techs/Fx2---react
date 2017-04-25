import { SET_VISIBILITY_VIDEO, ModalVisibilityFilters } from '../actions'



/*
 * Initial State
 */
 
const initialState = {
	state: ModalVisibilityFilters.HIDE,
	type: 0
}



/*
 * Modal action generator
 */
 
export const F2xVideoPlayer = (state = initialState, action) => {

	switch (action.type) {
		case SET_VISIBILITY_VIDEO:
			return Object.assign({}, state, {
				state: action.mode,
				type: action.t,
				video: action.v,
				id: action.i
			})
		
		default:
			return state
	}
}