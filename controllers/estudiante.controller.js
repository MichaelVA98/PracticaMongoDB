const { response } = require('express');
const Estudiante = require('../models/estudiante.model');

const getEstudiantes = async(req, res = response) => {

    const clientes = await Estudiante.find()
        .populate('usuario', 'nombre email img')
        .populate('facultad', 'nombre')
    res.json({
        ok: true,
        estudiantes
    });
}
const crearEstudiante = async(req, res = response) => {
    const uid = req.uid;

    const estudiante = new Estudiante({
        usuario: uid,
        ...req.body
    });

    try {

        const estudianteDB = await estudiante.save();
        res.json({
            ok: true,
            estudiante: estudianteDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({

            ok: false,
            msg: 'Error al grabar estudiante, consulte con el administrador'
        });
    }


}
const actualizarEstudiante = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const estudiante = await Estudiante.findById(id);
        if (!estudiante) {
            return res.status(404).json({
                ok: true,
                msg: 'Estudiante no encontrado por id'

            });
        }

        const cambiosEstudiante = {
            ...req.body,
            usuario: uid
        }

        const estudianteActualizado = await Estudiante.findByIdAndUpdate(id, cambiosEstudiante, { new: true });

        return res.json({
            ok: true,
            estudiante: estudianteActualizado

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No se puede actualizar el estudiante, consulte con el administrador'
        });
    }


}
const eliminarEstudiante = async(req, res = response) => {
    const id = req.params.id;

    try {

        const estudiante = await Estudiante.findById(id);
        if (!estudiante) {
            return res.status(404).json({
                ok: true,
                msg: 'Estudiante no encontrado por id'

            });
        }

        await Estudiante.findByIdAndDelete(id);
        return res.json({
            ok: true,
            msg: 'Estudiante Eliminado'

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No es posible eliminar el estudiante, consulte con el administrador'
        });
    }
}


module.exports = {
    getEstudiantes,
    crearEstudiante,
    actualizarEstudiante,
    eliminarEstudiante
}