const { Schema, model} = require('mongoose');
const {userSchema} = require('./user');

// se construira apartir del primer usuario
// la peticion debe incluir el nombre e id del 1er usuario
// comprobar el tipo que devuelve el id para la lista
const gameSchema = new Schema({
    creadorId: {
        type: String,
        required: true,
        //unique: true
    }, 
    listaDeJugadores: {
        type: [userSchema],
        required: true
    }, 
    countDown: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Game = model('Game', gameSchema);
module.exports = Game;
