/*
    Path: /api/bibliotecario
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const {
    getBibliotecarios,
    crearBibliotecario,
    actualizarBibliotecario,
    eliminarBibliotecario,

} = require('../controllers/bibliotecario.controller');

const router = Router();

router.get('/', validarJWT, getBibliotecarios);
router.post('/', [
        check('nombre', 'El nombre del bibliotecario es necesario').not().isEmpty(),
        check('apellido', 'El apellido del bibliotecario es obligatorio').not().isEmpty(),
        check('email', 'El email del bibliotecario es incorrecto').isEmail(),
        validarCampos,
    ],
    crearBibliotecario 
);
router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre del bibliotecario es obligatorio').not().isEmpty(),
        check('apellido', 'El apellido del bibliotecario es obligatorio').not().isEmpty(),
        check('email', 'El nombre del bibliotecario es obligatorio').isEmail(),
        validarCampos,
    ],
    actualizarBibliotecario
);
router.delete('/:id', validarJWT, eliminarBibliotecario);

module.exports = router;