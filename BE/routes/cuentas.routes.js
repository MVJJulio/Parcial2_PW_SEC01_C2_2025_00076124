import { Router } from 'express';
import { 
  getCuentas, 
  getCuentaById, 
  getCuentasBalance 
} from '../controllers/cuentas.controller.js';

const router = Router();

// Ruta: GET /cuentas (Maneja todas las cuentas Y las búsquedas)
router.get('/cuentas', getCuentas);

// Ruta: GET /cuenta/:id (Obtiene una por ID)
router.get('/cuenta/:id', getCuentaById);

// Ruta: GET /cuentasBalance (Suma total de cuentas activas)
router.get('/cuentasBalance', getCuentasBalance);

export default router;

