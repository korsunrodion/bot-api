import { Column, Entity, OneToMany } from 'typeorm';
import { Model } from './Model.entity';
import { Task } from './Task.entity';

@Entity('bots')
export class Bot extends Model {
  @Column({ type: 'text' })
  name: string;

  @OneToMany(() => Task, task => task.bot)
  tasks: Task[];
}
