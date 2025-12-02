exports.enviarRespuesta = (res, statusCode, data, mensaje = 'Operación exitosa') => {
  res.status(statusCode).json({
    success: true,
    mensaje,
    data,
    timestamp: new Date().toISOString()
  });
};

exports.enviarError = (res, statusCode, mensaje, detalles = null) => {
  res.status(statusCode).json({
    success: false,
    mensaje,
    detalles,
    timestamp: new Date().toISOString()
  });
};
