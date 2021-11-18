import { Injectable } from '@angular/core';
import { delay, filter, from, Observable, of, take } from 'rxjs';
import { Content, ContentInterface, ContentType } from './content.model';
@Injectable({
  providedIn: 'root'
})

export class ContentRepoService {
  private contentList : Content[];
  private contentIdCounter : number = 2;
  constructor() {
    this.contentList = [
      {id: 0, name: "No Hay Tos",
        tags: ["native","real conversation", "for learners"], 
        inProduction: true,
        language: "Spanish", 
        platforms: new Map([["Spotify","https://open.spotify.com/show/24Zc3LPwIH1nnqUbhWY2T0"],["Apple Music","https://podcasts.apple.com/us/podcast/no-hay-tos-real-mexican-spanish/id1360162037"]]),
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
      language: "English",
      targetLanguage: "Spanish"
    }]
   }
   setOption(id : number, value : any) {      
    this.contentList[id] = value;  
  }  
  pushItem(item : Content){
    //TODO: how to make this observable
    item.id = this.contentIdCounter;
    this.contentList.push(item);
    this.contentIdCounter++;
  }
  getForId(id : number) : Observable<Content>{
    return from(this.contentList).pipe(
      filter((item) => item.id === id),
      take(1)
    )
  }
  
  getAll() : Observable<Content[]> {  
    return of(this.contentList);  
  }  
}
