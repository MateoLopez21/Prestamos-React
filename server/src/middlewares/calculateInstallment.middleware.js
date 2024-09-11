export const calculateInstallment = function(next) {
    const { montoTotal, numeroCuotas } = this;
    
    if (montoTotal && numeroCuotas) {
      // Calcula el valor de la cuota y redondea al próximo número mayor
      this.valorCuota = Math.ceil(montoTotal / numeroCuotas);
    }
  
    next();
  };
  