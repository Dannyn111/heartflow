import React from 'react'
import './CouponBuyMessage.css'
import {Link, useLocation} from 'react-router-dom'
import { Button } from '@material-ui/core'
import PayfastSecurity from "../Services/payfast.security";

export default function PaymentFailedMessage() {
	const location = useLocation()
	const params = new URLSearchParams(location.search)
	let reference = params.get("ref")

	PayfastSecurity.cancelTransaction(
			reference
		).then(response => {
			console.log(response)
		})

	return (
		<div className='CouponBuyMessage_CouponBuyMessage'>
			<span className='PAYMENTSUCCESSFULTHANKYOUFORBUYINGCOUPONSFROMHEARTFLOW'>PAYMENT FAILED!</span>

			<Link to='/'>
				<Button className='btnNo'>
					Try Again
				</Button>
			</Link>

			<Link to='/'>
				<Button className='btnSub'>
					Back To Home
				</Button>
			</Link>

		</div>
	)
}