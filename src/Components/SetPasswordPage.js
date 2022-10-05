import React from 'react'
import './SetPasswordPage.css'
import { useLocation } from 'react-router-dom'
import AuthService from "../Services/auth.service";
import { useState } from "react";
import logo from '../public/HeartFlow_Logo_02.png'
import {Button} from "@material-ui/core";

async function handleSubmit(password, token) {
	console.log(password, token)
	AuthService.setPassword(
		password,
		token
	).then(res => {
		console.log(res)
	}
	)
}

export default function SetPasswordPage() {
	const location = useLocation()
	const params = new URLSearchParams(location.search)
	console.log(params.get("token"))
	const [password, setPassword] = useState('');
	function checkSame() {
		var psw1 = document.getElementByiD('pswd1');
		var psw2 = document.getElementByiD('pswd2');
		if (psw1.value != psw2.value) {
			alert("Passwords don't match!");
			return false;
		}
	}
	return (

		<div className='PasswordPage_PasswordPage'>
			<img className='logo' src = {logo}/>
			<div className='pnlMain'>

				<span className='SETPASSWORD'>CREATE A PASSWORD</span>
				<span className='PASSWORD'>PASSWORD</span>
				<span className='CONFIRM'>CONFIRM PASSWORD</span>

				<form action='/loginpage' onSubmit={() => handleSubmit(password, params.get("token"))}>
					<input type="password" id="pswd1" name='psw1' className="edtPassword"/>
					<input type="password" id="pswd2" name='psw2' required onchange="return checkSame()"
						className="edtConfirm" onChange={event => setPassword(event.target.value)} />
				</form>

				<Button className='btnConfirm' onSubmit={() => handleSubmit(password, params.get("token"))}>
						CONFIRM
				</Button>

			</div>

		</div>

	)
}