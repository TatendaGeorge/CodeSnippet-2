import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HighlightResult } from 'ngx-highlightjs';

@Component({
  selector: 'app-all-snippets',
  templateUrl: './all-snippets.component.html',
  styleUrls: ['./all-snippets.component.scss']
})
export class AllSnippetsComponent implements OnInit {

  response: HighlightResult;
  code = `// Instantiate random number generator
  private readonly Random _random = new Random();

  // Generates a random number within a range
  public int RandomNumber(int min, int max)
  {
    return _random.Next(min, max);
  }`;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  Back() {
    this.router.navigate(['/snippets/snippet/'])
  }

  onHighlight(e: any) {
    this.response = {
      language: e.language,
      relevance: e.relevance,
      second_best: '{...}',
      top: '{...}',
      value: '{...}'
    }
  }

}
