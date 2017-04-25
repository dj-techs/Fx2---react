import { browserHistory } from 'react-router';
import { updateWorkout, uWorkoutTypes, ModalVisibilityFilters, ModalTypes, setVisibilityModal, setMyWorkouts } from '../actions'
import { addIfUnique } from './utils';
import { initNewWorkout, addWorkoutRequest, guest, deleteWorkoutRequest, updateWorkoutRequest, getFX2DB, F2xDB } from './data';
import { store } from '../';


export let actWorkout = {};





export const resetWorkout = () => {
	actWorkout = initNewWorkout();
	store.dispatch( updateWorkout(actWorkout.exercises, uWorkoutTypes.RESET ) )
}


export const initWorkoutTray = () => {
	if (actWorkout.uid === undefined) resetWorkout();
}



export const mustUpdate = () => {
	return (actWorkout.uid !== "" && actWorkout.uid !== undefined);
}



export const updateLocalStore = (doDelete , cb) => {
	if (doDelete !== undefined){
		actWorkout = initNewWorkout();
		let currWO = F2xDB['workoutsUser'].data.results.findIndex(w => w.uid === doDelete);
		//console.log(doDelete + "   Index to remove " , currWO)
		F2xDB['workoutsUser'].data.results.splice(currWO , 1)
	} else {
		let currWO = F2xDB['workoutsUser'].data.results.findIndex(w => w.uid === actWorkout.uid);	
		F2xDB['workoutsUser'].data.results[currWO] = Object.assign({}, actWorkout);
	}
	store.dispatch( setMyWorkouts(F2xDB['workoutsUser'].data.results, 2) );	
	if (cb !== undefined) cb()
}





export const deleteWorkout = (tmpexer) => {
	
	updateLocalStore( tmpexer.uid, ()=> {
		store.dispatch( setVisibilityModal(ModalVisibilityFilters.HIDE) ); 
		browserHistory.push('/myworkout'); 
	} )
	
	deleteWorkoutRequest(tmpexer.uid, 
		() => 
		{	
			getFX2DB( F2xDB['workoutsUser'],() => { console.log("Full Data correctly deleted") });
		}
	
	);
}

export const createExerciseList = (tmpexer) =>{
	if (tmpexer !== undefined) {
		actWorkout = Object.assign({}, tmpexer)
	}	
	let nobj = actWorkout.exercises.map(
		(item, i) => {
			return {id:i , uid: item.uid, title: item.title, cover: item.video.poster}
		}
	)
	//console.log(nobj)
	return nobj
}



export const sortExercises = (ordered) => {
	 var nobj = ordered.map(
		(item) => {
			return actWorkout.exercises.filter( x => x.uid === item.uid)[0]
		}
	)
	actWorkout.exercises = 	nobj
	if (actWorkout.uid !== undefined && actWorkout.uid !== ""){
		updateLocalStore(undefined, ()=>{
				updateWorkoutRequest(
					() =>{
						getFX2DB( F2xDB['workoutsUser'] , () => { console.log("Reordered Full Data correctly updated") });
					}
				);
		})
	}
}





export const updateWorkoutElems = (tmpexer) => {
	updateLocalStore(undefined,
	    () =>
	    {
			//store.dispatch( updateWorkoutTray(actWorkout) );
			//console.log("Screen updated")

			updateWorkoutRequest(
				() =>{
					getFX2DB( F2xDB['workoutsUser'] , () => { console.log("Full Data correctly updated") });
				}
			);				    
	    }
    )
}


export const getActWorkout = () => {
	return actWorkout;
}

export const removeExercise = (eID, edit) =>{
	let index = actWorkout.exercises.findIndex( x => x.uid === eID)
	
	if(index === -1) return;
	
	const min = actWorkout.exercises[index].duration;
	const cal = actWorkout.exercises[index].calories;
	
	
	actWorkout.exercises.splice(index,1)
	
	actWorkout.duration -= min;
	actWorkout.calories -= cal;
	
	if (edit){
		if (actWorkout.exercises.length > 0){
		    updateWorkoutElems()
		} else {
			deleteWorkout( {uid:actWorkout.uid })
		}	
	} else {
			store.dispatch( updateWorkout(createExerciseList(), uWorkoutTypes.ADD) )
	}			
}



export const openWorkout = (eID) => {
	actWorkout = eID;
	
	
	actWorkout = Object.assign({}, eID);
	
	store.dispatch( updateWorkout(createExerciseList(), uWorkoutTypes.ADD) )
	
	store.dispatch( setVisibilityModal(ModalVisibilityFilters.SHOW, ModalTypes.WORKOUT_EDIT, eID))
}

export const addExercisesToWorkout = (eID) => {
	store.dispatch( setVisibilityModal(ModalVisibilityFilters.HIDE) ); 
	browserHistory.push('/exercise');
	actWorkout = Object.assign({}, eID);
	
	store.dispatch( updateWorkout(createExerciseList(), uWorkoutTypes.ADD) )
}

export const addItemToWorkout = (item) => {
	if ( actWorkout.exercises.length < 6 && addIfUnique(actWorkout.exercises, item, "uid")	){
		actWorkout.calories += item.calories;
		actWorkout.duration += item.duration;
		addIfUnique(actWorkout.muscle_groups,item.muscle_groups)
		addIfUnique(actWorkout.wardrobe,item.wardrobe)	
		store.dispatch( updateWorkout(createExerciseList(), uWorkoutTypes.ADD) )
	}
}









export const saveWorkout = (obj) => {
	if (obj !== undefined && (obj.wName && obj.wName !== '') || (obj.title && obj.title !== '')) {
		actWorkout.title = obj.wName || obj.title;
		//addWorkoutRequest();
		//console.log(!guest())
		
		if (!guest()) {
			store.dispatch( setVisibilityModal(ModalVisibilityFilters.SHOW, ModalTypes.SIGN_IN, {savein: actWorkout}))
		} else {
			if(!actWorkout.title && !actWorkout.exercises.length) {
				console.log("ERROR SAVE:", actWorkout);
				return;
			}
			
			//store.dispatch( setVisibilityModal(ModalVisibilityFilters.UPDATE) )
			
					F2xDB['workoutsUser'].data.results.unshift( actWorkout )
					store.dispatch( setMyWorkouts(F2xDB['workoutsUser'].data.results, 2) ); 
					
				
				addWorkoutRequest( 
					(  ) => {		
						getFX2DB( F2xDB['workoutsUser'],() => { 
							console.log("New workout has been correctly saved")	
							store.dispatch( setVisibilityModal(ModalVisibilityFilters.HIDE) );
							browserHistory.push('/myworkout');
						} );	
					}
				);
			
		}
		
	}
}



export const updateSaveWorkout = (obj) => {
	updateLocalStore(undefined,
	    () =>
	    {
		    actWorkout.title = obj.wName;
			updateWorkoutRequest(
				() =>{
					
					getFX2DB( F2xDB['workoutsUser'] , () => { 
						browserHistory.push('/myworkout/' + actWorkout.uid +'@open' );
						console.log("Full Data correctly updated") 
						store.dispatch( setVisibilityModal(ModalVisibilityFilters.HIDE) )
					});
				}
			);				    
	    }
    )
}




