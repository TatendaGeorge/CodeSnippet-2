import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { SnippetListDto, SnippetServiceProxy } from '@shared/service-proxies/service-proxies';
import { HighlightResult } from 'ngx-highlightjs';

@Component({
  selector: 'app-snippet-details',
  templateUrl: './snippet-details.component.html',
  styleUrls: ['./snippet-details.component.scss']
})
export class SnippetDetailsComponent extends AppComponentBase implements OnInit {

  snippet: SnippetListDto;
  snippetId: any;
  response: HighlightResult;
  relatedSnippets: SnippetListDto[] = [];
  code = "";
  colors = [
    { color: "bg-soft-primary text-primary" },
    { color: "bg-soft-success text-success" },
    { color: "bg-soft-warning text-warning" },
    { color: "bg-soft-info text-info" },
  ];
  randColor: any;

  constructor(
    private router: Router,
    private injector: Injector,
    private http: HttpClient,
    private snippetService: SnippetServiceProxy,
    private activatedRoute: ActivatedRoute,
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.snippetId = this.activatedRoute.snapshot.paramMap.get('id');
    this.getSnippet(this.snippetId);
    this.getRelated(this.snippetId);
  }

  getRelated(id: any) {
    this.randColor = this.colors[Math.floor(Math.random() * this.colors.length)];
    console.log(this.randColor);

    this.http.get<any>('http://localhost:21021/api/services/app/Snippet/GetRelated?id=' + id)
      .subscribe(response => {
        this.relatedSnippets = response.result.items;

        const obj = Object.assign(this.relatedSnippets, this.randColor);

      }, error => {
        console.log(error);
      });
  }

  getSnippet(id: any) {
    this.http.get<any>('http://localhost:21021/api/services/app/Snippet/Get?id=' + id)
      .subscribe((response) => {
        this.snippet = response.result;
        this.code = response.result?.code;
      }, error => {
      })
  }

  Back() {
    this.router.navigate(['/snippets/']);
  }

  loadSnippet(id: any) {
    console.log('here');
    this.router.navigate(['/snippets/', id]);
  }

  edit(id: any) {
    this.router.navigate(['/snippets/edit/', id]);
  }

  delete(snippet: SnippetListDto) {
    abp.message.confirm(`Do you really want to delete ${snippet.name} snippet?`, 'Are you sure?', (results) => {
      if (results) {
        console.log('Successfully deleted category');
        this.snippetService.delete(snippet.id)
          .subscribe(() => {
            abp.notify.success('Successfully deleted snippet', snippet.name);
            this.router.navigate(['/snippets/']);
          })
      }
    })
  }

  onHighlight(e: any) {
    this.response = {
      language: e.language,
      second_best: '{...}',
      top: '{...}',
      value: '{...}'
    }
  }
}
