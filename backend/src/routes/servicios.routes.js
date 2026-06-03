import { Router } from 'express';
import { getServicios, createServicio, getServiciosComunes } from '../controllers/servicio.controller.js';
import { authRequired } from '../middlewares/validateToken.js';
import { isAdmin } from '../middlewares/isAdmin.js';
import {validateSchema} from '../middlewares/validateSchema.js'
import { createServicioSchema } from '../schemas/servicio.schemas.js'

const router = Router();

//ruta pública para obtener servicios comunes
router.get('/comunes', getServiciosComunes);

//para los servicios todas las rutas requieren autenticación
router.use(authRequired);

//obtener los servicios
router.get('/', getServicios);

//crear servicio (solo admin ppuede)
router.post('/', validateSchema(createServicioSchema), isAdmin, createServicio);

export default router;