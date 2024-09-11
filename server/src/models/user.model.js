import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  nombre: {
    type: "String",
    required: true,
    trim: true,
  },
  telefono: {
    type: "String",
    required: true,
    trim: true,
  },
  email: {
    type: "String",
    required: true,
    trim: true,
    unique: true,
  },
  estado: {
    type: "String",
    enum: ['activo', 'inactivo'],
    default: 'activo',
  },
  rol: {
    type: "String",
    enum: ['cliente', 'administrador'],
    default: 'cliente',
  },
  password: {
    type: "String",
    required: true,
    trim: true,
  },
}, {
  timestamps: true
});

export default mongoose.model('User', userSchema);