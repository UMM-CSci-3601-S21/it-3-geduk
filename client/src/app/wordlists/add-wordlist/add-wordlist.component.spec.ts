import { DisplayWordlistComponent } from './../display-wordlist/display-wordlist.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { COMMON_IMPORTS } from 'src/app/app-routing.module';
import { WordListService } from 'src/app/services/wordlist.service';
import { MockWordListService } from 'src/testing/wordlist.service.mock';

import { AddWordListComponent } from './add-wordlist.component';
import { of } from 'rxjs';
import { OverlayModule } from '@angular/cdk/overlay';
import { Overlay } from '@angular/cdk/overlay';

describe('AddWordListComponent', () => {
  let component: AddWordListComponent;
  let fixture: ComponentFixture<AddWordListComponent>;
  const paramMap = new Map();
  paramMap.set('id','meow');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddWordListComponent],
      imports: [Overlay, HttpClientTestingModule, RouterTestingModule.withRoutes([
        { path: 'packs/:id', component: DisplayWordlistComponent }
      ]), COMMON_IMPORTS],
      providers: [
        { provide: WordListService, useValue: new MockWordListService()},
        { provide: ActivatedRoute, useValue: {paramMap: of(paramMap)}},
        { provide: OverlayModule }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWordListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.words = [];
    component.types = [];
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
    component.add({ name: '', forms: [] });
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

  it('should accept names with special characters or punctuation', () => {
    component.wordlistname = ';+أنا أحبك';
    component.check();
    expect(component.finished).toBe(false);
  });

  it('should not accept a duplicate name', () => {
    component.wordlistname = 'animal';
    component.wordList.name = 'animal';
    component.save();
    expect(component.title).toBe('The word list already exists in the context pack');
  });

  it('should not accept a null name', () => {
    component.wordlistname = null;
    component.wordList.name = null;
    component.save();
    expect(component.title).toBe('Server error');
  });


  it('addWord() should work with nouns', () => {
    expect(component.addWord({ name: '', type: 'nouns', forms: [] })).toBe('nouns');
  });
  it('addWord() should work with verbs', () => {
    expect(component.addWord({ name: '', type: 'verbs', forms: [] })).toBe('verbs');
  });
  it('addWord() should work with adj', () => {
    expect(component.addWord({ name: '', type: 'adjectives', forms: [] })).toBe('adjectives');
  });
  it('addWord() should work with misc', () => {
    expect(component.addWord({ name: '', type: 'misc', forms: [] })).toBe('misc');
  });

  it('should delete a word', () => {
    component.addWord({ name: 'Richard', type: 'misc', forms: [] });
    component.types = ['misc'];
    component.deleteWord(0);
    expect(component.words.some(word=>word.word === 'Richard')).toBe(false);
  });

  it('enable() should work', () => {
    component.enable(true);
    expect(component.enabled).toBe(true);
    component.enable(false);
    expect(component.enabled).toBe(false);
  });
  it('save() should work', () => {
    component.save();
    expect(component.wordList.name).toBe(component.wordlistname);
    expect(component.wordList.enabled).toBe(component.enabled);
  });

});



