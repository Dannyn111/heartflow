import React, {Component} from 'react'
import './CouponBuyMessage.css'
import {Link} from 'react-router-dom'
import {Button} from '@material-ui/core'

export default function CouponBuyMessage() {

	return (
			<div className='CouponBuyMessage_CouponBuyMessage'>
				<span className='PAYMENTSUCCESSFULTHANKYOUFORBUYINGCOUPONSFROMHEARTFLOW'>PAYMENT SUCCESSFUL!<br/>THANK YOU FOR BUYING COUPONS FROM HEARTFLOW</span>

				<Link to='/'>
					<Button className='btnNo'>
						NO THANKS
					</Button>
				</Link>

				<Link to='/'>
					<Button className='btnSub'>
						SUBSCRIBE
					</Button>
				</Link>

			</div>
		)
}