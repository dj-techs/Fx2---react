import React from 'react';
import { render } from 'react-dom';

/*
 * STYLE
 */
import './index.css';


import App from './App';



/*
 * Redux
 */
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers/index';


/*
 * Store
 */
export let store = createStore(reducer);



/*
 * Render App
 */
render(
	(
		<Provider store={store}>
			<App />
		</Provider>
	), 
	document.getElementById('root')
);
