import { router } from '../utils/utils.js'
import { createFinance, getFinance, updateFinance, deleteFinance } from '../controllers/finance.controller.js';
import { authRequired } from '../middlewares/validateToken.js';

router.route('/finanzas')
    .get(authRequired, getFinance)
    .post(authRequired, createFinance)

router.route('/finanzas/:id')
    .put(authRequired, updateFinance)
    .delete(authRequired, deleteFinance)

export default router;
