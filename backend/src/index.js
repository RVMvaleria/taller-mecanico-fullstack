import app from './app.js';
import { connectDB } from './db.js';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import './libs/InitialSetup.js';

// configuramos la lectura de las variables de ambiente
dotenv.config();

console.log(process.env.CLOUDINARY_API_KEY);

// configuracion de cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

connectDB();

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});