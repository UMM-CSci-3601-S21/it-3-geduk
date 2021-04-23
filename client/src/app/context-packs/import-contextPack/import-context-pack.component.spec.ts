import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { COMMON_IMPORTS } from 'src/app/app-routing.module';
import { WordListService } from 'src/app/services/wordlist.service';
import { MockWordListService } from 'src/testing/wordlist.service.mock';
import { MockCPService } from 'src/testing/context-pack.service.mock';
import { DisplayContextPacksComponent } from 'src/app/context-packs/display-contextPacks/display-context-packs.component';
//import { DisplayWordlistComponent } from '../display-wordlist/display-wordlist.component';
//import { ImportWordlistComponent } from './import-wordlist.component';
import { ImportContextPackComponent } from 'src/app/context-packs/import-contextPack/import-context-pack.component';
import { ContextPack } from 'src/app/datatypes/contextPacks';
import { WordList } from 'src/app/datatypes/wordlist';
import { ContextPackService } from 'src/app/services/contextPack-service/contextpack.service';

describe('ImportContextPackComponent', () => {
  let component: ImportContextPackComponent;
  let fixture: ComponentFixture<ImportContextPackComponent>;
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
      providers: [{ provide: ContextPackService, useValue: new MockCPService() }, {
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
    component.contextPack = undefined;
    expect(component.save()).toBe(false);
  });
});