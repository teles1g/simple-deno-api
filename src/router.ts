import { Router } from 'https://deno.land/x/oak/mod.ts';

import { getUsers, getUserById, addUser, UpdateUser, deleteUserById } from './controller/user.ts';

const router = new Router();

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', addUser);
router.put('/users/:id', UpdateUser);
router.delete('/users/:id', deleteUserById);

export default router;
