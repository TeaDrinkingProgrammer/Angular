import { Component, OnInit } from '@angular/core';
import { ContentRepoService } from 'src/app/content-repo.service';
import { Content, ContentInterface, ContentType } from 'src/content';
// interface Content {
//   id: number;
//   name: string;
//   tags: string[];
//   inProduction: boolean;
//   platforms: string [][]
//   contentInterface: ContentInterface
//   contentType: ContentType
//   websiteLink?: string | null;
//   // socialLinks?: string[]
//   language: string;
//   targetLanguage?: string;
// }
// enum ContentInterface {
//   Video = "video", 
//   Audio = "audio", 
//   Either = "both audio and video"
// }
// enum ContentType{
//   Podcast = "Podcast", 
//   Movie = "Movie", 
//   Serie = "Serie", 
//   Videos = "Videos"
// }
@Component({
  selector: 'app-user-list',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.sass']
})

export class ContentListComponent implements OnInit {
  contentList: Content[] | undefined
  private _contentRepo : ContentRepoService;
  constructor(contentRepo : ContentRepoService) {
    this._contentRepo = contentRepo;
   }

  ngOnInit(): void {
    //doesn't work, changes all to one when going from 1 contentdetail to contentlist
    this.contentList = this._contentRepo.getOption();
  }

}
