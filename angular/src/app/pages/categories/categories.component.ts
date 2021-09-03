import { AppComponentBase } from '@shared/app-component-base';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { HttpClient } from '@angular/common/http';
import { CategoryDto, CategoryServiceProxy, ListCategoryDto } from '@shared/service-proxies/service-proxies';
import { Router } from '@angular/router';
import { NewCategoryComponent } from './new-category/new-category.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewChild, Injector } from '@angular/core';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent extends AppComponentBase implements OnInit {
  @ViewChild('newCategoryModal') newCategoryModal: NewCategoryComponent;
  @ViewChild('editCategoryModal') editCategoryModal: EditCategoryComponent;

  categories: CategoryDto[] = [];

  constructor(
    private injector: Injector,
    private router: Router,
    private categoriesService: CategoryServiceProxy,
    private http: HttpClient) {
    super(injector);
  }

  ngOnInit(): void {
    // this.categoriesService.get('15AB7842-6286-4C1E-F3A2-08D96189064A').subscribe((response) => {
    //   // this.categories = response.items;
    //   console.log(response);
    // })
    this.getCategories();
  }

  getCategories() {
    this.http.get<any>('http://localhost:21021/api/services/app/Category/GetAll')
      .subscribe(data => {
        this.categories = data.result.items;
      });
  }

  loadSnippets() {
    this.router.navigate(['categories/category-snippets/'])
  }

  newCategory() {
    this.newCategoryModal.show();
  }

  editCategory(category: CategoryDto) {
    this.editCategoryModal.show(category);
  }

  delete(category: CategoryDto) {
    abp.message.confirm(`Do you really want to delete ${category.categoryType} category?`, 'Are you sure?', (results) => {
      if (results) {
        console.log('Successfully deleted category');
        this.categoriesService.delete(category.id)
          .subscribe(() => {
            abp.notify.success('Successfully deleted category', category.categoryType)
          })
      }
    })
  }
}
