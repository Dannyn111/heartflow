import './ForgotPassword.css'
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Button } from "@material-ui/core";
import validator from 'validator';
import AuthService from "../Services/auth.service";

const email = value => {
	if (!validator.isEmail(value)) {
		return (
			<div className="alert alert-danger" role="alert">
				This is not a valid email.
			</div>
		);
	}
};

const required = value => {
	if (!value) {
		return (
			<div className="alert alert-danger" role="alert">
				This field is required!
			</div>
		);
	}
};


export default class ForgotPassword extends Component {
	constructor(props) {
		super(props)
		this.onChangeEmail = this.onChangeEmail.bind(this)
		this.handleEmail = this.handleEmail.bind(this)

		this.state = {
			email: '',
			emailError: '',
			success: false
		}
	}

	// when email input
	onChangeEmail(e) {
		this.setState({
			email: e.target.value
		});
	}

	async handleEmail(e) {
		await this.validate()

		if (this.state.emailError === '') {
			AuthService.forgotPassword(
				this.state.email
			).then(response => {
					this.setState({
						success: true
					})
				}

			)
		} else {
			e.preventDefault()
		}
		console.log(this.state.email); 
	}

	async validate() {
		if (!validator.isEmail(this.state.email)) {
			this.setState({
				emailError: 'Please enter a valid email!'
			})
		} else {
			this.setState({
				emailError: ''
			})
		}
	}

	render() {
		return (
			<div className='ForgotPassword_ForgotPassword'>
				<div className='pnlMain'>
					<span className='NOTE'>We'll send you an email containing your password</span>
				</div>	

				<span className='FILLINYOURDETAILS'>SUPPLY YOUR EMAIL</span>

				<form id="forgotPswEmail" action='/forgotpswemail' onSubmit={this.handleEmail}>
					<span className='EMAIL'>EMAIL</span>
					<input type='text' className='edtEmail' onChange={this.onChangeEmail}
						value={this.email} validations={[required, email]} required={true} />
					<input type="submit" className='btnConfirm' value="CONFIRM" />
				</form>

				<Link to='/forgotpswemail'>
					<Button className='btnConfirm'>
						CONFIRM
					</Button>
				</Link>

				<Link to='/loginpage'>
					<Button className='btnBack'>
						BACK
					</Button>
				</Link>
			</div>
		)
	}

}