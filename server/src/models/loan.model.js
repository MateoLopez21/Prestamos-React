import mongoose from "mongoose";

const loanSchema = new mongoose.Schema({
  clienteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente',
    required: true,
  },
  montoPrestado: {
    type: "Number",
    required: true,
  },
  montoTotal: {
    type: "Number",
    required: true,
  },
  numeroCuotas: {
    type: "Number",
    required: true,
  },
  fechaInicio: {
    type: "Date",
    required: true,
  },
  fechaFin: {
    type: "Date",
    required: true,
  },
  cuotasRestantes: {
    type: "Number",
    required: true,
  },
  valorCuota: {
    type: "Number",
    required: true,
  },
  observaciones: {
    type: "String",
    trim: true,
  },
  fechaProximoPago: {
    type: "Date",
    required: true,
  },
  estado: {
    type: "String",
    enum: ['activo', 'finalizado', 'pendiente'],
    default: 'activo',
  },
  montoRestante: {
    type: "Number",
    required: true,
  },
}, {
  timestamps: true
});


export default mongoose.model('Loan', loanSchema);