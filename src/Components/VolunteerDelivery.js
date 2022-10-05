import React, {Component} from 'react'
import './VolunteerDelivery.css'
import {Link} from 'react-router-dom'
import CheckedYesLabelYesStateDefault from "./CheckedYesLabelYesStateDefault"
import VolunteersService from "../Services/volunteers.service";
import logo from '../public/HeartFlow_Logo_02.png'


let outletList = []
export default class VolunteerDelivery extends Component {
	constructor(props) {
		super(props);

		this.submit = this.submit.bind(this)
		this.onChangeCouponAmount = this.onChangeCouponAmount.bind(this)
		this.onChangeComment = this.onChangeComment.bind(this)
		this.onChangeSerial = this.onChangeSerial.bind(this)
		this.onChangeStart = this.onChangeStart.bind(this)
		this.onChangeOutlet = this.onChangeOutlet.bind(this)

		this.state = {
			couponAmount : 1,
			serialLetter : "",
			rangeEnd : 1,
			rangeBegin : 1,
			comment: "",
			outlet: "",
		}

		VolunteersService.getOutlets(
			localStorage.getItem("userToken")
		).then(response => {
			outletList = []
			for (let i = 0; i < response.data.length; i++) {
				outletList.push(response.data[i].companyName)
			}
			this.forceUpdate()
		})

	}

	async submit(e) {
			let form = document.getElementById("deliveryForm")
			if (form.checkValidity()) {
				await VolunteersService.deliveredCoupons(
					localStorage.getItem("userToken"),
					this.state.couponAmount,
					this.state.comment,
					this.state.serialLetter,
					this.state.rangeBegin,
					this.state.rangeEnd,
					this.state.outlet
				).then(response => {
					console.log(response)
					if (response.status === 200) {
						alert("Succesfully logged the delivery at " + this.state.outlet)
					} else if (response.status === 201) {
						alert("This delivery has been flagged for duplicate values")
					} else {
						alert("Database error")
					}
				})
				//RESPONSE
				form.submit()
			} else {
				form.reportValidity()
			}
		}


		onChangeComment(e) {
			this.setState({
				comment : e.target.value
			})
		}

		onChangeCouponAmount(e) {
			this.setState({
				couponAmount : e.target.value
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
					serialLetter : code
				})
			}
		}

		onChangeStart(e) {
			this.setState({
				rangeBegin : e.target.value,
			})
			let end = (this.state.couponAmount * 1) + (e.target.value * 1)
			end--
			this.setState({
				rangeEnd: end
			})
		}

		onChangeOutlet(e) {
			this.setState({
				outlet: e.target.value
			})
		}

	render() {
		if (localStorage.getItem("userToken") == null) {
				window.location.href = "/loginpage"
		} else {
			return (
				<div className='VolunteerDelivery_VolunteerDelivery'>
					<div className='Header'/>
					<div className='Footer'/>
					<img className='logo' src = {logo} alt="Heartflow logo"/>
					
					<div className='pnlMain'/>

					<span className='RANGEEND'>RANGE END</span>
					<span className='COMMENTSABOUTDELIVERY'>COMMENTS ABOUT DELIVERY</span>
					<span className='RANGESTART'>RANGE START</span>
					<span className='OUTLET'>OUTLET</span>
					<span className='SERIALLETTER'>SERIAL LETTER </span>




					<span className='NUMBEROFCOUPONS'>NUMBER OF COUPONS</span>
					<span className='COUPONSDELIVERY'>COUPONS DELIVERY</span>

					<form id="deliveryForm" action="http://localhost:3000/volunteerhomepage">
						<input type='number' className='edtNrCoupon' onChange={this.onChangeCouponAmount} required={true} min={1} defaultValue={1}/>
						<input type='text' className='edtSerial' value={this.state.serialLetter} onChange={this.onChangeSerial} maxLength={1} required={true}/>
						<select className='edtOutlet' onChange={this.onChangeOutlet} required={true}>
								{outletList.map((outlet) => {
									return <option value={outlet}>{outlet}</option>
								})}
							<option value="" disabled selected hidden>Choose a Company</option>
						</select>
						<input type='number' className='edtStart' onChange={this.onChangeStart} required={true} defaultValue={1} min={1}/>
						<input type='number' className='edtEnd' value={this.state.rangeEnd} readOnly={true}/>
						<input type='text' className='edtComment' required={true} onChange={this.onChangeComment}/>
					</form>

					<button className='btnConfirm' onClick={this.submit}>CONFIRM</button>

					<Link to='/volunteerhomepage'>
						<div className='btnBack'>BACK</div>
					</Link>

					<CheckedYesLabelYesStateDefault className='Checkbox'/>
				</div>
			)
		}
	}

}