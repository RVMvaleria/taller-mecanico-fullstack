import { Router } from 'express';
import { login, register, logout } from '../controllers/auth.controller.js';
import {validateSchema} from '../middlewares/validateSchema.js'
import { loginSchema, registerSchema } from '../schemas/auth.schemas.js'

//router redirecciona a la funcion de la ruta solicitada
const router = Router();

//registro de usuarios
router.post('/register', validateSchema(registerSchema), register);

//iniciar sesion
router.post('/login', validateSchema(loginSchema), login);

//cerrar sesion
router.post('/logout', logout);

export default router;