import { SET_FILTERS, SET_MOBILE_FILTER, SET_MOBILE_FILTER_BOX, SET_MOBILE_OPTION_BOX } from '../actions'



/*
 * Initial State
 */
 
const initialState = {
	sport: [],
	type: [],
	intensity: [],
	musclegroups: [],
	mobile: 'none',
	box: 'none',
	options: {
		id: 0,
		status: 'none'
	}
}



/*
 * Modal action generator
 */
 
export const F2xFilters = (state = initialState, action) => {
	switch (action.type) {
		case SET_FILTERS:
			return Object.assign({}, state, {
				sport: action.filters.sport,
				type: action.filters.type,
				intensity: action.filters.intensity,
				musclegroups: action.filters.musclegroups,
				
				mobile: state.mobile,
				box: state.box,
				
				options: state.options
			})
		
		case SET_MOBILE_FILTER:
			return Object.assign({}, state, {
				sport: state.sport,
				type: state.type,
				intensity: state.intensity,
				musclegroups: state.musclegroups,
				
				mobile: action.filter,
				box: state.box,
				
				options: state.options
			})
		
		case SET_MOBILE_FILTER_BOX:
			return Object.assign({}, state, {
				sport: state.sport,
				type: state.type,
				intensity: state.intensity,
				musclegroups: state.musclegroups,
				
				mobile: state.mobile,
				box: action.filter,
				
				options: state.options
			})
		
		case SET_MOBILE_OPTION_BOX:
			return Object.assign({}, state, {
				sport: state.sport,
				type: state.type,
				intensity: state.intensity,
				musclegroups: state.musclegroups,
				
				mobile: state.mobile,
				box: state.box,
				
				options: {
					id: action.id,
					status: action.status
				}
			})
		
		default:
			return state
	}
}