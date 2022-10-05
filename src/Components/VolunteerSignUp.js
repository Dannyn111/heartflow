import React, { Component } from 'react'
import './VolunteerSignUp.css'
import { Link } from 'react-router-dom'
import { isEmail } from "validator";
import { Button } from '@material-ui/core'
import AuthService from "../Services/auth.service";
import logo from '../public/HeartFlow_Logo_02.png'
import emblem from '../public/HF_emblem.png'
import igLogo from '../public/ig_logo.png'
import fbLogo from '../public/fb_logo.png'
import {render} from "react-dom";


let branchList = []

export default class VolunteerSignUp extends Component {
	constructor(props) {
		super(props);

		this.onChangeName = this.onChangeName.bind(this);
		this.onChangeSurname = this.onChangeSurname.bind(this);
		this.onChangeBranch = this.onChangeBranch.bind(this);
		this.onChangeEmail = this.onChangeEmail.bind(this);
		this.onChangeCell = this.onChangeCell.bind(this);
		this.onChangeReason = this.onChangeReason.bind(this);
		this.handleSignUp = this.handleSignUp.bind(this);


		this.state = {
			name: "",
			surname: "",
			email: "",
			cell: "",
			branch: "",
			reason: "",
		};

		AuthService.getBranches(
		).then(response => {
			branchList = []
			for (let i = 0; i < response.data.length; i++) {
				branchList.push(response.data[i].name)
			}
			this.forceUpdate()
		})

	}

	onChangeName(e) {
		const re = /^[A-Za-z\s]*$/;
			if (re.test(e.target.value) || isNaN(e.target.value.charCodeAt(0))) {
				this.setState({
					name: e.target.value
				});
			}
	}

	onChangeSurname(e) {
		const re = /^[A-Za-z\s]*$/;
			if (re.test(e.target.value) || isNaN(e.target.value.charCodeAt(0))) {
				this.setState({
					surname: e.target.value
				});
			}
	}


	onChangeEmail(e) {
		this.setState({
			email: e.target.value
		});
	}


	onChangeCell(e) {
		this.setState({
			cell: e.target.value
		});
	}

	onChangeBranch(e) {
		this.setState({
			branch: e.target.value
		});
	}

	onChangeReason(e) {
		this.setState({
			reason: e.target.value
		});
	}

	async handleSignUp(e) {
		e.preventDefault();
		let success = false
		let form = document.getElementById("signupForm")
		if (form.checkValidity()) {
			try {
				await AuthService.volunteerSignup(
					this.state.name,
					this.state.surname,
					this.state.email,
					this.state.cell,
					this.state.branch,
					this.state.reason
				).then(
					response => {
						if (response.status === 200) {
							success = true
						} else {
							alert("Unknown error has occurred, please try again later!")
						}
					}
				)
			} catch (e) {
				alert("This email is already registered!")
			}

		} else {
			form.reportValidity()
		}
		if (success) {
			form.action = "http://localhost:3000/SignUpMessage"
			document.body.appendChild(form)
			form.submit()
		}
	}

	render() {
		return (
			<div>
				<div className='VolunteerSignUp_VolunteerSignUp'>
					<img className='logo' src={logo}/>
					<img className='emblem' src={emblem}/>

					<div className='Header'></div>
					<div className='Footer'>
						<span className='CONTACT'>CONTACT US</span>
						<Link to={{pathname: "https://www.instagram.com/heartflow_npc/"}} target="_blank">
							<img className='IG_logo' src={igLogo}/>
						</Link>
						<Link to={{pathname: "https://www.facebook.com/HeartFlowHomeless/"}} target="_blank">
							<img className='FB_logo' src={fbLogo}/>
						</Link>
					</div>

					<div className='pnlMain'>
						<span className='SIGNUP'>SIGN UP</span>
						<span className='NAME'>NAME</span>
						<span className='SURNAME'>SURNAME</span>
						<span className='EMAIL'>EMAIL</span>
						<span className='CELL'>PHONE NUMBER</span>
						<span className='BRANCH'>BRANCH</span>
						<span
							className='REASONFORWANTINGTOBECOMEAVOLUNTEER'>REASON FOR WANTING TO BECOME A VOLUNTEER</span>

						<form id="signupForm">
							<input type='text' className='edtName' onChange={this.onChangeName} required={true}/>
							<input type='text' className='edtSurname' onChange={this.onChangeSurname} required={true}/>
							<input type='email' className='edtEmail' onChange={this.onChangeEmail} required={true}/>
							<input type='tel' className='edtCell' onChange={this.onChangeCell} required={true}
								   pattern="[0-9]{10}"/>
							<select className='edtBranch' onChange={this.onChangeBranch} required={true}
									defaultValue={branchList[0]}>
								{branchList.map((branch) => {
									return <option value={branch}>{branch}</option>
								})}
								<option value="" disabled selected hidden>Choose a Branch</option>
							</select>
							<input type='text' className='edtReason' onChange={this.onChangeReason} required={true}/>
							<button className='btnConfirm' onClick={this.handleSignUp}>
								CONFIRM
							</button>
						</form>

					</div>
					<Link to='/'>
						<Button className='btnBack'>
							BACK
						</Button>
					</Link>
				</div>
			</div>
		)

	}


}