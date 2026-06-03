import mongoose from 'mongoose';

const servicioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    costo_base: {
        type: Number,
        required: true,
        min: 0
    },
    es_comun: {
        type: Boolean,
        default: true
    }
});

export default mongoose.model('Servicio', servicioSchema);