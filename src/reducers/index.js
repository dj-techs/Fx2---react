import { combineReducers } from 'redux'

import { F2xModal } from './F2xModal'
import { F2xHomeWorkout } from './F2xHomeWorkout'
import { F2xUser } from './F2xUser'
import { F2xExercise } from './F2xExercise'
import { F2xFilters } from './F2xFilters'
import { F2xTrainers } from './F2xTrainers'
import { F2xVideoPlayer } from './F2xVideoPlayer'
import { F2xWorkouts } from './F2xWorkouts'
import { F2xTitleMobile } from './F2xTitleMobile'
import { F2xUpdateWorkout } from './F2xUpdateWorkout'
import { F2xUpdateWorkoutTray } from './F2xUpdateWorkoutTray'
import { F2xEvalJoin } from './F2xEvalJoin'
import { F2xEvalLogin } from './F2xEvalLogin'
import { F2xMyWorkouts } from './F2xMyWorkouts'
import { F2xEvalChangePassword } from './F2xEvalChangePassword'
import { F2xEvalForgotPassword } from './F2xEvalForgotPassword'
import { F2xHomeImage } from './F2xHomeImage'
import { F2xCard } from './F2xCard'
import { F2xPlan } from './F2xPlan'
import { F2xVideoCarousel } from './F2xVideoCarousel'

/*
 * Reducer
 */
 
const reducer = combineReducers({
	modal: F2xModal,
	homeWorkout: F2xHomeWorkout,
	videoCarousel: F2xVideoCarousel,
	user: F2xUser,
	exercises: F2xExercise,
	filters: F2xFilters,
	trainers: F2xTrainers,
	videoPlayer: F2xVideoPlayer,
	workouts: F2xWorkouts,
	myworkouts: F2xMyWorkouts,
	title: F2xTitleMobile,
	updateWorkout: F2xUpdateWorkout,
	updateWorkoutTray: F2xUpdateWorkoutTray,	
	evalJoin: F2xEvalJoin,
	evalLogin: F2xEvalLogin,
	evalChangePassword: F2xEvalChangePassword,
	evalForgotPassword: F2xEvalForgotPassword,
	homeImage: F2xHomeImage,
	card: F2xCard,
	plan: F2xPlan
})

export default reducer