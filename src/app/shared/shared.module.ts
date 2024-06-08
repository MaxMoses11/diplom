import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainCarouselItemComponent} from './components/main-carousel-item/main-carousel-item.component';
import { MainServicesItemComponent } from './components/main-services-item/main-services-item.component';
import { ArticleItemComponent } from './components/article-item/article-item.component';
import { CommentComponent } from './components/comment/comment.component';
import { LoaderComponent } from './components/loader/loader.component';


@NgModule({
    declarations: [
        MainCarouselItemComponent,
        MainServicesItemComponent,
        ArticleItemComponent,
        CommentComponent,
        LoaderComponent,
    ],
    imports: [
        CommonModule
    ],
    exports: [
        MainCarouselItemComponent,
        MainServicesItemComponent,
        ArticleItemComponent,
        CommentComponent,
        LoaderComponent,
    ]
})
export class SharedModule {
}
