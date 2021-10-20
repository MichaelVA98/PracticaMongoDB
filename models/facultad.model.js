const { Schema, model } = require('mongoose');

const FacultadSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
}, { collection: 'facultades' });

FacultadSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();

    return object;
})

module.exports = model('Facultad', FacultadSchema);