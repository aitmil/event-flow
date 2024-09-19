import mongoose from 'mongoose';

const participantSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    source: {
      type: String,
      required: true,
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
    },
  },
  { timestamps: true, versionKey: false }
);

const Participant = mongoose.model('Participant', participantSchema);

export default Participant;
