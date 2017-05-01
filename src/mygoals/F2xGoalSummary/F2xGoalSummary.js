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
import './F2xGoalSummary.css';


class f2xGoalSummary extends Component {
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

const F2xGoalSummary = connect(
	
)(f2xGoalSummary);

export default F2xGoalSummary