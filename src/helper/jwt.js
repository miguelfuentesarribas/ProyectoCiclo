const jwt = require('jsonwebtoken')

const generateJWT = (id, name) => {
    return new Promise((resolve, reject) => {
        const payload = {id, name}
        jwt.sign( payload, process.env.SECRET_KEY_JWT, { expiresIn : '1h' },
        (err, token) => {
            if (err) {
                console.log(err);
                reject('No se puede generar el token')
            }
            resolve( token )
        })
    }) 
}

module.exports = { generateJWT }
