const User = require("../models/Users");
const renderProfile = async (req, res) => {
  try {
    let id = req.query.id;
    let profileUser = req.user;
    if (id) {
      profileUser = await User.findById(id);
    }
    return res.render('profile', {
      title: "profile",
      profileUser,
    });
  } catch (err) {
    return res.send("Internal Error!")
  }
}

const updateProfileRender = async (req, res) => {
  try {
    let id = req.params.id;
    let profileUser = await User.findById(id);
    return res.render("updateProfile", {
      title: "update profile",
      profileUser,
    })
  } catch (err) {
    return res.send("Internal Error!")

  }
}
const updateProfile = async (req, res) => {
  try {
    let id = req.params.id;
    let data = req.body;

    await User.findByIdAndUpdate(id, data);
    return res.redirect("back");
  } catch (err) {
    return res.send("Error While Updating")
  }
}

module.exports=  { renderProfile, updateProfileRender, updateProfile };