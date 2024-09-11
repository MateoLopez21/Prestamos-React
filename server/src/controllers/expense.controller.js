import Expense from '../models/expense.model.js';
import Finance from '../models/finance.model.js';

// Obtener todos los gastos
export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un gasto por ID
export const getExpenseById = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findById(id);
    if (!expense) return res.status(404).json({ message: 'Gasto no encontrado' });
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo gasto
export const createExpense = async (req, res) => {
  try {
    const { montoGastado, observaciones, fechaGasto } = req.body;

    const finance = await Finance.findOne();

    // Validación de fondo disponible para gastos
    if (montoGastado > finance.disponibleParaPrestar) {
      return res.status(400).json({ message: 'No hay suficiente fondo para realizar el gasto.' });
    }

    // Crear el gasto
    const newExpense = new Expense({
      montoGastado,
      observaciones,
      fechaGasto,
      montoRestante: montoGastado,
      estado: 'pendiente'
    });

    await newExpense.save();

    // Actualizar finanzas
    finance.gananciaPorInteres -= montoGastado;
    finance.disponibleParaPrestar -= montoGastado;

    await finance.save();

    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para actualizar el estado del gasto a pagado
export const payExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const expense = await Expense.findById(id);
    if (!expense) return res.status(404).json({ message: 'Gasto no encontrado' });

    expense.estado = 'pagado';

    const finance = await Finance.findOne();
    finance.gananciaPorInteres += expense.montoRestante;
    finance.disponibleParaPrestar += expense.montoRestante;

    await expense.save();
    await finance.save();

    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un gasto
export const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { montoGastado, observaciones, fechaGasto, montoRestante, estado } = req.body;

    const expense = await Expense.findById(id);
    if (!expense) return res.status(404).json({ message: 'Gasto no encontrado' });

    expense.montoGastado = montoGastado || expense.montoGastado;
    expense.observaciones = observaciones || expense.observaciones;
    expense.fechaGasto = fechaGasto || expense.fechaGasto;
    expense.montoRestante = montoRestante || expense.montoRestante;
    expense.estado = estado || expense.estado;

    await expense.save();
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un gasto
export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findByIdAndDelete(id);
    if (!expense) return res.status(404).json({ message: 'Gasto no encontrado' });

    res.status(200).json({ message: 'Gasto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
