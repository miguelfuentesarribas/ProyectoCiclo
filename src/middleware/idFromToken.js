const jwt = require("jsonwebtoken")

const getId = (req, res, next) => {
    const token  = req.header('x-token');
    // devuelve el objeto entero que comparte el token
    try {
        const {id} = jwt.verify(token, process.env.SECRET_KEY_JWT);
        req.id = id;
    } catch (error) {
        console.error(error);
    }
    next();
}

module.exports = getId