import './LoginPage.css'
import React from "react";
import { Link } from 'react-router-dom';
import {Button} from "@material-ui/core";



export default function PasswordSupply() {
	
		return (
			<div className='LoginPage_LoginPage'>
				<span className='LOGIN'>SUPPLY PASSWORD</span>
				<div className='pnlMain'/>
				<span className='FILLINYOURDETAILS'></span>

				<form id="forgotPswEmail">
					<span className='EMAIL'>PASSWORD</span>
					<input type='password' className='edtEmail'/>
				</form>

				<Link to='/volunteerhomepage'>
					<Button className='btnConfirm'>
						Confirm
					</Button>
				</Link>

				<Link to='/forgotpassword'>
					<Button className='btnBack'>
						BACK
					</Button>
				</Link>
			</div>
		)
	
}