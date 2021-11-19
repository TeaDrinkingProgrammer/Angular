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
        tags: ["native","south american spanish","real conversation", "for learners"], 
        inProduction: true,
        language: "Spanish", 
        platforms: new Map([["Spotify","https://open.spotify.com/show/24Zc3LPwIH1nnqUbhWY2T0"],["Apple Music","https://podcasts.apple.com/us/podcast/no-hay-tos-real-mexican-spanish/id1360162037"]]),
        contentInterface: ContentInterface.Either,
        contentType: ContentType.Podcast,
        websiteLink: "https://www.nohaytospodcast.com/"
      },
      {id: 1, name: "Spain Revealed",
      tags: ["spain", "culture","madrid"],
      inProduction: true,
      platforms: new Map([["Youtube","https://www.youtube.com/c/JamesBlick/"]]),
      contentInterface: ContentInterface.Video,
      contentType: ContentType.Videos,
      language: "English",
      targetLanguage: "Spanish"
    },
    {id: 2, name: "Spanish after hours",
    tags: ["native", "spanish form Spain","for learners","comprehensible input","roleplay"],
    inProduction: true,
    platforms: new Map([["Youtube","https://www.youtube.com/channel/UCfG2VhlQgy5bHGmkpeKcjVA"]]),
    contentInterface: ContentInterface.Video,
    contentType: ContentType.Videos,
    language: "Spanish"
  },
  {id: 3, name: "Spanish after hours",
  tags: ["native", "spanish form Spain","for learners","comprehensible input","roleplay"],
  inProduction: true,
  platforms: new Map([["Youtube","https://www.youtube.com/channel/UCfG2VhlQgy5bHGmkpeKcjVA"]]),
  contentInterface: ContentInterface.Video,
  contentType: ContentType.Videos,
  language: "Spanish"
},
{id: 4, name: "Easy Spanish",
  tags: ["native", "mixed regions","for learners","subtitles","voxpop","street interviews"],
  inProduction: true,
  platforms: new Map([["Youtube","https://www.youtube.com/channel/UCAL4AMMMXKxHDu3FqZV6CbQ"]]),
  contentInterface: ContentInterface.Video,
  contentType: ContentType.Videos,
  language: "Spanish"
},
{id: 5, name: "Bart de Pau",
  tags: ["native", "mixed regions","for learners","subtitles","language course","culture"],
  inProduction: true,
  platforms: new Map([["Youtube","https://www.youtube.com/c/LearndutchOrg"]]),
  contentInterface: ContentInterface.Video,
  contentType: ContentType.Videos,
  language: "Dutch"
}

]
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
