import { router } from '../utils/utils.js'
import { createExpense, getExpenses, getExpenseById, updateExpense, deleteExpense, payExpense } from '../controllers/expense.controller.js';
import { authRequired } from '../middlewares/validateToken.js';


router.route('/gastos')
    .get(authRequired, getExpenses)
    .post(authRequired, createExpense)

router.route('/gastos/:id/pagar')
    .post(authRequired, payExpense)

router.route('/gastos/:id')
    .get(authRequired, getExpenseById)
    .put(authRequired, updateExpense)
    .delete(authRequired, deleteExpense)

export default router;
