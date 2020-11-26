const express = require('express');
const usercontrol = require('../control/usercontrol');


//define a router and create routes
const router = express.Router();

//create a route for /api/register
router.post('/api/register', usercontrol.registerCtrl);

//create a route for /api/login
router.post('/api/login', usercontrol.loginCtrl);


//export router
module.exports = router;
