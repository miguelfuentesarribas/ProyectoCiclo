const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const userRoutes = require('./routes/user')

const app = express();
const PORT = process.env.PORT || 9000;

//middleware
app.use(express.json());
app.use('/api', userRoutes);

//routes
app.get('/', (req, res) => {
    res.send("hola a mi API");
});

//mongodb conexion
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('conectado a db atlas'))
.catch((error) => console.error(error));

app.listen(PORT, () => console.log('servidor escuchando en el puerto', PORT));
