const { Schema, model } = require('mongoose');

const EstudianteSchema = Schema({
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
    img: {
        type: String,
    },
    facultad:{
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Facultad'
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
}, { collection: 'estudiantes' });

EstudianteSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();

    return object;
})

module.exports = model('Estudiante', EstudianteSchema);