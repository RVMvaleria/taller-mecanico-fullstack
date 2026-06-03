import mongoose from 'mongoose';

const motorSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    desplazamiento: {
        type: Number,
        required: true
    }
});

export default mongoose.model('Motor', motorSchema);