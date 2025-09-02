import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewsService, INews } from 'src/app/shared/service/new-service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  news: INews[] = [];
  page = 1;
  loading = false;
  category = 'general';

  constructor(
    private newsService: NewsService,
    private router: Router,
    private appComponent: AppComponent
  ) {}

  ngOnInit() {
    this.loadNews();

    // 🔹 Escuchar cambios de categoría desde el menú
    this.appComponent.categorySelected$.subscribe((cat) => {
      this.category = cat;
      this.page = 1;
      this.news = [];
      this.loadNews();
    });
  }

  loadNews(event?: any) {
    if (this.loading) return;
    this.loading = true;

    this.newsService.getNews(this.page, this.category).subscribe({
      next: (res) => {
        this.news = [...this.news, ...res.articles];
        this.page++;
        this.loading = false;
        if (event) event.target.complete();
      },
      error: (err) => {
        console.error('Error cargando noticias:', err);
        this.loading = false;
        if (event) event.target.complete();
      },
    });
  }

  goToProfile() {
    this.router.navigate(['/profiles']);
  }
}
