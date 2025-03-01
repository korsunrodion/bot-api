import express from 'express';
import botService from '../services/bot.service';
import { formatToBot } from '../formatters/bot.formatter';

const botRouter = express.Router();

botRouter.get(
  '/',
  async (req, res) => {
    const bots = await botService.getBots();

    res.json(bots.map((item) => formatToBot(item)));
  }
)

botRouter.post(
  '/',
  async (req, res) => {
    const { name } = req.body;

    const bot = await botService.createNewBot(name);

    res.json(bot);
  }
)

export default botRouter;