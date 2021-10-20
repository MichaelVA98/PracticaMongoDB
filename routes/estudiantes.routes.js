/*
    Estudiantes
    ruta: '/api/estudiantes'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getEstudiantes, 
    crearEstudiante,
    actualizarEstudiante,
    eliminarEstudiante
} = require('../controllers/estudiante.controller')


const router = Router();

router.get( '/', getEstudiantes );

router.post( '/',
    [
        validarJWT,
        check('nombre','El nombre del estudiante es necesario').not().isEmpty(),
        check('apellido', 'El apellido del estudiante es obligatorio').not().isEmpty(),
        check('email','El email del estudiante es incorrecto').isEmail(),
        check('facultad','El nombre de la facultad es necesario').isEmpty(),
        validarCampos
    ], 
    crearEstudiante
);

router.put( '/:id',
    [
        validarJWT,
        check('nombre','El nombre del estudiante es necesario').not().isEmpty(),
        check('apellido', 'El apellido del estudiante es obligatorio').not().isEmpty(),
        check('email','El email del estudiante es incorrecto').isEmail(),
        check('facultad','El nombre de la facultad es necesario').isEmpty(),
        validarCampos
    ],
    actualizarEstudiante
);

router.delete( '/:id',
    validarJWT,
    eliminarEstudiante
);

module.exports = router;
