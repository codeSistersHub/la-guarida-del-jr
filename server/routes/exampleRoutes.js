import express from 'express';
import { getExampleData } from '../controllers/exampleController';

const router = express.Router();

router.get('/', getExampleData);

export default router;
