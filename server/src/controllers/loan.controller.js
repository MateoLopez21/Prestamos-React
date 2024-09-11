import Loan from '../models/loan.model.js';
import Finance from '../models/finance.model.js';
import User from '../models/user.model.js';

export const getLoans = async (req, res) => {
  try {
    const loans = await Loan.find().populate('clienteId');
    res.status(200).json(loans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un préstamo por ID
export const getLoanById = async (req, res) => {
  try {
    const { id } = req.params;
    const loan = await Loan.findById(id).populate('clienteId');
    if (!loan) return res.status(404).json({ message: 'Préstamo no encontrado' });
    res.status(200).json(loan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo préstamo
export const createLoan = async (req, res) => {
  try {
    const { montoPrestado, numeroCuotas, fechaInicio, observaciones, clienteId, montoTotal } = req.body;
    const user = await User.findById(req.user.id);
    const userRol = user.rol
    let userFound;
    let estado = 'pendiente'; // Estado por defecto para clientes
    let finalMontoPrestado, finalMontoTotal;

    if (userRol === 'administrador') {

      userFound = await User.findById(clienteId);

      
      finalMontoPrestado = montoPrestado;
      finalMontoTotal = montoTotal || montoPrestado * 1.3;

      estado = 'activo';
    } else if (userRol === 'cliente') {
      userFound = await User.findById(req.user.id);

      finalMontoPrestado = montoPrestado;
      finalMontoTotal = montoPrestado * 1.3;
    } else {
      return res.status(403).json({ message: 'Acceso denegado.' });
    }

    const cuotasRestantes = numeroCuotas;
    const valorCuota = Math.ceil(finalMontoTotal / numeroCuotas / 1000) * 1000;

    const startDate = fechaInicio ? new Date(fechaInicio) : new Date();
    const fechaFin = new Date(startDate);
    fechaFin.setDate(fechaFin.getDate() + cuotasRestantes * 15);

    const nextPaymentDate = new Date(startDate);
    nextPaymentDate.setDate(nextPaymentDate.getDate() + 15);

    const finance = await Finance.findOne();

    if (finalMontoPrestado > finance.disponibleParaPrestar) {
      return res.status(400).json({ message: 'No hay suficiente fondo para prestar.' });
    }

    const newLoan = new Loan({
      clienteId: userFound._id,
      montoPrestado: finalMontoPrestado,
      montoTotal: finalMontoTotal,
      numeroCuotas,
      cuotasRestantes,
      valorCuota,
      observaciones,
      fechaInicio: startDate,
      fechaFin,
      fechaProximoPago: nextPaymentDate,
      montoRestante: finalMontoTotal,
      estado
    });

    await newLoan.save();


    finance.disponibleParaPrestar -= finalMontoPrestado;
    finance.gananciaPorInteres += (finalMontoTotal - finalMontoPrestado);
    finance.saldoPrestamosVigentes += finalMontoTotal;

    await finance.save();

    res.status(201).json(newLoan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Actualizar un préstamo
export const updateLoan = async (req, res) => {
  try {
    const { id } = req.params;
    const { montoPrestado, montoTotal, numeroCuotas, fechaInicio, fechaFinalizacion, cuotasRestantes, observaciones, fechaProximoPago, estado, montoRestante } = req.body;

    const loan = await Loan.findById(id);
    if (!loan) return res.status(404).json({ message: 'Préstamo no encontrado' });

    loan.montoPrestado = montoPrestado || loan.montoPrestado;
    loan.montoTotal = montoTotal || loan.montoTotal;
    loan.numeroCuotas = numeroCuotas || loan.numeroCuotas;
    loan.fechaInicio = fechaInicio || loan.fechaInicio;
    loan.fechaFinalizacion = fechaFinalizacion || loan.fechaFinalizacion;
    loan.cuotasRestantes = cuotasRestantes || loan.cuotasRestantes;
    loan.observaciones = observaciones || loan.observaciones;
    loan.fechaProximoPago = fechaProximoPago || loan.fechaProximoPago;
    loan.estado = estado || loan.estado;
    loan.montoRestante = montoRestante || loan.montoRestante;

    await loan.save();
    res.status(200).json(loan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un préstamo
export const deleteLoan = async (req, res) => {
  try {
    const { id } = req.params;
    const loan = await Loan.findByIdAndDelete(id);
    if (!loan) return res.status(404).json({ message: 'Préstamo no encontrado' });

    res.status(200).json({ message: 'Préstamo eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};