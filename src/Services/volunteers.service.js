import axios from "axios";
import {config} from "process";

const API_URL = 'http://127.0.0.1:8000/'

class VolunteersService {
    getOnlineOrders(token, status) {
        return axios.get(API_URL + "coupons/" + status, {
            headers: {
            Authorization: ('Token ' + token)
        }}).then(response => {
            return response
        })
    }

    async pickupCoupons(token, amount, source, serial_letter, range_from, range_to) {

        const postData = {
            amount: amount,
            source: source,
            serial_letter: serial_letter,
            range_from: range_from,
            range_to: range_to
        };

        const axiosConfig = {
            'Authorization': 'Token ' + token
        };

        return await axios.post(API_URL + 'picked-up', postData, {
            headers: axiosConfig
        }).then(response => {
            console.log(response)
            return(response)
        })
    }

    async discardCoupons(token, amount, reason, serial_letter, range_from, range_to) {
        const postData = {
            amount: amount,
            
            serial_letter: serial_letter,
            range_from: range_from,
            range_to: range_to,
            reason: reason
        };

        console.log("Range_to " + range_to)

        const axiosConfig = {
            'Authorization': 'Token ' + token
        };

        return await axios.post(API_URL + 'discard-coupons', postData, {
            headers: axiosConfig
        }).then(response => {
            console.log(response)
            return (response)
        })
    }

    async exchangeCoupons(token, amount, serial_letter, range_from, range_to, reason, volunteer) {
        let volunteerID = parseInt(volunteer)
        const postData = {
            amount: amount,
            serial_letter: serial_letter,
            range_from: range_from,
            range_to: range_to,
            reason: reason,
            to_volunteer :volunteerID
        };

        console.log("Range_to " + range_to)
        console.log(postData)
        const axiosConfig = {
            'Authorization': 'Token ' + token
        };

        return await axios.post(API_URL + 'exchange-coupons', postData, {
            headers: axiosConfig
        }).then(response => {
            console.log(response)
            return (response)
        })
    }

    async deliveredCoupons(token, amount, comment, serial_letter, range_from, range_to, outlet) {
        const postData = {
            amount: amount,
            comments: comment,
            serial_letter: serial_letter,
            range_from: range_from,
            range_to: range_to,
            outlet: outlet,
        };

        console.log("Range_to " + range_to)

        const axiosConfig = {
            'Authorization': 'Token ' + token
        };

        return await axios.post(API_URL + 'deliver', postData, {
            headers: axiosConfig
        }).then(response => {
            console.log(response)
            return (response)
        })
    }

    getOutlets(token) {
        const axiosConfig = {
                'Authorization': 'Token ' + token
        };

        return axios.get(API_URL + "register-company", {
            headers:axiosConfig
        }).then(response => {
            return response
        })
    }

    async registerOutlet(token, companyName, repName, email, phone, address, branch, payment, policy) {
        const postData = {
            companyName: companyName,
            repName: repName,
            repEmail: email,
            phone: phone,
            address: address,
            branch: branch,
            payment_method: payment,
            policy: policy
        };
        console.log(postData)

        const axiosConfig = {
            'Authorization': 'Token ' + token
        };

        return await axios.post(API_URL + 'register-company', postData, {
            headers: axiosConfig
        }).then(response => {
            console.log(response)
            return (response)
        })
    }

    async changeStatus(token, status, id) {
        const postData = {
            status: status
        };

        const axiosConfig = {
                'Authorization': 'Token ' + token
        };

        return await axios.patch(API_URL + "coupon/id=" + id, postData, {
            headers:axiosConfig
            
        }).then(response => {
            return response
        })
    }

    getVolunteers(token) {
        const axiosConfig = {
                'Authorization': 'Token ' + token
        };

        return axios.get(API_URL + "get-volunteers-exchange", {
            headers:axiosConfig
        }).then(response => {
            return response
        })
    }

    editVolunteerProfile(token, first_name, last_name, branch, phone) {
        const postData = {
            first_name: first_name,
            last_name: last_name,
            branch: branch,
            phone: phone
        };

        const axiosConfig = {
                'Authorization': 'Token ' + token
        };

        return axios.patch(API_URL + "get-info", postData,{
            headers:axiosConfig
        }).then(response => {
            return response
        })
    }

    editDirectorProfile(token, first_name, last_name, phone) {
        const postData = {
            first_name: first_name,
            last_name: last_name,
            phone: phone
        };

        const axiosConfig = {
                'Authorization': 'Token ' + token
        };

        return axios.patch(API_URL + "get-info", postData,{
            headers:axiosConfig
        }).then(response => {
            return response
        })
    }

    getSource(token) {
        const axiosConfig = {
                'Authorization': 'Token ' + token
        };

        return axios.get(API_URL + "source", {
            headers:axiosConfig
        }).then(response => {
            return response
        })
    }



    getOrderDetails(token, id) {
        return axios.get(API_URL + "coupon/id=" + id, {
            headers: {
                Authorization: ('Token ' + token)
            }
        }).then(response => {
            return response
        })
    }

    getVolunteerDetails(token) {
        return axios.get(API_URL+"get-info", {
            headers: {
                Authorization: ('Token ' + token)
            }
        }).then(response => {
                return response
        })
    }
}

export default new VolunteersService();
