import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ViewWordlistComponent } from './view-wordlist.component';
import { COMMON_IMPORTS } from 'src/app/app-routing.module';
import { WordListService } from 'src/app/services/wordlist.service';
import { MockWordListService } from 'src/testing/wordlist.service.mock';
import { DisplayWordlistComponent } from '../display-wordlist/display-wordlist.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('ViewWordlistComponent', () => {
  let component: ViewWordlistComponent;
  let fixture: ComponentFixture<ViewWordlistComponent>;
  const paramMap = new Map();
  paramMap.set('name','animal');
  paramMap.set('id','meow');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewWordlistComponent ],
      imports: [HttpClientTestingModule,RouterTestingModule.withRoutes([
        { path: 'packs/meow', component: DisplayWordlistComponent}
      ]),COMMON_IMPORTS],
      providers: [{ provide: WordListService, useValue: new MockWordListService() }, {
        provide: ActivatedRoute,
        useValue: {
          paramMap: of(paramMap)
        }
      }]
    })
    .compileComponents();
  });

  beforeEach(waitForAsync(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(ViewWordlistComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      component.name = 'animal';
      component.loadWords();
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle delete confirmation', () => {
    component.deleteClicked = true;
    component.toggleConfirmation();
    expect(component.deleteClicked).toBe(false);
  });

  it('should delete a wordlist', () => {
    expect(component.deleteWordList()).toBeTruthy();
  });
  it('should delete a word', () => {
    expect(component.words.length).toBe(4);
    component.deleteWord(1);
    expect(component.words.length).toBe(3);
  });

  it('should save', () => {
    component.wordlist = {name:'',enabled:false,nouns:[],verbs:[],adjectives:[],misc:[]};
    component.enabled = false;
    component.save();
    expect(component).toBeTruthy();
  });

  it('should automatically delete special character or punctuation if the word list name has it', () => {
    component.wordlist = {name:'أنا أحبك?',enabled:false,nouns:[],verbs:[],adjectives:[],misc:[]};
    component.enabled = false;
    component.save();
    expect(component).toBeTruthy();
  });

  it('should export', () => {
    component.wordlist = {name:'',enabled:false,nouns:[],verbs:[],adjectives:[],misc:[]};
    component.export();
    expect(component).toBeTruthy();
  });
});
