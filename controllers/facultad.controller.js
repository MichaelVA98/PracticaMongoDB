const { response } = require('express');
const Facultad  = require('../models/facultad.model');

const getFacultades = async(req, res = response) => {

    const facultad= await Facultad.find().populate('usuario', 'nombre img');
    res.json({
        ok: true,
        facultades 
    });
}
const crearFacultad = async(req, res = response) => {
    const uid = req.uid;

    const facultad = new Facultad({
        usuario: uid,
        ...req.body
    });

    try {

        const facultadDB = await facultad.save();
        res.json({
            ok: true,
            facultad: facultadDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({

            ok: false,
            msg: 'Error al grabar facultad, consulte con el administrador'
        });
    }


}
const actualizarFacultad = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const facultad = await Facultad.findById(id);
        if (!facultad) {
            return res.status(404).json({
                ok: true,
                msg: 'Facultad no encontrado por id'

            });
        }

        const cambiosFacultad = {
            ...req.body,
            usuario: uid
        }

        const facultadActualizado = await Agencia.findByIdAndUpdate(id, cambiosFacultad, { new: true });

        return res.json({
            ok: true,
            facultad: facultadActualizado

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No se puede actualizar facultad, consulte con el administrador'
        });
    }


}
const eliminarFacultad = async(req, res = response) => {
    const id = req.params.id;

    try {

        const facultad = await Facultad.findById(id);
        if (!facultad) {
            return res.status(404).json({
                ok: true,
                msg: 'Facultad no encontrado por id'

            });
        }

        await Facultad.findByIdAndDelete(id);
        return res.json({
            ok: true,
            msg: 'Facultad Eliminada'

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No es posible eliminar facultad, consulte con el administrador'
        });
    }
}

module.exports = {
    getFacultades,
    crearFacultad,
    actualizarFacultad,
    eliminarFacultad
}