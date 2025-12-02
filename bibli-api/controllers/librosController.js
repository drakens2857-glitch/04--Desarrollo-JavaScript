const Libro = require('../models/Libro');
const { enviarRespuesta, enviarError } = require('../utils/respuestas');

exports.obtenerLibros = async (req, res) => {
  try {
    const { genero, disponible, pagina = 1, limite = 10, q } = req.query;
    const filtros = {};
    if (genero) filtros.genero = genero;
    if (disponible !== undefined) filtros.disponible = disponible === 'true';
    if (q) filtros.$or = [
      { titulo: { $regex: q, $options: 'i' } },
      { autor: { $regex: q, $options: 'i' } },
      { isbn: { $regex: q, $options: 'i' } }
    ];
    const skip = (pagina - 1) * limite;
    const libros = await Libro.find(filtros).skip(skip).limit(parseInt(limite)).sort({ createdAt: -1 });
    const total = await Libro.countDocuments(filtros);
    enviarRespuesta(res, 200, { libros, paginacion: { paginaActual: parseInt(pagina), totalPaginas: Math.ceil(total / limite), totalLibros: total } }, 'Libros obtenidos exitosamente');
  } catch (error) {
    enviarError(res, 500, 'Error al obtener libros', error.message);
  }
};

exports.obtenerLibroPorId = async (req, res) => {
  try {
    const libro = await Libro.findById(req.params.id);
    if (!libro) return enviarError(res, 404, 'Libro no encontrado');
    enviarRespuesta(res, 200, libro, 'Libro encontrado');
  } catch (error) {
    enviarError(res, 500, 'Error al obtener libro', error.message);
  }
};

exports.crearLibro = async (req, res) => {
  try {
    const libro = new Libro(req.body);
    await libro.save();
    enviarRespuesta(res, 201, libro, 'Libro creado exitosamente');
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errores = Object.values(error.errors).map(e => e.message);
      enviarError(res, 400, 'Datos de validación incorrectos', errores);
    } else if (error.code === 11000) {
      enviarError(res, 400, 'El ISBN ya existe', 'Debe usar un ISBN único');
    } else {
      enviarError(res, 500, 'Error al crear libro', error.message);
    }
  }
};

exports.actualizarLibro = async (req, res) => {
  try {
    const libro = await Libro.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!libro) return enviarError(res, 404, 'Libro no encontrado');
    enviarRespuesta(res, 200, libro, 'Libro actualizado exitosamente');
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errores = Object.values(error.errors).map(e => e.message);
      enviarError(res, 400, 'Datos de validación incorrectos', errores);
    } else {
      enviarError(res, 500, 'Error al actualizar libro', error.message);
    }
  }
};

exports.eliminarLibro = async (req, res) => {
  try {
    const libro = await Libro.findByIdAndDelete(req.params.id);
    if (!libro) return enviarError(res, 404, 'Libro no encontrado');
    enviarRespuesta(res, 200, null, 'Libro eliminado exitosamente');
  } catch (error) {
    enviarError(res, 500, 'Error al eliminar libro', error.message);
  }
};
