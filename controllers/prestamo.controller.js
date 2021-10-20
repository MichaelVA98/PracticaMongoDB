const { response } = require('express');
const Prestamo = require('../models/prestamo.model');

const getPrestamos = async(req, res = response) => {
    const prestamos = await Prestamo.find()
        .populate('usuario', 'nombre email img')
        .populate('estudiante', 'nombre apellido email')
        .populate('bibliotecario', 'nombre apellido email direccion')
        .populate('libro', 'titulo editorial paginas fecha_publicacion')

    res.json({
        ok: true,
        prestamos
    });
}
const crearPrestamo = async(req, res = response) => {
    const uid = req.uid;

    const prestamo = new Prestamo({
        usuario: uid,
        ...req.body
    });

    try {

        const prestamoDB = await prestamo.save();
        res.json({
            ok: true,
            prestamo: prestamoDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({

            ok: false,
            msg: 'Error al grabar préstamo, consulte con el administrador'
        });
    }
}
const actualizarPrestamo = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const prestamo = await Prestamo.findById(id);
        if (!prestamo) {
            return res.status(404).json({
                ok: true,
                msg: 'Prestamo no encontrado por id'

            });
        }

        const cambiosPrestamo = {
            ...req.body,
            usuario: uid
        }

        const PrestamoActualizado = await Alquiler.findByIdAndUpdate(id, cambiosPrestamo, { new: true });

        return res.json({
            ok: true,
            prestamo: PrestamoActualizado

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No se puede actualizar prestamo, consulte con el administrador'
        });
    }
}
const eliminarPrestamo = async(req, res = response) => {
    const id = req.params.id;

    try {

        const Prestamo = await Prestamo.findById(id);
        if (!prestamo) {
            return res.status(404).json({
                ok: true,
                msg: 'Prestamo no encontrado por id'

            });
        }

        await Prestamo.findByIdAndDelete(id);
        return res.json({
            ok: true,
            msg: 'Prestamo Eliminado'

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Prestamo no puede eliminarse, consulte con el administrador'
        });
    }
}
//Para realizar consulta con 4 parámetros
const buscarPrestamo = async(req,res=response) =>{

    const idusuario = req.params.idusuario;
    const idestudiante = req.params.idestudiante;
    const idbibliotecario = req.params.idbibliotecario;
    const idlibro = req.params.idlibro;

    try {
        

        const PrestamoDisponible = await Prestamo.find({idusuario,idestudiante,idbibliotecario,idlibro});

        if(!PrestamoDisponible){
            return res.status(400).json({
                ok: false,
                msg: 'El prestamo del libro buscado no se encuentra disponible en la BD'
            });
        }

        res.json({
            ok:true,
            prestamo:existePrestamo
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error, no se puede encontrar el prestamo buscado'
        })
    }
}

module.exports = {
    getPrestamos,
    crearPrestamo,
    actualizarPrestamo,
    eliminarPrestamo,
    buscarPrestamo
}