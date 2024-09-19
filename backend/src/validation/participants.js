import Joi from 'joi';

export const registerParticipantSchema = Joi.object({
  fullName: Joi.string().min(3).max(50).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'org'] },
    })
    .required(),
  dateOfBirth: Joi.date().less('now').required(),
  source: Joi.string().required(),
  eventId: Joi.string(),
});
