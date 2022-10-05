import './ForgetPswMessage.css'
import React from 'react'
import {Link} from 'react-router-dom'
import { Button } from '@material-ui/core'

export default function ForgotPswEmail () {
	return (
		<div className='ForgetPswMessage_ForgetPswMessage'>
			<span className='SENT'>YOUR PASSWORD HAS BEEN SENT TO YOU<br/>
			</span>

			<Link to='/passwordsupply'>
				<Button className='btnProceed'>PROCEED TO LOGIN</Button>
			</Link>
		
		</div>
	)
}