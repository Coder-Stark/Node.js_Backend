const express = require('express');
const router = express.Router();
const Student = require('../models/studentsModel.js');
const multer = require('multer');           //storage, limits, file filter
const path = require('path');
const fs = require('fs');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) =>{
        const newFileName = Date.now() + path.extname(file.originalname)
        cb(null, newFileName);             //null = no error
    }
})

const fileFilter = (req, file, cb)=>{
    if(file.mimetype.startsWith('image/')){
        cb(null, true);
    }else{
        cb(new Error("Only images are allowed"), false);
    }
}
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limit: {
        fileSize: 1024 * 1024 * 3                 //3mb
    }
})

//get all students
router.get('/', async(req, res)=>{
    try{
        const students = await Student.find();
        res.json(students);
    }catch(err){
        res.status(500).json({message: err.message});
    }
})

//get a single student
router.get('/:id', async(req, res)=>{
    try{
        const student = await Student.findById(req.params.id);
        if(!student) return res.status(404).json({message: "Student not found"});
        res.json(student);
    }catch(err){
        res.status(400).json({message: err.message});
    }
})

//add new student
router.post('/', upload.single('profile_pic'), async(req, res)=>{
    try{
        // const newStudent = await Student.create(req.body);
        const student = new Student(req.body);                    //another way to create student
        if(req.file){
            student.profile_pic = req.file.filename
        }
        const newStudent = await student.save();

        res.status(201).json(newStudent);
    }catch(err){
        res.status(400).json({message: err.message});
    }
})

//update a student
router.put('/:id', upload.single('profile_pic'), async(req, res)=>{
    try{
        const existStudent = await Student.findById(req.params.id);
        if(!existStudent){
            if(req.file.filename){           //delete non-existing student image (upload image even user is not present)
                const filePath = path.join('./uploads', req.file.filename);
                fs.unlink(filePath, (err)=>{
                    if(err) console.log('Failed to Delete image : ', err);
                })
            }
            return res.status(404).json({message: "Student not found"});
        }
        if(req.file){
            if(existStudent.profile_pic){
                //first delete previous (old) image
                const oldImgPath = path.join('./uploads', existStudent.profile_pic);
                fs.unlink(oldImgPath, (err)=>{
                    if(err) console.log('Failed To Delete old Image : ', err);
                });
            }

            //update image
            req.body.profile_pic = req.file.filename;
        }
        const updateStudent = await Student.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(201).json(updateStudent);
    }catch(err){
        res.status(400).json({message: err.message});
    }
})

//delete a student
router.delete('/:id', async(req, res)=>{
    try{
        const deleteStudent = await Student.findByIdAndDelete(req.params.id);
        if(!deleteStudent) return res.status(404).json({message: 'Student not Found'});
        if(deleteStudent.profile_pic){
            const filePath = path.join('./uploads', deleteStudent.profile_pic);
            fs.unlink(filePath, (err)=>{
                if(err) console.log('Failed To Delete', err);
            });
        }
        res.status(201).json({message: 'Student Deleted'});
    }catch(err){
        res.status(400).json({message: err.message});
    }
})

module.exports = router;