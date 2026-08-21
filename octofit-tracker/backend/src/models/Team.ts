import { Schema, model, type InferSchemaType } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    coach: { type: String, default: 'TBD' },
    points: { type: Number, default: 0 },
    members: [{ type: String }],
  },
  { timestamps: true }
);

export type TeamDocument = InferSchemaType<typeof teamSchema>;
export const Team = model<TeamDocument>('Team', teamSchema);
