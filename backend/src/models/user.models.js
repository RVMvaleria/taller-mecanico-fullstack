import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        enum: ['admin', 'cliente'],
        default: 'cliente',
        required: true
    },
    fecha_creacion: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Usuario', userSchema);