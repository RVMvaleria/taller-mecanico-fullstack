import Cita from '../models/cita.models.js';
import Vehiculo from '../models/vehiculo.models.js';
import Servicio from '../models/servicio.models.js';

//crear una cita
export const createCita = async (req, res) => {
    const { vehiculo, servicio, descripcion, fecha_hora } = req.body;
    try {
        //antes, verificar que el vehiculo si pertenece al usuario
        const vehiculoFound = await Vehiculo.findById(vehiculo);
        if (!vehiculoFound || vehiculoFound.usuario.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Vehiculo no encontrado o no autorizado' });
        }

        //verificar servicio si es proporcionado por el taller
        if (servicio) {
            const servicioFound = await Servicio.findById(servicio);
            if (!servicioFound) {
                return res.status(400).json({ message: 'Servicio no encontrado' });
            }
        }

        const newCita = new Cita({
            usuario: req.user.id,
            vehiculo,
            servicio,
            descripcion,
            fecha_hora
        });

        const citaSaved = await newCita.save();
        await citaSaved.populate('vehiculo servicio');
        res.status(201).json(citaSaved);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear cita' });
    }
};

//obtener citas
export const getCitas = async (req, res) => {
    try {
        let citas;
        if (req.user.rol === 'admin') {
            citas = await Cita.find().populate('usuario vehiculo servicio');
        } else {
            citas = await Cita.find({ usuario: req.user.id }).populate('vehiculo servicio');
        }
        //console.log("rol:", req.user.rol); //test
        //console.log("citas:", citas); //test
        res.json(citas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener citas' });
    }
};

//actualizar estado de cita (solo admin)
export const updateCita = async (req, res) => {
    const { id } = req.params;
    const { estado, horas_invertidas, costo_final } = req.body;
    try {
        const cita = await Cita.findById(id);
        if (!cita) {
            return res.status(404).json({ message: 'Cita no encontrada' });
        }

        //solo admin puede actualizar
        if (req.user.rol !== 'admin') {
            return res.status(403).json({ message: 'No autorizado' });
        }

        cita.estado = estado || cita.estado;
        cita.horas_invertidas = horas_invertidas !== undefined ? horas_invertidas : cita.horas_invertidas;
        cita.costo_final = costo_final !== undefined ? costo_final : cita.costo_final;

        await cita.save();
        await cita.populate('usuario vehiculo servicio');
        

        res.json(cita);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar cita' });
    }
};