import {Component, Input, OnInit} from '@angular/core';
import {ArticleResponseType} from "../../../../types/article-response.type";
import {Router} from "@angular/router";

@Component({
  selector: 'app-article-item',
  templateUrl: './article-item.component.html',
  styleUrls: ['./article-item.component.scss']
})
export class ArticleItemComponent implements OnInit {

  @Input() article!: ArticleResponseType;
  @Input() related: boolean = false;
  pathToImage: string = '/assets/images/articles/';
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigate() {
    this.router.navigate(['/article/' + this.article.url]);
  }
}
