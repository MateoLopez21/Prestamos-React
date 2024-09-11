import mongoose from "mongoose";

const pagoSchema = new mongoose.Schema({
  prestamoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Prestamo',
    required: true,
  },
  monto: {
    type: "Number",
    required: true,
  },
  fechaPago: {
    type: "Date",
    required: true,
  },
  estado: {
    type: "String",
    enum: ['realizado', 'pendiente'],
    default: 'pendiente',
  },
}, {
  timestamps: true
});

export default mongoose.model('Pago', pagoSchema);