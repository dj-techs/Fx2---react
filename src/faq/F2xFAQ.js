import React, {Component} from 'react';



/*
 * Components
 */
import F2xFooter from '../components/F2xFooter.js';



/*
 * Style
 */
import './F2xFAQ.css';



const FAQStatud = (props) => (
	<div className="f2x-faq-status">
		{props.text}
	</div>
)


class FAQ extends Component {
	constructor(props){
		super(props);
		
		this.state = {
			mode: '+'
		}
		
		this.toggle = this.toggle.bind(this);
	}
	
	toggle(){
		const {mode} = this.state;
		
		const newMode = mode === '+' ? '-' : '+'
		
		this.setState({
			mode: newMode
		})
		
		this.refs.text.style.height = newMode === '-' ? this.refs.text.scrollHeight +'px' : 0;
	}
	
	
	render() {
		const {title, children} = this.props;
		
		return (
			<div className="f2x-faq">
				<div className="f2x-faq-title cursor" onClick={this.toggle}>
					<FAQStatud text={this.state.mode} /> {title}
				</div>
				
				<p className="f2x-faq-text" ref="text">
					{children}
				</p>
			</div>
		)
	}
}




const F2xFAQ = () => (
	<div className="f2x-info-web f2x-policy">
		<div className="f2x-info-title separated">
			FAQ
		</div>
		
		
		<div className="f2x-info-text separated">
			<FAQ title="FAQ Question Title 1">
				Quisque tempus pretium nisi. Praesent tincidunt semper felis, vitae feugiat velit aliquet nec. Ut scelerisque laoreet imperdiet. Donec aliquet lacus eu efficitur laoreet. Sed mollis semper sapien luctus efficitur.
			</FAQ>
			
			<FAQ title="FAQ Question Title 2">
				Quisque tempus pretium nisi. Praesent tincidunt semper felis, vitae feugiat velit aliquet nec. Ut scelerisque laoreet imperdiet. Donec aliquet lacus eu efficitur laoreet. Sed mollis semper sapien luctus efficitur.
				<br />
				<br />
				Quisque tempus pretium nisi. Praesent tincidunt semper felis, vitae feugiat velit aliquet nec. Ut scelerisque laoreet imperdiet. Donec aliquet lacus eu efficitur laoreet. Sed mollis semper sapien luctus efficitur.
			</FAQ>
			
			<FAQ title="FAQ Question Title 3">
				Quisque tempus pretium nisi. Praesent tincidunt semper felis, vitae feugiat velit aliquet nec. Ut scelerisque laoreet imperdiet. Donec aliquet lacus eu efficitur laoreet. Sed mollis semper sapien luctus efficitur.
			</FAQ>
			
			<FAQ title="FAQ Question Title 4">
				Quisque tempus pretium nisi. Praesent tincidunt semper felis, vitae feugiat velit aliquet nec. Ut scelerisque laoreet imperdiet. Donec aliquet lacus eu efficitur laoreet. Sed mollis semper sapien luctus efficitur.
			</FAQ>
			
			<FAQ title="FAQ Question Title 5">
				Quisque tempus pretium nisi. Praesent tincidunt semper felis, vitae feugiat velit aliquet nec. Ut scelerisque laoreet imperdiet. Donec aliquet lacus eu efficitur laoreet. Sed mollis semper sapien luctus efficitur.
			</FAQ>
			
			<FAQ title="FAQ Question Title 6">
				Quisque tempus pretium nisi. Praesent tincidunt semper felis, vitae feugiat velit aliquet nec. Ut scelerisque laoreet imperdiet. Donec aliquet lacus eu efficitur laoreet. Sed mollis semper sapien luctus efficitur.
			</FAQ>
			
			<FAQ title="FAQ Question Title 7">
				Quisque tempus pretium nisi. Praesent tincidunt semper felis, vitae feugiat velit aliquet nec. Ut scelerisque laoreet imperdiet. Donec aliquet lacus eu efficitur laoreet. Sed mollis semper sapien luctus efficitur.
			</FAQ>
			
			<FAQ title="FAQ Question Title 8">
				Quisque tempus pretium nisi. Praesent tincidunt semper felis, vitae feugiat velit aliquet nec. Ut scelerisque laoreet imperdiet. Donec aliquet lacus eu efficitur laoreet. Sed mollis semper sapien luctus efficitur.
			</FAQ>
			
			<FAQ title="FAQ Question Title 9">
				Quisque tempus pretium nisi. Praesent tincidunt semper felis, vitae feugiat velit aliquet nec. Ut scelerisque laoreet imperdiet. Donec aliquet lacus eu efficitur laoreet. Sed mollis semper sapien luctus efficitur.
			</FAQ>
			
			<FAQ title="FAQ Question Title 10">
				Quisque tempus pretium nisi. Praesent tincidunt semper felis, vitae feugiat velit aliquet nec. Ut scelerisque laoreet imperdiet. Donec aliquet lacus eu efficitur laoreet. Sed mollis semper sapien luctus efficitur.
			</FAQ>
		</div>
		
		<F2xFooter />
	</div>
)


export default F2xFAQ;