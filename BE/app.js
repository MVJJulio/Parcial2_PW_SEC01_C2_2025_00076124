import express from 'express';
import cors from 'cors';
import cuentasRoutes from './routes/cuentas.routes.js';

// 1. Inicialización
const app = express();

// 2. Puerto (Puerto 3130 como pide el examen)
const PORT = 3130;

// 3. Middlewares
app.use(cors());
app.use(express.json());

// 4. Rutas
app.use('/', cuentasRoutes);

// 5. Iniciar Servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo exitosamente en http://localhost:${PORT}`);
});
