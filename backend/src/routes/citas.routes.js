import { Router } from 'express';
import { createCita, getCitas, updateCita } from '../controllers/cita.controller.js';
import { authRequired } from '../middlewares/validateToken.js';
import { isAdmin } from '../middlewares/isAdmin.js';
import {validateSchema} from '../middlewares/validateSchema.js'
import { createCitaSchema, updateCitaSchema } from '../schemas/cita.schemas.js'

const router = Router();

//todas las rutas requieren autenticación
router.use(authRequired);

//crear cita
router.post('/', validateSchema(createCitaSchema), createCita);

//obtener citas
router.get('/', getCitas);

//actualizar cita, solo el admin puede
router.put('/:id', validateSchema(updateCitaSchema), isAdmin, updateCita);

export default router;