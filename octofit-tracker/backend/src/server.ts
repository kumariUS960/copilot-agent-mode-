import express from 'express';
import db from './config/database.js';
import { Activity } from './models/Activity.js';
import { Leaderboard } from './models/Leaderboard.js';
import { Team } from './models/Team.js';
import { User } from './models/User.js';
import { Workout } from './models/Workout.js';

const app = express();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(express.json());

const registerCollectionRoutes = (resourceName: string, model: any) => {
  const endpoint = `/api/${resourceName}`;

  app.get([endpoint, `${endpoint}/`], async (_request, response) => {
    try {
      const results = await model.find({});
      response.json({
        resource: resourceName,
        count: results.length,
        apiUrl: `${apiBaseUrl}${endpoint}/`,
        results,
      });
    } catch (error) {
      response.status(500).json({
        error: 'Unable to fetch records',
        details: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  });

  app.post([endpoint, `${endpoint}/`], async (request, response) => {
    try {
      const newItem = await model.create(request.body ?? {});
      response.status(201).json(newItem);
    } catch (error) {
      response.status(400).json({
        error: 'Unable to create record',
        details: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  });
};

registerCollectionRoutes('users', User);
registerCollectionRoutes('teams', Team);
registerCollectionRoutes('activities', Activity);
registerCollectionRoutes('leaderboard', Leaderboard);
registerCollectionRoutes('workouts', Workout);

app.get('/api/health', (_request, response) => {
  response.json({
    service: 'octofit-tracker-api',
    database: db.readyState === 1 ? 'connected' : 'disconnected',
    apiUrl: apiBaseUrl,
  });
});

app.get('/', (_request, response) => {
  response.json({
    service: 'OctoFit Tracker API',
    version: '1.0.0',
    apiUrl: apiBaseUrl,
    endpoints: [
      '/api/health',
      '/api/users/',
      '/api/teams/',
      '/api/activities/',
      '/api/leaderboard/',
      '/api/workouts/',
    ],
  });
});

app.listen(port, () => {
  console.log(`OctoFit Tracker API listening on port ${port}`);
  console.log(`API base URL: ${apiBaseUrl}`);
});
