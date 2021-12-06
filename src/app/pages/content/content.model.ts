export interface Content {
  id: string;
  name: string;
  tags: string[];
  inProduction: boolean;
  platforms: Platform[];
  contentInterface: ContentInterface;
  contentType: ContentType;
  websiteLink?: string;
  language: string;
  targetLanguage?: string;
}
export enum ContentInterface {
  Video = 'video',
  Audio = 'audio',
  Either = 'either',
  //TODO, you can only name the thing the same as the enumeration
}
export enum ContentType {
  Podcast = 'podcast',
  Movie = 'movie',
  Serie = 'serie',
  Videos = 'videos',
}
export interface Platform {
  id?: string;
  name: string;
  link: string;
}
