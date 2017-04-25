import React, { Component } from 'react';

import { MURL } from '../data/data';


/*
 * Components
 */
import F2xCircularWorkout from './F2xCircularWorkout';
import F2xIcon from './F2xIcon';


/*
 * Style
 */
import './F2xItemList.css';



/*
 * Images
 */
import ICON_ARROW from '../media/big_arrow.svg';




//Presentational List Iterator component
	class ItemList extends Component {homeWorkout
		componentDidMount(){
			window['Ps'].initialize(this.refs.slider, {suppressScrollY: true});
		}

		
	
		render(){
			console.log(this.props.wo);
			return (
				<div className="f2x-item-list">
					<div className="f2x-item-list-slider" ref="slider" >
						{
							this.props.wo.map(
								(item, i) => {
									const background = item.exercises ? item.exercises[0].video.poster : item.image;
									
									return (
										<F2xCircularWorkout
											key={i}
											mstyle={ {backgroundImage:'url('+ MURL + '/' + background + ')'} } 
											style={ {height: 'auto'} } 
											params={ item } 
											onClick={ this.props.onClick }
											mode="true"
											noName={this.props.noName}
										/>
									)
								}
							)
						}
					</div>
					
					<F2xIcon className="f2x-item-list-arrow f2x-item-list-arrow-left cursor" icon={ ICON_ARROW } style={{display: this.props.arrowL, top: this.props.top}} onClick={() => this.props.move(-1, 350)} />
					<F2xIcon className="f2x-item-list-arrow cursor" icon={ ICON_ARROW } style={{display: this.props.arrowR, top: this.props.top}} onClick={() => this.props.move(1, 350)} />
				</div>
			) 
		}
	}	
	

class F2xItemList extends Component {
	constructor(props){
		super(props);
		
		this.state = {
			arrowL: 'none',
			arrowR: 'none',
			scroll: 0,
			genere: false,
			length: 0,
			itemListMount: false,
			top: '25%'
		}
		
		this.handleResize = this.handleResize.bind( this );
		this.moveScroll = this.moveScroll.bind( this );
	}
	
	componentDidMount(){
		const sLength = this.props.wo.length;
		
		let arrow_visibilityL = 'none';
		let arrow_visibilityR = 'none';
		if(sLength > 4)
			arrow_visibilityR = 'block';
			
		if(!this.state.genere)
			window.addEventListener('resize', () => this.handleResize() );
		
		this.isMount = true;
		
		this.setState({
			arrowL: arrow_visibilityL,
			arrowR: arrow_visibilityR,
			length: sLength,
			itemListMount: true,
			genere: true
		});
		
	}
	
	componentWillUnmount(){
		this.isMount = false;
		
		this.setState({
			itemListMount: false
		})
	}
	
	componentWillReceiveProps(nextProps){
		const sLength = nextProps.wo.length;
		
		let arrow_visibilityR = 'none';
		if(sLength > 4)
			arrow_visibilityR = 'block';
		
		this.setState({
			arrowR: arrow_visibilityR,
			length: sLength
		});
	}
	
	componentDidUpdate(prevProps, prevState) {
		this.handleResize();
	}
   
	
	handleResize() {
		if((!this.isMount && this.state.genere) || !this.refs.slider) return;
		
		if(this.refs.slider.refs.slider.childNodes[0] === undefined) return;
		
		
		const itemWidth = this.refs.slider.refs.slider.childNodes[0].getElementsByClassName('img-cont').length ? this.refs.slider.refs.slider.childNodes[0].getElementsByClassName('img-cont')[0].getBoundingClientRect().width : 0;
		const list = this.refs.slider.refs.slider.childNodes;
		
		for(let i = 0; i < list.length; i++){
			let workoutItem = list[i].getElementsByClassName('img-cont')[0];
			
			if(workoutItem)
				workoutItem.style.height = itemWidth +'px';
		}
	}
	
	moveScroll(dir, pos){
		const move = pos * 0.08;
		
		this.refs.slider.refs.slider.scrollLeft += move * dir;
		
		/* LEFT ARROW*/
		if(this.refs.slider.refs.slider.scrollLeft > 0){
			this.setState({
				arrowL: 'block'
			})
		}
		else{
			this.setState({
				arrowL: 'none'
			})
		}
		
		/* RIGHT ARROW*/
		if(this.refs.slider.refs.slider.scrollLeft + this.refs.slider.refs.slider.offsetWidth >= this.refs.slider.refs.slider.scrollWidth){
			this.setState({
				arrowR: 'none'
			})
		}
		else{
			this.setState({
				arrowR: 'block'
			})
		}
			
			
		if(pos-move > 10)
			requestAnimationFrame(() => this.moveScroll(dir, pos-move));
	}
	
	render() {
		
		return(
			<ItemList wo={this.props.wo} onClick={ this.props.onClick } arrowL={this.state.arrowL} arrowR={this.state.arrowR} move={this.moveScroll} noName={this.props.noName} ref="slider" top={this.state.top} />
		)
	}
}

export default F2xItemList;