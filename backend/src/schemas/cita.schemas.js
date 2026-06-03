import { z } from 'zod';


//las citas se pueden crear con un servicio a realizar o sin servicio específico
//con servicio
export const createCitaSchema = z.object({
    vehiculo: z.string('Vehículo requerido').regex(/^[0-9a-fA-F]{24}$/, 'ID de vehículo inválido'),
    servicio: z.string().regex(/^[0-9a-fA-F]{24}$/, 'ID de servicio inválido').optional(),
    descripcion: z.string('Descripción requerida').min(1, 'Descripción no puede estar vacía'),
    fecha_hora: z.string('Fecha y hora requeridas').refine((val) => !isNaN(Date.parse(val)), 'Fecha inválida')
});


// sin servicio
export const updateCitaSchema = z.object({
    estado: z.enum(['AGENDADO', 'EN_PROCESO', 'COMPLETADO']).optional(),
    horas_invertidas: z.number().min(0, 'Horas invertidas deben ser positivas').optional(),
    costo_final: z.number().min(0, 'Costo final debe ser positivo').optional()
});