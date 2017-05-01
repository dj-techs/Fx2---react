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
import './F2xGoalGraph.css';


class f2xGoalGraph extends Component {
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

const F2xGoalGraph = connect(
	
)(f2xGoalGraph);

export default F2xGoalGraph