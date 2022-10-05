import React from 'react';
import {useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export let meeting_date
export const Form = ({ onSubmit, field_1, field_2, field_3, field_4, field_5, field_6, director }) => {
    // const [startDate, setStartDate] = useState(new Date());
    if (director) {
        if (field_6 === "meeting_scheduled") {
            return (
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input contentEditable={false} className="form-control" id="name" value={field_1}/>
              </div>
              <div className="form-group">
                <label htmlFor="surname">Surname</label>
                <input contentEditable={false} className="form-control" id="surname" value={field_2}/>
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input contentEditable={false} className="form-control" id="email" value={field_3}/>
              </div>
              <div className="form-group">
                <label htmlFor="date">Date</label>
                <input contentEditable={false} className="form-control" id="date" value={field_4}/>
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input contentEditable={false} className="form-control" id="phone" value={field_5}/>
              </div>
              <div className="form-group">
                  <label htmlFor="status">Status</label>
                  <input contentEditable={false} className="form-control" id="status" value={field_6}/>
              </div>
              <div className="form-group">
                  <label htmlFor="date_picker">Meeting Date</label>
                  <DatePicker className="form-control" id="date_picker" selected={new Date()} onChange={(date:Date) => meeting_date = date} />
              </div>
                <div className="form-group">
                  <button className="form-control btn btn-primary" type="submit">
                    Submit
                </button>
              </div>
            </form>
          );
        } else {
            return (
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input contentEditable={false} className="form-control" id="name" value={field_1}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="surname">Surname</label>
                        <input contentEditable={false} className="form-control" id="surname" value={field_2}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input contentEditable={false} className="form-control" id="email" value={field_3}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="date">Date</label>
                        <input contentEditable={false} className="form-control" id="date" value={field_4}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone</label>
                        <input contentEditable={false} className="form-control" id="phone" value={field_5}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="status">Status</label>
                        <input contentEditable={false} className="form-control" id="status" value={field_6}/>
                    </div>
                    <div className="form-group">
                        <button className="form-control btn btn-primary" type="submit">
                            Submit
                        </button>
                    </div>
                </form>
            );
        }
    } else {
        return (
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input contentEditable={false} className="form-control" id="name" value={field_1}/>
              </div>
              <div className="form-group">
                <label htmlFor="surname">Surname</label>
                <input contentEditable={false} className="form-control" id="surname" value={field_4}/>
              </div>
              <div className="form-group">
                <label htmlFor="coupons">Coupons</label>
                <input contentEditable={false} className="form-control" id="coupons" value={field_5}/>
              </div>
              <div className="form-group">
                <label htmlFor="branch">Branch</label>
                <input contentEditable={false} className="form-control" id="branch" value={field_2}/>
              </div>
              <div className="form-group">
                <label htmlFor="paid">Paid</label>
                <input contentEditable={false} className="form-control" id="paid" value={field_6}/>
              </div>
              <div className="form-group">
                  <label htmlFor="status">Status</label>
                  <input contentEditable={false} className="form-control" id="status" value={field_3}/>
              </div>
              <div className="form-group">
                <button className="form-control btn btn-primary" type="submit">
                  Submit
                </button>
              </div>
            </form>
          );
    }

};
export default Form;
