const {response} = require('express');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const { generateJWT } = require('../helper/jwt'); 

const User = require("../models/user");

const singIn = async (req, res = response) => {

    const { name, email, password } = req.body;

    console.log("peticion recibida :");
    console.log(req.body); 
    console.log();

    try {
        let user = await User.findOne({email});
        let userName = await User.findOne({name});
        if (user || userName) {
            return res.status(400).json({
                ok: 'false',
                mansaje: 'usuario ya existe en la bd'
            });
        }
        user = new User(req.body);
        user.password = bcrypt.hashSync(password, salt);
        await user.save();
        const token = await generateJWT(user.id, user.name);
        return res.json({
            ok: true,
            mensaje: "registro",
            name: user.name,
            email: user.email,
            rol: "no admin",
            imagen: "por defecto",
            password: user.password,
            token
        })
    } catch (error) {
        //console.error(error);
        return res.status(500).json({
            ok: false,
            mensaje: 'error en el servidor, bad request'
        });
    }
}

const listAllUsers = async (req, res = response) => {

    console.log("peticion recibida :");
    console.log(req.body); 
    console.log();

    try {
    const users = await User.find({});
    return res.status(200).json({
        ok: true,
        users
    });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            mensaje: 'error en el servidor'
        });
    };
}

const listUserById = async (req, res) => {

    console.log("peticion recibida :");
    console.log(req.body); 
    console.log();

    const {id} = req.params;

    let user = await User.findById(id);
    return res.status(200).json({
        ok: true,
        user
    });
}

const updateUserById = async (req, res) => {

    console.log("peticion recibida :");
    console.log(req.body); 
    console.log();

    const {id} = req.params;
    const { name, profilePic  } = req.body;
    const updateUser = await User.findByIdAndUpdate(id,
        { $set: {name, profilePic}}
    );
    return res.status(200).json({
        ok: true,
        updateUser
    })
}

const deleteUserById = async (req, res) => {

    console.log("peticion recibida :");
    console.log(req.body); 
    console.log();

    let users = await User.find({})
    const {id} = req.params;
    const deleteUser = users.find(user => user.id === id);
    console.log(deleteUser+ "a");
    if (deleteUser === undefined) {
        returnres.status(204).json({
            ok: false,
            mensaje: 'usuario no encontrado'
        });
    }
    try {
        await deleteUser.delete()
        return res.status(201).json({
            ok: true,
            deleteUser
        })    
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            mensaje: 'error en el servidor'
        });
    }
}

module.exports = { singIn, listAllUsers, listUserById, updateUserById, deleteUserById }