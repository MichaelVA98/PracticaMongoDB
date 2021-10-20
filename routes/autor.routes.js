/*
    cautor
    ruta: '/api/autor'
*/

const { Router } = require('express');
const { check } = require('express-validator');


const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getAutores,
    crearAutor,
    actualizarAutor,
    eliminarAutor

} = require('../controllers/autor.controller');

const router = Router();

router.get('/', validarJWT, getAutores)
router.post('/', [
        validarJWT,
        check('nombre', 'El nombre del autor es obligatorio').not().isEmpty(),
        check('apellido', 'El apellido del autor es obligatorio').not().isEmpty(),
        check('Nacionalidad', 'La nacionalidad es obligatoria').not().isEmpty(),
        validarCampos
    ],
    crearAutor
);
router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre del autor es obligatorio').not().isEmpty(),
        check('apellido', 'El apellido del autor es obligatorio').not().isEmpty(),
        check('Nacionalidad', 'La nacionalidad es obligatorioa').not().isEmpty(),
        validarCampos
    ],
    actualizarAutor
);
router.delete('/:id',
    validarJWT,
    eliminarAutor
);
module.exports = router;