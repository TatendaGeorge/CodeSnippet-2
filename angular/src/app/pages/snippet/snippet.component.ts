import { AppComponentBase } from 'shared/app-component-base';
import { HttpClient } from '@angular/common/http';
import { SnippetServiceProxy, SnippetListDto } from './../../../shared/service-proxies/service-proxies';
import { NewSnippetComponent } from './new-snippet/new-snippet.component';
import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-snippet',
  templateUrl: './snippet.component.html',
  styleUrls: ['./snippet.component.scss']
})
export class SnippetComponent extends AppComponentBase implements OnInit {

  @ViewChild('newSnippetModal') newSnippetModal: NewSnippetComponent;
  snippets: SnippetListDto[] = [];

  constructor(
    private router: Router,
    private injector: Injector,
    private snippetService: SnippetServiceProxy,
    private http: HttpClient
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.getSnippets();
  }
  getSnippets() {
    this.http.get<any>('http://localhost:21021/api/services/app/Snippet/GetAll')
      .subscribe(response => {
        this.snippets = response.result.items;
      }, error => {
      });
  }

  newSnippet() {
    this.router.navigate(['/snippets/new-snippet'])
    // this.newSnippetModal.show();
  }

  loadCard(id: any) {
    this.router.navigate(['/snippets/', id]);
  }

}
