const { response } = require('express');
const Libro = require('../models/libros.model');

const getLibros = async(req, res = response) => {

    const libros= await Libro.find()
        .populate('usuario', 'nombre email img')
        .populate('prestamo', 'fecha_prestamo fecha_devolucion')
        .populate('autor', 'nombre apellido nacionalidad')

    res.json({
        ok: true,
        libros
    });
}
const crearLibro = async(req, res = response) => {
    const uid = req.uid;

    const libro = new Libro({
        usuario: uid,
        ...req.body
    });

    try {

        const libroDB = await libro.save();
        res.json({
            ok: true,
            libro: libroDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({

            ok: false,
            msg: 'Error al grabar libro, consulte con el administrador'
        });
    }


}
const actualizarLibro = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const libro = await Libro.findById(id);
        if (!libro) {
            return res.status(404).json({
                ok: true,
                msg: 'Libro no encontrado por id'

            });
        }

        const cambiosLibro = {
            ...req.body,
            usuario: uid
        }

        const libroActualizado = await Libro.findByIdAndUpdate(id, cambiosLibro, { new: true });

        return res.json({
            ok: true,
            libro: libroActualizado

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No se puede actualizar el libro, consulte con el administrador'
        });
    }


}
//Servira para realizar la consulta que soporte 3 parámetros
const buscarLibro = async(req,res=response) =>{

    const idusuario = req.params.idusuario;
    const idprestamo = req.params.idprestamo;
    const idautor = req.params.idautor;
 
    try {
        
        const libroDisponible = await Libro.find({idusuario,idprestamo,idautor});

        if(!libroDisponible){
            return res.status(400).json({
                ok: false,
                msg: 'No se pudo encontrar el libro buscado'
            });
        }

        res.json({
            ok:true,
            libro:existeLibro
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error inesperado, el libro no se pudo encontrar'
        })
    }
}
const eliminarLibro = async(req, res = response) => {
    const id = req.params.id;

    try {

        const libro = await Libro.findById(id);
        if (!libro) {
            return res.status(404).json({
                ok: true,
                msg: 'Libro no encontrado por id'

            });
        }

        await Libro.findByIdAndDelete(id);
        return res.json({
            ok: true,
            msg: 'Libro Eliminado'

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No es posible eliminar el libro, consulte con el administrador'
        });
    }
}

module.exports = {
    getLibros,
    crearLibro,
    actualizarLibro,
    eliminarLibro,
    buscarLibro
}