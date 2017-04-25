import React from 'react';





/*
 * Components
 */
import F2xVideo from '../../components/F2xVideo'



/*
 * Style
 */
import './F2xEVplayer.css';







const F2xEVplayer = (props) => (
	<F2xVideo exercise={true} datas={props.datas} url={props.video.urls['720p']} poster={ props.video.poster }/>
);


export default F2xEVplayer;