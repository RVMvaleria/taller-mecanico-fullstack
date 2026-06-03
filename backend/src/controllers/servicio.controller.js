import Servicio from '../models/servicio.models.js';

//obtener todos los servicios
export const getServicios = async (req, res) => {
    try {
        const servicios = await Servicio.find();
        res.json(servicios);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener servicios' });
    }
};

//obtener solo servicios comunes (ruta pública)
export const getServiciosComunes = async (req, res) => {
    try {
        const servicios = await Servicio.find({ es_comun: true });
        res.json(servicios);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener servicios' });
    }
};

//crear servicio (solo admin)
export const createServicio = async (req, res) => {
    const { nombre, costo_base, es_comun } = req.body;
    try {
        //verificar si nombre ya existe
        const existingServicio = await Servicio.findOne({ nombre });
        if (existingServicio) {
            return res.status(400).json({ message: 'El servicio ya existe' });
        }

        const newServicio = new Servicio({
            nombre,
            costo_base,
            es_comun
        });

        const servicioSaved = await newServicio.save();
        res.status(201).json(servicioSaved);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear servicio' });
    }
};