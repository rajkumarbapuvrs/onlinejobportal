import { Component, ViewChild } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

//import { ChangeEvent } from '@ckeditor/ckeditor5-angular';

@Component({
  selector: 'app-jobedit',
  imports: [CKEditorModule],
  templateUrl: './jobedit.html',
  styleUrl: './jobedit.css',
})
export class Jobedit {
  @ViewChild('myEditor') myEditor: any;
  private editorInstance: any;
  editor = ClassicEditor as any;
  data: any = `<p>Hello, world!</p>`;
  saveArticle() {
    console.log(this.getArticleContent());
  }

  private getArticleContent() {
    if (this.myEditor && this.myEditor.editorInstance) {
      return this.myEditor.editorInstance.getData();
    }

    return '';
  }
}
