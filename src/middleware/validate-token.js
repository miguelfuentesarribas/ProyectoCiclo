const { response } = require('express')
const jwt = require('jsonwebtoken')

const validateJWT = (req, res = response , next) => {

    const token = req.header('x-token')
    if (!token) {
        return res.status(401).json({
            ok: 'false',
            mensaje: 'No hay token de autorizacion'
        })
    }

    //validacion
    try {
        const {id, nombre} = jwt.verify(token, process.env.SECRET_KEY_JWT)
        req.id = id
        req.nombre = nombre
    } catch (error) {
        return res.status(401).json({
            ok: 'false',
            mensaje: 'token no valido'
        })
    }
    next()
}

module.exports = { validateJWT }
