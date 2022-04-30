const {response} = require('express');
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
        await user.save();
        return res.json({
            ok: true,
            mensaje: "registro",
            name: user.name,
            email: user.email,
            rol: "no admin",
            imagen: "por defecto"
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            mensaje: 'error en el servidor'
        });
    }
}

module.exports = { singIn }