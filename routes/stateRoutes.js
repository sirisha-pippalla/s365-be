const express = require('express');
const router = express.Router();
const stateControllers = require('../controllers/stateControllers.js');

//get all states
router.route("/getAllStates").get(stateControllers.getAllStates)
//get state by id
router.route("/getStateById/:id").get(stateControllers.getStateById)
//post state
router.route("/createState").post(stateControllers.createState);
//update state
router.route("/updateStateById/:id").put(stateControllers.updateStateById);
//delete state
router.route("/deleteState/:id").delete(stateControllers.deleteState);


module.exports = router;