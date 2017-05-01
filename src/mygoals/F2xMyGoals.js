import React, {Component} from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { setVisibilityModal, ModalVisibilityFilters, ModalTypes } from '../actions'






/*
 * Global Vars & Functions
 */
import { store } from '../';


/*
 * Style
 */
import './F2xMyGoals.css';


class f2xMyGoals extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        store.dispatch( setVisibilityModal(ModalVisibilityFilters.SHOW, ModalTypes.MYGOALS_BECOME_PLATINUM) )
    }

    render() {
        return (
            <div className="f2x-my-goals" >
            </div>
        )
    }
}

const F2xMyGoals = connect(
	
)(f2xMyGoals);

export default F2xMyGoals