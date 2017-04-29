export const SET_VISIBILITY_MODAL = 'SET_VISIBILITY_MODAL';
export const SET_VISIBILITY_VIDEO = 'SET_VISIBILITY_VIDEO';
export const SET_HOME_WORKOUT = 'SET_HOME_WORKOUT';
export const SET_VIDEO_CAROUSEL = 'SET_VIDEO_CAROUSEL';
export const SET_USER_STATE = 'SET_USER_STATE';
export const SET_EXERCISES = 'SET_EXERCISES';
export const SET_FILTERS = 'SET_FILTERS';
export const SET_MOBILE_FILTER = 'SET_MOBILE_FILTER';
export const SET_MOBILE_FILTER_BOX = 'SET_MOBILE_FILTER_BOX';
export const SET_MOBILE_OPTION_BOX = 'SET_MOBILE_OPTION_BOX';
export const SET_TRAINERS = 'SET_TRAINERS';
export const SET_VIDEO = 'SET_VIDEO';
export const SET_WORKOUTS = 'SET_WORKOUTS';
export const SET_MYWORKOUTS = 'SET_MYWORKOUTS';
export const SET_TITLE_MOBILE = 'SET_TITLE_MOBILE';
export const SET_EVAL_JOIN = 'SET_EVAL_JOIN';
export const SET_EVAL_LOGIN = 'SET_EVAL_LOGIN';
export const UPDATE_WORKOUT = 'UPDATE_WORKOUT';
export const UPDATE_WORKOUT_TRAY = 'UPDATE_WORKOUT_TRAY';
export const SET_EVAL_CHANGE_PASSWORD = 'SET_EVAL_CHANGE_PASSWORD';
export const SET_EVAL_FORGOT_PASSWORD = 'SET_EVAL_FORGOT_PASSWORD';
export const SET_HOME_IMAGE = 'SET_HOME_IMAGE';
export const SET_EMAIL = 'SET_EMAIL';
export const SET_CARD = 'SET_CARD';
export const SET_PLAN = 'SET_PLAN';





/*
 * other constants
 */


export const ModalVisibilityFilters = {
  SHOW: 'block',
  UPDATE: 'update',  
  HIDE: 'none'
}


export const ModalTypes = {
  SIGN_IN: 'SIGN_IN',
  JOIN: 'JOIN',
  TRY: 'TRY',
  RESET_PASSWORD: 'RESET_PASSWORD',
  WORKOUT_NAME: 'WORKOUT_NAME',
  WORKOUT_SELECT: 'WORKOUT_SELECT',
  WORKOUT_SHARE: 'WORKOUT_SHARE',
  WORKOUT_SAVE_CHANGES: 'WORKOUT_SAVE_CHANGES',
  WORKOUT_EDIT: 'WORKOUT_EDIT',
  WORKOUT_REMOVE: 'WORKOUT_REMOVE',
  WORKOUT_BUY: 'WORKOUT_BUY',
  EXERCISE_SHARE: 'EXERCISE_SHARE',
  VIEWING_OPTION_SELECT: 'VIEWING_OPTION_SELECT',
  BECOME_PLATINUM_MEMBER: 'BECOME_PLATINUM_MEMBER',
  INVITE_FRIEND: 'INVITE_FRIEND',
  EDIT_EMAIL: 'EDIT_EMAIL',
  GENERIC: 'GENERIC'
}


export const uWorkoutTypes = {
  ADD: 'ADD',
  RESET: 'RESET'
}



export const VideoTypes = {
  WORKOUT: 'WORKOUT',
  EXERCISES: 'EXERCISES'
}



/*
 * action creators
 */

export const setVisibilityModal = (mode, t='', param) => {
  return {
    type: SET_VISIBILITY_MODAL,
    mode,
    t,
    param
  }
}


export const setVisibilityVideo = (mode, t='', v='', i='') => {
  return {
    type: SET_VISIBILITY_VIDEO,
    mode,
    t,
    v,
    i
  }
}



export const setWorkoutHome = (list) => {
  return {
    type: SET_HOME_WORKOUT,
    list
  }
}



export const setVideoCarousel = (list) => {
  return {
    type: SET_VIDEO_CAROUSEL,
    list
  }
}



export const setUserState = (login=false, name='', username='', avatar='', fullName='', lastName='', birthday='', about='', email='', invite_url='', subscriptions={}) => {
  return {
    type: SET_USER_STATE,
    login,
    name,
    username,
    avatar,
    fullName,
    lastName,
    birthday,
    about,
    email,
    invite_url,
    subscriptions
  }
}


export const setEmail = (email) => {
  return {
    type: SET_EMAIL,
    email
  }
}



export const setExercises = (list, sort, sport, tipe, trainer, intensity, muscle) => {
  return {
    type: SET_EXERCISES,
    list,
    sort,
    sport,
    tipe,
    trainer,
    intensity,
    muscle
  }
}




export const updateWorkout = (list,mode) => {
	return {
		type: UPDATE_WORKOUT,
		list,
		mode
	}
}

export const updateWorkoutTray = (workout) => {
	return {
		type: UPDATE_WORKOUT_TRAY,
		workout
	}
}



export const setWorkouts = (list, sort) => {
	
  return {
    type: SET_WORKOUTS,
    list,
    sort
  }
}

export const setMyWorkouts = (list, sort) => {
	
  return {
    type: SET_MYWORKOUTS,
    list,
    sort
  }
}


export const setEvalLogin = (flags) => {
  return {
    type: SET_EVAL_LOGIN,
    flags
  }
}


export const setEvalChangePassword = (flags) => {
  return {
    type: SET_EVAL_CHANGE_PASSWORD,
    flags
  }
}


export const setEvalForgotPassword = (flags) => {
  return {
    type: SET_EVAL_FORGOT_PASSWORD,
    flags
  }
}


export const setEvalJoin = (flags) => {
  return {
    type: SET_EVAL_JOIN,
    flags
  }
}



export const setFilters = (filters) => {
  return {
    type: SET_FILTERS,
    filters
  }
}



export const setMobileFilter = (filter) => {
  return {
    type: SET_MOBILE_FILTER,
    filter
  }
}



export const setMobileFilterBox = (filter) => {
  return {
    type: SET_MOBILE_FILTER_BOX,
    filter
  }
}



export const setMobileOptionBox = (id, status) => {
  return {
    type: SET_MOBILE_OPTION_BOX,
    id, 
    status
  }
}



export const setTrainers = (list) => {
  return {
    type: SET_TRAINERS,
    list
  }
}



export const setTitleMobile = (title) => {
  return {
    type: SET_TITLE_MOBILE,
    title
  }
}



export const setHomeImage = (image) => {
  return {
    type: SET_HOME_IMAGE,
    image
  }
}


export const setCard = (card) => {
	return {
		type: SET_CARD,
		card
	}
}


export const setPlan = (plan) => {
	return {
		type: SET_PLAN,
		plan
	}
}