/*
    Prestamos
    ruta: '/apiPrestamo'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getPrestamos, 
    crearPrestamo,
    actualizarPrestamo,
    eliminarPrestamo,
    buscarPrestamo
} = require('../controllers/prestamo.controller')


const router = Router();

router.get( '/', getPrestamos );

router.post( '/',
    [
        validarJWT,
        check('fechaPrestamo','La fecha de préstamo del libro es obligatorio').isDate(),
        check('fechaDevolucion','La fecha de devolución del libro es obligatorio').isDate(),
        check('estudiante','El nombre del estudiante es necesario').not().isEmpty(),
        check('bibliotecario','El nombre del bibliotecario es necesario').not().isEmpty(),
        check('libro','El id del libro debe ser válido').isMongoId(),
        validarCampos
    ], 
    crearPrestamo
);

router.put( '/:id',
    [
        validarJWT,
        check('fechaPrestamo','La fecha de préstamo del libro es obligatorio').isDate(),
        check('fechaDevolucion','La fecha de devolución del libro es obligatorio').isDate(),
        check('estudiante','El nombre del estudiante es necesario').not().isEmpty(),
        check('bibliotecario','El nombre del bibliotecario es necesario').not().isEmpty(),
        check('libro','El id del libro debe ser válido').isMongoId(),
        validarCampos
    ],
    actualizarPrestamo
);

router.delete( '/:id',
    validarJWT,
    eliminarPrestamo
);

router.get('/:idusuario/estudiante/:idestudiante/:idlibro/:idautor',[
    validarJWT,
    check('usuario', 'El id del usuario no es valido').isMongoId(),
    check('estudiante', 'El id del estudiante no es valido').isMongoId(),
    check('bibliotecario', 'El id del bibliotecario no es válido').isMongoId(),
    check('libro', 'El id del libro no es valido').isMongoId(),

    ],
    buscarPrestamo);

module.exports = router;
