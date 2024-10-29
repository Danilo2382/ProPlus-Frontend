import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from "../../models/task"
import { TaskService } from "../../services/task.service";
import { showInfo } from "../../sweetalert/alerts";
import Swal from "sweetalert2";
import { ProjectService } from "../../services/project.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit{

  @Input() id!: number;
  @Output() backEvent = new EventEmitter<string>();
  protected tasksWithUsernames!: { tasks: Array<Task>, usernames: Array<string> };
  protected showCreateTask: boolean = false;
  protected members: Array<string> | null = null;

  constructor(private taskService: TaskService,  private projectService: ProjectService) {}

  ngOnInit(): void {
    this.loadTasks();
    this.listMembers();
  }

  protected goBack() {
    this.backEvent.emit('stateMembers');
  }

  private loadTasks() {
    this.taskService.listTasks(this.id!.toString()).subscribe({
      next: data => this.tasksWithUsernames = data,
      error: err => showInfo('error', err)
    })
  }

  protected finishTask(id: number) {
    this.taskService.finishTask(id.toString()).subscribe({
      next: () => this.loadTasks(),
      error: err => showInfo('error', err.error)
    });
  }

  protected createTask(createForm: NgForm) {
    this.taskService.createTask(
      this.id.toString(),
      {
        name: createForm.value.name,
        description: createForm.value.description,
      } as Task,
      createForm.value.member
    ).subscribe({
      next: () => {
        this.loadTasks();
        this.activateChangeTask();
      },
      error: err => showInfo('error', err.error)
    });
  }

  protected statusToString(status: number) {
    if (status == 0) return 'Active';
    return 'Done';
  }

  protected showDescription(task: Task) {
    Swal.fire({
      title: 'Description',
      text: task.description
    }).then();
  }

  private listMembers() {
    return this.projectService.listMembers(this.id.toString()).subscribe({
      next: data => this.members = data.usernames,
      error: err => showInfo('error', err.error)
    });
  }

  protected activateChangeTask() {
    this.showCreateTask = !this.showCreateTask;
  }

  protected readonly localStorage = localStorage;
  protected readonly name = name;
}
