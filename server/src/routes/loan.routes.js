import { router } from '../utils/utils.js';
import { createLoan, getLoans, getLoanById, updateLoan, deleteLoan } from '../controllers/loan.controller.js';
import { authRequired } from '../middlewares/validateToken.js';

router.route('/prestamos')
    .get(authRequired, getLoans)
    .post(authRequired, createLoan)

router.route('/prestamos/:id')
    .get(authRequired, getLoanById)
    .put(authRequired, updateLoan)
    .delete(authRequired, deleteLoan)

export default router;
