const express = require('express');
const mongoose = require('mongoose');
const Publisher = require('../models/publisher');
const router = express.Router();

router.get('/',(req,res) => {
    let publisher = []
    Publisher.find((err,publishers) => {
        if(publishers){
            publishers.forEach((snap) => {
                publisher.push(snap);
            })
            res.render('publisher/publisher',{publisher: publisher});
        }else{
            res.render('publisher/publisher');
        }
    })
})


router.get('/:name',(req,res) => {
    Publisher.findOne({name:req.params.name},(err,publisher) => {
        if(publisher){
            res.render('publisherDetail/publisherDetail',{publisher: publisher});
        }else{
            res.redirect('/publisher');
        }
    })
})

router.post('/',(req,res) =>{
    
    let publisher = new Publisher({
        name: req.body.name
    })
    publisher.save((err) => {
        if(err){
            if(err.code === 11000){
                res.json({success: false, message: 'Publisher already exists!'})
            }else{
                res.json({success: false, message: 'could not save user!'})
            }
        }else{
            res.redirect('/publisher');
        }
    })
})

router.post('/:name',(req,res) => {
    if(req.body.button === 'delete'){
        Publisher.findOne({name: req.params.name}).remove().exec();
        res.redirect('/publisher');
    }else{
        Publisher.findOne({name: req.params.name}, (err,publisher) => {
            if(err){
                res.redirect('/publisher/' + req.params.name);
            }else{
                if(publisher){
                    
                    publisher.name = req.body.newName;
                    publisher.save((err) =>{
                        if(err){
                        }
                        res.redirect('/publisher')
                    });
                }
            }
        })
    }
})

module.exports = router;