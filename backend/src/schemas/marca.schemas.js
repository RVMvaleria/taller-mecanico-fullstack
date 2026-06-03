import { z } from 'zod';

export const createMarcaSchema = z.object({
    nombre: z.string('Nombre requerido')
    .min(2, {
        error: 'El nombre debe tener al menos 2 caracteres'
    })
    .max(50, {
        error: 'El nombre no puede exceder 50 caracteres'
    })
    .regex(/^[a-zA-Z0-9\s]+$/, {
        error: 'El nombre solo puede contener letras, números y espacios'
    })
});