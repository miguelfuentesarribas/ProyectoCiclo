const { response } = require('express');
const Game = require('../models/game');

const createGame = async (res, req) => {

    console.log("peticion recibida :");
    console.log(req.body); 
    console.log();

    const game = new Game({
        creadorId: req.body.creadorId,
        listaDeUsuarios: req.body.listaDeUsuarios,
        countDown: req.body.countDown
    });

    try {
        await game.save();
        return res.status(201).json({
            ok: true,
            game
        })
    } catch (error) {
        //console.error(error);
        return res.status(500).json({
            ok: false,
            mensaje: 'bad request'
        });
    }

}

//listar usuarios en partida
const listAllPlayers = async (req, res) => {

    console.log("peticion recibida :");
    console.log(req.body); 
    console.log();

    const {id} = req.params;
    let game = await Game.findById(id);
    if (game === undefined) {
        return res.status(204).json({
            ok: false,
            mensaje: 'no existe juego'
        });
    }

    let listPlayers = game.listaDeUsuarios
    try {
        return res.status(200).json({
            ok: true,
            listPlayers
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            mensaje: 'bad request'
        });
    }

}


module.exports = { createGame }