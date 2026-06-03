import { z } from 'zod';

export const updateUserSchema = z.object({
    nombre: z.string().min(3, 'Nombre debe tener al menos 3 caracteres').optional(),
    email: z.string().email('Email inválido').optional()
});