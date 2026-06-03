import { Router } from 'express';
import { createMarca, getMarcas } from '../controllers/marca.controller.js';
import { authRequired } from '../middlewares/validateToken.js';
import { isAdmin } from '../middlewares/isAdmin.js';
import { validateSchema } from '../middlewares/validateSchema.js';
import { createMarcaSchema } from '../schemas/marca.schemas.js';


const router = Router();

//obtener marcas
router.get('/', getMarcas);

//crear marca, solo admin y con validacion
router.post(
    '/',
    authRequired,
    isAdmin,
    validateSchema(createMarcaSchema),
    createMarca
);

export default router;