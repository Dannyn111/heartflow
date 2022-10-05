import React, {Component, useState} from 'react'
import './DirectorHomePage.css'
import ImgAsset from '../public'
import { Link } from 'react-router-dom'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Button, rgbToHex } from "@material-ui/core";
import AuthService from "../Services/auth.service";
import {useEffect} from 'react';
import Container from "../Container";
import VolunteersService from "../Services/volunteers.service";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {meeting_date} from "../Form";


var globalNewSelection;

let name
let date
let surname
let phone
let email

const status = [
	"pending_review",
	"meeting_scheduled",
	"reject",
	"approve",
    "inactive"
]

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 150 },
  { field: 'lastName', headerName: 'Last name', width: 150 },
  { field : 'date', headerName: 'Date', width: 150},
  { field : 'phone', headerName: 'Phone Number', width: 200},
  { field : 'email', headerName: 'Email', width: 300},
  { field : 'status', headerName: 'Status', width: 300},

];

export default function DirectorHomePage() {
    
    const [select, setSelection] = React.useState([]);
    const [dataGridRows, setDataGridRows] = React.useState([]);
    const [directorName, setDirectorName] = React.useState("Charl Reyneke");
    const [select_status, setStatus] = React.useState(["None"]);
	const [table_status, setTable] = React.useState(["pending_review"]);


    
    useEffect(() => {
        AuthService.getInfo(localStorage.getItem("userToken")
        ).then(response => {
            setDirectorName(response.data['first_name'] + " " + response.data['last_name'])
        })
    }, [])

    // function accept() {
    //     // Get directors token from localstorage an call the accept request
    //     AuthService.acceptVolunteer(
    //         localStorage.getItem("userToken"),
    //         globalNewSelection[0]
    //     )
    // }
    //
    // function reject() {
    //     // Get direcotrs token from localstorage and call the reject request
    //     console.log(globalNewSelection)
    //     AuthService.rejectVolunteer(
    //         localStorage.getItem("userToken"),
    //         globalNewSelection[0]
    //     )
    // }

    function changeStatus() {
		//THOMAS DIE IS NET VIR JOU
		if (select_status[0] !== "None") {
			document.getElementById("triggerButton").click()
		} else {
			alert("Please select a new status for the volunteer!")
		}
	}

    function changeTable() {
		AuthService.getPendingVolunteers(
			localStorage.getItem("userToken"),
			table_status
		).then(response => {
			setDataGridRows(dataGridRows => [])
			for (let i = 0; i < response.data['length']; i++) {
				//Edit this data here
                setDataGridRows(dataGridRows => [...dataGridRows, { id: response.data[i]['id'],  firstName :response.data[i]['first_name'], lastName: response.data[i]['last_name'], age: '69', date: response.data[i]['registerDate'], phone: response.data[i]['phone'], email: response.data[i]['email'], status: response.data[i]['status']}],  )
            }
		})
	}

    async function handleSubmit() {
        console.log(meeting_date === undefined)
        await AuthService.changeStatus(
            localStorage.getItem("userToken"),
            globalNewSelection[0],
            select_status,
            meeting_date
        ).then(response => {
        })
        window.location.reload(false);
    }

    useEffect(() => {
        AuthService.getPendingVolunteers(
            localStorage.getItem("userToken"),
            "pending_review"
        ).then(response => {
            for (let i = 0; i < response.data['length']; i++) {
                setDataGridRows(dataGridRows => [...dataGridRows, { id: response.data[i]['id'],  firstName :response.data[i]['first_name'], lastName: response.data[i]['last_name'], age: '69', date: response.data[i]['registerDate'], phone: response.data[i]['phone'], email: response.data[i]['email'], status: response.data[i]['status']}],  )
            }
        })
    }, [])

    if (localStorage.getItem("userToken") == null) {
		window.location.href = "/loginpage"
    } else {
       return (
            <div>
                <div className='DirectorHomePage_DirectorHomePage'>

                    <div className='Header'/>
                    <div className='Footer'/>

                    <Link to='/directorhomemenu'>
                        <div className='btnOptions' />
                    </Link>

                    <Link to='/'>
                        <Button className='btnLogout'>LOG OUT</Button>
                    </Link>

                    <Link to='/editdirectorpage'>
                        <Button className='btnEditProfile'>EDIT PROFILE</Button>
                    </Link>

                    <span className='NAMEOFDIRECTOR'> {directorName} </span>
=

                    <div style={{ height: 450, width: '1100px' }}>
                        <DataGrid
                            rows={dataGridRows}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            // checkboxSelection
                        onSelectionModelChange={async (newSelection) => {
                            setSelection(newSelection.selectionModel)
                            globalNewSelection = newSelection

                            await AuthService.getVolunteerDetails(
                                localStorage.getItem("userToken"),
                                globalNewSelection[0]
                            ).then(response => {

                                name = response.data['first_name']
								phone = response.data['phone']
								surname = response.data['last_name']
								date = response.data['registerDate']
								email = response.data['email']

								document.getElementById("form_status").disabled = false
                            })
                        }}
                        sx={{   top: '250px',
                                left: '50%',
                                color: 'rgb(0, 0, 83)',
                                fontFamily: 'Montserrat',
                                fontSize: '20px',
                                fontWeight: '500',
                                justifyContent: 'left',
                                textAlign: 'left',
                                borderRadius: '40px',
                                backgroundColor: 'rgb(137, 207, 240)',
                                opacity: '0.95',
                        }}/>

                    </div>
                </div>

                <select className='form_status' id="form_status" onChange={event => setStatus(event.target.value)} disabled={true}>
					{status.map((status) => {return <option value={status}>{status}</option>})}
					<option value="" disabled selected hidden>Choose a Status</option>
				</select>

				<select className='status' onChange={event => setTable(event.target.value)} defaultValue={status[0]}>
					{status.map((status) => {return <option value={status}>{status}</option>})}
				</select>

                <button className="btnChange" onClick={changeTable}>
					Change Table
				</button>

				<button className="popupButton" onClick={changeStatus}>
					Change status
				</button>

                <Container className="changeStatusPopUp" id="container" triggerText="Change Status" onSubmit={handleSubmit}
					field_1 ={name}
					field_2={surname}
					field_3={email}
					field_4={date}
					field_5={phone}
					field_6={select_status}
					director={true}
				/>
            </div>
        )
    }


}
