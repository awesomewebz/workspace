const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const taskRoutes = require('./taskRoutes');
const reportRoutes = require('./reportRoutes');
const profileRoutes = require('./profileRoute');

// render index page
router.get("/", (req, res)=>{
    return res.render('index', {
        title: ""
    })
});


router.use("/users", userRoutes);
router.use("/tasks", taskRoutes);
router.use("/report", reportRoutes);
router.use("/profile", profileRoutes);



module.exports = router;