const express = require('express');
const mongoose = require('mongoose');
const User = require("../models/userModel")

const router = express.Router();


router.post('/', async(req, res)=>{
    const {name,email,age} = req.body;

    const User = require("../models/userModel")
    try{
        const userAdded = await User.create({
            name: name,
            email: email,
            age: age
        });

        res.status(201).json(userAdded);

    }catch(error){
        console.log(error)
        res.status(400).json({error :error.message});
    }
    
// name : name
// backend : frontend

})

// get All user
router.get("/", async(req, res) => {
    try{
        const showAll = await User.find();
        res.status(200).json(showAll);

    }catch(err){
        console.log(err)
        res.status(500).json({err:err.message})
    }
})

// get only a single user data
router.get("/:id", async(req, res) => {
    const {id} = req.params;
    try{
        const singleUser = await User.findById({_id : id});
        res.status(200).json(singleUser);

    }catch(err){
        console.log(err)
        res.status(500).json({err:err.message})
    }
})

// Delete only a single user data
router.delete("/:id", async(req, res) => {
    const {id} = req.params;
    try{
        const deleteUser = await User.findByIdAndDelete({_id : id});
        res.status(200).json(deleteUser);

    }catch(err){
        console.log(err)
        res.status(500).json({err:err.message})
    }
})

// update only a single user data
router.patch("/:id", async (req, res)=>{
    
    const { id } = req.params;
    const { name, email , age } = req.body;
    try{
        const updateUser = await User.findByIdAndUpdate(id ,req.body, {
            new:true,
        });
        res.status(200).json(updateUser);
    }catch(err){
        console.log(err);
        res.status(500).json({err:err.message})
    }
})

module.exports = router;