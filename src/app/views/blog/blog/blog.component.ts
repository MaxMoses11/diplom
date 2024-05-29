import { Component, OnInit } from '@angular/core';
import {ArticleService} from "../../../shared/services/article.service";
import {CategoryResponseType} from "../../../../types/category-response.type";
import {ArticlesWithPagesResponseType} from "../../../../types/articles-with-pages-response.type";
import {ActiveParamsType} from "../../../../types/active-params.type";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  activeParams: ActiveParamsType = {types: []};
  articles: ArticlesWithPagesResponseType | null = null;
  sortingOpen: boolean = false;
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
        }
      });

    this.activatedRoute.queryParams
      .subscribe(params => {
        if (params.hasOwnProperty('page')) {
          this.activeParams.page = +params['page'];
        }

        this.articleService.getArticles(this.activeParams)
          .subscribe({
            next: (data) => {
              this.pages = [];
              for (let i = 1; i <= data.pages; i++) {
                this.pages.push(i);
              }

              this.articles = data;
              console.log(this.activeParams);
            }
          })
      });
  }

  toggleSorting() {
    this.sortingOpen = !this.sortingOpen;
  }

  setFilter(url: string) {
    this.categories.forEach(item => {
      if (item.url === url) {
        item.active = !item.active;
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

}
