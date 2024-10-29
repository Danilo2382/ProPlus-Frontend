import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Project } from "../models/project";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  getUserProjects() {
    return this.http.get<{projects: Array<Project>, roles: Array<number>}>('/actions/getAllProjects');
  }

  createProject(project: Project) {
    const body = {
      name: project.name,
      description: project.description,
      startDate: project.startDate,
      endDate: project.endDate,
      password: project.password
    }
    return this.http.post<{message: string}>('/actions/createProject', body);
  }

  joinProject(code: string, password: string) {
    const body = {
      code: code,
      password: password
    }
    return this.http.post<{message: string}>('/actions/joinProject', body);
  }

  showDetails(id: string) {
    return this.http.get<Project>(`/project/showDetails?id=${id}`);
  }

  listMembers(id: string) {
    return this.http.get<{usernames: Array<string>, roles: Array<number>}>(`/project/listMembers?id=${id}`);
  }

  changeRole(id: number, username: string, newRole: number) {
    const body = {
      'id': id,
      'param1': username,
      'param2': newRole.toString()
    }
    return this.http.put<{message: string}>('/project/changeRole', body);
  }
}
