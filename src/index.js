const express = require('express');
const { conect } = require('./database/config');
const userRoutes = require('./routes/user');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 9000;

//middleware
app.use(express.json());
app.use('/api', userRoutes);

//routes
// app.get('/', (req, res) => {
//     res.send("hola a mi API");
// });

//mongodb conexion
conect();

app.listen(PORT, () => console.log('servidor escuchando en el puerto', PORT));
