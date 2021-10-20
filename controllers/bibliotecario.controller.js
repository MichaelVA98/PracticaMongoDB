const { response } = require('express');
const Bibliotecario = require('../models/bibliotecario.model');

const getBibliotecarios= async(req, res = response) => {

    const bibliotecarios = await bibliotecario.find()
        .populate('usuario', 'nombre email img')
        .populate('prestamo', 'fecha_prestamo fecha_devolucion')
        .populate('facultad', 'nombre')
    res.json({
        ok: true,
        Bibliotecarios
    });
}
const crearBibliotecario = async(req, res = response) => {
    const uid = req.uid;

    const bibliotecario = new Bibliotecario({
        usuario: uid,
        ...req.body
    });

    try {

        const bibliotecarioDB = await bibliotecario.save();
        res.json({
            ok: true,
            bibliotecario: bibliotecarioDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({

            ok: false,
            msg: 'Error al grabar Bibliotecario, consulte con el administrador'
        });
    }


}
const actualizarBibliotecario = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const bibliotecario = await Cliente.findById(id);
        if (!bibliotecario) {
            return res.status(404).json({
                ok: true,
                msg: 'Bibliotecario no encontrado por Id'

            });
        }

        const cambiosBibliotecario = {
            ...req.body,
            usuario: uid
        }

        const bibliotecarioActualizado = await Bibliotecario.findByIdAndUpdate(id, cambiosBibliotecario, { new: true });

        return res.json({
            ok: true,
            bibliotecario: bibliotecarioActualizado

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No se puede actualizar Bibliotecario, consulte con el administrador'
        });
    }


}
const eliminarBibliotecario = async(req, res = response) => {
    const id = req.params.id;

    try {

        const bibliotecario = await Bibliotecario.findById(id);
        if (!bibliotecario) {
            return res.status(404).json({
                ok: true,
                msg: 'Bibliotecario no encontrado por id'

            });
        }

        await Bibliotecario.findByIdAndDelete(id);
        return res.json({
            ok: true,
            msg: 'Bibliotecario Eliminado'

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No es posible eliminar bibliotecario consulte con el administrador'
        });
    }
}


module.exports = {
    getBibliotecarios,
    crearBibliotecario,
    actualizarBibliotecario,
    eliminarBibliotecario
}