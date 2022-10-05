import React, {Component} from 'react'
import './OutletRegistration.css'
import {Link} from 'react-router-dom'
import VolunteersService from "../Services/volunteers.service";
import logo from '../public/HeartFlow_Logo_02.png'
import AuthService from "../Services/auth.service";


let branchList = []
export default class OutletRegistration extends Component {
	constructor(props) {
		super(props);

		this.onChangeOutlet = this.onChangeOutlet.bind(this)
		this.onChangeRep = this.onChangeRep.bind(this)
		this.onChangeEmail = this.onChangeEmail.bind(this)
		this.onChangePhone = this.onChangePhone.bind(this)
		this.onChangeAddress = this.onChangeAddress.bind(this)
		this.onChangeBranch = this.onChangeBranch.bind(this)
		this.onChangePayment = this.onChangePayment.bind(this)
		this.onChangePolicy = this.onChangePolicy.bind(this)
		this.submit = this.submit.bind(this)


		this.state = {
			outlet: "",
			rep: "",
			email: "",
			phone: "",
			address: "",
			branch: "",
			payment: "",
			policy: "",
			paymentList: [],
			policyList: [],
		}

		AuthService.getBranches(
		).then(response => {
			branchList = []
			for (let i = 0; i < response.data.length; i++) {
				branchList.push(response.data[i].name)
			}
			this.forceUpdate()
		})

		this.paymentList = [
			"Cash on delivery",
			"Eft on delivery",
			"Cash at later time",
			"Eft at later time"
		]

		this.policyList = [
			"One week orders",
			"One month orders",
			"Six month orders"
		]
	}

	// componentDidMount() {
	// 	if (localStorage.getItem("userToken") == null) {
	// 	window.location.href = "/loginpage"
	// 	}
	// }

	async submit(e) {
		let form = document.getElementById("outletregistrationForm")
		if (form.checkValidity()) {
			await VolunteersService.registerOutlet(
				localStorage.getItem("userToken"),
				this.state.outlet,
				this.state.rep,
				this.state.email,
				this.state.phone,
				this.state.address,
				this.state.branch,
				this.state.payment,
				this.state.policy
			).then(response => {
				if (response.status === 200) {
					alert("Successfully registered the company")
					form.submit()
				} else if (response.status === 400) {
					alert("This company is already registered")
				} else {
					alert("Unknown database error")
				}
			})
			//RESPONSE
		} else {
			form.reportValidity()
		}
	}

	onChangePolicy(e) {
		this.setState({
			policy: e.target.value
		})
	}

	onChangePayment(e) {
		this.setState({
			payment: e.target.value
		})
	}

	onChangeBranch(e) {
		this.setState({
			branch: e.target.value
		})
	}

	onChangeAddress(e) {
		this.setState({
			address: e.target.value
		})
	}

	onChangePhone(e) {
		this.setState({
			phone: e.target.value
		})
	}

	onChangeEmail(e) {
		this.setState({
			email: e.target.value
		})
	}

	onChangeRep(e) {
		const re = /^[A-Za-z\s]*$/;
		if (re.test(e.target.value) || isNaN(e.target.value)) {
			this.setState({
				rep: e.target.value
			})
		}
	}

	onChangeOutlet(e) {
		const re = /^[A-Za-z\s]*$/;
		if (re.test(e.target.value) || isNaN(e.target.value)) {
			this.setState({
				outlet: e.target.value
			})
		}
	}



	render() {
		if (localStorage.getItem("userToken") == null) {
			window.location.href = "/loginpage"
		} else {
			return (
				<div className='OutletRegistration_OutletRegistration'>

					<div className='Header'/>
					<div className='Footer'/>
					<img className='logo' src = {logo} alt="Heartflow logo"/>

					
					<div className='pnlMain'>
						<span className='BRANCH'>BRANCH</span>
						<span className='PAYMENTAGREEMENT'>PAYMENT AGREEMENT</span>
						<span className='FOLLOWUPPOLICY'>FOLLOW-UP POLICY</span>
						<span className='ADDRESS'>ADDRESS</span>
						<span className='REPRESENTATIVEEMAIL'>REPRESENTATIVE EMAIL</span>
						<span className='REPCONTACTNO'>REP. CONTACT NO.</span>
						<span className='REPRESENTATIVENAME'>REPRESENTATIVE NAME</span>
						<span className='OUTLETDETAILS'>OUTLET DETAILS</span>
						<span className='OUTLETNAME'>OUTLET NAME</span>

					<form id="outletregistrationForm" action="http://localhost:3000/volunteerhomepage">
						<input type='text' className='edtOutName' onChange={this.onChangeOutlet} required={true} maxLength={50}/>
						<input type='text' className='edtRepName' onChange={this.onChangeRep} required={true} maxLength={50}/>
						<input type='email' className='edtRepEmail' onChange={this.onChangeEmail} required={true}/>
						<input type='tel' className='edtRepNr' onChange={this.onChangePhone} required={true} pattern="[0-9]{10}"/>
						<input type='text' className='edtAddress' onChange={this.onChangeAddress} required={true}/>
						<select className='edtBranch' onChange={this.onChangeBranch} required={true} defaultValue={branchList[0]}>
							{branchList.map((branch) => {
								return <option value={branch}>{branch}</option>
							})}
							<option value="" disabled selected hidden>Choose a Branch</option>
						</select>
						<select className='edtPayAgree' onChange={this.onChangePayment} required={true}>
							{this.paymentList.map((payment) => {
								return <option value={payment}>{payment}</option>
							})}
							<option value="" disabled selected hidden>Choose a Payment</option>
						</select>
						<select className='edtPolicy' onChange={this.onChangePolicy} required={true}>
								{this.policyList.map((policy) => {
									return <option value={policy}>{policy}</option>
								})}
							<option value="" disabled selected hidden>Choose a Policy</option>
						</select>
					</form>

						<button className='btnConfirm' onClick={this.submit}>
							CONFIRM
						</button>
					</div>

					<Link to='/volunteerhomepage'>
						<div className='btnBack'>BACK</div>
					</Link>


				</div>
			)
		}
	}

}