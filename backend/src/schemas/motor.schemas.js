import { z } from 'zod';

export const createMotorSchema = z.object({
    nombre: z.string('Nombre requerido')
    .min(1, {
        error: 'El nombre es requerido'
    })
    .max(50, {
        error: 'El nombre no puede exceder 50 caracteres'
    }),

    desplazamiento: z.number({
        required_error: 'Desplazamiento requerido',
        invalid_type_error: 'El desplazamiento debe ser un número'
    })
    .min(0.1, {
        error: 'El desplazamiento debe ser mayor a 0'
    })
    .max(10, {
        error: 'El desplazamiento es demasiado alto'
    })
});