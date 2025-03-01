import "reflect-metadata";
import express from 'express';
import botRouter from './controllers/Bot.controller';
import { AppDataSource } from './data-source';
import { Server } from 'socket.io';
import http from 'http';
import { initializeIO } from "./io";

async function startServer() {
  await AppDataSource.initialize();

  const app = express();
  const port = 5000;
  const server = http.createServer(app);
  initializeIO(server);

  app.use(express.json());

  app.use('/api/bot', botRouter);

  server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

startServer();
