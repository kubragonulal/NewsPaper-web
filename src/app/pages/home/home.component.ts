import { NewsPaperService } from './../../news-paper.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  results: any;
  searchQuery: string = '';
  filteredNews: any[] = [];
  constructor(private NewsPaperService: NewsPaperService) { }

  filterNews(): void {
    this.filteredNews = this.results.articles.filter((article: any) =>
      article.title.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  slides = [
    {
      img: '../../../assets/img/big_img_1.jpg',
      caption: "Editor's Pick",
      title: 'News Needs to Meet Its Audiences Where They Are',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate vero obcaecati natus adipisci necessitatibus eius, enim vel sit ad reiciendis.',
      author: 'Dave Rogers',
      category: 'Food',
      date: 'Jun 14',
      readTime: '3 min read'
    },
    {
      img: '../../../assets/img/1.jpg',
      caption: "Editor's Pick",
      title: 'Another News Story',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate vero obcaecati natus adipisci necessitatibus eius, enim vel sit ad reiciendis.',
      author: 'John Doe',
      category: 'Health',
      date: 'Jun 15',
      readTime: '5 min read'
    }
  ];
  currentSlide = 0;

  ngOnInit() : void {
    this.showSlide(this.currentSlide);
    this.NewsPaperService.getTopHeadlines().subscribe(
      (data) => {
        this.results = data;
        this.filteredNews = this.results.articles;  // Başlangıçta tüm haberleri göster
        console.log(this.results);
      }
    );
  }

  showSlide(index: number) {
    this.currentSlide = index;
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }
}
