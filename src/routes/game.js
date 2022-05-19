const {Router} = require("express");
const { createGame, listAllPlayers } = require("../controller/game");

const { check } = require('express-validator');
const { validateFields } = require("../middleware/validate");

const router = Router();

//create game
router.post('/game/create',
    [
        check('creadorId', 'creador necesario').notEmpty(),
        check('listaDeJugadores', 'lista de usuarios necesaria').notEmpty(),
        check('countDown', 'cuenta atras necesria').notEmpty(),
        validateFields
    ],
    createGame);

// lista de usuarios en partida
router.get('/game/:id', [], listAllPlayers);

//añadir usuario a la lista
//router.put('/game/:id/idUser', [], updateGameById);

//borrar partida
//router.delete('/users/:id', [], deleteGameById);

module.exports = router;
