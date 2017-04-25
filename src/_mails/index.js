import React, { Component } from 'react';




/*
 * Images
 */
const ICON_LOGO = 'http://jeekjee.net:8002/media/f2x_logo.png';








/*
 * Mail => FREE MOUNTH
 */
const MailFreeMounth = () => (
	<div>
		<div style={{fontSize: '25px', color: '#222222'}}>
			YOU’VE EARNED A FREE MONTH!
		</div>
		
		<div className="small-font" style={{letterSpacing: '1.05px', fontSize: '16px'}}>
			<div style={{marginTop: '40px'}}>
				<div>Your friend, <b style={{fontFamily: 'Montserrat, Arial'}}>Brittany Smith</b>, has</div>
				<div>accepted your invitation to join F2X.</div>
			</div>
			
			<div style={{margin: '50px 0 105px 0'}}>
				That means your next month is on us!
			</div>
		</div>
	</div>
)



/*
 * Mail => VERIFY
 */
const MailVirify = () => (
	<div>
		<div style={{fontSize: '25px'}}>
			VERIFY YOUR F2X ACCOUNT
		</div>
		
		<div className="small-font" style={{letterSpacing: '1.05px', fontSize: '14px'}}>
			<div style={{marginTop: '40px'}}>
				<div>To complete your registration for F2X,</div>
				<div>please verify your email.</div>
			</div>
		</div>
		
		<div style={{background: '#222', color: 'white', padding: '13px 0', width: '200px', margin: '60px auto 90px auto', fontSize: '14px', letterSpacing: '1.05px'}}>
			VERIFY ACCOUNT
		</div>
	</div>
)



/*
 * Mail => RESET PASSWORD
 */
const MailResetPassword = () => (
	<div>
		<div style={{fontFamily: '"Open Sans", Arial', letterSpacing: '1.05px', fontSize: '16px', textAlign: 'left'}}>
			<div>
				<div>Hi Daria,</div>
				<div style={{marginTop: '15px'}}>You recently made a request to reset your password. To reset your password and access your account, click the link below.</div>
			</div>
		</div>
		
		<div style={{background: '#222', color: 'white', padding: '13px 0', width: '200px', margin: '35px auto 32px auto', fontSize: '14px', letterSpacing: '1.05px'}}>
			RESET PASSWORD
		</div>
		
		<div style={{fontFamily: '"Open Sans", Arial', letterSpacing: '1.05px', fontSize: '16px', textAlign: 'left', marginBottom: '40px'}}>
			<div>
				<div>If you didn’t make this request or you believe an unauthorized person has accessed your account, change your password as soon as possible from your F2X account page. </div>
				<div style={{marginTop: '35px'}}>Thank you for using F2X!</div>
			</div>
		</div>
	</div>
)





/*
 * MAIL TEMPLATE
 */
class F2xMail extends Component {
	
	render() {
		const { pathParam } = this.props.params;
		
		let renderMail = '';
		
		switch(pathParam){
			case '1':
				renderMail = (<MailFreeMounth />);
				break;
			
			case '2':
				renderMail = (<MailVirify />);
				break;
			
			case '3':
				renderMail = (<MailResetPassword />);
				break;
				
			default:
				break;
		}
		
		return (
			<div style={{padding: '80px 0 0 0', textAlign: 'center', fontFamily: 'Montserrat, Arial', width: '100%'}}>
				<center>
					<div style={{width: '80%', margin: '0 auto', border: 'solid 1px #c8c8c8', maxWidth: '680px'}}>
						<img src={ICON_LOGO} alt="F2x" width="100" style={{margin: '95px 0 55px 0'}} />
						
						<div style={{padding: '0 8%', color: '#222222'}}>
							{renderMail}
						</div>
					</div>
					
					<div style={{margin: '30px auto 0 auto', color: '#969696', fontSize: '12px', fontWeight: 'bold', width: '80%', maxWidth: '680px'}}>
						Questions or concerns? Please <u style={{color: '#5a5a5a'}}>contact use</u>
					</div>
					
					<div style={{margin: '30px auto', color: '#969696', fontSize: '11px', width: '80%', maxWidth: '680px'}}>
						Delivered by F2X, Inc. 1234 56th Street, Suite 00, New York, NY, 10001, USA
					</div>
				</center>
			</div>
		)
	}
}


export default F2xMail;