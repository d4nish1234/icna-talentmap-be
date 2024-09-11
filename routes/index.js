const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    // console.log('req sessoin' , req?.session?.account)
    const userId = req?.session?.account?.idTokenClaims?.oid || req?.session?.account?.localAccountId
    res.render('index', {
        title: 'MSAL Node & Express Web App',
        isAuthenticated: req.session.isAuthenticated,
        username: req.session.account?.username !== '' ? req.session.account?.username : req.session.account?.name,
        userId: userId,
    });
});    
module.exports = router;