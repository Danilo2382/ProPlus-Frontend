import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Project } from "../models/project";
import {AppConstants} from "../constants/app.constants";
import {ProjectRow} from "../models/project.row";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  getUserProjects() {
    return this.http.get<Array<ProjectRow>>(AppConstants.ACTION_PROJECTS_API_URL);
  }

  createProject(project: Project) {
    return this.http.post<{message: string}>(AppConstants.ACTION_CREATE_PROJECT_API_URL, project);
  }

  joinProject(code: string, password: string) {
    return this.http.post<ProjectRow>(AppConstants.ACTION_JOIN_PROJECT_API_URL, {code: code, password: password});
  }

  showDetails(id: string) {
    return this.http.get<Project>(AppConstants.PROJECT_SHOW_API_URL + `${id}`);
  }

  listMembers(id: string) {
    return this.http.get<{projectMember: {id: number; role: number}; username: string}[]>(AppConstants.PROJECT_MEMBERS_API_URL + `${id}`);
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
