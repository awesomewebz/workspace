const express =  require("express");
const router = express.Router();
const { renderProfile , updateProfileRender, updateProfile} =  require("../controllers/profileController");
const passport =  require("passport");


router.get("/profile",passport.checkAuthentication, renderProfile);
router.get("/update/:id", updateProfileRender);
router.post("/update/:id", updateProfile);

module.exports =  router;