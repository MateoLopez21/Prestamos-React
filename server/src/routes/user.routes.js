import { router } from '../utils/utils.js';
import { getUser, createUser, updateUser, deleteUser, getUserById } from '../controllers/user.controller.js';


router.route('/clientes')
    .get(getUser)
    .post(createUser);
router.route('/clientes/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

export default router;
