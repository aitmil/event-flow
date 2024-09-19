import { Router } from 'express';
import Participant from '../db/models/participant.js';
import { fetchEvents } from '../controllers/events.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/events', ctrlWrapper(fetchEvents));

router.post('/register', async (req, res) => {
  const participant = {
    fullName: req.body.fullName,
    email: req.body.email,
    dateOfBirth: req.body.dateOfBirth,
    source: req.body.source,
    eventId: req.event._id,
  };

  const result = new Participant(participant);
  await result.save();
  res.status(201).json({
    status: 200,
    message: 'Participant of event registered successfully!',
    data: participant,
  });
});

router.get('/participants/:eventId', async (req, res) => {
  const participants = await Participant.find({ eventId: req.params.eventId });
  res.status(200).json({
    status: 200,
    message: 'Participants of event retrieved successfully!',
    data: participants,
  });
});

export default router;
