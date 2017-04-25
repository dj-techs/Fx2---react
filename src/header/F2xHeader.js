import React from 'react';

/*
 * Style
 */
import './F2xHeader.css';




/*
 * Components
 */
import F2xLogo from './F2xLogo/F2xLogo';
import F2xMenu from './F2xMenu/F2xMenu';
import F2xLogin from './F2xLogin/F2xLogin';





//
// ******* MAIN MENU
//
//
	const F2xHeader = () => (
		<header id="f2x-header" className="f2x-header allcaps">
			<F2xLogo />
			<F2xMenu />
			<F2xLogin/>
		</header>
	);




export default F2xHeader;