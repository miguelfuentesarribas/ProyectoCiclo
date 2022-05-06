const mongoose = require('mongoose')

const conect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)    
        console.log("conectado a la base de datos");
    } catch (error) {
        console.log(error);
        throw Error('error conectando a la base de datos')
    }
    
}

module.exports = { conect }
