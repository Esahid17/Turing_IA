// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Importar las rutas
import adminRoutes from './directions/admin.js';
import userRoutes from './directions/users.js'; // Importa las rutas de usuarios

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Usar las rutas para administración
app.use('/api', adminRoutes);  // Asegúrate de usar el router aquí
app.use('/api', userRoutes);  // Prefijo para rutas de usuarios

// Escuchar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
