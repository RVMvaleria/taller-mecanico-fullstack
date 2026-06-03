import Usuario from '../models/user.models.js';

//obtener perfil del usuario actual
export const getMe = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(200).json(null);
        }
        
        const user = await Usuario.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuario' });
    }
};

//actualizar perfil del usuario actual
export const updateMe = async (req, res) => {
    const { nombre, email } = req.body;
    try {
        const user = await Usuario.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        //verificar si el email ya existe en otro usuario
        if (email && email !== user.email) {
            const existingUser = await Usuario.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'El email ya está en uso' });
            }
        }

        user.nombre = nombre || user.nombre;
        user.email = email || user.email;

        await user.save();

        res.json({
            id: user._id,
            nombre: user.nombre,
            email: user.email,
            rol: user.rol,
            fecha_creacion: user.fecha_creacion
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar usuario' });
    }
};