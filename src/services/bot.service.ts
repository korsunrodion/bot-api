import { Bot } from "../entities/Bot.entity";
import taskService from "./task.service";

class BotService {
  public async getBots() {
    const bots = await Bot.find({
      order: {
        createdAt: 'DESC'
      },
      relations: { tasks: { availableTask: true }}
    });
    return bots;
  }

  public async createNewBot(name: string) {
    const bot = await Bot.save(Bot.create({ name }));
    
    await taskService.createRandomTask(bot);
    await taskService.createRandomTask(bot);

    const botUpdated = await Bot.findOne({ 
      where: { id: bot.id },
      relations: { 
        tasks: {
          availableTask: true
        }
      }
    });

    if (botUpdated?.tasks) {
      for (const task of botUpdated.tasks) {
        await taskService.startTask(task.id);
      }
    }
    
    return botUpdated;
  }
}

export default new BotService();