import { NewsPaperService } from './../../news-paper.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent  implements OnInit{
  results: any;
  searchQuery: string = '';
  filteredNews: any[] = [];
  category: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  paginatedNews: any[] = [];

  constructor(private NewsPaperService: NewsPaperService) { }

  ngOnInit(): void {
    this.getFilteredNews();
  }

  getFilteredNews(): void {
    this.NewsPaperService.getFilteredNews(this.category).subscribe(
      (data) => {
        this.results = data;
        this.filteredNews = this.results.articles;
        this.updatePaginatedNews();
      }
    );
  }

  searchNews(): void {
    if (this.searchQuery) {
      this.filteredNews = this.results.articles.filter((article: any) =>
        article.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredNews = this.results.articles;
    }
    this.updatePaginatedNews();
  }

  updatePaginatedNews(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedNews = this.filteredNews.slice(start, end);
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.updatePaginatedNews();
  }

  get totalPages(): number {
    return Math.ceil(this.filteredNews.length / this.itemsPerPage);
  }

}
