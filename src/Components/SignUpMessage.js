import React from 'react'
import './SignUpMessage.css'
import {Link} from 'react-router-dom'
import { Button } from '@material-ui/core'

export default function SignUpMessage () {
	return (
		<div className='SignUpMessage_SignUpMessage'>
			<span className='YOURREQUESTHASBEENSENTPLEASEAWAITFORAPPROVALFROMOURDIRECTOR'>YOUR REQUEST HAS BEEN SENT!
			<br/>PLEASE AWAIT FOR APPROVAL FROM OUR DIRECTOR.</span>

			<Link to='/'>
				<Button classname='btnOk'>
					OK
				</Button>
			</Link>
		
		</div>
	)
}