import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { COMMON_IMPORTS } from 'src/app/app-routing.module';
import { Word } from 'src/app/datatypes/word';
import { WordListService } from 'src/app/services/wordlist.service';
import { MockWordListService } from 'src/testing/wordlist.service.mock';

import { AddWordListComponent } from './add-wordlist.component';

describe('AddWordListComponent', () => {
  let component: AddWordListComponent;
  let fixture: ComponentFixture<AddWordListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddWordListComponent ],
      imports: [HttpClientTestingModule,RouterTestingModule,RouterModule.forRoot([]),COMMON_IMPORTS],
      providers: [{ provide: WordListService, useValue: new MockWordListService() }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWordListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not accept empty names', () => {
    component.check();
    expect(component.finished).toBe(false);
  });
  it('adds a word', () => {
    expect(component.words.length).toBe(0);
    component.add({name:'',forms:[]});
    expect(component.words.length).toBe(1);
  });

  it('should not accept a one character name', () => {
    component.wordlistname = 'k';
    component.check();
    expect(component.finished).toBe(false);
  });

  it('should accept "Pre-k"', () => {
    component.wordlistname = 'Pre-k';
    component.check();
    expect(component.finished).toBe(true);
  });

  it('should accept names with numbers', () => {
    component.wordlistname = '1234';
    component.check();
    expect(component.finished).toBe(true);
  });

  it('addWord() should work with nouns', () => {
    expect(component.addWord({name:'',type:'Noun',forms:[]})).toBe('Noun');
  });
  it('addWord() should work with verbs', () => {
    expect(component.addWord({name:'',type:'Verb',forms:[]})).toBe('Verb');
  });
  it('addWord() should work with adj', () => {
    expect(component.addWord({name:'',type:'Adjective',forms:[]})).toBe('Adjective');
  });
  it('addWord() should work with misc', () => {
    expect(component.addWord({name:'',type:'Misc',forms:[]})).toBe('Misc');
  });
});



