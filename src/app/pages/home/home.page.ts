import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewsService, INews } from 'src/app/shared/service/new-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  news: INews[] = [];
  page = 1; // 🔹 página actual
  pageSize = 5; // 🔹 cuántas noticias por tanda
  totalResults = 0;

  constructor(
    private newsService: NewsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadNews();
  }

  loadNews(event?: any) {
    this.newsService.getNews(this.page, this.pageSize).subscribe({
      next: (res) => {
        this.totalResults = res.totalResults;
        this.news = [...this.news, ...res.articles]; // 🔹 append
        this.page++;

        if (event) event.target.complete();

        // 🔹 desactiva scroll cuando no haya más
        if (this.news.length >= this.totalResults && event) {
          event.target.disabled = true;
        }
      },
      error: (err) => {
        console.error('Error cargando noticias:', err);
        if (event) event.target.complete();
      },
    });
  }

  goToProfile() {
    this.router.navigate(['/profiles']);
  }
}
