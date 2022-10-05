import React, { Component } from 'react'
import './VolunteerPickUpPage.css'
import { Link } from 'react-router-dom'
import VolunteersService from "../Services/volunteers.service";
import logo from '../public/HeartFlow_Logo_02.png'
import AuthService from "../Services/auth.service";


let locationList = []
export default class VolunteerPickUpPage extends Component {
	constructor(props) {
		super(props);
		this.submit = this.submit.bind(this)
		this.onChangeCouponAmount = this.onChangeCouponAmount.bind(this)
		this.onChangeLocation = this.onChangeLocation.bind(this)
		this.onChangeSerial = this.onChangeSerial.bind(this)
		this.onChangeStart = this.onChangeStart.bind(this)

		this.state = {
			couponAmount: 1,
			serialLetter: "",
			rangeEnd: 1,
			rangeBegin: 1,
			location: "",
		}

		VolunteersService.getSource(
			localStorage.getItem("userToken")
		).then(response => {
			locationList = []
			for (let i = 0; i < response.data.length; i++) {
				locationList.push(response.data[i].name)
			}
			this.forceUpdate()
		})
	}

	async submit(e) {
		let form = document.getElementById("pickupForm")
		if (form.checkValidity()) {
			await VolunteersService.pickupCoupons(
				localStorage.getItem("userToken"),
				this.state.couponAmount,
				this.state.location,
				this.state.serial_letter,
				this.state.rangeBegin,
				this.state.rangeEnd
			).then(response => {
				if (response.status === 200) {
					alert("Succesfully logged the pickup from " + this.state.location)
				} else if (response.status === 201) {
					alert("Duplicate values have been picked up, this coupons will be flagged when used")
				} else {
					alert("There has been an error")
				}
			})
			//RESPONSE
			form.submit()
		} else {
			form.reportValidity()
		}
	}


	onChangeLocation(e) {
		this.setState({
			location: e.target.value
		})
	}

	onChangeCouponAmount(e) {
		this.setState({
			couponAmount: e.target.value
		})
		let end = (this.state.rangeBegin * 1) + (e.target.value * 1)
		end--
		this.setState({
			rangeEnd: end
		})
	}

	onChangeSerial(e) {
		const re = /^[A-Za-z]$/;
		if (re.test(e.target.value) || isNaN(e.target.value.charCodeAt(0))) {
			let code = e.target.value.toUpperCase()
			this.setState({
				serialLetter: code
			})
		}
	}

	onChangeStart(e) {
		this.setState({
			rangeBegin: e.target.value,
		})
		let end = (this.state.couponAmount * 1) + (e.target.value * 1)
		end--
		this.setState({
			rangeEnd: end
		})
	}



	render() {
		if (localStorage.getItem("userToken") == null) {
			window.location.href = "/loginpage"
		} else {
			return (
				<div className='VolunteerPickUpPage_VolunteerPickUpPage'>
					<div className='Header' />
					<div className='Footer' />
					<img className='logo' src={logo} alt="Heartflow logo" />

					<div className='pnlMain' />
					<span className='LOCATIONOFPICKUP'>LOCATION OF PICKUP</span>
					<span className='SERIALLETTER'>SERIAL LETTER</span>
					<span className='RANGEEND'>RANGE END</span>
					<span className='RANGESTART'>RANGE START</span>
					<span className='NUMBEROFCOUPONS'>NUMBER OF COUPONS</span>
					<span className='COUPONSPICKUP'>COUPONS PICK UP</span>


					<form id="pickupForm" action="http://localhost:3000/volunteerhomepage">
						<input type='number' className='edtNrCoupon' onChange={this.onChangeCouponAmount} required={true} min={1} defaultValue={1} />
						<select className='edtLocation' onChange={this.onChangeLocation} required={true} >
							{locationList.map((location) => {
								return <option value={location}>{location}</option>
							})}
							<option value="" disabled selected hidden>Choose a Location</option>
						</select>
						<input type='text' className='edtSerial' value={this.state.serialLetter} onChange={this.onChangeSerial} maxLength={1} required={true} />
						<input type='number' className='edtStart' onChange={this.onChangeStart} required={true} defaultValue={1} min={1} />
						<input type='number' className='edtEnd' value={this.state.rangeEnd} readOnly={true} />
					</form>

					<button className='btnConfirm' onClick={this.submit}>CONFIRM</button>


					<Link to='/volunteerhomepage'>
						<div className='btnBack'>BACK</div>
					</Link>

				</div>
			)
		}
	}


}