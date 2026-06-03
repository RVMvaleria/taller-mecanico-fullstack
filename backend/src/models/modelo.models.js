import mongoose from 'mongoose';

const modeloSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    marca: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Marca',
        required: true
    },
    motores: [{
        motor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Motor',
            required: true
        },
        anio_inicio: {
            type: Number,
            required: true
        },
        anio_fin: {
            type: Number,
            required: true
        }
    }]
});

export default mongoose.model('Modelo', modeloSchema);