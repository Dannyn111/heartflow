import './LoginPage.css'
import React, {Component} from "react";
import { Link } from 'react-router-dom';
import {Button} from "@material-ui/core";
import authService from "../Services/auth.service";
import logo from '../public/HeartFlow_Logo_02.png'
import emblem from '../public/HF_emblem.png'
import igLogo from '../public/ig_logo.png'
import fbLogo from '../public/fb_logo.png'

export default class LoginPage extends Component {
	constructor(props) {
		super(props);

		this.handleLogin = this.handleLogin.bind(this);
		this.onChangeEmail = this.onChangeEmail.bind(this);
		this.onChangePassword = this.onChangePassword.bind(this);

		this.state = {
			email: "",
			password: "",
			message:""
		}
	}

	async handleLogin(e) {
		e.preventDefault();
		let success = false
		let volunteer
		let token
		let form = document.getElementById("loginForm")
		if (form.checkValidity()) {
			try {
				await authService.login(
				this.state.email,
				this.state.password
				).then(response => {
					if (response.status === 200) {
						token = response.data.token + ''
						localStorage.setItem("userToken", token)
						success = true
					}
				})
			} catch (e) {
				alert("Password or username is incorrect!")
			}

			if (success) {
				authService.userType(
					token
				).then(response => {
					volunteer = response.data['userType'] === 'volunteer'
					let form = document.getElementById("loginForm")
					if (volunteer === true) {
						form.action = "http://localhost:3000/volunteerhomepage"
						localStorage.setItem("Volunteer", "TRUE")
					} else {
						form.action = "http://localhost:3000/directorhomepage"
						localStorage.setItem("Volunteer", "FALSE")
					}

					document.body.appendChild(form)
					form.submit()
				})
			}

		} else {
			form.reportValidity()

		}
	}

	onChangePassword(e) {
		this.setState({
		  password: e.target.value
		});
  	}

	onChangeEmail(e) {
		this.setState({
		  email: e.target.value
		});
  	}

	render() {
		return (
			<div className='LoginPage_LoginPage'>
				<div className='Header'></div>
				<div className='Footer'>
					<span className='CONTACT'>CONTACT US</span>
					<Link to={{ pathname: "https://www.instagram.com/heartflow_npc/" }} target="_blank">
						<img className='IG_logo' src = {igLogo}/>
					</Link>	
					<Link to={{ pathname: "https://www.facebook.com/HeartFlowHomeless/" }} target="_blank">
						<img className='FB_logo' src = {fbLogo}/>
					</Link>
				</div>
				<img className='logo' src = {logo}/>
				<img className='emblem' src = {emblem}/>

				<div className='pnlMain'>
					<span className='LOGIN'>LOG IN</span>

					<span className='EMAIL'>EMAIL</span>
					<span className='PASSWORD'>PASSWORD</span>

					<form id="loginForm">
						<input type='email' className='edtEmail' value={this.state.email}
							   onChange={this.onChangeEmail} required={true}/>
						<input type='password' className='edtPassword' value={this.state.password}
		   					onChange={this.onChangePassword} required={true}/>
					</form>
					<Button className='btnConfirm' onClick={this.handleLogin}>
						CONFIRM
					</Button>
					<Link to={{ pathname: "http://127.0.0.1:8000/reset_password" }} target="_blank">
						<Button className='btnForgot'>
							Forgot Password?
						</Button>
					</Link>
				</div>
				
				<Link to='/'>
					<Button className='btnBack'>
						BACK
					</Button>
				</Link>
			</div>
		)
	}
}