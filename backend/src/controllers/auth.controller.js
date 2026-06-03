import { createAccessToken } from '../libs/jwt.js';
import Usuario from '../models/user.models.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

//funcion para validar el token de inicio de sesion
export const verifyToken = async (req,res)=>{
    const { token } = req.cookies;
    if(!token)
        return res.status(400).json({message: ['No autorizado']})
    jwt.verify(token, TOKEN_SECRET, async(err, user)=>{
        if(err)//hay error al validar el token
        return res.status(400).json({message: ['No autorizado']})
        const userFound = await User.findById(user.id);
        if(!userFound) //si no se encuentra el usuario que viene en el token
        return res.status(401).json({message:['No autorizado']})
        //validar el rol del usuario
        const role = Role.findById(userFound.role);
        if(!role) //no se encuentra el rol del usuario en la bd
        return res.status(401).jsoN({message: ['No autorizado, el rol no está definido']});
        const userResponse = {
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            role: userFound.role
        };
        return res.json(userResponse);
    });//fin de jwt.verify(token)
};//fin de verifyToken

//funcion para registrar usuarios
export const register = async (req, res) => {
    const { nombre, email, password } = req.body;

    try {
        //validar que el email no este registrado en la base de datos
        const userFound = await Usuario.findOne({ email });
        if (userFound) //id se encuentra en este email registrado en la db
            return res.status(400).json({ message: ['El email ya está registrado'] })

        const passwordHash = await bcryptjs.hash(password, 10);

        const newUser = new Usuario({
            nombre,
            email,
            password: passwordHash,
            rol: 'cliente' //para que por default sea cliente
        });

        const userSaved = await newUser.save()

        //const token = await createAccessToken({ id: userSaved._id })
        const token = await createAccessToken({
            id: userSaved._id,
            rol: userSaved.rol
        })

        if (process.env.ENVIRONMENT == 'local') {
            res.cookie('token', token, {
                sameSite: 'lax', //para que el back y el front esten locales
            });
        } else {
            //el back y el front se encuentran en distintos servidores y tienen q compatir la cookie entre ellos
            res.cookie('token', token, {
                sameSite: 'none', //para peticiones remotas
                secure: false,
            });
        }; //fin de if(process.env)

        res.json({
            id: userSaved._id,
            nombre: userSaved.nombre,
            email: userSaved.email,
            rol: userSaved.rol
        });

    } catch (error) {
        res.status(400).json({ message: ['Error al registrar usuario'] })
        console.log(error)
    }
}; //fin de register
//funcion para iniciar sesion
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        //buscamos el email en la bd
        const userFound = await Usuario.findOne({ email });
        if (!userFound) // no se encontro en la base de datos
            return res.status(400)
                .json({ message: ['Usuario no encontrado'] });
        //comparamos el password que envio el usuario con el de la db
        const isMatch = await bcryptjs.compare(password, userFound.password);
        if (!isMatch) //no coinciden
            return res.status(400).json({ message: ["Password no coincide"] });
        //const token = await createAccessToken({ id: userFound._id })
        const token = await createAccessToken({ 
            id: userFound._id,
            rol: userFound.rol
        })
        if (process.env.ENVIRONMENT == 'local') {
            res.cookie('token', token, {
                sameSite: 'lax',
            });
        } else {
            res.cookie('token', token, {
                sameSite: 'none',
                secure: false,
            });
        };
        res.json({
            id: userFound._id,
            nombre: userFound.nombre,
            email: userFound.email,
            rol: userFound.rol
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: ['Error al iniciar sesion'] })
    }
}// fin de login
//funcion para cerrar una sesion de usuario
export const logout = (req, res) => {
    res.cookie("token", "", {
        expires: new Date(0)
    })
    return res.status(200)
        .json({ message: ["Sesion Finalizada"] });
}//fin de logout
//funcion para visualizr el perfil del usuario
export const me = async (req, res) => {
    const userFound = await Usuario.findById(req.user.id);

    if (!userFound) //no se encontro el id en la base de datos
        return res.status(400).json({ message: ["Usuario no encontrado"] });

    return res.json({
        id: userFound._id,
        nombre: userFound.nombre,
        email: userFound.email,
        rol: userFound.rol,
        fecha_creacion: userFound.fecha_creacion
    })
}