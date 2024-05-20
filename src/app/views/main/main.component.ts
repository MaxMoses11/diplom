import { Component, OnInit } from '@angular/core';
import {OwlOptions} from "ngx-owl-carousel-o";
import {ServiceType} from "../../../types/service.type";
import {ArticlesResponseType} from "../../../types/articles-response.type";
import {ArticleService} from "../../shared/services/article.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: false
  }

  reviewsCustomOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    margin: 25,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 3
      }
    },
    nav: false
  }

  sliderInfoItems = [
    {
      promo: "Акция",
      title: "Нужен грамотный <span class='blue-text'>копирайтер</span>?",
      text: "Весь декабрь у нас действует акция на работу копирайтера.",
      image: "slider-item-img2.png"
    },
    {
      promo: "Предложение месяца",
      title: "Продвижение в<br> Instagram для вашего бизнеса <span class='blue-text'>-15%</span>!",
      image: "slider-item-img1.png"
    },
    {
      promo: "Новость дня",
      title: "<span class='blue-text'>6 место</span> в ТОП-10<br> SMM-агенств Москвы!",
      text: "Мы благодарим каждого, кто голосовал за нас!",
      image: "slider-item-img3.png"
    },
  ];

  servicesInfo: ServiceType[] = [
    {
      image: 'service-image1.png',
      service: 'Веб-разработка',
      title: 'Создание сайтов',
      text: 'В краткие сроки мы создадим качественный и самое главное продающий сайт для продвижения Вашего бизнеса!',
      price: 'От 7 500₽',
    },
    {
      image: 'service-image2.png',
      service: 'Продвижение',
      title: 'Продвижение',
      text: 'Вам нужен качественный SMM-специалист или грамотный таргетолог? Мы готовы оказать Вам услугу “Продвижения” на наивысшем уровне!',
      price: 'От 3 500₽',
    },
    {
      image: 'service-image3.png',
      service: 'Реклама',
      title: 'Реклама',
      text: 'Без рекламы не может обойтись ни один бизнес или специалист. Обращаясь к нам, мы гарантируем быстрый прирост клиентов за счёт правильно настроенной рекламы.',
      price: 'От 1 000₽',
    },
    {
      image: 'service-image4.png',
      service: 'Копирайтинг',
      title: 'Копирайтинг',
      text: 'Наши копирайтеры готовы написать Вам любые продающие текста, которые не только обеспечат рост охватов, но и помогут выйти на новый уровень в продажах.',
      price: 'От 750₽',
    },
  ];

  reviewsInfo = [
    {
      image: 'review-img1.png',
      name: 'Станислав',
      text: 'Спасибо огромное АйтиШторму за прекрасный блог с полезными статьями! Именно они и побудили меня углубиться в тему SMM и начать свою карьеру.'
    },
    {
      image: 'review-img2.png',
      name: 'Алёна',
      text: 'Обратилась в АйтиШторм за помощью копирайтера. Ни разу ещё не пожалела! Ребята действительно вкладывают душу в то, что делают, и каждый текст, который я получаю, с нетерпением хочется выложить в сеть.'
    },
    {
      image: 'review-img3.png',
      name: 'Мария',
      text: 'Команда АйтиШторма за такой короткий промежуток времени сделала невозможное: от простой фирмы по услуге продвижения выросла в мощный блог о важности личного бренда. Класс!'
    },
  ]

  articles: ArticlesResponseType[] = [];

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
    this.articleService.getPopularArticles()
      .subscribe((data: ArticlesResponseType[]) => {
          this.articles = data;
        });
  }

}
