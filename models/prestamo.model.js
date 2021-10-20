const { Schema, model } = require('mongoose');

//Definicion de las colecciones en mongoose (definicion del esquema de bd)
const PrestamoSchema = Schema({
   
    fecha_prestamo: {
        type: Date,
        required: true
    },
    fecha_devolucion: {
        type: Date,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    estudiante: {
        type: Schema.Types.ObjectId,
        ref: 'Estudiante',
        required: true
    },
    bibliotecario: {
        type: Schema.Types.ObjectId,
        ref: 'Bibliotecario',
        required: true
    },
    libro: {
        type: Schema.Types.ObjectId,
        ref: 'Libro',
        required: true
    }
}, { collection: 'prestamos' }); 


PrestamoSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();

    return object;

})

module.exports = model('Prestamo', PrestamoSchema);