import mongoose from 'mongoose';

const citaSchema = new mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    vehiculo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehiculo',
        required: true
    },
    servicio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Servicio',
        required: false
    },
    descripcion: {
        type: String,
        required: true,
        trim: true
    },
    fecha_hora: {
        type: Date,
        required: true
    },
    estado: {
        type: String,
        enum: ['AGENDADO', 'EN_PROCESO', 'COMPLETADO'],
        default: 'AGENDADO'
    },
    horas_invertidas: {
        type: Number,
        default: 0,
        min: 0
    },
    costo_final: {
        type: Number,
        default: 0,
        min: 0
    }
});

export default mongoose.model('Cita', citaSchema);