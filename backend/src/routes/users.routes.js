import { Router } from 'express';
import { getMe, updateMe } from '../controllers/user.controller.js';
import { authRequired } from '../middlewares/validateToken.js';
import { authOptional } from '../middlewares/authOptional.js';
import {validateSchema} from '../middlewares/validateSchema.js'
import { updateUserSchema } from '../schemas/user.schemas.js'

const router = Router();

//obtener perfil del usuario actual (optional - sin error si no hay token)
router.get('/mi-cuenta', authOptional, getMe);

//actualizar perfil del usuario actual (requiere autenticación)
router.put('/mi-cuenta', authRequired, validateSchema(updateUserSchema), updateMe);

export default router;