import {Component, Input, OnInit} from '@angular/core';
import {ArticlesResponseType} from "../../../../types/articles-response.type";
import {Router} from "@angular/router";

@Component({
  selector: 'app-article-item',
  templateUrl: './article-item.component.html',
  styleUrls: ['./article-item.component.scss']
})
export class ArticleItemComponent implements OnInit {

  @Input() article!: ArticlesResponseType;
  pathToImage: string = '/assets/images/articles/';
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigate() {
    this.router.navigate(['/article/' + this.article.url]);
  }
}
