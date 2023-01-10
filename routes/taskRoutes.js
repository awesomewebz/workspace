const express = require('express');
const { assignTask, updateTask, renderEditTask, renderAssignTask , editTask, editTaskRender} = require('../controllers/taskController');
const passport = require('passport');
const router = express.Router();

router.post("/assignTask", assignTask);
router.put("/updateTask", updateTask);
router.get("/edit-task",passport.checkAuthentication, renderEditTask);
router.get("/assign-task",passport.checkAuthentication, renderAssignTask);
router.get("/edit-task/:id", passport.checkAuthentication, editTaskRender);
router.post("/editTask/:id", passport.checkAuthentication, editTask);

module.exports= router;