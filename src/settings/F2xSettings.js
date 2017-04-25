import React, {Component} from 'react';
import { browserHistory } from 'react-router';



/*
 * Gloval Vars & Functions
 */
import { store } from '../';
import { goBack } from '../data/data';
import {setTitleMobile} from '../actions/';




/*
 * Style
 */
import './F2xSettings.css';



/*
 * Images
 */
import ICON_CLOSE from '../media/Icon_Close.svg';








class F2xSettings extends Component {
	componentWillMount(){
		store.dispatch( setTitleMobile('Settings') );
	}
	
	render() {
		return(
			<div className="f2x-account" style={{textAlign: 'center', minHeight: '568px', position: 'relative', height: '100%' }}>
				<div className="mobile">
					<div className="f2x-mobileSettings-header">
						<div>SETTINGS</div>
						<img src={ICON_CLOSE} alt="Close" className="close" onClick={() => goBack()} width="25" />
					</div>
					
					<div className="clear" />
					
					<div className="f2x-settings-title">
						ABOUT
					</div>
					
					<ul className="f2x-settings-list">
						<li onClick={() => browserHistory.push("/terms")}>Terms of Use</li>
						<li onClick={() => browserHistory.push("/policy")}>Privacy Policy</li>
						<li onClick={() => browserHistory.push("/contact")}>Contact Us</li>
						<li onClick={() => browserHistory.push("/faq")}>FAQ</li>
					</ul>
				</div>
			</div>
		)
	}
}


export default F2xSettings;