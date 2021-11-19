export interface Content {
    id: number;
    name: string;
    tags: string[];
    inProduction: boolean;
    platforms: Map<string,string>
    contentInterface: ContentInterface
    contentType: ContentType
    websiteLink?: string | null;
    language: string;
    targetLanguage?: string;
  }
  export enum ContentInterface {
    Video = "Video", 
    Audio = "Audio", 
    Either = "Either"
    //TODO, you can only name the thing the same as the enumeration
  }
  export enum ContentType{
    Podcast = "Podcast", 
    Movie = "Movie", 
    Serie = "Serie", 
    Videos = "Videos"
  }