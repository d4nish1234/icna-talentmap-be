const axios = require('axios');
const authProvider = require("../auth/AuthProvider");


/**
 * Calls the endpoint with authorization bearer token.
 * @param {string} endpoint
 */
async function getCall(endpoint) {
    console.log('inside get call')
    const token = await authProvider.getTokenByClientCredentials();
    // console.log('got token: ', token)
    // console.log("access token", token.accessToken)
    console.log('endpoint', endpoint)
    const options = {
        headers: {
            Authorization: `Bearer ${token.accessToken}`
        }
    };

    console.log('request made to web API at: ' + new Date().toString());

    try {
        const response = await axios.get(endpoint, options);
        // const reponse = {}
        // console.log('yay I got res', response)
        return response.data;
    } catch (error) {
        console.log(error)
        return error;
    }
};

module.exports = {
    getCall
};