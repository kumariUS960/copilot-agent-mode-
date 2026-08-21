import { Schema, model, type InferSchemaType } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    focus: { type: String, required: true },
    durationMinutes: { type: Number, required: true, min: 10 },
    difficulty: { type: String, enum: ['Easy', 'Moderate', 'High'], default: 'Moderate' },
  },
  { timestamps: true }
);

export type WorkoutDocument = InferSchemaType<typeof workoutSchema>;
export const Workout = model<WorkoutDocument>('Workout', workoutSchema);
