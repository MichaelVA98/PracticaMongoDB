const { Schema, model } = require('mongoose');

const LibroSchema = Schema({
    titulo: {
        type: String,
        required: true
    },
    editorial: {
        type: String
    },
    paginas:{
        type: Number,      
    },
    fecha_publicacion: {
        type: Date
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    prestamo:{
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Prestamo'
    },
    autor:{
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Autor'
    }
}, { collection: 'libros' });


LibroSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();

    return object;

})

module.exports = model('Libro', LibroSchema);