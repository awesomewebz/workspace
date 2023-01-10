const express = require('express');
const router = express.Router();
const {createReport, renderReport, users, renderReportH} = require('../controllers/reportController');
const passport = require('passport');
router.post("/createReport",passport.checkAuthentication, createReport);
router.get("/report",passport.checkAuthentication, renderReport);
router.get("/users", users);
router.get("/ReportH", renderReportH);

module.exports= router;
