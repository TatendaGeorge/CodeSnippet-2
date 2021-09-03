import { AppComponentBase } from '@shared/app-component-base';
import { SnippetListDto, UserDto } from './../../../../shared/service-proxies/service-proxies';
import { HttpClient } from '@angular/common/http';
import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { messageData, activities, tasks, projectData } from './data';

import { Message, Activity, Tasks, List } from './profile.model';
import { AppComponent } from '@app/app.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
/**
 * Profile-component - handling profile with sidenav-content
 */
export class ProfileComponent extends AppComponentBase implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;

  messageData: Message[];
  activities: Activity[];
  tasks: Tasks[];
  projectData: List[];

  userId: any;
  user: UserDto;
  snippets: SnippetListDto[] = [];

  constructor(
    private injector: Injector,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
  ) {
    super(injector);
  }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Shreyu', path: '/' }, { label: 'Pages', path: '/' }, { label: 'Profile', active: true }];
    this._fetchData();

    this.userId = this.activatedRoute.snapshot.paramMap.get('id');
    this.getUser(this.userId);
    this.getSnippets(this.userId);
  }

  getUser(id: any) {
    this.http.get<any>('http://localhost:21021/api/services/app/User/GetUser?id=' + id)
      .subscribe(response => {
        this.user = response.result;
        console.log(this.user);

      });
  }

  getSnippets(id: any) {
    this.http.get<any>('http://localhost:21021/api/services/app/Snippet/GetAllByUser?id=' + id)
      .subscribe(response => {
        this.snippets = response.result.items;
        console.log(this.snippets);
      });
  }

  newSnippet() {
    this.router.navigate(['/snippets/new-snippet']);
  }

  edit(id: any) {
    this.router.navigate(['/snippets/edit/', id]);
  }

  private _fetchData() {
    this.messageData = messageData;
    this.activities = activities;
    this.tasks = tasks;
    this.projectData = projectData;
  }
}
