const Task = require("../models/Tasks");
const User = require("../models/Users");
const assignTask = async (req, res, next) => {
    try {
        let { title, desc, assigned_to } = req.body;
       
        // if status is done
        let data = {
            title,
            desc,
            assigned_to
        }

        let response = await Task.create(data);

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

const updateTask = async (req, res, next)=>{
    try {
        let {status, id} = req.body;
        // if required data not passed
        let completed_at;
        if(status == "done"){
          completed_at = Date.now()
        }

        let data = {
            status,
            completed_at,
        }

 

        let response = await Task.updateOne({id,}, data);
        return res.status(200).json({
            res: {
                status: "success",
                code: 200
            },
            message: "Task Updated Successfully!",
            data,
        });
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
const renderEditTask = async(req, res, next)=>{
    return res.render('editTask', {
        title: "Edit Title"
    })
}

const renderAssignTask = async(req, res, next)=>{
   try{
    let users = await User.find({});
    users = users.map((doc)=> {
        return {
            name: doc.name,
            mobile: doc.mobile
        }
    });

    
    return res.render('assignTask', {
        title: "Assign Task",
        users,
    })
   }catch(err){
    return res.send("Internal Error!")
   }
}

const editTask = async(req, res)=>{
  try{
    let id = req.params.id;
    let status = req.body.status;
    let assigned_to = req.body.assigned_to;
    await Task.findByIdAndUpdate(id, {status, assigned_to,});
    return res.redirect("back");
  }catch(err){
    return res.render("Internal Error!");
  }
}
const editTaskRender = async(req, res)=>{ 
   try{
    let id = req.params.id;
    let task = await Task.findById(id);
    let person = task.assigned_to;
    let users = await User.find({});

    // console.log(task);
    return res.render("editTask", {
        title: "edit-task",
        task,
        users,
        person,
    })
   }catch(err){
    return res.send("Internal Error!");
   }
}

module.exports=  { assignTask, updateTask, renderEditTask, renderAssignTask, editTaskRender, editTask};