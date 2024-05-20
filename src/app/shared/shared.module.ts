import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainCarouselItemComponent} from './components/main-carousel-item/main-carousel-item.component';
import { MainServicesItemComponent } from './components/main-services-item/main-services-item.component';
import { ArticleItemComponent } from './components/article-item/article-item.component';


@NgModule({
    declarations: [
        MainCarouselItemComponent,
        MainServicesItemComponent,
        ArticleItemComponent,
    ],
    imports: [
        CommonModule
    ],
  exports: [
    MainCarouselItemComponent,
    MainServicesItemComponent,
    ArticleItemComponent,
  ]
})
export class SharedModule {
}
