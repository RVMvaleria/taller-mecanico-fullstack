import { z } from 'zod';

export const createServicioSchema = z.object({
    nombre: z.string('Nombre requerido').min(1, 'Nombre no puede estar vacío'),
    costo_base: z.number('Costo base requerido').min(0, 'Costo base debe ser positivo'),
    es_comun: z.boolean().optional()
});