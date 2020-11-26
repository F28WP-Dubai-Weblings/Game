// module.exports = signin;
const express = require('express');
//const app = express();
const usercontrol = require('../control/usercontrol');


//define a router and create routes
const router = express.Router();
//create a route for /api/register
router.post('/api/register', usercontrol.registerCtrl);

//create a route for /api/login
router.post('/api/login', usercontrol.loginCtrl);

//create a route for /api/scoreboard
router.post('/api/scoreboard', usercontrol.getScores);

//create a route for /api/rows
router.post('/api/rows', usercontrol.getRows);

//export router
module.exports = router;
