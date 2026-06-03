import { createAccessToken } from '../libs/jwt.js';
import Usuario from '../models/user.models.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

// Configuración reutilizable para cookies
const cookieOptions = () => {
    const isProduction = process.env.ENVIRONMENT === 'production';

    return {
        httpOnly: true,
        sameSite: isProduction ? 'none' : 'lax',
        secure: isProduction,
    };
};

// funcion para validar el token de inicio de sesion
export const verifyToken = async (req, res) => {
    const { token } = req.cookies;

    if (!token)
        return res.status(400).json({ message: ['No autorizado'] });

    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if (err)
            return res.status(400).json({ message: ['No autorizado'] });

        const userFound = await Usuario.findById(user.id);

        if (!userFound)
            return res.status(401).json({ message: ['No autorizado'] });

        const userResponse = {
            id: userFound._id,
            nombre: userFound.nombre,
            email: userFound.email,
            rol: userFound.rol,
        };

        return res.json(userResponse);
    });
};

// funcion para registrar usuarios
export const register = async (req, res) => {
    const { nombre, email, password } = req.body;

    try {
        const userFound = await Usuario.findOne({ email });

        if (userFound)
            return res.status(400).json({ message: ['El email ya está registrado'] });

        const passwordHash = await bcryptjs.hash(password, 10);

        const newUser = new Usuario({
            nombre,
            email,
            password: passwordHash,
            rol: 'cliente',
        });

        const userSaved = await newUser.save();

        const token = await createAccessToken({
            id: userSaved._id,
            rol: userSaved.rol,
        });

        res.cookie('token', token, cookieOptions());

        res.json({
            id: userSaved._id,
            nombre: userSaved.nombre,
            email: userSaved.email,
            rol: userSaved.rol,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: ['Error al registrar usuario'] });
    }
};

// funcion para iniciar sesion
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userFound = await Usuario.findOne({ email });

        if (!userFound)
            return res.status(400).json({ message: ['Usuario no encontrado'] });

        const isMatch = await bcryptjs.compare(password, userFound.password);

        if (!isMatch)
            return res.status(400).json({ message: ['Password no coincide'] });

        const token = await createAccessToken({
            id: userFound._id,
            rol: userFound.rol,
        });

        res.cookie('token', token, cookieOptions());

        res.json({
            id: userFound._id,
            nombre: userFound.nombre,
            email: userFound.email,
            rol: userFound.rol,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: ['Error al iniciar sesion'] });
    }
};

// funcion para cerrar una sesion de usuario
export const logout = (req, res) => {
    res.cookie('token', '', {
        ...cookieOptions(),
        expires: new Date(0),
    });

    return res.status(200).json({ message: ['Sesion Finalizada'] });
};

// funcion para visualizar el perfil del usuario
export const me = async (req, res) => {
    const userFound = await Usuario.findById(req.user.id);

    if (!userFound)
        return res.status(400).json({ message: ['Usuario no encontrado'] });

    return res.json({
        id: userFound._id,
        nombre: userFound.nombre,
        email: userFound.email,
        rol: userFound.rol,
        fecha_creacion: userFound.fecha_creacion,
    });
};