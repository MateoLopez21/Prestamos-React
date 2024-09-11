import Finance from '../models/finance.model.js';

// Obtener las finanzas
export const getFinance = async (req, res) => {
  try {
    const finance = await Finance.findOne();
    res.status(200).json(finance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear o inicializar las finanzas (solo debería haber un registro)
export const createFinance = async (req, res) => {
  try {
    const { capitalInicial, gananciaPorInteres, disponibleParaPrestar, saldoPrestamosVigentes } = req.body;

    const financeExists = await Finance.findOne();
    if (financeExists) return res.status(400).json({ message: 'Las finanzas ya están inicializadas' });

    const newFinance = new Finance({ capitalInicial, gananciaPorInteres, disponibleParaPrestar, saldoPrestamosVigentes });
    await newFinance.save();
    res.status(201).json(newFinance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar las finanzas
export const updateFinance = async (req, res) => {
  try {
    const { capitalInicial, gananciasPorInteres, disponibleParaPrestar, saldoPrestamosVigentes } = req.body;

    const finance = await Finance.findOne();
    if (!finance) return res.status(404).json({ message: 'Finanzas no encontradas' });

    finance.capitalInicial = capitalInicial || finance.capitalInicial;
    finance.gananciasPorInteres = gananciasPorInteres || finance.gananciasPorInteres;
    finance.disponibleParaPrestar = disponibleParaPrestar || finance.disponibleParaPrestar;
    finance.saldoPrestamosVigentes = saldoPrestamosVigentes || finance.saldoPrestamosVigentes;

    await finance.save();
    res.status(200).json(finance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar finanzas (no se suele hacer, pero se incluye)
export const deleteFinance = async (req, res) => {
  try {
    const finance = await Finance.findOneAndDelete();
    if (!finance) return res.status(404).json({ message: 'Finanzas no encontradas' });

    res.status(200).json({ message: 'Finanzas eliminadas correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
