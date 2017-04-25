import React, { Component } from 'react';

import { findDOMNode } from 'react-dom';




/*
 * Icons
 */
import removeIcon from '../media/removework.svg';

/*
 * Components
 */
import F2xIcon from './F2xIcon';
import F2xItemTypes from '../exercise/F2xItemTypes';


/*
 * Data
 */
import { MURL } from '../data/data';



/*
 *
 */	

import { DragSource, DropTarget } from 'react-dnd';
import {removeExercise} from '../data/workout_tools';




// Exercises as cards inside the workout area to reorganize


function targetConnect(connect) {
  return {
	  connectDropTarget: connect.dropTarget()
  };
}

function sourceConnect(connect, monitor) {
  return {
	  connectDragSource: connect.dragSource(),
	  isDragging: monitor.isDragging()
  };
}





const exerCardSource = {
  beginDrag(props) {
	  
    return {
      id: props.id,
      index: props.index
    };
  },
  endDrag(props, monitor, component) {
	  if(monitor.didDrop()) return;
	  
	  if(monitor.getDifferenceFromInitialOffset().y >= 100)
	  	removeExercise(props.uid, undefined);
	  return;
  }
};


const exerCardTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }
    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    props.moveExerCard(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  }
};



class F2xWorkExPreview extends Component {
	render(){
		const { uid, cover, onClick  } = this.props;
		const { connectDragSource, connectDropTarget } = this.props;
		//const opacity = isDragging ? 0 : 1;
		return connectDragSource(connectDropTarget(
			<div style={{backgroundImage: 'url('+ MURL + cover +')'}} className="f2x-add-workout" >
				<F2xIcon className="remove cursor" icon={ removeIcon } onClick={ () => onClick(uid) } />
			</div>
		));
	}
}


F2xWorkExPreview = DropTarget(F2xItemTypes.EXERCARD, exerCardTarget, targetConnect)(F2xWorkExPreview);
F2xWorkExPreview = DragSource(F2xItemTypes.EXERCARD, exerCardSource, sourceConnect)(F2xWorkExPreview);

export default F2xWorkExPreview