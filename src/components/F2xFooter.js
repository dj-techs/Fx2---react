import React from 'react';




/*
 * Style
 */
import './F2xFooter.css';




const F2xFooter = () => (
	<div className="f2x-account-share-advisory small-font" style={{marginTop: 100}}>
		© 2017 F2X, Inc. All Rights Reserved 
		
		<u className="cursor" onClick={() => window.open('/terms', '_blank')}>Terms of Use</u>
		<u className="cursor" onClick={() => window.open('/policy', '_blank')}>Privacy Policy</u>
		<u className="cursor" onClick={() => window.open('/contact', '_blank')}>Contact Us</u>
		<u className="cursor" onClick={() => window.open('/faq', '_blank')}>FAQ</u>
	</div>
)



export default F2xFooter;