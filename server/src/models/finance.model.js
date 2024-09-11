import mongoose from "mongoose";

const financeSchema = new mongoose.Schema({
  capitalInicial: {
    type: "Number",
    required: true,
  },
  gananciaPorInteres: {
    type: "Number",
    default: 0,
  },
  disponibleParaPrestar: {
    type: "Number",
    required: true,
  },
  saldoPrestamosVigentes: {
    type: "Number",
    required: true,
  },
}, {
  timestamps: true
});

export default mongoose.model('Finanzas', financeSchema);
