import {Component, OnInit} from '@angular/core';
import { Project } from "../../models/project";
import { ActivatedRoute } from "@angular/router";
import { showInfo } from "../../sweetalert/alerts";
import { ProjectService } from "../../services/project.service";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit {

  protected project!: Project;
  protected showDetails = true;
  protected showMembers = false;
  protected showTasks = false;

  constructor(private projectService: ProjectService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.projectService.showDetails(<string> this.route.snapshot.paramMap.get('id')).subscribe({
      next: data => this.project = data,
      error: err => showInfo('error', err.error)
    });
  }

  protected changeState(type: string) {
    if (type === 'stateTasks') {
      this.showTasks = true;
      this.showMembers = false;
      this.showDetails = false;
    } else if (type === 'stateMembers') {
      this.showMembers = true;
      this.showTasks = false;
      this.showDetails = false;
    } else {
      this.showDetails = true;
      this.showTasks = false;
      this.showMembers = false;
    }
  }

  protected statusToString(state: number | null) {
    if (state === 3) return 'Not started';
    if (state === 2) return 'Active';
    if (state === 1) return 'Paused';
    return 'Ended';
  }

}
