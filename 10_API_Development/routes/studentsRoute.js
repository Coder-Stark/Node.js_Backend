const express = require('express');
const router = express.Router();
const Student = require('../models/studentsModel.js');

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
router.post('/', async(req, res)=>{
    try{
        const newStudent = await Student.create(req.body);
        res.status(201).json(newStudent);
    }catch(err){
        res.status(400).json({message: err.message});
    }
})

//update a student
router.put('/:id', async(req, res)=>{
    try{
        const updateStudent = await Student.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!updateStudent) return res.status(404).json({message: 'Student not found'});
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
        res.status(201).json({message: 'Student Deleted'});
    }catch(err){
        res.status(400).json({message: err.message});
    }
})

module.exports = router;