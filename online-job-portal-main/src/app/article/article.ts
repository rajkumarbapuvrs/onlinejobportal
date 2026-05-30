import { Component, inject, signal, OnInit } from '@angular/core';
import { ArticleService } from '../article/article.service';
import { ArticleModel } from '../article/articleModel';
@Component({
  selector: 'app-article',
  imports: [],
  templateUrl: './article.html',
  styleUrl: './article.css',
})
export class ArticleComponent {
  private articleService = inject(ArticleService);
  articles: Array<ArticleModel> = [];

   ngOnInit(): void {
    // CRUD for learning
    this.articleService.fetchData().subscribe(data => {
      this.articles = data;
      console.log("articles-----", this.articles);
    });

    this.articleService.saveData({id:0,title:'A',category:'AD'}).subscribe(data => {
      var d=data;
    });

    this.articleService.updateData({id:4,title:'A5',category:'AD5'}).subscribe(data => {
      var d=data;
    });

    this.articleService.deleteData(10).subscribe(data => {
      var d=data;
    });
  }
}
