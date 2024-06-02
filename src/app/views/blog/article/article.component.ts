import {Component, OnInit} from '@angular/core';
import {ArticleService} from "../../../shared/services/article.service";
import {ActivatedRoute} from "@angular/router";
import {ArticleResponseType} from "../../../../types/article-response.type";
import {AuthService} from "../../../core/auth/auth.service";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  isLogged: boolean = false;
  article!: ArticleResponseType;
  pathToImage: string = '/assets/images/articles/';
  relatedArticles: ArticleResponseType[] = [];
  constructor(private activatedRoute: ActivatedRoute,
              private articleService: ArticleService,
              private authService: AuthService,) {
    this.isLogged = this.authService.getIsLogged();
  }

  ngOnInit(): void {
    this.authService.isLogged$.subscribe((isLoggedIn: boolean) => {
      this.isLogged = isLoggedIn;
    });

    this.activatedRoute.params.subscribe(params => {
      this.articleService.getArticle(params['url'])
        .subscribe(data => {
          this.article = data;

          this.articleService.getRelatedArticles(params['url'])
            .subscribe(articles => {
              this.relatedArticles = articles;
            });
        });
    });
  }

  addComment() {

  }

}
