import Vehiculo from '../models/vehiculo.models.js';

//obtener vehiculos del usuario actual o todos si es admin
export const getVehiculos = async (req, res) => {
    try {
        let query;
        if (req.user.rol === 'admin') {
            // Admins see all vehicles
            query = Vehiculo.find();
        } else {
            // Regular users see only their own vehicles
            query = Vehiculo.find({ usuario: req.user.id });
        }
        const vehiculos = await query;
        res.json(vehiculos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener vehiculos' });
    }
};

//crear vehiculo para el usuario actual
export const createVehiculo = async (req, res) => {
    const { marca, modelo, motor, anio, vin, placas } = req.body;
    try {
        //verificar si VIN ya existe
        const existingVehiculo = await Vehiculo.findOne({ vin: vin.toUpperCase() });
        if (existingVehiculo) {
            return res.status(400).json({ message: 'El VIN ya está registrado' });
        }

        const newVehiculo = new Vehiculo({
            usuario: req.user.id,
            marca,
            modelo,
            motor,
            anio,
            vin: vin.toUpperCase(),
            placas: placas.toUpperCase()
        });

        const vehiculoSaved = await newVehiculo.save();
        res.status(201).json(vehiculoSaved);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear vehiculo' });
    }
};

//eliminar vehiculo
export const deleteVehiculo = async (req, res) => {
    const { id } = req.params;
    try {
        const vehiculo = await Vehiculo.findById(id);
        if (!vehiculo) {
            return res.status(404).json({ message: 'Vehiculo no encontrado' });
        }

        //para poder verlo, verificar que el vehiculo pertenece al usuario o es admin
        if (vehiculo.usuario.toString() !== req.user.id && req.user.rol !== 'admin') {
            return res.status(403).json({ message: 'No autorizado' });
        }

        await Vehiculo.findByIdAndDelete(id);
        res.json({ message: 'Vehiculo eliminado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar vehiculo' });
    }
};