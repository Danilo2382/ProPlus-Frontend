import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Task } from "../models/task";


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) {}

  listTasks(id: string) {
    return this.http.get<{tasks: Array<Task>, usernames: Array<string>}>(`/project/listTasks?id=${id}`);
  }

  finishTask(id: string) {
    return this.http.put<Task>(`/task/finishTask?taskId=${id}`, null);
  }

  createTask(projectId: string, task: Task, username: string) {
    const body = {
      idProject: projectId,
      task: {
        id: null,
        name: task.name,
        description: task.description,
        createDate: null,
        status: null
      },
      username: username
    }
    return this.http.post<Task>('/task/createTask', body);
  }
}
