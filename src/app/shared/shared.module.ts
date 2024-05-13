import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainCarouselItemComponent} from './components/main-carousel-item/main-carousel-item.component';


@NgModule({
    declarations: [
        MainCarouselItemComponent,
    ],
    imports: [
        CommonModule
    ],
    exports: [
        MainCarouselItemComponent,
    ]
})
export class SharedModule {
}
