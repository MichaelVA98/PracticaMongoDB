const fs = require('fs'); // para el manejo del sistema de archivos

const Usuario = require('../models/usuario.model');

const borrarImagen = (path) => {
    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
    }
}

const actualizarImagen = async(coleccion, id, nombreArchivo) => {
    let pathViejo = '';
    switch (coleccion) {
        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if (!usuario) {
                console.log(' No se encontró id del usuario');
                return false;
            }
            pathViejo = `./uploads/usuarios/${usuario.img}`;
            borrarImagen(pathViejo);
            usuario.img = nombreArchivo;
            await usuario.save();
            return true;

            break;
        case 'libro':
            const libros = await Libro.findById(id);
            if(!libro){
                console.log('Id de libro no encontrado');
                return false;
            }
            pathViejo = `./uploads/libros/${estudiante.img}`;
            borrarImagen(pathViejo);
            //grabando path de la nueva imagen
            libro.img = nombreArchivo;
            await libro.save();
            return true;
        break;

        default:
            break;
            
    }
}

module.exports = {
    actualizarImagen
}