import React, { Component } from 'react';
import { browserHistory } from 'react-router';






/*
 * Redux
 */
import { connect } from 'react-redux'



/*
 * Global Vars & Functions
 */
import {setOpenDropdown} from '../../App';
import { setVisibilityModal, ModalVisibilityFilters, ModalTypes, setMobileFilterBox } from '../../actions'
import { MURL, logOutRequest } from '../../data/data'



/*
 * Components
 */
import F2xButton from '../../components/F2xButton'
import F2xIcon from '../../components/F2xIcon'
import F2xInput from '../../components/F2xInput'
import F2xCircularWorkout from '../../components/F2xCircularWorkout'



/*
 * Style
 */
import './F2xLogin.css';



/*
 * Icons
 */
import ICON_ARROW from '../../media/down_arrow.svg';
import ICON_USER from '../../media/usr_icon.svg';
import ICON_SEARCH from '../../media/search-icon.svg';
import ICON_FILTER from '../../media/Icon_Filter.svg';

/*
 * Backgrounds
 */
import BACK_BTN_JOIN from '../../media/button_join.svg';












//
// *** SEARCH 
//

class search extends Component {
	constructor(props){
		super(props);
		
		this.state = {
			searchMode: false,
			search: 458,
			inputStyle: 'none',
			timer: undefined,
			filter: '',
			resultMode: 'none',
			title: -1
		}
		
		this.toggleSearch = this.toggleSearch.bind(this);
		this.searchChange = this.searchChange.bind(this);
		this.hiddeSearch = this.hiddeSearch.bind(this);
		this.resetSearch = this.resetSearch.bind(this);
	}
	
	componentWillReceiveProps(nextProps){
		const {title} = this.state;
		const nextTitle = nextProps.title;
		
		
		if(title !== -1){
			if(title !== nextTitle)
				this.hiddeSearch()
		}
		
		
		this.setState({
			title: nextTitle
		})
	}
	
	toggleSearch(e){
		e.stopPropagation();
		e.preventDefault();
		
		setOpenDropdown(this.refs.searchBox);
		
		const newDisplay = this.refs.searchBox.style.display === 'none' ? 'block' : 'none'
		
		this.refs.searchBox.style.display = newDisplay;
		
		if(newDisplay === 'block')
			this.refs.search.refs.searchTxt.focus();
	}
	
	hiddeSearch(){
		this.refs.searchBox.style.display = 'none';
	}
	
	searchChange(){
		const search = this.refs.search.refs.searchTxt.value;
		
		this.refs.dialog.style.display = (search.length >= 2 || !isNaN(search)) && search !== '' ? 'block' : 'none'
		
		this.setState({
			filter: search,
			resultMode: (search.length >= 2 || !isNaN(search)) && search !== '' ? 'block' : 'none'
		})
	}
	
	searchExercises(x, filter ){
		return (
				(x.title.toLowerCase().indexOf(filter.toLowerCase()) !== -1) ||
				(x.type.toLowerCase().indexOf(filter.toLowerCase()) !== -1) ||
				(x.sport.toLowerCase().indexOf(filter.toLowerCase()) !== -1) ||
				(x.description.toLowerCase().indexOf(filter.toLowerCase()) !== -1) ||
				(x.trainer.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1) ||
				(x.intensity === filter) ||
				(x.muscle_groups.filter( y => y.toLowerCase().indexOf(filter.toLowerCase()) !== -1 ).length > 0 )
			)
							
	}
	
	resetSearch(){
		const newValue = '';
		
		this.refs.search.refs.searchTxt.value = newValue;
		this.refs.search.refs.searchTxt.focus();
		
		this.refs.dialog.style.display = 'none'
		
		this.setState({
			filter: newValue,
			resultMode: 'none'
		})
	}
	
	filterLists(list, type, filter){
		if(list.length){
			switch(type){
				case 1:
					return list.filter( 
							x => 
								this.searchExercises(x, filter)
								
							)
				
				case 2:
					return list.filter( 
							x => {
									let result = false;
									
									x.exercises.map(
										(item) =>{
											if(!result)
												result = this.searchExercises(item, filter)
											
											return false;
										}
									)
									
									return (
											(x.title.toLowerCase().indexOf(filter.toLowerCase()) !== -1) ||
											(result)
										)
								}
							);
				
				case 3:
					return list.filter( 
							x => {
									let result = false;
									
									x.exercises.map(
										(item) =>{
											if(!result)
												result = this.searchExercises(item, filter)
											
											return false;
										}	
									)
								
									return (
											(x.title.toLowerCase().indexOf(filter.toLowerCase()) !== -1) ||
											(result)
										)
								}
							);
				
				default:
					break;
			}
			
		}
		else
			return [];
	}

	
	render(){
		const { exercises, myworkouts, workouts, guest } = this.props;
		
		const noResults = (<div className="noResults small-font separated">No Results</div>);
		
		const listExercise = this.filterLists(exercises, 1, this.state.filter);
		const listMyWorkout = this.filterLists(myworkouts, 2, this.state.filter);
		const listWorkouts = this.filterLists(workouts, 3, this.state.filter);
		
		
		const exerciseList = listExercise.length ? (<ExerciseList list={listExercise} onClick={() => this.hiddeSearch()} />) : noResults;
		const myWorkoutsList = listMyWorkout.length ? (<MyWorkoutList list={listMyWorkout} onClick={() => this.hiddeSearch()} />) : noResults;
		const workoutsList = listWorkouts.length ? (<WorkoutList list={listWorkouts} onClick={() => this.hiddeSearch()} />) : noResults;
		
		const myWorkouts = !guest ? (<div>
										<div className="f2x-search-box-title small-font separated montse_light">
											My Workouts
										</div>
										
										<div className="f2x-search-box-datas">
											{myWorkoutsList}
										</div>
									</div>)
								:
								'';
								
		
		return(
			<div className="f2x-header-search pc" style={{paddingRight: (guest ? 10 : 37) +'px', paddingLeft: 0}} onMouseUp={(e) => { e.stopPropagation(); e.preventDefault(); }}>
				<div ref="searchBox" className="f2x-header-search-input" style={{width: this.state.search +'px', display: this.state.inputStyle}}>
					<div style={{whiteSpace: 'nowrap'}}>
						<F2xInput className="normal-font separated" 
							ref="search" refID="searchTxt" 
							onChange={() => this.searchChange()} 
							style={{padding: 0, margin: '5px 0 6px', width: '100%', borderWidth: 0, fontSize: '13px', height: '30px', textAlign: 'right'}} 
							styleBox={{margin: '0px 0 0 25px', width: '87%', display: 'inline-block'}} 
							placeholderReal="Search" />
						
						<div className="f2x-searchbox-reset cursor" onClick={() => this.resetSearch()} style={{display: this.state.filter.length ? 'inline-block' : 'none'}}>
							x
						</div>
					</div>
					
					
					
					<div style={{display: this.state.resultMode, width: '458px'}} ref="dialog">
						<div className="f2x-search-box-title small-font separated montse_light">
							Exercises
						</div>
						
						<div className="f2x-search-box-datas">
							{exerciseList}
						</div>
						
						
						
						{myWorkouts}
						
						
						
						<div className="f2x-search-box-title small-font separated montse_light">
							Preconfigured Workouts
						</div>
						
						<div className="f2x-search-box-datas">
							{workoutsList}
						</div>
					</div>
				</div>
				
				
				<div className={`iconSearch cursor${( (this.state.searchMode && this.state.search > 0) || (!this.state.searchMode && this.state.search === '458')) ? ' searchOpen' : ''}`} onMouseUp={(e) => this.toggleSearch(e)}>
					<img src={ICON_SEARCH} alt="Search" width="15" height="15" />
				</div>
			</div>
		)
	}
}




let mapStateToProps = (state) => {
	const {exercises, myworkouts, workouts, title} = state;
	
	return {
		exercises: exercises.list,
		myworkouts: myworkouts.list,
		workouts: workouts.list,
		title: title
	}
}

const Search = connect(
	mapStateToProps
)(search);
















//
// *** FILTER BUTTON FOR MOBILE
//

// Presentational Component
const filterIcon = ({dispatch, filter}) => (
	<div className="f2x-mobile-filters mobile" id="f2x-filter-img" style={{display: filter}} onClick={(e) => {e.stopPropagation(); dispatch(setMobileFilterBox('block'));}}>
		<img src={ICON_FILTER} alt="Options" className="mobile" width="22" height="22" />
	</div>
)

const FilterIcon = connect()(filterIcon);








// 
// *** HEADER's LOGIN BOX ( NOT LOGGED)
//
	
// Presentational Component
const headerNotLogged = ({ dispatch, filter }) => (
	<div className="f2x-header-logbox">
		<Search guest="true" />
	
		<div className="f2x-header-logbox-btn">
			<F2xButton name="SIGN IN" 
				className="f2x-new-button-transparent separated" 
				style={{height: '46px', width: 'auto', padding: '0 15px', fontSize: '12px'}} 
				onClick= { ()=> { 
						browserHistory.push('/signin')
					} 
				}
			/>
			
			<F2xButton name="JOIN" 
				className="f2x-new-button-black-invert separated" 
				style={{height: '71px', width: '134px', fontSize: '12px'}} 
				onClick={ 
					browserHistory.push('/join-platinum')
					/*() => dispatch( setVisibilityModal(ModalVisibilityFilters.SHOW, ModalTypes.JOIN))*/
				} 
			/>
		</div>
				
		<FilterIcon filter={filter} />
	</div>
)

const HeaderNotLogged = connect()(headerNotLogged);




// 
// *** HEADER's LOGIN BOX ( LOGGED)
//	


// Presentational Component
const ListItem = (props) => (
	<div className="search-img-box cover-img" style={Object.assign({}, props.style, {backgroundImage: 'url('+ MURL + props.poster +')', float: 'left', width: props.w +'px', height: props.h +'px'})} onClick={props.onClick}>
		
		<div className="search-text">
			<span>{props.title ? props.title : ''}</span>
			<br />
			{props.trainer ? props.trainer : ''}
		</div>
	</div>
);




/*
 * Exercise List
 */
const ExerciseList = ({list, onClick}) => (
	<div>
		{
			list.map(
				(item, i) => 
					<ListItem key={i} poster={item.video.poster} description={item.description} title={item.title} item={item} trainer={item ? item.trainer ? item.trainer.name : '' : ''} w="88" h="64" style={{margin: '0 10px 5px 0'}} onClick={() => {onClick(); browserHistory.push('/exercise/' + item.uid) } } />
			)
		}
		
		<div className="clear" />
	</div>
)



/*
 * Workputs List
 */
const MyWorkoutList = ({list, onClick}) => (
	<div className="f2x-header-exercise-images-w">
		{
			list.map(
				(item, i) => 
					item.exercises[0] ? 
					<ListItem key={i} poster={item.exercises[0].video.poster} title={item.title} description={item.title} item={item.exercises[0]} style={{}} w="77" h="64" onClick={() => {onClick(); browserHistory.push('/myworkout/'+ item.uid) } }  />
					:
					<span key={i} />
			)
		}
		
		<div className="clear" />
	</div>
)



/*
 * My Workputs List
 */
const WorkoutList = ({list, onClick}) => (
	<div className="f2x-header-exercise-images-w">
		{
			list.map(
				(item, i) => 
					<F2xCircularWorkout 
						key={i}
						mstyle={ {backgroundImage:'url('+ MURL + '/' + item.exercises[0].video.poster + ')', width: '80px', height: '80px'} } 
						params={ item } 
						onClick={ onClick }
						mode="true"
					/>
			)
		}
		
		<div className="clear" />
	</div>
)



// Presentational Component
const signOut = ({dispatch}) => (
	<li onClick={() => logOutRequest() } className="cursor">Sign Out</li>
)
	
const SignOut = connect()(signOut);



// Container Component
class authArea extends Component {
	constructor(props){
		super(props);
		
		this.state = {
			subMenu: 'none'
		}
		
		this.toggleSubMenu = this.toggleSubMenu.bind(this);
	}
	
	componentDidMount(){
		if(this.props.title === 'ACCOUNT')
			this.refs.me.style.fontWeight = '500';
		else
			this.refs.me.style.fontWeight = '300';
	}
	
	
	componentWillReceiveProps(nP){
		if(nP.title === 'ACCOUNT')
			this.refs.me.style.fontWeight = '500';
		else
			this.refs.me.style.fontWeight = '300';
	}
	
	
	toggleSubMenu(e){
		e.preventDefault();
		e.stopPropagation();
		
		setOpenDropdown(this.refs.menuBox);
		
		this.refs.menuBox.style.display = this.refs.menuBox.style.display === 'block' ? 'none' : 'block';
	}
	
		
	
	
	
	render() {
		const { name, avatar, filter } = this.props;
		
		return (
			<div className="f2x-header-searchbox">
				<Search />
			
				<div className="user">
					<div className="cursor" onMouseUp={(e) => this.toggleSubMenu(e)}>
						<F2xIcon className="icon" icon={ avatar } />
					
						<F2xIcon className="disclosure" icon={ ICON_ARROW } />
						
						<div className="clear" />
					</div>
					
	
					<div className="user-menu small-font" style={{display: this.state.subMenu}} ref="menuBox">
						<ul>
							<li><b style={{fontWeight: 400}}>{name}</b></li>
						</ul>
						
						<ul className="f2x-hr montse_light">
							<li className="cursor" onMouseUp={(e) => { this.toggleSubMenu(e); browserHistory.push('/account');} } ref="me">My Account</li>
							<SignOut />
						</ul>
					</div>
						
					<div className="clear" />
				</div>
				
				
				
				<FilterIcon filter={filter} />
			</div>
		)
	}
}

mapStateToProps = (state) => {
	const {title} = state;
	
	return {
		title: title.title
	}
}

const AuthArea = connect(
	mapStateToProps
)(authArea);


// Presentational Component
const f2xLogin = ({logged, name, avatar, filter}) => {
	if(logged) 
		return <AuthArea name={name} avatar={ avatar === '/static/img/no_image.png' ? ICON_USER : MURL + avatar} filter={filter} />
	else
		return <HeaderNotLogged filter={filter} />
}

mapStateToProps = (state) => {
	const { mobile } = state.filters;
	
	return {
		logged: state.user.login,
		name: state.user.name,
		avatar: state.user.avatar,
		
		filter: mobile
	};
}

const F2xLogin = connect(
	mapStateToProps
)(f2xLogin);



export default F2xLogin;