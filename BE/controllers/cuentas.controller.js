import { cuentas } from '../data/cuentas.js';
    
// Función auxiliar para convertir el balance de String a Número
const parseBalance = (balanceStr) => {
  return parseFloat(balanceStr.replace(/\$|,/g, ''));
};

// Endpoint: GET /cuentas (con búsqueda)
export const getCuentas = (req, res) => {
  const query = req.query;
  
  // 1. Si NO hay query params, devuelve todas las cuentas
  if (Object.keys(query).length === 0) {
    return res.status(200).json({
      count: cuentas.length,
      data: cuentas
    });
  }

  // 2. Si HAY query params, buscamos
  const { _id, client, gender } = query;
  let resultados = [];

  if (_id) {
    const cuenta = cuentas.find(c => c._id === _id);
    if (cuenta) {
      return res.status(200).json({
        finded: true,
        account: cuenta
      });
    }
  }

  if (client) {
    resultados = cuentas.filter(c => 
      c.client.toLowerCase().includes(client.toLowerCase())
    );
  }

  if (gender) {
    resultados = cuentas.filter(c => c.gender.toLowerCase() === gender.toLowerCase());
  }

  return res.status(200).json({
    finded: resultados.length > 0,
    data: resultados
  });
};

// Endpoint: GET /cuenta/:id
export const getCuentaById = (req, res) => {
  const { id } = req.params;
  const cuenta = cuentas.find(c => c._id === id);

  if (!cuenta) {
    return res.status(404).json({
      finded: false,
      account: null
    });
  }

  return res.status(200).json({
    finded: true,
    account: cuenta
  });
};

// Endpoint: GET /cuentasBalance
export const getCuentasBalance = (req, res) => {
  const cuentasActivas = cuentas.filter(c => c.isActive === true);

  if (cuentasActivas.length === 0) {
    return res.status(200).json({
      status: false,
      accountBalance: 0
    });
  }

  const totalBalance = cuentasActivas.reduce((sum, cuenta) => {
    return sum + parseBalance(cuenta.balance);
  }, 0);

  res.status(200).json({
    status: true,
    accountBalance: totalBalance
  });
};
