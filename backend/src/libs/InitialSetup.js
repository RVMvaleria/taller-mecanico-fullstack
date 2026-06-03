import Usuario from '../models/user.models.js';
import bcryptjs from 'bcryptjs';
import dotenv from 'dotenv';
import { connectDB } from '../db.js';

export const initializeSetup = async()=>{
    try{
        //configuramos la lectura de variables de entorno
        dotenv.config();

        //nos conectamos a la base de datos
        await connectDB();

        //importamos los datos del usuario admistrador definidos en el .env
        const setupAdminName = process.env.SETUP_ADMIN_NAME;
        const setupPwd = process.env.SETUP_ADMIN_PWD;
        const setupEmail = process.env.SETUP_ADMIN_EMAIL;

        //buscamos si ya existe el usuario admin
        const userAdmin = await Usuario.findOne({email: setupEmail});
        if(userAdmin == null){ //No existe un usuario administrador
            //se crea el usuario admin tomando las variables de ambiente
            console.log("Creando usuario admin");
            const passwordAdmin = await bcryptjs.hash(setupPwd, 10);
            const newUserAdmin = new Usuario({
                nombre: setupAdminName,
                email: setupEmail,
                password: passwordAdmin,
                rol: 'admin'
            });
            await newUserAdmin.save();
            console.log("Usuario admin inicializado")
        }//fin de if(userAdmin == null)
    } catch (error){
        console.log(error);
        console.log("Error al inicializar el usuario admin");
    }
}; //fin de initializeSetup

initializeSetup();