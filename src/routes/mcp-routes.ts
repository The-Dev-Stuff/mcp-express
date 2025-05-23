import { Router } from 'express';
import {
  handlePostRequest,
  handleUnAllowedMethodRequest
} from '../services/mcp-service.js';

const router = Router();

router.post('/', handlePostRequest);

router.get('/', handleUnAllowedMethodRequest);
router.delete('/', handleUnAllowedMethodRequest);
router.put('/', handleUnAllowedMethodRequest);
router.patch('/', handleUnAllowedMethodRequest);

export default router;
