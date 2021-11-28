
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Content, ContentInterface, ContentType } from './content.model';

import { ContentService } from './content.service';

describe('ContentService', () => {
  let service: ContentService;
  let contentServiceSpy : jasmine.SpyObj<ContentService>

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ContentService', ['getForId',""]);

    TestBed.configureTestingModule({
      // Provide both the service-to-test and its (spy) dependency
      providers: [
        ContentService,
        { provide: ContentService, useValue: spy }
      ]
    });
    // Inject both the service-to-test and its (spy) dependency
    service = TestBed.inject(ContentService);
    contentServiceSpy = TestBed.inject(ContentService) as jasmine.SpyObj<ContentService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('getForId should return valid JSON', () => {
    const stubValue : Content = {id: 5, name: "Bart de Pau",
    tags: ["native", "mixed regions","for learners","subtitles","language course","culture"],
    inProduction: true,
    platforms: [{name: "Youtube",link: "https://www.youtube.com/c/LearndutchOrg"}],
    contentInterface: ContentInterface.Video,
    contentType: ContentType.Videos,
    language: "Dutch"
  };
  contentServiceSpy.getForId.and.returnValue(of(stubValue));

  service.getForId(5).subscribe(result => expect(result).toBe(stubValue))
  expect(contentServiceSpy.getForId.calls.count())
    .toEqual(1, 'spy method was called once');
  });
  it('getForId should return valid JSON', () => {
    const stubValue : Content = {id: 5, name: "Bart de Pau",
    tags: ["native", "mixed regions","for learners","subtitles","language course","culture"],
    inProduction: true,
    platforms: [{name: "Youtube",link: "https://www.youtube.com/c/LearndutchOrg"}],
    contentInterface: ContentInterface.Video,
    contentType: ContentType.Videos,
    language: "Dutch"
  };
  contentServiceSpy.getForId.and.returnValue(of(stubValue));
  contentServiceSpy.pushItem

  service.getForId(5).subscribe(result => expect(result).toBe(stubValue))
  expect(contentServiceSpy.getForId.calls.count())
    .toEqual(1, 'spy method was called once');
  });
});
