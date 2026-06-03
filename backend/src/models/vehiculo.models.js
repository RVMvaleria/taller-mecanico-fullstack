import mongoose from 'mongoose';

const vehiculoSchema = new mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    marca: {
        type: String,
        required: true,
        trim: true
    },
    modelo: {
        type: String,
        required: true,
        trim: true
    },
    motor: {
        type: String,
        required: true,
        trim: true
    },
    anio: {
        type: Number,
        required: true,
        min: 1900,
        max: new Date().getFullYear() + 1
    },
    vin: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        uppercase: true
    },
    placas: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    }
});

export default mongoose.model('Vehiculo', vehiculoSchema);