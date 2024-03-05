import express from 'express';
const router = express.Router();

// controller instance
import { ProcessLogin, ProcessLogout, ProcessRegister } from '../Controllers/auth';

/*********************************** AUTHENTICATION ROUTES ***************************/

/* Process the login request */
router.post('/login', ProcessLogin);

/* Process the register request */
router.post('/register', ProcessRegister);

/* Process the logout request */
router.get('/logout', ProcessLogout);

export default router;