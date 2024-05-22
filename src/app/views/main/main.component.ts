import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {OwlOptions} from "ngx-owl-carousel-o";
import {ServiceType} from "../../../types/service.type";
import {ArticlesResponseType} from "../../../types/articles-response.type";
import {ArticleService} from "../../shared/services/article.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {RequestService} from "../../shared/services/request.service";
import {RequestParamType} from "../../../types/request-param.type";
import {RequestType} from "../../../types/request.type";
import {DefaultResponseType} from "../../../types/default-response.type";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  @ViewChild('popup') popup!: TemplateRef<ElementRef>;
  dialogRef: MatDialogRef<any> | null = null;
  requestStatus: boolean = false;
  requestError: boolean = false;

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
      id: 'dev',
      image: 'service-image1.png',
      service: 'Веб-разработка',
      title: 'Создание сайтов',
      text: 'В краткие сроки мы создадим качественный и самое главное продающий сайт для продвижения Вашего бизнеса!',
      price: 'От 7 500₽',
    },
    {
      id: 'smm',
      image: 'service-image2.png',
      service: 'Продвижение',
      title: 'Продвижение',
      text: 'Вам нужен качественный SMM-специалист или грамотный таргетолог? Мы готовы оказать Вам услугу “Продвижения” на наивысшем уровне!',
      price: 'От 3 500₽',
    },
    {
      id: 'add',
      image: 'service-image3.png',
      service: 'Реклама',
      title: 'Реклама',
      text: 'Без рекламы не может обойтись ни один бизнес или специалист. Обращаясь к нам, мы гарантируем быстрый прирост клиентов за счёт правильно настроенной рекламы.',
      price: 'От 1 000₽',
    },
    {
      id: 'copy',
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

  modalForm = this.fb.group({
    service: ['copy', Validators.required],
    name: ['', Validators.required],
    phone: ['', Validators.required]
  });

  constructor(private articleService: ArticleService,
              private dialog: MatDialog,
              private fb: FormBuilder,
              private router: Router,
              private _snackBar: MatSnackBar,
              private requestService: RequestService) { }

  ngOnInit(): void {
    this.articleService.getPopularArticles()
      .subscribe((data: ArticlesResponseType[]) => {
          this.articles = data;
        });
  }

  orderRequest(id: string) {
    if (id) {
      this.dialogRef = this.dialog.open(this.popup);
      this.modalForm.get('service')?.setValue(id);
      this.dialogRef.backdropClick()
          .subscribe(() => {
            this.requestStatus = false;
          });
    }
  }

  closePopup() {
    this.dialogRef?.close();
    this.requestStatus = false;
    this.modalForm.markAsUntouched();
  }

  makeRequest() {
    if (this.modalForm.valid) {
      if (this.modalForm.value.name && this.modalForm.value.phone && this.modalForm.value.service) {
        const reqParam: RequestParamType = {
          name: this.modalForm.value.name,
          phone: this.modalForm.value.phone,
          service: this.modalForm.value.service,
          type: RequestType.consultation
        };

        this.requestService.newRequest(reqParam)
            .subscribe({
              next: (data: DefaultResponseType) => {
                if (data.error) {
                  this._snackBar.open(data.message);
                  this.requestError = true;
                  throw new Error(data.message);
                }

                this.requestStatus = true;
                this.requestError = false;
                this.modalForm.get('name')?.setValue('');
                this.modalForm.get('phone')?.setValue('');
                this.modalForm.get('service')?.setValue('copy');
                this.modalForm.markAsPristine();
                this.modalForm.markAsUntouched();
              },
              error: errorResponse => {
                if (errorResponse.error && errorResponse.error.message) {
                  this._snackBar.open(errorResponse.error.message);
                  this.requestError = true;
                } else {
                  this._snackBar.open('Ошибка сохранения');
                }
              }
            });
      }
    } else {
      this.modalForm.markAllAsTouched();
    }
  }
}
