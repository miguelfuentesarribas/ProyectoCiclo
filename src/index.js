const express = require('express');
const { conect } = require('./database/config');
const userRoutes = require('./routes/user');
const gameRoutes = require('./routes/game');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 9000;

//middleware
app.use(express.json());
app.use('/api', userRoutes, gameRoutes);

//routes
// app.get('/', (req, res) => {
//     res.send("hola a mi API");
// });

//mongodb conexion
conect();

app.listen(PORT, () => console.log('servidor escuchando en el puerto', PORT));
