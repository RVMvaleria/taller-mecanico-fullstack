import {z} from 'zod';

export const registerSchema = z.object({
    nombre: z.string('Nombre requerido')
    .min(2, {
        error: 'El nombre debe tener al menos 2 caracteres'
    }),
    email: z.email({
        error: (email)=> email.input === undefined 
        ? "Email es requerido"
        : "Formato de Email incorrecto"
    }),
    password: z.string('Contraseña requerida')
    .min(6, {
        error:'El password debe tener al menos 6 caracteres'
    })
})//fin de registerSchema




export const loginSchema = z.object({
    email: z.email({
        error: (email)=> email.input === undefined 
        ? "Email es requerido"
        : "Formato de Email incorrecto"
    }),
    password: z.string('Contraseña requerida')
    .min(6, {
        error:'El password debe tener al menos 6 caracteres'
    })
})//fin de loginSchema


//npm install cors, npm install zod