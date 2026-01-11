
//TODO
const axios = require('axios');

const BACKEND_URL = "http://localhost:3000"

describe('whosebday APIs TEST', async () => {
    const newBday = {
        day: 2,
        month: 11,
        name: 'Anish',
        title: 'Me',
        userId: 

    }
    const res = await axios.get(`${BACKEND_URL}/add-birthday`);

});


