import { Router } from 'express';
import { createMotor, getMotores } from '../controllers/motor.controller.js';

import { authRequired } from '../middlewares/validateToken.js';
import { isAdmin } from '../middlewares/isAdmin.js';
import { validateSchema } from '../middlewares/validateSchema.js';

import { createMotorSchema } from '../schemas/motor.schemas.js';

const router = Router();

//obtener motores (puede ser público)
router.get('/', getMotores);

//crear motor (solo admin + validación)
router.post(
    '/',
    authRequired,
    isAdmin,
    validateSchema(createMotorSchema),
    createMotor
);

export default router;