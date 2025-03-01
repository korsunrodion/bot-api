import { AvailableTask } from "../entities/AvailableTask.entity";
import { Bot } from "../entities/Bot.entity";
import { Task, TaskStatus } from "../entities/Task.entity";
import { getIO } from "../io";

class TaskService {
  public async createRandomTask(bot: Bot) {
    const availableTasks = await AvailableTask.find();
  
    if (availableTasks.length === 0) {
      throw new Error("No available tasks found in the database");
    }
    
    const randomIndex = Math.floor(Math.random() * availableTasks.length);
    const randomAvailableTask = availableTasks[randomIndex];
  
    const task = new Task();
    task.availableTask = randomAvailableTask;
    task.status = TaskStatus.Pending;
    task.bot = bot;
    
    return await Task.save(task);
  };

  public async startTask(taskId: string) {
    const task = await Task.findOneOrFail({
      where: { id: taskId },
      relations: { availableTask: true }
    });
    const io = getIO();

    task.status = TaskStatus.InProgress;
    await task.save();
    io.emit('updated');
    io.emit('started', {
      taskId: task.id,
      status: TaskStatus.InProgress
    })

    setTimeout(async () => {
      task.status = TaskStatus.Completed;
      task.completedAt = new Date();
      await task.save();

      io.emit('updated');
      io.emit('completed', {
        taskId: task.id,
        status: TaskStatus.Completed
      })
    }, task.availableTask.duration);
  };
}

export default new TaskService()