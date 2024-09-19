import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const isValidId = (req, res, next) => {
  const { eventId } = req.params;

  if (!isValidObjectId(eventId)) {
    return next(createHttpError(400, 'Id is not valid'));
  }
  next();
};
