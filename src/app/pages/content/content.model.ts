export interface Content {
    id: number;
    name: string;
    tags: string[];
    inProduction: boolean;
    platforms: Map<string,string>
    contentInterface: ContentInterface
    contentType: ContentType
    websiteLink?: string | null;
    // socialLinks?: string[]
    language: string;
    targetLanguage?: string;
  }
  export enum ContentInterface {
    Video = "Video", 
    Audio = "Audio", 
    Either = "Both audio and video"
  }
  export enum ContentType{
    Podcast = "Podcast", 
    Movie = "Movie", 
    Serie = "Serie", 
    Videos = "Videos"
  }