/*
    Libro
    ruta: '/apiLibro'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getLibros, 
    crearLibro,
    actualizarLibro,
    eliminarLibro,
    buscarLibro
} = require('../controllers/libros.controller')


const router = Router();

router.get( '/', getLibros );

router.post( '/',
    [
        validarJWT,
        check('libro','El título del libro es obligatorio').not().isEmpty(),
        check('autor','El Autor del libro es obligatorio').not().isEmpty(),
        check('prestamo','El id del prestamo debe de ser válido').isMongoId(),
        validarCampos
    ], 
    crearLibro
);

router.put( '/:id',
    [
        validarJWT,
        check('libro','El título del libro es obligatorio').not().isEmpty(),
        check('autor','El Autor del libro es obligatorio').not().isEmpty(),
        check('prestamo','El id del prestamo debe de ser válido').isMongoId(),
        validarCampos
    ],
    actualizarLibro
);
router.delete( '/:id',
    validarJWT,
    eliminarLibro
);

router.get('/:idusuario/prestamo/:idprestamo/:idautor',[
    validarJWT,
    check('usuario', 'El id del usuario no es valido').isMongoId(),
    check('prestamo', 'El id de prestamo no es valido').isMongoId(),
    check('autor', 'El id del autor no es valido').isMongoId(),
    
    ],
    buscarLibro);

module.exports = router;
