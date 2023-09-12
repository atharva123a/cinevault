import { Router } from 'express';
import User from './userService';
import { authenticateUser } from '../middleware/authentication';

export const router = Router();

router.post('/register', User.register);
router.post('/login', User.login);
router.get('/', authenticateUser, User.getUser);
