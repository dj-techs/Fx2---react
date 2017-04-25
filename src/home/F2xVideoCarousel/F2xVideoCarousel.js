import React, { Component } from 'react';
import { connect } from 'react-redux'


/*
 * Global Vars & Functions
 */
import { store } from '../../';
import { MURL , guest, isMobile, isIOS } from '../../data/data';   
import { setVisibilityModal, ModalVisibilityFilters, ModalTypes } from '../../actions';



/*
 * Components
 */
import F2xButton from '../../components/F2xButton';
import F2xItemList from '../../components/F2xItemList';
import F2xVideo from '../../components/F2xVideo';




/*
 * Style
 */
import './F2xVideoCarousel.css';






//
// ******* VIDEO BACKGROUND CAROUSEL
//



//Container component
/*const f2xWorkout = ({list}) => (
	<div className="f2x-home-workout-list">
		<F2xItemList wo={ list } onClick={( id, mode ) => console.log(id, mode) }/>
	</div>	
)*/

class f2xVideoCarousel extends Component{

	constructor(props) {
	    super(props);
	
	    this.state = { 
           	id: 0,
			more: 'none',
			text: 'show details +',
			views: [0],
			autoPlay: 'false',
			filter: 'none'
	    };
	}

	nextVideo(){
		const { id } = this.state;
		let { views } = this.state;
		
		const nextId = (id+1 < 6 ? id+1 : 0);
		
		views.push(nextId);
		
		this.setState({
			id: nextId,
			views: views
		})
	}

	render() {
		const video = [
			"../../media/video/1.mp4",
			"../../media/video/2.mp4",
			"../../media/video/3.mp4",
			"../../media/video/4.mp4",
			"../../media/video/5.mp4",
			"../../media/video/6.mp4"
		];
		return (
			<div className="f2x-video-carousel">
				<div className="fullscreen-bg">
					<F2xVideo workoutID={0} datas={} url={"../../media/video/1.mp4"} poster={} nextVideo={() => this.nextVideo()} play={() => this.playVideo()} last={item.exercises.length === this.state.id+1} autoPlay={this.state.autoPlay} />
					<video
						ref="backVideo"
						className="bg-back-video"
						preload="auto"
						src={"../../media/video/1.mp4"}
					/>
					<div className="alphaMask"></div>
					<video
						ref="foreVideo"
						className="bg-fore-video"
						preload="auto"
						src={"../../media/video/1.mp4"}
					/>
					<div className="blurMask">
						<video
						ref="blurVideo"
						className="bg-back-video"
						preload="auto"
						src={"../../media/video/1.mp4"}
						/>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	const { videoCarousel } = state;
	
	return {
		list: videoCarousel.list
	};
}

const F2xVideoCarousel = connect(
	mapStateToProps 
)(f2xVideoCarousel) 



export default F2xVideoCarousel;