import React, {Component, useEffect} from 'react'
import './VolunteerHomePage.css'
import {Link} from 'react-router-dom'
import {Container} from '../Container'
import VolunteersService from "../Services/volunteers.service";
import {DataGrid, GridColDef, GridValueGetterParams} from "@mui/x-data-grid";
import logo from '../public/HeartFlow_Logo_02.png'
import emblem from '../public/HF_emblem.png'
import igLogo from '../public/ig_logo.png'
import fbLogo from '../public/fb_logo.png'

var globalNewSelection

let changeInSelection = false

let name
let branch
let surname
let coupons
let paid
let status_form

const status = [
	"PAYMENT_COMPLETE",
	"PROCESSING",
	"ACCEPT",
	"DELIVERY_IN_PROGRESS",
	"DELIVERED",
	"ORDER_DELAYED"
]

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 150 },
  { field: 'lastName', headerName: 'Last name', width: 150 },
  { field: 'coupons', headerName: 'No. of Coupons', width: 180 },
  { field: 'branch', headerName: 'Branch', width: 200 },
  { field: 'paid', headerName: 'Paid (R)', width: 90 },
  { field: 'status', headerName: 'Status', width: 180 },
];

function logout() {
	localStorage.removeItem("userToken")
	localStorage.removeItem("Volunteer")
}


export default function VolunteerHomePage() {

	const [select_status, setStatus] = React.useState(["None"]);
	const [table_status, setTable] = React.useState(["PAYMENT_COMPLETE"]);
	const [dataGridRows, setDataGridRows] = React.useState([]);
	const [select, setSelection] = React.useState([]);


	function changeTable() {
		VolunteersService.getOnlineOrders(
			localStorage.getItem("userToken"),
			table_status
		).then(response => {
			setDataGridRows(dataGridRows => [])
			for (let i = 0; i < response.data['length']; i++) {
				//Edit this data here
                setDataGridRows(dataGridRows => [...dataGridRows, { id: response.data[i]['id'],  firstName :response.data[i]['name'], lastName: response.data[i]['surname'],coupons: response.data[i]['amount'], branch:response.data[i]['branch'], paid: response.data[i]['paid'], status: response.data[i]['status']}])
            }
		})
	}


	async function handleSubmit() {
		console.log(select_status)
		await VolunteersService.changeStatus(
			localStorage.getItem("userToken"),
			select_status,
			globalNewSelection[0]
		).then(response => {
		})
		window.location.reload(false);
	}

	function changeStatus() {
		//THOMAS DIE IS NET VIR JOU
		if (select_status[0] !== "None") {
			document.getElementById("triggerButton").click()
		} else {
			alert("Please select a new status for the order!")
		}
	}

	useEffect(() => {
		VolunteersService.getOnlineOrders(
			localStorage.getItem("userToken"),
			"PAYMENT_COMPLETE"
		).then(response => {
			for (let i = 0; i < response.data['length']; i++) {
				//Edit this data here
				setDataGridRows(dataGridRows => [])
                setDataGridRows(dataGridRows => [...dataGridRows, { id: response.data[i]['id'],  firstName :response.data[i]['name'], lastName: response.data[i]['surname'],coupons: response.data[i]['amount'], branch:response.data[i]['branch'], paid: response.data[i]['paid'], status: response.data[i]['status']}])
            }
		})
	}, [])


	//checking if the user is logged in
	if (localStorage.getItem("userToken") == null) {
		window.location.href = "/loginpage"
	} else {
		return (
			<div>
				<div className='VolunteerHomePage_VolunteerHomePage'>
					<div className='Header'/>
					<div className='Footer'/>
					<img className='logo' src = {logo}/>
					<img className='emblem' src = {emblem}/>
					<div className='Footer'>
						<span className='CONTACT'>CONTACT US</span>
						<Link to={{ pathname: "https://www.instagram.com/heartflow_npc/" }} target="_blank">
							<img className='IG_logo' src = {igLogo}/>
						</Link>
						<Link to={{ pathname: "https://www.facebook.com/HeartFlowHomeless/" }} target="_blank">
							<img className='FB_logo' src = {fbLogo}/>
						</Link>
					</div>

					<div style={{ height: 700, width: '50%' }}>
						<DataGrid
							rows={dataGridRows}
							columns={columns}
							pageSize={5}
							rowsPerPageOptions={[5]}
							onSelectionModelChange={async (newSelection) => {
								setSelection(newSelection.selectionModel)
								globalNewSelection = newSelection
								await VolunteersService.getOrderDetails(
									localStorage.getItem("userToken"),
									globalNewSelection[0]
								).then(response => {

								name = response.data['name']
								branch = response.data['branch']
								surname = response.data['surname']
								coupons = response.data['amount']
								paid = response.data['paid']
								status_form = response.data['status']

								document.getElementById("form_status").disabled = false

								})
							}}
							sx={{	top: '191px',
								left: '50%',
								color: 'rgb(0, 0, 0)',
								fontFamily: 'Montserrat',
								fontSize: '20px',
								fontWeight: '500',
								justifyContent: 'left',
								textAlign: 'left',
								borderRadius: '40px',
								backgroundColor: 'rgb(13, 207, 240)',
								opacity: '0.98',
							 }}/>
					</div>

					<div className='pnlMain'>
						<span className='ACTIONS'>ACTIONS</span>
						<Link to='/volunteerpickuppage'>
							<button className='btnPickUp'>PICK UP</button>
						</Link>
						<Link to='/volunteerexchange'>
							<div className='btnExchange'>EXCHANGE</div>
						</Link>
						<Link to='/volunteerdelivery'>
							<div className='btnDelivery'>DELIVERY</div>
						</Link>
						<Link to='/volunteerdiscardloss'>
							<div className='btnLoss'>LOSS/DISCARD</div>
						</Link>
						<Link to='/outletregistration'>
							<div className='btnRegister'>REGISTER</div>
						</Link>
					</div>

					<Link to='/'>
						<button className='btnLogOut' onClick={logout}>
							LOG OUT
						</button>
					</Link>

					<Link to='/outletregistration'>
						<button className='btnOutletReg' >
							EDIT OUTLET
						</button>
					</Link>

					<Link to='/editvolunteerprofile'>
						<button className='btnEditProf' >
							EDIT PROFILE
						</button>
					</Link>

					<div className='pnlTable'>
					<span className='TABLE'>TABLE</span>

					{/*			<select className='status' onChange={event => setStatus(event.target.value)} defaultValue={status[0]}>*/}
					{/*	{status.map((status) => {return <option value={status}>{status}</option>})}*/}
					{/*</select>*/}

					{/*<select className='form_status' onChange={event => setTable(event.target.value)} defaultValue={status[0]}>*/}
					{/*	{status.map((status) => {return <option value={status}>{status}</option>})}*/}
					{/*</select>*/}

					<select className='form_status' id="form_status" onChange={event => setStatus(event.target.value)} disabled={true}>
						{status.map((status) => {return <option value={status}>{status}</option>})}
						<option value="" disabled selected hidden>Choose a Status</option>
					</select>

					<select className='status' onChange={event => setTable(event.target.value)} onClick={changeTable} defaultValue={status[0]}>
						{status.map((status) => {return <option value={status}>{status}</option>})}
					</select>

					<button className="popupButton" onClick={changeStatus}>
						UPDATE STATUS
					</button>
				</div>
				</div>

				<Container className="changeStatusPopUp" id="container" triggerText="Change Status" onSubmit={handleSubmit}
					field_1 ={name}
					field_2={branch}
					field_3={select_status}
					field_4={surname}
					field_5={coupons}
					field_6={paid}
					director={false}
				/>

			</div>
		)
	}

}
