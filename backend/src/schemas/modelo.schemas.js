import { z } from 'zod';

export const createModeloSchema = z.object({
    nombre: z.string('Nombre requerido')
    .min(1, {
        error: 'El nombre es requerido'
    })
    .max(50, {
        error: 'El nombre no puede exceder 50 caracteres'
    }),

    marca: z.string('Marca requerida')
    .regex(/^[0-9a-fA-F]{24}$/, {
        error: 'ID de marca inválido'
    })
});