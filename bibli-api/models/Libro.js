const mongoose = require('mongoose');

const libroSchema = new mongoose.Schema({
  titulo: { type: String, required: [true, 'El título es obligatorio'], trim: true, maxlength: 100 },
  autor: { type: String, required: [true, 'El autor es obligatorio'], trim: true, maxlength: 50 },
  isbn: { type: String, required: [true, 'El ISBN es obligatorio'], unique: true, match: [/^[\d-]{10,17}$/, 'Formato de ISBN inválido'] },
  genero: { type: String, required: [true, 'El género es obligatorio'], enum: ['Ficción','No Ficción','Ciencia','Historia','Biografía','Tecnología'] },
  fechaPublicacion: { type: Date, required: [true, 'La fecha de publicación es obligatoria'] },
  paginas: { type: Number, required: [true, 'El número de páginas es obligatorio'], min: 1 },
  disponible: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Libro', libroSchema);
