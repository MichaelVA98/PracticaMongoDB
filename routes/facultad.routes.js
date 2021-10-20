/*
    Facultad
    ruta: '/apifacultad'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getFacultades, 
    crearFacultad,
    actualizarFacultad,
    eliminarFacultad
} = require('../controllers/facultad.controller')


const router = Router();

router.get( '/', getFacultades );

router.post( '/',
    [
        validarJWT,
        check('facultad','El nombre de facultad es necesario').not().isEmpty(),
        validarCampos
    ], 
    crearFacultad
);

router.put( '/:id',
    [
        validarJWT,
        check('facultad','El nombre de facultad es necesario').not().isEmpty(),
        validarCampos
    ],
    actualizarFacultad
);

router.delete( '/:id',
    validarJWT, 
    eliminarFacultad
);

module.exports = router;
