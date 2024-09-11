import Payment from '../models/payment.model.js';
import Loan from '../models/loan.model.js';
import Finance from '../models/finance.model.js';

// Obtener todos los pagos
export const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate('loanId clienteId');
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un pago por ID
export const getPaymentById = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await Payment.findById(id).populate('loanId clienteId');
    if (!payment) return res.status(404).json({ message: 'Pago no encontrado' });
    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo pago
export const createPayment = async (req, res) => {
    try {
      const { loanId, monto, fechaPago } = req.body;
  
      const loan = await Loan.findById(loanId);
      if (!loan) return res.status(404).json({ message: 'Préstamo no encontrado' });
  
      // Actualizar loan
      loan.montoRestante -= monto;
      loan.cuotasRestantes -= 1;
      loan.fechaProximoPago.setDate(loan.fechaProximoPago.getDate() + 15);
  
      await loan.save();
  
      // Crear el pago
      const newPayment = new Payment({ loanId, monto, fechaPago });
      await newPayment.save();
  
      // Actualizar finanzas
      const finance = await Finance.findOne();
      finance.disponibleParaPrestar += monto;
  
      await finance.save();
  
      res.status(201).json(newPayment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Actualizar un pago
export const updatePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { loanId, clienteId, montoPagado, fechaDePago, estado } = req.body;

    const payment = await Payment.findById(id);
    if (!payment) return res.status(404).json({ message: 'Pago no encontrado' });

    payment.loanId = loanId || payment.loanId;
    payment.clienteId = clienteId || payment.clienteId;
    payment.monto = monto || payment.monto;
    payment.fechaPago = fechaDePago || payment.fechaPago;
    payment.estado = estado || payment.estado;

    await payment.save();
    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un pago
export const deletePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await Payment.findByIdAndDelete(id);
    if (!payment) return res.status(404).json({ message: 'Pago no encontrado' });

    res.status(200).json({ message: 'Pago eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};