const { Schema, model } = require('mongoose');

const BibliotecarioSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    direccion:{
        type: String
    },
    img: {
        type: String,
    },
    role:{
        type: String,
        required: true,
        default: 'USER_ROLE'
    }, 
    google:{
        type: Boolean,
        default: false 
    },
    prestamo: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Prestamo'
    },
    facultad: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Facultad'
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
}, { collection: 'bibliotecarios' });

BibliotecarioSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();

    return object;
})

module.exports = model('Bibliotecario', BibliotecarioSchema);