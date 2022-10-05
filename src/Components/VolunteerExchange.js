import React from 'react'
import './VolunteerExchange.css'
import { Link } from 'react-router-dom'
import VolunteersService from "../Services/volunteers.service";
import logo from '../public/HeartFlow_Logo_02.png'


let volunteerList = []
export default class VolunteerExchange extends React.Component {
	

	constructor(props) {
		super(props);
		this.submit = this.submit.bind(this)
		this.onChangeCouponAmount = this.onChangeCouponAmount.bind(this)
		this.onChangeReason = this.onChangeReason.bind(this)
		this.onChangeSerial = this.onChangeSerial.bind(this)
		this.onChangeStart = this.onChangeStart.bind(this)
		this.onChangeVolunteer = this.onChangeVolunteer.bind(this)

		this.state = {
			couponAmount : 1,
			serialLetter : "",
			rangeEnd : 1,
			rangeBegin : 1,
			reason: "",
			volunteer: ""
		}

		VolunteersService.getVolunteers(
			localStorage.getItem("userToken")
		).then(response => {
			volunteerList = []
			for (let i = 0; i < response.data.length; i++) {
				volunteerList.push(response.data[i].id + " " + response.data[i].first_name + " " + response.data[i].last_name)
			}
			this.forceUpdate()
		})
	}

	onChangeReason(e) {
		this.setState({
			reason : e.target.value
		})
	}

	onChangeVolunteer(e) {
		this.setState({
			volunteer : e.target.value
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

	async submit(e) {
			let form = document.getElementById("exchangeForm")
			let volunteerId
			for (let i = 0; i < this.state.volunteer.length; i++) {
				if (this.state.volunteer[i] === " ") {
					volunteerId = this.state.volunteer.substring(0, i)
					break
				}
			}
			//TODO change to VolunteerID
			if (form.checkValidity()) {
				await VolunteersService.exchangeCoupons(
					localStorage.getItem("userToken"),
					this.state.couponAmount,
					this.state.serialLetter,
					this.state.rangeBegin,
					this.state.rangeEnd,
					this.state.reason,
					volunteerId
			).then(response => {
					if (response.status === 200) {
						alert("Successfully logged the exchanged coupons")
					} else if (response.status === 201) {
						alert("This has been flagged as there is no record of this coupons")
					} else {
						alert("Unknown database error")
					}
				})
				//RESPONSE
				form.submit()
			} else {
				form.reportValidity()
			}
		}

	render() {
		if (localStorage.getItem("userToken") == null) {
				window.location.href = "/loginpage"
		} else {
			return (
				<div className='VolunteerExchange_VolunteerExchange'>
					<div className='Header'/>
					<div className='Footer'/>
					<img className='logo' src = {logo} alt="Heartflow logo"/>

					<div className='pnlMain' />
					<span className='VOLUNTEEROFEXCHANGE'>VOLUNTEER OF EXCHANGE</span>

					<span className='NUMBEROFCOUPONS'>NUMBER OF COUPONS</span>
					<span className='REASONFOREXCHANGE'>REASON FOR EXCHANGE</span>
					<span className='COUPONSEXCHANGE'>COUPONS EXCHANGE</span>
					<span className='SERIALLETTER'>SERIAL LETTER</span>
					<span className='RANGESTART'>RANGE START</span>
					<span className='RANGEEND'>RANGE END</span>


					<form id="exchangeForm" action="http://localhost:3000/volunteerhomepage">
						<input type='number' className='edtNrCoupon' onChange={this.onChangeCouponAmount} required={true} min={1}/>
						<input type='text' className='serialLetter' onChange={this.onChangeSerial} required={true} maxLength={1} value={this.state.serialLetter}/>

						<select className='edtVolunteer' onChange={this.onChangeVolunteer} required={true} >
							{volunteerList.map((volunteer) => {
								return <option value={volunteer}>{volunteer}</option>
							})}
							<option value="" disabled selected hidden>Choose a Volunteer</option>
						</select>

						<input type='number' className='rangeStart' onChange={this.onChangeStart} required={true} value={this.state.rangeBegin}/>
						<input type='number' className='rangeEnd' onChange={this.onChangeEnd} readOnly={true} value={this.state.rangeEnd}/>
						<input type='text' className='edtReason' onChange={this.onChangeReason} required={true}/>
					</form>

					<div className='btnConfirm' onClick={this.submit}>CONFIRM</div>

					<Link to='/volunteerhomepage'>
						<div className='btnBack'>BACK</div>
					</Link>

				</div>
			)
		}
	}
}