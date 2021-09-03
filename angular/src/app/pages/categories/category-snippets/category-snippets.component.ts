import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-snippets',
  templateUrl: './category-snippets.component.html',
  styleUrls: ['./category-snippets.component.scss']
})
export class CategorySnippetsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  Back() {
    this.router.navigate(['/categories/'])
  }

  loadValues() {
    this.router.navigate(['categories/category-details/'])
  }

}
