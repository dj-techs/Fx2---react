import React from 'react';


/*
 * Style
 */
 
import './F2xAccountMenu.css';



const MenuLi = (props) => (
	<li className={`cursor ${props.className}`} onClick={ () => props.onClick() }>{props.item}</li>
)

const Menu = (props) => (
	<ul className="f2x-account-menu-list">
		{
			props.list.map(
				(item, i) =>
					<MenuLi key={i} item={item} className={props.active === i+1 ? 'active-normal' : 'inactive'} onClick={ () => props.onClick(i+1) } />
			)
		}
	</ul>
)



let menu = [
	'PROFILE',
	'EMAIL & PASSWORD',
	'MEMBERSHIP',
	'BILLING'
]


const F2xAccountMenu = (props) => (
	<div className="f2x-account-menu">
		<Menu list={menu} onClick={props.onClick} active={props.active} />
	</div>
)


export default F2xAccountMenu;