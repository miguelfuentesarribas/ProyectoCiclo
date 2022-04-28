const {Router} = require("express");
const { singIn } = require('../controller/user')
const userSchema = require("../models/user");//---

const { check } = require('express-validator');
const { validateFields } = require("../middleware/validate");

const router = Router();

//create user
router.post('/users',
    [
        check('name', 'campo de nombre es obligatorio').notEmpty(),
        validateFields
    ],
    singIn /*(req, res) => {
    //res.send("crear usuario");
    const user = userSchema(req.body);
    user
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
}*/)

//list all users
router.get('/users', (req, res) => {
    userSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});

//get user by id
router.get('/users/:id', (req, res) => {
    const { id } = req.params;
    userSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});

//update by id, no se cambiara
//ni la contraseña ni el mail desde este punto
//asi como el rol de aminstrador
router.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, profilePic  } = req.body;
    userSchema
        .updateOne({_id: id}, { $set: {name, profilePic}})
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});

//delete user by id
router.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    
    userSchema
        .remove({_id: id})
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});
module.exports = router;