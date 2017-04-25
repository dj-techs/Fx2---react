import React from 'react';



/*
 * Componentss
 */
import F2xVideo from '../../components/F2xVideo'



/*
 * Style
 */
import './F2xWVplayer.css';





const F2xEVplayer = (props) => (
	<F2xVideo datas={props.datas} url={props.video.urls['720p']} poster={ props.video.poster }/>
);

export default F2xEVplayer;