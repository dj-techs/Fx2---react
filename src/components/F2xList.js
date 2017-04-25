import React, {Component} from 'react';




/*
 * Style
 */
import './F2xList.css';




const WorkoutListLi = (props) => (
	<li className="f2x-list-item"   onClick={ (e) => props.onClick(props.name, props.uID)}  >{props.name}</li>
);


class F2xList extends Component {
	componentDidMount(){
		window['Ps'].initialize(this.refs.listBox);
	}
	
	render(){
		const {list, onClick} = this.props;
		
		return (
			<ul className="f2x-list small-font" ref="listBox">
				{
					list.map(
						(item, i) =>
							<WorkoutListLi key={i} name={item.name} uID={item.value} onClick={ (e,i) => onClick(e,i)} />
					)
				}
			</ul>
		);
	}
}

export default F2xList;