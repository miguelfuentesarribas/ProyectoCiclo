const userID = require("mongodb").ObjectID


const isId = (req, res, next) => {
    const {id} = req.params;
    if (!userID.isValid(id)){
        return res.status(401).json({
            ok: 'false',
            mensaje: 'No existe usuario con ese id'
        })
    }
    next()
}

module.exports =  {isId};