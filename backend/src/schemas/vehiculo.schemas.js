import { z } from 'zod';

export const createVehiculoSchema = z.object({
    marca: z.string('Marca requerida').min(1, 'La marca no puede estar vacía'),
    modelo: z.string('Modelo requerido').min(1, 'El modelo no puede estar vacío'),
    motor: z.string('Motor requerido').min(1, 'El motor no puede estar vacío'),
    anio: z.number('Año requerido').min(1920, 'Año inválido').max(new Date().getFullYear() + 1, 'Año inválido'),//desde 1920 hasta 2027 (actual + 1)
    vin: z.string('VIN requerido').length(17, 'VIN debe tener 17 caracteres').regex(/^[A-HJ-NPR-Z0-9]+$/, 'VIN inválido'), //un VIN válido no debe llavar I, O ni Q
    placas: z.string('Placas requeridas').min(1, 'Las placas son requeridas')
});