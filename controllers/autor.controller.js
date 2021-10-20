const { response } = require('express');
const Autor = require('../models/autor.model');

const getAutores = async(req, res = response) => {

    const autores = await autor.find()
        .populate('usuario', 'nombre email');
    res.json({
        ok: true,
        Autores
    });
}
const crearAutor = async(req, res = response) => {
    const uid = req.uid;

    const autor = new Autor({
        usuario: uid,
        ...req.body
    });

    try {

        const bautorDB = await autor.save();
        res.json({
            ok: true,
            autor: autoroDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({

            ok: false,
            msg: 'Error al grabar Autor, consulte con el administrador'
        });
    }


}
const actualizarAutor = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const autor = await Autor.findById(id);
        if (!autor) {
            return res.status(404).json({
                ok: true,
                msg: 'Autor no encontrado por Id'

            });
        }

        const cambiosAutor = {
            ...req.body,
            usuario: uid
        }

        const autorActualizado = await Autor.findByIdAndUpdate(id, cambiosAutor, { new: true });

        return res.json({
            ok: true,
            autor: autorActualizado

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No se puede actualizar Autor, consulte con el administrador'
        });
    }


}
const eliminarAutor = async(req, res = response) => {
    const id = req.params.id;

    try {

        const autor = await Autor.findById(id);
        if (!autor) {
            return res.status(404).json({
                ok: true,
                msg: 'Autor no encontrado por id'

            });
        }

        await Autor.findByIdAndDelete(id);
        return res.json({
            ok: true,
            msg: 'Autor Eliminado'

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No es posible eliminar Autor consulte con el administrador'
        });
    }
}


module.exports = {
    getAutores,
    crearAutor,
    actualizarAutor,
    eliminarAutor
}