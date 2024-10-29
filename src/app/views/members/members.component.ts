import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProjectService } from "../../services/project.service";
import { showInfo } from "../../sweetalert/alerts";

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrl: './members.component.css'
})
export class MembersComponent implements OnInit {

  @Input() id!: number;
  @Output() directionEvent = new EventEmitter<string>();
  protected usernamesWithRoles!: { usernames: Array<string>, roles: Array<number> };

  constructor(private projectService: ProjectService) {}

  ngOnInit() {
    this.loadMembers();
  }

  protected goBack() {
    this.directionEvent.emit('stateDetails');
  }

  protected goForward() {
    this.directionEvent.emit('stateTasks')
  }

  protected roleToString(state: number | null) {
    if (state === 2) return 'Admin';
    if (state == 1) return 'Co-Admin';
    return 'Member';
  }

  protected canChange() {
    return localStorage.getItem('username') === this.usernamesWithRoles?.usernames[0];
  }

  protected changeRole(username: string, role: number) {
    this.projectService.changeRole(<number>this.id, username, role).subscribe({
      next: data => {
        showInfo('success', data.message);
        this.loadMembers();
      }, error: err => showInfo('error', err.error)
    })
  }

  private loadMembers() {
    this.projectService.listMembers(this.id!.toString()).subscribe({
      next: data => this.usernamesWithRoles = this.sortByRole(data),
      error: err => showInfo('error', err.error)
    });
  }

  private sortByRole(data: { usernames: Array<string>, roles: Array<number> }): { usernames: Array<string>, roles: Array<number> } {
    const sortedData = data.usernames.map((username, index) => ({
      username: username,
      role: data.roles[index]
    })).sort((a, b) => b.role - a.role);
    return {
      usernames: sortedData.map(item => item.username),
      roles: sortedData.map(item => item.role)
    };
  }
}
