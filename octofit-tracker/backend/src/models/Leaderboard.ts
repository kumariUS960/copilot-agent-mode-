import { Schema, model, type InferSchemaType } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    name: { type: String, required: true },
    rank: { type: Number, required: true },
    points: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

export type LeaderboardDocument = InferSchemaType<typeof leaderboardSchema>;
export const Leaderboard = model<LeaderboardDocument>('Leaderboard', leaderboardSchema);
