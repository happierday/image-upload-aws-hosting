const express = require('express');
const Publisher = require('../models/publisher');
const fs = require('fs');
const multer = require('multer');
const Game = require('../models/game');
const router = express.Router();

let upload = multer({ dest: 'uploads/' })

router.get('/',(req,res) => {
    let publisher = []
    let game = []
    Game.find((err,games) =>{
        if(games){
            games.forEach((snap) => {
                game.push(snap);
            })
        }
    }).then(()=>{
        Publisher.find((err,publishers) => {
            if(publishers){
                publishers.forEach((snap) => {
                    publisher.push(snap);
                })
            }
        })
    }).then(()=>{
        res.render('game/game',{publisher: publisher,game:game});
    })
    
})

router.get('/:name',(req,res) => {
    let publisher = []
    Game.findOne({name:req.params.name},(err,game) => {
        if(game){
            Publisher.find((err,publishers) => {
                if(publishers){
                    publishers.forEach((snap) => {
                        publisher.push(snap);
                    })
                    res.render('gameDetail/gameDetail',{name: game.name,publisher:game.publisher, path:game.path,publishers:publisher});
                }
            })
            
        }else{
            res.redirect('/game');
        }
    })
})

router.post('/', upload.any(),(req,res) => {
    let game = new Game({
        name: req.body.name,
        publisher: req.body.publisher,
    })
    let data = fs.readFileSync(req.files[0].path);
    let path = "image/" +  game.name + "." + req.files[0].mimetype.substring(6);
    fs.writeFileSync(path,data,'base64')
    game.path = path.substring(6);
    game.save((err) => {
        if(err){
            
        }
        res.redirect('/game');
    })
})

router.post('/:name',upload.any(),(req,res) => {
    if(req.body.button === 'delete'){
        Game.findOne({name: req.params.name}).remove().exec();
        res.redirect('/game');
    }else{
        Game.findOne({name:req.params.name},(err,game) => {
            if(err){
                res.redirect('/'+req.params.name);
            }else{
                if(game){
                    game.name = req.body.newName;
                    game.publisher = req.body.publisher;
                    if(req.files[0]){
                        let data = fs.readFileSync(req.files[0].path);
                        let path = "image/" +  game.name + "." + req.files[0].mimetype.substring(6);
                        fs.writeFileSync(path,data,'base64');
                        game.path = path.substring(6);
                    }
                    console.log(game);
                    game.save((err) => {
                        if(err){     
                        }
                        res.redirect('/game');
                    })
                }
            }
        })
    }
})

module.exports = router;