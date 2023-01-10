const User = require('../models/Users');
const bcrypt = require('bcrypt');
const MHour = require('../models/MHours');
const Tasks = require("../models/Tasks");
const register = async (req, res, next) => {
  try {
    // check if role is admin
    if (req.user.role != "admin") {
      return res.json("You are Not Autherized!")
    }
    let { name, email, mobile, equity, password, cpassword, role } = req.body;


    // if password and cpassword matching failed
    if (password != cpassword) {
      return res.status(400).json({
        res: {
          status: "failed",
          code: 400
        },
        message: "Password and CPassword not matched!"
      })
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    let data = {
      name,
      email,
      mobile,
      equity,
      role,
      password: hashedPassword
    }

    let response = await User.create(data);
    console.log(response);

    return res.redirect('back');
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      res: {
        status: "failed",
        code: 500
      },
      message: "Internal Server Error!"
    });
  }



}


// authentication
const createSession = async (req, res, next) => {
  return res.redirect('/users/home');
}
const destroySession = (req, res) => {
  req.logout((err) => {
    if (err) {
      console.log(err);
      return;
    }
    return res.redirect('/');
  });

}


// render screens
const renderRegister = async (req, res, next) => {
  return res.render('addUser', {
    title: "Add User"
  });
}
const renderLogin = async (req, res, next) => {
  if (req.isAuthenticated()) {
    res.redirect("/users/home");
  }
  return res.render('login', {
    title: "Login"
  })
}

const renderResetPassword = async (req, res, next) => {
  return res.render('resetPassword', {
    title: "Reset Password"
  })
}
const resetPassword = async (req, res) => {
  //  find user from db
  if (req.body.scode != "aw") {
    return res.send("Go To Hell!")
  }
  let data = req.body;
  delete data.scode;
  // if password and cpassword matching failed
  if (data.password != data.cpassword) {
    return res.status(400).json({
      res: {
        status: "failed",
        code: 400
      },
      message: "Password and CPassword not matched!"
    })
  }

  // hash password
  const hashedPassword = await bcrypt.hash(data.password, 10);

  await User.updateOne({
    email: data.email,
    mobile: data.mobile
  }, { password: hashedPassword });

  return res.redirect("/users/login")

}



const home = async (req, res) => {
  let user = req.user.mobile;
  let target = 50;
  // get present month and year
  let date = new Date();
  let month = date.getMonth() + 1 > 9 ? JSON.stringify(date.getMonth() + 1) : '0' + JSON.stringify(date.getMonth() + 1);
  let year = JSON.stringify(date.getFullYear());
  // find month report of user
  let monthReport = await MHour.findOne({ "user": user, "month": month, "year": year });
  let hours = 0;
  if (monthReport) {
    hours = parseFloat(monthReport.hours);
  }
  let hourPer = (hours / target) * 100;
  if (hourPer > 100) { hourPer = 100 }

  // find assigned tasks
  let assignedTasks = await Tasks.find({ "assigned_to": user, status: "assigned" }).sort({ createdAt: -1 });
  let pendingTasks = await Tasks.find({ "assigned_to": user, status: "pending" }).sort({ createdAt: -1 });
  let tasks = assignedTasks.concat(pendingTasks);


  return res.render('homepage', {
    title: "Home",
    hours,
    hourPer,
    target,
    tasks,
  })
}

const deleteUser = async (req, res) => {
  try {
    let mobile = req.query.mobile;
    // find user
    let user = await User.find({"mobile": mobile});
    if(user.role == "admin"){
      return res.send("Admin can't get Deleted!");
    }
    let id = user.id;
    await User.deleteOne({"mobile": mobile});
    return res.redirect("back");
  } catch (err) {
    return res.send("Internal Error!")
  }
}
module.exports=  { register, renderRegister, renderLogin, renderResetPassword, home, createSession, destroySession, resetPassword , deleteUser};