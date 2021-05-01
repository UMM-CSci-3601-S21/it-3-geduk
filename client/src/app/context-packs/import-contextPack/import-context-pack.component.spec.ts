import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { COMMON_IMPORTS } from 'src/app/app-routing.module';
import { WordListService } from 'src/app/services/wordlist.service';
import { MockWordListService } from 'src/testing/wordlist.service.mock';
import { MockCPService } from 'src/testing/context-pack.service.mock';
import { DisplayContextPacksComponent } from 'src/app/context-packs/display-contextPacks/display-context-packs.component';
import { ImportContextPackComponent } from 'src/app/context-packs/import-contextPack/import-context-pack.component';
import { ContextPack } from 'src/app/datatypes/contextPacks';
import { WordList } from 'src/app/datatypes/wordlist';
import { ContextPackService } from 'src/app/services/contextPack-service/contextpack.service';
import { AppComponent } from 'src/app/app.component';
import { Location } from '@angular/common';


describe('ImportContextPackComponent', () => {
  let component: ImportContextPackComponent;
  let fixture: ComponentFixture<ImportContextPackComponent>;
  const routerSpy = {navigate: jasmine.createSpy('navigate')};
  const paramMap = new Map();
  paramMap.set('id', 'meow');
  const testList: Array<WordList> = [];
  const contextPack: ContextPack = {
      _id: 'meow',
      schema: 'https://raw.githubusercontent.com/kidstech/story-builder/master/Assets/packs/schema/pack.schema.json',
      name: 'felines',
      icon: 'image.png',
      enabled: false,
      wordlist: testList
  };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImportContextPackComponent],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([
        { path: 'packs/meow', component: DisplayContextPacksComponent }
      ]), COMMON_IMPORTS],
      providers: [{ provide: ContextPackService, useValue: new MockCPService() },
        {provide: Router, useValue: routerSpy}, {
        provide: ActivatedRoute,
        useValue: {
          paramMap: of(paramMap)
        }
      }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportContextPackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should import', () => {
    const mockFile = new File([''], 'filename', { type: 'text/html' });
    const mockEvt = { target: { files: [mockFile] } };
    const mockReader: FileReader = jasmine.createSpyObj('FileReader', ['readAsDataURL', 'onload']);
    spyOn(window as any, 'FileReader').and.returnValue(mockReader);
    try { component.onFileAdded(mockEvt as any); } catch (e) { }
    expect(window.FileReader).toHaveBeenCalled();
  });

  it('should save', () => {
    component.contextPack = contextPack;
    component.id = 'meow';
    expect(component.save()).toBe(true);
    expect (routerSpy.navigate).toHaveBeenCalledWith([ '/packs/', 'fakeid']);
    component.contextPack = null;
    expect(component.save()).toBe(false);
  });

  it('should fail as it isnt an array', () => {
    // eslint-disable-next-line max-len
    const mockFile = new File(['[{"name":"sad","enabled":true,"nouns":[],"verbs":[],"adjectives":[],"misc":[]}]]'], 'filename', { type: 'application/json' });
    const mockEvt = { target: { files: [mockFile] } };
    spyOn(window as any, 'FileReader').and.callThrough();
    component.onFileAdded(mockEvt as any);
    expect(window.FileReader).toHaveBeenCalled();
  });
  it('should fail as it is invalid', () => {
    // eslint-disable-next-line max-len
    const mockFile = new File(['turkey'], 'filename', { type: 'application/json' });
    const mockEvt = { target: { files: [mockFile] } };
    spyOn(window as any, 'FileReader').and.callThrough();
    component.onFileAdded(mockEvt as any);
    expect(window.FileReader).toHaveBeenCalled();
  });



});
