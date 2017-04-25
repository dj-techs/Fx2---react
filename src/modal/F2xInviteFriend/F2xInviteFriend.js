import React, { Component } from 'react';
import { connect } from 'react-redux';




/*
 * Components
 */
import F2xButton from '../../components/F2xButton'



/*
 * Style
 */
import './F2xInviteFriend.css';



/*
 * Icons
 */
import logo from '../../media/f2x-logo.svg';

//import instagram from '../../media/share_instagram.svg';
import facebook from '../../media/share_facebook.svg';
import twitter from '../../media/share_twitter.svg';











class f2xInviteFriend extends Component {
	copyLink(el){
		el.disabled = false;
		
		var editable = el.contentEditable; // Record contentEditable status of element
        var readOnly = el.readOnly; // Record readOnly status of element
        
       	el.contentEditable = true; // iOS will only select text on non-form elements if contentEditable = true;
       	el.readOnly = false; // iOS will not select in a read only form element
        
        var range = document.createRange();
        	range.selectNodeContents(el);
        
        var sel = window.getSelection();
        	sel.removeAllRanges();
			sel.addRange(range); // Does not work for Firefox if a textarea or input
        
        if (el.nodeName === "TEXTAREA" || el.nodeName === "INPUT") 
        	el.select(); // Firefox will only select a form element with select()
        
        if (el.setSelectionRange && navigator.userAgent.match(/ipad|ipod|iphone/i))
        	el.setSelectionRange(0, 999999); // iOS only selects "form" elements with SelectionRange
        
        el.contentEditable = editable; // Restore previous contentEditable status
        el.readOnly = readOnly; // Restore previous readOnly status 
	    
	    if (document.queryCommandSupported("copy")){
		    document.execCommand('copy');
		    
			el.disabled = true;
			el.blur();
			
			this.refs.copyText.style.opacity = 1;
			let textC = this.refs;
			
			setTimeout(function(){
				textC.copyText.style.opacity = 0;
			}, 1000);
		}
	}
	
	render() {
		const {url} = this.props;
		
		return (
			<div className="cuerpo">
				<div style={{marginTop: '30px', marginBottom: '12px'}}>
					<img src={logo} className="pc" alt="F2x Logo" style={{width: '100px', height: '80px', padding: '0', margin: '0 auto'}} />
				</div>
				
				
				<div className="small-font" style={{fontSize: '14px', width: '270px', margin: '0 auto', color: '#6b6b6b'}}>
					{/*<i>for every friend who becomes a F2X subscriber, receive 1 month free</i>*/}
				</div>
				
				<div style={{fontSize: '14px', margin: '12px 0 0 0'}}>
					Here is your invite link:
				</div>
				
				<input type="text" className="f2x-input-normal f2x-input-small" ref="copy" style={{position: 'absolute', left: '-10px', width: '2px', padding: '0', margin: '0', display: 'block'}} defaultValue={url} disabled="true" />
				
				<F2xButton name="COPY LINK" style={{padding: '4px 0', width: '200px', marginTop: '20px'}} onClick={ () => this.copyLink(this.refs.copy) } />
				
				<div ref="copyText" className="copied">
					Copied to clipboard
				</div>
			
				<div style={{fontSize: '14px', margin: '17px 0 7px 0'}}>Share link via:</div>
				
				<div style={{marginBottom: '90px'}}>
					{/*<img src={instagram} alt="Instagram" className="mobileInline" width="50" height="50" style={{margin: '0 7px', cursor: 'pointer'}} />*/}
					<img src={facebook} alt="Facebook" width="50" height="50" style={{margin: '0 7px', cursor: 'pointer'}} />
					<img src={twitter} alt="Twitter" width="50" height="50" style={{margin: '0 7px', cursor: 'pointer'}} />
				</div>
					
			</div>
		);
	}
}


const mapStateToProps = (state) => {
	const {invite_url} = state.user;
	
	
	return {
		url: invite_url
	}
}

const F2xInviteFriend = connect(
	mapStateToProps
)(f2xInviteFriend);



export default F2xInviteFriend