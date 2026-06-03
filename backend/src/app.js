import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';

//configuramos la lecura de variables de ambiente
dotenv.config();

console.log('BackEnd ' , process.env.BASE_URL_BACKEND);

//importamos las rutas para usuarios
import authRoutes from './routes/auth.routes.js'
import usersRoutes from './routes/users.routes.js'
import vehiculosRoutes from './routes/vehiculos.routes.js'
import serviciosRoutes from './routes/servicios.routes.js'
import citasRoutes from './routes/citas.routes.js'

import marcasRoutes from './routes/marcas.routes.js'
import modelosRoutes from './routes/modelos.routes.js'
import motoresRoutes from './routes/motores.routes.js'

const app = express();

//denegar cualquier tipo de framing
app.use((req, res, next) => {
    res.setHeader('x-Frame-Options', 'DENY');
    next();
});

/*app.use(cors({
    credentials: true,
    origin: true
}));*/
//app.use(cors({
  //  credentials: true
//}));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
/*app.use(mongoSanitize({
    replaceWith: '_', //reemplaza caracteres $ con _
    onSanitize: ({req,key})=>{
        console.log('⚠️ Intento de inyeccion detectado: $(key)')
    }
}))*/
app.use(cookieParser());
app.use(cors({
    credentials:true,
    origin: [
        process.env.BASE_URL_BACKEND,
        process.env.BASE_URL_FRONTEND,
    ]
}));
//app.unsubscribe(cors({Credentials.true});
app.use(express.urlencoded( {extended: false}));

//indicamos al servidor que utilice las rutas del objeto AuthRoutes
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/vehiculos', vehiculosRoutes);
app.use('/api/servicios', serviciosRoutes);
app.use('/api/citas', citasRoutes);

app.use('/api/marcas', marcasRoutes);
app.use('/api/modelos', modelosRoutes);
app.use('/api/motores', motoresRoutes);

export default app;