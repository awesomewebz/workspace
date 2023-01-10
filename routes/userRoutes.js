const express = require('express');
const { register, renderRegister, renderLogin , renderResetPassword, home, createSession, destroySession, resetPassword, deleteUser} = require('../controllers/userController');
const router = express.Router();
const passport = require('passport');

router.post("/register", register);
router.get("/add-user",passport.checkAuthentication, renderRegister);
router.get("/login", renderLogin);
router.get("/reset-password", renderResetPassword);
router.get("/home",passport.checkAuthentication, home);
router.get("/logout", destroySession);
router.post("/reset-pass", resetPassword);
router.get("/delete", deleteUser);


// login using passport local
router.post("/create-session", passport.authenticate(
    'local',
    {failureRedirect: "/users/login"}
), createSession);

module.exports= router;