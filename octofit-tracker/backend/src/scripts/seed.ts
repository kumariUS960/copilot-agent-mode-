import mongoose from 'mongoose';
import { User } from '../models/User.js';
import { Team } from '../models/Team.js';
import { Activity } from '../models/Activity.js';
import { Leaderboard } from '../models/Leaderboard.js';
import { Workout } from '../models/Workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    await User.deleteMany({});
    await Team.deleteMany({});
    await Activity.deleteMany({});
    await Leaderboard.deleteMany({});
    await Workout.deleteMany({});

    const users = await User.insertMany([
      {
        name: 'Ava Thompson',
        email: 'ava@octofit.edu',
        password: 'secret123',
        team: 'Blue Falcons',
        fitnessLevel: 'Intermediate',
        points: 280,
      },
      {
        name: 'Mason Lee',
        email: 'mason@octofit.edu',
        password: 'secret123',
        team: 'Red Raptors',
        fitnessLevel: 'Advanced',
        points: 310,
      },
      {
        name: 'Zoe Martinez',
        email: 'zoe@octofit.edu',
        password: 'secret123',
        team: 'Blue Falcons',
        fitnessLevel: 'Beginner',
        points: 220,
      },
    ]);

    await Team.insertMany([
      {
        name: 'Blue Falcons',
        coach: 'Coach Rivera',
        points: 1280,
        members: users.filter((user) => user.team === 'Blue Falcons').map((user) => user.name),
      },
      {
        name: 'Red Raptors',
        coach: 'Coach Patel',
        points: 1150,
        members: users.filter((user) => user.team === 'Red Raptors').map((user) => user.name),
      },
    ]);

    await Activity.insertMany([
      {
        userId: users[0]._id.toString(),
        type: 'Running',
        durationMinutes: 35,
        caloriesBurned: 420,
        date: '2026-08-20',
      },
      {
        userId: users[1]._id.toString(),
        type: 'Strength',
        durationMinutes: 50,
        caloriesBurned: 510,
        date: '2026-08-21',
      },
      {
        userId: users[2]._id.toString(),
        type: 'Cycling',
        durationMinutes: 28,
        caloriesBurned: 330,
        date: '2026-08-19',
      },
    ]);

    await Leaderboard.insertMany([
      { name: 'Ava Thompson', rank: 1, points: 1420 },
      { name: 'Mason Lee', rank: 2, points: 1385 },
      { name: 'Zoe Martinez', rank: 3, points: 1325 },
    ]);

    await Workout.insertMany([
      {
        title: 'Cardio Blast',
        focus: 'Endurance',
        durationMinutes: 30,
        difficulty: 'Moderate',
      },
      {
        title: 'Power Circuit',
        focus: 'Strength',
        durationMinutes: 40,
        difficulty: 'High',
      },
      {
        title: 'Recovery Flow',
        focus: 'Mobility',
        durationMinutes: 20,
        difficulty: 'Easy',
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
