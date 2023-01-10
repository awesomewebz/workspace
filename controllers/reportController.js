const Work = require("../models/Works");
const MHour = require("../models/MHours");
const getHour = require("../lib/getHour");
const User = require("../models/Users");
const Task = require("../models/Tasks");
const createReport = async (req, res, next) => {
    try {
        let { time_from, time_to, work_desc } = req.body;
        let hours = getHour(time_from, time_to);
        let user = req.user.mobile;
        let workData = {
            user,
            hours,
            work_desc,
            time_from,
            time_to,
        };
        // get present month and year
        let date = new Date();
        let month = date.getMonth() + 1 > 9 ? JSON.stringify(date.getMonth() + 1) : '0' + JSON.stringify(date.getMonth() + 1);
        let year = JSON.stringify(date.getFullYear());
        // find month report of user
        let monthReport = await MHour.findOne({ "user": user, "month": month, "year": year });
        // update month report
        if (monthReport) {
            let monthHours = parseFloat(monthReport.hours) + hours;
            await MHour.updateOne({ "user": user, "month": month, "year": year }, {
                hours: monthHours
            })
        } else {
            await MHour.create({
                user,
                month,
                year,
                hours,
            })
        }
        // create work data
        await Work.create(workData);
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


// render screens
const renderReport = async (req, res, next) => {
    try {
        // get user and task status
        let { person, task } = req.query;
        if (!task) {
            task = "all";
        }
        if (!person || person == "") {
            person = req.user.mobile;
        }

        // find works 
        let works = await Work.find({ user: person }).sort({ createdAt: -1 });
        // find tasks
        let taskFindObj = {
            assigned_to: person
        };
        if (task != 'all') {
            taskFindObj.status = task;
        }
        let tasks = await Task.find(taskFindObj).sort({ createdAt: -1 });

        // find all users
        let users = await User.find({});
        users = users.map((doc) => {
            return {
                name: doc.name,
                mobile: doc.mobile
            }
        });
        return res.render('report', {
            title: "Report",
            users,
            works,
            person,
            tasks,
        })
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

const users = async (req, res) => {
    try {
        let users = await User.find({});
        let date = new Date();
        let month = date.getMonth() + 1 > 9 ? JSON.stringify(date.getMonth() + 1) : '0' + JSON.stringify(date.getMonth() + 1);
        let year = JSON.stringify(date.getFullYear());

        let finalUsers = [];
        for (let i of users) {
            // get hour of present month
            let hour = await MHour.findOne({
                "user": i.mobile,
                "month": month,
                "year": year
            });
            if (hour) {
                hour = hour.hours;
            } else {
                hour = 0;
            }
            // get average hours
            let avgHour = await MHour.find({ user: i.mobile });
            let avgTotal = 0;
            avgHour.map((doc) => {
                avgTotal += doc.hours;
            });
            if (avgHour.length == 0) {
                avgHour = 0;
            } else {
                avgHour = avgTotal / avgHour.length;
            }

            let { name, email, mobile, role, equity, id } = i;
            finalUsers.push({
                id,
                name,
                email,
                mobile,
                role,
                equity,
                hours: hour,
                avgHour,
            });
        }

        return res.render("users", {
            title: "users",
            users: finalUsers
        })
    } catch (err) {
        return res.send("Internal Error!")
    }
}

const renderReportH = async (req, res) => {
    try {
        let date = new Date();
        let month = date.getMonth();
        let year = date.getFullYear();
        let rYear = year;
        let startYear = 2023;
        let user = req.user;
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let { reqMonth, reqYear, reqUser } = req.query;
        if (reqUser, reqMonth, reqYear) {
            month = parseInt(reqMonth);
            rYear = parseInt(reqYear);
            user = await User.findOne({ mobile: reqUser });
        }
        let queryMonth = month + 1 > 9 ? JSON.stringify(month + 1) : `0${JSON.stringify(month + 1)}`;
        let queryYear = JSON.stringify(rYear);
        // for date range of work report
        let strFrom = `${queryYear}-${queryMonth}-01`;
        let strTo = `${queryYear}-${parseInt(queryMonth) + 1}-01`

        let users = await User.find({});
        // get hour
        let hourData = await MHour.findOne({
            user: user.mobile,
            month: queryMonth,
            year: queryYear
        });
        let hours = 0;
        if (hourData) {
            hours = hourData.hours;
        }
        // get work report
        let works = await Work.find({
            createdAt: {
                $gte: new Date(strFrom),
                $lt: new Date(strTo)
            },
            user: user.mobile
        })


        return res.render("reportH", {
            title: "ReportH",
            userR: user,
            month,
            year,
            startYear,
            months,
            users,
            rYear,
            hours,
            works,
        });
    } catch (err) {
        return res.send("Internal Error!")
    }
}


module.exports=  { createReport, renderReport, users, renderReportH };