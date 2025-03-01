import { Column, Entity, ManyToOne } from "typeorm";
import { Model } from "./Model.entity";
import { AvailableTask } from "./AvailableTask.entity";
import { Bot } from "./Bot.entity";

export enum TaskStatus {
  Pending = 'pending',
  InProgress = 'in-progress',
  Completed = 'completed'
}

@Entity('tasks')
export class Task extends Model {
  @ManyToOne(() => AvailableTask)
  availableTask: AvailableTask;

  @Column({ type: 'text', enum: TaskStatus })
  status: TaskStatus;

  @Column({ type: 'date', nullable: true })
  completedAt?: Date;

  @ManyToOne(() => Bot, bot => bot.tasks)
  bot: Bot
}