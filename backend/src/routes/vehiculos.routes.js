import { Router } from 'express';
import { getVehiculos, createVehiculo, deleteVehiculo } from '../controllers/vehiculo.controller.js';
import { authRequired } from '../middlewares/validateToken.js';
import {validateSchema} from '../middlewares/validateSchema.js'
import { createVehiculoSchema } from '../schemas/vehiculo.schemas.js'

const router = Router();

//para vehiculos todas las rutas necesitan autenticación
router.use(authRequired);

//obtener vehiculos del usuario
router.get('/', getVehiculos);

//crear un vehiculo
router.post('/', validateSchema(createVehiculoSchema), createVehiculo);

//eliminar vehiculo
router.delete('/:id', deleteVehiculo);

export default router;