import React from 'react'
import './HomePage.css'
import logo from '../public/HeartFlow_Logo_02.png'
import emblem from '../public/HF_emblem.png'
import {Link} from 'react-router-dom'
import igLogo from '../public/ig_logo.png'
import fbLogo from '../public/fb_logo.png'

export default function HomePage () {
	return (
		<div className='HomePage_HomePage'>
			<img className='logo' src = {logo}/>
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
			<img className='emblem' src = {emblem}/>
			<div className='pnlMain'/>
			<div className='btnLogin'/>

			<Link to='/CouponBuyPage'>
				<div className='btnBuy'>
					<img className='Emblem_Small' src = {emblem}/>
					<span className='BUY'>BUY COUPONS</span>
				</div>
			</Link>

			<Link to='/VolunteerSignUp'>
				<div className='btnVolunteer'>
					<span className='BECOMEAVOLUNTEER'>BECOME A VOLUNTEER</span>
				</div>
			</Link>

			<Link to='/LoginPage'>
				<div className='btnLogin'>
					<span className='LOGIN'>LOG IN</span>
				</div>
			</Link>

		</div>
	)
}