const { Router } = require("express");
const { logIn, singIn, listAllUsers, listUserById, updateUserById, deleteUserById, reToken } = require('../controller/user')

const { check } = require('express-validator');
const { validateFields } = require("../middleware/validate");
const { validateJWT } = require("../middleware/validate-token");
const { isId } = require("../middleware/isId");
const getId = require("../middleware/idFromToken");

const router = Router();

//create user
router.post('/users/singin',
    [
        check('name', 'El campo de nombre es obligatorio').notEmpty(),
        check('email', 'El campo de email es obligatorio').notEmpty().isEmail(),
        check('mobile', 'El campo de telefono es obligatorio').notEmpty().isMobilePhone(),
        check('password', 'La constraseña es obligatoria y debe tener al menos 8 caracteres').notEmpty().isLength({ min: 8 }),
        validateFields
    ],
    singIn
);

//login user
router.post('/users/login',
    [
        check('email', 'campo de email debe ser valido').isEmail(),
        check('password', 'la contraseña debe tener almenos 8 caracteres').isLength({ min: 8 }),
        validateFields
    ],
    logIn
);

// refrescar token
// to do añadir la validacion de token para comparar si es el usuario quien hace la peticion
router.get('/users/refresh', validateJWT, reToken)

//list all users
router.get('/users', [], listAllUsers);

//get user by id
router.get('/users/:id',
    [
        isId
    ],
    listUserById
);

//update by id, no se cambiara
//ni la contraseña, el mail o el ID desde este punto
//asi como el rol de aminstrador
router.put('/users/:id',
    [
        isId
    ],
    updateUserById
);

//delete user by id
//debe comprobar que el usuario que lo usa es administrador
router.delete('/users/:id',
    [
        isId,
        getId
    ],
    deleteUserById
);

module.exports = router;