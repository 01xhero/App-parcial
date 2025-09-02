import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface INews {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: { name: string };
}

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private apiKey = '3f6995bfd7934bc5ba1a96086afdf10d'; // 🔹 reemplázala
  private apiUrl = 'https://newsapi.org/v2/top-headlines?country=us';

  constructor(private http: HttpClient) {}

  // 🔹 Ahora acepta paginación
  getNews(page: number = 1, category: string = 'general'): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}&category=${category}&page=${page}&pageSize=10&apiKey=${this.apiKey}`
    );
}
}
