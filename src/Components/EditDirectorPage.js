import React, { Component } from 'react'
import './EditDirectorPage.css'
import { Link } from 'react-router-dom'
import {Button} from "@material-ui/core";
import VolunteersService from "../Services/volunteers.service";

export default class EditDirectorPage extends Component {

	constructor(props) {
		super(props);

		this.onChangeName = this.onChangeName.bind(this)
		this.onChangeSurname = this.onChangeSurname.bind(this)
		this.onChangeNumber = this.onChangeNumber.bind(this)
		this.submit = this.submit.bind(this)

		this.state = {
			name: "",
			surname: "",
			number: ""
		}

		VolunteersService.getVolunteerDetails(
			localStorage.getItem("userToken")
		).then(response => {
			if (response.status === 200) {
				console.log(response.data)
				this.setState({
					name: response.data["first_name"],
					surname: response.data["last_name"],
					email: response.data["email"],
					number: response.data["phone"]
				})
			}
 		})

	}

	async submit(e){
		let form = document.getElementById("editDirectorProfile")

		if (form.checkValidity()) {
			await VolunteersService.editDirectorProfile(
				localStorage.getItem("userToken"),
				this.state.name,
				this.state.surname,
				this.state.number
			).then(response => {
				if (response.status === 200) {
					alert("Successfully changed your details")
					form.submit()
				} else if (response.status === 404) {
					alert("Details could not be updated")
				} else {
					alert("Unknown error occured")
				}
			})
			//RESPONSE
		} else {
			form.reportValidity()
		}

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

	onChangeNumber(e) {
		this.setState({
			number: e.target.value
		})
	}

	render() {
		return (
			<div className='EditDirectorPage_EditDirectorPage'>
				<span className='EDITPROFILE'>EDIT PROFILE</span>
				<div className='pnlMain' />
				<span className='NAME'>NAME</span>
				<span className='NUMBER'>PHONE NUMBER</span>
				<span className='EMAIL'>EMAIL</span>
				<span className='SURNAME'>SURNAME</span>

				<form id='editDirectorProfile' action="http://localhost:3000/directorhomepage">
					<input type='text' className='edtName' onChange={this.onChangeName} value={this.state.name} required={true}/>
					<input type='text' className='edtSurname' onChange={this.onChangeSurname} value={this.state.surname} required={true}/>
					<input type='text' className='edtEmail' value={this.state.email} readOnly={true}/>
					<input type='tel' className='edtNumber' onChange={this.onChangeNumber} value={this.state.number} required={true} pattern="[0-9]{10}"/>

				</form>

				<Button className='btnApply' onClick={this.submit}>SUBMIT</Button>

				<Link to='/directorhomepage'>
					<Button className='btnCancel' > CANCEL </Button>
				</Link>

			</div>
		)
	}
}