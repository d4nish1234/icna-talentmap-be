const express = require('express');
const router = express.Router();
const { getUsers } = require('../controller/userController');
const authCheck = require('../middlewares/authCheck')

router.get('/id',
    authCheck, // check if user is authenticated
    async function (req, res, next) {
        res.render('id', { idTokenClaims: req.session.account.idTokenClaims, idToken: req.session.account.idToken  });
    }
);

const renderUsers = async function (req, res, next) {
    console.log('inside render users')
    const users =[];
    try {
        // here we get an access token
        // const authResponse = await auth.getToken(auth.tokenRequest);

        // call the web API with the access token
        
        const resp = await getUsers();
        console.log('did I get users: ', resp.value)

        // display result
        // console.log(users);
        res.render('users', { users: resp.value });
        next();
    } catch (error) {
        console.log("render users error", error);
        next(error)
    }

}

/** get all users */
router.get('/',
    authCheck, // check if user is authenticated
    renderUsers
);

/** get all skills by user */
// router.get('/',
//     authCheck, // check if user is authenticated
//     renderUsers
// );
module.exports = router;