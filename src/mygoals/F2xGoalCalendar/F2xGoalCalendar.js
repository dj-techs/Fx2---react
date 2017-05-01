import React, {Component} from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { setVisibilityModal, ModalVisibilityFilters, ModalTypes } from '../../actions'






/*
 * Global Vars & Functions
 */
import { store } from '../../';


/*
 * Style
 */
import './F2xGoalCalendar.css';


class f2xGoalCalendar extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="f2x-goal-calendar" style={{ width: '100%', height: '400px', backgroundColor: 'black', color:'white'}}>
                goal-calendar is working.
            </div>
        )
    }
}

const F2xGoalCalendar = connect(
	
)(f2xGoalCalendar);

export default F2xGoalCalendar