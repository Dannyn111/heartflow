import React, {Component} from 'react'
import './CouponBuyPage.css'
import logo from '../public/HeartFlow_Logo_02.png'
import { Button } from '@material-ui/core'
import {Link} from 'react-router-dom'
import PayfastSecurity from "../Services/payfast.security";
import { isEmail } from "validator";
import emblem from '../public/HF_emblem.png'
import igLogo from '../public/ig_logo.png'
import fbLogo from '../public/fb_logo.png'
import AuthService from "../Services/auth.service";

let branchList = []

async function postTransaction(name, surname, email, branch, amount, paid) {
	let params;
	await PayfastSecurity.insertTransaction(
			name,
			surname,
			email,
			branch,
			amount,
			paid
		).then(response => {
			params = response
		})
	return params
}

export default class CouponBuyPage extends Component {
	constructor(props) {
		super(props);
		this.onChangeName = this.onChangeName.bind(this)
		this.onChangeSurname = this.onChangeSurname.bind(this)
		this.onChangeBranch = this.onChangeBranch.bind(this)
		this.onChangeCoupons = this.onChangeCoupons.bind(this)
		this.onChangeEmail = this.onChangeEmail.bind(this)
		this.submit = this.submit.bind(this)
		this.state = {
			name: '',
			surname: '',
			coupons: 0,
			price: 0,
			branch: '',
			signature: '',
			email: '',
			returnURL: 'http://localhost:3000/couponbuymessage',
			cancelURL: 'http://localhost:3000/paymentfailedmessage?',
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

	async submit() {
		let payfastForm = document.getElementById("PayfastForm")

		if (payfastForm.checkValidity()) {
			console.log(this.state.coupons)

			let params = await postTransaction(this.state.name, this.state.surname, this.state.email, this.state.branch, (this.state.coupons * 10), this.state.price)
			let paying = this.state.price + ''
			let signatureString = ''


			const returnUrl = "http://localhost:3000/couponbuymessage"
			let cancelUrl = "http://localhost:3000/paymentfailedmessage?ref=" + params
			const descript = "You are buying " + ((this.state.coupons) * 10) + " coupons from the " + (this.state.branch) + " branch."
			console.log(cancelUrl)
			await PayfastSecurity.getSignature("10027098", "eg5a9b4ysxts2", "http://localhost:3000/couponbuymessage",
				cancelUrl, "https://2058-146-232-65-121.eu.ngrok.io/notificationPage", params, paying, "Heartflow Coupons",
				this.state.name, this.state.surname, this.state.email, descript).then(response => {
					signatureString = response
			})
			console.log(signatureString)

			// let payfastForm_2 = document.getElementById("PayfastForm_2")
			// let payfastForm_3 = document.getElementById("PayfastForm_3")

			payfastForm.action = 'https://sandbox.payfast.co.za​/eng/process'
			payfastForm.method = 'POST'
			//TODO Add error catching here
			payfastForm.innerHTML = `<input type="hidden" name="merchant_id" value="10027098"/>` +
				`<input type="hidden" name="merchant_key" value="eg5a9b4ysxts2"/>` +
				`<input type="hidden" name="return_url" value="http://localhost:3000/couponbuymessage"/>` +
				`<input type="hidden" name="cancel_url" value=${cancelUrl}>` +
				`<input type="hidden" name="notify_url" value="https://356f-146-232-65-175.eu.ngrok.io/notificationPage"/>` +
				`<input type="hidden" name="name_first" value=${this.state.name}>` +
				`<input type="hidden" name="name_last" value=${this.state.surname}>` +
				`<input type="hidden" name="email_address" value=${this.state.email}>` +
				`<input type="hidden" name="m_payment_id" value=${params}>` +
				`<input type="hidden" name="amount" value=${paying}>` +
				`<input type="hidden" name="item_name" value="Heartflow Coupons"/>` +
				`<input type="hidden" name="item_description" value=${descript}>`


			// let returnURL = document.createElement("input")
			// returnURL.setAttribute("type", "hidden")
			// returnURL.setAttribute("name", "return_url")
			// returnURL.setAttribute("value", returnUrl)
			//
			// let cancelURL = document.createElement("input")
			// cancelURL.setAttribute("type", "hidden")
			// cancelURL.setAttribute("name", "cancel_url")
			// cancelURL.setAttribute("value", cancelUrl)
			//
			// let firstName = document.createElement("input")
			// cancelURL.setAttribute("type", "hidden")
			// cancelURL.setAttribute("name", "name_first")
			// cancelURL.setAttribute("value", this.state.name)
			//
			// let lastName = document.createElement("input")
			// cancelURL.setAttribute("type", "hidden")
			// cancelURL.setAttribute("name", "name_last")
			// cancelURL.setAttribute("value", this.state.surname)
			//
			// let email = document.createElement("input")
			// cancelURL.setAttribute("type", "hidden")
			// cancelURL.setAttribute("name", "email_address")
			// cancelURL.setAttribute("value", this.state.email)
			//
			// let m_payment_id = document.createElement("input")
			// m_payment_id.setAttribute("type", "hidden")
			// m_payment_id.setAttribute("name", "m_payment_id")
			// m_payment_id.setAttribute("value", params)

			// let signature = document.createElement("input")
			// m_payment_id.setAttribute("type", "hidden")
			// m_payment_id.setAttribute("name", "signature")
			// m_payment_id.setAttribute("value", signatureString)
			// payfastForm.insertAdjacentElement('afterbegin', returnURL)

			// payfastForm.appendChild(returnURL)
			// payfastForm.appendChild(cancelURL)
			//
			// payfastForm_2.appendChild(m_payment_id)
			// payfastForm.append(payfastForm_2)
			// payfastForm.append(payfastForm_3)
			// payfastForm.appendChild(signature)
			// payfastForm.append()

			document.body.appendChild(payfastForm)

			payfastForm.submit();

		} else {
			payfastForm.reportValidity()
		}

	}


	onChangeName(e) {
		const re = /^[A-Za-z\s]*$/;
		if (re.test(e.target.value) || isNaN(e.target.value.charCodeAt(0))) {
			this.setState({
				name: e.target.value
			})
		}
	}

	onChangeSurname(e) {
		const re = /^[A-Za-z\s]*$/;
			if (re.test(e.target.value) || isNaN(e.target.value.charCodeAt(0))) {
				this.setState({
					surname: e.target.value
				})
			}
	}

	onChangeBranch(e) {
		this.setState({
			branch: e.target.value
		})
	}

	onChangeCoupons(e) {
			this.setState({
				coupons: e.target.value
			})
			this.setState({
				price: (e.target.value * 100) + 10
			})
	}

	onChangeEmail(e) {
		this.setState({
			email: e.target.value
		})
	}


	render() {
		return (
		<div>
			<div className='CouponBuyPage_CouponBuyPage'>
				<img className='emblem' src = {emblem}/>
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
				<div className='pnlMain'/>

				<form id="PayfastForm">

					<div className='pnlName'>
						<span className='NAME'>NAME</span>
						<input type='text' className='edtName' name="name_first" onChange={this.onChangeName} required={true}/>
					</div>

					<div className='pnlSurname'>
						<span className='SURNAME'>SURNAME</span>
						<input type='text' className='edtSurname' name="name_last" onChange={this.onChangeSurname} required={true}/>
					</div>

					<div className='pnlBranch'>
						<span className='BRANCH'>BRANCH</span>
						<select className='edtBranch' onChange={this.onChangeBranch} required={true}>
								{branchList.map((branch) => {
									return <option value={branch}>{branch}</option>
								})}
								<option value="" disabled selected hidden>Choose a Branch</option>
						</select>
					</div>

					<div className='pnlNrCoupon'>
						<span className='NUMBEROFCOUPONS'>No. OF BATCHES (10 p/batch)</span>
						<input type='number' className='edtNrCoupon' onChange={this.onChangeCoupons} defaultValue={1} min={1}/>
					</div>

					<div className='pnlEmail'>
						<span className='EMAIL'>EMAIL</span>
						<input type='email' className='edtEmail' name="email_address" onChange={this.onChangeEmail} required={true}/>
					</div>
				</form>
				<Link to='/'>
					<Button className='btnBack'>
						BACK
					</Button>
				</Link>

				<button className='btnPay' onClick={this.submit}>
					PAY NOW
				</button>

			</div>
		</div>

		)
	}
}