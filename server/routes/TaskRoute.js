const express=require("express")
const TaskController=require("../controllers/TaskController")
const route=express.Router()
route.get("/",TaskController.getAllTasks)
route.get("/taskbyteach/:task_name",TaskController.getTaskByTeacher)//teacher
route.get("/taskbyteachstud/:student_id",TaskController.getTasksBystudentAndTeacher)//teacher
route.get("/taskbystud/",TaskController.getTasksBystudentID)//stundent role
route.get("/taskbyid/:id",TaskController.getTasksByID)//student...
route.post("/",TaskController.createTask)
route.put("/teachers",updateTaskTeacher)
route.put("/students",updateTaskStudent)
//route.put("/",TaskController.updateTask)
route.delete("/",TaskController.deleteTask)





