const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/librosController');

router.get('/', ctrl.obtenerLibros);
router.post('/', ctrl.crearLibro);
router.get('/:id', ctrl.obtenerLibroPorId);
router.put('/:id', ctrl.actualizarLibro);
router.delete('/:id', ctrl.eliminarLibro);

module.exports = router;
