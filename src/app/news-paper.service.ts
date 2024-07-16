import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class NewsPaperService {
  private apiUrl = 'https://newsapi.org/v2/top-headlines';
  private apiKey = '676f017549224f488970f1835f9db971';

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  getTopHeadlines(): Observable<any> {
    const usUrl = `${this.apiUrl}?country=us&apiKey=${this.apiKey}`;
    const trUrl = `${this.apiUrl}?country=tr&apiKey=${this.apiKey}`;

    return forkJoin({
      us: this.http.get(usUrl),
      uk: this.http.get(usUrl),
      tr: this.http.get(trUrl)
    }).pipe(
      map((results: any) => {
        // Combine US and TR articles
        return {
          articles: [...results.us.articles,...results.uk.articles ,...results.tr.articles]
        };
      })
    );
  }

  getFilteredNews(category: string, country: string = 'us'): Observable<any> {
    const url = `${this.apiUrl}?country=${country}&category=${category}&apiKey=${this.apiKey}`;
    return this.http.get<any>(url);
  }
  }



