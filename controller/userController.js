const { getCall } = require("../graphApi/getApi");
const { patchCall } = require("../graphApi/patchApi");

 const getUsers = async (req, res, next) => {
  // TODO: move extension attributes to .env file
  // TODO: move endpoint to .env file
  const endpoint = "https://graph.microsoft.com/v1.0/users?$select=id,displayName,userPrincipalName,givenName,mail,jobTitle,mobilePhone,userName,extension_e349ae095d944f69bbc006c6bc65d679_customAttribute,extension_e349ae095d944f69bbc006c6bc65d679_experience";
  console.log('getting all users..')
  return getCall(endpoint, req, res, next);
};

const getUser = async (id, req, res, next) => {
  // TODO: move extension attributes to .env file
  // TODO: move endpoint to .env file
  const endpoint = `https://graph.microsoft.com/v1.0/users/${id}?$select=id,displayName,userPrincipalName,givenName,postalCode,extension_e349ae095d944f69bbc006c6bc65d679_customAttribute,extension_e349ae095d944f69bbc006c6bc65d679_experience`;
  console.log(`getting user data for id ${id}..`)
  return getCall(endpoint, req, res, next);
};

const setUser = async (id, patchValue, req, res, next) => {
  // TODO: move extension attributes to .env file
  // TODO: move endpoint to .env file
  const endpoint = `https://graph.microsoft.com/v1.0/users/${id}`;
  console.log(`patching for id ${id} ..`)
  return patchCall(endpoint, patchValue, req, res, next);
};

module.exports = {
  getUsers,
  getUser,
  setUser
}