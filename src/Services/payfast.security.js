import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/'


class PayfastSecurity {
    cancelTransaction(payfastRef) {
        return axios.patch(API_URL + 'cancelTransaction', {
            payfastRef: payfastRef
        }).then(response => {
            console.log(response)
            return response
        })
    }


    async insertTransaction(name, surname, email, branch, amount, paid) {
        console.log(amount)
        return await axios.post(API_URL + 'insertTransaction', {
            name: name,
            surname: surname,
            email: email,
            branch: branch,
            amount: amount,
            paid: paid
        }).then(response => {
            return response.data
        })
    }

    async getSignature(merchant_id, merchant_key, return_url, cancel_url, notify_url, m_payment_id,
                 amount, item_name, name_first, name_last, email_address, item_descript) {
        console.log(item_descript)
        return await axios.post(API_URL + 'signature', {
                    merchant_id: merchant_id,
                    merchant_key: merchant_key,
                    return_url: return_url,
                    cancel_url: cancel_url,
                    notify_url: notify_url,
                    name_first: name_first,
                    name_last: name_last,
                    email_address: email_address,
                    m_payment_id: m_payment_id,
                    amount: amount,
                    item_name: item_name,
                    item_description: item_descript,
            }).then(response => {
                return response.data
        })
    }

}
export default new PayfastSecurity();