//login

const { response } = require('express');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const { generateJWT } = require('../helper/jwt');

const { User } = require("../models/user");


//no aparece el token en los list
const singIn = async (req, res) => {

    console.log("peticion recibida :");
    console.log(req.body);
    console.log();

    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        let userName = await User.findOne({ name });
        if (user || userName) {
            return res.status(400).json({
                ok: 'false',
                mansaje: 'user ya existe en la bd'
            });
        }
        user = new User(req.body);
        user.password = bcrypt.hashSync(password, salt);
        await user.save();
        const token = await generateJWT(user.id, user.name)
        return res.json({
            ok: true,
            mensaje: "registro",
            id: user.id,
            name: user.name,
            email: user.email,
            rol: "no admin",
            imagen: "por defecto",
            password: user.password,
            token: token
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            mensaje: 'error en el servidor, bad request'
        });
    };
};

//log User
const logIn = async (req, res = response) => {

    const { email, password } = req.body

    console.log("peticion recibida :");
    console.log(req.body);
    console.log();

    try {
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                ok: 'false',
                mansaje: 'usuario no existe '
            })
        }
        //comparamos la contraseña con el hash
        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(400).json({
                ok: 'false',
                mansaje: 'contraseña erronea'
            })
        }

        // generamos un JsonWebToken (no se guarda), se manda el cliente y se valida despues
        const token = await generateJWT(user.id, user.name)

        return res.json({
            ok: true,
            mensaje: "logIn",
            email,
            id: user.id,
            token
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            mensaje: 'internal server error'
        })
    }
}

//refresh token
const reToken = async (req, res = response) => {

    console.log("peticion recibida :");
    console.log(req.body);
    console.log();

    const { id, name } = req
    const token = await generateJWT(id, name)
    res.json({
        ok: true,
        mensaje: 'refrescando token',
        token
    })
}


//comprobar la informacion que se muestra (seguridad)
const listAllUsers = async (req, res = response) => {

    console.log("peticion recibida :");
    console.log(req.body);
    console.log();

    try {
        const users = await User.find({});
        const simpleUsers = users.map( user => {return user})
        return res.status(200).json({
            ok: true,
            simpleUsers
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            mensaje: 'error en el servidor'
        });
    };
};

//fallo si peticiones no contienen el id adecuado
const listUserById = async (req, res) => {

    console.log("peticion recibida :");
    console.log(req.body);
    console.log();

    const { id } = req.params;

    let user = await User.findById(id);
    return res.status(200).json({
        ok: true,
        user
    });
};

const updateUserById = async (req, res) => {

    console.log("peticion recibida :");
    console.log(req.body);
    console.log();

    let users = await User.find({});
    const { id } = req.params;
    const { name, profilePic } = req.body;

    const updateUser = users.find(user => user.id === id);
    console.log(updateUser);
    if (updateUser === undefined) {
        return res.status(204).json({
            ok: false,
            mensaje: 'user no encontrado'
        });
    }

    try {
        const updateUserTrue = await User.findByIdAndUpdate(id,
            { $set: { name, profilePic } }
        );
        return res.status(200).json({
            ok: true,
            updateUserTrue
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            mensaje: 'error en el servidor'
        });
    };
};

// comprobar administrador
const deleteUserById = async (req, res) => {

    console.log("peticion recibida :");
    console.log(req.body);
    console.log();

    let users = await User.find({});
    const { id } = req.params;

    const userToken = await User.find({id: req.id})

    if (!userToken.admin) {
        return res.status(401).json({
            ok: false,
            mensaje: 'Sin permiso de administrador'
        });
    };

    const deleteUser = users.find(user => user.id === id);
    if (!deleteUser) {
        return res.status(204).json({
            ok: false,
            mensaje: 'user no encontrado'
        });
    }

    try {
        //await deleteUser.delete()
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
    };
};

module.exports = {
    reToken,
    logIn,
    singIn, 
    listAllUsers, 
    listUserById, 
    updateUserById, 
    deleteUserById
}