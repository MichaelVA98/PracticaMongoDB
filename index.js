const express = require('express'); // de esta forma se importa en node

require ('dotenv').config();
const { dbConection } = require('./config/database');
const cors = require('cors');

//Creando el servidor express
const app = express();

//Configuracion de CORS
app.use(cors());

//Lectura y parseo del body
app.use(express.json());

//Conexion a la BD
dbConection();

//Rutas de la API
app.use('/api/usuarios', require('./routes/usuarios.routes'));
app.use('/api/login', require('./routes/auth.routes'));
app.use('/api/prestamos', require('./routes/prestamos.routes'));
app.use('/api/libros',require('./routes/libros.routes'));
app.use('/api/facultad', require('./routes/facultad.routes'));
app.use('/api/estudiante', require('./routes/facultad.routes'));
app.use('/api/todo', require('./routes/busquedas.routes'));
app.use('/api/bibliotecario', require('./routes/bibliotecario.routes'));
app.use('/api/uploads', require('./routes/uploads.routes'));
app.use('/api/autor', require('./routes/autor.routes'));

//Para levantar el servidor
app.listen(process.env.PORT, ()=>{
    console.log('Servidor corriendo en el puerto ' + process.env.PORT)
})
