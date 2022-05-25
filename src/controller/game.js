const { response } = require('express');
const Game = require('../models/game');

const createGame = async (req, res) => {

    console.log("peticion recibida :");
    console.log(req.body); 
    console.log();
    
    const { creadorId, countDown, name} = req.body
    const listaDeJugadores = [{name, creadorId, boomba: false}]
    console.log(listaDeJugadores);
    const game = new Game({
        creadorId,
        listaDeJugadores,
        countDown
    });

    try {
        //let game = new Game(req.body);
        await game.save();
        return res.status(201).json({
            ok: true,
            mensaje: 'partida creada',
            id: game.id,
            creadorId: game.creadorId,
            listaDeJugadores: game.listaDeJugadores,
            countDown: game.countDown
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            mensaje: 'internal server error'
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
    if (!game) {
        return res.status(404).json({
            ok: false,
            mensaje: 'no existe juego'
        });
    }

    let listPlayers = game.listaDeJugadores
    try {
        return res.status(200).json({
            ok: true,
            listPlayers
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            mensaje: 'internal server error'
        });
    }

}

//añadir usuario a partida por id
//addUserToGame

module.exports = { createGame, listAllPlayers }