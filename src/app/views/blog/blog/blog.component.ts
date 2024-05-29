import { Component, OnInit } from '@angular/core';
import {ArticleService} from "../../../shared/services/article.service";
import {CategoryResponseType} from "../../../../types/category-response.type";
import {ArticlesWithPagesResponseType} from "../../../../types/articles-with-pages-response.type";
import {ActiveParamsType} from "../../../../types/active-params.type";
import {ActivatedRoute, Router} from "@angular/router";
import {AppliedFilterType} from "../../../../types/applied-filter.type";
import {debounceTime} from "rxjs";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  activeParams: ActiveParamsType = {categories: []};
  appliedFilters: AppliedFilterType[] = [];
  articles: ArticlesWithPagesResponseType | null = null;
  filterOpen: boolean = false;
  categories: CategoryResponseType[] = [];
  pages: number[] = [];
  constructor(private articleService: ArticleService,
              private router: Router,
              private activatedRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    this.articleService.getCategoriesArticle()
      .subscribe({
        next: (data: CategoryResponseType[]) => {
          this.categories = data;

          this.activatedRoute.queryParams
            .pipe(
              debounceTime(500)
            )
            .subscribe(params => {
              if (params.hasOwnProperty('page')) {
                this.activeParams.page = +params['page'];
              }
              if (params.hasOwnProperty('categories')) {
                this.activeParams.categories = Array.isArray(params['categories']) ? params['categories'] : [params['categories']];
              }

              this.appliedFilters = [];
              this.activeParams.categories.forEach(url => {
                this.categories.forEach(category => {
                  if (category.url === url) {
                    this.appliedFilters.push({
                      name: category.name,
                      urlParam: category.url,
                    });
                  }
                })
              });

              this.articleService.getArticles(this.activeParams)
                .subscribe({
                  next: (data) => {
                    this.pages = [];
                    for (let i = 1; i <= data.pages; i++) {
                      this.pages.push(i);
                    }

                    this.articles = data;
                  }
                })
            });
        }
      });
  }

  openPage(page: number) {
    this.activeParams.page = page;
    this.router.navigate(['/blog'], {
      queryParams: this.activeParams
    });
  }

  openNextPage() {
    if (this.activeParams.page && this.activeParams.page < this.pages.length) {
      this.activeParams.page++;
      this.router.navigate(['/blog'], {
        queryParams: this.activeParams
      });
    }
  }

  openPrevPage() {
    if (this.activeParams.page && this.activeParams.page > 1) {
      this.activeParams.page--;
      this.router.navigate(['/blog'], {
        queryParams: this.activeParams
      });
    }
  }

  removeAppliedFilter(appliedFilter: AppliedFilterType) {
    this.activeParams.categories = this.activeParams.categories.filter(category => category !== appliedFilter.urlParam);
    this.categories.forEach(category => {
      if (category.url === appliedFilter.urlParam) {
        category.active = false;
        this.appliedFilters = this.appliedFilters.filter(filter => filter.urlParam !== appliedFilter.urlParam);
      }
    });
    this.activeParams.page = 1;
    this.router.navigate(['/blog'], {queryParams: this.activeParams});
  }

  toggleFilter() {
    this.filterOpen = !this.filterOpen;
  }

  updateFilter(url: string) {
    this.categories.forEach(category => {
      if (category.url === url) {
        category.active = !category.active;

        if (category.active) {
          this.appliedFilters.push({
            name: category.name,
            urlParam: category.url
          });
          if (this.activeParams.categories && this.activeParams.categories.length > 0) {
            const existingCategoryInParams = this.activeParams.categories.find(categoryInParams => categoryInParams === category.url);
            if (existingCategoryInParams) {
              this.activeParams.categories = this.activeParams.categories.filter(param => param !== category.url);
            } else {
              this.activeParams.categories = [...this.activeParams.categories, category.url];
            }
          } else {
            this.activeParams.categories = [category.url];
          }
        } else {
          this.appliedFilters = this.appliedFilters.filter(filter => filter.urlParam !== category.url);
          this.activeParams.categories = this.activeParams.categories.filter(param => param !== category.url);
        }
      }
    });

    this.activeParams.page = 1;
    this.router.navigate(['/blog'], {queryParams: this.activeParams});
  }
}
