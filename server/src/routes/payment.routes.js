import { router } from '../utils/utils.js'
import { createPayment, getPayments, getPaymentById, updatePayment, deletePayment } from '../controllers/payment.controller.js';
import { authRequired } from '../middlewares/validateToken.js';

router.route('/gastos')
    .get(authRequired, getPayments)
    .post(authRequired, createPayment)

router.route('/gastos/:id')
    .get(authRequired, getPaymentById)
    .put(authRequired, updatePayment)
    .delete(authRequired, deletePayment)

export default router;
