import { Router } from 'express';
import { createModelo, getModelos } from '../controllers/modelo.controller.js';
import { authRequired } from '../middlewares/validateToken.js';
import { isAdmin } from '../middlewares/isAdmin.js';
import { validateSchema } from '../middlewares/validateSchema.js';
import { createModeloSchema } from '../schemas/modelo.schemas.js';

const router = Router();

//obtener modelos (puede ser público)
router.get('/', getModelos);

//crear modelo (solo admin + validación)
router.post(
    '/',
    authRequired,
    isAdmin,
    validateSchema(createModeloSchema),
    createModelo
);

export default router;