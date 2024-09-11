import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  montoGastado: {
    type: "Number",
    required: true,
  },
  observaciones: {
    type: "String",
    trim: true,
  },
  fechaGasto: {
    type: "Date",
    required: true,
  },
  montoRestante: {
    type: "Number",
    required: true,
  },
  estado: {
    type: "String",
    enum: ['pagado', 'pendiente'],
    default: 'pendiente',
  },
}, {
  timestamps: true
});

export default mongoose.model('Gasto', expenseSchema);
