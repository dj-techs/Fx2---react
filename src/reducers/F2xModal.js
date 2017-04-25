import { SET_VISIBILITY_MODAL, ModalVisibilityFilters } from '../actions'



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
 
export const F2xModal = (state = initialState, action) => {
	switch (action.type) {
		case SET_VISIBILITY_MODAL:
			return Object.assign({}, state, {
				state: action.mode,
				type: action.t,
				param: action.param
			})
		
		default:
			return state
	}
}