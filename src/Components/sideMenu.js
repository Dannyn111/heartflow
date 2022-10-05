import React from 'react'
import './sideMenu.css'
import ImgAsset from '../public'
export default function SideMenu (props) {
	return (
		<div className={`sideMenu_sideMenu ${props.className}`}>
			<div className='Group'>
				<img className='Vector' src = {ImgAsset.sideMenu_Vector} />
			</div>
		</div>
	)
}