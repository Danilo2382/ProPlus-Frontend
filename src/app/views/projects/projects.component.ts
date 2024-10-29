import { Component, OnInit } from '@angular/core';
import { Project } from "../../models/project";
import { ProjectService } from "../../services/project.service";
import { showInfo } from "../../sweetalert/alerts";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit {

  protected projectsWithRoles: { projects: Array<Project>, roles: Array<number> } | null = null;
  protected showCreateProject: boolean = false;
  protected showJoinProject: boolean = false;
  protected joinForm = new FormGroup({
    code: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });
  protected createForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', Validators.required)
  });

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  private loadProjects() {
    this.projectService.getUserProjects().subscribe( {
      next: data => this.projectsWithRoles = data,
      error: err => {
        showInfo('error', err.error);
      }
    });
  }

  protected createProject() {
    const controls = this.createForm.controls;
    const project = {
      name: <string> controls.name.value,
      description: <string> controls.description.value,
      password: <string> controls.password.value,
      startDate: new Date(<string> controls.startDate.value),
      endDate: new Date(<string> controls.endDate.value),
    } as Project;
    this.projectService.createProject(project).subscribe({
      next: data => {
        showInfo('success', data.message);
        this.loadProjects();
        this.changeState('createProject');
      },
      error: err => showInfo('error', err.error)
    })
}

  protected joinProject() {
    this.projectService.joinProject(<string> this.joinForm.controls.code.value, <string> this.joinForm.controls.password.value).subscribe({
      next: data => {
        showInfo('success', data.message);
        this.loadProjects();
        this.changeState('joinProject');
      },
      error: err => showInfo('error', err.error)
    });
  }

  protected changeState(type: string) {
    if (type === 'createProject') this.showCreateProject = !this.showCreateProject;
    else this.showJoinProject = !this.showJoinProject;
  }

  protected statusToString(state: number | null) {
    if (state === 3) return 'Not started';
    if (state === 2) return 'Active';
    if (state === 1) return 'Paused';
    return 'Ended';
  }

  protected roleToString(state: number | null) {
    if (state === 2) return 'Admin';
    if (state == 1) return 'Co-Admin';
    return 'Member';
  }

  protected getColorByStatus(status: number | null): string {
    switch (status) {
      case 0:
        return '#DC3545';
      case 2:
        return '#198754';
      default:
        return '#FFC107';
    }
  }

  private combineProjectsAndRoles(projects: Array<Project>, roles: Array<number>): { project: Project; role: number }[] {
    return projects.map((project, index) => ({
      project,
      role: roles[index]
    }));
  }

  protected get sortedProjectsAndRoles() {
    return this.combineProjectsAndRoles(this.projectsWithRoles!.projects, this.projectsWithRoles!.roles)
      .sort((a, b) => {
        if (b.role !== a.role) return b.role - a.role;
        return (a.project.status || 0) - (b.project.status || 0);
      });
  }
}
