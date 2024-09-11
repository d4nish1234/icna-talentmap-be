const express = require('express');
const router = express.Router();
const { getUser, setUser } = require('../controller/userController');
const authCheck = require('../middlewares/authCheck')


const renderCurrentUser = async function (req, res, next) {
    const userId = req?.session?.account?.idTokenClaims?.oid || req?.session?.account?.localAccountId
    console.log('user id is: ', userId)
    console.log('inside render profile')
    try {
        
        const resp = await getUser(userId);
        console.log('user value: ', resp)

        // display result
        res.render('user', { user: resp });
        next();
    } catch (error) {
        console.log("render user error", error);
        next(error)
    }

}

const setSkillset = async function (req, res, next) {
    const newSkill = req?.params?.skill
    const userId = req?.session?.account?.idTokenClaims?.oid || req?.session?.account?.localAccountId
    console.log('user id is: ', userId)

    console.log('inside render profile')

    try {
        
        const resp = await getUser(userId);
        console.log('user value: ', resp)

        console.log('old skill is ', resp?.extension_e349ae095d944f69bbc006c6bc65d679_customAttribute)

        console.log('new skill is' , newSkill)
        // display result
        console.log(newSkill);
        const patchValue = {
            "extension_e349ae095d944f69bbc006c6bc65d679_customAttribute": newSkill
        }
        await setUser(userId, patchValue, req, res, next);
        next();
    } catch (error) {
        console.log("render user error", error);
        next(error)
    }

}

/** get currentUser  */
router.get('/',
    authCheck, // check if user is authenticated
    renderCurrentUser
);

// set skillset
router.get('/setskillset/:skill',
    authCheck, // check if user is authenticated
    setSkillset,
    renderCurrentUser
);


module.exports = router;