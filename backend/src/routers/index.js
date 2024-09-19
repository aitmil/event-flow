import express from 'express';
import { Router } from 'express';
import { getAllEventsController } from '../controllers/events.js';
import {
  getParticipantsController,
  registerParticipantController,
} from '../controllers/participants.js';
import { registerParticipantSchema } from '../validation/participants.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = Router();
const jsonParser = express.json();

router.get('/events', ctrlWrapper(getAllEventsController));

router.post(
  '/register',
  jsonParser,
  validateBody(registerParticipantSchema),
  ctrlWrapper(registerParticipantController)
);

router.get(
  '/participants/:eventId',
  isValidId,
  ctrlWrapper(getParticipantsController)
);

export default router;
