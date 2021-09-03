import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HighlightResult } from 'ngx-highlightjs';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss']
})
export class CategoryDetailsComponent implements OnInit {

  response: HighlightResult;
  code = `// Instantiate random number generator
  private readonly Random _random = new Random();

  // Generates a random number within a range
  public int RandomNumber(int min, int max)
  {
    return _random.Next(min, max);
  }`;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  Back() {
    this.router.navigate(['/categories/category-snippets/'])
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
