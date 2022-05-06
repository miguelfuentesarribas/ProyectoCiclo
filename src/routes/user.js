const {Router} = require("express");
const { singIn, listAllUsers, listUserById, updateUserById, deleteUserById } = require('../controller/user')
const userSchema = require("../models/user");//---

const { check } = require('express-validator');
const { validateFields } = require("../middleware/validate");

const router = Router();

//create user
router.post('/users',
    [
        check('name', 'El campo de nombre es obligatorio').notEmpty(),
        check('email', 'El campo de email es obligatorio').notEmpty().isEmail(),
        check('mobile', 'El campo de telefono es obligatorio').notEmpty().isMobilePhone(),
        check('password', 'La constraseña es obligatoria y debe tener al menos 8 caracteres').notEmpty().isLength({min :8}),
        validateFields
    ],
    singIn);

//list all users
router.get('/users', [], listAllUsers);

//get user by id
router.get('/users/:id', [], listUserById);

//update by id, no se cambiara
//ni la contraseña, el mail o el ID desde este punto
//asi como el rol de aminstrador
router.put('/users/:id', [], updateUserById);

//delete user by id
//debe comprobar que el usuario que lo usa es administrador
router.delete('/users/:id', [], deleteUserById);

module.exports = router;