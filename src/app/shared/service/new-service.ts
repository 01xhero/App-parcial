import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface INews {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    name: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private apiUrl = 'https://newsapi.org/v2/top-headlines?country=us';
  private apiKey = '7c5a3ad6ca0343caab923836bc7f0e56'; // 🔹 pon aquí tu clave

  constructor(private http: HttpClient) {}

  getNews(): Observable<{ articles: INews[] }> {
    const headers = new HttpHeaders({
      'X-Api-Key': this.apiKey, // 🔹 NewsAPI requiere header o query param
    });
    return this.http.get<{ articles: INews[] }>(this.apiUrl, { headers });
  }
}
