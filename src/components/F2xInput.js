import React , { Component } from 'react';







/*
 * Components
 */
import F2xIcon from './F2xIcon';



/*
 * Style
 */
import './F2xInput.css';



/*
 * Icons
 */
import okIcon from '../media/form_ok.svg';
import errorIcon from '../media/button-cancel.svg';







class F2xInput extends Component{
	constructor(props){
		super(props);
		
		this.state = {
			slc: '',
			timer:''
		}
		
		this.focus = this.focus.bind(this);
		this.blur = this.blur.bind(this);
		this.change = this.change.bind(this);
	}
	
	componentDidMount() {
		const { value, disabled } = this.props;
		let { refID } = this.props;
		
		if(!refID)
			refID = 'input'
			
		if (value !== undefined) {			
			this.refs.label.className = "small-font separated slc";
			this.refs[refID].value = value;
		}
		
		if (disabled !== undefined) this.refs[refID].disabled = true;
		
		setTimeout(() => {
			if(this.refs[refID])
				if(this.refs[refID].value !== '')
					this.refs.label.className = "small-font separated slc";

		}
		, 400)
	}
	
	
	
	
	focus(){
		this.refs.label.className = "small-font separated slc";
		
		this.setState({
			slc: 'slc'
		});
	}
	
	blur(){
		const {refID} = this.props;
		if(!this.refs[refID]) return;
		
		if(this.refs[refID].value === '')
			this.refs.label.className = "small-font separated";
		
		this.setState({
			slc: ''
		})
	}
	
	componentWillReceiveProps(nextProps){
		const {refID} = this.props;
		
		if(this.refs[refID].value === '')
			this.blur();
	}
	
	change(e){
		const {onChange, refID} = this.props;
		
			
		if(this.refs[refID].value === '')
			this.refs.label.className = "small-font separated";
		else
			this.refs.label.className = "small-font separated slc";
		
		
		let onC = (e) => ''
		if(onChange)
			onC = onChange
			
		onC(e);
	}
	
	render(){
		const { type, className, boxClassName, icon, iconR, textR, textRClick, styleBox, styleIcon, style, styleSpan, placeholder, placeholderReal , errorRes, maxLength, iconClick  } = this.props;
		
		
		let {refID} = this.props;
		
		
		let iType = type ? type : 'text';
		let iClassName = className ? ' '+ className : '';
		
		let iIcon = '';
		if(icon)
			iIcon = (<F2xIcon className="f2x-input-icon" icon={icon} style={styleIcon} />);
			
		let iIconR = '';
		if(iconR)
			iIconR = (<F2xIcon className="f2x-input-icon-right cursor" icon={iconR} onClick={iconClick} />);
			
		let iTextR = '';
		if(textR)
			iTextR = (<div className="f2x-input-text-right small-font">{textR}</div>);
		
		if(textR && textRClick)
			iTextR = (<div className="f2x-input-text-right small-font cursor" onClick={() => textRClick()}>{textR}</div>);
			
		let iStyleBox = {position: 'relative'};
		if(styleBox)
			iStyleBox = Object.assign({}, iStyleBox, styleBox);
			
			
		let iStatus = '';
		let iStatusMsg = '';
		if(errorRes !== undefined){
			if(errorRes.status === 2){
				iStatusMsg = (<div className="info-msg">{errorRes.msg}</div>);
			}
			else{
				iStatus = (<F2xIcon className="f2x-input-icon-error" icon={errorRes.status === 1 ? okIcon : errorIcon} />);
				iStatusMsg = (<div className="error-msg">{errorRes.msg}</div>);	
			}
		}
		
		
		if(!refID)
			refID = 'input'
		
		let styleS = styleSpan;
		if(!styleS)
			styleS = {}
		
		return (
			<div className={`f2x-input-box${iClassName}`} style={iStyleBox}>
				{iIcon} {iIconR} {iTextR}{iStatus}{iStatusMsg}
				<label ref="label" className='small-font separated' style={Object.assign({left: iIcon !== ''? '30px' : '0'}, styleSpan)} onClick={() => this.refs[refID].focus()}>{placeholder}</label>
				<input	type={iType} 
						autoComplete="off"
						className={`f2x-input small-font ${iClassName} ${boxClassName} ${ errorRes && errorRes.status === 0 ? 'error':'' }`} 
						style={style} 
						placeholder={placeholderReal}
						ref={refID} 
						onChange={ (e) => this.change(e) /* Move event value up with onchange handler  */}
						onFocus={() => this.focus()}
						onBlur={() => this.blur()}
						maxLength={maxLength || false}
				/>
				<span className={this.state.slc}></span>
			</div>
		);
	}
}




export default F2xInput;