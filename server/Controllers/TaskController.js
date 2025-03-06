const Task = require("../Models/Task")
const Student=require("../Models/Student")

const getAllTasks = async (req, res) => {
    const tasks = await Task.find().populate().lean()
    if (!tasks)
        return res.status(400).send("no tasks")
    res.json(tasks)
}
const getTaskByTeacher = async (req, res) => {
    const { task_name} = req.params
    const tasks = await Task.find({ status: { $in: ["done", "checked"] }, task_name: task_name, teacher_id: req.user.id }).lean()
    if (!tasks)
        return res.status(400).send("no tasks")
    res.json(tasks)
}
const getTasksBystudentAndTeacher = async (req, res) => {
    const { student_id } = req.params
    const tasks = await Task.find({ status: { $in: ["done", "checked"] }, student_id: student_id, teacher_id: req.user.id }).lean()
    if (!tasks)
        return res.status(400).send("no tasks")
    res.json(tasks)
}
const getTasksBystudentID = async (req, res) => {
    const tasks = await Task.find({ student_id: req.user.id}).lean()
    if (!tasks)
        return res.status(400).send("no tasks")
    res.json(tasks)
}
const getTasksByID = async (req, res) => {
    const { _id } = req.params
    const task = await Task.findById(_id).lean()
    if (!task)
        return res.status(400).send("no such task")
    res.json(task)
}
const createTask = async (req, res) => {
    const { name, content, last_date, comments } = req.body
    if (!name || !content )
        return res.status(400).send("fileds are required")
    const duplicate = await Task.findOne({ name: name, teacher_id: req.user.id })
    if (duplicate)
        return res.status(400).send("ther is already a task by this name")
    const students = getStudentsByClass()
    const task = await Task.create({ name, student_id, teacher_id: req.user.id, grade, content, last_date, comments })
    if (!task)
        return res.status(400).send("create failed")
    res.json(task)
}
const createTaskByClass = async (req, res) => {
    const { name,classST, student_id, content, last_date, comments } = req.body
    if (!student_id || !name || !content||!classST)
        return res.status(400).send("fileds are required")
    const duplicate = await Task.findOne({ name: name, teacher_id: req.user.id })
    if (duplicate)
        return res.status(400).send("ther is already a task by this name")
    const students=Student.find({student_class:classST})
    ;
    const tasks=students.map(async(student)=>
         {const task=await Task.create({ name, student_id:student.id, teacher_id: req.user.id, grade, content, last_date, comments })
    if (!task)
        return res.status(400).send("create failed")
    return task}
    )
    //const task = await Task.create({ name, student_id, teacher_id: req.user.id, grade, content, last_date, comments }
    res.json(tasks)
}
// const updateTask=async(req,res)=>{
//     const {_id,name,student_id,teacher_id,grade,content,status,last_date,comments}=req.body
//     if(!_id||!student_id||!name)
//         return res.status(400).send("_id and student_id and name are required")
//     const duplicate=await Task.findOne({name:name,teacher_id:teacher_id})
//    if(duplicate)
//     return res.status(400).send("ther is already a task by this name")
//     const task=await Task.findById(_id).exec()
//     if(!task)
//        return res.status(400).send("no task")
//     task.name=name
//     task.student_id=student_id
//     task.teacher_id=teacher_id
//     task.grade=grade
//     task.content=content
//     task.status=status
//     task.last_date=last_date
//     task.comments=comments
//     const savedTask=await task.save()
//     if(!savedTask)
//         return res.status(400).send("update failed")
//     res.json(savedTask)
//    }
const updateTaskTeacher = async (req, res) => {
    const { _id, name, student_id, grade, content, status, last_date, comments } = req.body
    if (!_id || !student_id || !name)
        return res.status(400).send("_id and student_id and name are required")
    const task = await Task.findById(_id).exec()
    if (!task)
        return res.status(400).send("no task") 
    const duplicate = await Task.findOne({ name: name, teacher_id: req.user.id })
    if (duplicate)
        return res.status(400).send("ther is already a task by this name")
    task.name = name
    task.student_id = student_id
    task.grade = grade
    task.content = content
    task.status = status
    task.last_date = last_date
    task.comments = comments
   
    const savedTask = await task.save()
    if (!savedTask)
        return res.status(400).send("update failed")
    res.json(savedTask)
}
const updateTaskTeacherForClass = async (req, res) => {
    const { name, teacher_id, grade, content, status, last_date, comments } = req.body
    if (!_id || !student_id || !name || !teacher_id)
        return res.status(400).send("_id and student_id and name are required")
    const duplicate = await Task.findOne({ name: name, teacher_id: teacher_id })
    if (duplicate)
        return res.status(400).send("ther is already a task by this name")
    const task = await Task.findById(_id).exec()
    if (!task)
        return res.status(400).send("no task")
    task.name = name
    task.student_id = student_id
    task.teacher_id = teacher_id
    task.grade = grade
    task.content = content
    task.status = status
    task.last_date = last_date
    task.comments = comments
    const savedTask = await task.save()
    if (!savedTask)
        return res.status(400).send("update failed")
    res.json(savedTask)
}
const updateTaskStudent = async (req, res) => {
    const { _id, file, status, comments } = req.body
    if (!_id)
        return res.status(400).send("_id and student_id and name are required")
    const task = await Task.findById(_id).exec()
    if (!task)
        return res.status(400).send("no task")
    task.status = status
    task.file = file
    task.comments = comments
    const savedTask = await task.save()
    if (!savedTask)
        return res.status(400).send("update failed")
    res.json(savedTask)
}
const deleteTask = async (req, res) => {
    const { _id } = req.body
    if (!_id)
        return res.status(400).send("id is required")
    const task = await Task.findById(_id).exec()
    if (!task)
        return res.status(400).send("no task")
    await task.deleteOne()
}
module.exports = { getTasksByID, getAllTasks, getTaskByTeacher,createTaskByClass, getTasksBystudentID, createTask, deleteTask, getTasksBystudentAndTeacher, updateTaskTeacher, updateTaskStudent }
