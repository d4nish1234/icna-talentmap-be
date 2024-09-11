const axios = require('axios');
const authProvider = require("../auth/AuthProvider");

// TODO.. merge this into one i.e. patchAPI and getAPI
/**
 * Calls the endpoint with authorization bearer token.
 * @param {string} endpoint
 */
async function patchCall(endpoint, data) {
    console.log('inside patch call')
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
        const response = await axios.patch(endpoint, data, options);
        // const reponse = {}
        console.log('yay I got res', response)
        return response.data;
    } catch (error) {
        console.log(error)
        return error;
    }
};

module.exports = {
    patchCall
};