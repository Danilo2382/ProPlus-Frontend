import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ProjectService} from "../../services/project.service";
import {showInfo} from "../../sweetalert/alerts";
import {ProjectRow} from "../../models/project.row";
import {DomSanitizer} from "@angular/platform-browser";
import {take} from "rxjs";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ProjectsComponent implements OnInit {

  projectsRows: ProjectRow[] = []
  filteredProjectsRows: ProjectRow[] = []
  searchQuery: string = ''
  projectCode: string = ''
  projectPassword: string = ''
  isSearchActive: boolean = false
  isCodeInputActive: boolean = false
  isPasswordInputActive: boolean = false
  readonly defaultProfilePicture: string = 'https://img-cdn.pixlr.com/image-generator/history/' +
    '65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp'
  readonly sortOptions = [
    {value: 'name', label: 'Name (A → Z)'},
    {value: 'nameDesc', label: 'Name (Z → A)'},
    {value: 'adminUsername', label: 'Admin (A → Z)'},
    {value: 'adminUsernameD', label: 'Admin (Z → A)'},
    {value: 'role', label: 'Role (Admin → Member)'},
    {value: 'roleDesc', label: 'Role (Member → Admin)'},
    {value: 'status', label: '(Active → Inactive)'},
    {value: 'statusDesc', label: '(Inactive → Active)'}
  ] as const
  readonly headers = [
    {icon: 'bi bi-cast', label: 'Name', class: 'col-md-4 col-sm-5 col-8 ps-3'},
    {icon: 'bi bi-person-workspace', label: 'Admin', class: 'col-md-3 col-4 d-sm-block d-none text-start'},
    {icon: 'bi bi-incognito', label: 'Role', class: 'col-md-2 col-sm-3 col-4 text-md-start text-end'},
    {icon: 'bi bi-calendar-check', label: 'Status', class: 'col-3 d-md-block d-none pe-3 text-end'},
  ] as const

  constructor(private projectService: ProjectService, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.projectService.getUserProjects().pipe(take(1)).subscribe({
      next: data => {
        this.projectsRows = data
        this.filteredProjectsRows = data
      },
      error: err => showInfo('error', err.error.message)
    })
  }

  joinProject() {
    this.projectService.joinProject(this.projectCode.trim(), this.projectPassword.trim()).subscribe({
      next: result => this.filteredProjectsRows.push(result),
      error: err => showInfo('error', err.error.message)
    })
  }

  sortProjects(event: Event): void {
    const selectElement = event.target as HTMLSelectElement
    const criteria = selectElement.value
    const sortCriteria: { [key: string]: (a: ProjectRow, b: ProjectRow) => number } = {
      'name': (a, b) => b.name.localeCompare(a.name),
      'nameDesc': (a, b) => a.name.localeCompare(b.name),
      'adminUsername': (a, b) => b.adminUsername.localeCompare(a.adminUsername),
      'adminUsernameDesc': (a, b) => a.adminUsername.localeCompare(b.adminUsername),
      'role': (a, b) => b.userRole - a.userRole,
      'roleDesc': (a, b) => a.userRole - b.userRole,
      'status': (a, b) => b.status - a.status,
      'statusDesc': (a, b) => a.status - b.status,
    }
    this.filteredProjectsRows = [...this.filteredProjectsRows].sort(sortCriteria[criteria] || (() => 0))
  }

  searchProjects(): void {
    const trimmedQuery = this.searchQuery.trim();
    if (!trimmedQuery) {
      this.filteredProjectsRows = [...this.projectsRows]
      return
    }
    const regExp = new RegExp(this.escapeRegExp(trimmedQuery), 'gi')
    this.filteredProjectsRows = this.projectsRows
      .reduce((acc, project) => {
        const relevance = (project.name.match(regExp) || []).length
        if (relevance > 0) {
          acc.push({
            ...project,
            name: project.name.replace(regExp, match => `<mark>${match}</mark>`),
            relevance
          })
        }
        return acc
      }, [] as (ProjectRow & {relevance: number})[])
      .sort((a, b) => b.relevance - a.relevance)
      .map(({relevance, ...project}) => project)
  }

  private escapeRegExp(text: string): string {
    return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  }

  statusToIcon(state: number): any {
    const statusMap: { [key: number]: { color: string, icon: string } } = {
      3: { color: '#D99841', icon: 'bi-hourglass-split' },
      2: { color: '#5B8A72', icon: 'bi-check-circle-fill' },
      1: { color: '#4A6792', icon: 'bi-pause-circle-fill' },
      0: { color: '#8B3A3A', icon: 'bi-slash-circle' },
    };
    const { color, icon } = statusMap[state];
    return this.sanitizer.bypassSecurityTrustHtml(
      `<i class="bi ${icon}" style="color: ${color}; font-size: 1.2rem;"></i>`
    );
  }

  roleToString(state: number) {
    return state === 2 ? 'Admin' : state === 1 ? 'Co-Admin' : 'Member'
  }

}
