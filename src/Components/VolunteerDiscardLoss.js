import React, { Component } from 'react'
import './VolunteerDiscardLoss.css'
import { Link } from 'react-router-dom'
import VolunteersService from "../Services/volunteers.service";
import logo from '../public/HeartFlow_Logo_02.png'

export default class VolunteerDiscardLoss extends Component {
	constructor(props) {
		super(props);
		this.submit = this.submit.bind(this)
		this.onChangeCouponAmount = this.onChangeCouponAmount.bind(this)
		this.onChangeReason = this.onChangeReason.bind(this)
		this.onChangeSerial = this.onChangeSerial.bind(this)
		this.onChangeStart = this.onChangeStart.bind(this)

		this.state = {
			couponAmount: 1,
			serialLetter: "",
			rangeEnd: 1,
			rangeBegin: 1,
			reason: ""
		}
	}

	async submit(e) {
		console.log(this.state.rangeEnd)
		let form = document.getElementById("discardlostForm")
		if (form.checkValidity()) {
			await VolunteersService.discardCoupons(
				localStorage.getItem("userToken"),
				this.state.couponAmount,
				this.state.reason,
				this.state.serialLetter,
				this.state.rangeBegin,
				this.state.rangeEnd

			).then(response => {
				if (response.status === 200) {
					alert("Successfully logged the discarded coupons")
				} else if (response.status === 201) {
					console.log(response)
					alert("This has been flagged as there is no record of this coupons")
				} else {
					alert("Unknown database error")
				}
			})
			//RESPONSE
			// form.submit()
		} else {
			form.reportValidity()
		}
	}


	onChangeReason(e) {
		this.setState({
			reason: e.target.value
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
				<div className='VolunteerDiscardLoss_VolunteerDiscardLoss'>

					<div className='Header' />
					<div className='Footer' />
					<img className='logo' src={logo} alt="Heartflow logo"/>


					<div className='pnlMain' />
					<span className='SERIALLETTER'>SERIAL LETTER</span>
					<span className='RANGEEND'>RANGE END</span>
					<span className='RANGESTART'>RANGE START</span>



					<span className='NUMBEROFCOUPONS'>NUMBER OF COUPONS</span>
					<span className='REASONFORDISCARD'>REASON FOR DISCARD</span>
					<span className='COUPONSDISCARDLOST'>COUPONS DISCARD/LOST</span>

					<form id="discardlostForm" action="http://localhost:3000/volunteerhomepage">
						<input type='number' className='edtNrCoupon' onChange={this.onChangeCouponAmount} required={true} min={1} defaultValue={1} />
						<input type='text' className='edtSerial' value={this.state.serialLetter} onChange={this.onChangeSerial} maxLength={1} required={true} />
						<input type='number' className='edtStart' onChange={this.onChangeStart} required={true} defaultValue={1} min={1} />
						<input type='number' className='edtEnd' value={this.state.rangeEnd} readOnly={true} />
						<input type='text' className='edtReason' required={true} onChange={this.onChangeReason} />
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