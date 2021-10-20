//busquedaTotal

const { response } = require("express")

const Usuario = require('../models/usuario.model');
const Autor = require('../models/autor.model');
const Bibliotecario = require('../models/bibliotecario.model');
const Estudiante = require('../models/estudiante.model');
const Facultad= require('../models/facultad.model');
const Libro = require('../models/libros.model');
const Prestamo= require('../models/prestamo.model');


const busquedaTotal = async (req, res=response)=>{

    const busqueda = req.params.busqueda; 
    const miRegExp = new RegExp(busqueda,'i'); //i  insensible

    const [usuarios, autores, bibliotecarios, estudiantes, facultades, libros, prestamos] = await Promise.all ([
        Usuario.find({nombre:miRegExp}), // la busqueda es por nombre
        Autor.find({nombre:miRegExp}),
        Bibliotecario.find({nombre:miRegExp}),
        Estudiante.find({nombre:miRegExp}),
        Facultad.find({nombre:miRegExp}),
        Libro.find({nombre:miRegExp}),
        Prestamo.find({Fecha_prestamo:miRegExp})
    ]);

    res.json({
        ok: true,
        msg: 'busqueda total',
        usuarios, 
        autores,
        bibliotecarios, 
        estudiantes, 
        facultades, 
        libros, 
        prestamos
    });

}

//estructura de la peticion /coleccion/micoleccion/criteriobusqueda
const busquedaColeccion = async (req, res=response)=>{

    const miColeccion = req.params.micoleccion;
    const busqueda = req.params.busqueda; 
    const miRegExp = new RegExp(busqueda,'i'); //i  insensible

    let data = [];

    switch (miColeccion) {
        case 'usuarios':
            data = await Usuario.find({nombre:miRegExp})
                            
            break;
        case 'autores':
            data = await Autor.find({nombre:miRegExp})

            break;    
        case 'bibliotecarios':
            data = await Bibliotecario.find({nombre:miRegExp})
                .populate('usuario', 'nombre email img')
                .populate('prestamo', 'fecha_prestamo fecha_devolucion')
                .populate('facultad', 'nombre')
            break;
        case 'estudiantes':
            data = await Estudiante.find({nombre:miRegExp})
                .populate('usuario', 'nombre email img')
                .populate('facultad', 'nombre')
            break;
        case 'facultades':
            data = await Facultad.find({nombre:miRegExp})
                .populate('usuario', 'nombre img');
            break;
        case 'libros':
            data = await Libro.find({nombre:miRegExp})
                .populate('usuario', 'nombre email img')
                .populate('prestamo', 'fecha_prestamo fecha_devolucion')
                .populate('autor', 'nombre apellido nacionalidad')
            break;
        case 'prestamos':
            data = await Prestamo.find({Fecha_prestamo:miRegExp})
                .populate('usuario', 'nombre email img')
                .populate('estudiante', 'nombre apellido email')
                .populate('bibliotecario', 'nombre apellido email direccion')
                .populate('libro', 'titulo editorial paginas fecha_publicacion')
            break;
        default:
            return res.status(400).json({
                ok: false,
                msg: "La coleccion tiene que ser usuarios/autores/bibliotecarios/estudiantes/facultades/libros/prestamos"
            });
    }
    res.json({
        ok: true,
        resultados: data
    });
    
}

module.exports ={
    busquedaTotal,
    busquedaColeccion
}