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

  constructor(
    private newsService: NewsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.newsService.getNews().subscribe({
      next: (res) => {
        this.news = res.articles; // 🔹 asignamos los artículos
      },
      error: (err) => {
        console.error('Error cargando noticias:', err);
      },
    });
  }

  goToProfile() {
    this.router.navigate(['/profiles']); // 🔹 ruta de tu página de perfil
  }
}
