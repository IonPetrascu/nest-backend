import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  private tasks = [
    { id: 1, name: 'Learn NestJs', isCompleted: false },
    { id: 2, name: 'Learn NextJs', isCompleted: true },
  ];
  findAll() {
    return this.tasks;
  }

  findById(id: number) {
    const task = this.tasks.find((task) => task.id === Number(id));

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  create(dto: CreateTaskDto) {
    const { name, isCompleted } = dto;
    const newTask = {
      id: this.tasks.length + 1,
      name,
      isCompleted,
    };

    this.tasks.push(newTask);
    return this.tasks;
  }

  update(id: number, dto: UpdateTaskDto) {
    const { name, isCompleted } = dto;
    const task = this.findById(id);

    task.name = name;
    task.isCompleted = isCompleted;

    return task;
  }

  patchUpdate(id: number, dto: Partial<UpdateTaskDto>) {
    const task = this.findById(id);
    Object.assign(task, dto);

    return task;
  }

  delete(id: number) {
    const currentTask = this.findById(id);
    this.tasks = this.tasks.filter((task) => task.id !== currentTask.id);
    return { message: 'Deleted successfully' };
  }
}
