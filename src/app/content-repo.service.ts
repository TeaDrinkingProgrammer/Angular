import { Injectable } from '@angular/core';
import { Content, ContentInterface, ContentType } from 'src/content';
@Injectable({
  providedIn: 'root'
})

export class ContentRepoService {
  private contentList : Content[];
  constructor() {
    this.contentList = [
      {id: 0, name: "No Hay Tos",
        tags: ["native","real conversation", "for learners"], 
        inProduction: true,
        language: "Spanish", 
        platforms: new Map([["Spotify","https://open.spotify.com/show/24Zc3LPwIH1nnqUbhWY2T0"]]),
        contentInterface: ContentInterface.Either,
        contentType: ContentType.Podcast,
        websiteLink: "https://www.nohaytospodcast.com/"
      }
      ,
      {id: 1, name: "Spain Revealed",
      tags: ["spain", "culture","madrid"],
      inProduction: true,
      platforms: new Map([["Youtube","https://www.youtube.com/c/JamesBlick/"]]),
      contentInterface: ContentInterface.Video,
      contentType: ContentType.Videos,
      language: "English"
    }]
   }
   setOption(id : number, value : any) {      
    this.contentList[id] = value;  
  }  
  pushItem(item : Content){
    this.contentList.push(item);
  }
  getForId(id : number){
    return this.contentList.find((x) => x.id = id);
  }
  
  getOption() {  
    return this.contentList;  
  }  
}
