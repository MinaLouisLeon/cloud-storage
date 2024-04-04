const {default: axios} = require('axios');
const SendEmail = (data:any) => {
    axios.post(
        '/api/send',
        data)
}

export default {SendEmail}